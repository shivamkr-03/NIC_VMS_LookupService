package gov.jharkhand.lookup.repository;

import gov.jharkhand.lookup.entity.FuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {
    List<FuelStation> findByEventIdAndDistrictIdAndActiveOrderByNameAsc(Integer eventId, Integer districtId, String active);

    @Query("SELECT fs FROM FuelStation fs WHERE fs.id = :stationId AND fs.eventId = :eventId AND fs.districtId = :districtId AND (fs.mobile = :mobile OR fs.contactPersonMobile = :mobile)")
    Optional<FuelStation> findForLookup(
            @Param("stationId") Integer stationId,
            @Param("eventId") Integer eventId,
            @Param("districtId") Integer districtId,
            @Param("mobile") String mobile);
}
