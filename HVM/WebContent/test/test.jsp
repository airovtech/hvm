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
	
	
	HvmProject prj = new HvmProject();
	
	prj.setId(IDCreator.createId("prj_"));
	prj.setPssPrjId("pssPrjId333333333");
	prj.setPssPrjName("pssPrjName2");
	prj.setPssPrjDescription("pssPrjDescription2");
	prj.setPssPrjPicture("pssPrjPicture2");
	prj.setSbpPrjId("sbpPrjId2");
	prj.setSbpPrjName("sbpPrjName2");
	prj.setCreatedUser(user.getId());
	prj.setLastModifiedUser(user.getId());
	prj.setCreatedDate(new Date());
	prj.setLastModifiedDate(new Date());
	
	
	HvmAttribute attr = new HvmAttribute();
	attr.setId(IDCreator.createId("attr_"));
	attr.setPrjId(prj.getId());
	attr.setValueId("valueId1");
	attr.setValueName("valueName1");
	attr.setSbpId("sbpId1");
	attr.setSbpName("sbpName1");
	attr.setActivityId("activityId1");
	attr.setActivityName("activityName1");
	attr.setAttributeType("N");
	attr.setAttributeName("attributeName1");

	HvmAttribute attr2 = new HvmAttribute();
	attr2.setId(IDCreator.createId("attr_"));
	attr2.setPrjId(prj.getId());
	attr2.setValueId("valueId22");
	attr2.setValueName("valueName22");
	attr2.setSbpId("sbpId22");
	attr2.setSbpName("sbpName22");
	attr2.setActivityId("activityId22");
	attr2.setActivityName("activityName22");
	attr2.setAttributeType("P");
	attr2.setAttributeName("attributeName22");
	

	HvmAttribute attr3 = new HvmAttribute();
	attr3.setId(IDCreator.createId("attr_"));
	attr3.setPrjId(prj.getId());
	attr3.setValueId("valueId33");
	attr3.setValueName("valueName33");
	attr3.setSbpId("sbpId33");
	attr3.setSbpName("sbpName33");
	attr3.setActivityId("activityId33");
	attr3.setActivityName("activityName33");
	attr3.setAttributeType("N");
	attr3.setAttributeName("attributeName33");
	
	
	HvmAttribute[] attrs = new HvmAttribute[3];
	attrs[0] = attr;
	attrs[1] = attr2;
	attrs[2] = attr3;
	
	prj.setAttributes(attrs);
	
	
	HvmDaoFactory.getInstance().getHvmDao().setHvmProject(user.getId(), prj);
	
	
%>
</body>
</html>