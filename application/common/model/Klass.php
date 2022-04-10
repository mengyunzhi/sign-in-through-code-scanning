<?php
namespace app\common\model;
use think\Model;
use think\Db;   // 引用数据库操作类


class Klass extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getName() {
        return isset($this->data['name']) ? $this->data['name'] : null;
    }

    public function getCourseId() {
        return isset($this->data['course_id']) ? (int)$this->data['course_id'] : null;
    }

    /*
    * 通过班级名称获取到班级id
    */
    public function getKlassIdByName($KlassName) {
        $Klass = Db::table('yunzhi_klass')->where('name',$KlassName)->select();
        return $Klass[0]['id'];
    }

}