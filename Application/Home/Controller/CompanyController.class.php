<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/11/9
 * Time: 下午5:34
 */
namespace Home\Controller;

use Think\Controller;

class CompanyController extends Controller
{
    /**
     * 小微企业首页
     */
    public function index(){
        $this->pre_list();
        $Province=A('Province');
        $this->assign('province_list',$Province->_list());

        $Company=M('Company');
        $this->assign('today_list',$Company->select());
        $this->show();
    }

    /**
     * 为页面准备标题,列表
     */
    private function pre_list(){
        $this->assign('title','小微企业');
        $this->assign('class5','active');
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
        $Company=D('Company');
        return $Company->order('time desc')->limit($num)->select();
    }
}