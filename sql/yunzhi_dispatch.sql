/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100422
 Source Host           : localhost:3306
 Source Schema         : tp2

 Target Server Type    : MySQL
 Target Server Version : 100422
 File Encoding         : 65001

 Date: 06/04/2022 13:55:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yunzhi_dispatch
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_dispatch`;
CREATE TABLE `yunzhi_dispatch`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int NOT NULL DEFAULT 0,
  `year` int NOT NULL DEFAULT 0,
  `month` int NOT NULL DEFAULT 0,
  `day` int NOT NULL DEFAULT 0,
  `start_time` int NOT NULL DEFAULT 0,
  `end_time` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
