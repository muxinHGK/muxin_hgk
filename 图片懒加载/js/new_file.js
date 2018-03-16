var imgs=document.getElementsByClassName("img");
var lastScroll=0;
function checkHeight(){
	//顺带试验一下鼠标滚动方向的判断
	if(window.scrollY-lastScroll>0){
		console.log("向下滚动")
	}else if(window.scrollY-lastScroll<0){
		console.log("向上滚动");
	}else{
		console.log("没有改变可视位置")
	}
	lastScroll=window.scrollY;
	//这里判断一下是否进入可视区域
	for(var i=0;i<imgs.length;i++){
		if(imgs[i].offsetTop<(window.innerHeight+window.scrollY)){
			//增加一个判断是否已经加载过图片的操作，避免重复操作
			//如果在加载过图片后在其他地方更改过dataset.src的属性
			//是否还可以这么操作？
			if(!imgs[i].src){
				imgs[i].src=imgs[i].dataset.src;
			}
		}
	}
}

window.onload=function(){
	checkHeight();
}

//window.onscroll=debounce(checkHeight,1000);
window.onscroll=throttle(checkHeight,1000);
//window.onscroll=throttle2(checkHeight,1000);

//顺便学习总结一下节流和防抖的实现
//实现一个简单的debounce函数
//在停止滚动后的delay秒之后才会执行图片的加载
function debounce(fn,delay){
	var timer=null;
	return function(){
		var context=this;//这里应该是window对象
		var args=arguments;
		if(timer){
			clearTimeout(timer);
		}
		timer=setTimeout(function(){
			fn.apply(context,args);
		},delay);
	}
}

//节流函数的实现，利用时间戳+定时器
function throttle(fn,delay){
	var pre;
	var timer=null;
	console.log(pre);
	return function(){
		var now=Date.now();
		var context=this;
		var args=arguments;
		//第一次滚动可以加载一次；
		if(!pre){
			fn.apply(context,args);
			pre=now;
		}
		//连续滚动的过程中，时间间隔大于等于delay时可以触发一次
		else if(pre&&now-pre>delay){
			fn.apply(context,args);
			pre=now;
		}
		//保证最后一次触发在delay秒之后能够正常执行
		else{
			clearTimeout(timer);
			timer=setTimeout(function () {
        		fn.apply(context, args);
      		}, delay);
		}
	}
}

//节流函数的第二种实现
function throttle2(fn, delay) {
  var last;
  var timer=null;
  // 默认间隔为 250ms
  delay || (delay = 250);

  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this;
    var args = arguments;
    var now = +new Date();
    // 如果距离上次执行 fn 函数的时间小于 delay，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + delay) {
      clearTimeout(timer);
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, delay);
    // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now;
      fn.apply(context, args);
    }
  }
}

