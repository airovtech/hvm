package net.smartworks.manager.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.smartworks.dao.IHvmDao;
import net.smartworks.factory.HvmDaoFactory;
import net.smartworks.manager.IHvmManager;
import net.smartworks.model.Condition;
import net.smartworks.model.HvmAttribute;
import net.smartworks.model.PssProject;
import net.smartworks.model.PssValue;
import net.smartworks.model.ResultByActivity;
import net.smartworks.model.ResultByAttribute;
import net.smartworks.model.ResultByValue;
import net.smartworks.util.id.IDCreator;

public class HvmManagerImpl implements IHvmManager {

	private IHvmDao getDao() {
		return HvmDaoFactory.getInstance().getHvmDao();
	}

	@Override
	public Map removeAttribute(String setMode, Map obj) throws Exception {
		if (setMode == null || obj == null)
			return null;

		List resultAttrList = null;
		if (setMode.equalsIgnoreCase("value")) {
			
			List sbpActs = (List)obj.get("sbpActs");
			if (sbpActs == null || sbpActs.size() == 0) 
				return null;
			
			for (int i= 0; i < sbpActs.size();i++) {
				Map act = (Map)sbpActs.get(i);
				if (act == null)
					continue;
				List attrs = (List)act.get("hvmAttrs");
				if (attrs == null || attrs.size() == 0) 
					continue;
				
				for (int j = 0; j<attrs.size(); j++) {
					Map attr = (Map)attrs.get(j);
					if (attr == null || attr.size() == 0) 
						continue;
					
					String id = (String)attr.get("hvmAttrId");;
					
					HvmAttribute attribute = new HvmAttribute();
					attribute.setId(id);
					
					if (resultAttrList == null)
						resultAttrList = new ArrayList();
					resultAttrList.add(attribute);
				}
			}
		} else if (setMode.equalsIgnoreCase("activity")) {
			
			List pssValues = (List)obj.get("pssValues");
			if (pssValues == null || pssValues.size() == 0) 
				return null;

			for (int i= 0; i < pssValues.size();i++) {
				Map val = (Map)pssValues.get(i);
				
				List attrs = (List)val.get("hvmAttrs");
				if (attrs == null || attrs.size() == 0) 
					continue;
				
				for (int j = 0; j<attrs.size(); j++) {
					Map attr = (Map)attrs.get(j);
					if (attr == null || attr.size() == 0) 
						continue;
					
					String id = (String)attr.get("hvmAttrId");
					
					HvmAttribute attribute = new HvmAttribute();
					attribute.setId(id);
					
					if (resultAttrList == null)
						resultAttrList = new ArrayList();
					resultAttrList.add(attribute);
				}
			}
		}
		
		if (resultAttrList == null || resultAttrList.size() == 0)
			return null;
		
		//데이터베이스 저장 
		getDao().removeAttribute(resultAttrList);
		
		return null;
	}
	@Override
	public Map setAttribute(String setMode, Map obj) throws Exception {
		/*{  
			   pssPrj=   {  
			      pssPrjId=ff8081814a0145c5014a018edb7d0025,
			      pssPrjName=Blood Donation 제품-서비스 통합시스템,
			      pssPrjPicture=PS_36c91f714c134f3daafcabd9687814aa.jpg,
			      pssPrjDesc=친구,
			      애인,
			      가족 등 다른 사람과 같이 헌혈할 수 있는 서비스 
			누군가와 같이 할 수 있음으로 두려움,
			      불안감,
			      짜증이라는 부정적 요소를 감소시킴
			   },
			   pssValue=   {  
			      pssValueId=ff8081815120442f015120d6e0d9000a,
			      pssValueName=Connected
			   },
			   sbpPrj=   {  
			      sbpPrjId=spbPrjId1,
			      sbpPrjName=sbp project 1
			   },
			   sbpActs=   [  
			      {  
			         sbpActId=spbActivityId2,
			         sbpName=sbpName1,
			         sbpActName=sbpActivity 2,
			         sbpId=spbId1,
			         actIndex=0,
			         hvmAttrs=         [  
			            {  
			               hvmAttrType=p,
			               hvmAttrName=dfsaf
			            }
			         ]
			      },
			      {  
			         sbpActId=spbActivityId1,
			         sbpName=sbpName1,
			         sbpActName=sbpActivity 1,
			         sbpId=spbId1,
			         actIndex=1,
			         hvmAttrs=         [  
			            {  
			               hvmAttrType=p,
			               hvmAttrName=fdafs
			            }
			         ]
			      },
			      {  
			         sbpActId=spbActivityId3,
			         sbpName=sbpName1,
			         sbpActName=sbpActivity 3,
			         sbpId=spbId1,
			         actIndex=2,
			         hvmAttrs=         [  
			            {  
			               hvmAttrType=n,
			               hvmAttrName=fdafs
			            }
			         ]
			      },
			      {  
			         sbpActId=spbActivityId5,
			         sbpName=sbpName2,
			         sbpActName=sbpActivity 5,
			         sbpId=spbId2,
			         actIndex=3,
			         hvmAttrs=         [  
			            {  
			               hvmAttrType=p,
			               hvmAttrName=fda
			            }
			         ]
			      },
			      {  
			         sbpActName=adafs,
			         actIndex=4,
			         hvmAttrs=         [  
			            {  
			               hvmAttrType=p,
			               hvmAttrName=fdaf
			            }
			         ]
			      }
			   ]
			}*/
		if (setMode == null || obj == null)
			return null;

		List resultAttrList = null;
		if (setMode.equalsIgnoreCase("value")) {
			
			List sbpActs = (List)obj.get("sbpActs");
			if (sbpActs == null || sbpActs.size() == 0) 
				return null;
			
			String pssPrjId = null;
			String pssPrjName = null;
			String pssPrjPicture = null;
			String pssPrjDesc = null;
			
			String pssValueId = null;
			String pssValueName = null;
			
			String sbpPrjId = null;
			String sbpPrjName = null;
			
			Map pssPrj = (Map)obj.get("pssPrj");
			if (pssPrj != null) {
				pssPrjId = (String)pssPrj.get("pssPrjId");
				pssPrjName = (String)pssPrj.get("pssPrjName");
				pssPrjPicture = (String)pssPrj.get("pssPrjPicture");
				pssPrjDesc = (String)pssPrj.get("pssPrjDesc");
			}
			Map pssValue = (Map)obj.get("pssValue");
			if (pssValue != null) {
				pssValueId = (String)pssValue.get("pssValueId");
				pssValueName = (String)pssValue.get("pssValueName");
			}
			Map sbpPrj = (Map)obj.get("sbpPrj");
			if (sbpPrj != null) {
				sbpPrjId = (String)sbpPrj.get("sbpPrjId");
				sbpPrjName = (String)sbpPrj.get("sbpPrjName");
			}
			
			for (int i= 0; i < sbpActs.size();i++) {
				Map act = (Map)sbpActs.get(i);
				
				String sbpActId = (String)act.get("sbpActId");
				String sbpActName = (String)act.get("sbpActName");
				String sbpId = (String)act.get("sbpId");
				String sbpName = (String)act.get("sbpName");
				
				List attrs = (List)act.get("hvmAttrs");
				if (attrs == null || attrs.size() == 0) 
					continue;
				
				for (int j = 0; j<attrs.size(); j++) {
					Map attr = (Map)attrs.get(j);
					if (attr == null || attr.size() == 0) 
						continue;
					
					String id = IDCreator.createId("attr");
					String hvmAttrType = (String)attr.get("hvmAttrType");
					String hvmAttrName = (String)attr.get("hvmAttrName");
					
					HvmAttribute attribute = new HvmAttribute();
					attribute.setId(id);
					attribute.setPrjId(pssPrjId);
					attribute.setPrjName(pssPrjName);
					attribute.setPrjPicture(pssPrjPicture);
					attribute.setPrjDesc(pssPrjDesc);
					attribute.setSbpPrjId(sbpPrjId);
					attribute.setSbpPrjName(sbpPrjName);
					attribute.setValueId(pssValueId);
					attribute.setValueName(pssValueName);
					attribute.setSbpId(sbpId);
					attribute.setSbpName(sbpName);
					attribute.setActivityId(sbpActId);
					attribute.setActivityName(sbpActName);
					attribute.setAttrType(hvmAttrType);
					attribute.setAttrName(hvmAttrName);
					
					if (resultAttrList == null)
						resultAttrList = new ArrayList();
					resultAttrList.add(attribute);
				}
			}
		} else if (setMode.equalsIgnoreCase("activity")) {
			
			List pssValues = (List)obj.get("pssValues");
			if (pssValues == null || pssValues.size() == 0) 
				return null;

			String sbpPrjId = null;
			String sbpPrjName = null;
			
			String pssPrjId = null;
			String pssPrjName = null;
			String pssPrjPicture = null;
			String pssPrjDesc = null;
			
			String sbpActId = null;
			String sbpActName = null;
			String sbpId = null;
			String sbpName = null;
			
			Map pssPrj = (Map)obj.get("pssPrj");
			if (pssPrj != null) {
				pssPrjId = (String)pssPrj.get("pssPrjId");
				pssPrjName = (String)pssPrj.get("pssPrjName");
				pssPrjPicture = (String)pssPrj.get("pssPrjPicture");
				pssPrjDesc = (String)pssPrj.get("pssPrjDesc");
			}

			Map sbpPrj = (Map)obj.get("sbpPrj");
			if (sbpPrj != null) {
				sbpPrjId = (String)sbpPrj.get("sbpPrjId");
				sbpPrjName = (String)sbpPrj.get("sbpPrjName");
			}
			
			Map sbpActivity = (Map)obj.get("sbpActivity");
			if (sbpActivity != null) {
				sbpActId = (String)sbpActivity.get("sbpActId");
				sbpActName = (String)sbpActivity.get("sbpActName");
				sbpId = (String)sbpActivity.get("sbpId");
				sbpName = (String)sbpActivity.get("sbpName");
			}
			for (int i= 0; i < pssValues.size();i++) {
				Map val = (Map)pssValues.get(i);
				
				String pssValueId = (String)val.get("pssValueId");
				String pssValueName = (String)val.get("pssValueName");
				
				List attrs = (List)val.get("hvmAttrs");
				if (attrs == null || attrs.size() == 0) 
					continue;
				
				for (int j = 0; j<attrs.size(); j++) {
					Map attr = (Map)attrs.get(j);
					if (attr == null || attr.size() == 0) 
						continue;
					
					String id = IDCreator.createId("attr");
					String hvmAttrType = (String)attr.get("hvmAttrType");
					String hvmAttrName = (String)attr.get("hvmAttrName");
					
					HvmAttribute attribute = new HvmAttribute();
					attribute.setId(id);
					attribute.setPrjId(pssPrjId);
					attribute.setPrjName(pssPrjName);
					attribute.setPrjPicture(pssPrjPicture);
					attribute.setPrjDesc(pssPrjDesc);
					attribute.setSbpPrjId(sbpPrjId);
					attribute.setSbpPrjName(sbpPrjName);
					attribute.setValueId(pssValueId);
					attribute.setValueName(pssValueName);
					attribute.setSbpId(sbpId);
					attribute.setSbpName(sbpName);
					attribute.setActivityId(sbpActId);
					attribute.setActivityName(sbpActName);
					attribute.setAttrType(hvmAttrType);
					attribute.setAttrName(hvmAttrName);
					
					if (resultAttrList == null)
						resultAttrList = new ArrayList();
					resultAttrList.add(attribute);
				}
			}
		}
		
		if (resultAttrList == null || resultAttrList.size() == 0)
			return null;
		
		//데이터베이스 저장 
		getDao().setAttribute(resultAttrList);
		
		return null;
	}
	
