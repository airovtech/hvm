<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/include/header.jsp" %>
<%
	//HVM 관련 추가 내용
	String hvm = "true";//(String)request.getParameter("hvm");
	if (hvm != null && hvm.equalsIgnoreCase("true")) {
		loginID = "sbpAdmin";
		session.setAttribute("memberid", loginID);
		//isLogin = Boolean.parseBoolean((String)request.getParameter("isLogin"));
		isLogin = true;
		session.setAttribute("isLogin", isLogin);
		sPUID = (String)request.getParameter("sPUID");
		session.setAttribute("sPUID", sPUID);
		session.setAttribute("projectPUID", sPUID);
		sProjectName = (String)request.getParameter("sProjectName");
		session.setAttribute("sProjectName", sProjectName);
		session.setAttribute("projectName", sProjectName);
	}
	//HVM 
%>
<%@ include file="/include/needLogin.jsp" %>
<%@ include file="/include/headerFront.jsp" %>
<%@ include file="/include/topForHvm.jsp" %>
<%
	String memberId = (String)session.getAttribute("memberid");

	String panelPath = "/sbp/panel8.jsp";
	
	
	
	//HVM 관련 추가 내용
//	if (hvm != null && hvm.equalsIgnoreCase("true")) {
panelPath = "/sbp/panel8ForHvm.jsp?memberId=sbpAdmin&sPUID="+sPUID+"&sProjectName="+sProjectName;
//	}
	//HVM


	//재구 테스트 페이지 접근을 위한 소스 추가 라인 11~14
	if(memberId.equals("ragnos")){
		panelPath = "/sbp/panel8.jsp";
	} else if(memberId.equals("venice")){	// 박병웅 작업중.
		panelPath = "/sbp/panel8.jsp";
	}
%>
<script type="text/javascript">
function show(num, title, projectName){
	var f = document.frm;
	f.seq.value = num;
	f.docTitle.value = title;
	f.projectName.value = projectName;
	f.action = "<%=panelPath%>";
	f.submit();
}

function goDelete(seq){
	if(!confirm("삭제하시겠습니까?")){
		return;
	}

	var f = document.frm;

	f.seq.value = seq;
	
	f.mode.value = "delete";
	f.action = "/sbp/list_proc.jsp";
	f.submit();
}
</script>
<div id="content" style="padding-left:10px;">
<form name="frm" method="post" action="<%=panelPath%>">
	<div>
		<input type="hidden" name="mode" />
		<input type="hidden" name="seq" />
		<input type="hidden" name="docTitle" />
		<input type="hidden" name="projectName" />
	</div>
</form>

<img src="/images/text/title_designadmin.gif" alt="Service Blueprint 불러오기" style="margin:10px 0px 0px 0px;" />
<h3>Project Name : <%=sProjectName%></h3>
<!--PUID : <%=sPUID%>-->
<%
	//DB 연결
	PreparedStatement pstmt = null;
	ResultSet rs = null;
	String query = null;

	// Var
	int _currPage = ju.getIntParam("_currPage");
	if(_currPage == 0) _currPage = 1;

	try {
		int idx = 1;
		int totalCount = 0;
		int num = 0;
		String where = memberId.equals(superAdmin) ? "" : " and member_id = ? ";
		//String where = "";
		
		query = "select count(*) cnt from data where project_puid = ?" + where;
		pstmt = conn.prepareStatement(query);
		pstmt.setString(idx++, sPUID);
		if ( !memberId.equals(superAdmin) ) {
			pstmt.setString(idx++, memberId);
		}
		rs = pstmt.executeQuery();

		if(rs.next()){
			totalCount = dbutil.getInt(rs, "cnt");
			num = totalCount - ((_currPage-1) * 10);
		}
		dbutil.closeRs(rs);

		idx = 1;
		query = "select data_seq, is_meta, data_name, project_name, date_format( modify_date, '%Y.%m.%d %H:%i') modify_date from data where project_puid = ? " + where + " and is_meta = 'N' order by data_seq desc";

		query = dbutil.getPageQueryMySQL(query, _currPage, 10);
		pstmt = conn.prepareStatement(query);
		pstmt.setString(idx++, sPUID);
		if ( !memberId.equals(superAdmin) ) {
			pstmt.setString(idx++, memberId);
		}

		rs = pstmt.executeQuery();
%>
	<table class="table_list" style="width:100%;">
	<colgroup>
		<col width="50" />
		<!--col width="170" /-->
		<col />
		<col width="170" />
		<col width="50" />
	</colgroup>
	<tr>
		<th><img src="/images/text/table_title_no.gif" alt="No" /></th>
		<!--th><img src="/images/text/pjname.jpg" alt="Project name" /></th-->
		<th><img src="/images/text/table_title_title.gif" alt="제목" /></th>
		<th><img src="/images/text/table_title_mdate.gif" alt="최근 수정일" /></th>
		<th><img src="/images/text/table_title_del.gif" alt="삭제" /></th>
	</tr>
<%
		int loopCnt = 0;
		while(rs.next()){
%>
	<tr>
		<td class="txt_c">
			<a href="#" onclick="javascript:show('<%=dbutil.getString(rs, "data_seq")%>', '<%=StringUtil.xmlEncode(dbutil.getString(rs, "data_name"))%>', '<%=StringUtil.xmlEncode(dbutil.getString(rs, "project_name"))%>')"><%=num%></a>
		</td>
		<!--td class="txt_c"><a href="#" onclick="javascript:show('<%=dbutil.getString(rs, "data_seq")%>', '<%=StringUtil.xmlEncode(dbutil.getString(rs, "data_name"))%>', '<%=StringUtil.xmlEncode(dbutil.getString(rs, "project_name"))%>')"><%=StringUtil.xmlEncode(dbutil.getString(rs, "project_name"))%></a></td-->
		<td class="txt_l10"><a href="#" onclick="javascript:show('<%=dbutil.getString(rs, "data_seq")%>', '<%=StringUtil.xmlEncode(dbutil.getString(rs, "data_name"))%>', '<%=StringUtil.xmlEncode(dbutil.getString(rs, "project_name"))%>')"><%=dbutil.getString(rs, "data_name")%></a></td>
		<td class="txt_c"><%=dbutil.getString(rs, "modify_date")%></td>
		<td class="txt_c"><a href="#" onclick="javascript:goDelete('<%=dbutil.getString(rs, "data_seq")%>')"><img src="/images/btn/btn_del.gif" alt="삭제" style="vertical-align:middle;" /></a></td>
	</tr>
<%
			loopCnt++;
			num--;
		}
		if(loopCnt == 0){
%>
	<tr>
		<td colspan="5" style="text-align:center;line-height:70px;">목록이 없습니다.</td>
	</tr>
<%
		}
%>
	</table>
	<div class="paging" style="padding-top:20px;">
		<%hu.printDividedPage("/sbp/listForHvm.jsp?hvm=true&sPUID="+sPUID+"&sProjectName="+sProjectName, totalCount, _currPage, 10, 10);%>
	</div>
<%
	} catch(Exception e) {
		logWriter.trace(e);
		if(Config.CURRENT_LOG_LEVEL == ConstVars.LOG_LEVEL_DEBUG){
			out.println("<pre>");
			e.printStackTrace(new PrintWriter(out));
			out.println("</pre>");
		}
	}
	finally {
		dbutil.closeRs(rs);
		dbutil.closeStmt(pstmt);
	}
%>
</div>
<%@ include file="/include/footerFront.jsp" %>
<%@ include file="/include/footer.jsp" %>
