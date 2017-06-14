# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: karlblog.mysql.database.azure.com (MySQL 5.6.26.0)
# Database: blog
# Generation Time: 2017-06-14 19:51:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `authorId` int(11) unsigned NOT NULL,
  `time` datetime NOT NULL,
  `content` text CHARACTER SET utf8,
  `replyToStory` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;

INSERT INTO `messages` (`id`, `authorId`, `time`, `content`, `replyToStory`)
VALUES
	(1,1,'2017-06-09 20:31:00','test',3),
	(2,1,'2017-06-09 20:31:30','testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',3),
	(3,1,'2017-06-09 20:33:33','%20%20%20testtest%20%20test%0Atesttest%20%20test',3),
	(4,1,'2017-06-09 20:34:55','test%0Atest%0A%0Atest%0A%0A%0Atest%0A%0A%0A%0A%0A%0Atest%0A%0A%0A%0A%0Atest',3),
	(5,1,'2017-05-31 20:44:01','test%20testtest%20testtesttest%20testtesttesttest%20testtesttesttesttest%20testtesttesttesttesttest%20%20testtesttesttesttesttesttest%20testtesttesttesttesttesttesttest%20testtesttesttesttesttesttesttesttest%20testtesttesttesttesttesttesttesttesttesttesttest%20testtesttesttesttesttesttesttesttesttesttesttesttest%20testtesttesttesttesttesttesttesttesttesttesttest%20testtesttesttesttesttesttesttesttesttesttesttesttest%20testtesttesttesttesttesttesttesttesttesttesttesttesttest%20testtesttesttesttesttesttesttesttesttesttesttesttesttesttest',3),
	(6,1,'2017-06-13 14:27:29','test',3),
	(7,1,'2017-06-14 16:09:57','%E5%93%88%E5%93%88%E5%93%88%E5%93%88%E3%84%8F%20',8),
	(8,1,'2017-06-14 16:10:01','%E3%84%8F%E3%84%8F%E3%84%8F',8),
	(9,1,'2017-06-14 16:10:11','%E3%84%8F%0A%20%20%E3%84%8F%0A%E3%84%8F%20%20%20%20%20%E3%84%8F%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%E3%84%8F%0A',8),
	(10,1,'2017-06-14 16:12:22','%20%20%20%20%20%20%20%20%0A%0A%0A%0Afssas',3),
	(11,1,'2017-06-14 19:43:17','test%20test',3);

