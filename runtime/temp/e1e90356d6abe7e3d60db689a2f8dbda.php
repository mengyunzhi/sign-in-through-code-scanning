<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:82:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\course\scheduleadd.html";i:1650094215;s:69:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\index.html";i:1650094215;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
课程管理
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
            

            
<form class="" action="<?php echo url('scheduleSave'); ?>" method="post">
    <div class="form-group row">
        <label for="course_id" class="col-sm-2 col-form-label" style="width: 162px">课程</label>
        <div class="col-sm-4">
            <select class="selectpicker form-control col-sm-12" name="course_id" id="course_id" required>
                <option value="">请选择课程</option>
                <?php if(is_array($Courses) || $Courses instanceof \think\Collection): $key = 0; $__LIST__ = $Courses;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Course): $mod = ($key % 2 );++$key;?>
                <option value="<?php echo $_Course->getId(); ?>"><?php echo $_Course->getName(); ?></option>
                <?php endforeach; endif; else: echo "" ;endif; ?>
            </select>
        </div>
    </div>
    <div class="form-group row">
        <label for="klass_id" class="col-sm-2 col-form-label" style="width: 162px">上课班级<br>(可多选)</label>
        <div class="col-sm-4">
            <select class="selectpicker form-control col-sm-12" multiple name="klass_id[]" id="klass_id" required>
                <option value="">请选择班级</option>
                <?php if(is_array($Klasses) || $Klasses instanceof \think\Collection): $key = 0; $__LIST__ = $Klasses;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$_Klass): $mod = ($key % 2 );++$key;?>
                <option value="<?php echo $_Klass->getId(); ?>"><?php echo $_Klass->getName(); ?></option>
                <?php endforeach; endif; else: echo "" ;endif; ?>
            </select>
        </div>
    </div>
    
    <!-- 添加课程 -->
    <div class="row">
        <div class="col-sm-12">
            <table class="table table-hover table-bordered">
                <tr>
                    <th class="">周几\课序</th>
                    <th class="">1</th>
                    <th class="">2</th>
                    <th class="">3</th>
                    <th class="">4</th>
                    <th class="">5</th>
                    <th class="">6</th>
                    <th class="">7</th>
                    <th class="">8</th>
                    <th class="">9</th>
                    <th class="">10</th>
                    <th class="">11</th>
                </tr>
                <?php foreach($Rows as $_Row): ?>
                <tr>
                    <td>周<?php echo $dayArray[$_Row]; ?></td>
                    <?php foreach($Cols as $_Col): ?>
                    <td>
                        <ul class="accordion" data-accordion>
                            <li class="accordion-navigation">
                                <a href="#time_<?php echo $_Row * 11 + $_Col + 1; ?>">课程</a>

                                <!-- 周 -->
                                <div id="time_<?php echo $_Row * 11 + $_Col + 1; ?>" class="content col-md-6">
                                    <label>上课周</label>
                                    <?php foreach(range(1, 11) as $_Week): ?>
                                    <input type="checkbox" name="course_<?php echo $_Row * 11 + $_Col + 1; ?>[]" value="<?php echo $_Week; ?>" id="klass_<?php echo $_Row * 11 + $_Col + 1; ?>_<?php echo $_Week; ?>">
                                    <label for="klass_<?php echo $_Row * 11 + $_Col + 1; ?>_<?php echo $_Week; ?>">第<?php echo $_Week; ?>周</label>
                                    <?php endforeach; ?>
                                </div>

                                <!-- 教室 -->
                                <div id="time_<?php echo $_Row * 11 + $_Col + 1; ?>" class="content col-sm-6">
                                    <label>选择教室</label>
                                    <?php foreach($Rooms as $key => $_Room): ?>
                                    <input type="checkbox" name="room_<?php echo $_Row * 11 + $_Col + 1; ?>[]" value="<?php echo $_Room->getId(); ?>" id="room_<?php echo $_Row * 11 + $_Col + 1 .'_'. ($key+1); ?>">
                                    <label for="room_<?php echo $_Row * 11 + $_Col + 1 .'_'. ($key+1); ?>"><?php echo $_Room->name; ?></label>
                                    <?php endforeach; ?>
                                </div>
                            </li>
                        </ul>
                    </td>
                    <?php endforeach; ?>
                </tr>
                <?php endforeach; ?>
            </table>
        </div>
    </div>
<!-- 初始化 Foundation JS -->
<script>
$(document).ready(function() {
    $(document).foundation();
})
</script>
    <div class="form-group row">
        <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">确定</button>
            <a href="<?php echo url('courseSort'); ?>" class="btn btn-primary"><i class="glyphicon"></i>&nbsp;返回</a>
        </div>
    </div>
</form>
<div style="height: 100px;">
</div>

            

        </div>
    </div>

</body>

</html>