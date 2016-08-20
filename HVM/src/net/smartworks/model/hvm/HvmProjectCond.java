package net.smartworks.model.hvm;

import java.util.Date;

import net.smartworks.model.Condition;

public class HvmProjectCond extends Condition{

	private String id;
	private String pssPrjId;
	private String pssPrjName;
	private String pssPrjDescription;
	private String pssPrjPicture;
	private String sbpPrjId;
	private String sbpPrjName;
	private String createdUser;
	private String lastModifiedUser;
	private Date createdDate;
	private Date lastModifiedDate;
	
	private HvmAttribute[] attributes;
	
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
	public String getCreatedUser() {
		return createdUser;
	}
	public void setCreatedUser(String createdUser) {
		this.createdUser = createdUser;
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
	public HvmAttribute[] getAttributes() {
		return attributes;
	}
	public void setAttributes(HvmAttribute[] attributes) {
		this.attributes = attributes;
	}

}
