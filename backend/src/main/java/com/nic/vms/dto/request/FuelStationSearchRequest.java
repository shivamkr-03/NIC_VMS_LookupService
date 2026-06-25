package com.nic.vms.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class FuelStationSearchRequest {

    @NotNull(message = "Event is required")
    private Integer eventId;

    @NotNull(message = "District is required")
    private Integer districtId;

    @NotNull(message = "Fuel Station is required")
    private Integer fuelStationId;

    @NotBlank(message = "Mobile Number is required")
    @Pattern(
            regexp = "\\d{10}",
            message = "Mobile Number must be 10 digits"
    )
    private String mobileNumber;

    @NotBlank(message = "Captcha is required")
    private String captcha;
}