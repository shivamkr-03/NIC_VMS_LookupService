package gov.jharkhand.lookup.controller;

import gov.jharkhand.lookup.dto.FuelStationLookupRequest;
import gov.jharkhand.lookup.dto.FuelStationLookupResponse;
import gov.jharkhand.lookup.service.FuelStationLookupService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/fuelstation")
public class FuelStationLookupController {

    private final FuelStationLookupService fuelStationLookupService;

    public FuelStationLookupController(FuelStationLookupService fuelStationLookupService) {
        this.fuelStationLookupService = fuelStationLookupService;
    }

    @PostMapping("/search")
    public ResponseEntity<FuelStationLookupResponse> searchFuelStation(
            @Valid @RequestBody FuelStationLookupRequest request) {
        FuelStationLookupResponse response = fuelStationLookupService.lookupFuelStation(
                request.getEventId(),
                request.getDistrictId(),
                request.getStationId(),
                request.getMobileNumber()
        );
        return ResponseEntity.ok(response);
    }

    @org.springframework.web.bind.annotation.GetMapping("/coupons")
    public ResponseEntity<java.util.List<gov.jharkhand.lookup.dto.CouponDetailDto>> getCoupons(
            @org.springframework.web.bind.annotation.RequestParam("fuelstationId") Integer fuelstationId,
            @org.springframework.web.bind.annotation.RequestParam("eventId") Integer eventId,
            @org.springframework.web.bind.annotation.RequestParam("districtId") Integer districtId,
            @org.springframework.web.bind.annotation.RequestParam(value = "page", defaultValue = "0") int page,
            @org.springframework.web.bind.annotation.RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(fuelStationLookupService.getCoupons(fuelstationId, eventId, districtId, page, size));
    }
}
