package net.smartworks.model;

import java.util.List;
import java.util.Map;

public class ResultByValue {

//	$scope.result = {
//	"pssPrj":{"pssPrjId":"a123","pssPrjName":"여성 신발 매장","pssPrjPicture":"XXXX.jpg","pssPrjDesc":"XXX"}
//	,"sbpPrj":{"sbpPrjId":"spbPrjId1","sbpPrjName":"spbPrjName1"}
//	,"pssValue":{"pssValueId":"pssValueId1","pssValueName":pssValueId1"}
//	,"sbpActs":[
//		{
//			"sbpActId":"sbpActId1"
//			,"sbpActName":"spbActName1"
//			,"sbpId":"sbpId1"
//			,"sbpName":"sbpName1"
//			,"hvmAttrs": [
//				{
//					"hvmAttrId":"hvmAttrId1"
//					,hvmAttrName":"hvmAttrName1"
//					,"hvmAttrType":"hvmAttrType1"
//				}
//			]
//		}
//	]
//}
	
	private Map<String, String> pssPrj;
	private Map<String, String> sbpPrj;
	private Map<String, String> pssValue;
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
	public List<Map<String, Object>> getSbpActs() {
		return sbpActs;
	}
	public void setSbpActs(List<Map<String, Object>> sbpActs) {
		this.sbpActs = sbpActs;
	}
	
}
