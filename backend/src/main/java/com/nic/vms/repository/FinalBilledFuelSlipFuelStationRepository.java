package com.nic.vms.repository;

import com.nic.vms.entity.FinalBilledFuelSlipFuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinalBilledFuelSlipFuelStationRepository
        extends JpaRepository<FinalBilledFuelSlipFuelStation, Integer> {

    @Query("""
SELECT COUNT(f)
FROM FinalBilledFuelSlipFuelStation f
WHERE f.fuelStationId = :fuelStationId
AND f.eventId = :eventId
AND f.districtId = :districtId
AND f.status = :status
""")
    long countByFuelStationAndStatus(
            @Param("fuelStationId") Integer fuelStationId,
            @Param("eventId") Integer eventId,
            @Param("districtId") Integer districtId,
            @Param("status") String status
    );

    List<FinalBilledFuelSlipFuelStation>
    findByFuelStationIdAndEventIdAndDistrictIdAndStatus(
            Integer fuelStationId,
            Integer eventId,
            Integer districtId,
            String status
    );

}