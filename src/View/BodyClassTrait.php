<?php

namespace App\View;

use Cake\Utility\Inflector;

trait BodyClassTrait
{
    /**
     * body タグの data 属性をリクエストパラメータから生成する
     * リクエストパラメータのフォーマットはスネークケース (hoge_piyo_fuga) となる
     *
     * @return string
     */
    public function getBodyData()
    {
        $tpl = 'data-prefix="%s" data-controller="%s" data-action="%s"';
        $html = sprintf(
            $tpl,
            $this->getPrefixName('underscore'),
            $this->getControllerName('underscore'),
            $this->getActionName('underscore')
        );
        return $html;
    }

    /**
     * body タグの class 属性をリクエストパラメータから生成する
     * リクエストパラメータのフォーマットはケバブケース (hoge-piyo-fuga) となる
     * 注意: リクエストパラメータに prefix がない場合は、prefix を no-prefix とする
     *
     * @param string $class
     * @return string
     */
    public function getBodyClass($class = '')
    {
        $tpl = 'class="%s %s %s %s"';
        $html = sprintf(
            $tpl,
            $this->getPrefixName('dasherize') ?: 'no-prefix',
            $this->getControllerName('dasherize'),
            $this->getActionName('dasherize'),
            $class
        );
        return $html;
    }

    /**
     * 現在のコントローラの名前を返す
     *
     * @param string $inflectorName
     * @return string
     */
    public function getControllerName($inflectorName = null)
    {
        $name = $this->name;
        if ($inflectorName) {
            $name = Inflector::{$inflectorName}($name);
        }
        return $name;
    }

    /**
     * 現在のアクションの名前を返す
     *
     * @param string $inflectorName
     * @return string
     */
    public function getActionName($inflectorName = null)
    {
        $name = $this->request->getParam('action');
        if ($inflectorName) {
            $name = Inflector::{$inflectorName}($name);
        }
        return $name;
    }

    /**
     * URL プレフィックス文字列を返す
     *
     * @param string $inflectorName
     * @return string
     */
    public function getPrefixName($inflectorName = null)
    {
        $name = $this->request->getParam('prefix');
        if ($inflectorName) {
            $name = Inflector::{$inflectorName}($name);
        }
        return $name;
    }
}
