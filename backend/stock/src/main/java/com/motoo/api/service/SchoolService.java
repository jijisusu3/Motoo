package com.motoo.api.service;

import com.motoo.api.response.SchoolPageResponse;
import com.motoo.api.response.SchoolResponse;
import com.motoo.db.entity.Events;
import com.motoo.db.entity.School;
import com.motoo.db.entity.Sigungu;
import com.motoo.db.entity.User;
import com.motoo.db.repository.EventsRepository;
import com.motoo.db.repository.SchoolRepository;
import com.motoo.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SchoolService {
    private final SchoolRepository schoolRepository;
    private final UserRepository userRepository;
    private final EventsRepository eventsRepository;

    @Transactional
    public List<SchoolResponse> getSchoolList() {
        List<SchoolResponse> schools = schoolRepository.findAll().stream()
                .map(SchoolResponse::response)
                .collect(Collectors.toList());
        return schools;
    }
        @Transactional
        public SchoolPageResponse getSchoolPage(Long id) {
            User user = userRepository.findById(id).get();
            School school = user.getSchool();
            Events events = eventsRepository.findFirstByOrderByEventsIdDesc();
            return SchoolPageResponse.response(school, events);



        }


}

