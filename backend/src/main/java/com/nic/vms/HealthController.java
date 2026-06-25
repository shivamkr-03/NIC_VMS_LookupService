package com.nic.vms;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class HealthController {
    @GetMapping("/health")
    public String health(){
        return "Successfully running";
    }
}
