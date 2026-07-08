package gov.jharkhand.lookup.service.impl;

import gov.jharkhand.lookup.dto.*;
import gov.jharkhand.lookup.entity.*;
import gov.jharkhand.lookup.repository.*;
import gov.jharkhand.lookup.service.VehicleLookupService;
import gov.jharkhand.lookup.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Objects;
import java.util.Comparator;
import gov.jharkhand.lookup.util.MaskingUtil;

@Service
public class VehicleLookupServiceImpl implements VehicleLookupService {

    private final VehicleRepository vehicleRepository;
    private final ReadyForAllocationRepository readyForAllocationRepository;
    private final FinalPaymentVehicleRepository finalPaymentVehicleRepository;
    private final FinalVehiclePossessionRepository finalVehiclePossessionRepository;
    private final LogbookRepository logbookRepository;
    private final FuelSlipRepository fuelSlipRepository;
    private final RtoRepository rtoRepository;
    private final VhClassRepository vhClassRepository;
    private final FuelTypeRepository fuelTypeRepository;
    private final HeadRepository headRepository;
    private final FuelStationRepository fuelStationRepository;
    private final AnalysisRepository analysisRepository;

    public VehicleLookupServiceImpl(
            VehicleRepository vehicleRepository,
            ReadyForAllocationRepository readyForAllocationRepository,
            FinalPaymentVehicleRepository finalPaymentVehicleRepository,
            FinalVehiclePossessionRepository finalVehiclePossessionRepository,
            LogbookRepository logbookRepository,
            FuelSlipRepository fuelSlipRepository,
            RtoRepository rtoRepository,
            VhClassRepository vhClassRepository,
            FuelTypeRepository fuelTypeRepository,
            HeadRepository headRepository,
            FuelStationRepository fuelStationRepository,
            AnalysisRepository analysisRepository) {
        this.vehicleRepository = vehicleRepository;
        this.readyForAllocationRepository = readyForAllocationRepository;
        this.finalPaymentVehicleRepository = finalPaymentVehicleRepository;
        this.finalVehiclePossessionRepository = finalVehiclePossessionRepository;
        this.logbookRepository = logbookRepository;
        this.fuelSlipRepository = fuelSlipRepository;
        this.rtoRepository = rtoRepository;
        this.vhClassRepository = vhClassRepository;
        this.fuelTypeRepository = fuelTypeRepository;
        this.headRepository = headRepository;
        this.fuelStationRepository = fuelStationRepository;
        this.analysisRepository = analysisRepository;
    }

