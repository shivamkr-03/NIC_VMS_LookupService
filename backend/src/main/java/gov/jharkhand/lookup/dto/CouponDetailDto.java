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
public class CouponDetailDto {
    private String couponNo;
    private Double qty;
    private Double rate;
    private Double amount;
    private String status;
    private String rawStatus;
    private LocalDateTime issueDate;
    private String fuelTypeName;
}
