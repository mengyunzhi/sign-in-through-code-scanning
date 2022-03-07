<?php
namespace app\common\validate;
use think\Validate;

class Klass extends Validate
{
    protected $rule = [
        'name'      => 'require|unique:klass|length:2,25',
        'number'    => 'require',
    ];
}