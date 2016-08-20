package net.smartworks.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import net.smartworks.model.UserInfo;

public class UserMapper implements RowMapper<UserInfo> {

	@Override
	public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {

		UserInfo user = new UserInfo();
		
		user.setId(rs.getString("id"));
		user.setUsername(rs.getString("name"));
		user.setPassword(rs.getString("passwd"));
		user.setAuthId(rs.getString("authid"));
		user.setPicture(rs.getString("picture"));
		
		return user;
	}
	
	
}
