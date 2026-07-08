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
public class DailyFuelRateDto {
    private LocalDate date;
    private String fuelTypeName;
    private Double rate;
    private Double totalQuantity;
    private Double computedPrice;
}
