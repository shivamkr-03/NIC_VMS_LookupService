package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.FuelType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuelTypeRepository extends JpaRepository<FuelType, String> {
}
