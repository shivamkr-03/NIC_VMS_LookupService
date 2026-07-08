package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.FuelRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FuelRateRepository extends JpaRepository<FuelRate, Integer> {
    List<FuelRate> findByFuelstationIdOrderByEffectiveDtDesc(Integer fuelstationId);
}
