<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/8
 * Time: 上午10:43
 */
namespace Home\Controller;

use Think\Controller;

class TodayController extends Controller
{
    /**
     * 今日行情首页
     */
    public function index(){
        $Category=A('Category');
        $this->assign('list',$Category->_list());
        $Province=A('Province');
        $this->assign('province_list',$Province->_list());
        $Type=A('Type');
        $this->assign('type_list',$Type->_list());
        $this->show();
    }
}