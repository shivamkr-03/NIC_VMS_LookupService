package gov.jharkhand.lookup.controller;

import gov.jharkhand.lookup.dto.EventDto;
import gov.jharkhand.lookup.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/public/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getActiveEvents() {
        List<EventDto> events = eventService.getActiveEvents();
        return ResponseEntity.ok(events);
    }
}
