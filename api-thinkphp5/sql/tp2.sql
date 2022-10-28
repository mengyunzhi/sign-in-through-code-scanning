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

 Date: 28/07/2022 16:30:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yunzhi_admin
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_admin`;
CREATE TABLE `yunzhi_admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ADlM2ytBXdmhSTzz`(`user_id`) USING BTREE,
  CONSTRAINT `yunzhi_admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `yunzhi_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for yunzhi_course
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_course`;
CREATE TABLE `yunzhi_course`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `lesson` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 656 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_dispatch_room
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_dispatch_room`;
CREATE TABLE `yunzhi_dispatch_room`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `dispatch_id` int NOT NULL DEFAULT 0,
  `room_id` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1123 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for yunzhi_klass
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_klass`;
CREATE TABLE `yunzhi_klass`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `entrance_date` int NOT NULL DEFAULT 0,
  `length` int NOT NULL DEFAULT 0 COMMENT '学制',
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_program
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_program`;
CREATE TABLE `yunzhi_program`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  `lesson` int NOT NULL DEFAULT 0 COMMENT '学时',
  `course_id` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 49 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_program_score
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_program_score`;
CREATE TABLE `yunzhi_program_score`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL DEFAULT 0,
  `course_id` int NOT NULL DEFAULT 0,
  `program_id` int NOT NULL DEFAULT 0,
  `usual` int NOT NULL DEFAULT 0,
  `terminal` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `student_id`(`student_id`) USING BTREE,
  INDEX `course_id`(`course_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_room
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_room`;
CREATE TABLE `yunzhi_room`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `capacity` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 103 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_schedule
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_schedule`;
CREATE TABLE `yunzhi_schedule`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NOT NULL DEFAULT 0,
  `term_id` int NOT NULL DEFAULT 0,
  `course_id` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 399 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_schedule_klass
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_schedule_klass`;
CREATE TABLE `yunzhi_schedule_klass`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `schedule_id` int NOT NULL DEFAULT 0,
  `klass_id` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 403 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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

-- ----------------------------
-- Table structure for yunzhi_sign
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_sign`;
CREATE TABLE `yunzhi_sign`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `dispatch_id` int NOT NULL DEFAULT 0,
  `student_id` int NOT NULL DEFAULT 0,
  `in` int NOT NULL DEFAULT 0,
  `out` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_student
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_student`;
CREATE TABLE `yunzhi_student`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT 0,
  `klass_id` int NOT NULL,
  `sno` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `state` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `T1lDuz5XXcEbggrC`(`user_id`) USING BTREE,
  INDEX `klass_id`(`klass_id`) USING BTREE,
  CONSTRAINT `yunzhi_student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `yunzhi_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 201 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for yunzhi_student_schedule
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_student_schedule`;
CREATE TABLE `yunzhi_student_schedule`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL DEFAULT 0,
  `schedule_id` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `student_id`(`student_id`) USING BTREE,
  INDEX `schedule_id`(`schedule_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 731 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_teacher
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_teacher`;
CREATE TABLE `yunzhi_teacher`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL DEFAULT 0 COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `xoMNajVQKNmXgg6f`(`user_id`) USING BTREE,
  CONSTRAINT `yunzhi_teacher_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `yunzhi_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 85 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for yunzhi_term
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_term`;
CREATE TABLE `yunzhi_term`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `state` int NOT NULL DEFAULT 0 COMMENT '是否激活 0 未激活； 1 已激活',
  `start_time` int NOT NULL DEFAULT 0,
  `end_time` int NOT NULL,
  `create_time` int NOT NULL DEFAULT 0,
  `update_time` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for yunzhi_test
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_test`;
CREATE TABLE `yunzhi_test`  (
  `id` int NOT NULL,
  `ename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `charge` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for yunzhi_user
-- ----------------------------
DROP TABLE IF EXISTS `yunzhi_user`;
CREATE TABLE `yunzhi_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `role` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `sex` int NOT NULL DEFAULT 0,
  `create_time` int NOT NULL COMMENT '创建时间',
  `update_time` int NOT NULL DEFAULT 0 COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 356 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
