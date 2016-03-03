package com.tong.beau.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tong.beau.dao.UserDao;
import com.tong.beau.domain.User;
import com.tong.beau.model.JsonResponse;
import com.tong.beau.util.JsonResponseStatusType;
import com.tong.beau.util.RoleType;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserDao userDao;
	
	@RequestMapping(value="/home", method=RequestMethod.GET)
	public String login(){
		return "home";
	}
	
	@RequestMapping(value="/init", method=RequestMethod.GET)
	public  @ResponseBody JsonResponse<String> init(){
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		User user = new User("zhou tong", passwordEncoder.encode("zhoutong"), "zzzz_zt@hotmail.com", RoleType.ADMINISTRATOR);
		userDao.save(user);
		return new JsonResponse<String>(JsonResponseStatusType.SUCCESS, "success", "haha");
	}
}
