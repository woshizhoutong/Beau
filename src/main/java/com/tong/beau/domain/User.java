package com.tong.beau.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tong.beau.util.RoleType;

@Entity
@Table(name = "TB_USER")
public class User {
	private Long id;
	private String name;
	private String password;
	private String email;
	private String token;
	private Date tokenExpireDate;
	private Integer attempts;
	private boolean enabled;
	private boolean locked;
	private boolean expired;
	private boolean credentialExpired;
	private RoleType roleType;
	
	public User(){}
	
	public User(Long id) {
		this.id = id;
	}
	
	public User(String name, String password, String email, RoleType roleType) {
		this.name = name;
		this.password = password;
		this.email = email;
		this.roleType = roleType;
		this.token = null;
		this.tokenExpireDate = null;
		this.attempts = null;
		this.enabled = true;
		this.locked = false;
		this.expired = false;
		this.credentialExpired = false;
	}
	
	@Id
	@GeneratedValue
	@Column(name = "USER_ID", unique = true, nullable = false)
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "USER_NAME")
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "PASSWORD")
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Column(name = "EMAIL")
	public String getEmail(){
		return email;
	}
	
	public void setEmail(String email){
		this.email = email;
	}
	
	@Column(name = "TOKEN")
	public String getToken(){
		return token;
	}
	
	public void setToken(String token){
		this.token = token;
	}
	
	@Column(name = "TOKEN_EXPIRE_DATE")
	public Date getTokenExpireDate(){
		return this.tokenExpireDate;
	}
	
	public void setTokenExpireDate(Date date){
		this.tokenExpireDate = date;
	}
	
	@Column(name = "ATTEMPTS")
	public Integer getAttempts(){
		return attempts;
	}
	
	public void setAttempts(Integer attempts){
		this.attempts = attempts;
	}
	
	@Column(name = "ENABLED")
	public boolean isEnabled() {
		return enabled;
	}
	
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	@Column(name = "LOCKED")
	public boolean isLocked() {
		return locked;
	}
	
	public void setLocked(boolean locked) {
		this.locked = locked;
	}
	
	@Column(name = "EXPIRED")
	public boolean isExpired() {
		return expired;
	}
	
	public void setExpired(boolean expired) {
		this.expired = expired;
	}
	
	@Column(name ="CREDENTIAL_EXPIRED")
	public boolean isCredentialExpired() {
		return credentialExpired;
	}
	
	public void setCredentialExpired(boolean credentialExpired) {
		this.credentialExpired = credentialExpired;
	}
	
	@Enumerated(EnumType.STRING)
	@Column(name = "ROLE_TYPE")
	public RoleType getRoleType() {
		return roleType;
	}
	public void setRoleType(RoleType roleType) {
		this.roleType = roleType;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof User))
			return false;
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
}
