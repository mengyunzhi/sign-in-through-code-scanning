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

 Date: 29/07/2022 16:18:22
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
  `week` int NOT NULL DEFAULT 0,
  `day` int NOT NULL,
  `lesson` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 680 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
