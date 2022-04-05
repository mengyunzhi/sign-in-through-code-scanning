<?php
namespace app\common\model;
use think\Model;

class Sign extends Model {

    public function getId() {
        return (int)$this->data['id'];
    }

    public function getDispatchId() {
        return (int)$this->data['dispatch_id'];
    }

    public function getKlassId() {
        return (int)$this->data['student_id'];
    }

    public function getIn() {
        return $this->data['in'];
    }

    public function getOut() {
        return $this->data['out'];
    }

}