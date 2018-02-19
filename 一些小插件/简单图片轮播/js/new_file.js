var count=0;
var autoFlag;
var ul1=document.getElementsByClassName("ul1")[0];
var preBtn=document.getElementsByClassName("pre")[0];
var nextBtn=document.getElementsByClassName("next")[0];
var autoBtn=document.getElementsByClassName("auto")[0];
var stopBtn=document.getElementsByClassName("stop")[0];
preBtn.disabled=true;//上来默认是第一张图，preBtn不可用；
stopBtn.disabled=true;

function preFunc(){
	nextBtn.disabled=false;
	if(count>0){
		count--;
		console.log(count);
		ul1.style['left']="-"+(count*400)%1600+"px";
	}
	if(count==0){
		preBtn.disabled=true;
	}
}

function nextFunc(){
	preBtn.disabled=false;
	if(count<3){
		count++;
		console.log(count);
		ul1.style['left']="-"+(count*400)%1600+"px";
	}
	if(count==3){
		nextBtn.disabled=true;
	}
}

function autoFunc(){
	stopBtn.disabled=false;
	autoBtn.disabled=true;
	preBtn.disabled=true;
	nextBtn.disabled=true;
	autoFlag=setInterval(function(){
		count++;
		ul1.style['left']="-"+(count*400)%1600+"px";
	},1000);
}

function stopFunc(){
	clearInterval(autoFlag);
	stopBtn.disabled=true;
	autoBtn.disabled=false;
	count=count%4;
	if(count>0){
		preBtn.disabled=false;
	}
	if(count<3){
		nextBtn.disabled=false;
	}
}
