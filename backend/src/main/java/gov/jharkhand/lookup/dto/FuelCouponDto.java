package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FuelCouponDto {
    private Integer id;
    private String couponNo;
    private LocalDateTime issueDate;
    private Double qty;
    private Double fuelRate;
    private Double amount;
    private String status;
    private LocalDateTime validUpto;
    private String reason;
    private String fuelStationName;
    private String fuelTypeName;
}
