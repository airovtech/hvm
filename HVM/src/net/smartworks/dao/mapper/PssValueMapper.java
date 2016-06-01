package net.smartworks.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import net.smartworks.model.PssValue;

public class PssValueMapper implements RowMapper<PssValue> {

	@Override
	public PssValue mapRow(ResultSet rs, int rowNum) throws SQLException {

		PssValue value = new PssValue();
		
		value.setPssValueId(rs.getString("id"));
		//value.setPsId(rs.getString("psid"));
		
		StringBuffer sb = null;
		
		String economical = (String)rs.getString("economical");
		if (economical.length() != 0) {
			sb = new StringBuffer(economical);
		}
		String function = rs.getString("function");
		if (function.length() != 0) {
			if (sb == null) {
				sb = new StringBuffer(function);
			} else {
				sb.append(";").append(function);
			}
		}
		String extrinsicsocial = (String)rs.getString("extrinsicsocial");
		if (extrinsicsocial.length() != 0) {
			if (sb == null) {
				sb = new StringBuffer(extrinsicsocial);
			} else {
				sb.append(";").append(extrinsicsocial);
			}
		}
		String activeemotional = (String)rs.getString("activeemotional");
		if (activeemotional.length() != 0) {
			if (sb == null) {
				sb = new StringBuffer(activeemotional);
			} else {
				sb.append(";").append(activeemotional);
			}
		}
		String reactiveemotional = (String)rs.getString("reactiveemotional");
		if (reactiveemotional.length() != 0) {
			if (sb == null) {
				sb = new StringBuffer(reactiveemotional);
			} else {
				sb.append(";").append(reactiveemotional);
			}
		}
		String intrinsicsocial = (String)rs.getString("intrinsicsocial");
		if (intrinsicsocial.length() != 0) {
			if (sb == null) {
				sb = new StringBuffer(intrinsicsocial);
			} else {
				sb.append(";").append(intrinsicsocial);
			}
		}
		String epistemic = (String)rs.getString("epistemic");
		if (epistemic.length() != 0) {
			if (sb == null) {
				sb = new StringBuffer(epistemic);
			} else {
				sb.append(";").append(epistemic);
			}
		}
		
		if (sb != null)
			value.setPssValueName(sb.toString());

		return value;
	}
	
	
}
