package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FuelStationPaymentDto {
    private Double totalAdvance;
    private Double finalBilledAmount;
    private Double netPayable;
    private String utrNo;
    private LocalDate utrDate;
    private LocalDate utrUpdateDate;
    private String kycStatus;
}
