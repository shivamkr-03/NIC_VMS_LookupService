package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.VhClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VhClassRepository extends JpaRepository<VhClass, Integer> {
}
