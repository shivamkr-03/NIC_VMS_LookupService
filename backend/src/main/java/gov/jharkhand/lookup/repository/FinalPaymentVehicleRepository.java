package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.FinalPaymentVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FinalPaymentVehicleRepository extends JpaRepository<FinalPaymentVehicle, Integer> {
    List<FinalPaymentVehicle> findByEventIdAndRegistrationNo(Integer eventId, String registrationNo);
}
