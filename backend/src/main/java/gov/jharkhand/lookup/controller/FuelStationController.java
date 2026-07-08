package gov.jharkhand.lookup.controller;

import gov.jharkhand.lookup.dto.FuelStationDto;
import gov.jharkhand.lookup.service.FuelStationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/public/fuelstations")
public class FuelStationController {

    private final FuelStationService fuelStationService;

    public FuelStationController(FuelStationService fuelStationService) {
        this.fuelStationService = fuelStationService;
    }

    @GetMapping
    public ResponseEntity<List<FuelStationDto>> getFuelStations(
            @RequestParam("eventId") Integer eventId,
            @RequestParam("districtId") Integer districtId) {
        List<FuelStationDto> stations = fuelStationService.getActiveFuelStations(eventId, districtId);
        return ResponseEntity.ok(stations);
    }
}
