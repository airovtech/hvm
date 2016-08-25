package net.smartworks.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import net.smartworks.model.SkkupssPssProject;

public class SkkupssPssProjectMapper implements RowMapper<SkkupssPssProject> {

	@Override
	public SkkupssPssProject mapRow(ResultSet rs, int rowNum) throws SQLException {

		SkkupssPssProject prj = new SkkupssPssProject();
		
		prj.setId(rs.getString("id"));
		prj.setName(rs.getString("name"));
		prj.setPicture(rs.getString("picture"));
		prj.setDescription(rs.getString("description"));

		return prj;
	}
	
	
}
