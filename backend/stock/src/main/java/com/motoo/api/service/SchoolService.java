package com.motoo.api.service;

import com.motoo.api.response.SchoolAccResponse;
import com.motoo.api.response.SchoolPageResponse;
import com.motoo.api.response.SchoolResponse;
import com.motoo.db.entity.*;
import com.motoo.db.repository.*;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Index;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SchoolService {
    private final SchoolRepository schoolRepository;

    private final SchoolRepositorySupport schoolRepositorySupport;
    private final UserRepository userRepository;
    private final UserRepositorySupport userRepositorySupport;
    private final EventsRepository eventsRepository;
    private final AccountServiceImpl accountService;
    private final AccountAssetServiceImpl accountAssetService;
    private final UserServiceImpl userService;

    private final SigunguRepository sigunguRepository;

    private final SigunguService sigunguService;

    public Optional<School> getBySchoolId(Long id) {
        return schoolRepository.findById(id);
    }


    void updateAverageAndStud(Long id, Float average, String studRanks){
        School school = getBySchoolId(id).get();
        school.updateAverageAndStud(average, studRanks);
        schoolRepository.save(school);
    }

    void updateCurrentRank(Long id, Integer currentRank){
        School school = getBySchoolId(id).get();
        school.updateCurrentRank(currentRank);
        schoolRepository.save(school);
    }

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

    @Scheduled(cron = "0 25 13 * * *")
    @Transactional
    public void UpdateRanking(){
        // 학교 등록된 유저 수익률 계산 및 저장
        List<User> users = userRepositorySupport.findAllUserBySchool();
        for ( User user : users) {
            Long accId = accountService.getSchoolAccount(user.getUserId()).getAccountId();
            Float avg = accountAssetService.getTotalValuePLRatio(accId, user.getUserId());
            userService.updateAverage(user.getUserId(), avg);
        }
        List<School> schools = schoolRepositorySupport.findGameSchool();
        for ( School school : schools){
            List <User> students = school.getUsers();
            students.sort(new Comparator<User>() {
                @Override
                public int compare(User o1, User o2) {
                    if (o2.getAverage() - o1.getAverage() > 0) return 1;
                    else if (o2.getAverage() - o2.getAverage() < 0) return -1;
                    return 0;
                }
            });
            String Top5InSchool = "";
            Float AverageInSchool = 0F;
            for (int i = 0; i < students.size(); i++){
                if (i < 5) {
                    Top5InSchool += students.get(i).getNickname() + "#";
                    if (students.get(i).getAverage() == null) {
                        Top5InSchool += "0:";
                    } else {
                        Top5InSchool += students.get(i).getAverage() + ":";
                    }
                }
                Integer rankinschool = i + 1;
                userService.updateCurrentRank(students.get(i).getUserId(), rankinschool);
                if (students.get(i).getAverage() != null) {
                    AverageInSchool += students.get(i).getAverage();
                }

            }
            if (students.isEmpty() == false) {
                AverageInSchool = AverageInSchool / students.size();
            }

            updateAverageAndStud(school.getSchoolId(), AverageInSchool, Top5InSchool);


        }
        // 시군구 내 학교 집합
        List<Sigungu> sigungus = sigunguRepository.findAll();

        for ( Sigungu sigungu : sigungus) {
            List<School> schoolsInSigungu = sigungu.getSchool();
            List<School> schoolsInSigunguIng = schoolsInSigungu.stream().filter(s -> s.getStudRanks() != null).collect(Collectors.toList());
            schoolsInSigunguIng.sort(new Comparator<School>() {
                @Override
                public int compare(School o1, School o2) {
                    if (o2.getAverage() - o1.getAverage() > 0) return 1;
                    else if (o2.getAverage() - o2.getAverage() < 0) return -1;
                    return 0;
                }
            });

            if (!schoolsInSigunguIng.isEmpty()) {
                String Top5SchoolInSigungu = "";
                    List<User> userInSigungu = new ArrayList<>();
                for (int j = 0; j < schoolsInSigunguIng.size(); j++){
                    if (j < 5){
                        Top5SchoolInSigungu += schoolsInSigunguIng.get(j).getSchoolname() + "#";
                        if (schoolsInSigunguIng.get(j).getAverage() == null) {
                            Top5SchoolInSigungu += "0:";
                        } else {
                            Top5SchoolInSigungu += schoolsInSigunguIng.get(j).getAverage() + ":";
                        }
                    }
                    Integer schoolrankinsigungu = j + 1;
                    updateCurrentRank(schoolsInSigunguIng.get(j).getSchoolId(), schoolrankinsigungu);
                    userInSigungu.addAll(schoolsInSigunguIng.get(j).getUsers());
                }
                sigunguService.updateSchoolRanks(sigungu, Top5SchoolInSigungu);
                userInSigungu.sort(new Comparator<User>() {
                    @Override
                    public int compare(User o1, User o2) {
                        if (o2.getAverage() - o1.getAverage() > 0) return 1;
                        else if (o2.getAverage() - o1.getAverage() < 0) return -1;
                        return 0;
                    }
                });
                String Top5InSigungu = "";
                for (int k = 0; k < userInSigungu.size(); k++){
                    if (k < 5){
                        Top5InSigungu += userInSigungu.get(k).getNickname() + "#";
                        if (userInSigungu.get(k).getAverage() == null) {
                            Top5InSigungu += "0:";
                        } else {
                            Top5InSigungu += userInSigungu.get(k).getAverage() + ":";
                        }

                    }
                }
                sigunguService.updatePersonal(sigungu, Top5InSigungu);

            }

        }

    }

}

