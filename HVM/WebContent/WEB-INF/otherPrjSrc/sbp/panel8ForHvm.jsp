<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/include/header.jsp" %>
<%
	//HVM 관련 추가 내용
	String hvm = (String)request.getParameter("hvm");
	if (hvm != null && hvm.equalsIgnoreCase("true")) {
		loginID = (String)request.getParameter("memberId");
		session.setAttribute("memberid", loginID);
		//isLogin = Boolean.parseBoolean((String)request.getParameter("isLogin"));
		isLogin = true;
		session.setAttribute("isLogin", isLogin);
		sPUID = (String)request.getParameter("sPUID");
		session.setAttribute("sPUID", sPUID);
		sProjectName = (String)request.getParameter("sProjectName");
		session.setAttribute("sProjectName", sProjectName);
		session.setAttribute("projectName", sProjectName);
		
	}
	//HVM 
%>
<%@ include file="/include/needLogin.jsp" %>
<%@ include file="/include/headerFront.jsp" %>
<script type="text/javascript" src="/js/raphael_2.1.0.js"></script>
<script type="text/javascript" src="/js/json2.js"></script>
<script type="text/javascript" src="/js/HtmlEncode.js"></script>

<!-- HVM 관련 추가 내용 -->
<!-- <script type="text/javascript" src="/js/panel8.js"></script> -->
<script type="text/javascript" src="/js/panel8ForHvm.js"></script>
<!-- HVM 관련 추가 내용 -->

<script type="text/javascript" src="/js/main8.js"></script>
<script type="text/javascript" src="/js/elementManager.js"></script>
<script type="text/javascript" src="/js/unitManager.js"></script>
<script type="text/javascript" src="/js/consoleHelper.js"></script>
<%@ include file="/include/topForHvm.jsp" %>
<%
	String docTitle = ju.getStrParam("docTitle");
	String seqNo = ju.getStrParam("seq");
	String mode = "NEW";
	String projectName = null;
	boolean isMeta = "Y".equals(ju.getStrParam("isMeta"));

	if(docTitle.equals("")) {
		docTitle = "Untitled";
		projectName = (String)session.getAttribute("projectName");
	} else {
		mode = "MODIFY";
		projectName = ju.getStrParam("projectName");
	}

	if(!ju.valid(projectName)){
		projectName = "Untitled";
	}

%>
<script type='text/javascript'>
<!--
var loadSeq = '<%=ju.getStrParam("seq")%>';
var mode = '<%=mode%>';
var representMode = "MODIFY";	// 작업 상태 저장용

var sUserID = '<%=loginID%>';
var sUserPass = '<%=loginPass%>';
var sUserSeq = '<%=userSeq%>';
var sUserName = '<%=sUserName%>';
var sProjectName = '<%=sProjectName%>';
var sPUID = '<%=sPUID%>';
var sUnitedUserSeq = '<%=sUnitedUserSeq%>';
var isMeta = <%=isMeta%>;
var isAuthor = <%=sIsAuthor%>;
-->
</script>

<script type="text/javascript">
<!--
window.onload = function(){
	<%if(!"venice".equals(loginID)){%>
	//마우스 우클릭 방지
	//HVM 관련 추가 내용
	//document.oncontextmenu = function(e){
	//	return false;
	//}
	<%}%>

	if(isMeta){
		$("#topList").parent().children().hide();
		$("#btnReset").hide();
		if(!isAuthor){
			$("#btnGroup, #btnObj, #btnLine, #btnColorpicker").hide();

			$("#btnSaveAs, #btnSave").hide();
		}
	}
}
-->
</script>

<!-- 컨텐츠 영역 -->
<div id="content">
	<span id="projectName">Project Name : <span><%=sProjectName%></span><input type="hidden" id="projectId" value="<%=(String)session.getAttribute("projectId")%>"/></span><br/>
	<span id="documentTitle" seqId="<%=seqNo%>">SBP Name : <span><%=docTitle%></span><input type="hidden" id="userid" value="<%=(String)session.getAttribute("memberid")%>"/></span>
	<div id="rPanel">
		<div id="rPanelCover" style="top:0;position:absolute;margin-top:200px;"/>
	</div>
</div>

<!-- 라인 삭제 레이어 -->
<div id="lineDeleteLayer">
	<a id="btnDelete">Remove Connection</a>
</div>

