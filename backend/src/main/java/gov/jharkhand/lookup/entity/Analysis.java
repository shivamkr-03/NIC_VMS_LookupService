package gov.jharkhand.lookup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "analysis")
public class Analysis {

    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "admin_type", length = 1)
    private String adminType;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "type", length = 11)
    private String type;

    @Column(name = "registration_no", nullable = false, length = 10)
    private String registrationNo;

    @Column(name = "mileage", nullable = false)
    private Double mileage;

    @Column(name = "distance_in_km", nullable = false)
    private BigDecimal distanceInKm;

    @Column(name = "logbook_cn", nullable = false)
    private Long logbookCn;

    @Column(name = "qty", nullable = false)
    private Double qty;

    @Column(name = "fuelslip_cn", nullable = false)
    private Long fuelslipCn;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "pay_cn")
    private Integer payCn;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "kyc", nullable = false, length = 1)
    private String kyc;
}
