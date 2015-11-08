<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/8
 * Time: 上午11:49
 */
namespace Home\Controller;

use Think\Controller;

class ProvinceController extends Controller
{
    /**
     * 获取省份的列表
     * @return mixed 种类的数组
     */
    public function _list(){
        $Category=M('Province');
        return $Category->select();
    }
}