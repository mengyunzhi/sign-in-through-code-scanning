<?php
namespace app\common\model;
use think\Model;

class KlassCourse extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getKlassId() {
        return (int)$this->data['klass_id'];
    }

    public function getCourseId() {
        return (int)$this->data['course_id'];
    }

}