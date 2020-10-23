试图适配的网站：http://10.203.97.155/home/book/index/type/4(要多次检测 以保证分离）
http://my.zju.edu.cn/（稍微难一点）

<img id="checkpic" width="70px" onclick="changepic();" class="left15" height="50" style="margin-left:8px;float:left;" alt="验证码" src="/api.php/check" title="点击刷新">
<input style="width:70px;float:left;margin-top:7px;" name="verify" value="">

<a class="login-btn login_click" href="javascript:void(0);" one-link-mark="yes">登录</a>

<input type="text" name="username" value="" placeholder="学工号">
<input type="password" name="password" value="" placeholder="默认000">
<button type="button" i-id="ok" autofocus="" class="ui-dialog-autofocus">确定</button>

alertDialog('success!!!','success',1,10000)

$(document).ready(function(){
  $("button").click(function(){
    $("#test").hide();
  });
});

<canvas id="myCanvas" width="448" height="448">
    <img src="/api.php/check" id="img" alt=""/>
</canvas>
<script>
    // 通过js获取图像数据
    var canvas_obj = document.getElementById("myCanvas");   // 获取canvas标签对象
    var ctx = canvas_obj.getContext("2d");                  // 设置在画布上绘图的环境
    var img_obj = document.getElementById("img");           // 获取img标签对象
    ctx.drawImage(img_obj, 0, 0);                           // 将图片绘制到画布上
    var imgData_obj = ctx.getImageData(0,0,canvas_obj.width,canvas_obj.height);    // 获取画布上的图像像素矩阵
    var imgData = imgData_obj.data;     // 获取到的数据为一维数组，包含图像的RGBA四个通道数据
    // console.log(imgData.length);

    // 将获取到的图像数据去除A通道
    var imgArr = [];
    for(var i=0; i<imgData.length; i += 4){
        imgArr.push(imgData[i], imgData[i+1], imgData[i+2])
    }
    // console.log(imgArr)
    
</script>

//创建画布
var canvas=document.getElementById('canvas_id')
var ctx=canvas.getContext('2d')
//对图像进行旋转
var img= new Image()
img.src="/api.php/check"  // 图片源
img.onload=function(){
    var $img2=$(img)   //先获取jquery对象
    $img2.rotate(30) //调用旋转的函数
    var img3=$img2.get(0) //再将jquery对象转换成img对象
    //$('#show').html(img4)  //添加到子标签，图片显示的是旋转后的图片
    console.log(img3)  //控制台显示的图片信息是已经旋转过的
    ctx.drawImage(img3,0,0,img3.width,img3.height)  //但是为什么画布上画出来的却还是原图，还不理解
    var img_rotate=ctx.getImageData(0,0,img3.width,img3.height)    //获取画布上的图像像素矩阵
}

var l = img.data.length;
for (var i = 0; i < l; i += 4) {
    var R = img.data[i+0] 
    var G = img.data[i+1] 
    var B = img.data[i+2] 
    var A = img.data[i+3] 
}

------------------------------------
利用canvas的getImageData方法可以读取画布的某位置像素值。


var canvas = document.createElement(‘canvas’);

var context = canvas.getContext(‘2d’);

var image = new Image();
image.src = ‘image/test.png’;
image.crossOrigin = ‘Anonymous’;

image.onload = function(){
//将图片按像素写入画布
context.drawImage(image,0,0,this.width,this.height);
//读取图片某位置像素信息(x,y为需要读取的像素位置)
imageData = context.getImageData(x,y,1,1).data;
}
var l = image.data.length;
for (var i = 0; i < l; i += 4) {
    var R = image.data[i+0] 
    var G = image.data[i+1] 
    var B = image.data[i+2] 
    var A = image.data[i+3] 
}
返回值imageData是一个数组，里面存了该位置像素的rgba值

注意1：chrom浏览器的canvas无法读取网络图片,会报错误：

///roob
<img src="./a.jpg" alt="" width="300"><br>
<canvas id="tutorial" width="600" height="400"></canvas>
function draw(){
    var canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var img = document.querySelector("img");
    ctx.drawImage(img, 0, 0);
}
document.getElementById("img").onclick = function (){
    draw();
}

# Auto-Fill-Verification-Code-Box-of-ZJU
