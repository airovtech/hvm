package net.smartworks.dao.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

import net.smartworks.dao.IHvmDao;
import net.smartworks.dao.mapper.HvmAttributeMapper;
import net.smartworks.dao.mapper.PssProjectMapper;
import net.smartworks.dao.mapper.PssValueMapper;
import net.smartworks.dao.mapper.TestMapper;
import net.smartworks.model.Condition;
import net.smartworks.model.HvmAttribute;
import net.smartworks.model.PssProject;
import net.smartworks.model.PssValue;

public class HvmDaoImpl implements IHvmDao {

	private DataSource dataSource;
	
	private JdbcTemplate jdbcTemplateObject;
   
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplateObject = new JdbcTemplate(dataSource);
	}
	@Override
	public long getValueListSize(Condition cond) throws Exception {

		String searchKey = cond.getSearchKey();
		
		StringBuffer strBuff = new StringBuffer();
		strBuff.append(" select count(*) ");
		strBuff.append(" from ");
		strBuff.append(" ( ");
		strBuff.append(" 	select prjname, valuename  ");
		strBuff.append(" 	from hvmattribute ");
		if (searchKey != null && searchKey.length() != 0) {
			strBuff.append(" 	where (prjname like ? or sbpprjname like ? or valuename like ? or sbpname like ? or sbpactivityname like ? or attrname like ?) ");
		}
		strBuff.append(" 	group by prjname, valuename ");
		strBuff.append(" ) a ");
		
		Long totalSize = 0L;
		if (searchKey != null && searchKey.length() != 0) {
			String likeSearchKey = "%" + searchKey + "%";
			totalSize = jdbcTemplateObject.queryForObject(strBuff.toString(), new Object[]{likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey}, Long.class);
		} else {
			totalSize = jdbcTemplateObject.queryForObject(strBuff.toString(), Long.class);
		}
	    return totalSize;
	}
	@Override
	public List<HvmAttribute> getValueList(Condition cond) throws Exception {

		int pageNo = cond.getPageNo();
		int pageSize = cond.getPageSize();
		int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		String searchKey = cond.getSearchKey();
		
		StringBuffer strBuff = new StringBuffer();
		strBuff.append(" select b.* ");
		strBuff.append(" from ");
		strBuff.append(" ( ");
		strBuff.append(" 	select prjid, prjname, valuename  ");
		strBuff.append(" 	from hvmattribute ");
		if (searchKey != null && searchKey.length() != 0) {
			strBuff.append(" 	where (prjname like ? or sbpprjname like ? or valuename like ? or sbpname like ? or sbpactivityname like ? or attrname like ?) ");
		}
		strBuff.append(" 	group by prjid,prjname, valuename ");
		strBuff.append(" 	order by prjid,prjname, valuename ");
		strBuff.append(" 	limit ? offset ? ");
		strBuff.append(" ) a ");
		strBuff.append(" left outer join  ");
		strBuff.append(" ( ");
		strBuff.append(" 	select * from hvmattribute ");
		strBuff.append(" ) b ");
		strBuff.append(" on a.prjid = b.prjid ");
		strBuff.append(" and a.valuename = b.valuename ");
		
		List<HvmAttribute> attrList = jdbcTemplateObject.query(strBuff.toString(), 
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
							preparedStatement.setInt(7, pageSize);
							preparedStatement.setInt(8, offSet);
						} else {
							preparedStatement.setInt(1, pageSize);
							preparedStatement.setInt(2, offSet);
						}
		            }
				}
				, new HvmAttributeMapper());
	    return attrList;
	}
	
	//////////// activity list
	
	@Override
	public long getActivityListSize(Condition cond) throws Exception {

		String searchKey = cond.getSearchKey();
		
		StringBuffer strBuff = new StringBuffer();
		strBuff.append(" select count(*) ");
		strBuff.append(" from ");
		strBuff.append(" ( ");
		strBuff.append(" 	select prjname, sbpActivityName  ");
		strBuff.append(" 	from hvmattribute ");
		if (searchKey != null && searchKey.length() != 0) {
			strBuff.append(" 	where (prjname like ? or sbpprjname like ? or valuename like ? or sbpname like ? or sbpactivityname like ? or attrname like ?) ");
		}
		strBuff.append(" 	group by prjname, sbpActivityName ");
		strBuff.append(" ) a ");
		
		Long totalSize = 0L;
		if (searchKey != null && searchKey.length() != 0) {
			String likeSearchKey = "%" + searchKey + "%";
			totalSize = jdbcTemplateObject.queryForObject(strBuff.toString(), new Object[]{likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey}, Long.class);
		} else {
			totalSize = jdbcTemplateObject.queryForObject(strBuff.toString(), Long.class);
		}
	    return totalSize;
	}
	@Override
	public List<HvmAttribute> getActivityList(Condition cond) throws Exception {

		int pageNo = cond.getPageNo();
		int pageSize = cond.getPageSize();
		int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		String searchKey = cond.getSearchKey();
		
		StringBuffer strBuff = new StringBuffer();
		strBuff.append(" select b.* ");
		strBuff.append(" from ");
		strBuff.append(" ( ");
		strBuff.append(" 	select prjid, prjname, sbpActivityName  ");
		strBuff.append(" 	from hvmattribute ");
		if (searchKey != null && searchKey.length() != 0) {
			strBuff.append(" 	where (prjname like ? or sbpprjname like ? or valuename like ? or sbpname like ? or sbpactivityname like ? or attrname like ?) ");
		}
		strBuff.append(" 	group by prjid, prjname, sbpActivityName ");
		strBuff.append(" 	order by prjid, prjname, sbpActivityName ");
		strBuff.append(" 	limit ? offset ? ");
		strBuff.append(" ) a ");
		strBuff.append(" left outer join  ");
		strBuff.append(" ( ");
		strBuff.append(" 	select * from hvmattribute ");
		strBuff.append(" ) b ");
		strBuff.append(" on a.prjid = b.prjid ");
		strBuff.append(" and a.sbpActivityName = b.sbpActivityName ");
		
		List<HvmAttribute> attrList = jdbcTemplateObject.query(strBuff.toString(), 
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
							preparedStatement.setInt(7, pageSize);
							preparedStatement.setInt(8, offSet);
						} else {
							preparedStatement.setInt(1, pageSize);
							preparedStatement.setInt(2, offSet);
						}
		            }
				}
				, new HvmAttributeMapper());
	    return attrList;
	}
	
	///////// attribute list
	

	@Override
	public long getAttributeListSize(Condition cond) throws Exception {

		String searchKey = cond.getSearchKey();
		
		StringBuffer strBuff = new StringBuffer();
		strBuff.append(" select count(*) ");
		strBuff.append(" from ");
		strBuff.append(" hvmattribute ");
		if (searchKey != null && searchKey.length() != 0) {
			strBuff.append(" 	where (prjname like ? or sbpprjname like ? or valuename like ? or sbpname like ? or sbpactivityname like ? or attrname like ?) ");
		}
		
		Long totalSize = 0L;
		if (searchKey != null && searchKey.length() != 0) {
			String likeSearchKey = "%" + searchKey + "%";
			totalSize = jdbcTemplateObject.queryForObject(strBuff.toString(), new Object[]{likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey,likeSearchKey}, Long.class);
		} else {
			totalSize = jdbcTemplateObject.queryForObject(strBuff.toString(), Long.class);
		}
	    return totalSize;
	}
	@Override
	public List<HvmAttribute> getAttributeList(Condition cond) throws Exception {

		int pageNo = cond.getPageNo();
		int pageSize = cond.getPageSize();
		int offSet = pageNo == 0 ? 0 : pageNo * pageSize;
		
		String searchKey = cond.getSearchKey();
		
		StringBuffer strBuff = new StringBuffer();
		strBuff.append(" select * ");
		strBuff.append(" from ");
		strBuff.append(" hvmattribute ");
		if (searchKey != null && searchKey.length() != 0) {
			strBuff.append(" 	where (prjname like ? or sbpprjname like ? or valuename like ? or sbpname like ? or sbpactivityname like ? or attrname like ?) ");
		}
		strBuff.append(" order by attrName ");
		strBuff.append(" limit ? offset ? ");
		
		List<HvmAttribute> attrList = jdbcTemplateObject.query(strBuff.toString(), 
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
							preparedStatement.setInt(7, pageSize);
							preparedStatement.setInt(8, offSet);
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
	public List<PssProject> getPssProject(String nameLike) throws Exception {
		String likeSearchKey = "%" + nameLike + "%";
		String SQL = "select * from productService where name like ?";
		List<PssProject> prjList = jdbcTemplateObject.query(SQL, 
				new PreparedStatementSetter(){
					public void setValues(PreparedStatement preparedStatement) throws SQLException {
		                preparedStatement.setString(1, likeSearchKey);
		            }
				}
				, new PssProjectMapper());
	    return prjList;
	}
	
	@Override
	public List<PssValue> getPssValue(String pssPrjId) throws Exception {
		String SQL = "select * from valuespace where psid=?";
		List<PssValue> prjList = jdbcTemplateObject.query(SQL, 
				new PreparedStatementSetter(){
					public void setValues(PreparedStatement preparedStatement) throws SQLException {
		                preparedStatement.setString(1, pssPrjId);
		            }
				}
				, new PssValueMapper());
	    return prjList;
	}
	
	@Override
	public List getTestDbData() throws Exception {

		String SQL = "select id, name from testTable";
		List productList = jdbcTemplateObject.query(SQL, new TestMapper());
	    return productList;
		
	}
}
