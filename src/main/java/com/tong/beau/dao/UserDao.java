package com.tong.beau.dao;

import java.util.List;

import com.tong.beau.domain.User;

public interface UserDao extends GenericDao<User, Long> {

	User findByEmail(String email);

	List<User> getAllUsersSortByName();
	
//	List<UserSummary> listByRoleType(RoleType roleType);
	
}
