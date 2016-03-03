package com.tong.beau.util;

import java.util.ArrayList;
import java.util.List;

public class CCPMUserAuthorityHelper {
	public static List<CCPMUserAuthority> getAuthoritiesForRoleType(RoleType roleType) {
		List<CCPMUserAuthority> auths= new ArrayList<>();
		switch (roleType) {
		case ADMINISTRATOR:
			auths.add(CCPMUserAuthority.VIEW_REPORT);
			auths.add(CCPMUserAuthority.UPDATE_REPORT);
			auths.add(CCPMUserAuthority.DELETE_REPORT);
			auths.add(CCPMUserAuthority.VIEW_INCIDENT);
			auths.add(CCPMUserAuthority.UPDATE_INCIDENT);
			auths.add(CCPMUserAuthority.DELETE_INCIDENT);
			auths.add(CCPMUserAuthority.VIEW_DATASET);
			auths.add(CCPMUserAuthority.UPDATE_DATASET);
			auths.add(CCPMUserAuthority.DELETE_DATASET);
			auths.add(CCPMUserAuthority.VIEW_USER_MANAGEMENT);
			auths.add(CCPMUserAuthority.UPDATE_USER_MANAGEMENT);
			auths.add(CCPMUserAuthority.DELETE_USER_MANAGEMENT);
			break;
		case MANAGER:
			auths.add(CCPMUserAuthority.VIEW_REPORT);
			auths.add(CCPMUserAuthority.VIEW_INCIDENT);
			auths.add(CCPMUserAuthority.VIEW_DATASET);
			auths.add(CCPMUserAuthority.VIEW_USER_MANAGEMENT);
			break;
		case SME_ASSISTANT:
			auths.add(CCPMUserAuthority.VIEW_REPORT);
			auths.add(CCPMUserAuthority.UPDATE_REPORT);
			auths.add(CCPMUserAuthority.VIEW_INCIDENT);
			auths.add(CCPMUserAuthority.UPDATE_INCIDENT);
			auths.add(CCPMUserAuthority.VIEW_DATASET);
			auths.add(CCPMUserAuthority.UPDATE_DATASET);
			break;
		case SME_EXPERT:
			auths.add(CCPMUserAuthority.VIEW_REPORT);
			auths.add(CCPMUserAuthority.UPDATE_REPORT);
			auths.add(CCPMUserAuthority.VIEW_INCIDENT);
			auths.add(CCPMUserAuthority.UPDATE_INCIDENT);
			auths.add(CCPMUserAuthority.VIEW_DATASET);
			auths.add(CCPMUserAuthority.UPDATE_DATASET);
			break;
		default:
			break;
		}
		return auths;
	}
}
