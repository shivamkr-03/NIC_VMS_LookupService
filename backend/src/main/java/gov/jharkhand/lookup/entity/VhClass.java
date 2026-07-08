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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "vhclasses")
public class VhClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(name = "vhcategory_id", nullable = false)
    private Integer vhcategoryId;

    @Column(name = "rate_per_day", nullable = false)
    private Double ratePerDay;

    private Double mileage;
}
