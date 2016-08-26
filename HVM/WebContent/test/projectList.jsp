<%@page import="java.util.List"%>
<%@page import="net.smartworks.model.hvm.HvmProjectCond"%>
<%@page import="net.smartworks.model.hvm.HvmAttribute"%>
<%@page import="java.util.Date"%>
<%@page import="net.smartworks.util.id.IDCreator"%>
<%@page import="net.smartworks.model.hvm.HvmProject"%>
<%@page import="net.smartworks.model.UserInfo"%>
<%@page import="net.smartworks.factory.HvmDaoFactory"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<%

	UserInfo user = HvmDaoFactory.getInstance().getUserDao().getUser("ysjung@smartworks.net");
	
	out.println(user.getPassword());
	
	
	HvmProjectCond cond = new HvmProjectCond();
	
	cond.setPageNo(0);
	cond.setPageSize(10);
	
	
	cond.setPssPrjName("bag");
	
	List<HvmProject> prjs = HvmDaoFactory.getInstance().getHvmDao().test(user.getId(), cond);
	
	for (int i = 0; i < prjs.size(); i++) {
		HvmProject p = prjs.get(i);
		
		out.println("PrjId : " + p.getId());
		out.println("PrjName : " + p.getPssPrjName());
		out.println("sbpPrjName : " + p.getSbpPrjName());
		
		
		
	}
	
	
%>
</body>
</html>