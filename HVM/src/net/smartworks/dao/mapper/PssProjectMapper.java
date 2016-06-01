package net.smartworks.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import net.smartworks.model.PssProject;

public class PssProjectMapper implements RowMapper<PssProject> {

	@Override
	public PssProject mapRow(ResultSet rs, int rowNum) throws SQLException {

		PssProject prj = new PssProject();
		
		prj.setPssPrjId(rs.getString("id"));
		prj.setPssPrjName(rs.getString("name"));

		return prj;
	}
	
	
}
