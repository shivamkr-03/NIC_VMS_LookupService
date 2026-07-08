package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CouponStatsDto {
    private Integer totalCoupons;
    private Integer totalBilledCoupons;
    private Integer totalCancelledCoupons;
    private Integer totalIssuedCoupons;
    private Double totalFuelQuantity;
    private Double totalBilledFuelQuantity;
}
