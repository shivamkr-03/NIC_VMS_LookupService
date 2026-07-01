package gov.jharkhand.lookup.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FuelStationInfoDto {
    private Integer id;
    private String name;
    private String ownerName;
    private String mobile;
    private String contactPerson;
    private String contactPersonMobile;
    private String companyName;
    private String active;
    
    // Bank Details
    private String accountHolderName;
    private String accountNo;
    private String ifsc;
    private String bankName;
    private String branchName;
    private String bankDetailsStatus;
}
