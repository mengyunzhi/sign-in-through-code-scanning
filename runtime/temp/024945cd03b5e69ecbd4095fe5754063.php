<?php if (!defined('THINK_PATH')) exit(); /*a:2:{s:74:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\task\klass.html";i:1650094215;s:69:"D:\xampp\htdocs\thinkphp5\public/../application/index\view\index.html";i:1650094215;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <title>
查看班级
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
    <div class="col-md-6">
        <a href="<?php echo url('index'); ?>" class="btn btn-primary"><i class="glyphicon"></i>&nbsp;返回</a>
    </div>
</div>
<hr />

            
<table class="table table-hover table-bordered">
    <tr class="info">
        <th>序号</th>
        <th>上课班级</th>
        <th>操作</th>
    </tr>
    <tr>
        <td>1</td>
        <td>计科211</td>
        <td>
            <a class="btn btn-sm btn-primary" href="<?php echo url('student'); ?>">&nbsp;查看学生</a>
            <a class="btn btn-sm btn-info" href="">&nbsp;生成成绩单</a>
            <a class="btn btn-sm btn-danger" href="">&nbsp;删除</a>
        </td>
    </tr>
    <tr>
        <td>2</td>
        <td>计科212</td>
        <td>
            <a class="btn btn-sm btn-primary" href="<?php echo url('student'); ?>">&nbsp;查看学生</a>
            <a class="btn btn-sm btn-info" href="">&nbsp;生成成绩单</a>
            <a class="btn btn-sm btn-danger" href="">&nbsp;删除</a>
        </td>
    </tr>
    <tr>
        <td>3</td>
        <td>计科213</td>
        <td>
            <a class="btn btn-sm btn-primary" href="<?php echo url('student'); ?>">&nbsp;查看学生</a>
            <a class="btn btn-sm btn-info" href="">&nbsp;生成成绩单</a>
            <a class="btn btn-sm btn-danger" href="">&nbsp;删除</a>
        </td>
    </tr>
    <tr>
        <td>4</td>
        <td>数学分析重修</td>
        <td>
            <a class="btn btn-sm btn-primary" href="<?php echo url('student'); ?>">&nbsp;查看学生</a>
            <a class="btn btn-sm btn-info" href="">&nbsp;生成成绩单</a>
            <a class="btn btn-sm btn-danger" href="">&nbsp;删除</a>
        </td>
    </tr>
</table>

            

        </div>
    </div>

</body>

</html>