<%@page import="net.smartworks.util.http.ServletUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String result = ServletUtil.request("http://sbp.pssd.or.kr/sbp/sbpListForHvm.jsp?hvm=true&memberId=sbpAdmin");
%>
<%=result%>