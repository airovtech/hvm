package net.smartworks.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.smartworks.factory.HvmManagerFactory;
import net.smartworks.manager.IHvmManager;
import net.smartworks.model.hvm.HvmAttribute;
import net.smartworks.model.hvm.HvmAttributeCond;
import net.smartworks.model.hvm.HvmProject;
import net.smartworks.model.hvm.HvmProjectCond;
import net.smartworks.security.Login;
import net.smartworks.util.HvmUtil;
import net.smartworks.util.id.IDCreator;

@Controller
public class HvmController {
	
	@RequestMapping(value="/getHvmProjectSize", method=RequestMethod.POST)
	public @ResponseBody Map getHvmProjectSize(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		Login currentUser = HvmUtil.getCurrentUserInfo();
		
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		HvmProjectCond cond = new HvmProjectCond();
		String searchKey = (String)requestBody.get("searchKey");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		
		Map result = hvmMgr.getHvmProjectSize(currentUser.getId(), cond);
		return result;
	}

	@RequestMapping(value="/getHvmEmptyAttribute", method=RequestMethod.POST)
	public @ResponseBody List getHvmEmptyAttribute(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		List<HvmAttribute> attributeList = new ArrayList<HvmAttribute>();
		HvmAttribute attribute = new HvmAttribute();
		attribute.setId(IDCreator.createId("attr"));
		attributeList.add(attribute);
	
		return attributeList;
	}
	@RequestMapping(value="/getHvmEmptyProject", method=RequestMethod.POST)
	public @ResponseBody List getHvmEmptyProject(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		List<HvmProject> projectList = new ArrayList<HvmProject>();
		HvmProject project = new HvmProject();
		project.setId(IDCreator.createId("prj"));
		
		List<HvmAttribute> attributeList = new ArrayList<HvmAttribute>();
//		HvmAttribute attribute = new HvmAttribute();
//		attribute.setId(IDCreator.createId("attr"));
//		attribute.setPrjId(project.getId());
//		attributeList.add(attribute);
//
		project.setAttributes(attributeList);
		projectList.add(project);
		
		return projectList;
	}
	
	@RequestMapping(value="/getHvmProjects", method=RequestMethod.POST)
	public @ResponseBody List getHvmProjects(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Login currentUser = HvmUtil.getCurrentUserInfo();
		
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		HvmProjectCond cond = new HvmProjectCond();
		String viewType = (String)requestBody.get("viewType");
		String searchKey = (String)requestBody.get("searchKey");
		int pageSize = (Integer)requestBody.get("pageSize");
		int pageNo = (Integer)requestBody.get("pageNo");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		cond.setPageSize(pageSize);
		cond.setPageNo(pageNo);
		
		List<HvmProject> list = hvmMgr.getHvmProjects(currentUser.getId(), cond, null);
		
		return list;
	}
	
	@RequestMapping(value="/setHvmProject", method=RequestMethod.POST)
	public @ResponseBody void setHvmProject(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Login currentUser = HvmUtil.getCurrentUserInfo();
		
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Map resultMap = (Map)requestBody.get("result");
		//String setMode = (String)requestBody.get("setMode");

		ObjectMapper mapper = new ObjectMapper();
		HvmProject project = mapper.convertValue(resultMap, HvmProject.class);
		
		hvmMgr.setHvmProject(currentUser.getId(), project);
	}	
	
	@RequestMapping(value="/removeHvmProject", method=RequestMethod.POST)
	public @ResponseBody void removeHvmProject(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Login currentUser = HvmUtil.getCurrentUserInfo();

		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		String projectId = (String)requestBody.get("projectId");
		
		//String setMode = (String)requestBody.get("setMode");

		hvmMgr.removeHvmProject(currentUser.getId(), projectId);
	}	
	
	
	@RequestMapping(value="/getHvmAttributeSize", method=RequestMethod.POST)
	public @ResponseBody Map getHvmAttributeSize(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		Login currentUser = HvmUtil.getCurrentUserInfo();
		
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		HvmAttributeCond cond = new HvmAttributeCond();
		String searchKey = (String)requestBody.get("searchKey");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		
		Map result = hvmMgr.getHvmAttributeSize(currentUser.getId(), cond);
		return result;
	}
	
	@RequestMapping(value="/getHvmAttributes", method=RequestMethod.POST)
	public @ResponseBody List getHvmAttributes(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		Login currentUser = HvmUtil.getCurrentUserInfo();
		
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		HvmAttributeCond cond = new HvmAttributeCond();
		String viewType = (String)requestBody.get("viewType");
		String searchKey = (String)requestBody.get("searchKey");
		int pageSize = (Integer)requestBody.get("pageSize");
		int pageNo = (Integer)requestBody.get("pageNo");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		cond.setPageSize(pageSize);
		cond.setPageNo(pageNo);
		
		List<HvmAttribute> list = hvmMgr.getHvmAttributes(currentUser.getId(), cond);
		
		return list;
	}
	
	@RequestMapping(value = "/getCurrentUser", method = RequestMethod.GET)
    public @ResponseBody Map getCurrentUser(HttpSession session) {
        Login userDetails = (Login)SecurityContextHolder.getContext().getAuthentication().getDetails();
         
		//getUserDetailInfo and set Session

		Map resultMap = new HashMap();
		resultMap.put("id", userDetails.getId());
		resultMap.put("picture", userDetails.getPicture());
		resultMap.put("username", userDetails.getUsername());
		return resultMap;
    }
	@RequestMapping(value = "login_success", method = RequestMethod.GET)
    public void login_success(HttpSession session) {
        //CustomUserDetails userDetails = (CustomUserDetails)SecurityContextHolder.getContext().getAuthentication().getDetails();
         
		//getUserDetailInfo and set Session
		System.out.println("LOGIN_SUCCESS !!@@!!");
        session.setAttribute("userLoginInfo", "");
    }
	@RequestMapping(value = { "/login" }, method = RequestMethod.GET)
	public ModelAndView homePage() {
		System.out.println("Request LOGIN PAGE !!@@!!");
		ModelAndView model = new ModelAndView();
		model.setViewName("login");
		return model;
	}
	
}
