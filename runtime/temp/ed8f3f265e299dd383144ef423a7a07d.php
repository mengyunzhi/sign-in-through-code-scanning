<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:76:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\course\index.html";i:1650097421;s:69:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\index.html";i:1650094215;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
教师端
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
            
<hr />
<div class="row">
    <div class="col-md-12" style="float-right">
        <a href="<?php echo url('courseAdd'); ?>" class="btn btn-primary"><i class="glyphicon"></i>&nbsp;添加课程</a>
    </div>
    <div class="col-md-10">
        <form class="form-inline">
            <div class="form-group">
                <input name="name" type="text" class="form-control" placeholder="名称" style="margin-top: 20px" value="<?php echo $name; ?>">
                <input name="lesson" type="text" class="form-control" placeholder="学时" style="margin-top: 20px" value="<?php echo $lesson; ?>">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-default" style="height: 30px"><i class="glyphicon glyphicon-search"></i>&nbsp;查询</button>
            </div>
        </form>
    </div>
</div>
<hr />

            
<table class="table table-hover table-bordered">
    <tr class="info">
        <th>序号</th>
        <th>课程名称</th>
        <th>学时</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($Courses) || $Courses instanceof \think\Collection): $key = 0; $__LIST__ = $Courses;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Course): $mod = ($key % 2 );++$key;?>
    <tr>
        <td><?php echo $key; ?></td>
        <td><?php echo $_Course->getName(); ?></td>
        <td><?php echo $_Course->getLesson(); ?></td>
        <td>
            <a class="btn btn-success" href="<?php echo url('courseEdit?id='. $_Course->getId()); ?>"><i class="glyphicon"></i>&nbsp;编辑</a>
            <a class="btn btn-danger" href="<?php echo url('courseDelete?id='. $_Course->getId()); ?>"><i class="glyphicon"></i>&nbsp;删除</a>
        </td>
    </tr>
    <?php endforeach; endif; else: echo "" ;endif; ?>
</table>

            
<?php echo $Courses->render(); ?>

        </div>
    </div>

</body>

</html>