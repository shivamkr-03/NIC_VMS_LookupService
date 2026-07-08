package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FuelStatsDto {
    private String fuelTypeName;
    private Double totalQuantity;
    private Double totalAmount;
}
