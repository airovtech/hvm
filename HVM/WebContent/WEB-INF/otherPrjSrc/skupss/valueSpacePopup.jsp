<%@ page contentType="text/html; charset=utf-8"%>
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

<script type="text/javascript" src="js/jquery/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery.ui.core.min.js"></script>
<script type="text/javascript" src="js/sw/sw-util.js"></script>

<% 
	String psId = (String)request.getParameter("psId");
%>
<input type="hidden" id="selectedValue" value="" >
<jsp:include page="viewValueSpace.jsp">
	<jsp:param value="<%=psId%>" name="psId"/>
	<jsp:param value="valueSpace" name="valueSpace"/>
</jsp:include>
<script>
$('.js_action_select_value').live('click', function(e) {
	
	var input = $(targetElement(e));
	$('#selectedValue').val(input.context.innerHTML);
	/* $('.js_action_select_value').parent().parent().css('background-color','#EAE8E6');
	input.parent().parent().css('background-color','#00FF00'); */
	
	try {
        console.log('$$$$$$$$$$$$$$$$$$POST MESSAGE TO PARENT$$$$$$$$$$$$$$$$$$$$$$$');
        var message = "pssValueSelect||" + input.context.innerHTML
        console.log('$$$$$$$$$$$$$$$$$$POST MESSAGE TO PARENT$$$$$$$$$$$$$$$$$$$$$$$');
        //parent.postMessage(message,"http://localhost:3000/parent");
        parent.postMessage(message,"http://localhost:8080/HVM/index.html");
        
        parent.postMessage(message,"http://great.smartworks.net/HVM/index.html");

        parent.postMessage(message,"http://www.smartworks.net/HVM/index.html");
	} catch(err) {
		console.log('ERROR!!');
		//console.log(err);
	}
	
});
<%
	String view = request.getParameter("view");
	if (view == null || view.equals("false")) {
%>
$('.js_action_select_value').css({"cursor":"pointer"});
<%
	}
%>

</script>