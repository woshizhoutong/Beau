package com.tong.beau.model;

import com.tong.beau.util.JsonResponseStatusType;

public class JsonResponse<T> {
	private JsonResponseStatusType status;
	private String message;
	private T data;
	
	public JsonResponse(JsonResponseStatusType status, String message, T data) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
	
	public JsonResponse(T data) {
		this(JsonResponseStatusType.SUCCESS, "Request has been successfully handled!", data);
	}

	public JsonResponseStatusType getStatus() {
		return status;
	}

	public void setStatus(JsonResponseStatusType status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
	
}
