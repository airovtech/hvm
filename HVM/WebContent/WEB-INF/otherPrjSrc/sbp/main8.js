var openAMTPanelURL = "http://am.pssd.or.kr:9095/AMT_SYSTEM";
var findActivityURL = "http://am.pssd.or.kr:9095/AMT_SYSTEM/sbpGetActivityList.runa?dummy=dummy";
var SKKU_LINK = "http://sm.pssd.or.kr/sm";
var RSPS_PSSD = "http://sbp.pssd.or.kr";
var FBD_LINK = "http://fbd.pssd.or.kr";
var INT_LINK = "http://int.pssd.or.kr";
var activityAllUpdateURL = openAMTPanelURL + "/updateActivitiesActiveActor.runa";

// common console check
var console = window.console || { log: function() {} };

$(function() {
	$.ajaxSettings.traditional = true;
	
	// 메뉴 이동
	$("#menu").insertAfter("#topMenu");

	// 그룹 생성 버튼
	$("#btnGroup").click(newStakeholder2);

	// 라인 생성
	$("#btnLine").click(newLine);
	
	// Stakeholder 제목 수정 완료
	$("#editDone").click(editDone).button();

	// function 생성 버튼
	$("#btnFunction").click(newFunction);

	
	// 메뉴 셋팅
	menuSet();

	// 기능 관련
	// 새 문서
	$("#btnReset").click(function(){
		cleanCheck();
	});

	// 저장
	$("#btnSave").click(function(){
		saveCheck(false);
	});
	$("#btnSaveAs").click(function(){
		saveCheck(true);
	});
	
	$("#btnNewSave").click(save);

	// 단위 이동 액션
	$("#btnMove").click(activityMoveChk);

	// 프린트
	$("#btnPrint").click(function(){
		window.print();
	});

	$("#lineDeleteLayer").click(deleteLine);

	$("a").mouseover().css({cursor:"pointer"});
	
	$("#sSearchName").keyup(function(event) {
		if(event.keyCode == 13 && jQuery.trim($("#sSearchName").val()) != ""){
			findStakeholderSkku();
		}
	});
	
	$("#aSearchText").keyup(function(event) {
		if(event.keyCode == 13 && jQuery.trim($("#aSearchText").val()) != ""){
			findActivity();
		}
	});
});

// Data Object
Stakeholder = function(ID, Title, Color) {
	this.id = ID;
	this.title = Title;
	this.color = Color;
};

ActivityData = function(ActID, Title, Column, Color, ActivityImage, RootId, UpperId, Level) {
	this.seq = -1;

	this.id = ActID;
	this.title = Title;
	this.col = Column;
	this.color = Color;
	this.activityImage = ActivityImage;

	this.rootId = RootId;
	this.upperId = UpperId;
	this.level = Level;
};

function changeViewMode(mode){

	if( !isModifyMode ) {
		console.log("It's not modify mode. finish function.");
		return;
	}

	if(mode == "t"){
		ActMode = "Text";
	}
	else if(mode == "i"){
		ActMode = "Image";
	}
	reload();
}

function changeViewExtend(mode){

	if( !isModifyMode ) {
		console.log("It's not modify mode. finish function.");
		return;
	}

	//이상진 추가
	//-2 LEVEL (75%) 인 경우
	if(mode == "1"){
		SHHeight = 62;
		ActWidth = 53;
		ActHeight = 43;
		ActTitleFontSize = 8;
		SHTitleFontSize = 8;

		ActImageWidth = 45;
		ActImageHeight = 36;
		
		activityImageURL = activityImageURL_SL;

		SHWidth = 960;
	}
	//-1 LEVEL (90%) 인 경우
	else if(mode == "2"){
		SHHeight = 73;
		ActWidth = 66;
		ActHeight = 55;
		ActTitleFontSize = 10;
		SHTitleFontSize = 10;

		ActImageWidth = 54;
		ActImageHeight = 44;

		activityImageURL = activityImageURL_SM;

		SHWidth = 860;
	}	
	else if(mode == "3"){
		SHHeight = 80;
		ActWidth = 72;
		ActHeight = 60;
		ActTitleFontSize = 12;
		SHTitleFontSize = 12;

		ActImageWidth = 59;
		ActImageHeight = 48;

		activityImageURL = activityImageURL_S;

		SHWidth = 960;
	}
	else if(mode == "4"){
		SHHeight = 144;
		ActWidth = 146;
		ActHeight = 122;
		ActTitleFontSize = 14;
		SHTitleFontSize = 14;

		ActImageWidth = 134;
		ActImageHeight = 109;

		activityImageURL = activityImageURL_M;

		SHWidth = 960;
	}
	else if(mode == "5"){
		SHHeight = 204;
		ActWidth = 220;
		ActHeight = 184;
		ActTitleFontSize = 16;
		SHTitleFontSize = 16;

		ActImageWidth = 204;
		ActImageHeight = 166;

		activityImageURL = activityImageURL_B;

		SHWidth = 960;
	}

	reload();
}

