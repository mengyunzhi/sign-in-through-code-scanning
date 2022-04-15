<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:75:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\index\index.html";i:1650014901;s:69:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\index.html";i:1650014901;}*/ ?>
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
                            <ul class="nav navbar-nav">
                                <li class=""><a href="<?php echo url('index'); ?>">课程管理</a></li>
                            </ul>
                            <ul class="nav navbar-nav">
                                <li class=""><a href="<?php echo url('courseSort'); ?>">排课管理</a></li>
                            </ul>
                            <ul class="nav navbar-nav">
                                <li class=""><a href="<?php echo url('courseScheduleWeek?week='.$week); ?>">课程表</a></li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <li><a href="<?php echo url('index/Login/webLogout'); ?>">注销</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            <!-- /菜单导航 -->
            
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            

            
<table class="table table-hover table-bordered">
    <tr class="info">
        <th>序号</th>
        <th>课程名称</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($Schedules) || $Schedules instanceof \think\Collection): $key = 0; $__LIST__ = $Schedules;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Schedule): $mod = ($key % 2 );++$key;?>
    <tr>
        <td><?php echo $key; ?></td>
        <td><?php echo $_Schedule->getCourse()->name; ?></td>
        <td>
            <a class="btn btn-success" href="<?php echo url('student?schedule_id='.$_Schedule->id); ?>"><i class="glyphicon"></i>&nbsp;查看学生</a>
            <a class="btn btn-warning" href="<?php echo url('courseStart'); ?>"><i class="glyphicon"></i>&nbsp;开始上课</a>
        </td>
    </tr>
    <?php endforeach; endif; else: echo "" ;endif; ?>
</table>

            

        </div>
    </div>
</body>

</html>