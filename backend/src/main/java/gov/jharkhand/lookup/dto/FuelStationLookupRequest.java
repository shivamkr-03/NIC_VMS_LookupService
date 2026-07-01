package gov.jharkhand.lookup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FuelStationLookupRequest {

    @NotNull(message = "Event ID is required")
    private Integer eventId;

    @NotNull(message = "District ID is required")
    private Integer districtId;

    @NotNull(message = "Station ID is required")
    private Integer stationId;

    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;
}
