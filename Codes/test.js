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

console.log("Time is up");
		document.getElementsByName("verify").value="lalala";

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