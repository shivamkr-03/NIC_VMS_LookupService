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
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false, length = 1)
    private String active;

    @Column(name = "active_by")
    private Integer activeBy;

    @Column(name = "active_dt")
    private LocalDate activeDt;

    @Column(name = "close_by")
    private Integer closeBy;

    @Column(name = "close_dt")
    private LocalDate closeDt;
}
