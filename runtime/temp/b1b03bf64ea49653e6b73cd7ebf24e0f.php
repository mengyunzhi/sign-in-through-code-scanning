<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:81:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\course\coursesort.html";i:1650094215;s:69:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\index.html";i:1650094215;}*/ ?>
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
<form>
    <div class="form-group row">
        <div class="col-sm-2">
            <select class="selectpicker form-control col-sm-12" name="course_id">
                <option value="">课程</option>
                <?php if(is_array($Courses) || $Courses instanceof \think\Collection): $key = 0; $__LIST__ = $Courses;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Course): $mod = ($key % 2 );++$key;?>
                <option value="<?php echo $_Course->id; ?>" <?php if($_Course->id == input('param.course_id')){echo 'selected';} ?>><?php echo $_Course->name; ?></option>
                <?php endforeach; endif; else: echo "" ;endif; ?>
            </select>
        </div>

        <div class="col-sm-2">
            <select class="selectpicker form-control col-sm-12" name="term_id">
                <option value="">学期</option>
                <?php if(is_array($Terms) || $Terms instanceof \think\Collection): $key = 0; $__LIST__ = $Terms;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Term): $mod = ($key % 2 );++$key;?>
                <option value="<?php echo $_Term->id; ?>" <?php if($_Term->id == input('param.term_id')){echo 'selected';} ?>><?php echo $_Term->name; ?></option>
                <?php endforeach; endif; else: echo "" ;endif; ?>
            </select>
        </div>
        <div class="col-md-2">
            <button class="btn">确定</button>
        </div>
        <div class="col-md-6 text-right">
            <a href="<?php echo url('courseAdd'); ?>" class="btn btn-primary"><i class="glyphicon"></i>&nbsp;添加课程</a>&nbsp;&nbsp;
            <a href="<?php echo url('scheduleAdd'); ?>" class="btn btn-primary"><i class="glyphicon"></i>&nbsp;添加排课</a>&nbsp;&nbsp;
            <a href="<?php echo url(''); ?>" class="btn btn-primary"><i class="glyphicon"></i>&nbsp;导出所有课程</a>
        </div>
    </div>
</form>
<hr />

            
<table class="table table-hover table-bordered">
    <tr class="info">
        <th>序号</th>
        <th>课程名称</th>
        <th>学期名称</th>
        <th>班级</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($Schedules) || $Schedules instanceof \think\Collection): $key = 0; $__LIST__ = $Schedules;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Schedule): $mod = ($key % 2 );++$key;?>
    <tr>
        <td><?php echo $key; ?></td>
        <td><?php echo $_Schedule->getCourse()->getName(); ?></td>
        <td><?php echo $_Schedule->getTerm()->getName(); ?></td>
        <td><?php 
            foreach($_Schedule->Klasses as $key => $Klass) {
                if($key !== 0)
                    echo ' ';
                echo $Klass->getName();
            }
         ?></td>
        <td>
            <a class="btn btn-info" href="<?php echo url('courseDetail?schedule_id='.$_Schedule->getId()); ?>"><i class="glyphicon"></i>&nbsp;编辑</a>
            <a class="btn btn-danger" href="<?php echo url('courseDelete?schedule_id='.$_Schedule->getId()); ?>"><i class="glyphicon"></i>&nbsp;删除</a>
        </td>
    </tr>
    <?php endforeach; endif; else: echo "" ;endif; ?>
</table>

            
    <?php echo $Schedules->render(); ?>

        </div>
    </div>

</body>

</html>