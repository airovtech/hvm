package net.smartworks.dao.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
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

public class HvmDaoImpl implements IHvmDao {

	private DataSource dataSource;
	
	private JdbcTemplate jdbcTemplateObject;
   
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplateObject = new JdbcTemplate(dataSource);
	}

	@Override
	public Long getHvmProjectSize(String userId, HvmProjectCond cond) throws Exception {

		String searchKey = cond.getSearchKey();
		String pssPrjId = cond.getPssPrjId();

		StringBuffer query = new StringBuffer();
		query.append("select count(*) ");
		
		setProjectQuery(query, cond);

		Long totalSize = 0L;
		if (searchKey != null && searchKey.length() != 0) {
			String likeSearchKey = "%" + searchKey + "%";
			if (pssPrjId != null) {
				totalSize = jdbcTemplateObject.queryForObject(query.toString(), new Object[]{likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey, pssPrjId}, Long.class);
			} else {
				totalSize = jdbcTemplateObject.queryForObject(query.toString(), new Object[]{likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey}, Long.class);
			}
		} else {
			
			if (pssPrjId != null) {
				totalSize = jdbcTemplateObject.queryForObject(query.toString(), new Object[]{pssPrjId} ,Long.class);
			} else {
				totalSize = jdbcTemplateObject.queryForObject(query.toString(), Long.class);
			}
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

		final int pageNo = cond.getPageNo();
		final int pageSize = cond.getPageSize();
		final int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		final String searchKey = cond.getSearchKey();
		final String pssPrjId = cond.getPssPrjId();
		
		
		StringBuffer query = new StringBuffer();
		query.append(" select * ");
		
		setProjectQuery(query, cond);

		query.append(" order by lastmodifieddate desc ");
		query.append(" limit ? ");
		query.append(" offset ? ");
		
		List<HvmProject> projectList = jdbcTemplateObject.query(query.toString(), 
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
							if (pssPrjId != null) {
								preparedStatement.setString(8, pssPrjId);
								preparedStatement.setInt(9, pageSize);
								preparedStatement.setInt(10, offSet);
							} else {
								preparedStatement.setInt(8, pageSize);
								preparedStatement.setInt(9, offSet);
							}
						} else {
							
							if (pssPrjId != null) {
								preparedStatement.setString(1, pssPrjId);
								preparedStatement.setInt(2, pageSize);
								preparedStatement.setInt(3, offSet);
							} else {
								preparedStatement.setInt(1, pageSize);
								preparedStatement.setInt(2, offSet);
							}
							
						}
		            }
				}
				, new HvmProjectMapper());
		
		if (projectList == null || projectList.size() == 0)
			return null;
		
		StringBuffer attrQuery = new StringBuffer();
		attrQuery.append(" select * from HvmAttribute where prjid=? order by valuename");
		
		//HvmProject[] projects = new HvmProject[projectList.size()];
		
		for (int i = 0; i < projectList.size(); i++) {
			HvmProject project = projectList.get(i);
			//attribute 조회
			HvmAttribute[] attrs = null;
			
			final String projectId = project.getId();
			
			List<HvmAttribute> attrList = jdbcTemplateObject.query(attrQuery.toString(), 
					new PreparedStatementSetter(){
						public void setValues(PreparedStatement preparedStatement) throws SQLException {
							preparedStatement.setString(1, projectId);
			            }
					}
					, new HvmAttributeMapper());
			
			//
			
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
		final int pageNo = cond.getPageNo();
		final int pageSize = cond.getPageSize();
		final int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		final String searchKey = cond.getSearchKey();
		
		
		StringBuffer query = new StringBuffer();
		query.append(" select attr.*, prj.id as prjObjId, prj.pssPrjId, prj.pssPrjName, prj.sbpPrjId, prj.sbpPrjName ");
		
		setAttributeQuery(query, cond);
		
		String orderColumn = cond.getOrderColumn();
		if (orderColumn != null) {
			query.append(" order by ").append(orderColumn);
			if (cond.isDescending())
				query.append(" desc ");
		}
		
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
	public List<SkkupssPssProject> getSkkupssPssProject(String userId,final String psId) throws Exception {
		
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
	
}
