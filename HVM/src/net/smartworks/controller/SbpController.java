package net.smartworks.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SbpController {

	@RequestMapping(value="/getSbpProject", method=RequestMethod.GET)
	public @ResponseBody List getSbpProject(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String name = (String)request.getParameter("name");
		System.out.println("arg to Server name : " + name);
		
		List result = new ArrayList();
		Map map = new HashMap();
		
		map.put("sbpPrjId", "spbPrjId1"); map.put("sbpPrjName", "sbp project 1");
		result.add(map);
		Map map2 = new HashMap();
		map2.put("sbpPrjId", "spbPrjId2"); map2.put("sbpPrjName", "sbp project 2");
		result.add(map2);
		Map map3 = new HashMap();
		map3.put("sbpPrjId", "spbPrjId3"); map3.put("sbpPrjName", "sbp project 3");
		result.add(map3);
		Map map4 = new HashMap();
		map4.put("sbpPrjId", "spbPrjId4"); map4.put("sbpPrjName", "sbp project 4");
		result.add(map4);
		Map map5 = new HashMap();
		map5.put("sbpPrjId", "spbPrjId5"); map5.put("sbpPrjName", "sbp project 5");
		result.add(map5);
		Map map6 = new HashMap();
		map6.put("sbpPrjId", "spbPrjId6"); map6.put("sbpPrjName", "sbp project 6");
		result.add(map6);
		
		return result;
	}
	@RequestMapping(value="/getSbp", method=RequestMethod.GET)
	public @ResponseBody List getSbp(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String sbpPrjId = (String)request.getParameter("sbpPrjId");
		System.out.println("arg to Server sbpPrjId : " + sbpPrjId);
		
		List result = new ArrayList();
		Map map = new HashMap();
		
		map.put("sbpId", "spbId1"); map.put("sbpName", "sbp 1");
		result.add(map);
		Map map2 = new HashMap();
		map2.put("sbpId", "spbId2"); map2.put("sbpName", "sbp 2");
		result.add(map2);
		Map map3 = new HashMap();
		map3.put("sbpId", "spbId3"); map3.put("sbpName", "sbp 3");
		result.add(map3);
		Map map4 = new HashMap();
		map4.put("sbpId", "spbId4"); map4.put("sbpName", "sbp 4");
		result.add(map4);
		Map map5 = new HashMap();
		map5.put("sbpId", "spbId5"); map5.put("sbpName", "sbp 5");
		result.add(map5);
		Map map6 = new HashMap();
		map6.put("sbpId", "spbId6"); map6.put("sbpName", "sbp 6");
		result.add(map6);
		
		return result;
	}
	@RequestMapping(value="/getSbpActivity", method=RequestMethod.GET)
	public @ResponseBody List getSbpActivity(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String sbpId = (String)request.getParameter("sbpId");
		System.out.println("arg to Server sbpId : " + sbpId);
		
		List result = new ArrayList();
		if (sbpId.equalsIgnoreCase("sbp 1")) {

			Map map = new HashMap();
			map.put("sbpActId", "spbActivityId1"); map.put("sbpActName", "sbpActivity 1");
			result.add(map);
			Map map2 = new HashMap();
			map2.put("sbpActId", "spbActivityId2"); map2.put("sbpActName", "sbpActivity 2");
			result.add(map2);
			Map map3 = new HashMap();
			map3.put("sbpActId", "spbActivityId3"); map3.put("sbpActName", "sbpActivity 3");
			result.add(map3);
		} else if (sbpId.equalsIgnoreCase("sbp 2")) {

			Map map = new HashMap();
			map.put("sbpActId", "spbActivityId4"); map.put("sbpActName", "sbpActivity 4");
			result.add(map);
			Map map2 = new HashMap();
			map2.put("sbpActId", "spbActivityId5"); map2.put("sbpActName", "sbpActivity 5");
			result.add(map2);
			Map map3 = new HashMap();
			map3.put("sbpActId", "spbActivityId6"); map3.put("sbpActName", "sbpActivity 6");
			result.add(map3);
		} else {
			Map map = new HashMap();
			map.put("sbpActId", "spbActivityId7"); map.put("sbpActName", "sbpActivity 7");
			result.add(map);
			Map map2 = new HashMap();
			map2.put("sbpActId", "spbActivityId8"); map2.put("sbpActName", "sbpActivity 8");
			result.add(map2);
			Map map3 = new HashMap();
			map3.put("sbpActId", "spbActivityId9"); map3.put("sbpActName", "sbpActivity 9");
			result.add(map3);
		}
	
		return result;
	}
	
}
