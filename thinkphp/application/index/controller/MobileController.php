<?php
namespace app\index\controller;     //命名空间，也说明了文件所在的文件夹
use think\Controller;
use think\Request;
use think\Db;   // 引用数据库操作类

class MobileController extends Controller
{
    public function index()
    {
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    public function courseStart() 
    {
        return $this->fetch();
    }


    public function signInStudent() {
        $htmls = $this->fetch();
        return $htmls;
    }

    public function signInSeat() {
        $htmls = $this->fetch();
        return $htmls;
    }

    public function CourseEnd() {
        return $this->success('课程已结束', url('index'));
    }

}