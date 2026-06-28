package com.nic.vms.utility;

import com.nic.vms.dto.response.FuelStationDashboardResponse;
import com.nic.vms.dto.response.FuelTransactionResponse;
import com.nic.vms.entity.FinalBilledFuelSlipFuelStation;
import com.nic.vms.entity.FinalPaymentFuelStation;
import com.nic.vms.entity.FuelStation;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class FuelStationUtil {
    public static FuelStationDashboardResponse buildDashboardResponse(FuelStation fuelStation,
                                                                      List<FinalPaymentFuelStation> paymentList){
        // Variables for Summary
        double totalPetrolLtr = 0;
        double totalDieselLtr = 0;
        double totalCngKg = 0;

        double totalPetrolAmount = 0;
        double totalDieselAmount = 0;
        double totalCngAmount = 0;

        double grossBill = 0;
        double advanceReceived = 0;

        // Aggregate Multiple Payment Records
        for (FinalPaymentFuelStation payment : paymentList) {

            totalPetrolLtr += payment.getTotalPetrolLtr() == null ? 0 : payment.getTotalPetrolLtr();

            totalDieselLtr += payment.getTotalDieselLtr() == null ? 0 : payment.getTotalDieselLtr();

            totalCngKg += payment.getTotalCngKg() == null ? 0 : payment.getTotalCngKg();

            totalPetrolAmount += payment.getTotalPetrolAmount() == null ? 0 : payment.getTotalPetrolAmount();

            totalDieselAmount += payment.getTotalDieselAmount() == null ? 0 : payment.getTotalDieselAmount();

            totalCngAmount += payment.getTotalCngAmount() == null ? 0 : payment.getTotalCngAmount();

            grossBill += payment.getFinalBilledAmount() == null ? 0 : payment.getFinalBilledAmount();

            advanceReceived += payment.getTotalAdvance() == null ? 0 : payment.getTotalAdvance();
        }

        double netReceivable = grossBill - advanceReceived;

        // Prepare Response
        FuelStationDashboardResponse response = new FuelStationDashboardResponse();

        response.setStationName(fuelStation.getName());
        response.setOwnerName(fuelStation.getOwnerName());

        response.setTotalPetrolLtr(totalPetrolLtr);
        response.setTotalDieselLtr(totalDieselLtr);
        response.setTotalCngKg(totalCngKg);

        response.setTotalPetrolAmount(totalPetrolAmount);
        response.setTotalDieselAmount(totalDieselAmount);
        response.setTotalCngAmount(totalCngAmount);

        response.setGrossBill(grossBill);
        response.setAdvanceReceived(advanceReceived);
        response.setNetReceivable(netReceivable);

        return response;
    }

    public static List<FuelTransactionResponse> buildTransactions(
            List<FinalBilledFuelSlipFuelStation> fuelSlipList) {

        List<FuelTransactionResponse> transactions =
                new ArrayList<>();

        for (FinalBilledFuelSlipFuelStation slip : fuelSlipList) {

            FuelTransactionResponse transaction =
                    new FuelTransactionResponse();

            transaction.setCouponNumber(
                    slip.getCouponNo());

            transaction.setIssueDate(
                    slip.getIssueDate());

            Double quantity =
                    slip.getQuantity() == null
                            ? 0.0
                            : slip.getQuantity();

            Double rate =
                    slip.getRate() == null
                            ? 0.0
                            : slip.getRate();

            transaction.setQuantity(quantity);

            transaction.setRate(rate);

            transaction.setAmount(
                    BigDecimal.valueOf(quantity)
                            .multiply(BigDecimal.valueOf(rate)));

            transaction.setFuelType(
                    getFuelTypeName(
                            slip.getFuelTypeId()));

            transactions.add(transaction);
        }

        return transactions;
    }

    public static String getFuelTypeName(String fuelTypeId) {

        switch (fuelTypeId) {

            case "P":
                return "Petrol";

            case "D":
                return "Diesel";

            case "C":
                return "CNG";

            default:
                return "Unknown";
        }
    }
}
