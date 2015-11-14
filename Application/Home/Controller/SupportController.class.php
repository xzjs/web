<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 15/10/6
 * Time: 上午11:24
 */

namespace Home\Controller;
use Think\Controller;


class SupportController extends Controller
{
    /**
     * 首页
     */
    public function index(){
        $this->pre_list();
        $Support=D('Support');
        $this->assign('support_list',$Support->select());
        $this->show();
    }

    /**
     * 发布供应
     */
    public function add(){
        $this->pre_list();
        $this->show();
    }

    public function addx(){
        $Support=D('Support');
        if($Support->create()){
            $result=$Support->add();
            if($result){
                $this->success('发布成功','index');
            }else{
                $this->error('发布失败');
            }
        }
    }

    /**
     * 为页面准备标题,列表
     */
    private function pre_list(){
        $this->assign('title','商品供应');
        $this->assign('class3','active');
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
        $Support=D('Support');
        return $Support->order('time desc')->limit($num)->select();
    }
}