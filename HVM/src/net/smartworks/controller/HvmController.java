package net.smartworks.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import net.smartworks.dao.IHvmDao;
import net.smartworks.factory.HvmDaoFactory;
import net.smartworks.factory.HvmManagerFactory;
import net.smartworks.manager.IHvmManager;
import net.smartworks.model.Condition;
import net.smartworks.model.PssProject;
import net.smartworks.model.PssValue;
import net.smartworks.model.ResultByActivity;
import net.smartworks.model.ResultByAttribute;
import net.smartworks.model.ResultByValue;
import net.smartworks.model.TestModel;

@Controller
public class HvmController {
	
	
	
	
///////// save attribute_value
	@RequestMapping(value="/setValueAttribute", method=RequestMethod.POST)
	public @ResponseBody void setValueAttribute(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Map resultMap = (Map)requestBody.get("result");
		String setMode = (String)requestBody.get("setMode");
		
		hvmMgr.setAttribute(setMode, resultMap);
	}
///////// save attribute_activity
	@RequestMapping(value="/setActivityAttribute", method=RequestMethod.POST)
	public @ResponseBody void setActivityAttribute(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Map resultMap = (Map)requestBody.get("result");
		String setMode = (String)requestBody.get("setMode");
		
		hvmMgr.setAttribute(setMode, resultMap);
	}	
	
	///////// value list
	@RequestMapping(value="/getValueListSize", method=RequestMethod.POST)
	public @ResponseBody Map getValueListSize(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Condition cond = new Condition();
		String searchKey = (String)requestBody.get("searchKey");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		
		Long totalSize = hvmMgr.getValueListSize(cond);
		
		Map resultMap = new HashMap();
		resultMap.put("totalSize", totalSize);
		return resultMap;
	}
	@RequestMapping(value="/getValueList", method=RequestMethod.POST)
	public @ResponseBody List getValueList(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Condition cond = new Condition();
		String viewType = (String)requestBody.get("viewType");
		String searchKey = (String)requestBody.get("searchKey");
		int pageSize = (Integer)requestBody.get("pageSize");
		int pageNo = (Integer)requestBody.get("pageNo");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		cond.setPageSize(pageSize);
		cond.setPageNo(pageNo);
		
		List<ResultByValue> list = hvmMgr.getValueList(cond);
		
		return list;
	}
	
	///////// activity list
	
	@RequestMapping(value="/getActivityListSize", method=RequestMethod.POST)
	public @ResponseBody Map getActivityListSize(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Condition cond = new Condition();
		String searchKey = (String)requestBody.get("searchKey");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		
		Long totalSize = hvmMgr.getActivityListSize(cond);
		
		Map resultMap = new HashMap();
		resultMap.put("totalSize", totalSize);
		return resultMap;
	}
	@RequestMapping(value="/getActivityList", method=RequestMethod.POST)
	public @ResponseBody List getActivityList(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Condition cond = new Condition();
		String viewType = (String)requestBody.get("viewType");
		String searchKey = (String)requestBody.get("searchKey");
		int pageSize = (Integer)requestBody.get("pageSize");
		int pageNo = (Integer)requestBody.get("pageNo");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		cond.setPageSize(pageSize);
		cond.setPageNo(pageNo);
		
		List<ResultByActivity> list = hvmMgr.getActivityList(cond);
		
		return list;
	}
	
	////////////// attribute List
	
	@RequestMapping(value="/getAttributeListSize", method=RequestMethod.POST)
	public @ResponseBody Map getAttributeListSize(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Condition cond = new Condition();
		String searchKey = (String)requestBody.get("searchKey");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		
		Long totalSize = hvmMgr.getAttributeListSize(cond);
		
		Map resultMap = new HashMap();
		resultMap.put("totalSize", totalSize);
		return resultMap;
	}
	@RequestMapping(value="/getAttributeList", method=RequestMethod.POST)
	public @ResponseBody List getAttributeList(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {

		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		Condition cond = new Condition();
		String viewType = (String)requestBody.get("viewType");
		String searchKey = (String)requestBody.get("searchKey");
		int pageSize = (Integer)requestBody.get("pageSize");
		int pageNo = (Integer)requestBody.get("pageNo");
		if (searchKey != null && searchKey.length() != 0) {
			cond.setSearchKey(searchKey);
		}
		cond.setPageSize(pageSize);
		cond.setPageNo(pageNo);
		
		List<ResultByAttribute> list = hvmMgr.getAttributeList(cond);
		
		return list;
	}
	
	@RequestMapping(value="/getPssValuesByPssPrjId", method=RequestMethod.POST)
	public @ResponseBody List getPssValuesByPssPrjId(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		String pssPrjId = (String)requestBody.get("searchKey");
		if (pssPrjId == null || pssPrjId.length() == 0)
			return null;
		List<PssValue> valueList = hvmMgr.getPssValue(pssPrjId);
		return valueList;
	}
	
	@RequestMapping(value="/getPssProjectByName", method=RequestMethod.POST)
	public @ResponseBody List getPssProjectByName(@RequestBody Map<String, Object> requestBody, HttpServletRequest request, HttpServletResponse response) throws Exception {
		IHvmManager hvmMgr = HvmManagerFactory.getInstance().getHvmManager();
		String searchKey = (String)requestBody.get("searchKey");
		if (searchKey == null || searchKey.length() == 0)
			return null;
		List<PssProject> prjList = hvmMgr.getPssProject(searchKey);
		return prjList;

	}
	
	// TEST //
	@RequestMapping(value="/getTestJson", method=RequestMethod.GET)
	public @ResponseBody List getTestJson() throws Exception {
		List resultList = new ArrayList();
		Map resultMap = new HashMap();
		resultMap.put("testKey", "testValue");
		resultMap.put("testKey2", "testValue2");
		resultList.add(resultMap);
		return resultList;
	}
	@RequestMapping(value="/getTestDbJson", method=RequestMethod.GET)
	public @ResponseBody List getTestDbJson() throws Exception {
		IHvmDao hvmDao = HvmDaoFactory.getInstance().getHvmDao();
		List<TestModel> list = hvmDao.getTestDbData();
		return list;
	}
}
