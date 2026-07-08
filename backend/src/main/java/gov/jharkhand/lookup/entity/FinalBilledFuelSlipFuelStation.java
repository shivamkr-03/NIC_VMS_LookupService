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
@Table(name = "final_billed_fuelslips_fuelstation")
public class FinalBilledFuelSlipFuelStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cuopon_no", nullable = false, unique = true, length = 25)
    private String couponNo;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Column(name = "issuedate", nullable = false)
    private LocalDateTime issueDate;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "registration_no", nullable = false, length = 10)
    private String registrationNo;

    @Column(nullable = false)
    private Double qty;
    
    @Column
    private Double rate;

    @Column(nullable = false, length = 1)
    private String status;

    @Column(name = "fuelstation_id", nullable = false)
    private Integer fuelstationId;

    @Column(name = "valid_upto")
    private LocalDateTime validUpto;

    @Column(name = "fueltype_id", length = 1)
    private String fueltypeId;

    @Column(name = "reporting_place_id", nullable = false)
    private Integer reportingPlaceId;

    @Column(name = "admin_type", length = 1)
    private String adminType;
}
