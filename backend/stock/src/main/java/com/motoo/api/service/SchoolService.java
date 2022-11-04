package com.motoo.api.service;

import com.motoo.api.response.SchoolResponse;
import com.motoo.db.repository.SchoolRepository;
import com.motoo.db.repository.SigunguRepository;
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
    private final SigunguRepository sigunguRepository;

    @Transactional
    public List<SchoolResponse> getSchoolList() {
        List<SchoolResponse> schools = schoolRepository.findAll().stream()
                .map(SchoolResponse::response)
                .collect(Collectors.toList());
        return schools;
    }
    }
