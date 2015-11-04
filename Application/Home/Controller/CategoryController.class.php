<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/4
 * Time: 下午10:40
 */
namespace Home\Controller;

use Think\Controller;

class CategoryController extends Controller
{
    /**
     * 获取种类的列表
     * @return mixed 种类的数组
     */
    public function _list(){
        $Category=M('Category');
        return $Category->select();
    }
}