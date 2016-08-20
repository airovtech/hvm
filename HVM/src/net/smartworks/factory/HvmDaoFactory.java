package net.smartworks.factory;

import net.smartworks.dao.IHvmDao;
import net.smartworks.dao.IUserDao;

public class HvmDaoFactory {

	private static HvmDaoFactory factory;

	private IHvmDao hvmDao;
	private IUserDao userDao;
	
	public synchronized static HvmDaoFactory createInstance() {
		if(factory == null) 
			factory = new HvmDaoFactory();
		return factory;
	}
	public static HvmDaoFactory getInstance() {
		return factory;
	}
	public IHvmDao getHvmDao() {
		return hvmDao;
	}
	public void setHvmDao(IHvmDao hvmDao) {
		this.hvmDao = hvmDao;
	}
	public IUserDao getUserDao() {
		return userDao;
	}
	public void setUserDao(IUserDao userDao) {
		this.userDao = userDao;
	}

	
}
