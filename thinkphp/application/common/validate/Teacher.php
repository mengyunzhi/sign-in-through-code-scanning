<?php
namespace app\common\validate;
use think\Validate;

class Teacher extends Validate
{
    protected $rule = [
        'username'  => 'require|unique:teacher|length:4,25',
        'name'      => 'require|length:2,25',
        'sex'       => 'in:0,1',
    ];
}