<!-- Stakeholder 수정 레이어 -->
<div id="stackholderEditLayer" title="Modity stakeholder name">
	<table class="table_base" style="line-height:24px;">
	<tr>
		<td>
			Current Title : <span id="oldTitle">&nbsp;</span>
		</td>
	</tr>
	<tr>
		<td>
			New Title : 
			<input type="text" id="newTitle" style="width:220px;" />
			<a id="editDone">Change</a>
		</td>
	</tr>
	</table>
</div>

<div id="stackholderEditLayer2" title="Stakeholder 검색/생성">
	<input type="hidden" name="stakeholderMode" id="stakeholderMode" value="" />
	<table class="table_base" style="line-height:24px;">
	<tr>
		<td>
			Name : 
			<input type="text" id="sSearchName" style="width:190px;" />
			<input type="button" style="padding:0.1em 1em" onclick="findStakeholderSkku()" value="Search"/>
			<input type="button" style="padding:0.1em 1em" onclick="newStakeholderSkku()" value="Create"/>
			<input type="hidden" id="newChk" value=""/>
		</td>
	</tr>
	<tr>
		<td>
			<iframe name="StackHolderFrame" id="StackHolderFrame" src="about:blank" style="width:100%; max-height:598px; height:0px" frameborder="0" scrolling="no"></iframe>
		</td>
	</tr>
	</table>
</div>

<!-- Function 검색 레이어 -->
<div id="functionLayer" title="function 검색" style="display:none;">
	<iframe name="functionFrame" id="functionFrame" src="about:blank" style="width:100%; height:460px;" frameborder="0" scrolling="auto"></iframe>
</div>


<!-- Activity 검색 레이어 -->
<div id="ActivitySearchLayer" title="Activity 검색/생성">
	<table id="table_form">
		<tr>
			<th style="width:70px;">Name</th>
			<td>
				<input type="hidden" name="activityID" id="activityID" />
				<input type="text" name="aSearchText" id="aSearchText" maxlength="20" style="width:180px;" onkeyup="onkeySpcChk(this)"/>
				<input type="button" onclick="findActivity()" value="검색" />
				<input type="button" id="btnAMTPanel" onclick="openAMTPanel('', $('#aSearchText').val(), true);" value="생성"/>
			</td>
		</tr>
		<tr>
			<th>검색 타입</th>
			<td>
				<input type="radio" name="searchType" id="searchType_1" value="1" checked="checked" /><label for="searchType_1">Actionverb</label>
				<input type="radio" name="searchType" id="searchType_2" value="2" /><label for="searchType_2">Actor</label>
				<input type="radio" name="searchType" id="searchType_3" value="3" /><label for="searchType_3">PSS Value</label>
				<input type="radio" name="searchType" id="searchType_4" value="4" /><label for="searchType_4">Event</label>
				<input type="radio" name="searchType" id="searchType_5" value="5" /><label for="searchType_5">Context</label>
			</td>
		</tr>
	</table>
	<div id="ActivitySearchResult"></div>
</div>

<!-- 텍스트 사이즈를 맞추기 위한 임시 HTML -->
<div id="procTempLayer" style="float:right;">
	<span>&nbsp;</span>
</div>

<!-- 저장 레이어 -->
<div id="saveLayer" title="Save Project">
	<table class="table_base" style="line-height:24px;">
		<colgroup>
			<col width="55"/>
			<col width="300"/>
			<col width="60"/>
		</colgroup>
		<tbody>
			<tr>
				<td>
					Project :
				</td>
				<td>
					<input type="text" id="newDocProject" maxlength="50" style="width:340px;" readonly='readonly'/>
				</td>
				<td rowspan="2">
					<a id="btnNewSave"><img src="/images/btn/btn_layer_save.gif" alt="Save" style="padding-left:5px;"/></a>
				</td>
			</tr>
			<tr>
				<td>
					SBP :
				</td>
				<td>
					<input type="text" id="newDocTitle" maxlength="50" style="width:340px;" />
				</td>
			</tr>
		</tbody>
	</table>
</div>

<!-- Activity Modeling Tool -->
<div id="ActivityWorkLayer" title="Activity Modeling Tool">
	<iframe name="AMTWorkFrame" id="AMTWorkFrame" src="about:blank" style="width:679px; height:324px;" scrolling="no" frameborder="0"></iframe>
</div>


