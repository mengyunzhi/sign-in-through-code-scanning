# sign-in-through-code-scanning
## 扫码签到系统<br>
### 一、api-thinkphp文件夹: <br>
#### <1> 前后端不分离的扫码签到系统<br>
#### <2> 充当angular前端的api
### 二、document文件夹:<br>
1. ER图
2. nginx 配置文件
### 三、web文件夹:

## 环境
1. node: V14.15.4
2. NPM: 6.14.10
3. chrome: 103.0.5060.53
4. Angular CLI: 11.0.7
5. nginx: 1.22.0 (配置文件见document)
6. xampp: [5.6.21](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/5.6.21/)
7. navicat
8. frpc [0.44.0] (内网穿透)

## 资源
1. 使用框架：[angular](https://angular.cn/)
2. 图标库 [fontawesome-free](https://fontawesome.com/v5/search?m=free)
3. bootstrap [V4.6.0](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
4. notiflix [3.2.5](https://www.npmjs.com/package/notiflix)
5. sweetalert2 [11.4.19](https://www.npmjs.com/package/sweetalert2)

## 启动环境(web/first-app)
0. `npm install -g @angular/cli@11.0.7`
1. `npm install`
2. `start nginx`
3. `./frpc.exe -c ./frpc.ini`
4. `ng s`启动应用
5. http://localhost:8080
6. `ng build`打包应用

## 说明
1. 登录管理端后完善数据（学期，教师，学生，教室）
2. 通过手机号登录教师端和学生端（在管理端添加的学生需要先激活再登录学生端）

## 可优化
1. 排课管理的 1、2、3... 多条tips （小单元的v层设置+-按钮）
2. 排课管理数据disabled的原因。
3. 排课管理的班级多选栏的界面
4. 学生注册 => 学生激活
