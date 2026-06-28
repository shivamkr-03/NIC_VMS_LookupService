package com.nic.vms.repository;

import com.nic.vms.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

     List<Event> findByActiveOrderByYearDesc(String active);

}