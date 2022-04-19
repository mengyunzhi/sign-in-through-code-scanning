<?php
namespace app\common\validate;
use think\Validate;

class Student extends Validate
{
    protected $rule = [
        'klass_id'  => 'require|number',
        'sno'       => 'require|unique:student|number|length:3,20',
    ];
}