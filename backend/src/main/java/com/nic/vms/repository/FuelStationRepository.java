package com.nic.vms.repository;

import com.nic.vms.entity.FuelStation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {
    List<FuelStation> findByEventIdAndDistrictIdAndActive(
            Integer eventId,
            Integer districtId,
            String active
    );
    Optional<FuelStation> findByIdAndEventIdAndDistrictId(
            Integer fuelStationId,
            Integer eventId,
            Integer districtId
    );
}
