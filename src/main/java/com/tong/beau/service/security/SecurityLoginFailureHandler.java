package com.tong.beau.service.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

public class SecurityLoginFailureHandler extends
		SimpleUrlAuthenticationFailureHandler {

//	private SecurityLogService securityLogService;
	
//	@Autowired
	public SecurityLoginFailureHandler(/*SecurityLogService securityLogService*/){
//		this.securityLogService = securityLogService;
	}
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException exception)
			throws IOException, ServletException {
		
//		SecurityLog logData = new SecurityLog();
//		logData.setAction(LogActionType.LOGIN);
//		logData.setPerformedBy(request.getParameter("username"));
//		logData.setTarget("");
//		logData.setResult(LogResultType.FAIL);
//		securityLogService.writeLog(logData);
		
		if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
			response.setContentType("application/json;charset=UTF-8");   
			response.getWriter()
					.print("{\"status\":\"error\", \"message\":\"Email/Password are invalid\"}");
			response.getWriter().flush();
		} else {
			super.onAuthenticationFailure(request, response, exception);
		}
	}

}