package com.nic.vms.service.interfaces;

import com.nic.vms.entity.Event;

import java.util.List;

public interface IEventService {
    //to have loose coupling
    List<Event> getAllActiveEvents();
    //all methods are defined here
}