package com.tong.beau.service.impl;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tong.beau.util.CCPMUserAuthority;
import com.tong.beau.util.CCPMUserAuthorityHelper;


@Service("assembler")
public class Assembler {
	@Transactional(readOnly = true)
	User buildUserFromUserEntity(com.tong.beau.domain.User userEntity) {

		String username = userEntity.getEmail();
		String password = userEntity.getPassword();
		boolean enabled = userEntity.isEnabled();
		boolean accountNonExpired = !userEntity.isExpired();
		boolean credentialsNonExpired = !userEntity.isCredentialExpired();
		boolean accountNonLocked = !userEntity.isLocked();
		System.out.println("username: " + username + " password: " + password +
				" enabled: " + enabled + " accountNonExpired: " + accountNonExpired
				+ " credentialsNonExpired: " + credentialsNonExpired + " accountNonLocked: " + accountNonLocked);
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (CCPMUserAuthority auth : CCPMUserAuthorityHelper.getAuthoritiesForRoleType(userEntity.getRoleType())) {
			authorities.add(new SimpleGrantedAuthority(auth.toString()));
		}

		User user = new User(username, password, enabled, accountNonExpired,
				credentialsNonExpired, accountNonLocked, authorities);
		return user;
	}
}
