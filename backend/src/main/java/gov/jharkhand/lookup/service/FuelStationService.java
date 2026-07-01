package gov.jharkhand.lookup.service;

import gov.jharkhand.lookup.dto.FuelStationDto;
import java.util.List;

public interface FuelStationService {
    List<FuelStationDto> getActiveFuelStations(Integer eventId, Integer districtId);
}
