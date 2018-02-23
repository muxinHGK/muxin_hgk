var addEle=document.getElementsByClassName("addToDoListClass")[0];
var todoCountEle=document.getElementsByClassName("todoCount")[0];
var doneCountEle=document.getElementsByClassName("doneCount")[0];
var todolistEle=document.getElementsByClassName("todoList")[0];
var donelistEle=document.getElementsByClassName("doneList")[0];
var todoCount=0;
var doneCount=0;
var todoList=[];
var doneList=[];
//用于添加todolist的函数
function addTodoList(){
	var addString=addEle.value.trim();
	if(addString.length==0){
		return;
	}
	else{
		var addObj={};
		addObj.todo=addString;
		todoCount++;
		todoCountEle.innerHTML=todoCount;
		todoList.push(addObj);
		localStorage.setItem("todoList",JSON.stringify(todoList));
		updatetodoList();
	}
	addEle.value="";
}
//用于更新页面todolist的函数
function updatetodoList(){
	var todoString="";
	if(todoList!=null){
		for(var i=0;i<todoList.length;i++){
			todoString=todoString+'<li><p id="todo-"'+i+'>'+todoList[i].todo+'</p>'
			+'<input type="button" class="changeStatus" onclick="changeStatus('+i+')" value="DONE">'
			+'<input type="button" class="deleteTodo" onclick="deleteTodo('+i+')" value="DELETE">'+'</li>';
		}
	}
	todolistEle.innerHTML=todoString;
}
//用于将todo状态改变为done状态的函数
function changeStatus(i){
	var doneObj={};
	doneObj.done=todoList[i].todo;
	doneList.push(doneObj);
	localStorage.setItem("doneList",JSON.stringify(doneList));
	doneCount++;
	doneCountEle.innerHTML=doneCount;
	updateDoneList();//更新donelist
	deleteTodo(i);
}

function deleteTodo(i){
	todoList.splice(i,1);//更新todolist和todoCount
	localStorage.setItem("todoList",JSON.stringify(todoList));
	updatetodoList();
	todoCount--;
	todoCountEle.innerHTML=todoCount;
}
//更新页面的donelist
function updateDoneList(){
	var doneString="";
	if(doneList!=null){
		for(var i=0;i<doneList.length;i++){
			doneString=doneString+'<li><p id="done-"'+i+'>'+doneList[i].done+'</p>'
			+'<input type="button" class="deleteDone" onclick="deleteDone('+i+')" value="DELETE">'+'</li>';
		}
	}
	donelistEle.innerHTML=doneString;
}

function deleteDone(i){
	doneList.splice(i,1);//更新donelist和doneCount
	localStorage.setItem("doneList",JSON.stringify(doneList));
	updateDoneList();
	doneCount--;
	doneCountEle.innerHTML=doneCount;
}

addEle.onkeypress=function(event){
	if(event.keyCode==13){
		addTodoList();
	}
}
//删除所有list的函数
function clearAll(){
	localStorage.clear();
	loadStorageData();
}

window.onload=loadStorageData();

function loadStorageData(){
	todoList=JSON.parse(localStorage.getItem("todoList"));
	if(todoList==null){
		todoList=[];
	}
	doneList=JSON.parse(localStorage.getItem("doneList"));
	if(doneList==null){
		doneList=[];
	}
	todoCount=todoList.length;
	doneCount=doneList.length;
	todoCountEle.innerHTML=todoCount;
	doneCountEle.innerHTML=doneCount;
	updatetodoList();
	updateDoneList();
}
