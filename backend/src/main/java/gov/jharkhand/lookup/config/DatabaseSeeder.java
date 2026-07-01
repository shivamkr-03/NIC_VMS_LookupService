package gov.jharkhand.lookup.config;

import gov.jharkhand.lookup.entity.Event;
import gov.jharkhand.lookup.entity.ReadyForAllocation;
import gov.jharkhand.lookup.entity.Vehicle;
import gov.jharkhand.lookup.repository.EventRepository;
import gov.jharkhand.lookup.repository.ReadyForAllocationRepository;
import gov.jharkhand.lookup.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final ReadyForAllocationRepository readyForAllocationRepository;
    private final VehicleRepository vehicleRepository;
    private final EventRepository eventRepository;

    public DatabaseSeeder(ReadyForAllocationRepository readyForAllocationRepository,
                          VehicleRepository vehicleRepository,
                          EventRepository eventRepository) {
        this.readyForAllocationRepository = readyForAllocationRepository;
        this.vehicleRepository = vehicleRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Fetch active event IDs
        List<Event> activeEvents = eventRepository.findByActiveOrderByIdDesc("Y");
        List<Integer> activeEventIds = activeEvents.stream().map(Event::getId).collect(Collectors.toList());

        List<ReadyForAllocation> allocations;
        if (!activeEventIds.isEmpty()) {
            // Fetch allocations for active events
            allocations = readyForAllocationRepository.findByEventIdIn(activeEventIds, PageRequest.of(0, 100));
        } else {
            allocations = List.of();
        }

        // If no allocations for active events, fall back to general allocations
        if (allocations.isEmpty()) {
            allocations = readyForAllocationRepository.findAll(PageRequest.of(0, 100)).getContent();
        }

        int seededCount = 0;
        int updatedCount = 0;
        for (ReadyForAllocation alloc : allocations) {
            // Check if vehicle exists in vehicles table by registration number alone
            java.util.Optional<Vehicle> existingOpt = vehicleRepository.findByRegistrationNo(alloc.getRegistrationNo());

            if (existingOpt.isPresent()) {
                Vehicle existing = existingOpt.get();
                // If engine number or chassis number doesn't match, update them
                if (!alloc.getEngineNo().equals(existing.getEngineNo()) || !alloc.getChassisNo().equals(existing.getChessisNo())) {
                    existing.setEngineNo(alloc.getEngineNo());
                    existing.setChessisNo(alloc.getChassisNo());
                    vehicleRepository.save(existing);
                    updatedCount++;
                }
            } else {
                Vehicle vehicle = Vehicle.builder()
                        .registrationNo(alloc.getRegistrationNo())
                        .rtoId(alloc.getRtoId())
                        .stateId(alloc.getStateId())
                        .districtId(alloc.getDistrictId())
                        .type(truncate(alloc.getType() != null ? alloc.getType() : "Commercial", 10))
                        .engineNo(alloc.getEngineNo())
                        .chessisNo(alloc.getChassisNo())
                        .ownerName(alloc.getOwnerName() != null ? alloc.getOwnerName() : "Unknown Owner")
                        .fueltypeId(alloc.getFueltypeId() != null ? alloc.getFueltypeId() : "D")
                        .vhclassId(alloc.getVhclassId() != null ? alloc.getVhclassId() : 1)
                        .mobile(alloc.getOwnerMobile() != null ? alloc.getOwnerMobile() : "9999999999")
                        .seatCapacity(alloc.getSeatCapacity() != null ? alloc.getSeatCapacity() : 5)
                        .status(truncate(alloc.getStatus() != null ? alloc.getStatus() : "Ready", 10))
                        .build();
                vehicleRepository.save(vehicle);
                seededCount++;
                if (seededCount <= 10) {
                    System.out.println("Seeded vehicle into registry: " + alloc.getRegistrationNo() + " (Event ID: " + alloc.getEventId() + ")");
                }
            }
        }
        System.out.println("DatabaseSeeder finished: seeded " + seededCount + ", updated " + updatedCount + " registry entries.");
    }

    private String truncate(String val, int maxLen) {
        if (val == null) return null;
        return val.length() <= maxLen ? val : val.substring(0, maxLen);
    }
}
