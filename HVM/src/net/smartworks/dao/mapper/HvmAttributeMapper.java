package net.smartworks.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import net.smartworks.model.hvm.HvmAttribute;
import net.smartworks.model.hvm.HvmProject;

public class HvmAttributeMapper implements RowMapper<HvmAttribute> {

	@Override
	public HvmAttribute mapRow(ResultSet rs, int rowNum) throws SQLException {

		HvmAttribute attr = new HvmAttribute();
		
		attr.setId(rs.getString("id"));
		attr.setPrjId(rs.getString("prjId"));
		attr.setValueId(rs.getString("valueId"));
		attr.setValueName(rs.getString("valueName"));
		attr.setSbpId(rs.getString("sbpId"));
		attr.setSbpName(rs.getString("sbpName"));
		attr.setActivityId(rs.getString("activityId"));
		attr.setActivityName(rs.getString("activityName"));
		attr.setAttributeType(rs.getString("attributeType"));
		attr.setAttributeName(rs.getString("attributeName"));

		try {
			if (rs.getString("prjObjId") != null) {
				HvmProject project = new HvmProject();
				
				project.setId(rs.getString("prjObjId"));
				project.setSbpPrjId(rs.getString("pssPrjId"));
				project.setPssPrjName(rs.getString("pssPrjName"));
				project.setSbpPrjId(rs.getString("sbpPrjId"));
				project.setSbpPrjName(rs.getString("sbpPrjName"));
				
				attr.setProject(project);
			}
		} catch (Exception e) {
		}
		
		return attr;
	}
	
	
}
