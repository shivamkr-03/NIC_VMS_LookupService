package gov.jharkhand.lookup.controller;

import gov.jharkhand.lookup.dto.DistrictDto;
import gov.jharkhand.lookup.service.DistrictService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/public/districts")
public class DistrictController {

    private final DistrictService districtService;

    public DistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping
    public ResponseEntity<List<DistrictDto>> getAllDistricts() {
        List<DistrictDto> districts = districtService.getAllDistricts();
        return ResponseEntity.ok(districts);
    }
}
