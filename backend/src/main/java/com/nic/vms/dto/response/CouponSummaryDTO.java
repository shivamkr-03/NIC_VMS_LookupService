package com.nic.vms.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouponSummaryDTO {

    private long totalIssued;

    private long activeCoupons;

    private long usedCoupons;

    private long cancelledCoupons;

    private long expiredCoupons;
}