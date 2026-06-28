package com.nic.vms.controller;

import com.nic.vms.dto.request.FuelStationSearchRequest;
import com.nic.vms.dto.response.ApiResponse;
import com.nic.vms.dto.response.FuelStationDashboardResponse;
import com.nic.vms.entity.FuelStation;
import com.nic.vms.service.interfaces.IFuelStationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class FuelStationController {

    @Autowired
    private IFuelStationService fuelStationService;

    @GetMapping("/fuelstations")
    public List<FuelStation> getFuelStations(
                @RequestParam Integer eventId,
                @RequestParam Integer districtId) {

        return fuelStationService
                    .getFuelStations(eventId, districtId);
        }

    @PostMapping("/fuelstation/search")
    public ResponseEntity<ApiResponse<FuelStationDashboardResponse>>
    searchFuelStation(
            @Valid @RequestBody FuelStationSearchRequest request) {

        FuelStationDashboardResponse response =
                fuelStationService.searchFuelStation(request);

        return ResponseEntity.ok(

                new ApiResponse<>(
                        true,
                        "Fuel Station details fetched successfully",
                        response
                )
        );
    }
}
