<?php
namespace app\common\validate;
use think\Validate;

class User extends Validate
{
    protected $rule = [
        'number'    => 'length:4,40|number|unique:user',
        'password'  => 'require|length:4,40',
        'name'      => 'require|length:2,40',
        'sex'       => 'require|in:0,1',
    ];
}