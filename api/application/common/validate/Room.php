<?php
namespace app\common\validate;
use think\Validate;

class Room extends Validate
{
    protected $rule = [
        'capacity'  => 'require|number|checkCapacity:0',
        'name'      => 'unique:room|require'
    ];

    // 自定义验证规则
    protected function checkCapacity($value,$rule,$data)
    {
        return $value >= $rule ? true : '教室容量错误';
    }
}