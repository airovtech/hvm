<%@page import="net.smartworks.skkupss.model.User"%>
<%@page import="net.smartworks.util.LocalDate"%>
<%@page import="org.springframework.security.web.context.HttpSessionSecurityContextRepository"%>
<%@page import="net.smartworks.skkupss.model.Login"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="net.smartworks.util.SmartUtil"%>
<%@page import="org.springframework.security.core.context.SecurityContext"%>
<%@page import="java.util.TimeZone"%>
<%@page import="java.util.Locale"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ page session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<%
SecurityContext context = (SecurityContext) request.getSession().getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);
if (!SmartUtil.isBlankObject(context)) {
	Authentication auth = context.getAuthentication();
	if(!SmartUtil.isBlankObject(auth)) {
		String connectUserId = ((Login) auth.getPrincipal()).getId();
		if(SmartUtil.isBlankObject(session.getAttribute(connectUserId))) {
			System.out.println("-------------------------------------------");
			System.out.println(((Login) auth.getPrincipal()).getName() + " 님이 접속하였습니다.");
			System.out.println("ID : " + ((Login) auth.getPrincipal()).getId());
			System.out.println("-------------------------------------------");
			session.setAttribute(connectUserId, new LocalDate());
		}
	}
} else {
	//response.sendRedirect("login.sw");
	//return;
}

User currentUser = SmartUtil.getCurrentUser();

%>
<fmt:setLocale value="<%=currentUser.getLocale() %>" scope="request" />
<fmt:setBundle basename="resource.smartworksMessage" scope="request" />

<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<script type="">
try{
	currentUser = {
		userId : "<%=currentUser.getId()%>",
		name : "<%=currentUser.getName()%>",
		longName : "<%=currentUser.getLongName()%>",
		minPicture : "<%=currentUser.getMinPicture()%>",
		midPicture : "<%=currentUser.getMidPicture()%>",
		orgPicture : "<%=currentUser.getOrgPicture()%>",
		locale : "<%=currentUser.getLocale()%>",
		timeZone : "<%=currentUser.getTimeZone()%>",
		timeOffset : "<%=currentUser.getTimeOffsetInHour()%>",
	};

	companyGeneral = {
		useMessagingService : "false",
		useChattingService : "false",
		fileUploadLimit : <%=500%>
	};

}catch(e){
}
</script>

<link href="http://meyerweb.com/eric/tools/css/reset/reset.css" rel="stylesheet" type="text/css" />
<link href="css/default.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/layout.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/detail.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/chat.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/form.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/pop.css?v=3.5.7" type="text/css" rel="stylesheet" />
<link href="css/black/media.css?v=3.5.7" type="text/css" rel="stylesheet"/>
<link href="css/black/pss.css?v=3.5.7" type="text/css" rel="stylesheet"/>

<link href="css/ui-lightness/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" title="ui-theme" />
<link href="css/jqgrid/themes/ui.jqgrid.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/ext/ext-all.css" type="text/css" rel="stylesheet" />
<link href="css/fileuploader/fileuploader.css" type="text/css" rel="stylesheet"/>
<link href="css/fullcalendar/fullcalendar.css" type="text/css" rel="stylesheet"/>

<link rel="stylesheet" type="text/css" href="js/jqgrid/themes/redmond/jquery-ui-1.8.2.custom.css" media="screen" />
<link rel="stylesheet" type="text/css" href="js/jqgrid/themes/ui.jqgrid.css"  media="screen"/>

<!-- <link href="smarteditor/css/default_kor.css" rel="stylesheet" type="text/css" />
 --><link rel="shortcut icon" href="images/favicon/smartworks.ico"/>

<!--[if lte IE 8]><link rel="stylesheet" href="css/black/ie8.css" type="text/css" media="all"><![endif]-->
 
<script type="text/javascript" src="js/jquery/jquery-1.6.2.min.js"></script>
<!--  
<script type="text/javascript" src="js/jquery/jquery-1.7.1.min.js"></script>
 -->
<script type="text/javascript" src="js/jquery/jquery.ui.core.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.validate.js"></script>
<script type="text/javascript" src="js/jquery/jquery.effects.core.js"></script>
<script type="text/javascript" src="js/jquery/jquery.effects.explode.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.widget.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.mouse.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.draggable.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.resizable.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.slider.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.datepicker.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.datepicker-ko.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-timepicker-ko.js"></script>
<script type="text/javascript" src="js/jquery/history/jquery.history.js"></script>
<script type="text/javascript" src="js/jquery/jquery.json-2.3.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.zclip.min.js"></script>
<script type="text/javascript" src="js/jquery/jshashtable-2.1.js"></script>
<script type="text/javascript" src="js/jquery/jquery.numberformatter-1.2.2.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.formatCurrency-1.4.0.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.simplemodal.1.4.2.min.js"></script>
<script type="text/javascript" src="js/jquery/fullcalendar.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.8.21.custom.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.layout.js"></script>
<script type="text/javascript" src="js/jquery/i18n/grid.locale-en.js"></script>
<script type="text/javascript" src="js/jquery/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-new.js"></script>
<script src="js/jqgrid/js/i18n/grid.locale-en.js" type="text/javascript"></script>
<script src="js/jqgrid/js/jquery.jqGrid.min.js" type="text/javascript"></script>

