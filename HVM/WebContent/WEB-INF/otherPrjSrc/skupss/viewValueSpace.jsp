<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.factory.ManagerFactory"%>
<%@page import="net.smartworks.skkupss.model.ProductService"%>
<%@page import="net.smartworks.skkupss.model.ValueSpace"%>
<%@page import="net.smartworks.util.CommonUtil"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="net.smartworks.skkupss.model.ServiceSpace"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%
 
	User cUser = SmartUtil.getCurrentUser();

	ValueSpace valueSpace = (ValueSpace)request.getAttribute("valueSpace");
	String psId = request.getParameter("psId");
	if(!SmartUtil.isBlankObject(psId)){

		ProductService productService = null;
		try{
			productService = ManagerFactory.getInstance().getServiceManager().getProductService(psId, ProductService.SPACE_TYPE_VALUE);
		}catch(Exception e){}
		if(!SmartUtil.isBlankObject(productService)) valueSpace = productService.getValueSpace();
	}
	String isEditModeStr = request.getParameter("isEditMode");
	boolean isEditMode = SmartUtil.isBlankObject(isEditModeStr) || !isEditModeStr.equalsIgnoreCase("true") ? false : true;
	if(SmartUtil.isBlankObject(valueSpace)) valueSpace = new ValueSpace();;

	String[] values = null;
%>
<fmt:setLocale value="<%=cUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />
 	 
