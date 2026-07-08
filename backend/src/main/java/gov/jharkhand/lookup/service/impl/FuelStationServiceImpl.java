package gov.jharkhand.lookup.service.impl;

import gov.jharkhand.lookup.dto.FuelStationDto;
import gov.jharkhand.lookup.entity.FuelStation;
import gov.jharkhand.lookup.repository.FuelStationRepository;
import gov.jharkhand.lookup.service.FuelStationService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuelStationServiceImpl implements FuelStationService {

    private final FuelStationRepository fuelStationRepository;

    public FuelStationServiceImpl(FuelStationRepository fuelStationRepository) {
        this.fuelStationRepository = fuelStationRepository;
    }

    @Override
    public List<FuelStationDto> getActiveFuelStations(Integer eventId, Integer districtId) {
        List<FuelStation> stations = fuelStationRepository.findByEventIdAndDistrictIdAndActiveOrderByNameAsc(eventId, districtId, "Y");
        return stations.stream()
                .map(station -> new FuelStationDto(station.getId(), station.getName()))
                .collect(Collectors.toList());
    }
}
