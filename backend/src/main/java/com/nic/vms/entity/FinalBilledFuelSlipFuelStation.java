package com.nic.vms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "final_billed_fuelslips_fuelstation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinalBilledFuelSlipFuelStation {

    @Id
    private Integer id;

    @Column(name = "fuelstation_id")
    private Integer fuelStationId;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "district_id")
    private Integer districtId;

    @Column(name = "cuopon_no")
    private String couponNo;

    @Column(name = "fueltype_id")
    private String fuelTypeId;

    @Column(name = "qty")
    private Double quantity;

    @Column(name = "rate")
    private Double rate;

    @Column(name = "issuedate")
    private LocalDateTime issueDate;

    @Column(name = "status")
    private String status;
}