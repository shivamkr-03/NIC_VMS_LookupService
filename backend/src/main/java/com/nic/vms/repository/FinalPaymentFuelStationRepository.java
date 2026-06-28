package com.nic.vms.repository;

import com.nic.vms.entity.FinalPaymentFuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinalPaymentFuelStationRepository
        extends JpaRepository<FinalPaymentFuelStation, Integer> {

    List<FinalPaymentFuelStation>
    findByFuelStationIdAndEventIdAndDistrictId(
            Integer fuelStationId,
            Integer eventId,
            Integer districtId
    );

}