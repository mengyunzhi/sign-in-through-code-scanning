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
        //当前有只有一个控制器
        //如果实现active显示应该需要判断action是不是在某个数组

        //目前希望把教师端分成多个控制器
        //比如管理端的 AdminTerm  AdminKlass  ...
    }

    static public function getUrl() {
        $url = [];
        $url['module'] = request()->module();
        $url['controller'] = request()->controller();
        $url['action'] = request()->action();
        return $url;
    }
}