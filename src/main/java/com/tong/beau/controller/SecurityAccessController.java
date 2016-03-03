package com.tong.beau.controller;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping
public class SecurityAccessController {

	@RequestMapping("/login")
	public String login(Model model, @RequestParam(required=false) String message) {
		model.addAttribute("message", message);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
		    return "redirect:/home";
		}
		return "security/login";
	}
	
	@RequestMapping(value = "/denied")
 	public String denied() {
		return "security/denied";
	}
}