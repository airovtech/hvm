package net.smartworks.manager;

import java.util.List;
import java.util.Map;

import net.smartworks.model.Condition;
import net.smartworks.model.PssProject;
import net.smartworks.model.PssValue;
import net.smartworks.model.ResultByActivity;
import net.smartworks.model.ResultByAttribute;
import net.smartworks.model.ResultByValue;

public interface IHvmManager {

	public Map removeAttribute(String setMode, Map obj) throws Exception;
	
	public Map setAttribute(String setMode, Map obj) throws Exception;
	
	public long getValueListSize(Condition cond) throws Exception;
	
	public List<ResultByValue> getValueList(Condition cond) throws Exception;

	public long getActivityListSize(Condition cond) throws Exception;
	
	public List<ResultByActivity> getActivityList(Condition cond) throws Exception;
	
	public long getAttributeListSize(Condition cond) throws Exception;
	
	public List<ResultByAttribute> getAttributeList(Condition cond) throws Exception;
	
	public List<PssProject> getPssProject(String nameLike) throws Exception;
	
	public List<PssValue> getPssValue(String pssPrjId) throws Exception;
	
}
