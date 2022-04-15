<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:113:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/index\view\index\coursescheduleweek.html";i:1650012651;s:94:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/index\view\index.html";i:1649993028;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
添加教室
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
            

            
<form>
    <div class="form-group row">
        <div class="col-sm-3">
            <select class="selectpicker form-control col-sm-12" name="week" id="course_id">
                <?php foreach(range(1,16) as $value): ?>
                <option value="<?php echo $value; ?>" <?php if(input('param.week/d') === $value){ echo 'selected'; } ?>>第<?php echo $value; ?>周</option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="col-md-2">
            <button class="btn">确定</button>
        </div>
        <div class="col-md-7 text-right">
            <a href="<?php echo url('courseScheduleTerm'); ?>" class="btn btn-primary">查看学期课程表</a>
            <a href="javascript:history.go(-1)" class="btn btn-primary">返回</a>
        </div>
    </div>
</form>
<div class="row">
    <div class="col-md-12">
        <table>
            <thead>
                <tr>
                    <td class="col-md-1">
                    <?php if(empty(!input('param.week/d'))) {echo '第'.input('param.week/d').'周';} else {echo '请确认';}?></td>
                    <td class="col-md-1">周一</td>
                    <td class="col-md-1">周二</td>
                    <td class="col-md-1">周三</td>
                    <td class="col-md-1">周四</td>
                    <td class="col-md-1">周五</td>
                    <td class="col-md-1">周六</td>
                    <td class="col-md-1">周日</td>
                </tr>
            </thead>
            <tbody>
                <?php foreach (range(1,5) as $row): ?>
                <tr>
                    <td style="border:solid 0.2px #999999;"><p>第<?php echo $row; ?>节</p></td>
                    <?php foreach (range(1,7) as $col): ?>
                    <td style="border:solid 0.2px #999999;">
                            <?php
                                foreach($Dispatches as $key => $Dispatch) {
                                    if($Dispatch->day === $col && $Dispatch->lesson === $row) {
                                        echo '<div style="color:#EC5F66;">'.$Dispatch->getSchedule()->getCourse()->name.'</div>';
                                        foreach($Dispatch->getSchedule()->Klasses as $key => $Klass) {
                                            echo $Klass->name.'&nbsp';
                                        }
                                        echo '<br>';
                                        foreach($Dispatch->Rooms as $key => $Room) {
                                            echo $Room->name.'&nbsp';
                                        }
                                        echo ';'.';<br>';
                                    }
                                }
                            ?>
                    </td>
                    <?php endforeach; ?>
                </tr>
                <?php endforeach ?>
            </tbody>
        </table>
    </div>
</div>

            

        </div>
    </div>
</body>

</html>