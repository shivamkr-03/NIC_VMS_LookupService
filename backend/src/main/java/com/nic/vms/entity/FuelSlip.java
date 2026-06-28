package com.nic.vms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fuelslips")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuelSlip {

    @Id
    private Integer id;

    @Column(name = "fuelstation_id")
    private Integer fuelStationId;

    @Column(name = "qty")
    private Double qty;

    @Column(name = "status")
    private String status;

    @Column(name = "fueltype_id")
    private String fuelTypeId;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "district_id")
    private Integer districtId;
}
