package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.ReadyForAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReadyForAllocationRepository extends JpaRepository<ReadyForAllocation, Integer> {

    @Query("SELECT r FROM ReadyForAllocation r WHERE r.eventId = :eventId AND r.registrationNo = :regNo AND (r.engineNo = :engineOrChassis OR r.chassisNo = :engineOrChassis)")
    List<ReadyForAllocation> findByEventAndRegistrationAndEngineOrChassis(
            @Param("eventId") Integer eventId,
            @Param("regNo") String regNo,
            @Param("engineOrChassis") String engineOrChassis);

    List<ReadyForAllocation> findByEventIdIn(List<Integer> eventIds, org.springframework.data.domain.Pageable pageable);
}
