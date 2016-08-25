// Const Vars
var elementTypes = ['circle', 'rect', 'ellipse', 'image', 'text', 'path'];
var rPadding = 10;			// Padding const
// Const Vars

// Setting =========================================

// 캔버스
//var canvasMinWidth = 980;
var canvasMinWidth = 980;
var canvasMinHeight = 500;

// Stakeholder
var defaultSHCount = 4;		// 기본 Stakeholder 갯수

var SHWidth = 960;			// Stakeholder의 기본 가로 크기
var SHHeight = 80;			// Stakeholder의 기본 세로 크기
var SHTitleBoxWidth = 100;
var SHTitleFontSize = 12;

// Activity 기본크기
var ActBeforeWidth = 72;
var ActWidth = 72;
var ActHeight = 60;
var ActTitleFontSize = 12;
var ActMode = "Text";

var REPRESENTATION_COLOR = ["315-#FF0000:10%-#fff:80%",
                            "315-#00FF00:10%-#fff:80%",
                            "315-#0000FF:10%-#fff:80%"];

// 객체 Text 줄바꿈 byte 간격
var ActTitleByte = '10';
var ShTitleByte = '10';

//Activity 이미지 사이즈
var ActImageWidth = 59;
var ActImageHeight = 48;


// Line
var bgLineThick = 1;
var bgLineColor_Normal = "#3b48dd";	// Blue
// Setting =========================================

// Variable
var r;
var d;

var groups = [];
var connections = [];

var deletedGroups = [];
var deletedObjects = [];

var selectedSHIndex = -1;

var selectedAct1 = null;
var selectedAct2 = null;

var selectedObject = null;
var currTextObject = null;

var loadValue = null;
var isSaved = false;
var isModifyMode = true;

var saveURL = "saveData6.jsp";
var loadURL = "getData6.jsp";

var activityImageURL_SL = "http://am.pssd.or.kr:9095/AMT_SYSTEM/web/file/thumbFile/sbpSmall_75/";
var activityImageURL_SM = "http://am.pssd.or.kr:9095/AMT_SYSTEM/web/file/thumbFile/sbpSmall_90/";
var activityImageURL_S = "http://am.pssd.or.kr:9095/AMT_SYSTEM/web/file/thumbFile/sbpSmall/";
var activityImageURL_M = "http://am.pssd.or.kr:9095/AMT_SYSTEM/web/file/thumbFile/sbpMedium/";
var activityImageURL_B = "http://am.pssd.or.kr:9095/AMT_SYSTEM/web/file/thumbFile/sbpLarge/";
var activityImageURL = activityImageURL_S;

$(function() {
	r = Raphael(document.getElementById("rPanel"), canvasMinWidth, canvasMinHeight)//.draggable.enable();
	
	// 특정 값을 저장하기 위한 Custom Attributes
	r.customAttributes.data = function(value){
		var data = value;
		return {"data" : data};
	}

	r.customAttributes.key = function(value){			// 객체의 ID (stakeholer, activity의 ID값
		var key = value;
		return {"key" : key};
	}
	
	r.customAttributes.colorIndex = function(value){	// 객체의 컬러인덱스 
		var colorIndex = value;
		return {"colorIndex" : colorIndex};
	}

	r.customAttributes.activityImage = function(value){
		var activityImage = value;
		return {"activityImage" : activityImage};
	}

	r.customAttributes.rootId = function(value){
		var rootId = value;
		return {"rootId" : rootId};
	}

	r.customAttributes.upperId = function(value){
		var upperId = value;
		return {"upperId" : upperId};
	}

	r.customAttributes.level = function(value){
		var level = value;
		return {"level" : level};
	}

	// Delete 키 이벤트
	$("html").keyup(function(event) {
		if(event.target != "[object HTMLInputElement]" && event.keyCode == 46 && selectedObject != null){
			deleteSelectedItem();
		}
	});
	

	// 수정모드 일 경우, 기존 데이터 호출하기 위한 로직
	if(loadSeq != ""){
		loadValue = null;

		$.getJSON(loadURL + '?seq=' + loadSeq, function(data) {
			//alert(data);
			loadValue = data;

			load();	// 불러온 데이터를 이용하여 화면에 출력
		});
	}
});

Raphael.fn.connection = function (obj1, obj2, line, bg) {
	if (obj1.line && obj1.from && obj1.to) {
		line = obj1;
		obj1 = line.from;
		obj2 = line.to;
	}
	var bb1 = obj1.getBBox(),
		bb2 = obj2.getBBox(),
		p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
		{x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
		{x: bb1.x - 1, y: bb1.y + bb1.height / 2},
		{x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
		{x: bb2.x + bb2.width / 2, y: bb2.y - 1},
		{x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
		{x: bb2.x - 1, y: bb2.y + bb2.height / 2},
		{x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
		d = {}, dis = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 4; j < 8; j++) {
			var dx = Math.abs(p[i].x - p[j].x),
				dy = Math.abs(p[i].y - p[j].y);
			if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
				dis.push(dx + dy);
				d[dis[dis.length - 1]] = [i, j];
			}
		}
	}
	if (dis.length == 0) {
		var res = [0, 4];
	} else {
		res = d[Math.min.apply(Math, dis)];
	}
	var x1 = p[res[0]].x,
		y1 = p[res[0]].y,
		x4 = p[res[1]].x,
		y4 = p[res[1]].y;
	var conerLength = 5;	// default 10
	dx = Math.max(Math.abs(x1 - x4) / 2, conerLength);
	dy = Math.max(Math.abs(y1 - y4) / 2, conerLength);
	var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
		y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
		x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
		y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
	// 값 중간의 C 를 사용하면 베지어 곡선이 됨
	var path = ["M", x1.toFixed(3), y1.toFixed(3), /*"C", */x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)];
	
	// ==================== 화살표 추가 부분 시작
	var arrowTail = 4;
	if(x4 - x3 > 0){
		// 우측
		path.push("M", x4-arrowTail, y4-arrowTail, x4, y4, x4-arrowTail, y4+arrowTail);
		
	} else if(x4 - x3 == 0){
		// 상 하
		if(y4 - y3 > 0){
			// 상
			path.push("M", x4-arrowTail, y4-arrowTail, x4, y4, x4+arrowTail, y4-arrowTail);
		} else {
			// 하
			path.push("M", x4-arrowTail, y4+arrowTail, x4, y4, x4+arrowTail, y4+arrowTail);
		}
	} else {
		// 좌측
		path.push("M", x4+arrowTail, y4+arrowTail, x4, y4, x4+arrowTail, y4-arrowTail);
	}
	// ==================== 화살표 추가 부분 끝
	path = path.join(",");
	
	if (line && line.line) {
		line.bg && line.bg.attr({path: path});
		line.line.attr({path: path});

		if(selectedObject && selectedObject.type == 3 && line == selectedObject.obj){
			//selectedObject.bg && selectedObject.bg.attr({stroke: "#ff0000", fill: "none", "stroke-width": bg.split("|")[1] || 3});
		}
	} else {
		var color = typeof line == "string" ? line : bgLineColor_Normal;
		var value = {
				bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || bgLineThick}),
				line: this.path(path).attr({stroke: color, fill: "none"}),
				from: obj1,
				to: obj2
			};
		return value;
	}
};

function isElement(el){
	for(var i=0 ; i<elementTypes.length ; i++){
		if(elementTypes[i] == el){
			return true;
		}
	}
	return false;
}

function onDragSH() {
	this.ox = rPadding;
	this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
	this.attr({
		fill : "#0000ff",
		"fill-opacity": 0.2,
		width : getObjectWithTitle(groups[0], "groupHolder").attr("width"),
		height : getObjectWithTitle(groups[0], "groupHolder").attr("height")
	});
}