<!-- <script type="text/javascript" src="js/ext/bootstrap.js"></script> -->
<script type="text/javascript" src="js/ext/ext-all.js"></script>

<script src="js/smartChart-sencha.js" type="text/javascript"></script>

<script type="text/javascript" src="js/sw/sw-jquery.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-common.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-util.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-language.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-language-ko.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-language-en.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-language-zh.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-more.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-nav.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-validate.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-flash.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-iframe-autoheight.js?v=3.5.7"></script>

<script type="text/javascript" src="js/sw/sw-report.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-file.js?v=3.5.7"></script>
<!-- <script type="text/javascript" src="js/sw/sw-webmail.js"></script>
 -->
<script type="text/javascript" src='js/sw/sw-formFields.js?v=3.5.7'></script>
<script type="text/javascript" src='js/sw/sw-popup.js?v=3.5.7'></script>

<script type="text/javascript" src="js/sw/sw-act-nav.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-report.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-search.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-filter.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-work.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-space.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-form.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-settings.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-builder.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-mail.js?v=3.5.7"></script>
<script type="text/javascript" src="js/sw/sw-act-pss.js?v=3.5.7" ></script>

<script type="text/javascript" src='js/smartform/smartworks.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/sw-form-layout.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/sw-form-field-builder.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/sw-form-dataFields.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/currency_input.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/radio_button.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/check_box.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/combo_box.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/date_chooser.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/email_input.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/file_field.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/number_input.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/percent_input.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/rich_editor.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/text_input.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/label.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/time_chooser.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/datetime_chooser.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/user_field.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/department_field.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/ref_form_field.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/image_box.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/videoYT_box.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/auto_index.js?v=3.5.7'></script>
<script type="text/javascript" src='js/smartform/field/data_grid.js?v=3.5.7'></script>

<script type="text/javascript" src="smarteditor/js/HuskyEZCreator.js?v=3.5.7" charset="utf-8"></script>
<script type="text/javascript" src="js/jquery/fileuploader/fileuploader.js" ></script>
<script type="text/javascript" src="js/jquery/image-preview.js" ></script>

<script type="text/javascript" src="js/sw/sw-work-util.js?v=3.5.7" ></script>

<script type="text/javascript" src="js/contextdiagram/contextDiagram.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/controller/canvasController.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/controller/edgeLineController.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/controller/nodeController.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/model/canvas.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/model/edgeLine.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/model/node.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/view/canvasView.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/view/edgeLineView.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/contextdiagram/view/nodeView.js?v=3.5.7" ></script>

<script type="text/javascript" src="js/actordiagram/actorDiagram.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/actordiagram/controller/canvasController.js?v=3.5.8" ></script>
<script type="text/javascript" src="js/actordiagram/controller/edgeLineController.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/actordiagram/controller/nodeController.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/actordiagram/model/canvas.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/actordiagram/model/edgeLine.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/actordiagram/model/node.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/actordiagram/view/canvasView.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/actordiagram/view/edgeLineView.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/actordiagram/view/nodeView.js?v=3.5.7" ></script>

<script type="text/javascript" src="js/lifecyclediagram/lifecycleDiagram.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/controller/canvasController.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/controller/categoryController.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/controller/stepController.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/model/canvas.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/model/category.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/model/step.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/view/canvasView.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/view/categoryView.js?v=3.5.7" ></script>
<script type="text/javascript" src="js/lifecyclediagram/view/stepView.js?v=3.5.7" ></script>

<title>Product-Service Support System</title>
<link rel="shortcut icon" href="images/pss/cdi-logo-s.png"/>

</head>

<body>

<script type="">smartPop.progressCenter();</script>

<%

	String spaceType = request.getParameter("spaceType");
%>

	<div id="wrap">
		<!-- Header -->
		<div id="header" style="height:0px">
		</div>
		<!-- Header//-->

		<!-- Contents-->
		<div id="content" style="min-width:1200px">
			<jsp:include page="psListForHvm.jsp">
				<jsp:param value="" name="spaceType"/>
			</jsp:include>
		</div>
		<!-- Contents//-->

		<!-- Footer-->
		<div id="footer">
		</div>
		<!-- Footer //-->
		
	</div>
<script type="">smartPop.closeProgress();</script>
</body>
</html>
