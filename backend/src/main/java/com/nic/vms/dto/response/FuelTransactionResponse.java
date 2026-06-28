package com.nic.vms.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class FuelTransactionResponse {

    private String couponNumber;

    private LocalDateTime issueDate;

    private String fuelType;

    private Double quantity;

    private Double rate;

    private BigDecimal amount;
}
