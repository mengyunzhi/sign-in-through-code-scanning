<?php
namespace app\common\model;
use think\Model;

class Sign extends Model {

    public function getId() {
        return $this->data['id'];
    }

    public function getDispatchId() {
        return $this->data['dispatch_id'];
    }

    public function getKlassId() {
        return $this->data['student_id'];
    }

    public function getIn() {
        return $this->data['in'];
    }

    public function getOut() {
        return $this->data['out'];
    }

}