<!-- 컨텐츠 레이아웃-->
<div class="js_space_tab js_value_space" spaceType="<%=ProductService.SPACE_TYPE_VALUE%>">
	<div class="js_dummy_element_item" style="display:none">
		<div class="edit_item js_element_item" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
			<span class="js_view_element_item" style="display:none">
				<span class="js_action_element_item"></span>
				<span class="edit_actions">
					<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
					<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
				</span>
			</span>
			<input class="fieldline js_edit_element_item" name="" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
		</div>
	</div>
	<table class="tc" style="width:640px;min-height:200px;margin-left:auto;margin-right:auto;">
		<tr>
			<th style="width:12.5%;height:0;border-bottom:none"></th>
			<th style="width:12.5%;height:0;border-bottom:none"></th>
			<th style="width:12.5%;height:0;border-bottom:none"></th>
			<th style="width:12.5%;height:0;border-bottom:none"></th>
			<th style="width:12.5%;height:0;border-bottom:none"></th>
			<th style="width:12.5%;height:0;border-bottom:none"></th>
			<th style="width:12.5%;height:0;border-bottom:none"></th>
			<th style="width:12.5%;height:0;border-bottom:none"></th>
		</tr>
		<tr>
			<td colspan="8" style="height:20px;border-bottom:none;padding-bottom:0">
				<div class="tc" style="margin: 0px 270px;background-color: rgb(253, 125, 253);border: black 2px solid;font-size: 11px;">PSS Values</div>
				<div style="float:left;width:50%;height:7px;border-right:black 2px solid"></div>
			</td>
		</tr>
		<tr>
			<td class="vt edit_action" colspan="1" style="height:100%;padding:0;border-bottom:none">
				<div style="float:right;width:50%;border-top:black 2px solid;border-left: black 2px solid;height: 7px;"></div>
				<div class="tc" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: yellow;line-height: 12px;">Ecological Value</div>
				<div>
					<%
					values = valueSpace.getEcological();
					for(int i=0; values!=null && i<values.length; i++){
					%>
						<div class="edit_item js_element_item" itemName="Ecological" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
							<span class="js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>js_action_select_value"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								<%
								}
								%>
							</span>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtEcologicalItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
							<%
							}
							%>
						</div>
					<%
					}
					if(SmartUtil.isBlankObject(values) && isEditMode){
					%>
						<div class="edit_item js_element_item" itemName="Ecological" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
							<span class="js_view_element_item" style="display:none">
								<span class="js_action_element_item"></span>
								<span class="edit_actions">
									<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
									<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
								</span>
							</span>
							<input class="fieldline js_edit_element_item" name="txtEcologicalItem" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
						</div>
					<%
					}
					%>
				</div>
			</td>
			<td class="vt edit_action" colspan="1" style="height:100%;padding:0;border-bottom:none">
				<div style="float:left;width:100%;border-top:black 2px solid"></div>
				<div style="float:left;width:50%;border-right: black 2px solid;height: 7px;"></div>
				<div class="tc" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: yellow;line-height: 12px;">Economical Value</div>
				<div>
					<%
					values = valueSpace.getEconomical();
					for(int i=0; values!=null && i<values.length; i++){
					%>
						<div class="edit_item js_element_item" itemName="Economical" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
							<span class="js_view_element_item">
								<span class="<%if(isEditMode){ %>js_action_element_item<%}%>js_action_select_value"><%=CommonUtil.toNotNull(values[i]) %></span>
								<%
								if(isEditMode){
								%>
									<span class="edit_actions">
										<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
										<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
									</span>
								<%
								}
								%>
							</span>
							<%
							if(isEditMode){
							%>
								<input class="fieldline js_edit_element_item" name="txtEconomicalItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
							<%
							}
							%>
						</div>
					<%
					}
					if(SmartUtil.isBlankObject(values) && isEditMode){
					%>
						<div class="edit_item js_element_item" itemName="Economical" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
							<span class="js_view_element_item" style="display:none">
								<span class="js_action_element_item"></span>
								<span class="edit_actions">
									<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
									<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
								</span>
							</span>
							<input class="fieldline js_edit_element_item" name="txtEconomicalItem" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
						</div>
					<%
					}
					%>
				</div>
			</td>
			<td class="vt edit_action" colspan="6" style="height:100%;padding:0;border-bottom:none">
				<div style="float:left;width:50%;border-top:black 2px solid;border-right: black 2px solid;height: 7px;"></div>
				<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px 200px;background-color: yellow;line-height: 12px;margin-bottom:0">Experience Value</div>
				<div style="float:left;width:50%;height:7px;border-right:black 2px solid"></div>
				<table class="tc" style="width:100%;height:100%">
					<tr>
						<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
						<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
						<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
						<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
						<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
						<th style="width:16.6%;height:0;border-bottom:none;padding:0"></th>
					</tr>
					<tr>
						<td colspan="2"  style="height:100%;padding:0;border-bottom:none">
							<div style="float:right;width:50%;border-top:black 2px solid;border-left: black 2px solid;height: 7px;"></div>
							<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px 40px 0;background-color: rgb(252, 220, 247);line-height: 16px;">Extrinsic</div>
							<div style="float:left;width:50%;height:7px;border-right:black 2px solid"></div>
						</td>
						<td colspan="4"  style="height:100%;padding:0;border-bottom:none">
							<div style="float:left;width:50%;border-top:black 2px solid;border-right: black 2px solid;height: 7px;"></div>
							<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px 120px 0;background-color: rgb(252, 220, 247);line-height: 16px;">Intrinsic</div>
							<div style="float:left;width:50%;height:7px;border-right:black 2px solid"></div>
						</td>
					</tr>
					<tr>
						<td style="height:100%;padding:0;border-bottom:none">
							<div style="float:right;width:50%;border-top:black 2px solid;border-left: black 2px solid;height: 7px;"></div>
							<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px;height:24px"><span style="position: relative;top: 7px;">Function</span></div>
							<div>
								<%
								values = valueSpace.getFunction();
								for(int i=0; values!=null && i<values.length; i++){
								%>
									<div class="edit_item js_element_item" itemName="Function" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item">
											<span class="<%if(isEditMode){ %>js_action_element_item<%}%>js_action_select_value"><%=CommonUtil.toNotNull(values[i]) %></span>
											<%
											if(isEditMode){
											%>
												<span class="edit_actions">
													<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
													<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
												</span>
											<%
											}
											%>
										</span>
										<%
										if(isEditMode){
										%>
											<input class="fieldline js_edit_element_item" name="txtFunctionItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
										<%
										}
										%>
									</div>
								<%
								}
								if(SmartUtil.isBlankObject(values) && isEditMode){
								%>
									<div class="edit_item js_element_item" itemName="Function" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item" style="display:none">
											<span class="js_action_element_item"></span>
											<span class="edit_actions">
												<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
												<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
											</span>
										</span>
										<input class="fieldline js_edit_element_item" name="txtFunctionItem" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
									</div>
								<%
								}
								%>
							</div>
						</td>
						<td style="height:100%;padding:0;border-bottom:none">
							<div style="float:left;width:50%;border-top:black 2px solid;border-right: black 2px solid;height: 7px;"></div>
							<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px">Extrinsic Social</div>
							<div>
								<%
								values = valueSpace.getExtrinsicSocial();
								for(int i=0; values!=null && i<values.length; i++){
								%>
									<div class="edit_item js_element_item" itemName="ExtrinsicSocial" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item">
											<span class="<%if(isEditMode){ %>js_action_element_item<%}%>js_action_select_value"><%=CommonUtil.toNotNull(values[i]) %></span>
											<%
											if(isEditMode){
											%>
												<span class="edit_actions">
													<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
													<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
												</span>
											<%
											}
											%>
										</span>
										<%
										if(isEditMode){
										%>
											<input class="fieldline js_edit_element_item" name="txtExtrinsicSocialItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
										<%
										}
										%>
									</div>
								<%
								}
								if(SmartUtil.isBlankObject(values) && isEditMode){
								%>
									<div class="edit_item js_element_item" itemName="ExtrinsicSocial" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item" style="display:none">
											<span class="js_action_element_item"></span>
											<span class="edit_actions">
												<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
												<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
											</span>
										</span>
										<input class="fieldline js_edit_element_item" name="txtExtrinsicSocialItem" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
									</div>
								<%
								}
								%>
							</div>
						</td>
						<td style="height:100%;padding:0;border-bottom:none">
							<div style="float:right;width:50%;border-top:black 2px solid;border-left: black 2px solid;height: 7px;"></div>
							<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px">Active Emotional</div>
							<div>
								<%
								values = valueSpace.getActiveEmotional();
								for(int i=0; values!=null && i<values.length; i++){
								%>
									<div class="edit_item js_element_item" itemName="ActiveEmotional" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item">
											<span class="<%if(isEditMode){ %>js_action_element_item<%}%>js_action_select_value"><%=CommonUtil.toNotNull(values[i]) %></span>
											<%
											if(isEditMode){
											%>
												<span class="edit_actions">
													<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
													<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
												</span>
											<%
											}
											%>
										</span>
										<%
										if(isEditMode){
										%>
											<input class="fieldline js_edit_element_item" name="txtActiveEmotionalItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
										<%
										}
										%>
									</div>
								<%
								}
								if(SmartUtil.isBlankObject(values) && isEditMode){
								%>
									<div class="edit_item js_element_item" itemName="ActiveEmotional" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item" style="display:none">
											<span class="js_action_element_item"></span>
											<span class="edit_actions">
												<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
												<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
											</span>
										</span>
										<input class="fieldline js_edit_element_item" name="txtActiveEmotionalItem" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
									</div>
								<%
								}
								%>
							</div>
						</td>
						<td style="height:100%;padding:0;border-bottom:none">
							<div style="width:100%;border-top:black 2px solid"></div>
							<div style="float:left;width:50%;border-right: black 2px solid;height: 7px;"></div>
							<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px">Reactive Emotional</div>
							<div>
								<%
								values = valueSpace.getReactiveEmotional();
								for(int i=0; values!=null && i<values.length; i++){
								%>
									<div class="edit_item js_element_item" itemName="ReactiveEmotional" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item">
											<span class="<%if(isEditMode){ %>js_action_element_item<%}%>js_action_select_value"><%=CommonUtil.toNotNull(values[i]) %></span>
											<%
											if(isEditMode){
											%>
												<span class="edit_actions">
													<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
													<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
												</span>
											<%
											}
											%>
										</span>
										<%
										if(isEditMode){
										%>
											<input class="fieldline js_edit_element_item" name="txtReactiveEmotionalItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
										<%
										}
										%>
									</div>
								<%
								}
								if(SmartUtil.isBlankObject(values) && isEditMode){
								%>
									<div class="edit_item js_element_item" itemName="ReactiveEmotional" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item" style="display:none">
											<span class="js_action_element_item"></span>
											<span class="edit_actions">
												<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
												<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
											</span>
										</span>
										<input class="fieldline js_edit_element_item" name="txtReactiveEmotionalItem" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
									</div>
								<%
								}
								%>
							</div>
						</td>
						<td style="height:100%;padding:0;border-bottom:none">
							<div style="width:100%;border-top:black 2px solid"></div>
							<div style="float:left;width:50%;border-right: black 2px solid;height: 7px;"></div>
							<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px">Intrinsic Social</div>
							<div>
								<%
								values = valueSpace.getIntrinsicSocial();
								for(int i=0; values!=null && i<values.length; i++){
								%>
									<div class="edit_item js_element_item" itemName="IntrinsicSocial" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item">
											<span class="<%if(isEditMode){ %>js_action_element_item<%}%>js_action_select_value"><%=CommonUtil.toNotNull(values[i]) %></span>
											<%
											if(isEditMode){
											%>
												<span class="edit_actions">
													<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
													<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
												</span>
											<%
											}
											%>
										</span>
										<%
										if(isEditMode){
										%>
											<input class="fieldline js_edit_element_item" name="txtIntrinsicSocialItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
										<%
										}
										%>
									</div>
								<%
								}
								if(SmartUtil.isBlankObject(values) && isEditMode){
								%>
									<div class="edit_item js_element_item" itemName="IntrinsicSocial" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item" style="display:none">
											<span class="js_action_element_item"></span>
											<span class="edit_actions">
												<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
												<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
											</span>
										</span>
										<input class="fieldline js_edit_element_item" name="txtIntrinsicSocialItem" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
									</div>
								<%
								}
								%>
							</div>
						</td>
						<td style="height:100%;padding:0;border-bottom:none">
							<div style="float:left;width:50%;border-top:black 2px solid;border-right: black 2px solid;height: 7px;"></div>
							<div class="tc cb" style="font-size: 11px;border: black 2px solid;margin: 7px;background-color: rgb(183, 229, 253);line-height:12px;height:24px"><span style="position: relative;top: 7px;">Epistemic</span></div>
							<div>
								<%
								values = valueSpace.getEpistemic();
								for(int i=0; values!=null && i<values.length; i++){
								%>
									<div class="edit_item js_element_item" itemName="Epistemic" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item">
											<span class="<%if(isEditMode){ %>js_action_element_item<%}%>js_action_select_value"><%=CommonUtil.toNotNull(values[i]) %></span>
											<%
											if(isEditMode){
											%>
												<span class="edit_actions">
													<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
													<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
												</span>
											<%
											}
											%>
										</span>
										<%
										if(isEditMode){
										%>
											<input class="fieldline js_edit_element_item" name="txtEpistemicItem" style="display:none; font-size:11px; background-color:white" type="text" value="<%=CommonUtil.toNotNull(values[i]) %>">
										<%
										}
										%>
									</div>
								<%
								}
								if(SmartUtil.isBlankObject(values) && isEditMode){
								%>
									<div class="edit_item js_element_item" itemName="Epistemic" style="background-color: rgb(234, 232, 230);text-align: center;border: black 1px solid;font-size: 11px;line-height: 15px;margin: 2px 2px;width:73px">
										<span class="js_view_element_item" style="display:none">
											<span class="js_action_element_item"></span>
											<span class="edit_actions">
												<a href="" class="icon_hide js_remove_element_item" title="<fmt:message key='common.title.delete'/>"></a>
												<a href="" class="icon_show js_add_element_item" title="<fmt:message key='common.title.add_new'/>"></a>
											</span>
										</span>
										<input class="fieldline js_edit_element_item" name="txtEpistemicItem" style="display:inline-block; font-size:11px; background-color:white" type="text" value="">
									</div>
								<%
								}
								%>
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>
<!-- 컨텐츠 레이아웃//-->
