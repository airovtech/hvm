<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
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

	UserInfo user = HvmDaoFactory.getInstance().getUserDao().getUser("lesserpand@skku.edu");
	
	out.println(user.getPassword());
	
	
	HvmProject prj = new HvmProject();
	
	prj.setId(IDCreator.createId("prj"));
	prj.setPssPrjId("pss project id");
	prj.setPssPrjName("프로젝트 이름입니다2.");
	prj.setPssPrjDescription("프로젝트 설명2");
	prj.setPssPrjPicture("pssPrjPicture333");
	prj.setSbpPrjId("sbpPrjId2");
	prj.setSbpPrjName("sbp 프로젝트 이름입니다2.");
	prj.setCreatedUser(user.getId());
	prj.setLastModifiedUser(user.getId());
	prj.setCreatedDate(new Date());
	prj.setLastModifiedDate(new Date());
	
	
	HvmAttribute attr = new HvmAttribute();
	attr.setId(IDCreator.createId("attr"));
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
	attr2.setId(IDCreator.createId("attr"));
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
	attr3.setId(IDCreator.createId("attr"));
	attr3.setPrjId(prj.getId());
	attr3.setValueId("valueId33");
	attr3.setValueName("valueName33");
	attr3.setSbpId("sbpId33");
	attr3.setSbpName("sbpName33");
	attr3.setActivityId("activityId33");
	attr3.setActivityName("activityName33");
	attr3.setAttributeType("N");
	attr3.setAttributeName("attributeName33");
	

	HvmAttribute attr4 = new HvmAttribute();
	attr4.setId(IDCreator.createId("attr"));
	attr4.setPrjId(prj.getId());
	attr4.setValueId("valueId33");
	attr4.setValueName("valueName33");
	attr4.setSbpId("sbpId33");
	attr4.setSbpName("sbpName33");
	attr4.setActivityId("activityId33");
	attr4.setActivityName("activityName33");
	attr4.setAttributeType("N");
	attr4.setAttributeName("attributeName33");

	HvmAttribute attr5 = new HvmAttribute();
	attr5.setId(IDCreator.createId("attr"));
	attr5.setPrjId(prj.getId());
	attr5.setValueId("valueId33");
	attr5.setValueName("valueName33");
	attr5.setSbpId("sbpId33");
	attr5.setSbpName("sbpName33");
	attr5.setActivityId("activityId33");
	attr5.setActivityName("activityName33");
	attr5.setAttributeType("N");
	attr5.setAttributeName("attributeName33");

	HvmAttribute attr6 = new HvmAttribute();
	attr6.setId(IDCreator.createId("attr"));
	attr6.setPrjId(prj.getId());
	attr6.setValueId("valueId33");
	attr6.setValueName("valueName33");
	attr6.setSbpId("sbpId33");
	attr6.setSbpName("sbpName33");
	attr6.setActivityId("activityId33");
	attr6.setActivityName("activityName33");
	attr6.setAttributeType("N");
	attr6.setAttributeName("attributeName33");

	HvmAttribute attr7 = new HvmAttribute();
	attr7.setId(IDCreator.createId("attr"));
	attr7.setPrjId(prj.getId());
	attr7.setValueId("valueId33");
	attr7.setValueName("valueName33");
	attr7.setSbpId("sbpId33");
	attr7.setSbpName("sbpName33");
	attr7.setActivityId("activityId33");
	attr7.setActivityName("activityName33");
	attr7.setAttributeType("N");
	attr7.setAttributeName("attributeName33");

	HvmAttribute attr8 = new HvmAttribute();
	attr8.setId(IDCreator.createId("attr"));
	attr8.setPrjId(prj.getId());
	attr8.setValueId("valueId33");
	attr8.setValueName("valueName33");
	attr8.setSbpId("sbpId33");
	attr8.setSbpName("sbpName33");
	attr8.setActivityId("activityId33");
	attr8.setActivityName("activityName33");
	attr8.setAttributeType("N");
	attr8.setAttributeName("attributeName33");


	HvmAttribute attr9 = new HvmAttribute();
	attr9.setId(IDCreator.createId("attr"));
	attr9.setPrjId(prj.getId());
	attr9.setValueId("valueId33");
	attr9.setValueName("valueName33");
	attr9.setSbpId("sbpId33");
	attr9.setSbpName("sbpName33");
	attr9.setActivityId("activityId33");
	attr9.setActivityName("activityName33");
	attr9.setAttributeType("N");
	attr9.setAttributeName("attributeName33");
	
	
	
	List attrList = new ArrayList();
	
	attrList.add(attr);	
	attrList.add(attr2);	
	attrList.add(attr3);
	attrList.add(attr4);
	attrList.add(attr5);
	attrList.add(attr6);
	attrList.add(attr7);
	attrList.add(attr8);
	attrList.add(attr9);
	
	prj.setAttributes(attrList);
	
	
	HvmDaoFactory.getInstance().getHvmDao().setHvmProject(user.getId(), prj);
	
	
%>
</body>
</html>