package net.smartworks.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import net.smartworks.factory.HvmDaoFactory;
import net.smartworks.model.UserInfo;

public class HvmAuthenticationProvider implements AuthenticationProvider {

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		String user_id = (String) authentication.getPrincipal();
		String user_pw = (String) authentication.getCredentials();

		try {
			UserInfo user = HvmDaoFactory.getInstance().getUserDao().getUser(user_id);

			if (user != null && user_id.equals(user.getId()) && user_pw.equals(user.getPassword())) {
				List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
				roles.add(new SimpleGrantedAuthority("ROLE_USER"));

				UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(user_id, user_pw,
						roles);
				result.setDetails(new Login(user_id, user_pw, user.getUsername(), user.getPicture()));
				return result;
			} else {
				throw new BadCredentialsException("Bad credentials");
			}

		} catch (Exception e) {
			throw new BadCredentialsException("Bad credentials");
		}

	}
}