function menuSet(){
	if(mode == "NEW"){
		$("#btnSaveAs img").hide();
		$("#blankImg").width(320);
		for(var i=0 ; i<defaultSHCount ; i++){
			newStakeholder();
		}
	} else {
		$("#btnSaveAs img").show();
		$("#blankImg").width(379);
	}
}

function cleanCheck(){
	var clear = true;
	if(groups.length > 0 && !isSaved){
		if(!confirm("저장하지 않은 문서는 손실됩니다.\n계속 하시겠습니까?")){
			clear = false;
		}
	}

	if(clear){
		cleanAll();
		menuSet();
	}
}

function cleanCheckToList(){
	if(!isSaved){
		if(confirm("저장하지 않은 문서는 손실됩니다.\n계속 하시겠습니까?")){
			document.location.href="/sbp/list.jsp";
		}
	} else {
		document.location.href="/sbp/list.jsp";
	}
}

function cleanAll(){
	$("#documentTitle span").html("New Design");
	
	loadSeq = "";
	mode = "NEW";

	groups = [];
	connections = [];
	selectedSHIndex = -1;
	r.clear();
}

function hideSaveLayer(){
	$("#saveLayer").dialog("destroy");
}

function saveCheck(isOtherName){
	if(mode == "NEW" || isOtherName){
		$("#newDocTitle").val($("#documentTitle span").html());
		$("#newDocProject").val($("#projectName span").html());

		$("#saveLayer").dialog({
			modal:true,
			width:520,
			height:120,
			draggable:false,
			resizable:false,
			open:function(event, ui){
				closeAllDialogs(event.target.id);
			}
		});
	} else {
		save(isOtherName);
	}
	//$("#saveLayer a:first img:first-child").hide();
}

function getColNum(value){
	var retunVal = 0;
	//크기를 변경했을때 이전 크기로 actWidth 를 구해야 정확한 값을 알수있다.
	retunVal = Math.floor((value - 120) / (ActBeforeWidth + 15)) ;
	//return Math.floor((value - 120) / (ActBeforeWidth + 15)) ;
	return retunVal;
}

function save(isOtherName){
	var oldSeq = null;

	if(mode == "NEW" || isOtherName){
		var title = jQuery.trim($("#newDocTitle").val());
		var project = jQuery.trim($("#newDocProject").val());

		if(title == ""){
			alert("SBP Name을 입력하세요.");
			return;
		}
		if(project == ""){
			alert("Project Name을 입력하세요.");
			return;
		}

		if(isOtherName){
			oldSeq = loadSeq;
		}

		loadSeq = "";
		$("#documentTitle span").html(title);
		$("#projectName span").html(project);

		// 새 이름으로 저장 시 액티비티에 정보가 있으면 업데이트 되기 때문에 전부 삭제한다.
		clearActivityData();
	}
	
	var data = {
		"sh" : [],
		"act" : [],
		"line" : []
	};
	
	// 삭제된 객체들 추가
	data.deletedObjects = deletedObjects;

	// 그룹 정보 조합
	$(groups).each(function(i){

		// StakeHolder : ID, Title, Color
		data.sh.push(new Stakeholder(""
				, getObjectWithTitle(this, "text").attr("text")
				, getObjectWithTitle(this, "groupHolder").attr("colorIndex"))
		);
		
		var actArray = [];
		$(groups[i][2]).each(function(j){
			// Activity : ActID, Title, Column, Color, activityImage
			
			var aObject = new ActivityData(
					getObjectWithTitle(this, "Activity").attr("key")
					,escape( getObjectWithTitle(this, "text").attr("text").replace(/\n/g, " ") )
					,getColNum(getObjectWithTitle(this, "Activity").attr("x"))
					,getObjectWithTitle(this, "Activity").attr("colorIndex")
					,getObjectWithTitle(this, "Activity").attr("activityImage")
					,getObjectWithTitle(this, "Activity").attr("rootId")
					,getObjectWithTitle(this, "Activity").attr("upperId")
					,getObjectWithTitle(this, "Activity").attr("level")
				);

			try{
				if(!isOtherName){
					var seq = getObjectWithTitle(this, "Activity").attr("data").seq;
					aObject.seq = seq;
				} else {
					// 새 이름으로 저장 시.
					aObject.seq = -1;
				}
			} catch (e){
				aObject.seq = -1;
			}

			actArray.push(aObject);
		});

		data.act.push(actArray);
	});

	// 라인 정보 조합
	$(connections).each(function(i){
		var lineStr = "[[" + getItemLocation(this.from) + "], [" + getItemLocation(this.to) + "]]";
		data.line.push(eval(lineStr));
	});
	
	var data = {"data" : JSON.stringify(data),
		"seq" : loadSeq,
		"docTitle" : $("#documentTitle span").html(),
		"projectName" : $("#projectName span").html(),
		"projectId" : $("#projectId").val()};

	if(isOtherName){
		data.isOtherName = 1;
		data.oldSeq = oldSeq;
	}

	//Test
	if(false){
		alert("TEST MODE 330: " + JSON.stringify(data, null, 4));
		return;
	}

	$.ajax({
		type: "POST",
		url: saveURL,
		data: data,
		success: function(msg){
			var json = jQuery.parseJSON(msg);
			//hideSaveLayer();
			mode = "MODIFY";
			menuSet();

			if(json.result == 1){
			
				if(json.saveSeq && !isEmpty(json.saveSeq)){
					loadSeq = json.saveSeq;
				}

				if(loadMissingActivityData() == 0){
					isSaved = true;
				}

				// 화면 내 아이템들의 밀림 방지를 위해 새로 그려준다.
				reload();

				if(isOtherName){
					// 새 이름으로 저장시에만 엘리먼트와 유닛 정보를 복제한다.
					$.getJSON("copyElementAndUnit.jsp", {oldSeq : oldSeq, seq : loadSeq}, function(data){
						console.log("copyElement result : ", data);
					});
				}

				alert(json.msg);
				$("#saveLayer").dialog("destroy");

			}
		},
		error : function() {
			alert("에러가 발생하였습니다. 잠시 후 다시 시도해주세요");
		}
	});
}

