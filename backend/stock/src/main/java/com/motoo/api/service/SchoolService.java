package com.motoo.api.service;

import com.motoo.api.response.SchoolPageResponse;
import com.motoo.api.response.SchoolResponse;
import com.motoo.db.entity.Events;
import com.motoo.db.entity.School;
import com.motoo.db.entity.Sigungu;
import com.motoo.db.entity.User;
import com.motoo.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return SchoolPageResponse.response(school, events, currentRank, asset, avg,schoolAccId);
    }

    @Scheduled(cron = "0 0 07 * * *")
    @Transactional
    public void UpdateAverage(){
        List<User> users = userRepositorySupport.findAllUserBySchool();
        for (User user : users ){
            Long accId = accountService.getSchoolAccount(user.getUserId()).getAccountId();
            Float avg = accountAssetService.getTotalValuePLRatio(accId, user.getUserId());
            userService.updateAverage(user.getUserId(), avg);
        }
    }

    @Scheduled(cron = "0 10 07 * * *")
    @Transactional
    public void UpdateSchoolRanking(){
        List<School> schools = schoolRepositorySupport.findGameSchool();
        for (School school : schools){
            List <User> students = school.getUsers();
            students.sort(new Comparator<User>() {
                @Override
                public int compare(User o1, User o2) {
                    Float o1avg = o1.getAverage();
                    Float o2avg = o2.getAverage();

                    if (o1avg == null){
                        o1avg = 0f;
                    }
                    if (o2avg == null){
                        o2avg = 0f;
                    }
                    if (o2avg - o1avg > 0) return 1;
                    else if (o2avg - o1avg < 0) return -1;
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
                if (students.get(i).getAverage() != null){
                    AverageInSchool += students.get(i).getAverage();
                }
            }
            if (students.isEmpty() == false){
                AverageInSchool = AverageInSchool / students.size();
            }
            updateAverageAndStud(school.getSchoolId(), AverageInSchool, Top5InSchool);
        }
    }

    @Scheduled(cron = "0 20 07 * * *")
    @Transactional
    public void UpdateSigunguRanking(){
        List <Sigungu> sigungus = sigunguRepository.findAll();

        for (Sigungu sigungu : sigungus){
            List<School> schoolsInSigungu = sigungu.getSchool();
            List<School> schoolsInSigunguIng = schoolsInSigungu.stream().filter(s -> s.getStudRanks() != null).collect(Collectors.toList());
            schoolsInSigunguIng.sort(new Comparator<School>() {
                @Override
                public int compare(School o1, School o2) {
                    Float o1avg = o1.getAverage();
                    Float o2avg = o2.getAverage();
                    if (o1avg == null){
                        o1avg = 0f;
                    }
                    if (o2avg == null){
                        o2avg = 0f;
                    }
                    if (o2avg - o1avg > 0) return 1;
                    else if (o2avg - o1avg < 0) return -1;
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
                        Float o1avg = o1.getAverage();
                        Float o2avg = o2.getAverage();
                        if (o1avg == null){
                            o1avg = 0f;
                        }
                        if (o2avg == null){
                            o2avg = 0f;
                        }
                        if (o2avg - o1avg > 0) return 1;
                        else if (o2avg - o1avg < 0) return -1;
                        return 0;

                    }
                });
                String Top5InSigungu = "";
                for (int k = 0; k < userInSigungu.size(); k++){
                    if (k < 5){
                        Top5InSigungu += userInSigungu.get(k).getNickname() + "#";
                        Top5InSigungu += userInSigungu.get(k).getSchool().getSchoolname() + "#";
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



//    @Scheduled(cron = "0 0 14 * * *")
//    @Transactional
//    public void UpdateRanking(){
//        // 학교 등록된 유저 수익률 계산 및 저장
//        List<User> users = userRepositorySupport.findAllUserBySchool();
//        for ( User user : users) {
//            System.out.println(user);
//            System.out.println(user.getNickname());
//            Long accId = accountService.getSchoolAccount(user.getUserId()).getAccountId();
//            System.out.println(accId);
//            Float avg = accountAssetService.getTotalValuePLRatio(accId, user.getUserId());
//            System.out.println(avg);
//            System.out.println("@@@@@@@@@@@@@@@");
//            userService.updateAverage(user.getUserId(), avg);
//        }
//
//        //
//        List<School> schools = schoolRepositorySupport.findGameSchool();
//        System.out.println(schools);
//        System.out.println("다시 확인!");
//        for ( School school : schools){
//            System.out.println(school.getSchoolname());
//            System.out.println("here!");
//            List <User> students = school.getUsers();
//            for (User test : students) {
//                System.out.println(test);
//
//
//            }
//
//            System.out.println("확인합니다!");
//            System.out.println(students);
//            System.out.println("확인했숨!");
//            System.out.println(school.getSchoolname());
//
//            students.sort(new Comparator<User>() {
//                @Override
//                public int compare(User o1, User o2) {
//                    System.out.println(o1.getAverage());
//                    System.out.println(o2.getAverage());
//                    System.out.println(o1.getAverage() - o2.getAverage());
//                    System.out.println("확인!");
//                    if (o2.getAverage() - o1.getAverage() > 0) return 1;
//                    else if (o2.getAverage() - o2.getAverage() < 0) return -1;
//                    return 0;
//                }
//            });
//            System.out.println("checking!");
//            String Top5InSchool = "";
//            Float AverageInSchool = 0F;
//            for (int i = 0; i < students.size(); i++){
//                if (i < 5) {
//                    Top5InSchool += students.get(i).getNickname() + "#";
//                    if (students.get(i).getAverage() == null) {
//                        Top5InSchool += "0:";
//                    } else {
//                        Top5InSchool += students.get(i).getAverage() + ":";
//                    }
//                }
//                Integer rankinschool = i + 1;
//                userService.updateCurrentRank(students.get(i).getUserId(), rankinschool);
//                if (students.get(i).getAverage() != null) {
//                    AverageInSchool += students.get(i).getAverage();
//                }
//
//            }
//            if (students.isEmpty() == false) {
//                AverageInSchool = AverageInSchool / students.size();
//            }
//
//            updateAverageAndStud(school.getSchoolId(), AverageInSchool, Top5InSchool);
//
//
//        }
//        // 시군구 내 학교 집합
//        List<Sigungu> sigungus = sigunguRepository.findAll();
//
//        for ( Sigungu sigungu : sigungus) {
//            List<School> schoolsInSigungu = sigungu.getSchool();
//            List<School> schoolsInSigunguIng = schoolsInSigungu.stream().filter(s -> s.getStudRanks() != null).collect(Collectors.toList());
//            System.out.println("확인");
//            schoolsInSigunguIng.sort(new Comparator<School>() {
//                @Override
//                public int compare(School o1, School o2) {
//                    if (o2.getAverage() - o1.getAverage() > 0) return 1;
//                    else if (o2.getAverage() - o2.getAverage() < 0) return -1;
//                    return 0;
//                }
//            });
//
//            if (!schoolsInSigunguIng.isEmpty()) {
//                String Top5SchoolInSigungu = "";
//                    List<User> userInSigungu = new ArrayList<>();
//                for (int j = 0; j < schoolsInSigunguIng.size(); j++){
//                    if (j < 5){
//                        Top5SchoolInSigungu += schoolsInSigunguIng.get(j).getSchoolname() + "#";
//                        if (schoolsInSigunguIng.get(j).getAverage() == null) {
//                            Top5SchoolInSigungu += "0:";
//                        } else {
//                            Top5SchoolInSigungu += schoolsInSigunguIng.get(j).getAverage() + ":";
//                        }
//                    }
//                    Integer schoolrankinsigungu = j + 1;
//                    updateCurrentRank(schoolsInSigunguIng.get(j).getSchoolId(), schoolrankinsigungu);
//                    userInSigungu.addAll(schoolsInSigunguIng.get(j).getUsers());
//                }
//                sigunguService.updateSchoolRanks(sigungu, Top5SchoolInSigungu);
//                userInSigungu.sort(new Comparator<User>() {
//                    @Override
//                    public int compare(User o1, User o2) {
//                        if (o2.getAverage() - o1.getAverage() > 0) return 1;
//                        else if (o2.getAverage() - o1.getAverage() < 0) return -1;
//                        return 0;
//                    }
//                });
//                String Top5InSigungu = "";
//                for (int k = 0; k < userInSigungu.size(); k++){
//                    if (k < 5){
//                        Top5InSigungu += userInSigungu.get(k).getNickname() + "#";
//
//                        System.out.println(userInSigungu.get(k).getSchool().getSchoolname());
//
//                        System.out.println(Top5InSigungu);
//                        if (userInSigungu.get(k).getAverage() == null) {
//                            Top5InSigungu += "0:";
//                        } else {
//                            Top5InSigungu += userInSigungu.get(k).getAverage() + ":";
//                        }
//                    }
//                }
//                System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@2");
//                sigunguService.updatePersonal(sigungu, Top5InSigungu);
//            }
//        }
//    }

}

