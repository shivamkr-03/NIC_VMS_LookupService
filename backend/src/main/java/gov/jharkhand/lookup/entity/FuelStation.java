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
@Table(name = "fuelstations")
public class FuelStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "state_id", nullable = false)
    private Integer stateId;

    @Column(name = "district_id", nullable = false)
    private Integer districtId;

    @Column(name = "event_id", nullable = false)
    private Integer eventId;

    @Column(name = "company_id", nullable = false, length = 1)
    private String companyId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String ownername;

    @Column(nullable = false, length = 10)
    private String mobile;

    @Column(name = "contact_person", length = 100)
    private String contactPerson;

    @Column(name = "contact_person_mobile", length = 10)
    private String contactPersonMobile;

    @Column(nullable = false, length = 1)
    private String active;

    @Column(name = "payment_flag", length = 1)
    private String paymentFlag;

    @Column(name = "admin_type", length = 1)
    private String adminType;
}
