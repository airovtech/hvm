package net.smartworks.dao;

import net.smartworks.model.UserInfo;

public interface IUserDao {

	public UserInfo getUser(String userId) throws Exception;
	
}
