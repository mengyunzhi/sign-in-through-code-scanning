<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:108:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/admin\view\admin_student\index.html";i:1650092299;s:113:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/admin\view\.\..\..\index\view\index.html";i:1650095877;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
管理员端-学生管理
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
            
<hr>
    <div class="row">
        <div class="col-md-10">
            <form class="form-inline">
                <div class="form-group">
                    <input name="klass" type="text" class="form-control " placeholder="班级" style="margin-top: 20px">
                    <input name="name" type="text" class="form-control" placeholder="姓名" style="margin-top: 20px" value="<?php echo $name; ?>">
                    <input name="sno" type="text" class="form-control" placeholder="学号" style="margin-top: 20px" value="<?php echo $sno; ?>">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default" style="height: 30px"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
                </div>
            </form>
        </div>
        <div class="col-md-2 text-right">
            <a href="<?php echo url('Add'); ?>" class="btn btn-primary" style="margin-top: 20px"><i class="glyphicon glyphicon-plus"></i>&nbsp;增加</a>
        </div>
    </div>
<hr />

            
<table class="table table-hover table-bordered">
    <tr class="info">
        <th>序号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>班级</th>
        <th>学号</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($students) || $students instanceof \think\Collection): $key = 0; $__LIST__ = $students;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Student): $mod = ($key % 2 );++$key;?>
    <tr>
        <td><?php echo $key; ?></td>
        <td><?php echo $_Student->getName(); ?></td>
        <td><?php echo $_Student->getSex(); ?></td>
        <td><?php echo $_Student->getStudentByUserId()->getKlass()->getName(); ?></td>
        <td><?php echo $_Student->getStudentByUserId()->getSno(); ?></td>
        <td>
            <a href="<?php echo url('edit?id=' . $_Student->getId()); ?>" class="btn btn-primary">编辑</a> &nbsp;&nbsp;
            <a href="<?php echo url('delete?id=' . $_Student->getId()); ?>" class="btn btn-danger">删除</a>
        </td>
    </tr>
    <?php endforeach; endif; else: echo "" ;endif; ?>
</table>

            
<?php echo $students->render(); ?>

        </div>
    </div>

</body>

</html>