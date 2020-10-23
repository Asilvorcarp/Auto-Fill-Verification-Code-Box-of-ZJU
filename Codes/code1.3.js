// ==UserScript==
// @name        Auto-Fill-Verification-Code-Box-of-ZJU
// @author      HsFish1213
// @namespace   https://github.com/HsFish1213/Auto-Fill-Verification-Code-Box-of-ZJU
// @description 自动填写浙大验证码
// @include     http://10.203.97.155/home/book*
// @require     https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @version     1.3
// @grant       none
// @run-at      document-start
// ==/UserScript==

var $ = window.jQuery;

(function() {
	alert("Auto-Fill the verifying box every 3 seconds.Please login now.");
	//$('a.badge login-btn login_click').trigger("click");
	//$('a.login-btn login_click').trigger("click");
    //$(".login-btn").trigger("click");
	setTimeout (function ()
	{Main();}, 3000);
	
	function Main(){
		var img = document.getElementById("checkpic");
		console.log("Time is up");
        $('input[name=verify]').val("Test");//for test
		//document.getElementsByName("verify").value="lalala";
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

		var ee=88;
		var boolColor = new Array(130);//存储背景、数字以及轮廓的矩阵
		var boolEachColor = new Array(5);//分别储存每个数字的矩阵
		for (var index=1;index<=4;index++){
			boolEachColor[index]=new Array(130);
		}
        var boolTest = new Array(130);//for test
		var boolGet = new Array(130);//是否已经检测
		for (var i=0;i<=130-1;i++){
			boolColor[i]=new Array(50);
			for (var z=1;z<=4;z++){boolEachColor[z][i]=new Array(50);}
            boolTest[i]=new Array(50);
			boolGet[i]=new Array(50);
			for (var j=0;j<=50-1;j++){
				if(imgData[4*(130*j+i)]==243)
					{boolColor[i][j]="";}
				else if(imgData[4*(130*j+i)]==Gmain)
					{boolColor[i][j]=11;}
				else boolColor[i][j]=ee;
				for (var index2=1;index2<=4;index2++){boolEachColor[index2][i][j]="";}
                boolTest[i][j]="";
				boolGet[i][j]="";
			}
		}

		var mainS=[0,0,0,0,0];//4个数字的主颜色面积 1-4
		var edgeS=[0,0,0,0,0];//4个数字的轮廓面积 1-4

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
            if(boolColor[i][j]==11){mainS[n]+=1;boolEachColor[n][i][j]=11;}
			if(boolColor[i][j]==ee){edgeS[n]+=1;boolEachColor[n][i][j]=ee;}
            //console.log("Expanding "+i+" "+j);//for test
			var iplus=[1,-1,0,0];
			var jplus=[0,0,1,-1];
			for(var m=0;m<=3;m+=1){
				var ii=i+iplus[m];
				var jj=j+jplus[m];
				if(0<=ii&&ii<=130-1&&0<=jj&&jj<=50-1&&boolGet[ii][jj]==""){
					if(boolColor[ii][jj]==11||boolColor[ii][jj]==ee){
						expand(ii,jj,n);
					}
				}
			}
		}

		function getAverage(n){//获得一个数字矩阵的main和edge的均坐标作为特征
			var mainXSum=0,mainYSum=0;
			var edgeXSum=0,edgeYSum=0;
			var aver=[];
			for (var i=0;i<=130-1;i++){
				for (var j=0;j<=50-1;j++){
					if (boolEachColor[n][i][j]==11){
						mainXSum+=i;
						mainYSum+=j;
					}
					if (boolEachColor[n][i][j]==ee){
						edgeXSum+=i;
						edgeYSum+=j;
					}
				}
			}
			aver[1]=mainXSum/mainS[n];aver[2]=mainYSum/mainS[n];
			aver[3]=edgeXSum/edgeS[n];aver[4]=edgeYSum/edgeS[n];
			return aver;
		}

		var aver=new Array(5);
		var vector=new Array(5);//每个数字的特征矢量
		var vectLength=new Array(5);//每个数字的特征矢量长度
		for(var index3=1;index3<=4;index3++){
			aver[index3]= getAverage(index3);
			vector[index3]=[aver[index3][1]-aver[index3][3],aver[index3][2]-aver[index3][4]];
			vectLength[index3]=Math.pow(vector[index3][0],2)+Math.pow(vector[index3][1],2);
		}

		console.log("Main: "+mainS[1]+" "+mainS[2]+" "+mainS[3]+" "+mainS[4]);//输出4个数字的main面积
		console.log("Edge: "+edgeS[1]+" "+edgeS[2]+" "+edgeS[3]+" "+edgeS[4]);//输出4个数字的edge面积
		for(var index4=1;index4<=4;index4++){
			console.log("Vect"+index4+":"+vectLength[index4]+"|"+vector[index4]);
		}
		console.log("----------------------------");//vector[1]+" "+vector[2]+" "+vector[3]+" "+vector[4]

		//console.log(boolEachColor);//for test
		//console.log(boolColor);//for test
        //console.log(boolGet);//for test
        //console.log(boolTest);//for test

		function refresh(){

		}

		setTimeout (function ()//每3秒自动刷新并且循环一次 
		{
			$('#checkpic').trigger("click");
				setTimeout (function ()
			{
				Main();
			}, 500);
		}, 3000);


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
		//感悟：要想提高准确性就得不断得往上加有区分度的特征
	}
})();