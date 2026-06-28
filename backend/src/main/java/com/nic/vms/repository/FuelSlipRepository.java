package com.nic.vms.repository;

import com.nic.vms.entity.FuelSlip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuelSlipRepository
        extends JpaRepository<FuelSlip,Integer> {

    List<FuelSlip> findByFuelStationId(
            Integer fuelStationId
    );
}
