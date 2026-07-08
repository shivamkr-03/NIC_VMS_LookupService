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
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "final_payment_fuelstation")
public class FinalPaymentFuelStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "admin_type", nullable = false, length = 1)
    private String adminType;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Column(name = "company_id", nullable = false, length = 1)
    private String companyId;

    @Column(name = "fuelstation_id", nullable = false)
    private Integer fuelstationId;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(name = "owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(name = "owner_mobile", nullable = false, length = 10)
    private String ownerMobile;

    @Column(name = "account_no", length = 20)
    private String accountNo;

    @Column(name = "account_holder_name", length = 50)
    private String accountHolderName;

    @Column(length = 11)
    private String ifsc;

    @Column(name = "bank_name", length = 100)
    private String bankName;

    @Column(name = "branch_name", length = 100)
    private String branchName;

    @Column(nullable = false, length = 1)
    private String kyc;

    @Column(name = "total_advance")
    private Double totalAdvance;

    @Column(name = "receiver_name", length = 100)
    private String receiverName;

    @Column(name = "receiver_desig", length = 50)
    private String receiverDesig;

    @Column(name = "total_petrol_ltr")
    private Double totalPetrolLtr;

    @Column(name = "total_diesel_ltr")
    private Double totalDieselLtr;

    @Column(name = "total_cng_kg")
    private Double totalCngKg;

    @Column(name = "total_petrol_amount")
    private Double totalPetrolAmount;

    @Column(name = "total_diesel_amount")
    private Double totalDieselAmount;

    @Column(name = "total_cng_amount")
    private Double totalCngAmount;

    @Column(name = "final_billed_amount")
    private Double finalBilledAmount;

    @Column(name = "created_dt", nullable = false, insertable = false, updatable = false)
    private LocalDateTime createdDt;

    @Column(name = "utr_no", length = 35)
    private String utrNo;

    @Column(name = "utr_dt")
    private LocalDate utrDt;

    @Column(name = "utr_update_dt")
    private LocalDate utrUpdateDt;
}