<!-- Activity 단위 이동 설정 레이어 -->
<div id="actvityMoveLayer" title="Activity Move Control">
	<table class="table_base" style="line-height:24px;">
		<colgroup>
			<col width="55"/>
			<col width="250"/>
		</colgroup>
		<tbody>
			<tr>
				<td><img src="/images/text/tit_quantity.gif" alt="Quantity"/></td>
				<td>
					<input type="radio" name="moveType" value="all" checked /> all&nbsp;<input type="radio" name="moveType" value="one" /> one
				</td>
			</tr>
			<tr>
				<td><img src="/images/text/tit_direction.gif" alt="Direction"/></td>
				<td>
					<div style="float:left; margin-top:4px;">
						<select id="moveDirection" name="moveDirection" style="width:130px">
							<option value="left">Left</option>
							<option value="right">Right</option>
						</select>
					</div>
					<div style="float:left; margin-top:4px; padding-left:5px;">
						<a id="btnMove"><img src="/images/btn/btn_layer_move.gif" alt="Move"/></a>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	<input type="hidden" id="moveIndex" value="" />
	<input type="hidden" id="selMoveSHIndex" value="" />
</div>

<!-- Element 레이어 -->
<div id="representationLayer" title="Service Element" style="display:none;">
	<form name="repForm" method="post" target="ElementFrame" action="">
		<div style="padding:0px 10px 10px 10px;">
			<input type="hidden" name="elementSeq" />
			<input type="hidden" name="preUrl" />
			<input type="hidden" name="preParam" />
			<input type="hidden" name="color" value="0" />
			
			Service Element Name <input type="text" id="serviceElementName" name="SERVICE_ELEMENT_NAME" style="width: 250px;" maxlength="100"/><br/>

			<div class="colorBox" style="clear:both;height:20px;padding:5px 0px 5px 0px;">
				<span style="float:left;padding-right:5px;">Service Unit Color</span>
				<div class="colorPallet borderOn" style="background:#ff9090;" onclick="selectColorElement(0);"></div>
				<div class="colorPallet" style="background:#ff9148;" onclick="selectColorElement(1);"></div>
				<div class="colorPallet" style="background:#ffe558;" onclick="selectColorElement(2);"></div>
				<div class="colorPallet" style="background:#c4f998;" onclick="selectColorElement(3);"></div>
				<div class="colorPallet" style="background:#6ae6ec;" onclick="selectColorElement(4);"></div>
				<div class="colorPallet" style="background:#4c86f0;" onclick="selectColorElement(5);"></div>
				<div class="colorPallet" style="background:#cb9ffd;" onclick="selectColorElement(6);"></div>
				<div class="colorPallet" style="background:#00ab86;" onclick="selectColorElement(7);"></div>
				<div class="colorPallet" style="background:#329235;" onclick="selectColorElement(8);"></div>
				<div class="colorPallet" style="background:#323992;" onclick="selectColorElement(9);"></div>
				<div class="colorPallet" style="background:#b71fb5;" onclick="selectColorElement(10);"></div>
				<div class="colorPallet" style="background:#fce700;" onclick="selectColorElement(11);"></div>
				<div class="colorPallet" style="background:#ff0000;" onclick="selectColorElement(12);"></div>
			</div>
		</div>
	</form>
	<!-- 선택된 콘텐츠를 보여주는 영역 -->
	<div>
		<div class="cornerRound5" style="height: 20px; background-color: #d0d0d0; padding: 10px;">
			<div style="float: left;">
				<a href="javascript:setElementManagerMode('Element_SelectFunction')"><img id="repBtnFunction" src="/images/btn/btn_function_1.png" alt="Function" style="vertical-align: middle;"/></a>
				<span id="selectedFunction"></span>
			</div>
			<div style="float: right;">
				<a id="repButtonSend" href="javascript:makeElement()" style="display: none;"><img src="/images/btn/btn_make.png" alt="Make"/></a>
			</div>
		</div>
		<div class="cornerRound5" style="background-color: #ffffff; padding: 10px; min-height: 150px; margin-top: 5px;">
			<table border="0" cellspacing="0" cellpadding="0" style="width:100%">
				<thead>
					<tr>
						<td style="width: 49%"><a href="javascript:setElementManagerMode('Element_SelectInput')"><img id="repBtnProvider" src="/images/btn/btn_provider_1.png" alt="Provider"/></a></td>
						<td style="width: 10px;">&nbsp;</td>
						<td style="width: 49%"><a href="javascript:setElementManagerMode('Element_SelectOutput')"><img id="repBtnReceiver" src="/images/btn/btn_receiver_1.png" alt="Receiver"/></a></td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style="vertical-align: top; padding-top:5px;">
							<table style="width:100%; border:0px" cellspacing="0" id="repInputContents" ></table>
						</td>
						<td></td>
						<td style="vertical-align: top; padding-top:5px;">
							<table style="width:100%; border:0px" cellspacing="0" id="repOutputContents" ></table>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div style="margin-top: 3px;"><span>Provider, Receiver 선택 시 Ctrl 키를 누르고 선택하면 기존 목록에 추가 됩니다.</span></div>
	</div>
	<iframe id="ElementFrame" src="about:blank;" style="display: none; width:100%; height:50px;"></iframe>
