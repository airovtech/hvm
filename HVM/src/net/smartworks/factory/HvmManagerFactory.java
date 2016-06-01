package net.smartworks.factory;

import net.smartworks.manager.IHvmManager;

public class HvmManagerFactory {

	private static HvmManagerFactory factory;

	private IHvmManager hvmManager;
	
	public synchronized static HvmManagerFactory createInstance() {
		if(factory == null) 
			factory = new HvmManagerFactory();
		return factory;
	}
	public static HvmManagerFactory getInstance() {
		return factory;
	}
	public IHvmManager getHvmManager() {
		return hvmManager;
	}
	public void setHvmManager(IHvmManager hvmManager) {
		this.hvmManager = hvmManager;
	}
}
