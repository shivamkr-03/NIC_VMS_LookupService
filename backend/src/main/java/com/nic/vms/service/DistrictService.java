package com.nic.vms.service;

import com.nic.vms.entity.District;
import com.nic.vms.repository.DistrictRepository;
import com.nic.vms.service.interfaces.IDistrictService;
import com.nic.vms.service.interfaces.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictService implements IDistrictService {
    @Autowired
    private DistrictRepository districtRepository;

    @Override
    public List<District> getAllDistricts() {

        return districtRepository.findAll();
    }
}
