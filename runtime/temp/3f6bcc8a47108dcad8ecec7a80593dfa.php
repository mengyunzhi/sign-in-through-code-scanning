<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:100:"C:\Users\DELL\Desktop\yunzhi\lampp\htdocs\thinkphp\public/../application/index\view\login\index.html";i:1649993028;}*/ ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <title>教师登录</title>
</head>

<body class="container" style="margin-top: 20px">
    <form action="<?php echo url('Login/webLogin'); ?>" method="post">
        <div style="margin-left: 500px">
            <div class="row">
                <div class="col-12 p-2">
                    <label for="number">手机号:</label>
                    <input type="text" name="number" id="number" class="form-control" style="width: 150px" />
                </div>
            </div>
            <div class="row">
                <div class="col-12 p-2">
                    <label for="password">密码:</label>
                    <input type="password" name="password" id="password" class="form-control" style="width: 150px" />
                </div>
            </div>
            <div class="row">
                <div class="col-12 p-2" style="margin-top: 10px">
                    <button type="submit" class="btn btn-primary">登录</button>
                </div>
            </div>
        </div>
    </form>
</body>

</html>