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

 Date: 05/04/2022 09:41:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yunzhi_term
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_term`;
CREATE TABLE `yunzhi_term`  (
  `id` int NOT NULL  AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `start_time` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
