<?php
namespace app\admin\controller;
use think\Controller;
use think\Request;
use app\common\model\Admin;

/**
 * 管理端
 */
class AdminTermController extends IndexController
{
    
    public function add()
    {
        return $this->fetch();
    }

    public function edit()
    {
        return $this->fetch();
    }

    public function index() 
    {
        return $this->fetch();
    }

    public function save()
    {
        return $this->success('操作成功', url('index'));
    }
    
}