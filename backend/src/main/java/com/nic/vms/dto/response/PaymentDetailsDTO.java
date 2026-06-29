package com.nic.vms.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PaymentDetailsDTO {

    private String utrNumber;

    private LocalDate utrDate;
}