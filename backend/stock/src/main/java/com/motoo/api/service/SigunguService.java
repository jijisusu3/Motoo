package com.motoo.api.service;

import com.motoo.db.entity.Sigungu;
import com.motoo.db.repository.SigunguRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SigunguService {

    private final SigunguRepository sigunguRepository;

    void updateSchoolRanks(Sigungu sigungu, String school_ranks){
        sigungu.updateSchoolRanks(school_ranks);
        sigunguRepository.save(sigungu);
    }

    void updatePersonal(Sigungu sigungu, String personal){
        sigungu.updatePersonal(personal);
        sigunguRepository.save(sigungu);
    }



}
