package com.tong.beau.service.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class SecurityLoginSuccessHandler extends
		SimpleUrlAuthenticationSuccessHandler {

//	private SecurityLogService securityLogService;
	
	public SecurityLoginSuccessHandler(/*SecurityLogService securityLogService*/){
//		this.securityLogService = securityLogService;
	}

	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {
//		SecurityLog logData = new SecurityLog();
//		logData.setAction(LogActionType.LOGIN);
//		logData.setPerformedBy(request.getParameter("username"));
//		logData.setTarget("");
//		logData.setResult(LogResultType.SUCCESS);
//		securityLogService.writeLog(logData);
		
		if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
			String targetUrl = request.getParameter(this.getTargetUrlParameter());
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().print("{\"status\":\"success\", \"username\":\"" + auth.getName() + "\", \"targetUrl\":\"" + targetUrl + "\"}");
			response.getWriter().flush();
		} else {
			super.onAuthenticationSuccess(request, response, auth);
		}
	}
}
