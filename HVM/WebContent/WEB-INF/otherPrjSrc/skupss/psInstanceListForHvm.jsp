<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.PropertiesLoader"%>
<%@page import="net.smartworks.skkupss.manager.impl.DocFileManagerImpl"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.skkupss.model.BizModelSpace"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="java.util.Date"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.SortingField"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.InstanceList"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.RequestParams"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
.selected {
	border:3px solid #00FF00;
}
</style>
<script>

	$('.hvm_select').live('click',function(e){
		var input = $(targetElement(e)).parents('.hvm_select');

		//$(input).siblings('.hvm_select').removeClass('selected');
		//$(input).addClass('selected');
		
		var psId = input.attr('psId');
		var psName = input.attr('psName');
		
		$('#selectedPssPrjId').val(input.attr('psId'));
		
		try {
	        console.log('$$$$$$$$$$$$$$$$$$POST MESSAGE TO PARENT$$$$$$$$$$$$$$$$$$$$$$$');
	        var message = "pssPrjSelect||" + psId + "||" + psName
	        console.log('$$$$$$$$$$$$$$$$$$POST MESSAGE TO PARENT$$$$$$$$$$$$$$$$$$$$$$$');
	        //parent.postMessage(message,"http://localhost:3000/parent");
	        parent.postMessage(message,"http://localhost:8080/HVM/index.html");
	        
            parent.postMessage(message,"http://great.smartworks.net/HVM/index.html");

            parent.postMessage(message,"http://www.smartworks.net/HVM/index.html");
	        
	        
		} catch(err) {
			console.log('ERROR!!');
			//console.log(err);
		}
		
	}) 

</script>
<input type="hidden" id="selectedPssPrjId" value="">
<%
	User cUser = SmartUtil.getCurrentUser();
	String PSS_PICTURE_URL = PropertiesLoader.loadPropByClassPath("/net/smartworks/conf/config.properties").getProperty("pss.picture.url");

	RequestParams params = (RequestParams)request.getAttribute("requestParams");
	if(SmartUtil.isBlankObject(params)){
		params = new RequestParams();
		params.setPageSize(20);
		params.setCurrentPage(1);
		String spaceType = request.getParameter("spaceType");
		if (SmartUtil.isBlankObject(spaceType)
				|| ProductService.getSpaceType(spaceType) > 100)
			params.setSpaceType(ProductService.PSS_SPACE_VALUE);
		else
			params.setSpaceType(spaceType);
	}

	InstanceList instanceList = null;
	try{
		instanceList = ManagerFactory.getInstance().getServiceManager().getProductInstanceList(params);
	}catch(Exception e){}
 %>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<!-- 목록 테이블 -->
