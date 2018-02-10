package com.smarties.model;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smarties.entities.Event;

public interface EventRepository extends JpaRepository<Event, Long>{

}
