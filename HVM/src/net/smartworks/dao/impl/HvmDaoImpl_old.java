package net.smartworks.dao.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import net.smartworks.dao.IHvmDao;
import net.smartworks.dao.mapper.HvmAttributeMapper;
import net.smartworks.dao.mapper.HvmProjectMapper;
import net.smartworks.dao.mapper.SkkupssPssProjectMapper;
import net.smartworks.model.SkkupssPssProject;
import net.smartworks.model.hvm.HvmAttribute;
import net.smartworks.model.hvm.HvmAttributeCond;
import net.smartworks.model.hvm.HvmProject;
import net.smartworks.model.hvm.HvmProjectCond;

public class HvmDaoImpl_old{

	/*private DataSource dataSource;
	
	private JdbcTemplate jdbcTemplateObject;
   
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplateObject = new JdbcTemplate(dataSource);
	}

	
//	@Override
//	public List<HvmProject> test(String userId, HvmProjectCond cond) throws Exception {
//		
//		StringBuffer prjSql = new StringBuffer();
//	    prjSql.append(" select * from hvmproject");
//	    
//	    String id = null;
//	    String prjName = null;
//	    String sbpPrjName = null;
//	    
//	    Object[] args = null;
//	    if (cond != null) {
//	    	
//	    	List argsList = new ArrayList();
//	    	
//	    	id = cond.getId();
//	    	prjName = cond.getPssPrjName();
//	    	sbpPrjName = cond.getSbpPrjName();
//	    	
//	    	prjSql.append(" where ");
//	    	if (id != null) {
//	    		prjSql.append(" id = ? ");
//	    		argsList.add("%"+id+"%");
//	    	}
//	    	if (prjName != null) {
//	    		prjSql.append(" pssprjname like ? ");
//	    		argsList.add("%"+prjName+"%");
//	    	}
//	    	if (sbpPrjName != null) {
//	    		prjSql.append(" sbpPrjName like ? ");
//	    		argsList.add("%"+sbpPrjName+"%");
//	    	}
//	    	
//	    	args = new Object[argsList.size()];
//	    	argsList.toArray(args);
//	    	
//	    }
//	    
//	    List<HvmProject> result = jdbcTemplateObject.query(prjSql.toString(), new HvmProjectMapper(), args);
//	    
//	    return result;
//	    
//	}
	
	
	@Override
	public Long getHvmProjectSize(String userId, HvmProjectCond cond) throws Exception {

		String searchKey = cond.getSearchKey();

		StringBuffer query = new StringBuffer();
		query.append("select count(*) ");
		
		setProjectQuery(query, cond);

		Long totalSize = 0L;
		if (searchKey != null && searchKey.length() != 0) {
			String likeSearchKey = "%" + searchKey + "%";
			totalSize = jdbcTemplateObject.queryForObject(query.toString(), new Object[]{likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey}, Long.class);
		} else {
			totalSize = jdbcTemplateObject.queryForObject(query.toString(), Long.class);
		}
		return totalSize;
	
	}
	
	private void setProjectQuery(StringBuffer query, HvmProjectCond cond) throws Exception {

		String searchKey = cond.getSearchKey();
		String pssPrjId = cond.getPssPrjId();
		
		query.append(" from ");
		query.append(" hvmproject ");
		query.append(" where  ");
		query.append(" 1=1 ");
		if (searchKey != null) {
			query.append(" and id in ");
			query.append(" ( ");
			query.append(" 	select prj.id ");
			query.append(" 	from  ");
			query.append(" 	hvmattribute attr, hvmproject prj ");
			query.append(" 	where attr.prjid = prj.id ");
			query.append(" 	and ((prj.pssPrjName like ? or prj.sbpPrjName like ? or attr.valueName like ? or attr.sbpName like ? or attr.activityName like ? or attributeName like ? )");
			query.append(" 		or ( prj.createdUser in (select id from orguser where name like ?) ))");
			query.append(" 	group by prj.id ");
			query.append(" ) ");
		}
		if (pssPrjId != null) {
			query.append(" and pssPrjId=? ");
		}
	}
	
	@Override
	public List<HvmProject> getHvmProjects(String userId, HvmProjectCond cond) throws Exception {

		int pageNo = cond.getPageNo();
		int pageSize = cond.getPageSize();
		int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		String searchKey = cond.getSearchKey();
		String pssPrjId = cond.getPssPrjId();
		
		
		StringBuffer query = new StringBuffer();
		query.append(" select * ");
		
		setProjectQuery(query, cond);

		query.append(" order by lastmodifieddate desc ");
		query.append(" limit ? ");
		query.append(" offset ? ");
		
		List argsList = new ArrayList();
		if (searchKey != null && searchKey.length() != 0) {
			String likeSearchKey = "%" + searchKey + "%";
			argsList.add(likeSearchKey);
			argsList.add(likeSearchKey);
			argsList.add(likeSearchKey);
			argsList.add(likeSearchKey);
			argsList.add(likeSearchKey);
			argsList.add(likeSearchKey);
			argsList.add(likeSearchKey);
			if (pssPrjId != null) {
				argsList.add(pssPrjId);
				argsList.add(pageSize);
				argsList.add(offSet);
			} else {
				argsList.add(pageSize);
				argsList.add(offSet);
			}
		} else {
			if (pssPrjId != null) {
				argsList.add(pssPrjId);
				argsList.add(pageSize);
				argsList.add(offSet);
			} else {
				argsList.add(pageSize);
				argsList.add(offSet);
			}
		}
		Object[] args = new Object[argsList.size()];
		argsList.toArray(args);
		
		List<HvmProject> projectList = jdbcTemplateObject.query(query.toString(), new HvmProjectMapper() , args);
		
		if (projectList == null || projectList.size() == 0)
			return null;
		
		StringBuffer attrQuery = new StringBuffer();
		attrQuery.append(" select * from HvmAttribute where prjid=? order by valuename");
		
		//HvmProject[] projects = new HvmProject[projectList.size()];
		
		for (int i = 0; i < projectList.size(); i++) {
			HvmProject project = projectList.get(i);
			//attribute 조회
			HvmAttribute[] attrs = null;
			
			String projectId = project.getId();
			
			
			Object[] attrArgs = new Object[1];
			attrArgs[0] = projectId;
			List<HvmAttribute> attrList = jdbcTemplateObject.query(attrQuery.toString(), new HvmAttributeMapper(), attrArgs);
			
			project.setAttributes(attrList);
			//projects[i] = project;
		}
		//return projects;
		return projectList;
	}
	
	@Override
	public boolean setHvmProject(String userId, HvmProject prj) throws Exception {
		
		if (prj == null)
			return false;
		
		this.removeHvmProject(userId, prj.getId());
		
		String prjSql = "insert into hvmproject (id, pssPrjId, pssPrjName, pssPrjDescription, pssPrjPicture"
				+ ", sbpPrjId, sbpPrjName, createdUser, lastModifiedUser, createdDate ,lastModifiedDate) "
				+ " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	      
	    jdbcTemplateObject.update(prjSql
	    		, prj.getId()
	    		, prj.getPssPrjId()
	    		, prj.getPssPrjName()
	    		, prj.getPssPrjDescription()
	    		, prj.getPssPrjPicture()
	    		, prj.getSbpPrjId()
	    		, prj.getSbpPrjName()
	    		, prj.getCreatedUser()
	    		, prj.getLastModifiedUser()
	    		, prj.getCreatedDate()
	    		, prj.getLastModifiedDate()
	    		);
		
		final List<HvmAttribute> attrs = prj.getAttributes();
		if (attrs != null) {
			StringBuffer attrSql = new StringBuffer().append("insert into hvmattribute ");
			attrSql.append(" (id, prjid, valueid, valuename, sbpid, sbpname, activityid, activityname, attributetype, attributename) ");
			attrSql.append(" values (? ,? ,? ,? ,? ,? ,? ,? ,? ,?)");

			
			jdbcTemplateObject.batchUpdate(attrSql.toString(), new BatchPreparedStatementSetter() {

				@Override
				public void setValues(PreparedStatement ps, int i) throws SQLException {
					HvmAttribute attribute = attrs.get(i);
					ps.setString(1, attribute.getId());
					ps.setString(2, attribute.getPrjId());
					ps.setString(3, attribute.getValueId());
					ps.setString(4, attribute.getValueName());
					ps.setString(5, attribute.getSbpId());
					ps.setString(6, attribute.getSbpName());
					ps.setString(7, attribute.getActivityId());
					ps.setString(8, attribute.getActivityName());
					ps.setString(9, attribute.getAttributeType());
					ps.setString(10, attribute.getAttributeName());
				}
				@Override
				public int getBatchSize() {
					return attrs.size();
				}
			});
		}
		return true;
	}

	@Override
	public boolean removeHvmProject(String userId, String prjId) throws Exception {
		
		StringBuffer attrQuery = new StringBuffer().append("delete from hvmattribute where prjid = ? ");
		StringBuffer prjQuery = new StringBuffer().append("delete from hvmproject where id=?");

		jdbcTemplateObject.update(attrQuery.toString(), prjId);
		jdbcTemplateObject.update(prjQuery.toString(), prjId);
		
		return true;
	}
	

	private void setAttributeQuery(StringBuffer query, HvmAttributeCond cond) throws Exception {
		
		String searchKey = cond.getSearchKey();
		
		query.append(" 	from  ");
		query.append(" 	hvmattribute attr, hvmproject prj ");
		query.append(" 	where attr.prjid = prj.id ");
		if (searchKey != null) {
			query.append(" 	and ((prj.pssPrjName like ? or prj.sbpPrjName like ? or attr.valueName like ? or attr.sbpName like ? or attr.activityName like ? or attributeName like ? )");
			query.append(" 		or ( prj.createdUser in (select id from orguser where name like ?) ))");
		}
		
	}
	@Override
	public Long getHvmAttributeSize(String userId, HvmAttributeCond cond) throws Exception {

		String searchKey = cond.getSearchKey();

		StringBuffer query = new StringBuffer();
		query.append("select count(*) ");
		
		setAttributeQuery(query, cond);

		Long totalSize = 0L;
		if (searchKey != null && searchKey.length() != 0) {
			String likeSearchKey = "%" + searchKey + "%";
			totalSize = jdbcTemplateObject.queryForObject(query.toString(), new Object[]{likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey}, Long.class);
		} else {
			totalSize = jdbcTemplateObject.queryForObject(query.toString(), Long.class);
		}
		return totalSize;
	
	}
	
	@Override
	public List<HvmAttribute> getHvmAttributes(String userId, HvmAttributeCond cond) throws Exception {
		int pageNo = cond.getPageNo();
		int pageSize = cond.getPageSize();
		int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		String searchKey = cond.getSearchKey();
		
		
		StringBuffer query = new StringBuffer();
		query.append(" select attr.*, prj.id as prjObjId, prj.pssPrjId, prj.pssPrjName, prj.sbpPrjId, prj.sbpPrjName ");
		
		setAttributeQuery(query, cond);
		
		query.append(" limit ? ");
		query.append(" offset ? ");
		
		List<HvmAttribute> attrList = jdbcTemplateObject.query(query.toString(), 
				new PreparedStatementSetter(){
					public void setValues(PreparedStatement preparedStatement) throws SQLException {
						if (searchKey != null && searchKey.length() != 0) {
							String likeSearchKey = "%" + searchKey + "%";
							preparedStatement.setString(1, likeSearchKey);
							preparedStatement.setString(2, likeSearchKey);
							preparedStatement.setString(3, likeSearchKey);
							preparedStatement.setString(4, likeSearchKey);
							preparedStatement.setString(5, likeSearchKey);
							preparedStatement.setString(6, likeSearchKey);
							preparedStatement.setString(7, likeSearchKey);
							preparedStatement.setInt(8, pageSize);
							preparedStatement.setInt(9, offSet);
						} else {
							preparedStatement.setInt(1, pageSize);
							preparedStatement.setInt(2, offSet);
						}
		            }
				}
				, new HvmAttributeMapper());
		
		return attrList;
	}

	@Override
	public List<SkkupssPssProject> getSkkupssPssProject(String userId, String psId) throws Exception {
		
		StringBuffer query = new StringBuffer();
		query.append(" select id, name, picture, description from productservice where id=? ");
		
		List<SkkupssPssProject> pssPrj = jdbcTemplateObject.query(query.toString(), 
				new PreparedStatementSetter(){
					public void setValues(PreparedStatement preparedStatement) throws SQLException {
						preparedStatement.setString(1, psId);
		            }
				}
				, new SkkupssPssProjectMapper());
		return pssPrj;
	}
	*/
}
