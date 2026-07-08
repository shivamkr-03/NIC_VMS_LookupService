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
@Table(name = "final_payment_vehicles")
public class FinalPaymentVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "admin_type", nullable = false, length = 1)
    private String adminType;

    @Column(nullable = false, length = 1)
    private String kyc;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Column(name = "reporting_place_id", nullable = false)
    private Integer reportingPlaceId;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "registration_no", nullable = false, length = 10)
    private String registrationNo;

    @Column(name = "owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(name = "owner_mobile", nullable = false, length = 10)
    private String ownerMobile;

    @Column(name = "rate_per_day", nullable = false)
    private Double ratePerDay;

    @Column(name = "possession_hours")
    private Integer possessionHours;

    @Column(name = "possession_days")
    private Float possessionDays;

    @Column(name = "proposed_amount")
    private Double proposedAmount;

    @Column(name = "net_payable")
    private Double netPayable;

    @Column(name = "capture_dt_tm", nullable = false)
    private LocalDateTime captureDtTm;

    @Column(name = "release_dt_tm", nullable = false)
    private LocalDateTime releaseDtTm;
}