<table>
	<%
		SortingField sortedField = null;
		int pageSize = 20, totalPages = 1, currentPage = 1;
		if (instanceList != null) {
			sortedField = instanceList.getSortedField();
			if (sortedField == null)
				sortedField = new SortingField();
	%>
		<tr class="tit_bg">
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span><fmt:message key="common.title.number"/></span>
			</th>
	 		<th class="r_line">
	 			<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_NAME%>"><fmt:message key="pss.title.product_service_name"/>
 			 		<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_NAME)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
 				</a>
				<span class="js_progress_span"></span>
			</th>
	 		<th class="r_line"  style="min-width:200px"><fmt:message key="common.title.desc"/></th>
	 		<th class="r_line">
				<form class="form_space js_space_name" name="frmSpaceName">
					<select name="selSpaceName" class="js_select_space_name">
						<option value="<%=ProductService.PSS_SPACE_VALUE%>" <%if (params.getSpaceType()
						.equals(ProductService.PSS_SPACE_VALUE)) {%>selected<%}%>><fmt:message key="pss.title.space.value"/></option>
						<option value="<%=ProductService.PSS_SPACE_PRODUCT_SERVICE%>" <%if (params.getSpaceType()
						.equals(ProductService.PSS_SPACE_PRODUCT_SERVICE)) {%>selected<%}%>><fmt:message key="pss.title.space.product_service"/></option>
						<option value="<%=ProductService.PSS_SPACE_PRODUCT%>" <%if (params.getSpaceType()
						.equals(ProductService.PSS_SPACE_PRODUCT)) {%>selected<%}%>><fmt:message key="pss.title.space.product"/></option>
						<option value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_SERVICE)) {%>selected<%}%>><fmt:message key="pss.title.space.service"/></option>
						<option value="<%=ProductService.PSS_SPACE_TOUCH_POINT%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_TOUCH_POINT)) {%>selected<%}%>><fmt:message key="pss.title.space.touch_point"/></option>
						<option value="<%=ProductService.PSS_SPACE_CUSTOMER%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_CUSTOMER)) {%>selected<%}%>><fmt:message key="pss.title.space.customer"/></option>
						<option value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_BIZ_MODEL)) {%>selected<%}%>><fmt:message key="pss.title.space.biz_model"/></option>
						<option value="<%=ProductService.PSS_SPACE_ACTOR%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_ACTOR)) {%>selected<%}%>><fmt:message key="pss.title.space.actor"/></option>
						<option value="<%=ProductService.PSS_SPACE_SOCIETY%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_SOCIETY)) {%>selected<%}%>><fmt:message key="pss.title.space.society"/></option>
						<option value="<%=ProductService.PSS_SPACE_CONTEXT%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_CONTEXT)) {%>selected<%}%>><fmt:message key="pss.title.space.context"/></option>
						<option value="<%=ProductService.PSS_SPACE_TIME%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_TIME)) {%>selected<%}%>><fmt:message key="pss.title.space.time"/></option>
						<option value="<%=ProductService.PSS_SPACE_ENVIRONMENT%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_ENVIRONMENT)) {%>selected<%}%>><fmt:message key="pss.title.space.environment"/></option>
					</select>
					<span class="js_progress_span"></span>
				</form>
			</th>
			<th class="r_line" style="width:145px">
				<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_LAST_MODIFIED_USER%>"><fmt:message key='common.title.last_modifier' />
					<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_LAST_MODIFIED_USER)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
				</a>/
				<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_LAST_MODIFIED_DATE%>"><fmt:message key='common.title.last_modified_date' />
					<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_LAST_MODIFIED_DATE)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
				</a>
				<span class="js_progress_span"></span>
			</th>		
		</tr>	
	<%
		pageSize = instanceList.getPageSize();
		totalPages = instanceList.getTotalPages();
		currentPage = instanceList.getCurrentPage();
		int currentCount = instanceList.getTotalSize()-(currentPage-1)*pageSize;
		if(instanceList.getInstanceDatas() != null) {
			ProductService[] productServices = (ProductService[]) instanceList.getInstanceDatas();
			for (ProductService productService : productServices) {
				productService.setSpaceType(ProductService.getSpaceType(params.getSpaceType()));
				User lastModifier = (productService.getLastModifiedUser()==null)?productService.getCreatedUser():productService.getLastModifiedUser();
				LocalDate lastModifiedDate = productService.getLastModifiedDate();
			%>
				<tr class="instance_list hvm_select" psId="<%=productService.getId()%>" psName="<%=productService.getName()%>">
					<td class="tc"><input class="js_check_instance" name="chkSelectInstance" type="checkbox"/></td>
					<td class="tc"><%=currentCount--%></td>
					<td class="tc">
						<img class="vt up" <%if (!SmartUtil.isBlankObject(productService
								.getPicture())) {%> src="<%=PSS_PICTURE_URL
									+ productService.getPicture()%>"<%}%> style="width:158px<%if (SmartUtil
								.isBlankObject(productService.getPicture())) {%>;height:158px<%}%>" />
						<div><%=CommonUtil.toNotNull(productService.getName())%></div>
					</td>
					<td class="tl vt">
						<textarea readonly><%=CommonUtil.toNotNull(productService.getDesc())%></textarea>
					</td>
					<td class="vt">
						<select name="selSpaceName" class="fr select_item_space_name js_select_item_space_name" style="visibility:hidden;margin-bottom:5px">
							<option value="<%=ProductService.PSS_SPACE_VALUE%>" <%if (params.getSpaceType()
							.equals(ProductService.PSS_SPACE_VALUE)) {%>selected<%}%>><fmt:message key="pss.title.space.value"/></option>
							<option value="<%=ProductService.PSS_SPACE_PRODUCT_SERVICE%>" <%if (params.getSpaceType()
							.equals(ProductService.PSS_SPACE_PRODUCT_SERVICE)) {%>selected<%}%>><fmt:message key="pss.title.space.product_service"/></option>
							<option value="<%=ProductService.PSS_SPACE_PRODUCT%>" <%if (params.getSpaceType()
							.equals(ProductService.PSS_SPACE_PRODUCT)) {%>selected<%}%>><fmt:message key="pss.title.space.product"/></option>
							<option value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_SERVICE)) {%>selected<%}%>><fmt:message key="pss.title.space.service"/></option>
							<option value="<%=ProductService.PSS_SPACE_TOUCH_POINT%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_TOUCH_POINT)) {%>selected<%}%>><fmt:message key="pss.title.space.touch_point"/></option>
							<option value="<%=ProductService.PSS_SPACE_CUSTOMER%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_CUSTOMER)) {%>selected<%}%>><fmt:message key="pss.title.space.customer"/></option>
							<option value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_BIZ_MODEL)) {%>selected<%}%>><fmt:message key="pss.title.space.biz_model"/></option>
							<option value="<%=ProductService.PSS_SPACE_ACTOR%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_ACTOR)) {%>selected<%}%>><fmt:message key="pss.title.space.actor"/></option>
							<option value="<%=ProductService.PSS_SPACE_SOCIETY%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_SOCIETY)) {%>selected<%}%>><fmt:message key="pss.title.space.society"/></option>
							<option value="<%=ProductService.PSS_SPACE_CONTEXT%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_CONTEXT)) {%>selected<%}%>><fmt:message key="pss.title.space.context"/></option>
							<option value="<%=ProductService.PSS_SPACE_TIME%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_TIME)) {%>selected<%}%>><fmt:message key="pss.title.space.time"/></option>
							<option value="<%=ProductService.PSS_SPACE_ENVIRONMENT%>" <%if (params.getSpaceType().equals(
							ProductService.PSS_SPACE_ENVIRONMENT)) {%>selected<%}%>><fmt:message key="pss.title.space.environment"/></option>
						</select>
						<div class="js_view_space_target">
						<%
							switch (productService.getSpaceType()) {
										case ProductService.SPACE_TYPE_VALUE:
											request.setAttribute("valueSpace",
													productService.getValueSpace());
						%>
							<jsp:include page="viewValueSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_PRODUCT_SERVICE:
											request.setAttribute("productServiceSpace",
													productService.getProductServiceSpace());
						%>
							<jsp:include page="viewProductServiceSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_PRODUCT:
											request.setAttribute("productSpace",
													productService.getProductSpace());
						%>
							<jsp:include page="viewProductSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_SERVICE:
											request.setAttribute("serviceSpace",
													productService.getServiceSpace());
						%>
							<jsp:include page="viewServiceSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_TOUCH_POINT:
											request.setAttribute("touchPointSpace",
													productService.getTouchPointSpace());
						%>
							<jsp:include page="viewTouchPointSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_CUSTOMER:
											request.setAttribute("customerSpace",
													productService.getCustomerSpace());
						%>
							<jsp:include page="viewCustomerSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_BIZ_MODEL:
											request.setAttribute("bizModelSpace",
													productService.getBizModelSpace());
						%>
							<jsp:include page="viewBizModelSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_ACTOR:
											request.setAttribute("actorSpace",
													productService.getActorSpace());
						%>
							<jsp:include page="viewActorSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_SOCIETY:
											request.setAttribute("societySpace",
													productService.getSocietySpace());
						%>
							<jsp:include page="viewSocietySpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_CONTEXT:
											request.setAttribute("contextSpace",
													productService.getContextSpace());
						%>
							<jsp:include page="viewContextSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_TIME:
											request.setAttribute("timeSpace",
													productService.getTimeSpace());
						%>
							<jsp:include page="viewTimeSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										case ProductService.SPACE_TYPE_ENVIRONMENT:
											request.setAttribute("environmentSpace",
													productService.getEnvironmentSpace());
						%>
							<jsp:include page="viewEnvironmentSpace.jsp">
								<jsp:param value="<%=productService.getId()%>" name="psId"/>
							</jsp:include>
						<%
							break;
										}
						%>
						</div>
					</td>
					<td class="vt">
						<div class="noti_pic">
							<%if(lastModifier!=null){ %>
								<img class="profile_size_m mb3 mr3" src="<%=lastModifier.getMinPicture()%>" title="<%=lastModifier.getLongName()%>"/></div>
							<%} %>
						<div class="noti_in_s">
							<%if(lastModifier!=null){ %>
 								<span class="t_name"><%=lastModifier.getLongName()%></span>
 							<%
							}
 							if (productService.getLastModifiedDate() != null) {
 							%>
 								<div class="t_date"><%=lastModifiedDate.toLocalString()%></div>
 							<%
 							}
 							%>
 						</div>
					</td>
				</tr>
				<!-- 인스턴스 인라인 조회 및 편집 화면 -->
				<tr style="display:none"><td class="inline_content js_content_target js_stop_propagation" colspan="6"></td></tr>
	<%
		}
			}
		} else {
			sortedField = new SortingField();
	%>
		<tr class="tit_bg">
			<th class="check r_line"><input type="checkbox" class="js_toggle_select_all" /></th>
	 		<th class="r_line" style="width:40px;">
				<span><fmt:message key="common.title.number"/></span>
			</th>
	 		<th class="r_line">
	 			<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_NAME%>"><fmt:message key="pss.title.product_service_name"/>
 			 		<span class="<%if (sortedField.getFieldId().equals(ProductService.FIELD_NAME)) {
					if (sortedField.isAscending()) {%>icon_in_up<%} else {%>icon_in_down<%}
				}%>"></span>
				<span class="js_progress_span"></span>
			</th>
	 		<th class="r_line"  style="min-width:200px"><fmt:message key="common.title.desc"/></th>
	 		<th class="r_line">
				<form class="form_space js_space_name" name="frmSpaceName">
					<select name="selSpaceName" class="js_select_space_name">
						<option value="<%=ProductService.PSS_SPACE_VALUE%>" <%if (params.getSpaceType()
						.equals(ProductService.PSS_SPACE_VALUE)) {%>selected<%}%>><fmt:message key="pss.title.space.value"/></option>
						<option value="<%=ProductService.PSS_SPACE_PRODUCT_SERVICE%>" <%if (params.getSpaceType()
						.equals(ProductService.PSS_SPACE_PRODUCT_SERVICE)) {%>selected<%}%>><fmt:message key="pss.title.space.product_service"/></option>
						<option value="<%=ProductService.PSS_SPACE_PRODUCT%>" <%if (params.getSpaceType()
						.equals(ProductService.PSS_SPACE_PRODUCT)) {%>selected<%}%>><fmt:message key="pss.title.space.product"/></option>
						<option value="<%=ProductService.PSS_SPACE_SERVICE%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_SERVICE)) {%>selected<%}%>><fmt:message key="pss.title.space.service"/></option>
						<option value="<%=ProductService.PSS_SPACE_TOUCH_POINT%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_TOUCH_POINT)) {%>selected<%}%>><fmt:message key="pss.title.space.touch_point"/></option>
						<option value="<%=ProductService.PSS_SPACE_CUSTOMER%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_CUSTOMER)) {%>selected<%}%>><fmt:message key="pss.title.space.customer"/></option>
						<option value="<%=ProductService.PSS_SPACE_BIZ_MODEL%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_BIZ_MODEL)) {%>selected<%}%>><fmt:message key="pss.title.space.biz_model"/></option>
						<option value="<%=ProductService.PSS_SPACE_ACTOR%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_ACTOR)) {%>selected<%}%>><fmt:message key="pss.title.space.actor"/></option>
						<option value="<%=ProductService.PSS_SPACE_SOCIETY%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_SOCIETY)) {%>selected<%}%>><fmt:message key="pss.title.space.society"/></option>
						<option value="<%=ProductService.PSS_SPACE_CONTEXT%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_CONTEXT)) {%>selected<%}%>><fmt:message key="pss.title.space.context"/></option>
						<option value="<%=ProductService.PSS_SPACE_TIME%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_TIME)) {%>selected<%}%>><fmt:message key="pss.title.space.time"/></option>
						<option value="<%=ProductService.PSS_SPACE_ENVIRONMENT%>" <%if (params.getSpaceType().equals(
						ProductService.PSS_SPACE_ENVIRONMENT)) {%>selected<%}%>><fmt:message key="pss.title.space.environment"/></option>
					</select>
					<span class="js_progress_span"></span>
				</form>
			</th>
			<th class="r_line" style="width:162px;">
				<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_LAST_MODIFIED_USER%>"><fmt:message key='common.title.last_modifier' />
					<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_LAST_MODIFIED_USER)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
				</a>
				<a href="" class="js_select_field_sorting" fieldId="<%=ProductService.FIELD_LAST_MODIFIED_DATE%>"><fmt:message key='common.title.last_modified_date' />
					<span class="<%if(sortedField.getFieldId().equals(ProductService.FIELD_LAST_MODIFIED_DATE)){
						if(sortedField.isAscending()){ %>icon_in_up<%}else{ %>icon_in_down<%}}%>"></span>
				</a>
				<span class="js_progress_span"></span>
			</th>		
		</tr>	
	<%
			}
		%>
