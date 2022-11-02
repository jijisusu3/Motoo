//package com.motoo;
//
//
//import com.motoo.db.entity.School;
//import com.motoo.db.entity.Stock;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.annotation.PostConstruct;
//import javax.persistence.EntityManager;
//
//@Component
//@RequiredArgsConstructor
//public class initDb {
//
//    private final InitService initService;
//
//
//    @PostConstruct
//    public void init() {
//        initService.dbInit1();
//
//    }
//
//
//    @Component
//    @Transactional
//    @RequiredArgsConstructor
//    static class InitService {
//        private final EntityManager em;
//
//        public void dbInit1() {
//            System.out.println("Init1 start");
////            Stock stock = creatStock("삼성전자");
////            em.persist(stock);
//            School school = createSchool("신현고" , "서울","dd");
//            em.persist(school);
//
//
//        }
//
//
//        private Stock creatStock(String name) {
//            Stock stock = new Stock();
//            stock.setName(name);
//
//            return stock;
//
//
//        }
//        private School createSchool(String schoolname, String location, Object history){
//            School school = new School();
//            school.setSchoolname(schoolname);
//
//            school.setLocation(location);
//            return school;
//        }
//    }
//}