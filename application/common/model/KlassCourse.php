<?php
namespace app\common\model;
use think\Model;

class KlassCourse extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getKlassId() {
        return isset($this->data['klass_id']) ? (int)$this->data['klass_id'] : null;
    }

    public function getCourseId() {
        return isset($this->data['course_id']) ? (int)$this->data['course_id'] : null;
    }

}