package gov.jharkhand.lookup.service.impl;

import gov.jharkhand.lookup.dto.EventDto;
import gov.jharkhand.lookup.entity.Event;
import gov.jharkhand.lookup.repository.EventRepository;
import gov.jharkhand.lookup.service.EventService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<EventDto> getActiveEvents() {
        List<Event> activeEvents = eventRepository.findByActiveOrderByIdDesc("Y");
        return activeEvents.stream()
                .map(event -> new EventDto(event.getId(), event.getName()))
                .collect(Collectors.toList());
    }
}
