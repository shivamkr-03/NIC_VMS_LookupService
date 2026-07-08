package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PossessionDetailsDto {
    private LocalDateTime captureDateTime;
    private LocalDateTime releaseDateTime;
    private Integer totalPossessionHours;
    private Float totalPossessionDays;
    private Double ratePerDay;
    private Double proposedAmount;
    private Double netPayable;
    private List<PossessionSegmentDto> segments;
}
