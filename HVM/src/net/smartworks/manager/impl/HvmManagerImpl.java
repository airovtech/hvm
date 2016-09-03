package net.smartworks.manager.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.smartworks.dao.IHvmDao;
import net.smartworks.dao.IUserDao;
import net.smartworks.factory.HvmDaoFactory;
import net.smartworks.manager.IHvmManager;
import net.smartworks.model.SkkupssPssProject;
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
		
		if (project.getCreatedUser() == null || project.getCreatedUser().length() == 0) {
			project.setCreatedUser(userId);
		}
		if (project.getCreatedDate() == null) {
			project.setCreatedDate(new Date());
		}
		project.setLastModifiedUser(userId);
		project.setLastModifiedDate(new Date());
		
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
	@Override
	public List<SkkupssPssProject> getSkkupssPssProject(String userId, String psId) throws Exception {

		List<SkkupssPssProject> result = this.getHvmDao().getSkkupssPssProject(userId, psId);
		return result;
	}
	@Override
	public boolean setHvmAttributeWithProject(String userId, HvmProject project, int attrIndex) throws Exception {
		
		if (project == null || attrIndex < 0)
			return false;
		
		project.setLastModifiedUser(userId);
		project.setLastModifiedDate(new Date());
		
		
		//프로젝트를 조회한 후에 기존에 있다면 업데이트 후 어트리뷰트만 저장, 없다면 프로젝트 저장 후 어트리뷰트 저장
		
		if (project.getAttributes() != null) {
			List<HvmAttribute> list = project.getAttributes();
			HvmAttribute attribute = list.get(attrIndex);
			if (attribute == null) 
				return false;

			//프로젝트만 상태없데이트 하기 위해 어트리뷰트는 제거한다 setHvmProject 에서 attrbute 가 없다면 projet만 저장한다 
			project.setAttributes(null);
			//프로젝트 저장 
			this.setHvmProject(userId, project);
			
			//어트리뷰트 저장
			this.setHvmAttribute(userId, attribute);
			
		}
		return true;
	}
	public boolean setHvmAttribute(String userId, HvmAttribute attribute) throws Exception {
		this.getHvmDao().setHvmAttribute(userId, attribute);
		return true;
	}
	@Override
	public boolean removeHvmAttribute(String userId, String attributeId) throws Exception {
		this.getHvmDao().removeHvmAttribute(userId, attributeId);
		return true;
	}
	

}
