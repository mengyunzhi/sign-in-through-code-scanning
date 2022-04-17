<?php
namespace app\common\validate;
use think\Validate;

class Student extends Validate
{
    protected $rule = [
        'klass_id'  => 'require',
        'sno'       => 'require|unique|number|length:3,20',
    ];
}