function load(){
	if(loadValue == null){
		alert("데이터를 불러오지 못했습니다.");
		return;
	}

	var maxIndex = 0;
	
	//불러들인 Stakeholder (그룹) 갯수
	var groupCount = loadValue.groups.length;
	
	for(var i=0; i<groupCount ; i++){
		newStakeholder(loadValue.groups[i]);
		var items = loadValue.items[i];

		
		//HVM kmyu 20161105 START
		var groupObjList = loadValue.groups[i];
		var groupTitle = groupObjList[0];
		//HVM kmyu 20161105 END
		
		for(var j=0 ; j<items.length ; j++){
			
			var obj = items[j];

			var index = obj.activity_index;
			var title = obj.activity_title;
			var actId = obj.activity_seq;
			var colorIndex = obj.color;
			var activityImage = obj.activity_image;
			var rootId = obj.root_id;
			var upperId = obj.upper_id;
			var level = obj.level;
			
			//HVM kmyu 20161105
			obj.groupTitle = groupTitle;
			//HVM kmyu 20161105
			
			selectedSHIndex = i; //Stakeholder 그룹 번호

			drawNewActivity(index, title, actId, colorIndex, activityImage, rootId, upperId, level, obj);

			if(index > maxIndex){
				maxIndex = index;
			}
		}
	}

	var lineCount = loadValue.lines.length;
	for(var i=0 ; i<lineCount ; i++){
		var lineInfo = loadValue.lines[i];
		var info1 = lineInfo[0];
		var info2 = lineInfo[1];
		var obj1 = groups[info1[0]][2][info1[1]];
		var obj2 = groups[info2[0]][2][info2[1]];
		connections.push(r.connection(obj1[0], obj2[0], bgLineColor_Normal, bgLineColor_Normal + "|" + bgLineThick));
	}

	resizeCanvas2(maxIndex);

	isSaved = true;
}