</table>
<!-- 목록 테이블 //-->
<%
	if (instanceList == null
			|| SmartUtil.isBlankObject(instanceList.getInstanceDatas())) {
%>
	<div class="tc mt5mb5"><fmt:message key="common.message.no_instance"/></div>
<%
	}
	if (!SmartUtil.isBlankObject(sortedField)) {
%>
	<form name="frmSortingField">
		<input name="hdnSortingFieldId" type="hidden" value="<%=sortedField.getFieldId()%>">
		<input name="hdnSortingIsAscending" type="hidden" value="<%=sortedField.isAscending()%>">
	</form>
<%
	}
%>
<form name="frmInstanceListPaging">
	<!-- 페이징 -->
	<div class="paginate">
		<%
			if (currentPage > 0 && totalPages > 0 && currentPage <= totalPages) {
				boolean isFirst10Pages = (currentPage <= 10) ? true : false;
				boolean isLast10Pages = (((currentPage - 1) / 10) == ((totalPages - 1) / 10)) ? true
						: false;
				int startPage = ((currentPage - 1) / 10) * 10 + 1;
				int endPage = isLast10Pages ? totalPages : startPage + 10 - 1;
				if (!isFirst10Pages) {
		%>
				<a class="pre_end js_select_paging" href="" title="<fmt:message key='common.title.first_page'/>">
					<span class="spr"></span>
					<input name="hdnPrevEnd" type="hidden" value="false"> 
				</a>		
				<a class="pre js_select_paging" href="" title="<fmt:message key='common.title.prev_10_pages'/> ">
					<span class="spr"></span>
					<input name="hdnPrev10" type="hidden" value="false">
				</a>
			<%
				}
					for (int num = startPage; num <= endPage; num++) {
						if (num == currentPage) {
			%>
					<strong><%=num%></strong>
					<input name="hdnCurrentPage" type="hidden" value="<%=num%>"/>
				<%
					} else {
				%>
					<a class="num js_select_current_page" href=""><%=num%></a>
				<%
					}
						}
						if (!isLast10Pages) {
				%>
				<a class="next js_select_paging" title="<fmt:message key='common.title.next_10_pages'/> ">
					<span class="spr"></span>
					<input name="hdnNext10" type="hidden" value="false"/>
				</a>
				<a class="next_end js_select_paging" title="<fmt:message key='common.title.last_page'/> ">
					<span class="spr"><input name="hdnNextEnd" type="hidden" value="false"/></span> 
				</a>
		<%
			}
			}
		%>
		<span class="js_progress_span"></span>
	</div>
	<div class="title_line_btns">

		<div class="num_box">
			<span class="js_progress_span"></span> 
			<select	class="js_select_page_size" name="selPageSize" style="font-size:15px;margin-bottom:2px" title="<fmt:message key='common.title.count_in_page'/>">
				<option <%if (pageSize == 20) {%> selected <%}%>>20</option>
				<option <%if (pageSize == 30) {%> selected <%}%>>30</option>
				<option <%if (pageSize == 50) {%> selected <%}%>>50</option>
				<option <%if (pageSize == 100) {%> selected <%}%>>100</option>
			</select>
			&nbsp<a href="#" class="wrap_top"><fmt:message key="pss.button.goto_top"/>▲</a>
		</div>
	</div>

	<!-- 페이징 //-->
</form>
