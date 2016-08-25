<%
	/*============================================================================
	 * @ Description : SBP 목록 조회
	 *
	 * 작성일 : 2014.02.06
	 * 작성자 : 박병웅
	 * 수정 : 
	 ============================================================================*/
%>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/include/header.jsp" %>
<%@ include file="/sbp/hvm.jsp" %>
<%
// ?USER_SEQ=30&UNITED_USER_SEQ=20130722190536-8CE23A115E0C4CBA8739DC733B615181&USER_ID=venice&USER_PWD=db25f2fc14cd2d2b1e7af307241f548fb03c312a&USER_NAME=%EB%B0%95%EB%B3%91%EC%9B%85&PROJECT_PUID=20131022080634-A6C8254CFE1F4DA09D072CDFBF7BDDF7&PROJECT_NAME=PSSD%20%EA%B4%80%EB%A6%AC&AUTH_YN=Y

	JSONObject json = new JSONObject();

	JSONArray list = new JSONArray();
	json.put("list", list);

	String memberId = (String)session.getAttribute("memberid");
	
	PreparedStatement pstmt = null;
	ResultSet rs = null;
	String query = null;

	int idx = 1;
	int totalCount = 0;
	int num = 0;
	String where = memberId.equals(superAdmin) ? "" : " and member_id = ? ";
	//query = "select data_seq, is_meta, data_name, project_name, date_format( modify_date, '%Y.%m.%d %H:%i') modify_date from data where project_puid = ? " + where + " and is_meta = 'N' order by data_seq desc";
	query = "select  project_name, project_puid from data where 1=1 " + where +" group by project_name, project_puid";
	pstmt = conn.prepareStatement(query);
	if ( !memberId.equals(superAdmin) ) {
		pstmt.setString(idx++, memberId);
	}

	rs = pstmt.executeQuery();
	int loopCnt = 0;

	while(rs.next()){
		loopCnt++;
		JSONObject item = new JSONObject();
		list.put(item);
		item.put("project_name", dbutil.getString(rs, "project_name"));
		item.put("project_puid", dbutil.getString(rs, "project_puid"));
	}
	if(loopCnt == 0){
		json.put("code", "404");
	}

	out.println(json.toString(4));
%>
<%@ include file="/include/footer.jsp" %>