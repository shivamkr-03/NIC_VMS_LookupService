package com.nic.vms.service.interfaces;

import com.nic.vms.dto.request.FuelStationSearchRequest;
import com.nic.vms.dto.response.FuelStationDashboardResponse;
import com.nic.vms.entity.FuelStation;

import java.util.List;

public interface IFuelStationService {

    List<FuelStation> getFuelStations(
            Integer eventId,
            Integer districtId
    );

    FuelStationDashboardResponse searchFuelStation(
            FuelStationSearchRequest request
    );
}