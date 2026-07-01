package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    @Query("SELECT v FROM Vehicle v WHERE v.registrationNo = :regNo AND (v.engineNo = :engineOrChassis OR v.chessisNo = :engineOrChassis)")
    Optional<Vehicle> findByRegistrationAndEngineOrChassis(
            @Param("regNo") String regNo, 
            @Param("engineOrChassis") String engineOrChassis);

    Optional<Vehicle> findByRegistrationNo(String registrationNo);
}