function reload(){
	
	var reloadLoadValue = {
		"groups" : [],
		"items" : [],
		"lines" : []
	};

	// 그룹 정보 조합
	$(groups).each(function(i){
		// StakeHolder : ID, Title, Color
		reloadLoadValue.groups.push([getObjectWithTitle(this, "text").attr("text"), getObjectWithTitle(this, "groupHolder").attr("colorIndex")]);

		var actArray = [];
		actArray.push();
		reloadLoadValue.items.push(actArray);
	});
	
	$(groups).each(function(i){
		$(groups[i][2]).each(function(j){
			reloadLoadValue.items[i].push(
				[getColNum(getObjectWithTitle(this, "Activity").attr("x"))
				,getObjectWithTitle(this, "text").attr("text")
				,getObjectWithTitle(this, "Activity").attr("key")
				,getObjectWithTitle(this, "Activity").attr("colorIndex")
				,getObjectWithTitle(this, "Activity").attr("activityImage")
				,getObjectWithTitle(this, "Activity").attr("rootId")
				,getObjectWithTitle(this, "Activity").attr("upperId")
				,getObjectWithTitle(this, "Activity").attr("level")
				,getObjectWithTitle(this, "Activity").attr("data")
				]
			);
		});
	});

	// 라인 정보 조합
	$(connections).each(function(i){
		reloadLoadValue.lines.push(eval([getItemLocation(this.from),getItemLocation(this.to)]));
	});

	//다시 그리기 전에 reset
	groups = [];
	connections = [];
	selectedSHIndex = -1;
	r.clear();

	var maxIndex = 0;

	var groupCount = reloadLoadValue.groups.length;
	
	for(var i=0; i<groupCount ; i++){

		newStakeholder(reloadLoadValue.groups[i]);
		
		var items = reloadLoadValue.items[i];

		for(var j=0 ; j<items.length ; j++){
			var index = items[j][0];
			var title = items[j][1];
			var actId = items[j][2];
			var colorIndex = items[j][3];
			var activityImage = items[j][4];
			var rootId = items[j][5];
			var upperId = items[j][6];
			var level = items[j][7];
			var data = items[j][8];
			selectedSHIndex = i;
			
			if(index > maxIndex){
				maxIndex = index;
			}
			drawNewActivity(index, title, actId, ""+colorIndex, activityImage, rootId, upperId, level, data);
		}
	}
	
	var lineCount = reloadLoadValue.lines.length;
	
	for(var i=0 ; i<lineCount ; i++){
		var lineInfo = reloadLoadValue.lines[i];
		var info1 = lineInfo[0];
		var info2 = lineInfo[1];
		var obj1 = groups[info1[0]][2][info1[1]];
		var obj2 = groups[info2[0]][2][info2[1]];
		connections.push(r.connection(obj1[0], obj2[0], bgLineColor_Normal, bgLineColor_Normal + "|" + bgLineThick));
	}
	
	ActBeforeWidth = ActWidth;

	//alert(maxIndex);
	resizeCanvas2(maxIndex);
}


function openEditPanel(set){

	var viewText = set[getTextIndex(set)].attr("text");
	//viewText = viewText.replace(/\n/g, "");
	viewText = viewText.replace(/\n/g, " ");

	if(viewText.length > 30){
		//viewText = viewText.substring(0, 30) + "...";
	}
	currTextObject = set;

	if(getKind(currTextObject) == 0) {
		
		//var index = viewText.indexOf("_");
		var index = viewText.lastIndexOf("_");
		viewText = viewText.substring(0, index);
		$("#stakeholderMode").val("modify");
		$("#sSearchName").val(viewText);
		$("#stackholderEditLayer2").dialog({
			modal:true,
			width:500,
			height:100,
			scrollbars: false,
			draggable:false,
			resizable:false,
			open:function(event, ui){
				closeAllDialogs(event.target.id);
			}
		});

		var frameSize = $("#StackHolderFrame").height();
		var shelWidth = 0;
		var shelHeight = 0;

		if(frameSize > 0){
			if($("#newChk").val() == "ok"){
				//크롬
				shelWidth = 664;
				shelHeight = 596;
				document.getElementById("StackHolderFrame").style.height = "520px";
			}
			else{
				//크롬
				shelWidth = 708;
				shelHeight = 574;
				document.getElementById("StackHolderFrame").style.height = "496px";
			}
			$("#stackholderEditLayer2").dialog("close");
			$("#stackholderEditLayer2").dialog({
				modal:true,
				width:shelWidth,
				height:shelHeight,
				scrollbars: false,
				draggable:false,
				resizable:false,
				open:function(event, ui){
					closeAllDialogs(event.target.id);
				}
			});
		}
		// findStakeholderSkku();

	} else if(getKind(currTextObject) == 1) {
		// Activity 수정
		showActivitySearchLayer('Modify');
		$("#activityID").val(set[2].attr("text"));
		$("#aSearchText").val(viewText).focus();
	}
}

function editDone(){
	if(getKind(currTextObject) == 1){
		// Activity

		var actId = "-1";
		var actName = "";
		if(type == 1){
			// 선택된 아이디값을 셋팅
			var s = document.getElementById("activity");
			actId = s.options[s.selectedIndex].value;
			actName = s.options[s.selectedIndex].text;

			if(actId == "-1"){
				alert("Activity를 선택하세요.");
				return;
			}
			currTextObject[1].attr({"text":actName});
		}
		currTextObject[2].attr({"text":actId});
		$("#ActivitySearchLayer").dialog("close");
	} else {
		//var title = getFitText2($("#newTitle").val(), 0);
		var title = $("#newTitle").val();
		currTextObject[getTextIndex(currTextObject)].attr({"text":title});
		$("#stackholderEditLayer").dialog('destroy');
	}
}

