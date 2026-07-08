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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "bankdetails_fuelstation")
public class BankDetailsFuelStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Column(name = "fuelstation_id", nullable = false)
    private Integer fuelstationId;

    @Column(name = "account_holder_name", length = 50)
    private String accountHolderName;

    @Column(name = "account_no", nullable = false, length = 20)
    private String accountNo;

    @Column(nullable = false, length = 11)
    private String ifsc;

    @Column(name = "bank_name", nullable = false, length = 100)
    private String bankName;

    @Column(name = "branch_name", nullable = false, length = 100)
    private String branchName;

    @Column(length = 1)
    private String status;

    @Column(name = "ref_id", nullable = false)
    private Integer refId;

    @Column(name = "admin_type", length = 1)
    private String adminType;
}
