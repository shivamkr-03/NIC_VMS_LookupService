package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FuelStationLookupResponse {
    private FuelStationInfoDto stationInformation;
    private CouponStatsDto couponStatistics;
    private List<FuelStatsDto> fuelStatistics;
    private List<DailyFuelRateDto> dailyFuelRates;
    private FuelStationPaymentDto paymentInformation;
}
