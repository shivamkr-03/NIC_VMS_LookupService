package com.nic.vms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="districts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class District {
    @Id
    @Column(name="id")
    Integer id;
    @Column(name="state_id")
    Integer stateId;
    @Column(name="name")
    String name;
}
