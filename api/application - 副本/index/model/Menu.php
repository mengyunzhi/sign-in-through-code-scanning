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
        $class = '';
        if ($this->module===strtolower(request()->module()) && str_replace('_', '', $this->controller)===strtolower(request()->controller())) {
            $class .= 'active';
        }
        //注销靠右
        if ($this->name === '注销') {
            $class .= ' navbar-right';
        }
        return $class;
    }
}