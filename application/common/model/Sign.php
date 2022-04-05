<?php
namespace app\common\model;
use think\Model;

class Sign extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getDispatchId() {
        return isset($this->data['dispatch_id']) ? (int)$this->data['dispatch_id'] : null;
    }

    public function getKlassId() {
        return isset($this->data['student_id']) ? (int)$this->data['student_id'] : null;
    }

    public function getIn() {
        return isset($this->data['in']) ? $this->data['in'] : null;
    }

    public function getOut() {
        return isset($this->data['out']) ? $this->data['out'] : null;
    }

}