<?php
namespace app\common\validate;
use think\Validate;

class Term extends Validate
{
    protected $rule = [
        'name'      => 'require|unique:term|length:1,25',
    ];
}