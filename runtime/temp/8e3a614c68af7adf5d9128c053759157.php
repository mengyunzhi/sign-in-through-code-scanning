<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:105:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/admin\view\admin_room\index.html";i:1650092296;s:113:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/admin\view\.\..\..\index\view\index.html";i:1650095877;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
教室管理
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
        <a href="<?php echo url('add'); ?>" class="btn btn-primary"><i class="glyphicon"></i>&nbsp;添加教室</a>
    </div>
</div>
<hr />

            
<table class="table table-hover table-bordered">
    <tr class="info">
        <th>序号</th>
        <th>教室名称</th>
        <th>座位数</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($rooms) || $rooms instanceof \think\Collection): $key = 0; $__LIST__ = $rooms;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_room): $mod = ($key % 2 );++$key;?>
    <tr>
        <td><?php echo $key; ?></td>
        <td><?php echo $_room->name; ?></td>
        <td><?php echo $_room->capacity; ?></td>
        <td>
            <a href="<?php echo url('edit?id=' . $_room->getData('id')); ?>" class="btn btn-primary">编辑</a> &nbsp;&nbsp;
            <a href="<?php echo url('delete?id=' . $_room->getData('id')); ?>" class="btn btn-danger">删除</a>
        </td>
    </tr>
    <?php endforeach; endif; else: echo "" ;endif; ?>
</table>
<div><?php echo $rooms->render(); ?></div>

            
            
        </div>
    </div>

</body>

</html>