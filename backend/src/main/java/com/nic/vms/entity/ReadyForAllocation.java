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
@Table(name = "readyforallocations")
public class ReadyForAllocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "registration_no", nullable = false, length = 10)
    private String registrationNo;

    @Column(name = "rto_id", nullable = false)
    private Integer rtoId;

    @Column(name = "vhclass_id", nullable = false)
    private Integer vhclassId;

    @Column(length = 11)
    private String type;

    @Column(name = "engine_no", nullable = false, length = 30)
    private String engineNo;

    @Column(name = "chassis_no", nullable = false, length = 30)
    private String chassisNo;

    @Column(name = "owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(name = "owner_mobile", nullable = false, length = 10)
    private String ownerMobile;

    @Column(name = "fueltype_id", nullable = false, length = 1)
    private String fueltypeId;

    @Column(name = "seat_capacity", nullable = false)
    private Integer seatCapacity;

    @Column(name = "capture_from_place", nullable = false, length = 60)
    private String captureFromPlace;

    @Column(name = "capture_dt_tm", nullable = false)
    private LocalDateTime captureDtTm;

    @Column(name = "reporting_place_id", nullable = false)
    private Integer reportingPlaceId;

    @Column(name = "driver_name", length = 100)
    private String driverName;

    @Column(name = "driver_mobile", length = 10)
    private String driverMobile;

    @Column(name = "helper_name", length = 100)
    private String helperName;

    @Column(name = "helper_mobile", length = 10)
    private String helperMobile;

    @Column(name = "release_dt_tm")
    private LocalDateTime releaseDtTm;

    @Column(length = 1)
    private String status;

    @Column(name = "payment_flag", length = 1)
    private String paymentFlag;

    @Column(name = "admin_type", length = 1)
    private String adminType;
}
