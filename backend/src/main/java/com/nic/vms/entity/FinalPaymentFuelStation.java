package com.nic.vms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "final_payment_fuelstation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinalPaymentFuelStation {

    @Id
    private Integer id;

    @Column(name = "fuelstation_id")
    private Integer fuelStationId;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "district_id")
    private Integer districtId;

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

    @Column(name = "total_advance")
    private Double totalAdvance;

    @Column(name = "final_billed_amount")
    private Double finalBilledAmount;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "branch_name")
    private String branchName;

    @Column(name = "account_holder_name")
    private String accountHolderName;

    @Column(name = "account_no")
    private String accountNo;

    @Column(name = "ifsc")
    private String ifsc;

    @Column(name = "utr_no")
    private String utrNo;

    @Column(name = "utr_dt")
    private LocalDate utrDate;
}