package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleAnalysisDto {
    private Integer id;
    private Integer stateId;
    private Integer districtId;
    private String adminType;
    private String name;
    private String type;
    private String registrationNo;
    private Double mileage;
    private BigDecimal distanceInKm;
    private Long logbookCn;
    private Double qty;
    private Long fuelslipCn;
    private Double amount;
    private Integer payCn;
    private Integer eventId;
    private String kyc;
}