function draggerSH(dx, dy) {
	var att = this.type == "rect" ? {x: this.ox/* + dx*/, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
	this.attr(att);
	
	/*(for (var i = connections.length; i--;) {
		r.connection(connections[i]);
	}*/
	r.safari();
}

function onSHMoveEnd() {
	isSaved = false;
	//console.trace();
	var pSet = groups[getSHWithDummy(this)];	// 더미의 부모 셋을 찾는다.
	
	forceMove(pSet, pSet[0].attr("x") - rPadding, pSet[0].attr("y") - this.attr("y"), true, false);

	this.attr({
		x : groups[getSHWithDummy(this)][0].attr("x"),
		y : groups[getSHWithDummy(this)][0].attr("y"),
		width : 20,
		height : 20
	});
	
	groups.sort(sortGroup);

	$(groups).each(function(i){
		var moveX = this[0].attr("x") - rPadding;
		var moveY = this[0].attr("y") - (rPadding + (i * SHHeight));
		
		forceMove(this, moveX, moveY, true, true);
	});
	setTimeout(redrawLine, 150);

}

function sortGroup(a, b){
	return a[0].attr("y") - b[0].attr("y");
}

function onDragAct() {
	this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
	this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
	this.attr({
		width : ActWidth,
		height : ActHeight
	});
}

function draggerAct(dx, dy) {
	var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
	this.attr(att);
	
	r.safari();
}


//Activity 이동 시 액션
function onActMoveEnd() {
	this.hide();
	
	var yIndex = Math.floor((this.attr("y") - 10) / SHHeight);

	//alert(yIndex);

	if(yIndex < 0 || yIndex >= groups.length){
		alert("invalid point");
		redrawItems();				// Acitivity 위치 맞추기
		return;
	}
	
	var activity = null;
	var originYIndex = 0;
	
	//StakeHolder 또는 Function 위치의 갯수만틈 루프
	for(var i=0 ; i<groups.length ; i++){
		//해당 그룹의 Activity 갯수만큼 루프
		for(var j=0 ; j<groups[i][2].length ; j++){
			//현재 이동하려고 한 Activity를 가져온다
			if(hasObject(groups[i][2][j], this)){
				activity = groups[i][2][j];
				originYIndex = i;
				break;
			}
		}
	}
	
	//지금 현제 Function index 를 찾아 originYIndex 와 같으면 이동을 하지 않는다.
	var functionIndex = -1;
	$(groups).each(function(i){
		if(getObjectWithTitle(this, "text").attr("text") == "Function"){
			functionIndex = i;
		}
	});

	//endIndex 가 function index 일때
	if(functionIndex == originYIndex) {
		yIndex = originYIndex;
	}
	if(yIndex == functionIndex && originYIndex != functionIndex) {
		yIndex = originYIndex;
	}
	
	//Activity를 드래그한 현재 위치로 이동시킨다.
	forceMove(activity, activity[0].attr("x") - this.attr("x"), activity[0].attr("y") - this.attr("y"), true, false);

	var movedAct = moveItem(this, yIndex);			// 위치에 맞는 stakeholder로 이동
	var maxIndex = 0;

	sortItem(groups[yIndex][2]);	// 해당 아이템 index 정렬
	maxIndex = redrawItems();		// Acitivity 위치 맞추기
	
	resizeCanvas2(maxIndex);

	isSaved = false;

	// 다른 stakeholder 로 위치가 바뀌었음. Activity 수정을 유도한다.
	if(originYIndex != yIndex){
		if(confirm("Activity의 위치가 다른 Stakeholder로 변경되었습니다.\nActivity를 수정하시겠습니까?")){
			currTextObject = movedAct;
			openAMTPanel(getObjectWithTitle(movedAct, "Activity").attr("key"), '', true, yIndex);
			selectedObject = movedAct;
		}	
	}
	
	for(var i=0 ; i<groups.length ; i++){
		for(var j=0 ; j<groups[i][2].length ; j++){
			if(hasObject(groups[i][2][j], this)){
				groups[i][2][j].toFront();
				break;
			}
		}
	}
}

function moveItem(obj, newIndex){
	// 이동된 Activity를 찾아서 다른 row 이면 데이터를 이동시킴
	for (var i = 0; i < groups.length; i++) {
		for (var j = 0; j < groups[i][2].length; j++) {
			var currItem = groups[i][2][j];
			
			// 드래그한 아이템을 찾아서 새 위치의 객체로 옮긴다.
			if(getObjectWithTitle(currItem, "Dummy") == obj){
				if(i != newIndex){
					// 새 row 에 Activity를 추가하고 기존 Activity는 삭제
					groups[newIndex][2].push(currItem);
					deleteItem(groups[i][2], j);
					
					return groups[newIndex][2][groups[newIndex][2].length-1];
				}
			}
		}
	}
	return null;
}

// obj : set
// index : delete index
function deleteItem(obj, index){
	//var currObj = null;
	var newObj = [];

	// copy
	$(obj).each(function(i){
		if(i == index){
			//currObj = obj[i];
			return;
		}
		newObj.push(obj[i]);
	});
	
	// delete all
	var loopCount = obj.length;
	for(var i=0 ; i<loopCount ; i++){
		obj.pop();
	}
	
	$(newObj).each(function(i){
		obj.push(newObj[i]);
	});
}

// false인 경우 해당 위치로 이동시킴.
function forceMove(set, xValue, yValue, isOver, useAnimate){
	var mainX = 0;
	var mainY = 0;
	
	if(set.length > 0){
		mainX = set[0].attr("x");
		mainY = set[0].attr("y");
	}

	for(var i=0 ; i<set.length ; i++){
		if( isElement("" + set[i].type) ){
			if(isOver){
				if(useAnimate){
					set[i].animate({x:set[i].attr("x")-xValue, y:set[i].attr("y")-yValue}, 100);
				} else {
					set[i].attr({x:set[i].attr("x")-xValue, y:set[i].attr("y")-yValue});
				}
			} else {
				if(set.length > 0){
					var offsetX = mainX - set[i].attr("x");
					var offsetY = mainY - set[i].attr("y");
					if(useAnimate){
						set[i].animate({x:xValue-offsetX, y:yValue-offsetY}, 100);
					} else {
						set[i].attr({x:xValue-offsetX, y:yValue-offsetY});
					}
				} else {
					if(useAnimate){
						set[i].animate({x:xValue, y:yValue}, 100);
					} else {
						set[i].attr({x:xValue, y:yValue});
					}
				}
			}
		} else {
			var subX = xValue;
			var subY = yValue;

			// 메인 셋의 엘리먼트와 유닛 정보를 가지고있는 Set 인 경우 박스가 더 크기 때문에 이동 위치를 보정한다.
			if(set[i][0] != undefined && set[i][0].type == 'rect'){
				var firstChildTitle = set[i][0].attr("title");
				if(firstChildTitle == "Element" || firstChildTitle == "Unit"){
					subX -= 3;
					subY -= 3;
				}
			}
			forceMove(set[i], subX, subY, isOver, useAnimate);
		}
	}
}

function sortItem(items){
	if(items.length < 2){
		return;
	}
	
	var arr = [];
	// copy
	$(items).each(function(){
		arr.push(this);
	});
	
	// delete
	var loopCount = items.length;

	for(var i=0 ; i<loopCount ; i++){
		items.pop();
	}
	
	// 작은 순서대로 찾아서 추가
	var minObj = null;
	var minX = 0;
	
	do{
		var end = arr.length;
		var minIndex = 0;
		
		if(minObj == null){
			minObj = arr[0];
			minX = arr[0][0].attr("x");
		}
		
		for(var i=0 ; i<end ; i++){
			var x = arr[i][0].attr("x");

			if (x <= minX) {
				minX = x;
				minIndex = i;
			}
		}
		items.push(arr[minIndex]);
		arr.splice(minIndex, 1);
		
		minObj = null;

	}while(arr.length > 0);
}

function hasObject(set, obj){
	for (var i = 0; i < set.length; i++) {
		if (isElement("" + set[i].type)) {
			if(set[i] == obj){
				return true;
			}
		}
		else {
			return hasObject(set[i], obj);
		}
	}
	
	return false;
}

function newStakeholder2(groupInfo){
	$("#newTitle").val("");
	document.getElementById("StackHolderFrame").style.height = "0px";
	$("#stackholderEditLayer2").dialog({
		modal:true,
		width:450,
		height:100,
		draggable:false,
		resizable:false,
		open:function(event, ui){
			closeAllDialogs(event.target.id);
		}
	});
	$("#stakeholderMode").val("new");
		
}

function newFunction(groupInfo){
	var checkFunction = false;
	$(groups).each(function(i){
		if(getObjectWithTitle(this, "text").attr("text") == "Function"){
			alert("이미 만들어진 Function이 있습니다.");
			checkFunction = true;
		}
	});
	
	if(checkFunction){
		return;
	}

	var title = "Function";
	var colorIndex = -1;

	if (groupInfo && typeof(groupInfo[0]) == "string"){
		title = groupInfo[0];
		colorIndex = groupInfo[1];
	}

	var y = 10 + (groups.length * SHHeight);
	var set = r.set();//.draggable.enable();
	var groupHolder = r.rect(rPadding, y, SHWidth, SHHeight, 0).attr({title : "groupHolder", "colorIndex" : colorIndex});
	var groupTitleBox = r.rect(rPadding, y, SHTitleBoxWidth, SHHeight, 0).attr({title : "groupTitleBox"});
	{
		var colorValue = null;
		if(colorIndex == -1){
			groupTitleBox.attr({fill: "#ffffff", "fill-opacity": 0.5});
		} else if(colorIndex > -1){
			colorValue = $(".colorPallet:eq(" + colorIndex + ")").css("background-color");
			groupTitleBox.attr({fill: colorValue, "fill-opacity": 0.5});
		}
	}

	title = title.replace(/\n/g, " ");
	title = getFitText2(title, 0);

	var text = r.text(rPadding + 50, y + (SHHeight / 2), title).attr({'font-size':SHTitleFontSize, title:"text"});
	var d = r.rect(rPadding, y, 20, 20, 0).drag(draggerSH, onDragSH, onSHMoveEnd).hide().attr({
		title : "Dummy",
		stroke : "#0000ff",
		"stroke-opacity" : 0.0,
		fill : "#0000ff",
		"fill-opacity": 0.2
	})

	
	set.push(groupHolder, groupTitleBox, r.set(), text, d);
	groups.push(set);
	groupHolder.toBack();

	selectFunction = function(){
		// 그룹 선택 해제 처리
		if(selectedObject != null && selectedObject.obj == set){
			set[0].attr({fill: "none"});
			selectedObject = null;
			
			d.hide();
			
			return;
		}

		// 선택되어있는 Activity 들을 선택 해제한다.
		try{
			resetObjectColor(selectedAct1);
			getObjectWithTitle(selectedAct1, "Dummy").hide();
			selectedAct1 = null;
		} catch(e){}

		try{
			resetObjectColor(selectedAct2);
			getObjectWithTitle(selectedAct2, "Dummy").hide();
			selectedAct2 = null;
		} catch(e){}

		$("#lineDeleteLayer").hide();

		if( !isModifyMode ) {
			console.log("It's not modify mode. finish function.");
			return;
		}

		// Show dummy
		d.show();
		d.attr({
			x : groupHolder.attr("x"),
			y : groupHolder.attr("y"),
			width : 20,
			height : 20
		});
		
		$(groups).each(function(i){
			if(hasObject(this, groupHolder)){
				selectedSHIndex = i;
				setSelectedObject(1, set);
			}
		});
	}
	
	findFunction = function() {
		findFunctionActivity();
	}


	groupTitleBox.click(selectFunction);
	text.click(selectFunction);

	
	groupTitleBox.dblclick(findFunction);
	text.dblclick(findFunction);

	resizeCanvas();
		
}

function selectStakeholder(tempGroupInfo){
	$("#stackholderEditLayer2").dialog("close");
	$('#sSearchName').val("");
	document.getElementById("StackHolderFrame").style.height = "0px";
	document.getElementById("StackHolderFrame").src = "about:blank";

	var oldActorValue;
	
	if($("#stakeholderMode").val()=="modify"){
		oldActorValue = tempGroupInfo[0];

		tempGroupInfo[0] = replaceAll(tempGroupInfo[0], " ", "\n");
		currTextObject[getTextIndex(currTextObject)].attr({"text":tempGroupInfo[0]});
		
		updateActiveActor(oldActorValue);
	}
	else{
		parent.newStakeholder(tempGroupInfo);
	}
}


function updateActiveActor(actorValue)
{
	if(!confirm(actorValue+" Lane의 모든 Activity - active actor 값을 "+actorValue+"로 변경 하시겠습니까?")){
		return;
	}
	var activitiesNameArrayData = "";
	var data = {};
	
	//arrayData를 만든다.
	$(groups[getGroupLocation(currTextObject)][2]).each(function(j){
		if(j>0){
			activitiesNameArrayData += "|";
		}
		activitiesNameArrayData += getObjectWithTitle(this, "Activity").attr("key");

	});
	
	//보낼 데이타가 없으면 여기서 끝낸다.
	if(isEmpty(activitiesNameArrayData)){
		return;
	}

	//data 셋팅 user_seq 값은 ajax.jsp 에서 처리 한다.
	data.activitiesNameArray = activitiesNameArrayData;
	data.actor_value = actorValue;
	data.operType = "SS06";
	data.sysType = "SBP";
	
	$.ajax({
		type: "POST",
		url: "/ajax.jsp?_url="+activityAllUpdateURL + getUnitedParams() + "&user_pwd=" + sUserPass,
		data: data,
		success: function(json){
			json = jQuery.parseJSON(json);

			if(json.repl_cd == "00"){
				alert(json.repl_msg);
			}
		},
		error : function() {
			alert("에러가 발생하였습니다. 잠시 후 다시 시도해주세요");
		}
	});
	
}

//해당 글자의 byte 리턴
function chr_byte(chr){
	if(escape(chr).length > 4)      return 2;
	else                            return 1;
}

//글자 단위(byte단위)로 maxNum 수 마다 줄바꿈 처리
function shTextBr(title, maxNum){

	var lineNum = maxNum;
	var maxRoop = parseInt(title.length/lineNum)+1;
	var newTitle = "";
	var byte_count = 0;
	var str_count = 0;
	var total_scount = 0;
	var prev_str = 0;
	var plus_count = 0;
	
	for(var i=0; i<title.length; i++){
		byte_count += chr_byte(title.charAt(i));
		str_count++;
		
		if(byte_count >= maxNum){
			newTitle = newTitle + title.substring(prev_str, (prev_str+str_count))+"\n";
			
			prev_str = prev_str + str_count;
			total_scount += str_count;
			str_count = 0;
			byte_count = 0;	
		}
	}

	if(title.length > total_scount){
		newTitle = newTitle + title.substring(total_scount, title.length);
	}
	

	return newTitle;
}


function newStakeholder(groupInfo){
	var title = "Untitled";
	var colorIndex = -1;

	if (groupInfo && typeof(groupInfo[0]) == "string"){
		title = groupInfo[0];
		colorIndex = groupInfo[1];
	}

	var y = 10 + (groups.length * SHHeight);
	var set = r.set();//.draggable.enable();
	var groupHolder = r.rect(rPadding, y, SHWidth, SHHeight, 0).attr({title : "groupHolder", "colorIndex" : colorIndex});
	var groupTitleBox = r.rect(rPadding, y, SHTitleBoxWidth, SHHeight, 0).attr({title : "groupTitleBox"});
	{
		var colorValue = null;
		if(colorIndex == -1){
			groupTitleBox.attr({fill: "#ffffff", "fill-opacity": 0.5});
		} else if(colorIndex > -1){
			//컬러 인덱스 값이 있으면, panel4.jsp에 있는 클래스 colorPallet div 뭉치에서,
			//해당 index 순서에 맞는 background-color를 추출해옴.
			colorValue = $(".colorPallet:eq(" + colorIndex + ")").css("background-color");
			groupTitleBox.attr({fill: colorValue, "fill-opacity": 0.5});
		}
	}

	var lineNum = 8;
	var maxRoop = parseInt(title.length/lineNum)+1;
	var newTitle = "";

	title = title.replace(/\n/g, " ");
	title = replaceAll(title," ", "\n");

	var text = r.text(rPadding + 50, y + (SHHeight / 2), title).attr({'font-size':SHTitleFontSize, title:"text"});
	var d = r.rect(rPadding, y, 20, 20, 0).drag(draggerSH, onDragSH, onSHMoveEnd).hide().attr({
		title : "Dummy",
		stroke : "#0000ff",
		"stroke-opacity" : 0.0,
		fill : "#0000ff",
		"fill-opacity": 0.2
	})
	
	set.push(groupHolder, groupTitleBox, r.set(), text, d);
	groups.push(set);
	groupHolder.toBack();

	//stakeholder 및 Function 에 따른 액션 구성.
	selectSH = function(){
		// 그룹 선택 해제 처리
		if(selectedObject != null && selectedObject.obj == set){
			set[0].attr({fill: "none"});
			selectedObject = null;
			
			d.hide();
			
			return;
		}

		// 선택되어있는 Activity 들을 선택 해제한다.
		try{
			resetObjectColor(selectedAct1);
			getObjectWithTitle(selectedAct1, "Dummy").hide();
			selectedAct1 = null;
		} catch(e){}

		try{
			resetObjectColor(selectedAct2);
			getObjectWithTitle(selectedAct2, "Dummy").hide();
			selectedAct2 = null;
		} catch(e){}

		$("#lineDeleteLayer").hide();
		
		if( !isModifyMode ) {
			console.log("It's not modify mode. finish function.");
			return;
		}

		// Show dummy
		d.show();
		d.attr({
			x : groupHolder.attr("x"),
			y : groupHolder.attr("y"),
			width : 20,
			height : 20
		});
		
		$(groups).each(function(i){
			if(hasObject(this, groupHolder)){
				selectedSHIndex = i;
				setSelectedObject(1, set);
			}
		});
	}
	
	modifySHTitle = function(){
		openEditPanel(set);
	}

	
	//function 을 불러 왔을 때
	selectFunction = function(){
		
		// 그룹 선택 해제 처리
		if(selectedObject != null && selectedObject.obj == set){
			set[0].attr({fill: "none"});
			selectedObject = null;
			
			d.hide();
			
			return;
		}

		// 선택되어있는 Activity 들을 선택 해제한다.
		try{
			resetObjectColor(selectedAct1);
			getObjectWithTitle(selectedAct1, "Dummy").hide();
			selectedAct1 = null;
		} catch(e){}

		try{
			resetObjectColor(selectedAct2);
			getObjectWithTitle(selectedAct2, "Dummy").hide();
			selectedAct2 = null;
		} catch(e){}

		$("#lineDeleteLayer").hide();

		if( !isModifyMode ) {
			console.log("It's not modify mode. finish function.");
			return;
		}

		// Show dummy
		d.show();
		d.attr({
			x : groupHolder.attr("x"),
			y : groupHolder.attr("y"),
			width : 20,
			height : 20
		});
		
		$(groups).each(function(i){
			if(hasObject(this, groupHolder)){
				selectedSHIndex = i;
				setSelectedObject(1, set);
			}
		});
	}
	
	findFunction = function() {
		findFunctionActivity();
	}

	if(title == "Function"){
		groupTitleBox.click(selectFunction);
		text.click(selectFunction);

		groupTitleBox.dblclick(findFunction);
		text.dblclick(findFunction);
	}
	else{
		groupTitleBox.click(selectSH);
		text.click(selectSH);
		
		groupTitleBox.dblclick(modifySHTitle);
		text.dblclick(modifySHTitle);
	}

	resizeCanvas();

}

function drawNewActivity(index, title, activityId, colorIndex, activityImage, rootId, upperId, level, dataJSON){
	var nowSHIndex = 0;

	//Activity를 생성하려고 하는데 그룹이 없다는 건 말이 안되므로 리턴.
	if (groups.length == 0){
		return;
	}
	
	if (selectedSHIndex == -1){
		selectedSHIndex = 0;
	}

	nowSHIndex = selectedSHIndex;

	if (activityId == undefined){
		activityId = "-1";
	}
	
	if(typeof(colorIndex) != "string"){
		colorIndex = -1;
	}
	
	var itemArray = groups[selectedSHIndex][2];
	var set = r.set()//.draggable.enable();
	var x = 120;
	var y = 0;
	var checkFunction = false;

	$(groups).each(function(i){
		if(i == selectedSHIndex && getObjectWithTitle(this, "text").attr("text") == "Function"){
			checkFunction = true;
		}
	});
	
	if(typeof(index) == "number"){
		x += ((ActWidth + 15) * index);
	} else if(itemArray.length > 0){
		x = ((ActWidth + 15) + itemArray[itemArray.length-1][0].attr("x"));
	}
	y = rPadding + 10 + (selectedSHIndex * SHHeight);
	
	if(title == undefined){
		if(jQuery.trim($("#itemTitle").val()) != ""){
			title = jQuery.trim($("#itemTitle").val());
			$("#itemTitle").val("");
		} else {
			title = "Activity";
		}
	}

	var itemBox = r.rect(x, y, ActWidth, ActHeight, 3);
	itemBox.node.id = "Activity";
	
	if(colorIndex == -1){
		itemBox.attr({fill: "#ffffff", "fill-opacity": 0.5});
	} else if(colorIndex > -1){
		var colorValue = $(".colorPallet:eq(" + colorIndex + ")").css("background-color");
		itemBox.attr({stroke: colorValue, "stroke-opacity": 1, fill: colorValue, "fill-opacity": 0.5});
	}
	itemBox.attr({title:"Activity", "key":activityId, "colorIndex":colorIndex, "activityImage":activityImage, "rootId":rootId, "upperId":upperId, "level":level, "data":dataJSON});

	var thumImage;
	var text;
	title = title.replace(/\n/g, " ");			// AMT에서 강제로 \n 을 넣어서 \\n 로 표시되어 넘어오는 경우가 있어 스페이스바로 대체한다.
	title = replaceAll(title, " ", "\n");

	text = r.text(x + (ActWidth / 2), rPadding + 10 + (selectedSHIndex * SHHeight) + (ActHeight / 2), title);
	text.attr({'font-size':ActTitleFontSize, title:"text"});

	var modeNum = 0;

	if(ActWidth == 53){
		modeNum = 1;	
	}
	else if(ActWidth == 66){
		modeNum = 2;
	}
	else if(ActWidth == 72){
		modeNum = 3;
	}
	else if(ActWidth == 146){
		modeNum = 4;
	}
	else if(ActWidth == 220){
		modeNum = 5;
	}

	var ActImageWidth2 = 0;
	var ActImageHeight2 = 0;
	var ActGrp;
	var ActGrp2;
	var ActGrp3;

	if(activityImage != ""){
		if(activityImage.indexOf("-") != -1){
			ActGrp1 = activityImage.split("-");
			//alert(ActGrp1[1]);

			if(ActGrp1[1].indexOf(",") != -1){
				ActGrp2 = activityImage.split(",");

				if(modeNum == 1){
					ActGrp3 = ActGrp2[4].split("x");
					ActImageWidth2 = parseInt(ActGrp3[0]);
					ActImageHeight2 = parseInt(ActGrp3[1]);
				}
				else if(modeNum == 2){
					ActGrp3 = ActGrp2[5].split("x");
					ActImageWidth2 = parseInt(ActGrp3[0]);
					ActImageHeight2 = parseInt(ActGrp3[1]);
				}
				else if(modeNum == 3){
					ActGrp3 = ActGrp2[3].split("x");
					ActImageWidth2 = parseInt(ActGrp3[0]);
					ActImageHeight2 = parseInt(ActGrp3[1]);
				}
				else if(modeNum == 4){
					ActGrp3 = ActGrp2[2].split("x");
					ActImageWidth2 = parseInt(ActGrp3[0]);
					ActImageHeight2 = parseInt(ActGrp3[1]);
				}
				else if(modeNum == 5){
					ActGrp3 = ActGrp2[1].split("x");
					ActImageWidth2 = parseInt(ActGrp3[0]);
					ActImageHeight2 = parseInt(ActGrp3[1]);
				}
			}
			else{
				ActImageWidth2 = ActImageWidth;
				ActImageHeight2 = ActImageHeight;
			}

			//activityImage = ActGrp1[0]+ActGrp1[2];
		}
		else{
			ActImageWidth2 = ActImageWidth;
			ActImageHeight2 = ActImageHeight;
		}
	}
	

	if(activityImage == ""){
		thumImage = r.image("/images/etc/blank.png", 10, 10, 0, 0);
		thumImage.hide();
	}
	else{
		thumImage = r.image(activityImageURL+activityImage, (x + (ActWidth / 2))-(ActImageWidth2/2), (rPadding + 10 + (selectedSHIndex * SHHeight) + (ActHeight / 2))-(ActImageHeight2/2), ActImageWidth2, ActImageHeight2);
		thumImage.hide();
	}
	
	if(ActMode == "Text"){
		text.show();
		thumImage.hide();
	}
	else{
		if(activityImage == ""){
			text.show();
			thumImage.hide();
		}
		else{
			text.hide();
			thumImage.show();
		}
	}

	var d = r.rect(x, y, ActWidth, ActHeight, 3).attr({title:"Dummy"}).drag(draggerAct, onDragAct, onActMoveEnd).hide();

	// Element 정보
	var elementSet = r.set();
	elementSet.push( r.rect(x-3, y-3, ActWidth + 6, ActHeight + 6, 3).attr({title:"Element"}) );
	var elementTitle = r.text(x + (ActWidth / 2), rPadding + 10 + (selectedSHIndex * SHHeight) + (ActHeight / 2), "Element Title");
	elementTitle.attr({'font-size':ActTitleFontSize});
	elementSet.push(elementTitle);
	elementSet.hide();

	// Unit 정보
	var unitSet = r.set();
	unitSet.push( r.rect(x-3, y-3, ActWidth + 6, ActHeight + 6, 3).attr({title:"Unit"}) );
	var unitTitle = r.text(x + (ActWidth / 2), rPadding + 10 + (selectedSHIndex * SHHeight) + (ActHeight / 2), "Unit Title");
	unitTitle.attr({'font-size':ActTitleFontSize});
	unitSet.push(unitTitle);
	unitSet.hide();

	set.push(
		itemBox,
		text,
		thumImage,
		d,
		elementSet,
		unitSet
	);

	itemArray.push(set);
	
	selectAct = function(obj){
		selectSet(itemBox, d, set, obj);
	}
	
	modifyAct = function(event){
		if(checkFunction){
			alert("Function의 속성은 FBD에서 수정 후 다시 작업하세요.");
			return;
		}

		setSelectedObject(2, set);
		currTextObject = set;
		openAMTPanel(getObjectWithTitle(set, "Activity").attr("key"), '', true);
	}
	
	itemBox.click(selectAct);
	itemBox.dblclick(modifyAct);

	itemBox.mousedown(function(e) {
		if(e.which == 3){
			selectSet(itemBox, d, set);

			$("#actvityMoveLayer").dialog({
				modal:true,
				width:320,
				height:120,
				draggable:false,
				resizable:false,
				open:function(event, ui){
					closeAllDialogs(event.target.id);
				}
			});
		}
	});
	
	if(ActMode == "Text"){
		text.click(selectAct);
		text.dblclick(modifyAct);

		text.mousedown(function(e) {
			if(e.which == 3){
				selectSet(itemBox, d, set);

				$("#actvityMoveLayer").dialog({
					modal:true,
					width:320,
					height:120,
					draggable:true,
					resizable:false,
					open:function(event, ui){
						closeAllDialogs(event.target.id);
					}
				});
			}
		});
	}
	else{
		thumImage.click(selectAct);
		thumImage.dblclick(modifyAct);
		thumImage.mousedown(function(e) {
			if(e.which == 3){
				selectSet(itemBox, d, set);
				$("#actvityMoveLayer").dialog({
					modal:true,
					width:320,
					height:120,
					draggable:true,
					resizable:false,
					open:function(event, ui){
						closeAllDialogs(event.target.id);
					}
				});
			}
		});
	}
	
	resizeCanvas();
}

// 주어진 Acitivity의 절대 위치값을 반환한다.
function getActivityIndex(itemBox){
	
	var xIndex = Math.floor((itemBox.attr("x") - 120) / (ActWidth + 15)) ;
	var yIndex = Math.floor((itemBox.attr("y") - 10) / SHHeight);

	return {x:xIndex, y:yIndex};
}

function isFunction(activity){
	var activityYIndex = getActivityIndex(activity).y;
	var result = false;
	$(groups).each(function(i){
		if(getObjectWithTitle(this, "text").attr("text") == "Function"){
			//alert(i + ", " + activityYIndex);
			if(i == activityYIndex){
				result = true;
				return;
			}
		}
	});

	return result;
}

function callParentForHvm(itemBox, d, set, event) {
	try {
		console.log('$$$$$$$$$$$$$$$$$$POST MESSAGE TO PARENT$$$$$$$$$$$$$$$$$$$$$$$');
		var message = itemBox.attrs['data'].seq + '||' + itemBox.attrs['data'].activity_seq + "||" + itemBox.attrs['data'].activity_title
		console.log('item : ', message)
		console.log('$$$$$$$$$$$$$$$$$$POST MESSAGE TO PARENT$$$$$$$$$$$$$$$$$$$$$$$');
		//parent.postMessage(message,"http://localhost:3000/parent");
		parent.postMessage(message,"http://localhost:8080/HVM/hvm2/index.html");
	} catch(err) {
		console.log('ERROR!!');
		//console.log(err);
	}
}
//Select 처리 메소드
function selectSet(itemBox, d, set, event){
	
	
	
	
	
	//hvm 관련 추가 내용 
	callParentForHvm(itemBox, d, set, event);
	//hvm 관련 추가 내용 
	
	
	
	
	
	
	
	
	// Element 모드 처리
	if (representMode != "MODIFY") {

		selectSetForElement(itemBox, set, event);
		return;

	} else if( !isModifyMode ) {
		console.log("It's not modify mode. finish function.");
		return;
	}

	d.toFront();
	d.show();
	d.attr({
		x : itemBox.attr("x"),
		y : itemBox.attr("y"),
		width : 20,
		height : 20,
		stroke : "#0000ff",
		"stroke-opacity" : 0,
		fill : "#0000ff",
		"fill-opacity": 0.2,
		title : "Dummy"
	});

	var xIndex = Math.floor((itemBox.attr("x") - 120) / (ActWidth + 15)) ;
	var yIndex = Math.floor((itemBox.attr("y") - 10) / SHHeight);
	
	$("#moveIndex").val(xIndex);
	$("#selMoveSHIndex").val(yIndex);
	//2012.06.11 재구 추가. 선택된 Activity 뒤에 새로 생성하는 Activity가 존재토록 하기위해 Activity 선택시에도 선택한 StakeholderIndex값이 변경되도록 처리
	selectedSHIndex = yIndex;	

	// 선택된 Activity 는 무조건 푸른색 배경을 셋팅한다.
	set[0].attr({fill:"#0000ff", "fill-opacity": 0.3, "stroke-width" : 5});

	if(selectedAct1 == null){
		selectedAct1 = set;
	} else if(selectedAct2 == null){
		if(selectedAct1 == set){
			return;
		}

		selectedAct2 = set;
		
		getObjectWithTitle(selectedAct1, "Dummy").hide();
		selectedAct1[0].attr({fill:"#00ff00", "fill-opacity": 0.5});

	} else {
		if(set != selectedAct1 && set != selectedAct2){

			// 기존 선택된 2개의 Activity와 다른 새로운 Activity가 선택된 경우
			getObjectWithTitle(selectedAct1, "Dummy").hide();
			getObjectWithTitle(selectedAct2, "Dummy").hide();
			resetObjectColor(selectedAct1);
			selectedAct1 = selectedAct2;
			selectedAct2 = set;

		} else if(selectedAct1 == set) {
			// 선택된 순서가 바뀐 경우
			getObjectWithTitle(selectedAct2, "Dummy").hide();
			var temp = selectedAct1;
			selectedAct1 = selectedAct2;
			selectedAct2 = temp;
		}

		selectedAct1[0].attr({fill:"#00ff00", "fill-opacity": 0.5});
	}

	// show delete button
	var hasLine = false;
	$("#lineDeleteLayer").hide();

	if(selectedAct1 != null && selectedAct2 != null) {
		// 두 Activity 간 연결된 선이 있는지 조회
		for(var i=connections.length-1 ; i>=0 ; i--){
			if( (connections[i].from == selectedAct1[0] && connections[i].to == selectedAct2[0])
				|| (connections[i].from == selectedAct2[0] && connections[i].to == selectedAct1[0]) ){
				// 아이템과 연결된 선이 있음.
				hasLine = true;
			}
		}

		if(hasLine){
			var minX = Math.min(selectedAct1[0].attr("x"), selectedAct2[0].attr("x"));
			var maxX = Math.max(selectedAct1[0].attr("x"), selectedAct2[0].attr("x"));
			var x = minX + (ActWidth/2) + ((maxX - minX) / 2);

			var minY = Math.min(selectedAct1[0].attr("y"), selectedAct2[0].attr("y"));
			var maxY = Math.max(selectedAct1[0].attr("y"), selectedAct2[0].attr("y"));
			var y = minY + (ActHeight/2) + ((maxY - minY) / 2);

			$("#lineDeleteLayer").css({'left':x + 0, 'top':y + 150}).show();
		}
	}
	
	setSelectedObject(2, set);
}

function deleteLine(){
	// 아이템과 연결된 라인을 찾아서 삭제
	for(var i=connections.length-1 ; i>=0 ; i--){
		if( (connections[i].from == selectedAct1[0] && connections[i].to == selectedAct2[0])
			|| (connections[i].from == selectedAct2[0] && connections[i].to == selectedAct1[0]) ){

			connections[i].bg.remove();
			connections[i].line.remove();
			deleteItem(connections, i);
		}
	}

	$("#lineDeleteLayer").hide();
}

function redrawItems(){
	var maxIndex = 0;

	$(groups).each(function(i){
		var itemList = groups[i][2]; 
		var lastIndex = -1;
		$(itemList).each(function(j){
			var set = itemList[j][0];
			var setX = set.attr("x");
			var index = Math.floor((setX - 120) / (ActWidth + 15)) ;
			var needRound = (setX - 120) % (ActWidth + 15) > ActWidth / 2.0;
			
			index = index + (needRound ? 1 : 0);

			if(index < 0){
				index = 0;
			}
			
			if(lastIndex == index){
				// 이전 Activity가 끼어든 상태, 한칸 오른쪽으로 밀어준다.
				index++;
			}
			
			var newX = 120 + index * (ActWidth + 15);
			var newY = 10 + rPadding + (i * SHHeight);
			
			forceMove(itemList[j], newX, newY, false, true);
			
			lastIndex = index;

			if(maxIndex < index){
				maxIndex = index;
			}
		});
	});

	setTimeout(redrawLine, 200);

	return maxIndex;
}

function newLine(){
	if(selectedAct1 != null && selectedAct2 != null){
		connections.push(r.connection(selectedAct1[0], selectedAct2[0], bgLineColor_Normal, bgLineColor_Normal + "|" + bgLineThick));
	} else {
		alert("not match two element");
	}
}

function redrawLine(){
	for (var i = connections.length; i--;) {
		r.connection(connections[i]);
	}
}

function getGroupLocation(group){
	for(var i=0 ; i<groups.length ; i++){
		if(groups[i] == group){
			return i;
		}
	}
	return -1;
}

function getItemLocation(obj){
	
	for(var i=0 ; i<groups.length ; i++){
		var itemList = groups[i][2];
		
		for(var j=0 ; j<itemList.length ; j++){
			if(itemList[j] == obj){
				return [i, j];
			} else {
				for(var k=0 ; k<itemList[j].length ; k++){
					if(itemList[j][k] == obj)
						return [i, j];
				}
			}
		}
	}
	return null;
}

function findItemWithLocation(groupIndex, positionX){
	var groupMembers = groups[groupIndex][2];

	for(var j=0 ; j<groupMembers.length ; j++){
		var object = groupMembers[j];
		var indexes = getActivityIndex(object[0]);
		if(indexes.x == positionX){
			return groups[groupIndex][2][j];
		}
	}
}

// 선택된 아이템 처리
function setSelectedObject(type, obj){
	// 이전 선택된 아이템의 배경을 없앤다
	if(selectedObject != null){
		switch(selectedObject.type){
			case 1:		// stakeholder
				getObjectWithTitle(selectedObject.obj, "groupHolder").attr({fill:"none"});
				getObjectWithTitle(selectedObject.obj, "Dummy").hide();
				break;
			case 2:{	// activity
				
				break;
			}
			case 3:		// line
				break;
			default:
		}
	}

	if(obj.type == "path"){
		var findValue = obj.attr("path");
		for(var i=0 ; i<connections.length ; i++){
			if ( findValue == connections[i].line.attr("path") ){
				obj = connections[i].line;
				break;
			}				
		}
	} else {
		// 새로 선택된 아이템의 배경을 지정한다.
		if(getKind(obj) == 0){
			obj[0].attr({fill: "#888", "fill-opacity": 0.2});

		}
	}
	selectedObject = {"type" : type, "obj" : obj};
	
	// 모든 Input Field에서 포커스를 제거한다. input 객체에 포커스가 있으면 Delete Key 를 눌렀을 때 반응을 할 수 없음.
	$("input").blur();
}

// return -1 : Error, 0 : Group, 1 : Item
function getKind(mainSetObj){
	if(null == mainSetObj || mainSetObj.type != "set")
		return -1;

	return mainSetObj[2].type == "set" ? 0 : 1;
}

// return -1 : Error, int value : 제목 객체의 Index
function getTextIndex(mainSetObj){
	if(mainSetObj.type != "set")
		return -1;

	return mainSetObj[2].type == "set" ? 3 : 1;
}

function getObjectName(obj){
	var title = ""
	switch (selectedObject.type) {
	case 1:
		title = "(" + obj[3].attr("text") + ")";
		break;
	case 2:
		title = "(" + obj[1].attr("text") + ")";
		break;
	case 3:
		break;
	}

	return title.replace(/\n/g, "");
}

function deleteSelectedItem(info){
	var obj = selectedObject.obj;
	var objType = "";

	var objTitle = getObjectName(obj);
	switch (selectedObject.type) {
	case 1:
		objType = "StakeHolder";

		if(info == undefined){
			// seq를 가진 activity 객체들 조회
			var activities = [];
			var groupIndex = getGroupLocation(obj);
			for(var i=0 ; i<groups[groupIndex][2].length ; i++){
				var obj = groups[groupIndex][2][i][0];
				if(obj.attrs != undefined && obj.attrs.data != undefined){
					activities.push(obj.attrs.data.seq);
				}
			}

			if(activities.length > 0){
				$.getJSON("getMemberInfoOfElementJSON.jsp", {
					seqs : activities
				}, function(data){
					console.log("data", data);

					if(data.count == 0){
						deleteSelectedItem(1);	// 삭제가 가능하도록 무의미한 값을 같이 보낸다.
					} else {
						alert("해당 " + objType + objTitle + "에 Element의 멤버 객체가 포함되어 삭제가 불가능합니다. ");
					}
				});

				return;
			}
		}

		break;
	case 2:
		objType = "Activity";

		// Function 객체이고 seq 값을 가지고있는 저장된 아이템인 경우
		if(info == undefined && obj[0].attrs.data != undefined){
			// seq 값으로 해당 Activity의 Element의 멤버 정보를 확인한다.
			$.getJSON("getMemberInfoOfElementJSON.jsp", {
				seq : obj[0].attrs.data.seq
			}, function(data){
				var param = {};
				param.seq = obj[0].attrs.data.seq;
				param.elementSeq = data.elementSeq;
				param.elementName = data.elementName;

				console.log("Param : ", param);

				if(data.type == "F"){
					// 삭제처리 하지 않고 경고후 중단.
					alert("해당 " + objType + objTitle + "은(는) Element '"+ data.elementName +"'에 포함된 Function 이기 때문에 삭제할 수 없습니다.");
				} else if (data.activityCount <= 1){
					alert("해당 " + objType + objTitle + "은(는) Element '"+ data.elementName +"'에 포함된 유일한 Activity 이기 때문에 삭제할 수 없습니다.");
				} else {
					deleteSelectedItem(param);
				}
			});
			return;
		}
		break;
	case 3:
		objType = "Connection";
		break;
	}
	
	if(!confirm("해당 " + objType + objTitle + "을(를) 삭제하시겠습니까?"))		return;

	switch (selectedObject.type) {
	case 1:	// group
		var groupIndex = getGroupLocation(obj);
		if(groupIndex == -1)
			return;
		
		for(var k=0 ; k<groups[groupIndex][2].length ; k++){
			var activity = groups[groupIndex][2][k];
			
			// 아이템과 연결된 라인을 찾아서 삭제
			for(var i=connections.length-1 ; i>=0 ; i--){
				if(connections[i].from == activity[0] || connections[i].to == activity[0]){
					// 아이템과 연결된 선이 있음.
					connections[i].bg.remove();
					connections[i].line.remove();
					deleteItem(connections, i);
				}
			}
		}

		// 해당 그룹에 포함된 객체들을 모두 확인하여 seq != -1 인 객체를 삭제 배열에 추가한다.
		var items = selectedObject.obj[2];
		for( var i=0 ; i<items.length ; i++){
			try {
				var deletedActSeq = items[i][0].attrs.data.seq;
				if(deletedActSeq != -1){
					// 삭제된 객체를 저장할 데이터에 추가한다.
					deletedObjects.push(deletedActSeq);
				}	
			} catch (e) {
			}
		}
		
		deleteItem(groups, groupIndex);
		obj.remove();

		// SH 삭제 후 이동 처리
		$(groups).each(function(i){
			var moveX = this[0].attr("x") - rPadding;
			var moveY = this[0].attr("y") - (rPadding + (i * SHHeight));
			
			forceMove(this, moveX, moveY, true, true);
		});
		setTimeout(redrawLine, 150);
		
		break;
	case 2:	// item
		var loc = getItemLocation(obj);

		// 아이템과 연결된 라인을 찾아서 삭제
		for(var i=connections.length-1 ; i>=0 ; i--){
			if(connections[i].from == obj[0] || connections[i].to == obj[0]){
				// 아이템과 연결된 선이 있음.
				connections[i].bg.remove();
				connections[i].line.remove();
				deleteItem(connections, i);
			}
		}

		// 삭제할 아이템의 SEQ 값을 확인하여 삭제배열에 추가한다.
		var deletedActSeq = -1;
		try{
			deletedActSeq = selectedObject.obj.items[0].attrs.data.seq
			if(deletedActSeq != -1){
				// 삭제된 객체를 저장할 데이터에 추가한다.
				deletedObjects.push(deletedActSeq);
			}
		} catch(e){
			alert(e);
		}

		//alert(deletedObjects);

		// 엘리먼트 멤버 삭제
		console.log(info);
		$.getJSON("elementProc.jsp", {
			mode : "deleteMember"
			, elementSeq : info.elementSeq
			, memberSeq : info.seq
		}, function(data){
			console.log("elementProc.jsp result : ", data);
		});
		
		// 아이템 삭제
		deleteItem(groups[loc[0]][2], loc[1]);
		obj.remove();
		
		break;
	case 3:	// line
		for(var i=connections.length-1 ; i>=0 ; i--){
			if(connections[i].line.attr("path") == obj.attr("path")){
				connections[i].bg.remove();
				connections[i].line.remove();
				deleteItem(connections, i);
			}
		}
		
		break;
	default:
		return;
		break;
	}

	selectedObject = null;
	if(selectedAct1 != null){
		resetObjectColor(selectedAct1);
		selectedAct1 = null;
	}
	if(selectedAct2 != null){
		resetObjectColor(selectedAct2);
		selectedAct2 = null;
	}

	isSaved = false;
	resizeCanvas();
}

function resizeCanvas() {
	var maxWidth = 0;
	
	for (var i=0 ; i<groups.length ; i++){
		var itemArray = groups[i][2];

		if(itemArray.length == 0){
			continue;
		}

		var lastItem = itemArray[itemArray.length-1];

		maxWidth = Math.max(maxWidth, lastItem[0].attr("x") + (ActWidth*2));
	}

	var holderWidth = Math.max(SHWidth, maxWidth-10);
	for (var i=0 ; i<groups.length ; i++){
		var group = groups[i][0];

		group.attr({"width":holderWidth});
	}

	maxWidth = Math.max(canvasMinWidth, maxWidth);

	var newHeight = 10 + 5 + (groups.length * SHHeight);
	newHeight = Math.max(canvasMinHeight, newHeight);

	r.setSize(maxWidth + 5, newHeight);
}

// index에 해당되는 컬러값을 셋팅한다.
function selectColor(index){
	if(selectedObject == null){
		alert("선택된 객체가 없습니다.");
		return;
	}
	
	var objType = getKind(selectedObject.obj);
	var colorValue = $(".colorPallet:eq(" + index + ")").css("background-color");

	if(objType == 0){
		// group
		getObjectWithTitle(selectedObject.obj, "groupTitleBox").attr({fill: colorValue, "fill-opacity": 0.5});
		getObjectWithTitle(selectedObject.obj, "groupHolder").attr({"colorIndex":index});

	} else if(objType == 1){
		var lineColor = colorValue;
		if(index == 8){
			// Activity는 선의 색상이기때문에 흰색은 선택할 수 없게 한다.(검은색으로 처리)
			lineColor = $(".colorPallet:eq(7)").css("background-color");
		}
		else if(index == 14){
			// Activity는 선의 색상이기때문에 흰색은 선택할 수 없게 한다.(검은색으로 처리)
			lineColor = $(".colorPallet:eq(13)").css("background-color");
		}
			
		// Activity
		selectedObject.obj[0].attr({stroke: lineColor, "stroke-opacity": 1, fill: colorValue, "fill-opacity": 0.5});
		selectedObject.obj[0].attr({"colorIndex":index});
	}
}

// 해당 객체의 정해진 색으로 되돌린다.
function resetObjectColor(object){
	if(getKind(object) == 0){
		
	} else if(getKind(object) == 1){
		var colorIndex = object[0].attr("colorIndex");

		var lineColor = "";
		var colorValue = "";
		
		if(colorIndex == -1){
			lineColor = "rgb(0,0,0)";
			colorValue = "rgb(255,255,255)";
		}
		else{
			lineColor = $(".colorPallet:eq(" + (colorIndex == 8 ? 7 : colorIndex) + ")").css("background-color");
			colorValue = $(".colorPallet:eq(" + colorIndex + ")").css("background-color");

			if(colorIndex == 14){
				lineColor = $(".colorPallet:eq(13)").css("background-color");
			}
		}
		object[0].attr({stroke: lineColor, "stroke-opacity": 1, fill: colorValue, "fill-opacity": 0.5, "stroke-width": 1});
	}
}

// 지정된 색상과 상관없이 기본 컬러로만 보여준다.
function showObjectClearColor(object){
	if(getKind(object) == 1){
		var lineColor = "rgb(0,0,0)";
		var colorValue = "rgb(255,255,255)";
		object[0].attr({
			stroke: lineColor,
			"stroke-opacity": 1,
			fill: colorValue,
			"fill-opacity": 0.5, "stroke-width": 1
		});
	}
}

function getSHWithDummy(dummyObj) {
	for(var i=0 ; i<groups.length ; i++){
		if(getObjectWithTitle(groups[i], "Dummy") == dummyObj){
			return i;
		}
	}
	return -1;
}

// title 이름을 가진 객체를 반환한다. 
function getObjectWithTitle(obj, title){
	for(var i=0 ; i<obj.length ; i++){
		if( isElement( obj[i].type ) && obj[i].attr("title") == title ){
			return obj[i];
		}
	}
	return null;
}

function activityMoveChk(){
	var moveIndex = $("#moveIndex").val();
	var selMoveSHIndex = $("#selMoveSHIndex").val();
	var chkDirection = $("#moveDirection").val();
	var moveType = $(":input:radio[name=moveType]:checked").val();
	
	activityMoveControl(moveType, chkDirection, moveIndex, selMoveSHIndex);

	$("#actvityMoveLayer").dialog("close");
}

//특정 혹은 전체 StakeHolder 대상 Activity 단위 이동 컨트롤
function activityMoveControl(allChk, type, selIndex, selMoveSHIndex){
	var leftChk = false;
	var mChk = false;
	var mIndex = parseInt(selIndex)-1;

	if(mIndex < 0){
		mIndex = 0;
	}

	var indexY = -1;
	var maxIndex = 0;
	var errCnt = 0;
	var chkCnt = 0;
	var errActivity = "";
	var errMsg = "";
	var errStakeholder ="";
	var dummyActivity = "";
	var dummyStakeholder = "";
	var exStakeholder = "";

	//좌측으로 떙기는 경우에는, All일 경우, 한 그룹일 경우를 체크하여 옮길려고 하는 위치의 Activity 좌측에 Activity가 존재하는지 확인한다.

	if(type == "left"){
		$(groups).each(function(i){
			var itemList = groups[i][2];
			
			exStakeholder = getObjectWithTitle(this, "text").attr("text");

			mChk = false;
			
			//현재 그룹이 선택한 Activity의 그룹일 경우나, move Type이 All일 경우만 실행
			if(i==selMoveSHIndex || allChk == "all"){
				$(itemList).each(function(j){
					var set = itemList[j][0];
					var setX = set.attr("x");
					var index = Math.floor((setX - 120) / (ActWidth + 15));
					
					//현재 index 값이 선택한 Activity 좌측이면
					if(index == mIndex){
						//좌측에 Activity가 있는지 체크하는 변수를 True로
						if(errCnt == 0){
							chkCnt = 0;
						}
						chkCnt++;

						//최초 에러난 곳의 Activity 이름을 추출
						if(chkCnt == 1){
							dummyActivity = getObjectWithTitle(this, "text").attr("text");
							dummyActivity = replaceAll(dummyActivity, "\n", "");
							dummyStakeholder = exStakeholder;
							dummyStakeholder = replaceAll(dummyStakeholder, "\n", "");
						}
						mChk = true;
					}
					
					//선택 Activity 라인의 좌측 객체 존재여부가 True이면
					if(mChk){
						if(index == parseInt(selIndex)){
							leftChk = true;
							errCnt++;

							if(errActivity == ""){
								errActivity = dummyActivity;
								errStakeholder = dummyStakeholder;
							}
						}
					}
				});
			}
		});
	}

	if(leftChk){
		//alert("좌측에 Activity가 있어서 이동 불가 errCnt="+(errCnt-1));	
		if(errCnt == 1){
			errMsg = "StakeHolder("+errStakeholder+")의 Activity("+errActivity +")가 \r\n이동하려는 Activity 라인의 좌측에 존재하여 이동 불가";
		}
		else{
			errMsg = "StakeHolder("+errStakeholder+")의 Activity("+errActivity +") 외 "+(errCnt-1)+" 건이 \r\n이동하려는 Activity 라인의 좌측에 존재하여 이동 불가";
		}

		alert(errMsg);
		return;
	}
	else{
		$(groups).each(function(i){
			var itemList = groups[i][2]; 
			var lastIndex = -1;
			indexY++;
			
			if(i==selMoveSHIndex || allChk == "all"){
				$(itemList).each(function(j){
					var set = itemList[j][0];
					var setX = set.attr("x");
					var index = Math.floor((setX - 120) / (ActWidth + 15)) ;

					var needRound = (setX - 120) % (ActWidth + 15) > ActWidth / 2.0;
					
					index = index + (needRound ? 1 : 0);
					
					if(index < 0){
						index = 0;
					}
					else{
						if(type == "left"){
							if(index >= parseInt(selIndex)){
								index--;
							}
						}
						else if(type == "right"){
							if(index >= parseInt(selIndex)){
								index++;
							}
						}
					}

					if(index > maxIndex){
						maxIndex = index;
					}
					
					var newX = 120 + index * (ActWidth + 15);
					var newY = 10 + rPadding + (i * SHHeight);
					
					forceMove(itemList[j], newX, newY, false, true);
					
					lastIndex = index;
				});
				
				sortItem(groups[indexY][2]);	// 해당 아이템 index 정렬
			}
		});
		
		setTimeout(redrawLine, 200);

		resizeCanvas2(maxIndex);
	}
}

function resizeCanvas2(maxIndex) {
	var modeNum = 0;

	if(ActWidth == 53){
		modeNum = 1;	
	}
	else if(ActWidth == 66){
		modeNum = 2;
	}
	else if(ActWidth == 72){
		modeNum = 3;
	}
	else if(ActWidth == 146){
		modeNum = 4;
	}
	else if(ActWidth == 220){
		modeNum = 5;
	}

	var maxWidth = 0;

	for (var i=0 ; i<groups.length ; i++){
		var itemArray = groups[i][2];

		if(itemArray.length == 0){
			continue;
		}

		var lastItem = itemArray[itemArray.length-1];
		
		if(modeNum==1){
			maxWidth = Math.max(maxWidth, ((ActWidth+15)*(maxIndex+2))+(ActWidth/2/2)+35);
		}
		else if(modeNum==2){
			maxWidth = Math.max(maxWidth, ((ActWidth+15)*(maxIndex+2))+(ActWidth/2/2)+20);
		}
		else if(modeNum==3){
			maxWidth = Math.max(maxWidth, ((ActWidth+15)*(maxIndex+2))+(ActWidth/2/2)+10);
		}
		else if(modeNum==4){
			maxWidth = Math.max(maxWidth, ((ActWidth+15)*(maxIndex+2))-(ActWidth/2/2)-10);
		}
		else if(modeNum==5){
			maxWidth = Math.max(maxWidth, ((ActWidth+15)*(maxIndex+2))-(ActWidth/2)-10);
		}
	}

	var holderWidth = Math.max(SHWidth, maxWidth-10);
	for (var i=0 ; i<groups.length ; i++){
		var group = groups[i][0];

		group.attr({"width":holderWidth});
	}

	maxWidth = Math.max(canvasMinWidth, maxWidth);

	var newHeight = 10 + 5 + (groups.length * SHHeight);
	newHeight = Math.max(canvasMinHeight, newHeight);

	r.setSize(maxWidth + 5, newHeight);

	//alert("mode Level = "+modeNum);

	// Meta 정보용 커버
	console.log("Meta Data, ", isMeta);
	if(isMeta){
		console.log("Meta Data");
		if(!isAuthor){
			var cover = $("#rPanelCover");
			if(cover.length > 0){
				$("#rPanelCover").css({"width" : r.width, "height" : r.height});
			}
		}
	}
}

function resignModifyMode(){
	console.log("resignModifyMode()");
	isModifyMode = false;

	$("#menu1").hide();

	// 기존 선택된 Activity 두개의 컬러를 리셋한다.
	if(selectedAct1 != null){
		getObjectWithTitle(selectedAct1, "Dummy").hide();
		resetObjectColor(selectedAct1);
	}
	if(selectedAct2 != null){
		getObjectWithTitle(selectedAct2, "Dummy").hide();
		resetObjectColor(selectedAct2);
	}
	
	// 라인 삭제 레이어 숨김
	$("#lineDeleteLayer").hide();

	// 선택된 스택홀더가 있는 경우 선택을 해제한다.

	if(selectedObject != null){
		// 선택된 객체의 click 이벤트를 찾아 실행한다.(선택 해제를 위함)
		$(selectedObject.obj[1].events).each(
			function(idx, obj){
				if(obj.name == 'click'){
					obj.f();
				}
			}
		);
	}

	// 모든 자식 객체의 컬러를 제거한다.
	for(var y=0 ; y<groups.length ; y++){
		for(var xIndex=0 ; xIndex < groups[y][2].length ; xIndex++){
			var obj = groups[y][2][xIndex];
			showObjectClearColor(obj);

			// Element, Unit 정보를 숨긴다.
			obj[4].hide();
			obj[5].hide();
		}
	}
}

function becameModifyMode(){
	$("#menu1").show();
	console.log("becameModifyMode()");
	representMode = "MODIFY";
	isModifyMode = true;

	// 모든 자식 객체의 보유 컬러를 적용한다.
	for(var y=0 ; y<groups.length ; y++){
		for(var xIndex=0 ; xIndex < groups[y][2].length ; xIndex++){
			var obj = groups[y][2][xIndex];
			resetObjectColor(obj);
			
			// Element, Unit 정보를 숨긴다.
			obj[4].hide();
			obj[5].hide();
		}
	}
}
