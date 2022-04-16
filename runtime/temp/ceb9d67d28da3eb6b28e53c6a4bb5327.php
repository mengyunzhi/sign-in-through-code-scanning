<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:106:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/admin\view\admin_klass\index.html";i:1650092286;s:113:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/admin\view\.\..\..\index\view\index.html";i:1650095877;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
班级管理
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
            
<hr />
<div class="row">
    <div class="col-md-3">
        <a href="<?php echo url('add'); ?>" class="btn btn-primary"><i class="glyphicon"></i>&nbsp;添加班级</a>
    </div>
</div>
<hr />

            
<table class="table table-hover table-bordered">
    <tr class="info">
        <th>序号</th>
        <th>班级名称</th>
        <th>人数</th>
        <th>入学日期</th>
        <th>学制</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($klasses) || $klasses instanceof \think\Collection): $key = 0; $__LIST__ = $klasses;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_klass): $mod = ($key % 2 );++$key;?>
    <tr>
        <td><?php echo $key; ?></td>
        <td><?php echo $_klass->name; ?></td>
        <td><?php echo $_klass->getCount(); ?></td>
        <td><?php echo $_klass->getEntranceDate(); ?></td>
        <td><?php echo $_klass->length; ?></td>
        <td>
            <a href="<?php echo url('klassMembers?klass_id='.$_klass->id); ?>" class="btn btn-success">查看班级成员</a> &nbsp;&nbsp;
            <a href="<?php echo url('edit'); ?>" class="btn btn-primary">编辑</a>&nbsp;&nbsp;
            <a href="<?php echo url('delete?id='.$_klass->id); ?>" class="btn btn-danger">删除</a>
        </td>
    </tr>
    <?php endforeach; endif; else: echo "" ;endif; ?>
</table>

            
<?php echo $klasses->render(); ?>

        </div>
    </div>

</body>

</html>