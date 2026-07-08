package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.Head;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeadRepository extends JpaRepository<Head, Integer> {
}
