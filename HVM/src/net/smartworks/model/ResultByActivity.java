package net.smartworks.model;

import java.util.List;
import java.util.Map;

public class ResultByActivity {

//	$scope.result = {
//	"pssPrj":{"pssPrjId":"a123","pssPrjName":"여성 신발 매장","pssPrjPicture":"XXXX.jpg","pssPrjDesc":"XXX"}
//	,"sbpPrj":{"sbpPrjId":"spbPrjId1","sbpPrjName":"spbPrjName1"}
//	,"sbpActivity":{"sbpActId":"sbpActId1","sbpActName":sbpActName1", "sbpId":"sbpId1","sbpName":"sbpName1"}
//	,"pssValues":[
//		{
//			"pssValueId":"pssValueId1"
//			,"pssValueName":"pssValueId1"
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
	private Map<String, String> sbpActivity;
	private List<Map<String, Object>> pssValues;
	
	public Map<String, String> getPssPrj() {
		return pssPrj;
	}
	public void setPssPrj(Map<String, String> pssPrj) {
		this.pssPrj = pssPrj;
	}
	public Map<String, String> getSbpPrj() {
		return sbpPrj;
	}
	public void setSbpPrj(Map<String, String> sbpPrj) {
		this.sbpPrj = sbpPrj;
	}
	public Map<String, String> getSbpActivity() {
		return sbpActivity;
	}
	public void setSbpActivity(Map<String, String> sbpActivity) {
		this.sbpActivity = sbpActivity;
	}
	public List<Map<String, Object>> getPssValues() {
		return pssValues;
	}
	public void setPssValues(List<Map<String, Object>> pssValues) {
		this.pssValues = pssValues;
	}
	
}