// 텍스트를 단어 단위로 잘라서 적당한 길이에 맞게 반환한다.
function getFitText2(string, titleType){

	var result = "";
	var arr = string.split(" ");
	var str="";
	var fontSize = 1;

	if(titleType == 0){
		limitWidth = SHTitleBoxWidth;
		fontSize = SHTitleFontSize;
	} else {
		limitWidth = ActWidth;
		fontSize = ActTitleFontSize;
	}
	
	var temp = "";
	for(var i=0 ; i<arr.length ; i++){
		str = arr[i];

		var checkString = temp + (isEmpty(temp) ? "" : " ") + str;
		var checkWidth = getWidth(checkString, fontSize);

		if(checkWidth > limitWidth){
			// 단어를 추가했을 때 길이 초과
			result += temp + "\n";
			temp = str;
		} else {
			temp += (isEmpty(temp) ? "" : " ") + str;
		}
	}

	if( !isEmpty(temp) ){
		result += temp;
	}

	return result;
}

// 텍스트를 문자 단위로 잘라서 적당한 길이에 맞게 반환한다.
function getFitText(arr, titleType){

	var result = "";
	var str="";
	var fontSize = 1;

	if(titleType == 0){
		limitWidth = SHTitleBoxWidth - 4;
		fontSize = SHTitleFontSize;
	} else {
		limitWidth = ActWidth - 2;
		fontSize = ActTitleFontSize;
	}
	
	for(var i=0 ; i<arr.length ; i++){
		str = arr[i];

		while(str.length > 0){
			var cutIndex = str.length;
			var testStr = str.substring(0, cutIndex);

			while(getWidth(testStr, fontSize) > limitWidth){
				cutIndex--;
				testStr = str.substring(0, cutIndex);
			}
			result += testStr + "\n";
			str = str.substring(testStr.length, str.length);
		}
	}

	return result;
}

function getWidth(str, fontSize){
	$("#procTempLayer").show();
	var spanObj = $("#procTempLayer span");
	$(spanObj).css({"font-size":fontSize, "font-family":"Arial"});
	$(spanObj).html(str);

	var result = Number($("#procTempLayer").attr("clientWidth"));
	$("#procTempLayer").hide();
	return result;
}

//Stakeholder를 검색한다.
function findStakeholderSkku(){
	$("#newChk").val("");

	var value = $('#sSearchName').val();
	var uid = $('#userid').val();

	if(isEmpty(value)){
		$("#sSearchName").focus();
		//alert("검색어를 입력해주세요");
		alert("Stakeholder 명을 입력해주세요");
		return;
	}
	
	$("#stackholderEditLayer2").dialog({
		modal:true,
		width:708,
		height:574,
		draggable:false,
		resizable:false,
		open:function(event, ui){
			closeAllDialogs(event.target.id);
		}
	});

	document.getElementById("StackHolderFrame").style.height = "496px";
	
	//iframe 으로 불러온다.
	var urlString = SKKU_LINK+"/_searchStakeholder.asp";
	urlString += "?id="+encodeURIComponent(value)+"&user_seq="+sUserSeq  + getUnitedParams() +"&rsps="+RSPS_PSSD+"/sbp/stakeholderWorkFinish.jsp";

	document.getElementById("StackHolderFrame").src = urlString;
}

function newStakeholderSkku(){
	var value = $('#sSearchName').val();

	$("#newChk").val("ok");

	$("#stackholderEditLayer2").dialog({
		modal:true,
		width:664,
		height:596,
		draggable:false,
		resizable:false,
		open:function(event, ui){
			closeAllDialogs(event.target.id);
		}
	});

	document.getElementById("StackHolderFrame").style.height = "520px";
	
	//iframe 으로 불러온다.
	var urlString = SKKU_LINK+"/_createStakeholder.asp?" + getUnitedParams();
	//	urlString += "&rsps="+escape(RSPS_PSSD+"/sbp/stakeholderWorkFinish.jsp?id="+encodeURIComponent(value));
	urlString += "&rsps="+escape(RSPS_PSSD+"/sbp/stakeholderWorkFinish.jsp");
	document.getElementById("StackHolderFrame").src = urlString;
}


