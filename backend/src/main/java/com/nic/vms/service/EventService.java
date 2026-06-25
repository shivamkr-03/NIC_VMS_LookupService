package com.nic.vms.service;

import com.nic.vms.entity.Event;
import com.nic.vms.repository.EventRepository;
import com.nic.vms.service.interfaces.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService implements IEventService {

    @Autowired
    private EventRepository eventRepository;

    @Override //overriding the methods defined in the interface
    public List<Event> getAllActiveEvents() { //defining those methods which were already defined earlier

        return eventRepository.findByActiveOrderByYearDesc("Y"); //finding active elections and sorting them in descending order

    }
}