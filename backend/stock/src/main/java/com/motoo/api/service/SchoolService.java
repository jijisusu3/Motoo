package com.motoo.api.service;

import com.motoo.api.response.SchoolAccResponse;
import com.motoo.api.response.SchoolPageResponse;
import com.motoo.api.response.SchoolResponse;
import com.motoo.db.entity.*;
import com.motoo.db.repository.EventsRepository;
import com.motoo.db.repository.SchoolRepository;
import com.motoo.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Index;
import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SchoolService {
    private final SchoolRepository schoolRepository;
    private final UserRepository userRepository;
    private final EventsRepository eventsRepository;

    private final AccountServiceImpl accountService;

    private final AccountAssetServiceImpl accountAssetService;

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
        Integer currentRank = userRepository.findById(id).get().getCurrentRank();
        Long schoolAccId = accountService.getSchoolAccount(id).getAccountId();
        Integer cash = accountService.getAccount(schoolAccId, id).getSeed();
        Integer stockAsset = accountAssetService.getStockAsset(schoolAccId, id);
        Integer asset = cash + stockAsset;
        Float avg = accountAssetService.getTotalValuePLRatio(schoolAccId, id);
        School school = user.getSchool();
        Events events = eventsRepository.findFirstByOrderByEventsIdDesc();
        return SchoolPageResponse.response(school, events, currentRank, asset, avg);
    }
}

