<?php
namespace app\common\model;
use think\Model;

class Klass extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getName() {
        return $this->data['name'];
    }

    public function getCourseId() {
        return (int)$this->data['course_id'];
    }

}