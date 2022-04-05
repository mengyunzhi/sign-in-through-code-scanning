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

 Date: 05/04/2022 09:40:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yunzhi_klass_course
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_klass_course`;
CREATE TABLE `yunzhi_klass_course`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `klass_id` int UNSIGNED NOT NULL,
  `course_id` int UNSIGNED NOT NULL,
  `create_time` int UNSIGNED NOT NULL,
  `update_time` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 67 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = FIXED;

SET FOREIGN_KEY_CHECKS = 1;
