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

 Date: 30/03/2022 19:19:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yunzhi_user
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_user`;
CREATE TABLE `yunzhi_user`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `number` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `sex` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `create_time` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 0 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
