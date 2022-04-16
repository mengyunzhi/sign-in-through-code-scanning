<?php
namespace app\index\service;
use app\index\model\Menu;
use app\common\model\User;

class MenuService {

    static public function Menus() {
        return $Menus = [
            new Menu('index', 'index', 'index', '课程任务', [User::$ROLE_TEACHER]),
            new Menu('index', 'index', 'courseSort', '排课管理', [User::$ROLE_TEACHER]),
            new Menu('index', 'index', 'courseScheduleWeek', '课程表', [User::$ROLE_TEACHER]),
            new Menu('index', 'admin_term', 'index', '学期管理', [User::$ROLE_ADMIN]),
            new Menu('index', 'admin_teacher', 'index', '教师管理', [User::$ROLE_ADMIN]),
            new Menu('index', 'admin_student', 'index', '学生管理', [User::$ROLE_ADMIN]),
            new Menu('index', 'admin_klass', 'index', '班级管理', [User::$ROLE_ADMIN]),
            new Menu('index', 'admin_room', 'index', '教室管理', [User::$ROLE_ADMIN]),
            new Menu('index', 'Login', 'webLogout', '注销', [User::$ROLE_ADMIN, User::$ROLE_TEACHER, User::$ROLE_STUDENT]),
        ];
    }    

    /**
     * 通过role获取符合权限的导航菜单
     * @param  [int] $role [权限]
     * @return [array]    [导航栏菜单]
     */
    static public function getAllowMenus($role) {
        $allowMenus = [];
        foreach (self::Menus() as $Menu) {
            if (in_array($role, $Menu->roles)) {
                array_push($allowMenus, $Menu);
            }
        }
        return $allowMenus;
    }

    static public function getCurrentMenus() {
        $currentUser = User::getCurrentLoginUser();
        return self::getAllowMenus($currentUser->getRole());
    }

}