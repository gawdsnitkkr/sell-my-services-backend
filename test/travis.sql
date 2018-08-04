DROP TABLE IF EXISTS `requestLogs`;

CREATE TABLE `requestLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ipAddress` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `body` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;


LOCK TABLES `requestLogs` WRITE;
INSERT INTO `requestLogs` VALUES (1,'::ffff:192.168.43.1','/search/sellers','[object Object]','2018-07-24 16:47:18','2018-07-24 16:47:18'),(2,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":0,\"longitude\":0,\"searchText\":\"bai\"}','2018-07-24 16:50:02','2018-07-24 16:50:02'),(3,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":0,\"longitude\":0,\"searchText\":\"bai\"}','2018-07-24 16:54:02','2018-07-24 16:54:02'),(4,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.9473942,\"longitude\":77.6812897,\"searchText\":\"test\"}','2018-07-26 15:40:12','2018-07-26 15:40:12'),(5,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.9473942,\"longitude\":77.6812897,\"searchText\":\"ok google show me this\"}','2018-07-26 16:10:02','2018-07-26 16:10:02'),(6,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.9473942,\"longitude\":77.6812897,\"searchText\":\"ok google show me this\"}','2018-07-26 16:31:37','2018-07-26 16:31:37'),(7,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.9473942,\"longitude\":77.6812897,\"searchText\":\"ok google show me this\"}','2018-07-26 17:24:05','2018-07-26 17:24:05'),(8,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 17:05:40','2018-07-27 17:05:40'),(9,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 17:07:01','2018-07-27 17:07:01'),(10,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 17:09:21','2018-07-27 17:09:21'),(11,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 17:15:30','2018-07-27 17:15:30'),(12,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 17:19:11','2018-07-27 17:19:11'),(13,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 18:13:18','2018-07-27 18:13:18'),(14,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"ok google show me this\"}','2018-07-27 18:13:42','2018-07-27 18:13:42'),(15,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"ok google show me this\"}','2018-07-27 18:13:57','2018-07-27 18:13:57'),(16,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"random\"}','2018-07-27 18:14:18','2018-07-27 18:14:18'),(17,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"gawds\"}','2018-07-27 18:14:26','2018-07-27 18:14:26'),(18,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 18:22:03','2018-07-27 18:22:03'),(19,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 18:23:09','2018-07-27 18:23:09'),(20,'::ffff:192.168.43.1','/search/sellers','{\"latitude\":12.94527321,\"longitude\":77.68042459,\"searchText\":\"test\"}','2018-07-27 18:26:52','2018-07-27 18:26:52');
UNLOCK TABLES;


DROP TABLE IF EXISTS `sellers`;
CREATE TABLE `sellers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL DEFAULT 'male',
  `email` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `deactivated` tinyint(1) NOT NULL DEFAULT '0',
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

LOCK TABLES `sellers` WRITE;

INSERT INTO `sellers` VALUES (1,'7206479844','Varun','male','varunon9@gmail.com',13,77.4,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'7206479844','Varun2','male','varunon99@gmail.com',13.2,77.8,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'7206479844','Varun3','male','varunon999@gmail.com',13.2,77.6,0,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');
UNLOCK TABLES;


DROP TABLE IF EXISTS `serviceCategories`;

CREATE TABLE `serviceCategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `serviceCategories` WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS `services`;

CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` text,
  `tags` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sellerId` int(11) DEFAULT NULL,
  `serviceCategoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sellerId` (`sellerId`),
  KEY `serviceCategoryId` (`serviceCategoryId`),
  FULLTEXT KEY `serviceSearchIndex` (`name`,`tags`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`sellerId`) REFERENCES `sellers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`serviceCategoryId`) REFERENCES `serviceCategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

LOCK TABLES `services` WRITE;

INSERT INTO `services` VALUES (1,'test',NULL,'test description','ok, google, gawds','0000-00-00 00:00:00','0000-00-00 00:00:00',1,NULL),(2,'test',NULL,'test2 description','random','0000-00-00 00:00:00','0000-00-00 00:00:00',2,NULL),(3,'test',NULL,'test3 description','captain, merica, india','0000-00-00 00:00:00','0000-00-00 00:00:00',3,NULL);

UNLOCK TABLES;