	@Override
	public long getValueListSize(Condition cond) throws Exception {
		return getDao().getValueListSize(cond);
	}
	@Override
	public List<ResultByValue> getValueList(Condition cond) throws Exception {
		
		List<HvmAttribute> attrs = getDao().getValueList(cond);
		if (attrs == null || attrs.size() == 0)
			return null;
		
		Map<String, ResultByValue> valueResultMap = new LinkedHashMap<String, ResultByValue>();
		for (int i = 0 ; i < attrs.size() ; i++) {
			
			HvmAttribute attr = attrs.get(i);
			
			String pssPrjId = attr.getPrjId();
			String pssPrjName = attr.getPrjName();
			
			String valueId = attr.getValueId();
			String valueName = attr.getValueName();
			
			ResultByValue result = valueResultMap.get(pssPrjId + valueId + valueName);
			if (result == null) {
				result = new ResultByValue();
				
				Map<String, String> pssPrjMap = new LinkedHashMap<String, String>();
				pssPrjMap.put("pssPrjId", attr.getPrjId());
				pssPrjMap.put("pssPrjName", attr.getPrjName());
				pssPrjMap.put("pssPrjPicture", attr.getPrjPicture());
				pssPrjMap.put("pssPrjDesc", attr.getPrjDesc());
				result.setPssPrj(pssPrjMap);
				
				Map<String, String> pssValueMap = new LinkedHashMap<String, String>();
				pssValueMap.put("pssValueId", attr.getValueId());
				pssValueMap.put("pssValueName", attr.getValueName());
				result.setPssValue(pssValueMap);
				
				
				Map<String, String> sbpPrjMap = new LinkedHashMap<String, String>();
				sbpPrjMap.put("sbpPrjId", attr.getSbpPrjId());
				sbpPrjMap.put("sbpPrjName", attr.getSbpPrjName());
				result.setSbpPrj(sbpPrjMap);

				valueResultMap.put(pssPrjId + valueId + valueName, result);
			}
			
			List<Map<String, Object>> acts = result.getSbpActs();
			if (acts == null) {
				acts = new ArrayList<Map<String, Object>>();
				result.setSbpActs(acts);
			}
			if (acts.size() == 0) {
				acts.add(getNewActMap(attr));
			} else {
				boolean isExist = false;
				for (int j =0; j < acts.size(); j++) {
					Map<String, Object> actMap = acts.get(j);
					String actName = (String)actMap.get("sbpActName");
					if (actName != null && actName.equalsIgnoreCase(attr.getActivityName())) {
						isExist = true;

						List<Map<String, String>> attrList = (List<Map<String, String>>)actMap.get("hvmAttrs");
						if (attrList == null)
							attrList = new ArrayList<Map<String, String>>();
						
						Map<String, String> attrMap = new LinkedHashMap<String, String>();
						attrMap.put("hvmAttrId", attr.getId());
						attrMap.put("hvmAttrName", attr.getAttrName());
						attrMap.put("hvmAttrType", attr.getAttrType());
						attrList.add(attrMap);
						//actMap.put("hvmAttrs", attrList);
						break;
					}
				}
				if (!isExist) {
					acts.add(getNewActMap(attr));
				}
			}
		}
		
		List<ResultByValue> resultList = new ArrayList<ResultByValue>();
		
		if (valueResultMap == null)
			return null;
		Iterator itr = valueResultMap.keySet().iterator();
		while (itr.hasNext()) {
			String key = (String)itr.next();
			ResultByValue value = valueResultMap.get(key);
			resultList.add(value);
		}
		//Collections.reverse(resultList);
		return resultList;
	}
	
	
	///////////  activity List
	
