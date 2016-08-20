package net.smartworks.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import net.smartworks.model.hvm.HvmProject;

public class HvmProjectMapper implements RowMapper<HvmProject> {

	@Override
	public HvmProject mapRow(ResultSet rs, int rowNum) throws SQLException {

		HvmProject prj = new HvmProject();
		
		prj.setId(rs.getString("id"));
		prj.setPssPrjId(rs.getString("pssPrjId"));
		prj.setPssPrjName(rs.getString("pssPrjName"));
		prj.setPssPrjDescription(rs.getString("pssPrjDescription"));
		prj.setPssPrjPicture(rs.getString("pssPrjPicture"));
		prj.setSbpPrjId(rs.getString("sbpPrjId"));
		prj.setSbpPrjName(rs.getString("sbpPrjName"));
		prj.setCreatedUser(rs.getString("createdUser"));
		prj.setLastModifiedUser(rs.getString("lastModifiedUser"));
		prj.setCreatedDate(rs.getDate("createdDate"));
		prj.setLastModifiedDate(rs.getDate("lastModifiedDate"));

		return prj;
	}
	
	
}
