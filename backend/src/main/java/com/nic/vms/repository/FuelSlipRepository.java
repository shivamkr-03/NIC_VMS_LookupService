package com.nic.vms.repository;

import com.nic.vms.entity.FuelSlip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuelSlipRepository
        extends JpaRepository<FuelSlip, Integer> {

    @Query("""
        SELECT COUNT(f)
        FROM FuelSlip f
        WHERE f.fuelStationId = :stationId
        AND f.status = :status
        """)
    long countByStationAndStatus(
            @Param("stationId") Integer stationId,
            @Param("status") String status
    );

    List<FuelSlip> findByFuelStationId(Integer fuelStationId);
}