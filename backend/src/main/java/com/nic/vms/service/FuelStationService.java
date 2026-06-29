package com.nic.vms.service;

import com.nic.vms.Constants.StatusConstants;
import com.nic.vms.dto.request.FuelStationSearchRequest;
import com.nic.vms.dto.response.CouponSummaryDTO;
import com.nic.vms.dto.response.FuelStationDashboardResponse;
import com.nic.vms.dto.response.FuelTransactionResponse;
import com.nic.vms.entity.FinalPaymentFuelStation;
import com.nic.vms.entity.FuelStation;
import com.nic.vms.repository.FinalBilledFuelSlipFuelStationRepository;
import com.nic.vms.repository.FinalPaymentFuelStationRepository;
import com.nic.vms.repository.FuelStationRepository;
import com.nic.vms.service.interfaces.IFuelStationService;
import com.nic.vms.utility.FuelStationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nic.vms.entity.FinalBilledFuelSlipFuelStation;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class FuelStationService implements IFuelStationService {

    @Autowired
    private FuelStationRepository fuelStationRepository;

    @Autowired
    private FinalPaymentFuelStationRepository finalPaymentFuelStationRepository;

    @Autowired
    private FinalBilledFuelSlipFuelStationRepository finalBilledFuelSlipFuelStationRepository;


    @Override
    public List<FuelStation> getFuelStations(Integer eventId,
                                             Integer districtId) {

        return fuelStationRepository.findByEventIdAndDistrictIdAndActive(
                eventId,
                districtId,
                "Y"
        );
    }

    @Override
    public FuelStationDashboardResponse searchFuelStation(
            FuelStationSearchRequest request) {

        // Verify Fuel Station
        FuelStation fuelStation = fuelStationRepository
                .findByIdAndEventIdAndDistrictId(
                        request.getFuelStationId(),
                        request.getEventId(),
                        request.getDistrictId()
                )
                .orElseThrow(() ->
                        new RuntimeException("Invalid Fuel Station Details"));

        // Verify Mobile Number
        if (!fuelStation.getMobile().equals(request.getMobileNumber())) {
            throw new RuntimeException("Invalid Mobile Number");
        }

        // Fetch Payment Summary
        List<FinalPaymentFuelStation> paymentList =
                finalPaymentFuelStationRepository
                        .findByFuelStationIdAndEventIdAndDistrictId(
                                request.getFuelStationId(),
                                request.getEventId(),
                                request.getDistrictId()
                        );

        if (paymentList.isEmpty()) {
            throw new RuntimeException("No payment details found.");
        }

        FuelStationDashboardResponse response =
                FuelStationUtil.buildDashboardResponse(
                        fuelStation,
                        paymentList
                );

        // Fetch Fuel Slips
        List<FinalBilledFuelSlipFuelStation> fuelSlipList =
                finalBilledFuelSlipFuelStationRepository
                        .findByFuelStationIdAndEventIdAndDistrictIdAndStatus(
                                request.getFuelStationId(),
                                request.getEventId(),
                                request.getDistrictId(),
                                StatusConstants.ACTIVE
                        );
        
        // Build Transactions using Utility
        response.setTransactions(
                FuelStationUtil.buildTransactions(fuelSlipList));

        CouponSummaryDTO summary = new CouponSummaryDTO();

        long active = finalBilledFuelSlipFuelStationRepository
                .countByFuelStationAndStatus(
                        request.getFuelStationId(),
                        request.getEventId(),
                        request.getDistrictId(),
                        "A"
                );

        long used = finalBilledFuelSlipFuelStationRepository
                .countByFuelStationAndStatus(
                        request.getFuelStationId(),
                        request.getEventId(),
                        request.getDistrictId(),
                        "U"
                );

        long cancelled = finalBilledFuelSlipFuelStationRepository
                .countByFuelStationAndStatus(
                        request.getFuelStationId(),
                        request.getEventId(),
                        request.getDistrictId(),
                        "C"
                );

        long expired = finalBilledFuelSlipFuelStationRepository
                .countByFuelStationAndStatus(
                        request.getFuelStationId(),
                        request.getEventId(),
                        request.getDistrictId(),
                        "E"
                );

        summary.setActiveCoupons(active);
        summary.setUsedCoupons(used);
        summary.setCancelledCoupons(cancelled);
        summary.setExpiredCoupons(expired);
        summary.setTotalIssued(active + used + cancelled + expired);

        response.setCouponSummary(summary);

        return response;
    }
}