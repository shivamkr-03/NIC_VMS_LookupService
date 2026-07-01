package gov.jharkhand.lookup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "districts")
public class District {

    @Id
    private Integer id;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(nullable = false, length = 100)
    private String name;
}
