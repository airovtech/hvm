package net.smartworks.manager.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.smartworks.dao.IHvmDao;
import net.smartworks.dao.IUserDao;
import net.smartworks.factory.HvmDaoFactory;
import net.smartworks.manager.IHvmManager;
import net.smartworks.model.hvm.HvmAttribute;
import net.smartworks.model.hvm.HvmAttributeCond;
import net.smartworks.model.hvm.HvmProject;
import net.smartworks.model.hvm.HvmProjectCond;

public class HvmManagerImpl implements IHvmManager {

	private IHvmDao getHvmDao() {
		return HvmDaoFactory.getInstance().getHvmDao();
	}
	private IUserDao getUserDao() {
		return HvmDaoFactory.getInstance().getUserDao();
	}

	@Override
	public Map getHvmProjectSize(String userId, HvmProjectCond cond) throws Exception {
		
		Long totalSize = this.getHvmDao().getHvmProjectSize(userId, cond);
		Map resultMap = new HashMap();
		resultMap.put("totalSize", totalSize);
		return resultMap;
		
	}

	@Override
	public List<HvmProject> getHvmProjects(String userId, HvmProjectCond cond, String level) throws Exception {

		List<HvmProject> result = this.getHvmDao().getHvmProjects(userId, cond);
		
		if (result != null) {
			for (int i = 0; i < result.size(); i++) {
				HvmProject project = result.get(i);
				String createdUserId = project.getCreatedUser();
				if (createdUserId != null)
					project.setCreatedUserObj(this.getUserDao().getUser(project.getCreatedUser()));
				
				List<HvmAttribute> attrs = project.getAttributes();
				if (attrs != null && attrs.size() != 0) {
					List sbpGroupList = new ArrayList();
					for (int j = 0; j < attrs.size(); j++) {
						HvmAttribute attr = attrs.get(j);

						String sbpPrjName = project.getSbpPrjName();
						String sbpName = attr.getSbpName();
						
						if (sbpName != null && !sbpGroupList.contains(sbpPrjName+"_"+sbpName)) {
							sbpGroupList.add(sbpPrjName+"_"+sbpName);
						}
					}
					project.setSbpGroupList(sbpGroupList);
				}
			}
		}
		
		return result;
	}
	
	@Override
	public boolean setHvmProject(String userId, HvmProject project) throws Exception {
		
		this.getHvmDao().setHvmProject(userId, project);
		return true;
		
	}

	@Override
	public boolean removeHvmProject(String userId, String projectId) throws Exception {
		this.getHvmDao().removeHvmProject(userId, projectId);
		return true;
		
	}
	@Override
	public Map getHvmAttributeSize(String userId, HvmAttributeCond cond) throws Exception {
		
		Long totalSize = this.getHvmDao().getHvmAttributeSize(userId, cond);
		Map resultMap = new HashMap();
		resultMap.put("totalSize", totalSize);
		return resultMap;
		
	}
	
	@Override
	public List<HvmAttribute> getHvmAttributes(String userId, HvmAttributeCond cond) throws Exception {
		
		List<HvmAttribute> result = this.getHvmDao().getHvmAttributes(userId, cond);
		return result;
	}

}
