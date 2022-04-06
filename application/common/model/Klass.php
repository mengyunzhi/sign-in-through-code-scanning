<?php
namespace app\common\model;
use think\Model;

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

}