<?php
namespace app\index\controller;
use app\common\model\Teacher;
use think\Request;
use think\Controller;

/**
 * 管理端
 */
class IndexController extends Controller
{       

    public function __construct()
    {
        parent::__construct();
        session_start();
    }

    public function index()
    {
        return $this->fetch();
    }

}