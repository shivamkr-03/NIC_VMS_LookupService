package gov.jharkhand.lookup.service.impl;

import gov.jharkhand.lookup.dto.*;
import gov.jharkhand.lookup.entity.*;
import gov.jharkhand.lookup.repository.*;
import gov.jharkhand.lookup.service.FuelStationLookupService;
import gov.jharkhand.lookup.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDate;
import gov.jharkhand.lookup.util.MaskingUtil;
import gov.jharkhand.lookup.entity.FinalBilledFuelSlipFuelStation;
import gov.jharkhand.lookup.repository.FinalBilledFuelSlipFuelStationRepository;

@Service
public class FuelStationLookupServiceImpl implements FuelStationLookupService {

    private final FuelStationRepository fuelStationRepository;
    private final BankDetailsFuelStationRepository bankDetailsFuelStationRepository;
    private final FinalPaymentFuelStationRepository finalPaymentFuelStationRepository;
    private final CompanyRepository companyRepository;
    private final FinalBilledFuelSlipFuelStationRepository finalBilledFuelSlipFuelStationRepository;
    private final FuelTypeRepository fuelTypeRepository;
    private final FuelRateRepository fuelRateRepository;

    public FuelStationLookupServiceImpl(
            FuelStationRepository fuelStationRepository,
            BankDetailsFuelStationRepository bankDetailsFuelStationRepository,
            FinalPaymentFuelStationRepository finalPaymentFuelStationRepository,
            CompanyRepository companyRepository,
            FinalBilledFuelSlipFuelStationRepository finalBilledFuelSlipFuelStationRepository,
            FuelTypeRepository fuelTypeRepository,
            FuelRateRepository fuelRateRepository) {
        this.fuelStationRepository = fuelStationRepository;
        this.bankDetailsFuelStationRepository = bankDetailsFuelStationRepository;
        this.finalPaymentFuelStationRepository = finalPaymentFuelStationRepository;
        this.companyRepository = companyRepository;
        this.finalBilledFuelSlipFuelStationRepository = finalBilledFuelSlipFuelStationRepository;
        this.fuelTypeRepository = fuelTypeRepository;
        this.fuelRateRepository = fuelRateRepository;
    }

