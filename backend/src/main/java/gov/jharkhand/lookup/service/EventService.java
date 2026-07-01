package gov.jharkhand.lookup.service;

import gov.jharkhand.lookup.dto.EventDto;
import java.util.List;

public interface EventService {
    List<EventDto> getActiveEvents();
}
