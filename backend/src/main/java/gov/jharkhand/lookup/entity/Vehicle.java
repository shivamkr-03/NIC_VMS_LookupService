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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "registration_no", nullable = false, unique = true, length = 10)
    private String registrationNo;

    @Column(name = "rto_id", nullable = false)
    private Integer rtoId;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "doj")
    private LocalDate doj;

    @Column(nullable = false, length = 10)
    private String type;

    @Column(name = "engine_no", nullable = false, length = 30)
    private String engineNo;

    @Column(name = "chessis_no", nullable = false, length = 30)
    private String chessisNo;

    @Column(name = "owner_name", nullable = false, length = 100)
    private String ownerName;

    @Column(name = "fueltype_id", nullable = false, length = 1)
    private String fueltypeId;

    @Column(name = "vhclass_id", nullable = false)
    private Integer vhclassId;

    @Column(nullable = false, length = 10)
    private String mobile;

    @Column(name = "seat_capacity", nullable = false)
    private Integer seatCapacity;

    @Column(length = 10)
    private String status;
}
