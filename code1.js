// ==UserScript==
// @name        Auto-Fill-verifying-code-of-ZJU
// @namespace   none
// @description 自动填写验证码
// @include     http://10.203.97.155/home/book/*
// @require     https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @version     1.0
// @grant       none
// @run-at      document-start
// ==/UserScript==

var $ = window.jQuery;

(function() {
	alert("Auto-Fill the verifying box after 3 seconds.");//可以改进成检测按钮按动
    setTimeout (function ()
		{
			var img = document.getElementById("checkpic");
			console.log("time up");
            $("verify").val("lalala");
            console.log(img.src);
            //$("#imgCode").hide();
			var canvas = document.createElement('canvas');
			document.body.appendChild(canvas);
			canvas.width = 130;
			canvas.height= 50;

			var ctx;
			var imgArr = [];

			console.log("draw happens!!!!");
			if (!canvas.getContext) return;
			ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);

			console.log("getting code!!");
			var imgData_obj = ctx.getImageData(0,0,canvas.width,canvas.height);// 获取画布上的图像像素矩阵
			var imgData = imgData_obj.data;// 获取到的数据为一维数组，包含图像的RGBA四个通道数据
			
			var onlyG = new Array(130);
			for (var i=0;i<=130-1;i++){
				onlyG[i]=new Array(50);
				for (var j=0;j<=50-1;j++){
					if(imgData[4*(130*j+i)]==243)
					{onlyG[i][j]=0;}
					else 
					{onlyG[i][j]=1;}
				}
			}
			console.log(onlyG);
			/*
			for(var i=0; i<=4*6500-1; i += 4){
				//imgData.length
				imgArr.push(imgData[i], imgData[i+1], imgData[i+2]);
				onlyG.push(imgData[i]);
                if(imgData[i]!=243){
                    console.log(i+" "+imgData[i]);
                }
			}*/

		}, 3000);
})();