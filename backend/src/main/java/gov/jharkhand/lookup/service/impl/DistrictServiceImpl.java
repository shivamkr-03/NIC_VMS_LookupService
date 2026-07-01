package gov.jharkhand.lookup.service.impl;

import gov.jharkhand.lookup.dto.DistrictDto;
import gov.jharkhand.lookup.entity.District;
import gov.jharkhand.lookup.repository.DistrictRepository;
import gov.jharkhand.lookup.service.DistrictService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DistrictServiceImpl implements DistrictService {

    private final DistrictRepository districtRepository;

    public DistrictServiceImpl(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    @Override
    public List<DistrictDto> getAllDistricts() {
        List<District> districts = districtRepository.findAllByOrderByNameAsc();
        return districts.stream()
                .map(district -> new DistrictDto(district.getId(), district.getName()))
                .collect(Collectors.toList());
    }
}
