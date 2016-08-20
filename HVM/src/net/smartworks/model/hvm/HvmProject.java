package net.smartworks.model.hvm;

import java.util.Date;
import java.util.List;

import net.smartworks.model.UserInfo;

public class HvmProject {

	private String id;
	private String pssPrjId;
	private String pssPrjName;
	private String pssPrjDescription;
	private String pssPrjPicture;
	private String sbpPrjId;
	private String sbpPrjName;
	
	private UserInfo createdUserObj;
	private String createdUser;

	private UserInfo lastModifiedUserObj;
	private String lastModifiedUser;
	
	private Date createdDate;
	private Date lastModifiedDate;
	
	private List<HvmAttribute> attributes;
	
	private List sbpGroupList;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPssPrjId() {
		return pssPrjId;
	}
	public void setPssPrjId(String pssPrjId) {
		this.pssPrjId = pssPrjId;
	}
	public String getPssPrjName() {
		return pssPrjName;
	}
	public void setPssPrjName(String pssPrjName) {
		this.pssPrjName = pssPrjName;
	}
	public String getPssPrjDescription() {
		return pssPrjDescription;
	}
	public void setPssPrjDescription(String pssPrjDescription) {
		this.pssPrjDescription = pssPrjDescription;
	}
	public String getPssPrjPicture() {
		return pssPrjPicture;
	}
	public void setPssPrjPicture(String pssPrjPicture) {
		this.pssPrjPicture = pssPrjPicture;
	}
	public String getSbpPrjId() {
		return sbpPrjId;
	}
	public void setSbpPrjId(String sbpPrjId) {
		this.sbpPrjId = sbpPrjId;
	}
	public String getSbpPrjName() {
		return sbpPrjName;
	}
	public void setSbpPrjName(String sbpPrjName) {
		this.sbpPrjName = sbpPrjName;
	}
	public UserInfo getCreatedUserObj() {
		return createdUserObj;
	}
	public void setCreatedUserObj(UserInfo createdUserObj) {
		this.createdUserObj = createdUserObj;
	}
	public String getCreatedUser() {
		return createdUser;
	}
	public void setCreatedUser(String createdUser) {
		this.createdUser = createdUser;
	}
	public UserInfo getLastModifiedUserObj() {
		return lastModifiedUserObj;
	}
	public void setLastModifiedUserObj(UserInfo lastModifiedUserObj) {
		this.lastModifiedUserObj = lastModifiedUserObj;
	}
	public String getLastModifiedUser() {
		return lastModifiedUser;
	}
	public void setLastModifiedUser(String lastModifiedUser) {
		this.lastModifiedUser = lastModifiedUser;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}
	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	public List<HvmAttribute> getAttributes() {
		return attributes;
	}
	public void setAttributes(List<HvmAttribute> attributes) {
		this.attributes = attributes;
	}
	public List getSbpGroupList() {
		return sbpGroupList;
	}
	public void setSbpGroupList(List sbpGroupList) {
		this.sbpGroupList = sbpGroupList;
	}

}
