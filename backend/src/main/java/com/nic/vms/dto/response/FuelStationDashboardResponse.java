package com.nic.vms.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class FuelStationDashboardResponse {

    private String stationName;

    private String ownerName;

    private Double totalPetrolLtr;
    private Double totalDieselLtr;
    private Double totalCngKg;

    private Double totalPetrolAmount;
    private Double totalDieselAmount;
    private Double totalCngAmount;

    private Double grossBill;
    private Double advanceReceived;
    private Double netReceivable;

    private CouponSummaryDTO couponSummary;

    private BankDetailsDTO bankDetails;

    private PaymentDetailsDTO paymentDetails;

    private List<FuelTransactionResponse> transactions;
}