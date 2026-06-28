package com.nic.vms.controller;

import com.nic.vms.dto.response.ApiResponse;
import com.nic.vms.entity.District;
import com.nic.vms.service.interfaces.IDistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class DistrictController {

    @Autowired
    private IDistrictService districtService;

    @GetMapping("/districts")
    public ResponseEntity<ApiResponse<List<District>>> getDistricts() {

        List<District> districts =
                districtService.getAllDistricts();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Districts fetched successfully",
                        districts
                )
        );
    }
}