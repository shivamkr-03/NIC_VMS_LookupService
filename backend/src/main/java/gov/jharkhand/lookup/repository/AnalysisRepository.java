package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AnalysisRepository extends JpaRepository<Analysis, Integer> {
    Optional<Analysis> findByEventIdAndRegistrationNo(Integer eventId, String registrationNo);
}
