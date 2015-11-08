<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/8
 * Time: 下午12:35
 */
namespace Home\Controller;

use Think\Controller;

class TypeController extends Controller
{
    public function _list(){
        $Type=M('Type');
        $list=$Type->select();
        return $list;
    }
}