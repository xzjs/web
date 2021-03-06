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
        $this->pre_list();
        $Today=D('Today');
        $this->assign('today_list',$Today->relation(true)->select());
        $News=A('News');
        $this->assign('news_list',$News->_list());
        $this->show();
    }

    /**
     * 为页面准备标题,列表
     */
    private function pre_list(){
        $this->assign('title','今日行情');
        $this->assign('class4','active');
        $Category=A('Category');
        $this->assign('list',$Category->_list());
        $Province=A('Province');
        $this->assign('province_list',$Province->_list());
        $Type=A('Type');
        $this->assign('type_list',$Type->_list());
    }

    /**
     * 获取对应的数据
     * @param $num 指定的条数
     * @return mixed 获得的数据数组
     */
    public function _list($num){
        $Today=D('Today');
        return $Today->order('time desc')->limit($num)->select();
    }
}