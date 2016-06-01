package net.smartworks.test;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;

import net.smartworks.model.ResultByValue;

public class JsonTest {

	public static void main(String[] args) throws Exception {

		
		ResultByValue r = new ResultByValue();
		
		Map pssPrj = new LinkedHashMap();//
		pssPrj.put("pssPrjId","a123");
		pssPrj.put("pssPrjName","여성 신발 매장");

		Map pssValue = new LinkedHashMap();//
		pssValue.put("pssValueId","pssValueId1");
		pssValue.put("pssValueName","pssValueId1");

		Map sbpPrj = new LinkedHashMap();//
		sbpPrj.put("sbpPrjId","spbPrjId1");
		sbpPrj.put("sbpPrjName","spbPrjName1");

		Map sbp = new LinkedHashMap();//
		sbp.put("sbpId","sbpId1");
		sbp.put("sbpName","sbpName1");
		
		List sbpActs = new ArrayList();//
		
		Map act1 = new LinkedHashMap();
		act1.put("sbpActs", "sbpActId1");
		act1.put("sbpActName", "spbActName1");
		
		List attrList = new ArrayList();
		Map attr1 = new LinkedHashMap();
		attr1.put("hvmAttrId", "hvmAttrId1");
		attr1.put("hvmAttrName", "hvmAttrName1");
		attr1.put("hvmAttrType", "hvmAttrType1");
		attrList.add(attr1);
		
		act1.put("hvmAttrs",attrList);
		sbpActs.add(act1);
		
		r.setPssPrj(pssPrj);
		r.setPssValue(pssValue);
		r.setSbpPrj(sbpPrj);
		//r.setSbp(sbp);
		r.setSbpActs(sbpActs);
		
		ObjectMapper mapper = new ObjectMapper(); // can reuse, share globally 
		String jsonString = mapper.writeValueAsString(r);
		
		
		System.out.println(jsonString);
		
		
	}

}
