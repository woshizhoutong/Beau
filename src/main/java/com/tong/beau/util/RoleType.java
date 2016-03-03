package com.tong.beau.util;


public enum RoleType {
	SME_EXPERT("SME Expert"),
	SME_ASSISTANT("SME Assistant"),
	ADMINISTRATOR("Administrator"),
	MANAGER("Demetra");
	
	private String label;
	
	private RoleType(String label) {
		this.label = label;
	}
	
	public String getLabel() {
		return label;
	}
	
}
