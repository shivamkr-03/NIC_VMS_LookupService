package com.nic.vms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Event {
    @Id
    @Column(name="id")
   private  Integer id;
    @Column(name="state_id")
  private  Integer stateId;
    @Column(name="name")
   private String name;
    @Column(name="year")
  private   Integer year;
    @Column(name="active")
   private String active;
}
