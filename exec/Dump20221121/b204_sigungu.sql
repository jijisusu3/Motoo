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
-- Table structure for table `sigungu`
--

DROP TABLE IF EXISTS `sigungu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sigungu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sigungu_name` varchar(24) NOT NULL,
  `sido` varchar(24) NOT NULL,
  `school_ranks` longtext,
  `personal` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigungu`
--

LOCK TABLES `sigungu` WRITE;
/*!40000 ALTER TABLE `sigungu` DISABLE KEYS */;
INSERT INTO `sigungu` VALUES (1,'홍천군','강원',NULL,NULL),(2,'춘천시','강원',NULL,NULL),(3,'삼척시','강원',NULL,NULL),(4,'화천군','강원',NULL,NULL),(5,'횡성군','강원',NULL,NULL),(6,'강릉시','강원',NULL,NULL),(7,'정선군','강원',NULL,NULL),(8,'인제군','강원',NULL,NULL),(9,'평창군','강원',NULL,NULL),(10,'철원군','강원',NULL,NULL),(11,'영월군','강원',NULL,NULL),(12,'동해시','강원',NULL,NULL),(13,'원주시','강원',NULL,NULL),(14,'양구군','강원',NULL,NULL),(15,'속초시','강원',NULL,NULL),(16,'양양군','강원',NULL,NULL),(17,'태백시','강원',NULL,NULL),(18,'연천군','경기',NULL,NULL),(19,'양주시','경기',NULL,NULL),(20,'용인시','경기',NULL,NULL),(21,'성남시','경기',NULL,NULL),(22,'시흥시','경기',NULL,NULL),(23,'이천시','경기',NULL,NULL),(24,'안성시','경기',NULL,NULL),(25,'고양시','경기',NULL,NULL),(26,'구리시','경기',NULL,NULL),(27,'가평군','경기',NULL,NULL),(28,'하남시','경기',NULL,NULL),(29,'김포시','경기',NULL,NULL),(30,'오산시','경기',NULL,NULL),(31,'수원시','경기',NULL,NULL),(32,'파주시','경기',NULL,NULL),(33,'광주시','경기',NULL,NULL),(34,'남양주시','경기',NULL,NULL),(35,'화성시','경기',NULL,NULL),(36,'광명시','경기',NULL,NULL),(37,'부천시','경기','부천여자고등학교#0.0:','김민정#부천여자고등학교#0:'),(38,'안산시','경기',NULL,NULL),(39,'과천시','경기',NULL,NULL),(40,'안양시','경기',NULL,NULL),(41,'포천시','경기',NULL,NULL),(42,'의왕시','경기',NULL,NULL),(43,'군포시','경기',NULL,NULL),(44,'양평군','경기',NULL,NULL),(45,'여주시','경기',NULL,NULL),(46,'의정부시','경기',NULL,NULL),(47,'평택시','경기',NULL,NULL),(48,'동두천시','경기',NULL,NULL),(49,'하동군','경남',NULL,NULL),(50,'진주시','경남',NULL,NULL),(51,'창원시','경남',NULL,NULL),(52,'김해시','경남',NULL,NULL),(53,'거창군','경남',NULL,NULL),(54,'남해군','경남',NULL,NULL),(55,'고성군','경남',NULL,NULL),(56,'밀양시','경남',NULL,NULL),(57,'통영시','경남',NULL,NULL),(58,'산청군','경남',NULL,NULL),(59,'거제시','경남',NULL,NULL),(60,'사천시','경남',NULL,NULL),(61,'합천군','경남',NULL,NULL),(62,'함양군','경남',NULL,NULL),(63,'양산시','경남',NULL,NULL),(64,'의령군','경남',NULL,NULL),(65,'함안군','경남',NULL,NULL),(66,'창녕군','경남',NULL,NULL),(67,'경산시','경북',NULL,NULL),(68,'포항시','경북',NULL,NULL),(69,'문경시','경북',NULL,NULL),(70,'김천시','경북',NULL,NULL),(71,'영천시','경북',NULL,NULL),(72,'칠곡군','경북',NULL,NULL),(73,'경주시','경북',NULL,NULL),(74,'구미시','경북',NULL,NULL),(75,'군위군','경북',NULL,NULL),(76,'의성군','경북',NULL,NULL),(77,'청도군','경북',NULL,NULL),(78,'봉화군','경북',NULL,NULL),(79,'예천군','경북',NULL,NULL),(80,'상주시','경북','함창고등학교#0.0:',''),(81,'성주군','경북',NULL,NULL),(82,'영양군','경북',NULL,NULL),(83,'영덕군','경북',NULL,NULL),(84,'안동시','경북',NULL,NULL),(85,'영주시','경북',NULL,NULL),(86,'울진군','경북',NULL,NULL),(87,'청송군','경북',NULL,NULL),(88,'고령군','경북',NULL,NULL),(89,'울릉군','경북',NULL,NULL),(90,'남구','광주',NULL,NULL),(91,'북구','광주',NULL,NULL),(92,'광산구','광주',NULL,NULL),(93,'달서구','대구',NULL,NULL),(94,'수성구','대구',NULL,NULL),(95,'달성군','대구',NULL,NULL),(96,'서구','대전','대전대신고등학교#0.0:',''),(97,'유성구','대전',NULL,NULL),(98,'대덕구','대전',NULL,NULL),(99,'사상구','부산',NULL,NULL),(100,'강서구','부산',NULL,NULL),(101,'금정구','부산',NULL,NULL),(102,'부산진구','부산',NULL,NULL),(103,'기장군','부산',NULL,NULL),(104,'영도구','부산',NULL,NULL),(105,'동래구','부산',NULL,NULL),(106,'사하구','부산',NULL,NULL),(107,'해운대구','부산','반송여자중학교#0.0:',''),(108,'수영구','부산',NULL,NULL),(109,'연제구','부산',NULL,NULL),(110,'관악구','서울',NULL,NULL),(111,'마포구','서울',NULL,NULL),(112,'종로구','서울',NULL,NULL),(113,'중구','서울','환일중학교#-0.9160378:',''),(114,'서초구','서울',NULL,NULL),(115,'은평구','서울',NULL,NULL),(116,'금천구','서울',NULL,NULL),(117,'노원구','서울',NULL,NULL),(118,'강남구','서울','개포고등학교#0.0:','김행진#개포고등학교#0:'),(119,'광진구','서울',NULL,NULL),(120,'영등포구','서울','선유고등학교#1.9387927:여의도고등학교#1.6853707:대영고등학교#0.59274757:영신고등학교#0.45886528:관악고등학교#-0.19748923:','닉네임1#관악고등학교#4.2239757:닉네임10#선유고등학교#1.9387927:닉네임7#여의도고등학교#1.6853707:닉네임6#대영고등학교#0.59274757:닉네임5#관악고등학교#0.57604676:'),(121,'성북구','서울',NULL,NULL),(122,'송파구','서울',NULL,NULL),(123,'구로구','서울','고척고등학교#0.0:','테스트유저#고척고등학교#0:'),(124,'동작구','서울',NULL,NULL),(125,'강동구','서울',NULL,NULL),(126,'중랑구','서울','신현고등학교#0.0:',''),(127,'양천구','서울',NULL,NULL),(128,'용산구','서울','용산고등학교#1.5521733:',''),(129,'도봉구','서울',NULL,NULL),(130,'동대문구','서울','해성여자고등학교#0.0:',''),(131,'성동구','서울',NULL,NULL),(132,'강북구','서울',NULL,NULL),(133,'서대문구','서울','가재울고등학교#-0.40380046:','박수근#가재울고등학교#0:우하하푸하하#가재울고등학교#-0.8076009:'),(134,'세종시','세종',NULL,NULL),(135,'울주군','울산',NULL,NULL),(136,'동구','인천',NULL,NULL),(137,'연수구','인천',NULL,NULL),(138,'남동구','인천',NULL,NULL),(139,'미추홀구','인천',NULL,NULL),(140,'계양구','인천',NULL,NULL),(141,'부평구','인천',NULL,NULL),(142,'강화군','인천',NULL,NULL),(143,'옹진군','인천',NULL,NULL),(144,'담양군','전남',NULL,NULL),(145,'강진군','전남',NULL,NULL),(146,'광양시','전남',NULL,NULL),(147,'함평군','전남',NULL,NULL),(148,'목포시','전남',NULL,NULL),(149,'여수시','전남',NULL,NULL),(150,'순천시','전남',NULL,NULL),(151,'나주시','전남',NULL,NULL),(152,'곡성군','전남',NULL,NULL),(153,'구례군','전남',NULL,NULL),(154,'고흥군','전남',NULL,NULL),(155,'보성군','전남',NULL,NULL),(156,'화순군','전남',NULL,NULL),(157,'장흥군','전남',NULL,NULL),(158,'해남군','전남',NULL,NULL),(159,'영암군','전남',NULL,NULL),(160,'영광군','전남',NULL,NULL),(161,'완도군','전남',NULL,NULL),(162,'신안군','전남',NULL,NULL),(163,'장성군','전남',NULL,NULL),(164,'무안군','전남',NULL,NULL),(165,'진도군','전남',NULL,NULL),(166,'전주시','전북',NULL,NULL),(167,'고창군','전북',NULL,NULL),(168,'부안군','전북',NULL,NULL),(169,'김제시','전북',NULL,NULL),(170,'완주군','전북',NULL,NULL),(171,'군산시','전북',NULL,NULL),(172,'남원시','전북',NULL,NULL),(173,'진안군','전북',NULL,NULL),(174,'순창군','전북',NULL,NULL),(175,'무주군','전북',NULL,NULL),(176,'장수군','전북',NULL,NULL),(177,'익산시','전북',NULL,NULL),(178,'임실군','전북',NULL,NULL),(179,'정읍시','전북',NULL,NULL),(180,'제주시','제주',NULL,NULL),(181,'서귀포시','제주',NULL,NULL),(182,'천안시','충남','복자여자고등학교#0.0:',''),(183,'아산시','충남',NULL,NULL),(184,'홍성군','충남',NULL,NULL),(185,'공주시','충남',NULL,NULL),(186,'서천군','충남',NULL,NULL),(187,'논산시','충남',NULL,NULL),(188,'금산군','충남',NULL,NULL),(189,'당진시','충남',NULL,NULL),(190,'보령시','충남',NULL,NULL),(191,'예산군','충남',NULL,NULL),(192,'태안군','충남',NULL,NULL),(193,'서산시','충남',NULL,NULL),(194,'부여군','충남',NULL,NULL),(195,'계룡시','충남',NULL,NULL),(196,'청양군','충남',NULL,NULL),(197,'제천시','충북',NULL,NULL),(198,'진천군','충북',NULL,NULL),(199,'음성군','충북',NULL,NULL),(200,'청주시','충북','충북여자고등학교#0.0:',''),(201,'충주시','충북',NULL,NULL),(202,'영동군','충북',NULL,NULL),(203,'보은군','충북',NULL,NULL),(204,'옥천군','충북',NULL,NULL),(205,'괴산군','충북',NULL,NULL),(206,'증평군','충북',NULL,NULL),(207,'단양군','충북',NULL,NULL),(208,'강서구','서울',NULL,NULL),(209,'서구','부산',NULL,NULL),(210,'동구','부산',NULL,NULL),(211,'북구','부산',NULL,NULL),(212,'남구','부산',NULL,NULL),(213,'중구','부산',NULL,NULL),(214,'중구','대구',NULL,NULL),(215,'서구','대구',NULL,NULL),(216,'북구','대구',NULL,NULL),(217,'남구','대구',NULL,NULL),(218,'동구','대구',NULL,NULL),(219,'중구','인천',NULL,NULL),(220,'서구','인천',NULL,NULL),(221,'서구','광주',NULL,NULL),(222,'동구','광주',NULL,NULL),(223,'중구','대전','대전고등학교#0.0:','김유진#대전고등학교#0:'),(224,'동구','대전',NULL,NULL),(225,'북구','울산',NULL,NULL),(226,'남구','울산',NULL,NULL),(227,'중구','울산',NULL,NULL),(228,'동구','울산',NULL,NULL),(229,'고성군','강원',NULL,NULL),(230,'7기','ssafy','싸피 대전#-1.9285839:','');
/*!40000 ALTER TABLE `sigungu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  0:25:16
