package gov.jharkhand.lookup;

import gov.jharkhand.lookup.entity.FuelStation;
import gov.jharkhand.lookup.entity.ReadyForAllocation;
import gov.jharkhand.lookup.entity.Vehicle;
import gov.jharkhand.lookup.repository.FuelStationRepository;
import gov.jharkhand.lookup.repository.ReadyForAllocationRepository;
import gov.jharkhand.lookup.repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class LookupServiceApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ReadyForAllocationRepository readyForAllocationRepository;

	@Autowired
	private VehicleRepository vehicleRepository;

	@Autowired
	private FuelStationRepository fuelStationRepository;

	@Test
	void contextLoads() {
		List<ReadyForAllocation> allocations = readyForAllocationRepository.findAll();
		System.out.println("=== 3 VALID VEHICLE TEST CASES ===");
		int count = 0;
		for (ReadyForAllocation alloc : allocations) {
			Optional<Vehicle> vehicleOpt = vehicleRepository.findByRegistrationAndEngineOrChassis(
					alloc.getRegistrationNo(), alloc.getEngineNo());
			if (vehicleOpt.isPresent()) {
				System.out.printf("Event ID: %d, Registration: %s, Engine/Chassis: %s%n",
						alloc.getEventId(), alloc.getRegistrationNo(), alloc.getEngineNo());
				count++;
				if (count >= 3) break;
			}
		}
		System.out.println("==================================");
	}

	@Test
	void getActiveEvents_ShouldReturnOkAndJsonList() throws Exception {
		mockMvc.perform(get("/api/public/events")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$").isArray());
	}

	@Test
	void getAllDistricts_ShouldReturnOkAndJsonList() throws Exception {
		mockMvc.perform(get("/api/public/districts")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$").isArray());
	}

	@Test
	void getFuelStations_ShouldReturnOkAndJsonList() throws Exception {
		mockMvc.perform(get("/api/public/fuelstations")
				.param("eventId", "1")
				.param("districtId", "1")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$").isArray());
	}

	@Test
	void lookupVehicle_WithValidVehicle_ShouldReturnOkAndVehicleDetails() throws Exception {
		Page<ReadyForAllocation> page = readyForAllocationRepository.findAll(PageRequest.of(0, 10));
		List<ReadyForAllocation> allocations = page.getContent();
		if (allocations.isEmpty()) {
			return; // Skip if no test data exists
		}
		
		ReadyForAllocation allocation = null;
		for (ReadyForAllocation alloc : allocations) {
			Optional<Vehicle> vehicleOpt = vehicleRepository.findByRegistrationAndEngineOrChassis(
					alloc.getRegistrationNo(), alloc.getEngineNo());
			if (vehicleOpt.isPresent()) {
				allocation = alloc;
				break;
			}
		}

		if (allocation == null) {
			return; // Skip if no consistent vehicle registry entry found
		}

		String requestBody = String.format(
				"{\"eventId\":%d,\"registrationNumber\":\"%s\",\"engineOrChassisNumber\":\"%s\"}",
				allocation.getEventId(),
				allocation.getRegistrationNo(),
				allocation.getEngineNo()
		);

		mockMvc.perform(post("/api/public/vehicle/search")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.primaryDetails").exists())
				.andExpect(jsonPath("$.primaryDetails.registrationNo").value(allocation.getRegistrationNo()))
				.andExpect(jsonPath("$.possessionDetails").exists());
	}

	@Test
	void lookupVehicle_WithInvalidVehicle_ShouldReturnNotFound() throws Exception {
		String requestBody = "{\"eventId\":999999,\"registrationNumber\":\"INVALID_REG\",\"engineOrChassisNumber\":\"INVALID_ENG\"}";
		mockMvc.perform(post("/api/public/vehicle/search")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());
	}

	@Test
	void lookupVehicle_WithValidationErrors_ShouldReturnBadRequest() throws Exception {
		String requestBody = "{\"eventId\":null,\"registrationNumber\":\"\",\"engineOrChassisNumber\":\"\"}";
		mockMvc.perform(post("/api/public/vehicle/search")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());
	}

	@Test
	void lookupFuelStation_WithValidStation_ShouldReturnOkAndStationDetails() throws Exception {
		Page<FuelStation> page = fuelStationRepository.findAll(PageRequest.of(0, 10));
		List<FuelStation> stations = page.getContent();
		if (stations.isEmpty()) {
			return; // Skip if no test data exists
		}
		
		FuelStation station = stations.get(0);

		String requestBody = String.format(
				"{\"eventId\":%d,\"districtId\":%d,\"stationId\":%d,\"mobileNumber\":\"%s\"}",
				station.getEventId(),
				station.getDistrictId(),
				station.getId(),
				station.getMobile()
		);

		mockMvc.perform(post("/api/public/fuelstation/search")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.stationInformation").exists())
				.andExpect(jsonPath("$.stationInformation.name").value(station.getName()))
				.andExpect(jsonPath("$.couponStatistics").exists())
				.andExpect(jsonPath("$.fuelStatistics").exists())
				.andExpect(jsonPath("$.paymentInformation").exists());
	}

	@Test
	void lookupFuelStation_WithInvalidStation_ShouldReturnNotFound() throws Exception {
		String requestBody = "{\"eventId\":999999,\"districtId\":999999,\"stationId\":999999,\"mobileNumber\":\"0000000000\"}";
		mockMvc.perform(post("/api/public/fuelstation/search")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isNotFound());
	}

	@Test
	void lookupFuelStation_WithValidationErrors_ShouldReturnBadRequest() throws Exception {
		String requestBody = "{\"eventId\":null,\"districtId\":null,\"stationId\":null,\"mobileNumber\":\"\"}";
		mockMvc.perform(post("/api/public/fuelstation/search")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isBadRequest());
	}
}
