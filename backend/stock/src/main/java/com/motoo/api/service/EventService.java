package com.motoo.api.service;

import com.motoo.api.response.EventsResponse;
import com.motoo.db.entity.Events;
import com.motoo.db.repository.EventsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {
    private final EventsRepository eventsRepository;
    @Transactional
    public EventsResponse getEventNow(){
        Events events = eventsRepository.findFirstByOrderByEventsIdDesc();

        return EventsResponse.response(events);
    }

}
