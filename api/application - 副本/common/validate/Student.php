<?php
namespace app\common\validate;
use think\Validate;

class Student extends Validate
{
    protected $rule = [
        'sno'       => 'require|unique:student|number|length:3,20',
    ];
}