function findFunctionActivity(){
	$("#functionLayer").dialog({
		modal:true,
		width:840,
		height:520,
		draggable:false,
		resizable:false,
		open:function(event, ui){
			closeAllDialogs(event.target.id);
		}
	});
	
	var urlString = "";
	urlString = FBD_LINK + "/fbd/login/process.do?USER_ID=pss&USER_PWD=cdi2014&preUrl=/fbd/fbd01006/list.do&preParam";
	urlString += "=rtnUrl="+RSPS_PSSD+"/sbp/functionWorkFinish.jsp";
	document.getElementById("functionFrame").src = urlString + getUnitedParams();
}

function closeFunction(){
	$("#functionLayer").dialog("close");
	document.getElementById("functionFrame").src = "about:blank";
}


//Activity를 검색한다.
function findActivity(){
	var type = $('#ActivitySearchLayer input:checked').val();
	var value = $('#aSearchText').val();
	var data = {};

	if(isEmpty(value)){
		$("#aSearchText").focus();
		alert("검색어를 입력해주세요");
		return;
	}
	
	data.sysType = "SBP"
	data.operType = "SS05";
	data.user_seq = sUserSeq;
	data.num = 1;
	data.row_size = 100;

	if(type == 1){
		data.actionverb_value = value;
	} else if(type == 2){
		data.actor_value = value;
	} else if(type == 3){
		data.pss_value = value;
	} else if(type == 4){
		data.event_value = value;
	} else if(type == 5){
		data.context_value = value;
	}

	$("#ActivitySearchResult").removeClass("result").html("조회중입니다. 잠시만 기다려주세요.");
	
	$.getJSON("/ajax.jsp?_url="+ escape(findActivityURL + getUnitedParams()), data, function(json){
		//if(json.remoteError != ""){
		//	alert("데이터를 불러오는데 실패했습니다.");

		//} else if(json.repl_cd == "00"){

		if(json.repl_cd == "00"){
			var table = document.createElement("table");
			table.setAttribute("class", "listTable");
			
			var tHead = document.createElement("thead");
			table.appendChild(tHead);
			
			var th = document.createElement("th");
			th.style.width = "10%"
			th.appendChild(document.createTextNode('No.'));
			tHead.appendChild(th);
			
			th = document.createElement("th");
			th.style.width = "20%"
			//th.appendChild(document.createTextNode('ActivityID'));
			th.appendChild(document.createTextNode('StakeHolder'));
			tHead.appendChild(th);
			
			th = document.createElement("th");
			th.style.width = "50%"
			th.appendChild(document.createTextNode('Title'));
			tHead.appendChild(th);
			
			th = document.createElement("th");
			th.style.width = "20%"
			th.appendChild(document.createTextNode('View'));
			tHead.appendChild(th);
			
			var tBody = document.createElement("tbody");
			table.appendChild(tBody);


			for(var i=0 ; i<json.data.length ; i++){
				var rowData = json.data[i];
				var row = document.createElement("tr");
				var cell = null;
				var a = null;
				var linkText = null;
				
				row.className = "aActivity " + rowData.activity_name;
				
				cell = document.createElement("td");
				cell.setAttribute("clsss", "ta_c");
				cell.setAttribute("align","center");
				cell.innerHTML = i;
				row.appendChild(cell);

				// stakeholder name
				cell = document.createElement("td");
				cell.setAttribute("align","center");
				a = document.createElement("a");
				a.setAttribute("href", "javascript:selectActivity('" + rowData.actionverb_value.replace(/\n/g, " ") + "', '" + rowData.activity_name + "','"+rowData.sbp_view_image+"')");
				a.appendChild(document.createTextNode(rowData.active_ac));
				cell.appendChild(a);
				row.appendChild(cell);

				// Activity Name
				cell = document.createElement("td");
				a = document.createElement("a");
				a.setAttribute("href", "javascript:selectActivity('" + rowData.actionverb_value.replace(/\n/g, " ") + "', '" + rowData.activity_name + "','"+rowData.sbp_view_image+"')");
				a.appendChild(document.createTextNode(rowData.actionverb_value));
				cell.appendChild(a);
				row.appendChild(cell);
				
				// 내용보기
				cell = document.createElement("td");
				cell.setAttribute("clsss", "ta_c");
				cell.setAttribute("align","center");
				
				a = document.createElement("a");
				a.setAttribute("href", "javascript:openAMTPanel('" + rowData.activity_name + "', '', true, '', 'search')");
				
				linkText=document.createTextNode('내용 보기');
				a.appendChild(linkText);
				cell.appendChild(a);
				row.appendChild(cell);

				tBody.appendChild(row);
			}
		
			$("#ActivitySearchResult").html(table).addClass("result");
			showActivitySearchLayer();
		} 
		else if(json.repl_cd == "500"){
			alert("회원 정보가 사라졌습니다.\r\n로그인 페이지로 이동합니다.");
			document.location.href = "/login/login.jsp";
			return;
		}
		else {
			$("#ActivitySearchResult").html("");
			showActivitySearchLayer();
			
			if(json.repl_cd == "02") {
				alert("조회 결과가 없습니다.");
			} else {
				alert("데이터 조회 실패 : " + json.repl_cd);
			}
		}
	});
	/*	},
		error: function(){
			$("#ActivitySearchResult").html("");
			showActivitySearchLayer();
			alert("Error");
		}*/
}

