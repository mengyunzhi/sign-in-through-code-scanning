<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:103:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/admin\view\admin_term\add.html";i:1650092302;s:113:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/admin\view\.\..\..\index\view\index.html";i:1650095877;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
学期管理新增
</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.staticfile.org/foundation/5.5.3/css/foundation.min.css">
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/foundation/5.5.3/js/foundation.min.js"></script>
    <script src="https://cdn.staticfile.org/foundation/5.5.3/js/vendor/modernizr.js"></script>
    <script src="https://unpkg.com/vue@next"></script>
    <style type="text/css">
        .badge-primary {
            color: #fff;
            background-color: #007bff;
        }
        .badge-secondary {
            color: #fff;
            background-color: #6C757D;
        }

    </style>
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
            

            
<form class="" action="<?php echo url('save'); ?>" method="post">
<form action="<?php echo url('save'); ?>" method="post">
    <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">名称</label>
        <div class="col-sm-4">
            <input type="text" class="form-control" id="name" name="name">
        </div>
    </div>
    <div class="form-group row">
        <label for="start_time" class="col-sm-2 col-form-label">开始时间</label>
        <div class="col-sm-4">
            <input type="date" class="form-control" id="start_time" name="start_time">
        </div>
    </div>
    <div class="form-group row">
        <label for="end_time" class="col-sm-2 col-form-label">结束时间</label>
        <div class="col-sm-4">
            <input type="date" class="form-control" id="end_time" name="end_time">
        </div>
    </div>
    <div class="form-group row">
        <label for="state" class="col-sm-2 col-form-label">状态</label>
        <div class="col-sm-4">
            <input value="1" type="radio" name="state" id="1">
            <label for="1">已激活</label>
            <input value="0" type="radio" name="state" id="0" checked>
            <label for="0">未激活</label>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">保存</button>
            <a href="<?php echo url('index'); ?>" class="btn btn-primary">返回</a>
        </div>
    </div>
</form>

            

        </div>
    </div>

</body>

</html>