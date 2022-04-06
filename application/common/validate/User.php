<?php
namespace app\common\validate;
use think\Validate;

class User extends Validate
{
    protected $rule = [
        'name'      => 'require|length:2,25',
        'sex'       => 'require|in:0,1',
        'number'       => 'require|length:2,25',
        'password'       => 'require|length:2,25',
    ];
}