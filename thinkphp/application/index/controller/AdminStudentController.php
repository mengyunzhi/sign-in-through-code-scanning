<?php
namespace app\index\controller;
use app\common\model\Teacher;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class AdminStudentController extends Controller
{
	
    public function index()
    {
        return $this->fetch();
    }

    public function add()
    {
        return $this->fetch();
    }

    public function edit()
    {
        return $this->fetch();
    }

}