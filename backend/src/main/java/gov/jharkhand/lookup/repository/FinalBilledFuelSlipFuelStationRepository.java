package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.FinalBilledFuelSlipFuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FinalBilledFuelSlipFuelStationRepository extends JpaRepository<FinalBilledFuelSlipFuelStation, Integer> {
    List<FinalBilledFuelSlipFuelStation> findByFuelstationIdAndEventIdAndDistrictId(Integer fuelstationId, Integer eventId, Integer districtId);
    org.springframework.data.domain.Page<FinalBilledFuelSlipFuelStation> findByFuelstationIdAndEventIdAndDistrictId(Integer fuelstationId, Integer eventId, Integer districtId, org.springframework.data.domain.Pageable pageable);
}
