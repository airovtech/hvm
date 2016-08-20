/*
 * $Id: Login.java,v 1.1 2009/12/16 05:42:52 kmyu Exp $
 * created by    : CHO DAE HYON
 * creation-date : 2007. 1. 6.
 * =========================================================
 * Copyright (c) 2007 Miracom, Inc. All rights reserved.
 */
package net.smartworks.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class Login implements UserDetails {

	private static final long serialVersionUID = 109756771178872916L;
	private String id;
	private String username;
	private String password;
	private String authId;
	private String picture;
	
	
	public Login(String id, String password, String username, String picture) {
		this.id = id;
		this.password = password;
		this.username = username;
		this.picture = picture;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getAuthId() {
		return authId;
	}
	public void setAuthId(String authId) {
		this.authId = authId;
	}
	private Collection<GrantedAuthority> authorities; // 권한

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();   
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }
//	public Collection<GrantedAuthority> getAuthorities() {
//		return authorities;
//	}
	public void setAuthorities(Collection<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
}