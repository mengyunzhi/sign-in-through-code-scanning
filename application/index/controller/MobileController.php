<?php
namespace app\index\controller;     //命名空间，也说明了文件所在的文件夹
use app\common\model\Teacher;
use app\common\model\User;
use think\Controller;
use think\Request;

class MobileController extends IndexController
{

    public function index()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();
        // 将数据返回给用户
        return $htmls;
    }

    public function courseEnd() {
        return $this->success('课程已结束', url('index'));
    }

    public function courseStart() 
    {
        return $this->fetch();
    }

    public function coursing()
    {
        return $this->fetch();
    }

    public function randomCode()
    {
        return $this->fetch();
    }

    public function signInSeat() {
        $htmls = $this->fetch();
        return $htmls;
    }

    public function signInStudent() {
        $htmls = $this->fetch();
        return $htmls;
    }
}