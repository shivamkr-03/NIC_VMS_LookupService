package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.Logbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LogbookRepository extends JpaRepository<Logbook, Integer> {
    List<Logbook> findByEventIdAndRegistrationNoOrderByDateTimeAsc(Integer eventId, String registrationNo);
}