	@Override
	public long getActivityListSize(Condition cond) throws Exception {
		return getDao().getActivityListSize(cond);
	}
	@Override
	public List<ResultByActivity> getActivityList(Condition cond) throws Exception {
		
		List<HvmAttribute> attrs = getDao().getActivityList(cond);
		if (attrs == null || attrs.size() == 0)
			return null;
		
		Map<String, ResultByActivity> activityResultMap = new LinkedHashMap<String, ResultByActivity>();
		for (int i = 0 ; i < attrs.size() ; i++) {
			
			HvmAttribute attr = attrs.get(i);
			
			String pssPrjId = attr.getPrjId();
			String pssPrjName = attr.getPrjName();
			
			String activityId = attr.getActivityId();
			String activityName = attr.getActivityName();
			
			ResultByActivity result = activityResultMap.get(pssPrjId + activityId + activityName);
			if (result == null) {
				result = new ResultByActivity();
				
				Map<String, String> pssPrjMap = new LinkedHashMap<String, String>();
				pssPrjMap.put("pssPrjId", attr.getPrjId());
				pssPrjMap.put("pssPrjName", attr.getPrjName());
				pssPrjMap.put("pssPrjPicture", attr.getPrjPicture());
				pssPrjMap.put("pssPrjDesc", attr.getPrjDesc());
				result.setPssPrj(pssPrjMap);
				
				Map<String, String> sbpActivityMap = new LinkedHashMap<String, String>();
				sbpActivityMap.put("sbpActId", attr.getActivityId());
				sbpActivityMap.put("sbpActName", attr.getActivityName());
				sbpActivityMap.put("sbpId", attr.getSbpId());
				sbpActivityMap.put("sbpName", attr.getSbpName());
				result.setSbpActivity(sbpActivityMap);
				
				Map<String, String> sbpPrjMap = new LinkedHashMap<String, String>();
				sbpPrjMap.put("sbpPrjId", attr.getSbpPrjId());
				sbpPrjMap.put("sbpPrjName", attr.getSbpPrjName());
				result.setSbpPrj(sbpPrjMap);

				activityResultMap.put(pssPrjId + activityId + activityName, result);
			}
			
			List<Map<String, Object>> values = result.getPssValues();
			if (values == null) {
				values = new ArrayList<Map<String, Object>>();
				result.setPssValues(values);
			}
			if (values.size() == 0) {
				values.add(getNewValueMap(attr));
			} else {
				boolean isExist = false;
				for (int j =0; j < values.size(); j++) {
					Map<String, Object> valueMap = values.get(j);
					String valueName = (String)valueMap.get("pssValueName");
					if (valueName != null && valueName.equalsIgnoreCase(attr.getValueName())) {
						isExist = true;

						List<Map<String, String>> attrList = (List<Map<String, String>>)valueMap.get("hvmAttrs");
						if (attrList == null)
							attrList = new ArrayList<Map<String, String>>();
						
						Map<String, String> attrMap = new LinkedHashMap<String, String>();
						attrMap.put("hvmAttrId", attr.getId());
						attrMap.put("hvmAttrName", attr.getAttrName());
						attrMap.put("hvmAttrType", attr.getAttrType());
						attrList.add(attrMap);
						//actMap.put("hvmAttrs", attrList);
						break;
					}
				}
				if (!isExist) {
					values.add(getNewValueMap(attr));
				}
			}
		}
		
		List<ResultByActivity> resultList = new ArrayList<ResultByActivity>();
		
		if (activityResultMap == null)
			return null;
		Iterator itr = activityResultMap.keySet().iterator();
		while (itr.hasNext()) {
			String key = (String)itr.next();
			ResultByActivity value = activityResultMap.get(key);
			resultList.add(value);
		}
		return resultList;
	}
	
