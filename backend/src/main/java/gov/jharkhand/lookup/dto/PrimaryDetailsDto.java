package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrimaryDetailsDto {
    private Integer vehicleId;
    private String registrationNo;
    private String ownerName;
    private String ownerMobile;
    private String vehicleType;
    private String engineNo;
    private String chassisNo;
    private Integer seatCapacity;
    private String status;
    private String rtoName;
    private String vehicleClassName;
    private String fuelTypeName;
    private String driverName;
    private String driverMobile;
    private String helperName;
    private String helperMobile;
    private String captureFromPlace;
}
