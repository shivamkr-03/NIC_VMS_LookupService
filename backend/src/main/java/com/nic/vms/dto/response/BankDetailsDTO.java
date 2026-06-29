package com.nic.vms.dto.response;

import lombok.Data;

@Data
public class BankDetailsDTO {

    private String bankName;

    private String branchName;

    private String accountHolderName;

    private String ifsc;
}