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

 Date: 30/03/2022 19:19:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yunzhi_student
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_student`;
CREATE TABLE `yunzhi_student`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `sno` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `state` int UNSIGNED NOT NULL,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `T1lDuz5XXcEbggrC`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