	////////// attribute list
	

	@Override
	public long getAttributeListSize(Condition cond) throws Exception {
		return getDao().getAttributeListSize(cond);
	}
	@Override
	public List<ResultByAttribute> getAttributeList(Condition cond) throws Exception {
		
		List<HvmAttribute> attrs = getDao().getAttributeList(cond);
		if (attrs == null || attrs.size() == 0)
			return null;

		List<ResultByAttribute> resultList = new ArrayList<ResultByAttribute>();
		for (int i = 0; i < attrs.size(); i++) {
			HvmAttribute attr = attrs.get(i);
			
			ResultByAttribute result = new ResultByAttribute();
			
			Map<String, String> pssPrj = new LinkedHashMap();
			pssPrj.put("pssPrjId", attr.getPrjId());
			pssPrj.put("pssPrjName", attr.getPrjName());
			pssPrj.put("pssPrjPicture", attr.getPrjPicture());
			pssPrj.put("pssPrjDesc", attr.getPrjDesc());
			
			Map<String, String> sbpPrj = new LinkedHashMap();
			sbpPrj.put("sbpPrjId", attr.getSbpPrjId());
			sbpPrj.put("sbpPrjName", attr.getSbpPrjName());
			
			Map<String, String> pssValue = new LinkedHashMap();
			pssValue.put("pssValueId", attr.getValueId());
			pssValue.put("pssValueName", attr.getValueName());
			
			Map<String, String> sbpActs = new LinkedHashMap();
			sbpActs.put("sbpActId", attr.getActivityId());
			sbpActs.put("sbpActName", attr.getActivityName());
			sbpActs.put("sbpId", attr.getSbpId());
			sbpActs.put("sbpName", attr.getSbpName());
			
			Map<String, String> hvmAttribute = new LinkedHashMap();
			hvmAttribute.put("hvmAttrId", attr.getId());
			hvmAttribute.put("hvmAttrName", attr.getAttrName());
			hvmAttribute.put("hvmAttrType", attr.getAttrType());
			
			result.setPssPrj(pssPrj);
			result.setSbpPrj(sbpPrj);
			result.setPssValue(pssValue);
			result.setSbpAct(sbpActs);
			result.setHvmAttribute(hvmAttribute);
			
			resultList.add(result);
		}
		return resultList;
	}
	
