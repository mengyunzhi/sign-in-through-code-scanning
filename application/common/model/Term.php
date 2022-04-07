<?php
namespace app\common\model;
use think\Model;

class Term extends Model {

    public function getId() {
        return isset($this->data['id']) ? (int)$this->data['id'] : null;
    }

    public function getName() {
        return isset($this->data['name']) ? $this->data['name'] : null;
    }

    public function getState() {
        return isset($this->data['state']) ? $this->data['state'] : null;
    }

    public function getStartTime() {
        return isset($this->data['start_time']) ? $this->data['start_time'] : null;
    }

    static public function getCurrentTerm()
    {
        return self::where('state', 'eq', 1)->find();
    }

}