package com.tong.beau.service.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

public class SecurityLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {
		 
//	private SecurityLogService securityLogService;
//	private UserService userService;
//	@Autowired
	public SecurityLogoutSuccessHandler(/*SecurityLogService securityLogService*/) {
//		this.securityLogService = securityLogService;
//		this.userService = userService;
	}
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, 
			Authentication authentication) throws IOException, ServletException {
//		SecurityLog logData = new SecurityLog();
//		logData.setAction(LogActionType.LOGOUT);
////		logData.setPerformedBy(userService.findByEmail(authentication.getName()).getEmail());
//		logData.setPerformedBy(authentication.getName());
//		logData.setTarget("");
//		logData.setResult(LogResultType.SUCCESS);
//		securityLogService.writeLog(logData);
		super.onLogoutSuccess(request, response, authentication);
	}
}