    @Override
    public VehicleLookupResponse lookupVehicle(Integer eventId, String registrationNumber, String engineOrChassisNumber) {
        // 1. Validate vehicle exists in master registry
        Vehicle vehicle = vehicleRepository.findByRegistrationAndEngineOrChassis(registrationNumber, engineOrChassisNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found in registry"));

        // 2. Fetch event acquisition/allocation details
        List<ReadyForAllocation> allocations = readyForAllocationRepository.findByEventAndRegistrationAndEngineOrChassis(
                eventId, registrationNumber, engineOrChassisNumber);
        if (allocations.isEmpty()) {
            throw new ResourceNotFoundException("Vehicle allocation for event not found");
        }

        // 3. Resolve names for primary details DTO
        String rtoName = allocations.stream()
                .map(ReadyForAllocation::getRtoId)
                .filter(Objects::nonNull)
                .findFirst()
                .flatMap(rtoRepository::findById)
                .map(Rto::getName)
                .orElse(null);

        String vehicleClassName = allocations.stream()
                .map(ReadyForAllocation::getVhclassId)
                .filter(Objects::nonNull)
                .findFirst()
                .flatMap(vhClassRepository::findById)
                .map(VhClass::getName)
                .orElse(null);

        String fuelTypeName = allocations.stream()
                .map(ReadyForAllocation::getFueltypeId)
                .filter(Objects::nonNull)
                .findFirst()
                .flatMap(fuelTypeRepository::findById)
                .map(FuelType::getName)
                .orElse(null);

        String driverName = allocations.stream()
                .map(ReadyForAllocation::getDriverName)
                .filter(Objects::nonNull)
                .filter(s -> !s.trim().isEmpty())
                .distinct()
                .collect(Collectors.joining(", "));
        if (driverName.isEmpty()) driverName = null;

        String driverMobile = allocations.stream()
                .map(ReadyForAllocation::getDriverMobile)
                .filter(Objects::nonNull)
                .filter(s -> !s.trim().isEmpty())
                .map(MaskingUtil::maskMobile)
                .distinct()
                .collect(Collectors.joining(", "));
        if (driverMobile.isEmpty()) driverMobile = null;

        String helperName = allocations.stream()
                .map(ReadyForAllocation::getHelperName)
                .filter(Objects::nonNull)
                .filter(s -> !s.trim().isEmpty())
                .distinct()
                .collect(Collectors.joining(", "));
        if (helperName.isEmpty()) helperName = null;

        String helperMobile = allocations.stream()
                .map(ReadyForAllocation::getHelperMobile)
                .filter(Objects::nonNull)
                .filter(s -> !s.trim().isEmpty())
                .map(MaskingUtil::maskMobile)
                .distinct()
                .collect(Collectors.joining(", "));
        if (helperMobile.isEmpty()) helperMobile = null;

        String captureFromPlace = allocations.stream()
                .map(ReadyForAllocation::getCaptureFromPlace)
                .filter(Objects::nonNull)
                .filter(s -> !s.trim().isEmpty())
                .distinct()
                .collect(Collectors.joining(", "));
        if (captureFromPlace.isEmpty()) captureFromPlace = null;

        PrimaryDetailsDto primaryDetails = PrimaryDetailsDto.builder()
                .vehicleId(vehicle.getId())
                .registrationNo(vehicle.getRegistrationNo())
                .ownerName(vehicle.getOwnerName())
                .ownerMobile(MaskingUtil.maskMobile(vehicle.getMobile()))
                .vehicleType(vehicle.getType())
                .engineNo(vehicle.getEngineNo())
                .chassisNo(vehicle.getChessisNo()) // map mapped vehicles.chessis_no
                .seatCapacity(vehicle.getSeatCapacity())
                .status(vehicle.getStatus())
                .rtoName(rtoName)
                .vehicleClassName(vehicleClassName)
                .fuelTypeName(fuelTypeName)
                .driverName(driverName)
                .driverMobile(driverMobile)
                .helperName(helperName)
                .helperMobile(helperMobile)
                .captureFromPlace(captureFromPlace)
                .build();

        // 4. Fetch possession details
        PossessionDetailsDto possessionDetails = null;
        List<FinalPaymentVehicle> paymentVehicles = finalPaymentVehicleRepository.findByEventIdAndRegistrationNo(eventId, registrationNumber);

        if (!paymentVehicles.isEmpty()) {
            double ratePerDay = paymentVehicles.stream()
                    .mapToDouble(p -> p.getRatePerDay() != null ? p.getRatePerDay() : 0.0)
                    .max()
                    .orElse(0.0);

            int totalPossessionHours = paymentVehicles.stream()
                    .mapToInt(p -> p.getPossessionHours() != null ? p.getPossessionHours() : 0)
                    .sum();

            Float totalPossessionDays = (float) paymentVehicles.stream()
                    .mapToDouble(p -> p.getPossessionDays() != null ? p.getPossessionDays() : 0.0)
                    .sum();

            double proposedAmount = paymentVehicles.stream()
                    .mapToDouble(p -> p.getProposedAmount() != null ? p.getProposedAmount() : 0.0)
                    .sum();

            double netPayable = paymentVehicles.stream()
                    .mapToDouble(p -> p.getNetPayable() != null ? p.getNetPayable() : 0.0)
                    .sum();

            java.time.LocalDateTime captureDateTime = paymentVehicles.stream()
                    .map(FinalPaymentVehicle::getCaptureDtTm)
                    .filter(Objects::nonNull)
                    .min(java.time.LocalDateTime::compareTo)
                    .orElse(allocations.stream()
                            .map(ReadyForAllocation::getCaptureDtTm)
                            .filter(Objects::nonNull)
                            .min(java.time.LocalDateTime::compareTo)
                            .orElse(null));

            java.time.LocalDateTime releaseDateTime = paymentVehicles.stream()
                    .map(FinalPaymentVehicle::getReleaseDtTm)
                    .filter(Objects::nonNull)
                    .max(java.time.LocalDateTime::compareTo)
                    .orElse(allocations.stream()
                            .map(ReadyForAllocation::getReleaseDtTm)
                            .filter(Objects::nonNull)
                            .max(java.time.LocalDateTime::compareTo)
                            .orElse(null));

            List<PossessionSegmentDto> segmentDtos = new ArrayList<>();
            for (FinalPaymentVehicle paymentVehicle : paymentVehicles) {
                List<FinalVehiclePossession> segments = finalVehiclePossessionRepository.findByFinalPaymentVehicleIdOrderByFromDttmAsc(paymentVehicle.getId());
                segmentDtos.addAll(segments.stream()
                        .map(seg -> PossessionSegmentDto.builder()
                                .fromDateTime(seg.getFromDttm())
                                .toDateTime(seg.getToDttm())
                                .hours(seg.getInHr())
                                .days(seg.getInDay())
                                .type(seg.getType())
                                .build())
                        .collect(Collectors.toList()));
            }
            segmentDtos.sort(Comparator.comparing(PossessionSegmentDto::getFromDateTime, Comparator.nullsLast(Comparator.naturalOrder())));

            possessionDetails = PossessionDetailsDto.builder()
                    .captureDateTime(captureDateTime)
                    .releaseDateTime(releaseDateTime)
                    .totalPossessionHours(totalPossessionHours)
                    .totalPossessionDays(totalPossessionDays)
                    .ratePerDay(ratePerDay)
                    .proposedAmount(proposedAmount)
                    .netPayable(netPayable)
                    .segments(segmentDtos)
                    .build();
        } else {
            // Default possession summary if no finalized billing exists yet, populated from acquisition entry
            java.time.LocalDateTime captureDateTime = allocations.stream()
                    .map(ReadyForAllocation::getCaptureDtTm)
                    .filter(Objects::nonNull)
                    .min(java.time.LocalDateTime::compareTo)
                    .orElse(null);

            java.time.LocalDateTime releaseDateTime = allocations.stream()
                    .map(ReadyForAllocation::getReleaseDtTm)
                    .filter(Objects::nonNull)
                    .max(java.time.LocalDateTime::compareTo)
                    .orElse(null);

            possessionDetails = PossessionDetailsDto.builder()
                    .captureDateTime(captureDateTime)
                    .releaseDateTime(releaseDateTime)
                    .segments(new ArrayList<>())
                    .build();
        }

        // 5. Fetch logbook records
        List<Logbook> logbooks = logbookRepository.findByEventIdAndRegistrationNoOrderByDateTimeAsc(eventId, registrationNumber);
        List<LogbookDto> logbookDtos = logbooks.stream()
                .map(log -> {
                    String headName = null;
                    if (log.getHeadId() != null) {
                        headName = headRepository.findById(log.getHeadId())
                                .map(Head::getName)
                                .orElse(null);
                    }
                    return LogbookDto.builder()
                            .id(log.getId())
                            .dateTime(log.getDateTime())
                            .meterFromKm(log.getMeterFromKm())
                            .meterToKm(log.getMeterToKm())
                            .distanceInKm(log.getDistanceInKm())
                            .fromPlace(log.getFromPlace())
                            .via(log.getVia())
                            .toPlace(log.getToPlace())
                            .startDateTime(log.getStartDtTm())
                            .endDateTime(log.getEndDtTm())
                            .officerName(log.getOfficerName())
                            .headName(headName)
                            .build();
                })
                .collect(Collectors.toList());

        // 6. Fetch fuel coupon records
        List<FuelSlip> slips = fuelSlipRepository.findByEventIdAndRegistrationNoOrderByIssueDateAsc(eventId, registrationNumber);
        List<FuelCouponDto> fuelCouponDtos = slips.stream()
                .map(slip -> {
                    String stationName = null;
                    if (slip.getFuelstationId() != null) {
                        stationName = fuelStationRepository.findById(slip.getFuelstationId())
                                .map(FuelStation::getName)
                                .orElse(null);
                    }
                    String fTypeName = null;
                    if (slip.getFueltypeId() != null) {
                        fTypeName = fuelTypeRepository.findById(slip.getFueltypeId())
                                .map(FuelType::getName)
                                .orElse(null);
                    }
                    String rawStatus = slip.getStatus();
                    String normStatus = "I";
                    if (rawStatus != null) {
                        if ("C".equalsIgnoreCase(rawStatus) || "U".equalsIgnoreCase(rawStatus) || "P".equalsIgnoreCase(rawStatus) || "B".equalsIgnoreCase(rawStatus)) {
                            normStatus = "B";
                        } else if ("E".equalsIgnoreCase(rawStatus)) {
                            normStatus = "C";
                        } else if ("A".equalsIgnoreCase(rawStatus) || "I".equalsIgnoreCase(rawStatus)) {
                            normStatus = "I";
                        }
                    }
                    return FuelCouponDto.builder()
                            .id(slip.getId())
                            .couponNo(slip.getCouponNo())
                            .issueDate(slip.getIssueDate())
                            .qty(slip.getQty())
                            .fuelRate(slip.getOFuelRate())
                            .amount(slip.getOAmount())
                            .status(normStatus)
                            .validUpto(slip.getValidUpto())
                            .reason(slip.getReason())
                            .fuelStationName(stationName)
                            .fuelTypeName(fTypeName)
                            .build();
                })
                .collect(Collectors.toList());

        // 7. Fetch and map analysis details
        VehicleAnalysisDto analysisDetails = analysisRepository.findByEventIdAndRegistrationNo(eventId, registrationNumber)
                .map(analysis -> VehicleAnalysisDto.builder()
                        .id(analysis.getId())
                        .stateId(analysis.getStateId())
                        .districtId(analysis.getDistrictId())
                        .adminType(analysis.getAdminType())
                        .name(analysis.getName())
                        .type(analysis.getType())
                        .registrationNo(analysis.getRegistrationNo())
                        .mileage(analysis.getMileage())
                        .distanceInKm(analysis.getDistanceInKm())
                        .logbookCn(analysis.getLogbookCn())
                        .qty(analysis.getQty())
                        .fuelslipCn(analysis.getFuelslipCn())
                        .amount(analysis.getAmount())
                        .payCn(analysis.getPayCn())
                        .eventId(analysis.getEventId())
                        .kyc(analysis.getKyc())
                        .build())
                .orElse(null);

        // 8. Assemble and return response
        return VehicleLookupResponse.builder()
                .primaryDetails(primaryDetails)
                .possessionDetails(possessionDetails)
                .logbooks(logbookDtos)
                .fuelCoupons(fuelCouponDtos)
                .analysisDetails(analysisDetails)
                .build();
    }
}
