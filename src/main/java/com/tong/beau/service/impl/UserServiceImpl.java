//package com.tong.beau.service.impl;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.ccdp.safeocs.ccpm.dao.UserDao;
//import com.ccdp.safeocs.ccpm.domain.User;
//import com.ccdp.safeocs.ccpm.domain.view.UserSummary;
//import com.ccdp.safeocs.ccpm.service.UserService;
//import com.ccdp.safeocs.ccpm.service.util.RoleType;
//import com.ccdp.safeocs.ccpm.web.model.UserModel;
//import com.closecall.safeocs.commons.report.selection.SelectionItemModel;
//
//@Service("userService")
//public class UserServiceImpl implements UserService{
//	private UserDao userDao;
//	
//	@Autowired
//	public UserServiceImpl(UserDao userDao){
//		this.userDao = userDao;
//	}
//	
//	@Override
//	public User find(Long userId) {
//		return userDao.find(userId);
//	}
//	
//	@Override
//	public void save(User user) {
//		userDao.save(user);
//	}
//
//	@Override
//	public void update(User user) {
//		userDao.update(user);
//	}
//
//	@Override
//	public void saveOrUpdate(User user) {
//		userDao.saveOrUpdate(user);
//	}
//	
//	@Override
//	public User currentUser() {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		User user = userDao.findByEmail(auth.getName());
//		return user;
//	}
//
//	@Override
//	public List<UserModel> getAllUsersSortByName() {
//		List<UserModel> list = new ArrayList<>();
//		for (User user : userDao.getAllUsersSortByName()) {
//			list.add(new UserModel(user));
//		}
//		return list;
//	}
//
//	@Override
//	public List<UserSummary> listByRoleType(RoleType roleType) {
//		return userDao.listByRoleType(roleType);
//	}
//	
//	@Override
//	public void addUser(UserModel uModel) {
//		User user = new User();
//		parseUser(user, uModel);
//		userDao.save(user);
//	}
//	
//	@Override
//	public void updateUser(UserModel uModel) {
//		User user = userDao.find(uModel.getId());
//		parseUser(user, uModel);
//		userDao.update(user);
//	}
//	
//	@Override
//	public void removeUser(UserModel uModel) {
//		User user = userDao.find(uModel.getId());
//		userDao.remove(user);
//	}
//	
//	@Override
//	public List<SelectionItemModel<RoleType>> getAllRoleTypes() {
//		List<SelectionItemModel<RoleType>> models = new ArrayList<>();
//		for (RoleType item : RoleType.values()) {
//			models.add(new SelectionItemModel<>(item));
//		}
//		return models;
//	}
//
//	private void parseUser(User user, UserModel uModel) {
//		user.setName(uModel.getName());
//		if (uModel.isPasswordChangeEnabled()) {
//			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//			user.setPassword(passwordEncoder.encode(uModel.getPassword()));
//		}
//		user.setEmail(uModel.getEmail());
//		user.setToken(uModel.getToken());
//		user.setTokenExpireDate(uModel.getTokenExpireDate());
//		user.setAttempts(uModel.getAttempts());
//		user.setEnabled(uModel.isEnabled());
//		user.setLocked(uModel.isLocked());
//		user.setExpired(uModel.isExpired());
//		user.setCredentialExpired(uModel.isCredentialExpired());
//		user.setRoleType(RoleType.valueOf(uModel.getRoleType().getValue()));
//	}
//}
