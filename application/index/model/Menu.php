<?php
namespace app\index\model;
use think\Request;

class Menu {
    public $module = '';
    public $controller = '';
    public $action = '';
    public $name = '';
    public $roles = [];

    public function __construct($module, $controller, $action, $name, $roles) {
        $this->module = $module;
        $this->controller = $controller;
        $this->action = $action;
        $this->name = $name;
        $this->roles = $roles;
    }

    public function getClass() {
        $url = self::getUrl();
        $arrayIndex = ['index', ''];
        $arraySchedule = [];
        $arrayCourse = [];
        $arrayCourseSchedule = [];
        $arrayPersonal = [];
    }

    static public function getUrl() {
        $url = [];
        $url['module'] = request()->module();
        $url['controller'] = request()->controller();
        $url['action'] = request()->action();
        return $url;
    }
}