    @Override
    public FuelStationLookupResponse lookupFuelStation(Integer eventId, Integer districtId, Integer stationId, String mobileNumber) {
        // 1. Verify existence of the fuel station matching keys and owner/contact mobile number
        FuelStation station = fuelStationRepository.findForLookup(stationId, eventId, districtId, mobileNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Fuel station not found or mobile mismatch"));

        // 2. Fetch Company Name
        String companyName = null;
        if (station.getCompanyId() != null) {
            companyName = companyRepository.findById(station.getCompanyId())
                    .map(Company::getName)
                    .orElse(station.getCompanyId());
        }

        // 3. Fetch Bank details (from bankdetails_fuelstation table first, fallback to final_payment_fuelstation)
        String accountHolderName = null;
        String accountNo = null;
        String ifsc = null;
        String bankName = null;
        String branchName = null;
        String bankDetailsStatus = null;

        List<BankDetailsFuelStation> banks = bankDetailsFuelStationRepository
                .findByFuelstationIdAndEventIdAndDistrictId(stationId, eventId, districtId);

        List<FinalPaymentFuelStation> payments = finalPaymentFuelStationRepository
                .findByFuelstationIdAndEventIdAndDistrictId(stationId, eventId, districtId);

        if (!banks.isEmpty()) {
            BankDetailsFuelStation bank = banks.stream()
                    .filter(b -> b.getAccountNo() != null && !b.getAccountNo().trim().isEmpty())
                    .findFirst()
                    .orElse(banks.get(0));
            accountHolderName = bank.getAccountHolderName();
            accountNo = bank.getAccountNo();
            ifsc = bank.getIfsc();
            bankName = bank.getBankName();
            branchName = bank.getBranchName();
            bankDetailsStatus = bank.getStatus();
        } else if (!payments.isEmpty()) {
            FinalPaymentFuelStation payment = payments.stream()
                    .filter(p -> p.getAccountNo() != null && !p.getAccountNo().trim().isEmpty())
                    .findFirst()
                    .orElse(payments.get(0));
            accountHolderName = payment.getAccountHolderName();
            accountNo = payment.getAccountNo();
            ifsc = payment.getIfsc();
            bankName = payment.getBankName();
            branchName = payment.getBranchName();
            bankDetailsStatus = payment.getKyc();
        }

        FuelStationInfoDto stationInfo = FuelStationInfoDto.builder()
                .id(station.getId())
                .name(station.getName())
                .ownerName(station.getOwnername())
                .mobile(MaskingUtil.maskMobile(station.getMobile()))
                .contactPerson(station.getContactPerson())
                .contactPersonMobile(MaskingUtil.maskMobile(station.getContactPersonMobile()))
                .companyName(companyName)
                .active(station.getActive())
                .accountHolderName(MaskingUtil.maskName(accountHolderName))
                .accountNo(MaskingUtil.maskAccountNumber(accountNo))
                .ifsc(ifsc)
                .bankName(bankName)
                .branchName(branchName)
                .bankDetailsStatus(bankDetailsStatus)
                .build();

        // 4. Calculate Coupon Statistics
        List<FinalBilledFuelSlipFuelStation> slips = finalBilledFuelSlipFuelStationRepository.findByFuelstationIdAndEventIdAndDistrictId(stationId, eventId, districtId);

        List<FuelRate> stationFuelRates = fuelRateRepository.findByFuelstationIdOrderByEffectiveDtDesc(stationId);
        
        slips.forEach(s -> {
            if (s.getRate() == null || s.getRate() == 0.0) {
                double rate = getApplicableRate(stationFuelRates, s.getFueltypeId(), s.getIssueDate() != null ? s.getIssueDate().toLocalDate() : null);
                s.setRate(rate);
            }
        });

        int totalCoupons = slips.size();
        int totalBilledCoupons = (int) slips.stream().filter(s -> "C".equalsIgnoreCase(s.getStatus()) || "U".equalsIgnoreCase(s.getStatus()) || "P".equalsIgnoreCase(s.getStatus()) || "B".equalsIgnoreCase(s.getStatus())).count();
        int totalCancelledCoupons = (int) slips.stream().filter(s -> "E".equalsIgnoreCase(s.getStatus())).count();
        int totalIssuedCoupons = (int) slips.stream().filter(s -> "A".equalsIgnoreCase(s.getStatus()) || "I".equalsIgnoreCase(s.getStatus()) || s.getStatus() == null).count();
        double totalFuelQuantity = slips.stream().filter(s -> !"E".equalsIgnoreCase(s.getStatus())).mapToDouble(FinalBilledFuelSlipFuelStation::getQty).sum();
        double totalBilledFuelQuantity = slips.stream().filter(s -> "C".equalsIgnoreCase(s.getStatus()) || "U".equalsIgnoreCase(s.getStatus()) || "P".equalsIgnoreCase(s.getStatus()) || "B".equalsIgnoreCase(s.getStatus())).mapToDouble(FinalBilledFuelSlipFuelStation::getQty).sum();

        CouponStatsDto couponStats = CouponStatsDto.builder()
                .totalCoupons(totalCoupons)
                .totalBilledCoupons(totalBilledCoupons)
                .totalCancelledCoupons(totalCancelledCoupons)
                .totalIssuedCoupons(totalIssuedCoupons)
                .totalFuelQuantity(totalFuelQuantity)
                .totalBilledFuelQuantity(totalBilledFuelQuantity)
                .build();

        // 5. Calculate Fuel Statistics by Type
        Map<String, String> fuelTypeMap = fuelTypeRepository.findAll().stream()
                .filter(ft -> ft.getId() != null)
                .collect(Collectors.toMap(FuelType::getId, FuelType::getName, (a, b) -> a));

        Map<String, List<FinalBilledFuelSlipFuelStation>> slipsByFuelType = slips.stream()
                .filter(s -> !"E".equalsIgnoreCase(s.getStatus()) && s.getFueltypeId() != null)
                .collect(Collectors.groupingBy(FinalBilledFuelSlipFuelStation::getFueltypeId));

        List<FuelStatsDto> fuelStats = slipsByFuelType.entrySet().stream()
                .map(entry -> {
                    String fTypeId = entry.getKey();
                    String fTypeName = fuelTypeMap.getOrDefault(fTypeId, fTypeId);
                    double qty = entry.getValue().stream().mapToDouble(FinalBilledFuelSlipFuelStation::getQty).sum();
                    double amount = entry.getValue().stream().mapToDouble(s -> (s.getRate() != null ? s.getRate() : 0.0) * (s.getQty() != null ? s.getQty() : 0.0)).sum();
                    return FuelStatsDto.builder()
                            .fuelTypeName(fTypeName)
                            .totalQuantity(qty)
                            .totalAmount(amount)
                            .build();
                })
                .collect(Collectors.toList());

        // 5.5 Calculate Daily Fuel Rates
        Map<java.time.LocalDate, Map<String, List<FinalBilledFuelSlipFuelStation>>> slipsByDateAndFuelType = slips.stream()
                .filter(s -> !"E".equalsIgnoreCase(s.getStatus()) && s.getIssueDate() != null && s.getFueltypeId() != null)
                .collect(Collectors.groupingBy(
                        s -> s.getIssueDate().toLocalDate(),
                        Collectors.groupingBy(FinalBilledFuelSlipFuelStation::getFueltypeId)
                ));

        List<DailyFuelRateDto> dailyFuelRates = new ArrayList<>();
        for (Map.Entry<java.time.LocalDate, Map<String, List<FinalBilledFuelSlipFuelStation>>> dateEntry : slipsByDateAndFuelType.entrySet()) {
            java.time.LocalDate date = dateEntry.getKey();
            for (Map.Entry<String, List<FinalBilledFuelSlipFuelStation>> ftEntry : dateEntry.getValue().entrySet()) {
                String fTypeId = ftEntry.getKey();
                String fTypeName = fuelTypeMap.getOrDefault(fTypeId, fTypeId);
                List<FinalBilledFuelSlipFuelStation> dailySlips = ftEntry.getValue();

                // Group further by rate to handle different rates on the same day if they occur
                Map<Double, List<FinalBilledFuelSlipFuelStation>> slipsByRate = dailySlips.stream()
                        .collect(Collectors.groupingBy(s -> s.getRate() != null ? s.getRate() : 0.0));

                for (Map.Entry<Double, List<FinalBilledFuelSlipFuelStation>> rateEntry : slipsByRate.entrySet()) {
                    Double rate = rateEntry.getKey();
                    double qty = rateEntry.getValue().stream().mapToDouble(FinalBilledFuelSlipFuelStation::getQty).sum();
                    double computedPrice = rateEntry.getValue().stream().mapToDouble(s -> (s.getRate() != null ? s.getRate() : 0.0) * (s.getQty() != null ? s.getQty() : 0.0)).sum();

                    dailyFuelRates.add(DailyFuelRateDto.builder()
                            .date(date)
                            .fuelTypeName(fTypeName)
                            .rate(rate)
                            .totalQuantity(qty)
                            .computedPrice(computedPrice)
                            .build());
                }
            }
        }
        
        // Sort descending by date
        dailyFuelRates.sort((a, b) -> b.getDate().compareTo(a.getDate()));

        // 6. Fetch Payment Information
        FuelStationPaymentDto paymentInfo = null;
        if (!payments.isEmpty()) {
            double totalAdvance = payments.stream()
                    .mapToDouble(p -> p.getTotalAdvance() != null ? p.getTotalAdvance() : 0.0)
                    .sum();
            double finalBilledAmount = payments.stream()
                    .mapToDouble(p -> p.getFinalBilledAmount() != null ? p.getFinalBilledAmount() : 0.0)
                    .sum();
            double netPayable = finalBilledAmount - totalAdvance;

            String utrNo = payments.stream()
                    .map(FinalPaymentFuelStation::getUtrNo)
                    .filter(Objects::nonNull)
                    .filter(s -> !s.trim().isEmpty())
                    .distinct()
                    .collect(Collectors.joining(", "));
            if (utrNo.isEmpty()) utrNo = null;

            LocalDate utrDate = payments.stream()
                    .map(FinalPaymentFuelStation::getUtrDt)
                    .filter(Objects::nonNull)
                    .max(LocalDate::compareTo)
                    .orElse(null);

            LocalDate utrUpdateDate = payments.stream()
                    .map(FinalPaymentFuelStation::getUtrUpdateDt)
                    .filter(Objects::nonNull)
                    .max(LocalDate::compareTo)
                    .orElse(null);

            boolean isKycVerified = payments.stream()
                    .map(FinalPaymentFuelStation::getKyc)
                    .filter(Objects::nonNull)
                    .anyMatch(k -> "Y".equalsIgnoreCase(k) || "YES".equalsIgnoreCase(k));
            String kycStatus = isKycVerified ? "Y" : (payments.stream()
                    .map(FinalPaymentFuelStation::getKyc)
                    .filter(Objects::nonNull)
                    .filter(k -> !k.trim().isEmpty())
                    .findFirst()
                    .orElse("N"));

            paymentInfo = FuelStationPaymentDto.builder()
                    .totalAdvance(totalAdvance)
                    .finalBilledAmount(finalBilledAmount)
                    .netPayable(netPayable)
                    .utrNo(utrNo)
                    .utrDate(utrDate)
                    .utrUpdateDate(utrUpdateDate)
                    .kycStatus(kycStatus)
                    .build();
        } else {
            paymentInfo = FuelStationPaymentDto.builder()
                    .totalAdvance(0.0)
                    .finalBilledAmount(0.0)
                    .netPayable(0.0)
                    .build();
        }

        return FuelStationLookupResponse.builder()
                .stationInformation(stationInfo)
                .couponStatistics(couponStats)
                .fuelStatistics(fuelStats)
                .dailyFuelRates(dailyFuelRates)
                .paymentInformation(paymentInfo)
                .build();
    }

    private double getApplicableRate(List<FuelRate> rates, String fuelTypeId, java.time.LocalDate issueDate) {
        if (rates == null || rates.isEmpty() || issueDate == null) return 0.0;
        for (FuelRate fr : rates) {
            if (!fr.getEffectiveDt().isAfter(issueDate)) {
                if ("P".equalsIgnoreCase(fuelTypeId) && fr.getPRate() != null) return fr.getPRate();
                if ("D".equalsIgnoreCase(fuelTypeId) && fr.getDRate() != null) return fr.getDRate();
                if ("C".equalsIgnoreCase(fuelTypeId) && fr.getCRate() != null) return fr.getCRate();
            }
        }
        return 0.0;
    }

    @Override
    public List<CouponDetailDto> getCoupons(Integer fuelstationId, Integer eventId, Integer districtId, int page, int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(
                page, size, org.springframework.data.domain.Sort.by("issueDate").descending());
        
        org.springframework.data.domain.Page<FinalBilledFuelSlipFuelStation> pageResult = 
                finalBilledFuelSlipFuelStationRepository.findByFuelstationIdAndEventIdAndDistrictId(
                        fuelstationId, eventId, districtId, pageable);
        
        List<FinalBilledFuelSlipFuelStation> slips = pageResult.getContent();
        if (slips.isEmpty()) {
            return new ArrayList<>();
        }

        List<FuelRate> stationFuelRates = fuelRateRepository.findByFuelstationIdOrderByEffectiveDtDesc(fuelstationId);
        
        Map<String, String> fuelTypeMap = fuelTypeRepository.findAll().stream()
                .filter(ft -> ft.getId() != null)
                .collect(Collectors.toMap(FuelType::getId, FuelType::getName, (a, b) -> a));

        return slips.stream().map(s -> {
            Double rate = s.getRate();
            if (rate == null || rate == 0.0) {
                rate = getApplicableRate(stationFuelRates, s.getFueltypeId(), s.getIssueDate() != null ? s.getIssueDate().toLocalDate() : null);
            }
            double qty = s.getQty() != null ? s.getQty() : 0.0;
            double amount = qty * (rate != null ? rate : 0.0);
            
            return CouponDetailDto.builder()
                    .couponNo(s.getCouponNo())
                    .qty(qty)
                    .rate(rate)
                    .amount(amount)
                    .status(getFriendlyStatus(s.getStatus()))
                    .rawStatus(s.getStatus())
                    .issueDate(s.getIssueDate())
                    .fuelTypeName(fuelTypeMap.getOrDefault(s.getFueltypeId(), "Unknown"))
                    .build();
        }).collect(Collectors.toList());
    }

    private String getFriendlyStatus(String statusChar) {
        if (statusChar == null) {
            return "Issued (Pending)";
        }
        switch (statusChar.toUpperCase()) {
            case "C":
            case "U":
            case "P":
            case "B":
                return "Billed";
            case "E":
                return "Cancelled";
            case "A":
            case "I":
            default:
                return "Issued (Pending)";
        }
    }
}
