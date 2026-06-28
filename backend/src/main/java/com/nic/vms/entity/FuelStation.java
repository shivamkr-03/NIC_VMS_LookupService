package com.nic.vms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fuelstations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuelStation {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "state_id")
    private Integer stateId;

    @Column(name = "district_id")
    private Integer districtId;

    @Column(name = "event_id")
    private Integer eventId;

    @Column(name = "company_id")
    private String companyId;

    @Column(name = "name")
    private String name;

    @Column(name = "ownername")
    private String ownerName;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "active")
    private String active;
}