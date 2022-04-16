<?php
namespace app\common\validate;
use think\Validate;

class User extends Validate
{
    protected $rule = [
        'number'    => 'require|length:4,40|number',
        'password'  => 'require|length:4,40|',
        'name'      => 'require|length:2,40|unique',
        'sex'       => 'require|in:0,1',
    ];
}