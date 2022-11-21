-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: k7b204.p.ssafy.io    Database: b204
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(24) NOT NULL,
  `nickname` varchar(24) NOT NULL,
  `school_id` int DEFAULT NULL,
  `current` int NOT NULL,
  `role` varchar(30) DEFAULT NULL,
  `quiz_day` date DEFAULT NULL,
  `current_rank` int DEFAULT NULL,
  `average` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (14,'holy_killer@naver.com','JANGJINSE',1813,31,NULL,'2022-11-20',6,-1.9285839),(20,'test1','김시온',10,71,NULL,NULL,1,4.2239757),(21,'test2','이승빈',10,72,NULL,NULL,4,-0.47590718),(22,'test3','최대규',10,73,NULL,NULL,7,-2.7452848),(23,'test4','서광채',10,74,NULL,NULL,5,-1.0326712),(24,'test5','이홍우',10,75,NULL,NULL,2,0.57604676),(25,'test6','전태진',18,81,NULL,NULL,1,0.59274757),(26,'test7','김영재',35,82,NULL,NULL,1,1.6853707),(27,'test8','김영민',37,83,NULL,NULL,1,0.45886528),(28,'test9','황동현',57,84,NULL,NULL,1,-1.188951),(29,'test10','최혁진',68,85,NULL,NULL,1,1.9387927),(32,'goag56789006@naver.com','곽현준',NULL,107,NULL,NULL,NULL,NULL),(33,'yujin178@kakao.com','김유진',1799,110,NULL,'2022-11-14',1,NULL),(34,'82surf@gmail.com','유현수',NULL,111,NULL,NULL,NULL,NULL),(35,'na0173@kakao.com','조항주',NULL,120,NULL,'2022-11-14',NULL,NULL),(36,'codemj11@gmail.com','김민정',2227,121,NULL,'2022-11-14',1,NULL),(38,'tnrms555@naver.com','박수근',92,129,NULL,'2022-11-16',1,NULL),(42,'testtest','테스트유저',8,138,NULL,NULL,1,NULL),(70,'wltn7498@naver.com','김지수',NULL,184,NULL,'2022-11-18',NULL,NULL),(75,'4940210@gmail.com','권예슬',NULL,193,NULL,NULL,NULL,NULL),(76,'luis.jeong@kakao.com','정용기',NULL,194,NULL,'2022-11-20',NULL,NULL),(78,'dhkdwlsgod@naver.com','이진행',5999,197,NULL,NULL,NULL,NULL),(84,'cdg0811@naver.com','최대규',NULL,206,NULL,NULL,NULL,NULL),(87,'rkarud1234@naver.com','김갑경',NULL,212,NULL,'2022-11-20',NULL,NULL),(88,'newsty1107@gmail.com','전지수',1347,213,NULL,NULL,NULL,NULL),(92,'rang628@naver.com','이수랑',NULL,220,NULL,NULL,NULL,NULL),(93,'fox5457@naver.com','성유지',1994,221,NULL,'2022-11-20',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  0:25:10