//Activity 선택
function selectActivity(verbID, activityID, activityImage){
	verbID = verbID.replace(/\n/g, " ");	// AMT에서 강제로 \n 을 넣어서 \\n 로 표시되어 넘어오는 경우가 있어 스페이스바로 대체한다.

	var title = verbID;
	title = title.replace(/\n/g, "");
	title = replaceAll(title," ", "\n");
	
	if (null != selectedObject && getKind(currTextObject) == 1){
		
		currTextObject[0].attr({"activityImage":activityImage});
		currTextObject[1].attr({"text":title});

		for(var i=0 ; i<currTextObject.length ; i++){		
			if( isElement( currTextObject[i].type ) && currTextObject[i].attr("title") == "Activity" ){
				currTextObject[i].attr({"key":activityID});
			}
		}
		currTextObject = null;

	} else {
		drawNewActivity(null, title, activityID, 0, activityImage, "", "", "");
	}

	isSaved = false;

	//$("#ActivitySearchLayer").dialog("close");
	//$("#ActivityWorkLayer").dialog("close");
	closeAllDialogs();
	document.getElementById("AMTWorkFrame").src = "about:blank";
}


//function 선택
function selectFunctionFinish(verbID, activityID, activityImage, rootId, upperId, level){

	verbID = verbID.replace(/\n/g, " ");	// AMT에서 강제로 \n 을 넣어서 \\n 로 표시되어 넘어오는 경우가 있어 스페이스바로 대체한다.

	var title = verbID;
	title = title.replace(/\n/g, "");
	title = replaceAll(title," ", "\n");
	
	if (null != selectedObject && getKind(currTextObject) == 1){
		
		currTextObject[0].attr({"activityImage":activityImage});
		currTextObject[1].attr({"text":title});

		for(var i=0 ; i<currTextObject.length ; i++){		
			if( isElement( currTextObject[i].type ) && currTextObject[i].attr("title") == "Activity" ){
				currTextObject[i].attr({"key":activityID});
			}
		}
		currTextObject = null;

	} else {
		drawNewActivity(null, title, activityID, 0, activityImage, rootId, upperId, level);
	}

	isSaved = false;
}

//Activity 부가 정보 닫기
function hideInfo(activityID){
	$(".infomation." + activityID).hide();

	$("#btn_" + activityID).html("정보 보기");
	$("#btn_" + activityID).click(function(){
		showInfo(activityID);
	});
}

//Activity 검색창 열기
function showActivitySearchLayer(mode){
	
	var checkFunction = false;
	$(groups).each(function(i){
		if(selectedSHIndex == i && getObjectWithTitle(this, "text").attr("text") == "Function"){
			alert("Function 에는 Activity 를 넣을 수 없습니다.");
			checkFunction = true;
		}
	});

	if(checkFunction){
		return;
	}


	var userHeight = 0;

	document.getElementById("AMTWorkFrame").src = "about:blank";

	if(mode == "Modify"){
		$("#ActivitySearchResult").html("");
		$("#btnAMTPanel").val("수정");
	} else {
		currTextObject = null;
		$("#activityID").val("");
		$("#btnAMTPanel").val("생성");
	}

	if($("#ActivitySearchResult").html().length == 0){
		userHeight = 130;
	} else {
		userHeight = 320;
	}

	//$("#ActivitySearchLayer").dialog("close");

	$("#btnAMTPanel").button().css("padding", "0.1em 1em");

	$("#ActivitySearchLayer").dialog({
		modal:true,
		width:520,
		height:userHeight,
		draggable:true,
		resizable:false,
		open:function(event, ui){
			closeAllDialogs(event.target.id);
		}
	});
}

