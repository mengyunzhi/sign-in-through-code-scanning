<?php
namespace app\common\model;
use think\Model;

class Klass extends Model {

    public function getId() {
        return $this->data['id'];
    }

    public function getName() {
        return $this->data['name'];
    }

    public function getCourseId() {
        return $this->data['course_id'];
    }

}