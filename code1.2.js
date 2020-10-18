// ==UserScript==
// @name        Auto-Fill-Verification-Code-Box-of-ZJU
// @author      HsFish1213
// @namespace   https://github.com/HsFish1213/Auto-Fill-Verification-Code-Box-of-ZJU
// @description 自动填写浙大验证码
// @include     http://10.203.97.155/home/book*
// @require     https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @version     1.2
// @grant       none
// @run-at      document-start
// ==/UserScript==

var $ = window.jQuery;

(function() {
	alert("Auto-Fill the verifying box every 3 seconds.");
    setTimeout (function ()
	{Main();}, 3000);

	function Main(){
		var img = document.getElementById("checkpic");
		console.log("Time is up");
        $("verify").val("lalala");//////to solve maybe by document
        console.log(img.src);//for test
        //$("#imgCode").hide();
		var canvas = document.createElement('canvas');//创建画布
		document.body.appendChild(canvas);
		canvas.width = 130;
		canvas.height= 50;

		var ctx;
		var imgArr = [];

		console.log("Draw happens!");//开始绘入img （for test）
		if (!canvas.getContext) return;
		ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		console.log("Getting code!");//for test
		var imgData_obj = ctx.getImageData(0,0,canvas.width,canvas.height);// 获取画布上的图像像素矩阵
		var imgData = imgData_obj.data;// 获取到的数据为一维数组，包含图像的RGBA四个通道数据

		var Gmain=getTheMainColor();//获取主要的颜色
		function getTheMainColor(){
			var kind=[];//各种颜色的集合
			var kindN=1;//颜色种类数
			var kindS=[];//不同种颜色的面积
			for (var i=0;i<=130-1;i++){
				for (var j=0;j<=50-1;j++){
					kindS.push(0);
					var colorNow=imgData[4*(130*j+i)];
					if(colorNow!=243 && findTheKind(colorNow)==0){
						kind[kindN]=colorNow;
						kindS[kindN]++;
						kindN++;
					}
					else if(colorNow!=243){
						kindS[findTheKind(colorNow)]++;
					}
				}
			}

			function findTheKind(a){//找到所在颜色类型
				for (var i=1;i<=kindN;i++){
					if (a==kind[i]){
						return i;
					}
				}
				return 0;
			}
			var mainKindId = 1;
			for (var iii=1;iii<=kindN;iii++){//计算得到主要的颜色
					if (kindS[mainKindId]<kindS[iii])
                    {mainKindId=iii;}
			}
			return kind[mainKindId];
		}


		var boolColor = new Array(130);//存储背景、数字以及轮廓的矩阵
        var boolTest = new Array(130);//for test
		var boolGet = new Array(130);//是否已经检测
		for (var i=0;i<=130-1;i++){
			boolColor[i]=new Array(50);
            boolTest[i]=new Array(50);
			boolGet[i]=new Array(50);
			for (var j=0;j<=50-1;j++){
				if(imgData[4*(130*j+i)]==243)
					{boolColor[i][j]="";}
				else if(imgData[4*(130*j+i)]==Gmain)
					{boolColor[i][j]=11;}
                boolTest[i][j]="";
				boolGet[i][j]="";
			}
		}
		console.log(boolColor);//for test

		var s=[0,0,0,0,0];//4个数字的面积 1-4

		getTheCode1();

		function getTheCode1(){//开始逐一拓展
			var n=1;
			for (var i=0;i<=130-1;i++){
				for (var j=0;j<=50-1;j++){
					if (boolGet[i][j]==""&&boolColor[i][j]==11){
						expand(i,j,n);
						n++;
					}
				}
			}
		}


		function expand(i,j,n){//使用递归 由一点拓展到整个数字 
            boolGet[i][j]=11;
            boolTest[i][j]=11;//for test
            if(boolColor[i][j]==11){s[n]+=1;}
            //console.log("Expanding "+i+" "+j);//for test
			var iplus=[1,-1,0,0];
			var jplus=[0,0,1,-1];
			for(var m=0;m<=3;m+=1){
				var ii=i+iplus[m];
				var jj=j+jplus[m];
				if(0<=ii&&ii<=130-1&&0<=jj&&jj<=50-1&&boolGet[ii][jj]==""){
					if(boolColor[ii][jj]==11){
						expand(ii,jj,n);
					}
				}
			}
		}
		console.log(s[1]+" "+s[2]+" "+s[3]+" "+s[4]);//输出4个数字的面积
        console.log(boolGet);//for test
        console.log(boolTest);//for test
		function refresh(){

		}

		setTimeout (function ()//每3秒循环一次
		{
			changepic();
            Main();
		}, 3000);


		function changepica(){
			var captcha_img = $('#checkpic');
			var verifyimg = captcha_img.attr("src");
			captcha_img.attr('title', '点击刷新');
			captcha_img.click(function(){
			if( verifyimg.indexOf('?')>0){
				$(this).attr("src", verifyimg+'&random='+Math.random());
			}else{
				$(this).attr("src", verifyimg.replace(/\?.*$/,'')+'?'+Math.random());
			}
			});
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
	}
})();