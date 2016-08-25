package net.smartworks.dao.impl;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

import net.smartworks.dao.IUserDao;
import net.smartworks.dao.mapper.UserMapper;
import net.smartworks.model.UserInfo;

public class UserDaoImpl implements IUserDao {

	private DataSource dataSource;
	
	private JdbcTemplate jdbcTemplateObject;
   
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplateObject = new JdbcTemplate(dataSource);
	}
	
	@Override
	public UserInfo getUser(String userId) throws Exception {
		String SQL = "select * from orguser where id=?";
		UserInfo userInfo = null;
		try {
			userInfo = jdbcTemplateObject.queryForObject(SQL, new Object[] { userId }, new UserMapper());
		} catch (Exception e) {
			System.out.println("getUser : Not Exist User :" + userId);
		}
	    return userInfo;
	}
	
}
