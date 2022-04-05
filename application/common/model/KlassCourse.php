<?php
namespace app\common\model;
use think\Model;

class KlassCourse extends Model {

    public function getId() {
        return $this->data['id'];
    }

    public function getKlassId() {
        return $this->data['klass_id'];
    }

    public function getCourseId() {
        return $this->data['course_id'];
    }

}