package com.nic.vms.controller;

import com.nic.vms.dto.response.ApiResponse;
import com.nic.vms.entity.Event;
import com.nic.vms.service.interfaces.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class EventController {

    @Autowired
    private IEventService eventService;

    @GetMapping("/events")
    public ResponseEntity<ApiResponse<List<Event>>> getEvents() {

        List<Event> events =
                eventService.getAllActiveEvents();

        return ResponseEntity.ok(

                new ApiResponse<>(
                        true,
                        "Events fetched successfully",
                        events
                )
        );
    }
}