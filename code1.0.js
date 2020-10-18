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
	alert("Auto-Fill the verifying box every 3 seconds.");
    setTimeout (function ()
	{Main();}, 3000);

	function Main(){
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

		var Gmain=getTheMainColor();
		function getTheMainColor(){
			var kind=[];
			var kindN=1;
			var kindS=[];
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

			function findTheKind(a){
				for (var i=1;i<=kindN;i++){
					if (a==kind[i]){
						return i;
					}
				}
				return 0;
			}
			var mainKindId = 1;
			for (var iii=1;iii<=kindN;iii++){
					if (kindS[mainKindId]<kindS[iii])
                    {mainKindId=iii;}
			}
			return kind[mainKindId];
		}


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
				else if(imgData[4*(130*j+i)]==Gmain)
					{boolColor[i][j]=11;}
                boolTest[i][j]="";
				boolGet[i][j]="";
			}
		}
		console.log(boolColor);

		var s=[0,0,0,0,0];//4个数字的面积 1-4

		getTheCode1();

		function getTheCode1(){
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


		function expand(i,j,n){
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
		console.log(s[1]+" "+s[2]+" "+s[3]+" "+s[4]);
        console.log(boolGet);
        console.log(boolTest);
		function refresh(){

		}

		setTimeout (function ()
		{
			changepica();
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