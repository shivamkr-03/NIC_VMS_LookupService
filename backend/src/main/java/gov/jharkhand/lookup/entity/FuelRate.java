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
@Table(name = "fuelrates")
public class FuelRate {

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

    @Column(name = "p_rate")
    private Double pRate;

    @Column(name = "d_rate")
    private Double dRate;

    @Column(name = "c_rate")
    private Double cRate;

    @Column(name = "effective_dt", nullable = false)
    private LocalDate effectiveDt;
}
