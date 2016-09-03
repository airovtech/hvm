package net.smartworks.dao;

import java.util.List;

import net.smartworks.model.SkkupssPssProject;
import net.smartworks.model.hvm.HvmAttribute;
import net.smartworks.model.hvm.HvmAttributeCond;
import net.smartworks.model.hvm.HvmProject;
import net.smartworks.model.hvm.HvmProjectCond;

public interface IHvmDao {
	
	public List<SkkupssPssProject> getSkkupssPssProject(String userId, String psId) throws Exception;
	
	public Long getHvmProjectSize(String userId, HvmProjectCond cond) throws Exception;
	
	public List<HvmProject> getHvmProjects(String userId, HvmProjectCond cond) throws Exception;
	
	public boolean removeHvmProject(String userId, String prjId) throws Exception;
	
	public boolean removeHvmAttributeByPrjId(String userId, String prjId) throws Exception;
	
	public boolean setHvmProject(String userId, HvmProject prj) throws Exception;

	public boolean setHvmAttribute(String userId, HvmAttribute attribute) throws Exception;
	
	public boolean removeHvmAttribute(String userId, String attributeId) throws Exception;
	
	public Long getHvmAttributeSize(String userId, HvmAttributeCond cond) throws Exception;
	
	public List<HvmAttribute> getHvmAttributes(String userId, HvmAttributeCond cond) throws Exception;
}
