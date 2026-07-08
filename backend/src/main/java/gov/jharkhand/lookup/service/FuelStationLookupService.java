package gov.jharkhand.lookup.service;

import gov.jharkhand.lookup.dto.FuelStationLookupResponse;
import gov.jharkhand.lookup.dto.CouponDetailDto;
import java.util.List;

public interface FuelStationLookupService {
    FuelStationLookupResponse lookupFuelStation(Integer eventId, Integer districtId, Integer stationId, String mobileNumber);
    List<CouponDetailDto> getCoupons(Integer fuelstationId, Integer eventId, Integer districtId, int page, int size);
}
