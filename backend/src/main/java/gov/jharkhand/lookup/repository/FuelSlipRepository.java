package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.FuelSlip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FuelSlipRepository extends JpaRepository<FuelSlip, Integer> {
    List<FuelSlip> findByEventIdAndRegistrationNoOrderByIssueDateAsc(Integer eventId, String registrationNo);

    List<FuelSlip> findByFuelstationIdAndEventIdAndDistrictId(Integer fuelstationId, Integer eventId, Integer districtId);
}
