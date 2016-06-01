package net.smartworks.model;

import java.util.List;
import java.util.Map;

public class ResultByAttribute_groupby {

//	$scope.result = {
//	"pssPrj":{"pssPrjId":"a123","pssPrjName":"여성 신발 매장"}
//	,"sbpPrj":{"sbpPrjId":"spbPrjId1","sbpPrjName":"spbPrjName1"}
//	,"hvmAttribute":{"hvmAttrId":"hvmAttrId1","hvmAttrName":hvmAttrName1","hvmAttrType":hvmAttrType1"}
//	,"sbpActs":[
//			{
//				"sbpActId":"sbpActId1"
//				,"sbpActName":"spbActName1"
//				,"sbpId":"sbpId1"
//				,"sbpName":"sbpName1"
//			}
//		]
//	,"pssValues":[
//			{
//				"pssValueId":"pssValueId1"
//				,"pssValueName":"pssValueId1"
//			}
//		]
//	}
	
	private Map<String, String> pssPrj;
	private Map<String, String> pssValue;
	private Map<String, String> sbpPrj;
	private Map<String, String> sbp;
	private List<Map<String, Object>> sbpActs;
	
	public Map<String, String> getPssPrj() {
		return pssPrj;
	}
	public void setPssPrj(Map<String, String> pssPrj) {
		this.pssPrj = pssPrj;
	}
	public Map<String, String> getPssValue() {
		return pssValue;
	}
	public void setPssValue(Map<String, String> pssValue) {
		this.pssValue = pssValue;
	}
	public Map<String, String> getSbpPrj() {
		return sbpPrj;
	}
	public void setSbpPrj(Map<String, String> sbpPrj) {
		this.sbpPrj = sbpPrj;
	}
	public Map<String, String> getSbp() {
		return sbp;
	}
	public void setSbp(Map<String, String> sbp) {
		this.sbp = sbp;
	}
	public List<Map<String, Object>> getSbpActs() {
		return sbpActs;
	}
	public void setSbpActs(List<Map<String, Object>> sbpActs) {
		this.sbpActs = sbpActs;
	}
	
}
