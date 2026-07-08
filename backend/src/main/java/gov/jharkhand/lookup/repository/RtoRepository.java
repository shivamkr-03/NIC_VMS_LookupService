package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.Rto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RtoRepository extends JpaRepository<Rto, Integer> {
}
