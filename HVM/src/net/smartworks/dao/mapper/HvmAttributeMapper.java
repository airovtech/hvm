package net.smartworks.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import net.smartworks.model.HvmAttribute;

public class HvmAttributeMapper implements RowMapper<HvmAttribute> {

	@Override
	public HvmAttribute mapRow(ResultSet rs, int rowNum) throws SQLException {

		HvmAttribute attr = new HvmAttribute();
		
		attr.setId(rs.getString("id"));
		attr.setPrjId(rs.getString("prjId"));
		attr.setPrjName(rs.getString("prjName"));
		attr.setSbpPrjId(rs.getString("sbpPrjId"));
		attr.setSbpPrjName(rs.getString("sbpPrjName"));
		attr.setValueId(rs.getString("valueId"));
		attr.setValueName(rs.getString("valueName"));
		attr.setSbpId(rs.getString("sbpId"));
		attr.setSbpName(rs.getString("sbpName"));
		attr.setActivityId(rs.getString("sbpActivityId"));
		attr.setActivityName(rs.getString("sbpActivityName"));
		attr.setAttrType(rs.getString("attrType"));
		attr.setAttrName(rs.getString("attrName"));

		return attr;
	}
	
	
}
