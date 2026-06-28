package com.nic.vms.repository;

import com.nic.vms.entity.FinalBilledFuelSlipFuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinalBilledFuelSlipFuelStationRepository
        extends JpaRepository<FinalBilledFuelSlipFuelStation, Integer> {

    List<FinalBilledFuelSlipFuelStation>
    findByFuelStationIdAndEventIdAndDistrictIdAndStatus(
            Integer fuelStationId,
            Integer eventId,
            Integer districtId,
            String status
    );

}