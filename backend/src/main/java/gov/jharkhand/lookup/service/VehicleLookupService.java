package gov.jharkhand.lookup.service;

import gov.jharkhand.lookup.dto.VehicleLookupResponse;

public interface VehicleLookupService {
    VehicleLookupResponse lookupVehicle(Integer eventId, String registrationNumber, String engineOrChassisNumber);
}
