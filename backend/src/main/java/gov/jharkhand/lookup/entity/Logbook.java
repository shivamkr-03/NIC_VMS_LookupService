package gov.jharkhand.lookup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "logbooks")
public class Logbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Column(name = "date_time", nullable = false)
    private LocalDateTime dateTime;

    @Column(name = "head_id", nullable = false)
    private Integer headId;

    @Column(name = "officer_name", length = 100)
    private String officerName;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "registration_no", nullable = false, length = 10)
    private String registrationNo;

    @Column(name = "meter_from_km", nullable = false)
    private Long meterFromKm;

    @Column(name = "meter_to_km")
    private Long meterToKm;

    @Column(name = "distance_in_km")
    private Long distanceInKm;

    @Column(name = "from_place", nullable = false, length = 30)
    private String fromPlace;

    @Column(length = 30)
    private String via;

    @Column(name = "to_place", length = 30)
    private String toPlace;

    @Column(name = "start_dt_tm")
    private LocalDateTime startDtTm;

    @Column(name = "end_dt_tm")
    private LocalDateTime endDtTm;

    @Column(name = "reporting_place_id", nullable = false)
    private Integer reportingPlaceId;

    @Column(name = "admin_type", length = 1)
    private String adminType;
}
