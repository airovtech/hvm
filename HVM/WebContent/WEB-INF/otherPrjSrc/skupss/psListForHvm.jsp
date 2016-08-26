<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.User"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<script type="text/javascript">
try{
	getIntanceList = function(paramsJson, progressSpan, isGray){
		if(isEmpty(progressSpan))
			progressSpan = $('.js_work_list_title').find('.js_progress_span:first');
		if(isGray)
			smartPop.progressContGray(progressSpan);
		else
			smartPop.progressCont(progressSpan);
		console.log(JSON.stringify(paramsJson));
		var url = "set_instance_list_params.sw";
		$.ajax({
			url : url,
			contentType : 'application/json',
			type : 'POST',
			data : JSON.stringify(paramsJson),
			success : function(data, status, jqXHR) {
				$('#iwork_instance_list_page').html(data);
				smartPop.closeProgress();
			},
			error : function(xhr, ajaxOptions, thrownError) {
				smartPop.closeProgress();
				smartPop.showInfo(smartPop.ERROR, smartMessage.get('workListError'), null, thrownError);
			}
		});
	};
	
	selectListParam = function(progressSpan, isGray){
		var iworkList = $('.js_iwork_list_page');
		var forms = iworkList.find('form:visible');
		var paramsJson = {};
		var isUserMode = iworkList.attr('isUserMode');
		paramsJson["isUserMode"] = isUserMode;
		var workId = iworkList.attr('workId');
		paramsJson["href"] = "psInstanceListForHvm.jsp";
		console.log('forms=', forms);
		for(var i=0; i<forms.length; i++){
			var form = $(forms[i]);
			paramsJson[form.attr('name')] = mergeObjects(form.serializeObject(), SmartWorks.GridLayout.serializeObject(form));
		}
		if(isEmpty(progressSpan)) progressSpan = iworkList.find('.js_search_filter_page').next('span.js_progress_span:first');
		getIntanceList(paramsJson, progressSpan, isGray);		
	};
}catch(error){
	smartPop.showInfo(smartPop.ERROR, smartMessage.get('technicalProblemOccured') + '[iwork script]', null, error);
}

</script>

<%
	User cUser = SmartUtil.getCurrentUser();
	String spaceType = request.getParameter("spaceType");
	Boolean viewFrom = Boolean.parseBoolean(request.getParameter("hvm"));
	
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!-- 컨텐츠 레이아웃-->
<div class="section_portlet js_iwork_list_page js_work_list_page">
	<div class="portlet_t"><div class="portlet_tl"></div></div>
	<div class="portlet_l" style="display: block;">
		<ul class="portlet_r" style="display: block;">
			<!-- 타이틀 -->
			<div class="body_titl"></div>
			<!-- 목록영역  -->
			<div class="contents_space">
				<div>
					<!-- 목록보기 타이틀-->
					<div class="list_title_space js_work_list_title mt15">
						<div class="title_line_btns">
						</div>
						<div class="title_line_options">
							<form class="form_space po_left js_form_filter_name" name="frmIworkFilterName">
								<select name="selFilterName" class="js_select_search_filter">
								<option>
										<fmt:message key='filter.name.all_instances' />
									</option>
<%-- 									<%
									SearchFilterInfo[] filters = work.getSearchFilters();
									if (filters != null) {
										for (SearchFilterInfo filter : filters) {
											if(SmartUtil.isBlankObject(filter.getId())) continue;
									%>
											<option class="js_custom_filter" value="<%=filter.getId()%>" <%if(filter.getId().equals(selectedFilterId)){%> selected <%} %>><%=CommonUtil.toNotNull(filter.getName())%></option>
									<%
										}
									}
									%>
 --%>								</select>
							</form>
							<form name="frmSearchInstance" class="po_left ml10"> 
								<div class="srch_wh srch_wsize" style="display:inline-block;vertical-align:middle">
									<input name="txtSearchInstance" class="nav_input" value="" type="text" placeholder="<fmt:message key='search.search_instance'/>">
									<button title="<fmt:message key='search.search_instance'/>" onclick="selectListParam($('.js_work_list_title').find('.js_progress_span:first'), false);return false;"></button>
								</div>
							</form>
							<span class="js_progress_span"></span>
						</div>
					</div>
					<!-- 목록보기 타이틀-->

					<!-- 상세필터 및 새업무등록하기 화면 -->
					<div id="search_filter" class="filter_section js_new_work_form"></div>
					<!-- 상세필터 -->

					<!-- 목록 테이블 -->
					<div class="list_contents">
						<div id='iwork_instance_list_page' >
 							<jsp:include page="psInstanceListForHvm.jsp">
 								<jsp:param value="<%=spaceType %>" name="spaceType"/>
 							</jsp:include>
						</div>
					</div>
					<!-- 목록 테이블 //-->
				</div>
				<!-- 목록 보기 -->
			</div>
			<!-- 목록영역 // -->
		</ul>
	</div>
	<div class="portlet_b" style="display: block;"></div>
</div>
<!-- 컨텐츠 레이아웃//-->



