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
public class LogbookDto {
    private Integer id;
    private LocalDateTime dateTime;
    private Long meterFromKm;
    private Long meterToKm;
    private Long distanceInKm;
    private String fromPlace;
    private String via;
    private String toPlace;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String officerName;
    private String headName;
}
