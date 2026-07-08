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
public class VehicleLookupResponse {
    private PrimaryDetailsDto primaryDetails;
    private PossessionDetailsDto possessionDetails;
    private List<LogbookDto> logbooks;
    private List<FuelCouponDto> fuelCoupons;
    private VehicleAnalysisDto analysisDetails;
}
