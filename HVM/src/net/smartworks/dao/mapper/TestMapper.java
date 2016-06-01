package net.smartworks.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import net.smartworks.model.TestModel;

public class TestMapper implements RowMapper<TestModel> {

	@Override
	public TestModel mapRow(ResultSet rs, int rowNum) throws SQLException {

		TestModel test = new TestModel();
		
		test.setId(rs.getString("id"));
		test.setName(rs.getString("name"));
		
		return test;
	}
	
	
}
