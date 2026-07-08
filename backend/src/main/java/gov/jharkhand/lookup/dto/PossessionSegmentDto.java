package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PossessionSegmentDto {
    private LocalDateTime fromDateTime;
    private LocalDateTime toDateTime;
    private Float hours;
    private Float days;
    private String type;
}
