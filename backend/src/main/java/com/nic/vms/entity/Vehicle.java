package com.nic.vms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "registration_no")
    private String registrationNo;

    @Column(name = "rto_id")
    private Integer rtoId;

    @Column(name = "state_id")
    private Integer stateId;

    @Column(name = "district_id")
    private Integer districtId;

    @Column(name = "engine_no")
    private String engineNo;

    @Column(name = "chessis_no")
    private String chessisNo;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "fueltype_id")
    private String fueltypeId;

    @Column(name = "vhclass_id")
    private Integer vhclassId;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "seat_capacity")
    private Integer seatCapacity;

    @Column(name = "status")
    private String status;
}