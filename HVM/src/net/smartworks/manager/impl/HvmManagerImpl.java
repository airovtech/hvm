package net.smartworks.manager.impl;

import java.util.ArrayList;
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

public class HvmManagerImpl implements IHvmManager {

	private IHvmDao getDao() {
		return HvmDaoFactory.getInstance().getHvmDao();
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
			
			ResultByValue result = valueResultMap.get(pssPrjId + valueId);
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

				valueResultMap.put(pssPrjId + valueId, result);
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
			
			ResultByActivity result = activityResultMap.get(pssPrjId + activityId);
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

				activityResultMap.put(pssPrjId + activityId, result);
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
