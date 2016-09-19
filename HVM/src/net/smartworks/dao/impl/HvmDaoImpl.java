package net.smartworks.dao.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.apache.commons.lang.StringUtils;

import net.smartworks.dao.IHvmDao;
import net.smartworks.dao.mapper.HvmAttributeMapper;
import net.smartworks.dao.mapper.HvmProjectMapper;
import net.smartworks.dao.mapper.SkkupssPssProjectMapper;
import net.smartworks.model.Filter;
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

		StringBuffer query = new StringBuffer();
		query.append("select count(*) ");
		
		List<Object> setParam = setProjectQuery(query, cond);
		
		Object[] setParamsArray = null;
		if (setParam.size() != 0) {
			setParamsArray = new Object[setParam.size()];
			setParam.toArray(setParamsArray);
		}
		
		Long totalSize = jdbcTemplateObject.queryForObject(query.toString(), setParamsArray ,Long.class);
		
		return totalSize;
	
	}
	
	private List<Object> setProjectQuery(StringBuffer query, HvmProjectCond cond) throws Exception {

		String pssPrjId = cond.getPssPrjId();
		
		List<Filter> filters = cond.getFilters();
		
		List<Object> setParams = new ArrayList<Object>();
		
		query.append(" from ");
		query.append(" hvmproject ");
		query.append(" where  ");
		query.append(" 1=1 ");
		if (filters != null && filters.size() != 0) {
			
			query.append(" and id in ");
			query.append(" ( ");
			query.append(" 	select prj.id ");
			query.append(" 	from  ");
			query.append(" 	hvmattribute attr, hvmproject prj ");
			query.append(" 	where attr.prjid = prj.id ");
			
			for (int i = 0; i < filters.size(); i++) {
				
				query.append(" and ");
				
				Filter filter = filters.get(i);
				
				String left = filter.getLeft();
				String operator = filter.getOperator();
				String right = filter.getRight();

				if (left == null || operator == null || right == null)
					continue;
				
				String[] rightArray = StringUtils.split(right, " ");
				
				if (left.equalsIgnoreCase("all")) {

					if (rightArray.length > 1) {
						
						query.append(" ( ");
						for (int j = 0; j < rightArray.length; j++) {
							if (j != 0)
								query.append(" or ");
							
							query.append(" ((prj.pssPrjName like ? or prj.sbpPrjName like ? or attr.valueName like ? or attr.sbpName like ? or attr.activityName like ? or attributeName like ? )");
							query.append(" 		or ( prj.createdUser in (select id from orguser where name like ?) ))");
							
							setParams.add("%"+rightArray[j]+"%");
							setParams.add("%"+rightArray[j]+"%");
							setParams.add("%"+rightArray[j]+"%");
							setParams.add("%"+rightArray[j]+"%");
							setParams.add("%"+rightArray[j]+"%");
							setParams.add("%"+rightArray[j]+"%");
							setParams.add("%"+rightArray[j]+"%");
							
						}
						query.append(" ) ");
						
					} else {
						query.append(" ((prj.pssPrjName like ? or prj.sbpPrjName like ? or attr.valueName like ? or attr.sbpName like ? or attr.activityName like ? or attributeName like ? )");
						query.append(" 		or ( prj.createdUser in (select id from orguser where name like ?) ))");
						
						setParams.add("%"+right+"%");
						setParams.add("%"+right+"%");
						setParams.add("%"+right+"%");
						setParams.add("%"+right+"%");
						setParams.add("%"+right+"%");
						setParams.add("%"+right+"%");
						setParams.add("%"+right+"%");
						
					}
				} else {
					if (rightArray.length > 1) {
						query.append(" ( ");
						for (int j = 0; j < rightArray.length; j++) {
							if (j != 0)
								query.append(" or ");
							query.append(left).append(" ").append(operator).append(" ? ");
							
							if (operator.equalsIgnoreCase("like")) {
								setParams.add("%"+rightArray[j]+"%");
							} else {
								setParams.add(rightArray[j]);
							}
						}
						query.append(" ) ");
					} else {
						query.append(left).append(" ").append(operator).append(" ?");
						
						if (operator.equalsIgnoreCase("like")) {
							setParams.add("%"+right+"%");
						} else {
							setParams.add(right);
						}
					}
				}
			}
			
			query.append(" 	group by prj.id ");
			query.append(" ) ");
		}
		if (pssPrjId != null) {
			query.append(" and pssPrjId = ? ");
			setParams.add(pssPrjId);
		}
		
		return setParams;
		
	}
	@Override
	public List<HvmProject> getHvmProjects(String userId, HvmProjectCond cond) throws Exception {

		final int pageNo = cond.getPageNo();
		final int pageSize = cond.getPageSize();
		final int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		StringBuffer query = new StringBuffer();
		query.append(" select * ");
		
		final List<Object> setParam = setProjectQuery(query, cond);

		query.append(" order by lastmodifieddate desc ");
		query.append(" limit ? ");
		query.append(" offset ? ");
		
		setParam.add(pageSize);
		setParam.add(offSet);
		
		Object[] setParamsArray = null;
		if (setParam.size() != 0) {
			setParamsArray = new Object[setParam.size()];
			setParam.toArray(setParamsArray);
		}
		
		List<HvmProject> projectList = jdbcTemplateObject.query(query.toString(), setParamsArray, new HvmProjectMapper());
		
		if (projectList == null || projectList.size() == 0)
			return null;
		
//		StringBuffer attrQuery = new StringBuffer();
//		attrQuery.append(" select * from HvmAttribute where prjid=? order by valuename");
//		
//		for (int i = 0; i < projectList.size(); i++) {
//			HvmProject project = projectList.get(i);
//			//attribute 조회
//			HvmAttribute[] attrs = null;
//			
//			final String projectId = project.getId();
//			
//			List<HvmAttribute> attrList = jdbcTemplateObject.query(attrQuery.toString(),new Object[]{projectId},new HvmAttributeMapper());
//			
//			project.setAttributes(attrList);
//		}
		
		
		//project를 검색하였을 경우 안에 속해있는 attribute도 검색조건에 만족하는 attribute만 조회 되어야 한다. 
		for (int i = 0; i < projectList.size(); i++) {
			HvmProject project = projectList.get(i);
			//attribute 조회
			String projectId = project.getId();
			
			HvmAttributeCond attrCond = new HvmAttributeCond();
			attrCond.setPageNo(-1);
			attrCond.setPageSize(-1);
			
			//*** 만약 검색조건이 존재한다면....프로젝트에 속한 어트리뷰트들도 같은 조건으로 검색하되, pssPrjName, sbpPrjName 검색은 제외한다.
			//project 와 attribute 를 따로따로 검색하여 리스트업한다. 
			attrCond.setSearchByProject(true);
			
			Filter filter = new Filter("prjid","=",projectId);
			
			List<Filter> filters = cond.getFilters();
			if (filters == null) {
				filters = new ArrayList();
			}
			filters.add(filter);
			
			attrCond.setFilters(filters);
			
			attrCond.setOrderColumn("valueName");
			
			List<HvmAttribute> attrList = this.getHvmAttributes(userId, attrCond);
			project.setAttributes(attrList);
			
			filters.remove(filter);
		}
		
		return projectList;
	}
	public List<HvmProject> getHvmProjects_backup(String userId, HvmProjectCond cond) throws Exception {

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
			
			this.removeHvmAttributeByPrjId(userId, prj.getId());
			
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
		
		StringBuffer prjQuery = new StringBuffer().append("delete from hvmproject where id=?");

		jdbcTemplateObject.update(prjQuery.toString(), prjId);
		
		return true;
	}

	@Override
	public boolean removeHvmAttributeByPrjId(String userId, String prjId) throws Exception {
		
		StringBuffer attrQuery = new StringBuffer().append("delete from hvmattribute where prjid = ? ");

		jdbcTemplateObject.update(attrQuery.toString(), prjId);
		
		return true;
	}
	
	
	
	
	
	private List<Object> setAttributeQuery(StringBuffer query, HvmAttributeCond cond) throws Exception {
		
		List<Filter> filters = cond.getFilters();
		
		List<Object> setParams = new ArrayList<Object>();
		
		query.append(" 	from  ");
		query.append(" 	hvmattribute attr, hvmproject prj ");
		query.append(" 	where attr.prjid = prj.id ");
		
		if (filters != null && filters.size() != 0) {
			for (int i = 0; i < filters.size(); i++) {
				
				query.append(" and ");
				
				Filter filter = filters.get(i);
				
				String left = filter.getLeft();
				String operator = filter.getOperator();
				String right = filter.getRight();

				if (left == null || operator == null || right == null)
					continue;
				
				String[] rightArray = StringUtils.split(right, " ");
				
				if (left.equalsIgnoreCase("all")) {

					if (rightArray.length > 1) {
						
						query.append(" ( ");
						for (int j = 0; j < rightArray.length; j++) {
							if (j != 0)
								query.append(" or ");
							
							if (cond.isSearchByProject()) {
								query.append(" ((prj.sbpPrjName like ? or attr.valueName like ? or attr.sbpName like ? or attr.activityName like ? or attributeName like ? )");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
							} else {
								query.append(" ((prj.pssPrjName like ? or prj.sbpPrjName like ? or attr.valueName like ? or attr.sbpName like ? or attr.activityName like ? or attributeName like ? )");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
								setParams.add("%"+rightArray[j]+"%");
							}
							query.append(" 		or ( prj.createdUser in (select id from orguser where name like ?) ))");
							setParams.add("%"+rightArray[j]+"%");
							
						}
						query.append(" ) ");
						
					} else {

						if (cond.isSearchByProject()) {
							query.append(" ((prj.sbpPrjName like ? or attr.valueName like ? or attr.sbpName like ? or attr.activityName like ? or attributeName like ? )");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
						} else {
							query.append(" ((prj.pssPrjName like ? or prj.sbpPrjName like ? or attr.valueName like ? or attr.sbpName like ? or attr.activityName like ? or attributeName like ? )");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
							setParams.add("%"+right+"%");
						}
						query.append(" 		or ( prj.createdUser in (select id from orguser where name like ?) ))");
						setParams.add("%"+right+"%");
					}
				} else {
					if (rightArray.length > 1) {
						query.append(" ( ");
						for (int j = 0; j < rightArray.length; j++) {
							if (j != 0)
								query.append(" or ");
							query.append(left).append(" ").append(operator).append(" ? ");
							
							if (operator.equalsIgnoreCase("like")) {
								setParams.add("%"+rightArray[j]+"%");
							} else {
								setParams.add(rightArray[j]);
							}
						}
						query.append(" ) ");
					} else {
						query.append(left).append(" ").append(operator).append(" ?");
						
						if (operator.equalsIgnoreCase("like")) {
							setParams.add("%"+right+"%");
						} else {
							setParams.add(right);
						}
					}
				}
			}
		}
		
		return setParams;
		
		
	}
	@Override
	public Long getHvmAttributeSize(String userId, HvmAttributeCond cond) throws Exception {

		String searchKey = cond.getSearchKey();

		StringBuffer query = new StringBuffer();
		query.append("select count(*) ");
		
		List<Object> setParam = setAttributeQuery(query, cond);
		
		Object[] setParamsArray = null;
		if (setParam.size() != 0) {
			setParamsArray = new Object[setParam.size()];
			setParam.toArray(setParamsArray);
		}
		Long totalSize = jdbcTemplateObject.queryForObject(query.toString(), setParamsArray, Long.class);
		
		return totalSize;
	
	}
	
	@Override
	public List<HvmAttribute> getHvmAttributes(String userId, HvmAttributeCond cond) throws Exception {
		final int pageNo = cond.getPageNo();
		final int pageSize = cond.getPageSize();
		final int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		StringBuffer query = new StringBuffer();
		query.append(" select attr.*, prj.id as prjObjId, prj.pssPrjId, prj.pssPrjName, prj.sbpPrjId, prj.sbpPrjName ");
		
		List<Object> setParam = setAttributeQuery(query, cond);
		
		
		String orderColumn = cond.getOrderColumn();
		if (orderColumn != null) {
			query.append(" order by ").append(orderColumn);
			if (cond.isDescending())
				query.append(" desc ");
		}
		
		if (pageSize != -1 && pageNo != -1) {
			query.append(" limit ? ");
			query.append(" offset ? ");
			
			setParam.add(pageSize);
			setParam.add(offSet);
		}
		Object[] setParamsArray = null;
		if (setParam.size() != 0) {
			setParamsArray = new Object[setParam.size()];
			setParam.toArray(setParamsArray);
		}
		
		List<HvmAttribute> attrList = jdbcTemplateObject.query(query.toString(), setParamsArray, new HvmAttributeMapper());
		
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

	@Override
	public boolean setHvmAttribute(String userId, HvmAttribute attribute) throws Exception {
		
		if (attribute == null)
			return false;
		
		this.removeHvmAttribute(userId, attribute.getId());
		
		StringBuffer attrSql = new StringBuffer().append("insert into hvmattribute ");
		attrSql.append(" (id, prjid, valueid, valuename, sbpid, sbpname, activityid, activityname, attributetype, attributename) ");
		attrSql.append(" values (? ,? ,? ,? ,? ,? ,? ,? ,? ,?)");

	    jdbcTemplateObject.update(attrSql.toString()
					,attribute.getId()
					,attribute.getPrjId()
					,attribute.getValueId()
					,attribute.getValueName()
					,attribute.getSbpId()
					,attribute.getSbpName()
					,attribute.getActivityId()
					,attribute.getActivityName()
					,attribute.getAttributeType()
					,attribute.getAttributeName()
	    		);
		
	    return true;
	}

	@Override
	public boolean removeHvmAttribute(String userId, String attributeId) throws Exception {

		StringBuffer attrQuery = new StringBuffer().append("delete from hvmattribute where id = ? ");

		jdbcTemplateObject.update(attrQuery.toString(), attributeId);
		
		return true;
	}
	
}
