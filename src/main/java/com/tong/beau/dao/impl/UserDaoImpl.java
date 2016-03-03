package com.tong.beau.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.tong.beau.dao.UserDao;
import com.tong.beau.domain.User;

@Repository("userDao")
public class UserDaoImpl extends HibernateDao<User, Long> implements UserDao {

	@Override
	public User findByEmail(String email) {
		Query userQuery = currentSession().createQuery("from User u where u.email = :email");
		userQuery.setParameter("email", email);
		@SuppressWarnings("unchecked")
		List<User> userList = (List<User>)userQuery.list(); 
		if (userList.isEmpty()) {
            return null;
        }
		else{
			return userList.get(0);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> getAllUsersSortByName() {
		Query query = currentSession().createQuery("from User u order by u.name asc");
		return (List<User>)query.list();
	}
	
//	@SuppressWarnings("unchecked")
//	@Override
//	public List<UserSummary> listByRoleType(RoleType roleType) {
//		Query query = currentSession().createQuery("from UserSummary us where us.roleType = :roleType");
//		query.setParameter("roleType", roleType);
//		return (List<UserSummary>) query.list();
//	}
	
}
