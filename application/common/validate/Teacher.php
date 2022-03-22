<?php
namespace app\common\validate;
use think\Validate;

class Teacher extends Validate
{
    protected $rule = [
        'name'      => 'require|length:2,25',
        'sex'       => 'require|in:0,1',
        'username'  => 'require|unique:teacher|length:4,25',
    ];
}