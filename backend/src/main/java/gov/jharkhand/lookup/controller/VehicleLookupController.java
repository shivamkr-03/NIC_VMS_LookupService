package gov.jharkhand.lookup.controller;

import gov.jharkhand.lookup.dto.VehicleLookupRequest;
import gov.jharkhand.lookup.dto.VehicleLookupResponse;
import gov.jharkhand.lookup.service.VehicleLookupService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/vehicle")
public class VehicleLookupController {

    private final VehicleLookupService vehicleLookupService;

    public VehicleLookupController(VehicleLookupService vehicleLookupService) {
        this.vehicleLookupService = vehicleLookupService;
    }

    @PostMapping("/search")
    public ResponseEntity<VehicleLookupResponse> searchVehicle(
            @Valid @RequestBody VehicleLookupRequest request) {
        VehicleLookupResponse response = vehicleLookupService.lookupVehicle(
                request.getEventId(),
                request.getRegistrationNumber(),
                request.getEngineOrChassisNumber()
        );
        return ResponseEntity.ok(response);
    }
}
