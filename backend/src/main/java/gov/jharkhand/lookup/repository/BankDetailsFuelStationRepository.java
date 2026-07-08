package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.BankDetailsFuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BankDetailsFuelStationRepository extends JpaRepository<BankDetailsFuelStation, Integer> {
    List<BankDetailsFuelStation> findByFuelstationIdAndEventIdAndDistrictId(Integer fuelstationId, Integer eventId, Integer districtId);
}
