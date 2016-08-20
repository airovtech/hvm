package net.smartworks.manager;

import java.util.List;
import java.util.Map;

import net.smartworks.model.hvm.HvmAttribute;
import net.smartworks.model.hvm.HvmAttributeCond;
import net.smartworks.model.hvm.HvmProject;
import net.smartworks.model.hvm.HvmProjectCond;

public interface IHvmManager {
	
	public Map getHvmProjectSize(String userId, HvmProjectCond cond) throws Exception;
	
	public List<HvmProject> getHvmProjects(String userId, HvmProjectCond cond, String level) throws Exception;
	
	public boolean setHvmProject(String userId, HvmProject project) throws Exception;
	
	public boolean removeHvmProject(String userId, String projectId) throws Exception;
	
	public Map getHvmAttributeSize(String userId, HvmAttributeCond cond) throws Exception;
	
	public List<HvmAttribute> getHvmAttributes(String userId, HvmAttributeCond cond) throws Exception;
	
}