	private static Map<String, Object> getNewActMap(HvmAttribute attr) {
		Map<String, Object> actMap = new HashMap<String, Object>();
		actMap.put("sbpActId", attr.getActivityId());
		actMap.put("sbpActName", attr.getActivityName());
		actMap.put("sbpId", attr.getSbpId());
		actMap.put("sbpName", attr.getSbpName());
		
		List<Map<String, String>> attrList = new ArrayList<Map<String, String>>();
		Map<String, String> attrMap = new HashMap<String, String>();
		attrMap.put("hvmAttrId", attr.getId());
		attrMap.put("hvmAttrName", attr.getAttrName());
		attrMap.put("hvmAttrType", attr.getAttrType());
		attrList.add(attrMap);
		actMap.put("hvmAttrs", attrList);
		return actMap;
	}
	private static Map<String, Object> getNewValueMap(HvmAttribute attr) {
		Map<String, Object> valueMap = new HashMap<String, Object>();
		valueMap.put("pssValueId", attr.getValueId());
		valueMap.put("pssValueName", attr.getValueName());
		
		List<Map<String, String>> attrList = new ArrayList<Map<String, String>>();
		Map<String, String> attrMap = new HashMap<String, String>();
		attrMap.put("hvmAttrId", attr.getId());
		attrMap.put("hvmAttrName", attr.getAttrName());
		attrMap.put("hvmAttrType", attr.getAttrType());
		attrList.add(attrMap);
		valueMap.put("hvmAttrs", attrList);
		return valueMap;
	}
	@Override
	public List<PssProject> getPssProject(String nameLike) throws Exception {
		return getDao().getPssProject(nameLike);
	}

	@Override
	public List<PssValue> getPssValue(String pssPrjId) throws Exception {
		
		List<PssValue> valueList = getDao().getPssValue(pssPrjId);
		
		List<PssValue> resultList = null;
		if (valueList != null) {
			resultList = new ArrayList<PssValue>();
			
			for (int i = 0; i < valueList.size(); i++) {
				PssValue valueObj = valueList.get(i);
				
				//name;name;name;name;name;...
				String nameBuff = valueObj.getPssValueName();
				String[] names = nameBuff.split(";+");
				if (names == null || names.length == 0)
					continue;
				for (int j = 0; j < names.length; j++) {
					String name = names[j];
					PssValue pv = new PssValue();
					pv.setPssValueId(valueObj.getPssValueId());
					pv.setPssValueName(name);
					resultList.add(pv);
				}
			}
		}
		return resultList;
	}
}
