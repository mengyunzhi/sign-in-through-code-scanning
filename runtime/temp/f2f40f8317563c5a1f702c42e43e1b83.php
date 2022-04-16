<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:76:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\task\student.html";i:1650094215;s:69:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\index.html";i:1650094215;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
查看学生
</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.staticfile.org/foundation/5.5.3/css/foundation.min.css">
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/foundation/5.5.3/js/foundation.min.js"></script>
    <script src="https://cdn.staticfile.org/foundation/5.5.3/js/vendor/modernizr.js"></script>
    <script src="https://unpkg.com/vue@next"></script>
</head>

<body class="container">
    <!-- 菜单导航 -->
    <div class="row">
        <div class="col-md-12">
            
            <!-- 菜单导航 -->
                <nav class="navbar navbar-default" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="http://www.mengyunzhi.com">梦云智</a>
                        </div>
                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <?php if(is_array($Menus) || $Menus instanceof \think\Collection): $key = 0; $__LIST__ = $Menus;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Menu): $mod = ($key % 2 );++$key;?>
                                <ul class="nav navbar-nav <?php echo $_Menu->getClass(); ?>">
                                    <li class="<?php echo $_Menu->getClass(); ?>">
                                        <a href='<?php echo url($_Menu->module."/".$_Menu->controller."/".$_Menu->action); ?>'><?php echo $_Menu->name; ?></a>
                                    </li>
                                </ul>
                                <?php endforeach; endif; else: echo "" ;endif; ?>
                        </div>
                    </div>
                </nav>
            <!-- /菜单导航 -->
            
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-12">
            
<hr>
<div class="row">
    <div class="col text-right">
        <a href="<?php echo url('studentAdd?schedule_id='.input('param.schedule_id')); ?>" class="btn btn-primary">&nbsp;增加</a>
        <a href="<?php echo url(''); ?>" class="btn btn-primary">&nbsp;生成当前页面学生成绩单</a>
        <a href="/thinkphp/public/static/1813.xls" download="模板文件" class="btn btn-primary">&nbsp;下载Excel模板文件</a>
        <a href="" type="file" class="btn btn-primary">&nbsp;导入学生Excel文件</a>
        <a href="<?php echo url('klass'); ?>" class="btn btn-primary">&nbsp;返回</a>
    </div>
    <br>&nbsp
    <div class="col-md-10 text-left">
        <form class="form-inline">
            <div class="form-group">
                <input name="sno" type="text" class="form-control" placeholder="学号">
                <input name="name" type="text" class="form-control" placeholder="姓名">
                <input name="klass" type="text" class="form-control " placeholder="班级（复选框）">
                <button type="submit" class="btn btn-default"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
        </form>
    </div>
</div>
<hr />

            
<table class="table table-hover table-bordered">
    <tr class="info">
        <th>序号</th>
        <th>学号</th>
        <th>姓名</th>
        <th>班级</th>
        <th>性别</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($Students) || $Students instanceof \think\Collection): $key = 0; $__LIST__ = $Students;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Student): $mod = ($key % 2 );++$key;?>
    <tr>
        <td><?php echo $key; ?></td>
        <td><?php echo $_Student->getSno(); ?></td>
        <td><?php echo $_Student->getName(); ?></td>
        <td><?php echo $_Student->getKlass()->getName(); ?></td>
        <td><?php echo $_Student->getSex(); ?></td>
        <td>
            <a class="btn btn-sm btn-info" href="<?php echo url('fraction'); ?>">&nbsp;登记成绩</a>
            <a class="btn btn-sm btn-danger" href="<?php echo url(''); ?>">&nbsp;删除</a>
        </td>
    </tr>
    <?php endforeach; endif; else: echo "" ;endif; ?>
</table>

            


        </div>
    </div>

</body>

</html>