</div>

<!-- Element List -->
<div id="elementListLayer" title="Element List" style="display:none;overflow:hidden;">
	<iframe name="elementListFrame" id="elementListFrame" src="about:blank" style="width:500px; height:200px;" scrolling="auto" frameborder="0"></iframe>
</div>

<!-- Service Unit 생성 Layer -->
<div id="serviceUnitLayer" title="Service Unit" style="display:none;">
	<div>
		<input type="hidden" name="unitSeq" value="-1" />
		<input type="hidden" name="color" value="0" />
		
		Service Unit Name <input type="text" id="serviceUnitName" name="serviceUnitName" style="width: 250px;" maxlength="100"/><br/>

		<div class="colorBox" style="clear:both;height:20px;padding:5px 0px 5px 0px;">
			<span style="float:left;padding-right:5px;">Service Unit Color</span>
			<div class="colorPallet borderOn" style="background:#ff9090;" onclick="selectColorUnit(0);"></div>
			<div class="colorPallet" style="background:#ff9148;" onclick="selectColorUnit(1);"></div>
			<div class="colorPallet" style="background:#ffe558;" onclick="selectColorUnit(2);"></div>
			<div class="colorPallet" style="background:#c4f998;" onclick="selectColorUnit(3);"></div>
			<div class="colorPallet" style="background:#6ae6ec;" onclick="selectColorUnit(4);"></div>
			<div class="colorPallet" style="background:#4c86f0;" onclick="selectColorUnit(5);"></div>
			<div class="colorPallet" style="background:#cb9ffd;" onclick="selectColorUnit(6);"></div>
			<div class="colorPallet" style="background:#00ab86;" onclick="selectColorUnit(7);"></div>
			<div class="colorPallet" style="background:#329235;" onclick="selectColorUnit(8);"></div>
			<div class="colorPallet" style="background:#323992;" onclick="selectColorUnit(9);"></div>
			<div class="colorPallet" style="background:#b71fb5;" onclick="selectColorUnit(10);"></div>
			<div class="colorPallet" style="background:#fce700;" onclick="selectColorUnit(11);"></div>
			<div class="colorPallet" style="background:#ff0000;" onclick="selectColorUnit(12);"></div>
		</div>
		<div style="height: 20px; background-color: #d0d0d0; padding: 10px;" class="cornerRound5">
			<div style="float: left;">
				<span>Unit으로 생성할 Element를 선택하세요</span>
			</div>
			<div style="float: right;">
				<a href="javascript:makeUnit()"><img src="/images/btn/btn_make.png" alt="Make"/></a>
			</div>
		</div>

	</div>
	<iframe name="elementSelectFrame" id="elementSelectFrame" src="about:blank" style="width:500px; height:200px;" scrolling="auto" frameborder="0"></iframe>
</div>

<!-- Unit List -->
<div id="unitListLayer" title="Unit List" style="display:none;overflow:hidden;">
	<iframe name="unitListFrame" id="unitListFrame" src="about:blank" style="width:500px; height:200px;" scrolling="auto" frameborder="0"></iframe>
</div>

<!-- Business Model -->
<div id="businessModelLayer" title="전략" style="display:none;overflow:hidden;">
	<iframe name="businessModelFrame" id="businessModelFrame" src="about:blank" style="width:500px; height:400px;" scrolling="auto" frameborder="0"></iframe>
</div>

<div id="debugInfo" style="padding-bottom:50px;display:none;">
	<div>
		<input type="button" value="Close debug info" onclick="$('#debugContent').val('');$('#debugInfo').hide();" />
	</div>
	<pre id="debugContent">
		
	</pre>
</div>
<%@ include file="/include/footerFront.jsp" %>
<%@ include file="/include/footer.jsp" %>
