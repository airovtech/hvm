<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="net.smartworks.factory.DaoFactory"%>
<%@ page import="net.smartworks.dao.IDao"%>
<%@ page import="net.smartworks.model.TestModel"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
	List list = DaoFactory.getInstance().getDao().getTestDbData();
	for (int i =0; i < list.size(); i++) {
		TestModel tm = (TestModel)list.get(i);
		out.print(tm.getId());
		out.print(tm.getName());
	}
%>
</body>
</html>