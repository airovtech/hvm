package net.smartworks.dao;

import java.util.List;

import net.smartworks.model.Condition;
import net.smartworks.model.HvmAttribute;
import net.smartworks.model.PssProject;
import net.smartworks.model.PssValue;

public interface IHvmDao {
	
	public void removeAttribute(List<HvmAttribute> attrs) throws Exception;

	public void setAttribute(List<HvmAttribute> attrs) throws Exception;
	
	public long getValueListSize(Condition cond) throws Exception;
	
	public List<HvmAttribute> getValueList(Condition cond) throws Exception;
	
	public long getActivityListSize(Condition cond) throws Exception;
	
	public List<HvmAttribute> getActivityList(Condition cond) throws Exception;
	
	public long getAttributeListSize(Condition cond) throws Exception;
	
	public List<HvmAttribute> getAttributeList(Condition cond) throws Exception;
	
	public List<PssProject> getPssProject(String nameLike) throws Exception;
	
	public List<PssValue> getPssValue(String pssPrjId) throws Exception;
	
	public List getTestDbData() throws Exception ;
}
