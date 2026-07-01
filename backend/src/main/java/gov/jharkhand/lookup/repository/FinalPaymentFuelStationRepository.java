package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.FinalPaymentFuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FinalPaymentFuelStationRepository extends JpaRepository<FinalPaymentFuelStation, Integer> {
    List<FinalPaymentFuelStation> findByFuelstationIdAndEventIdAndDistrictId(Integer fuelstationId, Integer eventId, Integer districtId);
}
