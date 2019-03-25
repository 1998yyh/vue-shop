# vue-shop

> Vue外卖项目

## 项目功能


### 已完成
	登录注册 （ 简单版本 )  新增手机验证功能 目前只支持本人手机 测试余额大概还有6元
	首页
	商品详情
	购物车
	搜索

## 技术栈

### 前台
	Vue+Vue-router+Vuex+stylus+axios+better-scroll+miti-ui+vue-lazyload+mockjs

### 后台
	Express + Mongodb（mongoose）+ md5 + 熔炼云通信的手机验证码 + captcha图像验证码

	mongodb主要就存了存用户数据  商品啥的数据太多了 就mock一下算了…………


### 如何使用
 下载到本地 下载相关依赖(vue 和 server都需要下载) npm install

 启动mongo服务器 mongod
 启动node服务器 npm start
 启动vue 服务   npm start

 本地浏览器打开 localhost:8080
