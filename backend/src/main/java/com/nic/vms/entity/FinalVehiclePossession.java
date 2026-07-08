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
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "final_vehicle_possession")
public class FinalVehiclePossession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "final_payment_vehicle_id", nullable = false)
    private Integer finalPaymentVehicleId;

    @Column(name = "admin_type", nullable = false, length = 1)
    private String adminType;

    @Column(name = "from_dttm", nullable = false)
    private LocalDateTime fromDttm;

    @Column(name = "to_dttm", nullable = false)
    private LocalDateTime toDttm;

    @Column(name = "in_hr", nullable = false)
    private Float inHr;

    @Column(name = "in_day", nullable = false)
    private Float inDay;

    @Column(length = 50)
    private String type;
}