function openAMTPanel(activityID, actionVerb, isModal, changeIndex, amtType){
	if(amtType == "search"){
		$("#ActivitySearchResult").html("");
	}

	var regMust = /[!@#$%^&*:;?\{}+=\'\"\[\]\\]/;  //	,(콤마) .(점) ( )(소괄호) /(슬러스) -(대쉬) _(언더바) 제외 특수문자 체크

	if(regMust.test(actionVerb)){
		alert("특수문자는 다음의 문자만 사용가능합니다.\r\n,(콤마) .(점) ( )(소괄호) /(슬러스) -(대쉬) _(언더바)");
		return;
	}

	var selShText = "";

	$(groups).each(function(i){
		if(changeIndex != undefined && isEmpty(changeIndex)){
			if(i == changeIndex){
				selShText = getObjectWithTitle(this, "text").attr("text");
			}
		}
		else{
			if(i == selectedSHIndex){
				selShText = getObjectWithTitle(this, "text").attr("text");
			}
		}
	});

	selShText = replaceAll(selShText, "\n", " ");
	if(selShText == "Untitled"){
		selShText = "";
	}

	var searchLayerActivated = false;
	try{
		searchLayerActivated = $("#ActivitySearchLayer").dialog("isOpen") == true;
	} catch(e){
	}
	
	if(searchLayerActivated){
		$("#ActivitySearchLayer").dialog("close");
	}
	
	document.getElementById("AMTWorkFrame").src = "about:blank";

	$("#ActivitySearchResult .aActivity").each(function(){
		if ($(this).hasClass(activityID)){
			$(this).css("background-color", "#FFCC99");
		} else {
			$(this).css("background-color", "");
		}
	});
	
	//2012.06.25 현재 Dialog 호출

	$("#ActivityWorkLayer").dialog({
		width:720,
		height:400,
		modal:isModal,
		draggable:true,
		resizable:false,
		scrollbars:false,
		open:function(event, ui){
			closeAllDialogs(event.target.id);
		},
		close:function(){
			if(searchLayerActivated){
				showActivitySearchLayer();
			}

			$("#AMTWorkFrame").attr("src", "about:blank");
		}
	});

	var urlString = openAMTPanelURL;

	if(activityID == undefined || "" == activityID){
		urlString += "/otherActivityCreate.runa?user_seq="+sUserSeq+"&sysType=SBP&operType=SS01&action_verb="+encodeURIComponent(actionVerb)+"&active_ac="+encodeURIComponent(selShText);
	} else if("" != activityID){
		if(changeIndex != undefined && isEmpty(changeIndex)){
			urlString += "/otherActivityUpdate.runa?user_seq="+sUserSeq+"&sysType=SBP&operType=SR02&activity_name="+activityID+"&active_ac="+encodeURIComponent(selShText);
		}
		else{
			urlString += "/otherActivityUpdate.runa?user_seq="+sUserSeq+"&sysType=SBP&operType=SR02&activity_name="+activityID;
		}
	}
	document.getElementById("AMTWorkFrame").src = urlString + getUnitedParams();
}

// 보여지는 모든 dialog 레이어들을 제거한다. 다이얼로그 셋팅에 추가하면 오픈 전에 모든 다이얼로그들을 제거해준다.
function closeAllDialogs(excludeID){
	var objects = $(".ui-dialog:visible");
	if(objects.length == 0)
		return;

	objects.each(function(idx, obj){
		var id = $(obj).attr("aria-describedby");
		if(id != excludeID){
			$("#" + $(obj).attr("aria-describedby")).dialog("close");
		}
	});
}

// 통합에 필요한 파라메터들을 조합하여 반환한다.
function getUnitedParams(){
	var p = "&united_user_seq=" + sUnitedUserSeq;
	p += "&user_id=" + sUserID;
	p += "&user_name=" + encodeURIComponent(sUserName);
	p += "&project_name=" + encodeURIComponent(sProjectName);
	p += "&project_puid=" + sPUID;
	return p;
}

function clearActivityData(){
	var list = [];
    for(var i=0 ; i<groups.length ; i++){
        for(var j=0 ; j<groups[i][2].length ; j++){
			var obj = groups[i][2][j];
			obj[0].attrs.data = null;
        }
    }
}

// activity, function의 누락된 데이터가 있는 항목을 조회하여 데이터를 불러와서 셋팅한다.
function loadMissingActivityData(){
	var list = [];
    for(var i=0 ; i<groups.length ; i++){
        for(var j=0 ; j<groups[i][2].length ; j++){
			var obj = groups[i][2][j];
            if(obj[0].attrs.data == undefined){
                list.push(getActivityIndex(obj[0]));
            }
        }
    }
	
	if(list.length > 0){
		$.getJSON("getMissingActivityDataJSON.jsp", {
			dataSeq : loadSeq,
			datas : JSON.stringify(list)
		}, function (data){

			if(data.result == 1){
				var items = data.items;

				for(var i=0 ; i<items.length ; i++){
					var item = items[i];

					var obj = findItemWithLocation(item.group_index, item.activity_index);
					obj[0].attr({data : item});
				}
			}

			isSaved = true;
		});
	}

	return list.length;
}
