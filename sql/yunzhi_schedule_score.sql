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

 Date: 12/04/2022 21:08:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yunzhi_schedule_score
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_schedule_score`;
CREATE TABLE `yunzhi_schedule_score`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL DEFAULT 0,
  `schedule_id` int NOT NULL DEFAULT 0,
  `usual` int NOT NULL DEFAULT 0,
  `terminal` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `student_id`(`student_id`) USING BTREE,
  INDEX `schedule_id`(`schedule_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
