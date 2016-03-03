package com.tong.beau.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tong.beau.dao.UserDao;
import com.tong.beau.domain.User;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

	private UserDao dao;
	private Assembler assembler;

	@Autowired
	public UserDetailsServiceImpl(UserDao dao, Assembler assembler) {
		this.dao = dao;
		this.assembler = assembler;
	}

	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException, DataAccessException {
		// User Email to login.
		//User userEntity = dao.findByName(username);
		User userEntity = dao.findByEmail(username.toLowerCase());
		if (userEntity == null){
			throw new UsernameNotFoundException("user not found");
		}
			

		UserDetails userDetails = assembler.buildUserFromUserEntity(userEntity);
		return userDetails;
	}
}