package com.nic.vms.service;

import com.nic.vms.dto.request.FuelStationSearchRequest;
import com.nic.vms.dto.response.FuelStationSearchResponse;
import com.nic.vms.entity.FuelStation;
import com.nic.vms.repository.FuelStationRepository;
import com.nic.vms.service.interfaces.IFuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuelStationService implements IFuelStationService {

    @Autowired
    private FuelStationRepository fuelStationRepository;

    @Override
    public List<FuelStation> getFuelStations(
            Integer eventId,
            Integer districtId) {

        return fuelStationRepository
                .findByEventIdAndDistrictIdAndActive(
                        eventId,
                        districtId,
                        "Y"
                );
    }

    @Override
    public FuelStationSearchResponse searchFuelStation(
            FuelStationSearchRequest request) {

        FuelStation fuelStation =
                fuelStationRepository
                        .findByIdAndEventIdAndDistrictId(
                                request.getFuelStationId(),
                                request.getEventId(),
                                request.getDistrictId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException("Invalid details"));

        if (!fuelStation.getMobile()
                .equals(request.getMobileNumber())) {

            throw new RuntimeException("Invalid details");
        }

        FuelStationSearchResponse response =
                new FuelStationSearchResponse();

        response.setStationName(
                fuelStation.getName());

        response.setOwnerName(
                fuelStation.getOwnerName());

        response.setMobileNumber(
                fuelStation.getMobile());

        return response;
    }
}