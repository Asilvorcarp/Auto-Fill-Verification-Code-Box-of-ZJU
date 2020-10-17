// ==UserScript==
// @name        Auto-Fill-Verification-Code-Box-of-ZJU
// @author      HsFish1213
// @namespace   https://github.com/HsFish1213/Auto-Fill-Verification-Code-Box-of-ZJU
// @description 自动填写浙大验证码
// @include     http://10.203.97.155/home/book*
// @require     https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @version     2.0
// @grant       none
// @run-at      document-start
// ==/UserScript==

var $ = window.jQuery;

(function() {
	alert("Auto-Fill the verifying box after 3 seconds.");
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

		var boolColor = new Array(130);
        var boolTest = new Array(130);
		var boolGet = new Array(130);
		for (var i=0;i<=130-1;i++){
			boolColor[i]=new Array(50);
            boolTest[i]=new Array(50);
			boolGet[i]=new Array(50);
			for (var j=0;j<=50-1;j++){
				if(imgData[4*(130*j+i)]==243)
					{boolColor[i][j]="";}
				else
					{boolColor[i][j]=11;}
                boolTest[i][j]=0;
				boolGet[i][j]=0;
			}
		}
		console.log(boolColor);

		var s=[0,0,0,0,0];//4个数字的面积 1-4

		getTheCode1();

		function getTheCode1(){
			var n=1;
			for (var i=0;i<=130-1;i++){
				for (var j=0;j<=50-1;j++){
					if (boolGet[i][j]==0&&boolColor[i][j]==1){
						expand(i,j,n);
						n++;
                        break;break;//for test
					}
				}
			}
		}


		function expand(i,j,n){
            boolGet[i][j]=1;
            boolTest[i][j]=1;//for test
            if(boolColor[i][j]==1){s[n]+=1;}
            console.log("Expanding "+i+" "+j);
			var iplus=[1,-1,0,0];
			var jplus=[0,0,1,-1];
			for(var m=-1;m<=1;m+=2){
				var ii=i+iplus[m];
				var jj=j+jplus[m];
				if(0<=ii&&ii<=130-1&&0<=jj&&jj<=50-1&&boolGet[ii][jj]==0){
					if(boolColor[ii][jj]==1){
						expand(ii,jj,n);
					}
				}
			}
		}
		console.log(s[1]+" "+s[2]+" "+s[3]+" "+s[4]);
        console.log(boolGet);
        console.log(boolTest);
		function refresh(){

		}
		/*
		for(var i=0; i<=4*6500-1; i += 4){
			//imgData.length
			imgArr.push(imgData[i], imgData[i+1], imgData[i+2]);
			boolColor.push(imgData[i]);
            if(imgData[i]!=243)
			{
                console.log(i+" "+imgData[i]);
            }
		}*/

		}, 3000);
})();