/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stories`;

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT '',
  `subtitle` text CHARACTER SET utf8,
  `authorId` int(11) NOT NULL,
  `content` text CHARACTER SET utf8,
  `time` date NOT NULL,
  `likeNum` int(11) NOT NULL,
  `view` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;

INSERT INTO `stories` (`id`, `title`, `subtitle`, `authorId`, `content`, `time`, `likeNum`, `view`)
VALUES
	(3,'test','testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest',2,'test%20testtest%20testtesttest%20test%20testtesttesttesttesttesttest%20testtest%20testtesttesttest%20%20%20testtest%5C%0A%0A%0Atesttesttest%20%20testtest%20%20%0Atesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest%0A%0A%20%20%20%20%20%20testtest%0A%0Atesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest%0A%0Atest%0A%0A%0A%0A%0Atesttest','2017-03-24',500,1234),
	(4,'I%20LOVE%20JAVASCRIPT','I%20love%20web%20programming',1,'js','2017-05-12',1,12),
	(1,'Hello','Hi',1,'%E5%93%88%E5%9B%89','2017-06-14',0,0),
	(5,'Git','Some%20useful%20Git%20commands',1,'*%20git%20init%0A*%20git%20status%0A*%20git%20add%20%3Cfilename%3E%0A*%20git%20add%20-A%20.%20%2F%2F%20Add%20everything%20in%20the%20directory%0A*%20git%20add%20\'*.txt\'%2F%2F%20Add%20all%20~.txt%0A*%20git%20reset%20%3Cfilename%3E%20%2F%2F%20remove%20all%20things%20that%20is%20staged%20(not%20commit)%0A*%20git%20commit%20-m%20%22content...%22%0A*%20git%20log%0A*%20git%20log%20--summary%0A*%20git%20remote%20add%20origin%20https%3A%20%2F%2F%20~~~%0A*%20git%20push%20origin%20master%0A*%20git%20push%20-u%20origin%20master%0A*%20git%20pull%20origin%20master%0A*%20git%20stash%20%2F%2F%20stash%20something%20you%20don%E2%80%99t%20want%20to%20push%0A*%20git%20stash%20apply%20%2F%2F%20apply%20something%20you%20stash%20after%20pull%0A*%20git%20diff%20HEAD%0A*%20git%20diff%20--staged%0A*%20git%20checkout%20--%20%3Cfilename%3E%0A*%20git%20branch%20%3Cmew_branch%3E%0A*%20git%20checkout%20%3Cbranch%3E%0A*%20git%20checkout%20-b%20%3Cnew_branch%3E%20%2F%2F%20checkout%20and%20create%20a%20branch%20at%20the%20same%20time%0A*%20git%20rm%20%3Cfilename%3E%0A*%20git%20rm%20\'*.txt\'%2F%2Fremove%20all%20~.txt%0A*%20git%20commit%20-am%20%22Delete%20stuff%22%0A*%20git%20merge%20%3Cbranch%3E%0A*%20git%20branch%20-d%20%3Cbranch%3E%0A*%20git%20branch%20-D%20%3Cbranch%3E%20%20%2F%2F%20or%0A*%20git%20branch%20--force%20(-f)%20%3Cbranch%3E%20%2F%2F%20delete%20branch%20not%20merged%0A*%20git%20tag%20%3Ctagname%3E%20%2F%2F%20use%20tag%0A*%20git%20tag%20%2F%2F%20see%20all%20tag%0A*%20git%20tag%20-n%20%2F%2F%20%E9%A1%AF%E7%A4%BA%E6%A8%99%E7%B1%A4%E7%9A%84%E5%88%97%E8%A1%A8%E5%92%8C%E8%A8%BB%E8%A7%A3%0A*%20git%20log%20--decorate%20%2F%2F%20%E9%A1%AF%E7%A4%BA%E5%8C%85%E5%90%AB%E6%A8%99%E7%B1%A4%E8%B3%87%E6%96%99%E7%9A%84%E6%AD%B7%E5%8F%B2%E8%A8%98%E9%8C%84%0A*%20git%20tag%20-a%20%3Ctagname%3E%20%2F%2F%20%E5%9F%B7%E8%A1%8C%E5%BE%8C%E6%9C%83%E5%95%9F%E5%8B%95%E7%B7%A8%E8%BC%AF%E5%99%A8%0A*%20git%20tag%20-am%20%22...%22%20%3Ctagname%3E%20%2F%2F%20%E7%9B%B4%E6%8E%A5%E6%B7%BB%E5%8A%A0%E8%A8%BB%E8%A7%A3%0A*%20git%20tag%20-d%20%3Ctagname%3E%20%2F%2F%20%E5%88%AA%E9%99%A4%E6%A8%99%E7%B1%A4%0A*%20git%20commit%20--amend%20-m%20%22...%22%20%2F%2F%20modify%20the%20commit%0A*%20git%20revert%20HEAD%20%2F%2F%20%E5%9B%9E%E8%A6%86%E5%8E%9F%E7%8B%80%0A*%20git%20reset%20--head%20%3C..branch..(ex.%20HEAD~~)%3E%20%2F%2F%20%E6%94%BE%E6%A3%84%E4%B8%8D%E9%9C%80%E8%A6%81%E7%9A%84%E9%83%A8%E5%88%86%0A*%20git%20cherry-pick%20%3C.....(ex.%2099dead2)%3E%20%2F%2F%20%E5%9C%A8%E7%95%B6%E5%89%8Dbranch%E5%8A%A0%E4%B8%8A%E9%81%B8%E6%9B%B2%E7%9A%84%E6%8F%90%E4%BA%A4%0A*%20git%20rebase%20-i%20HEAD~~%20%2F%2F%20%E6%89%93%E9%96%8B%E6%96%87%E5%AD%97%E7%B7%A8%E8%BC%AF%E5%99%A8%EF%BC%8C%E7%9B%B4%E6%8E%A5%E7%B7%A8%E8%BC%AF%E4%B9%8B%0A*%20git%20merge%20--squash%20%3Cbranch%3E%20%2F%2F%20%E5%90%88%E4%BD%B5%E6%9F%90%E7%9A%84branch%E4%B8%8A%E7%9A%84%E6%89%80%E6%9C%89%E6%AA%94%E6%A1%88%E5%88%B0%E7%95%B6%E5%89%8Dbranch','2017-06-14',0,0);

/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table storytags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `storytags`;

CREATE TABLE `storytags` (
  `storyId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `storytags` WRITE;
/*!40000 ALTER TABLE `storytags` DISABLE KEYS */;

INSERT INTO `storytags` (`storyId`, `tagId`)
VALUES
	(3,7),
	(3,8),
	(3,9),
	(3,10),
	(3,11),
	(3,12),
	(3,13),
	(4,2),
	(4,14),
	(1,7),
	(5,1),
	(5,2);

/*!40000 ALTER TABLE `storytags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `Id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;

INSERT INTO `tags` (`Id`, `name`)
VALUES
	(1,'git'),
	(2,'web%20programming'),
	(3,'aaa'),
	(4,'aaaa'),
	(5,'a'),
	(6,'aa'),
	(7,'test'),
	(8,'testtest'),
	(9,'testtesttest'),
	(10,'testtesttesttest'),
	(11,'testtesttesttesttest'),
	(12,'testtest%20test'),
	(13,'test%20test%20testtest%20testtest%20test'),
	(14,'javascript');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `imgLink` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `imgLink`)
VALUES
	(1,'Karl%20Chuang','.%2Fkarl.png'),
	(2,'test','.%2Fkarl.png');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
