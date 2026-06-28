package com.nic.vms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

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

    @Column(name = "utr_no")
    private String utrNo;
}