package com.allenfancy.lookersup.utils;

import java.util.HashMap;
import java.util.Set;

import com.google.common.collect.Sets;

public class Result extends HashMap<String, Object> {

	private static final long serialVersionUID = -8749784422730635178L;

	private static final String DEFAULT_RESULT_KEY = "result";
	private static final String STATUS_KEY = "status";
	private static final String MSG_KEY = "msg";

	private static final Set<String> INTERNAL_KEYWORDS = Sets.newHashSet(DEFAULT_RESULT_KEY, STATUS_KEY, MSG_KEY);

	public Result() {
	}

	public Result(IStatus status) {
		super.put(STATUS_KEY, status.getStatus());
		super.put(MSG_KEY, status.getMsg());
	}

	public Result(int status, String msg) {
		super.put(STATUS_KEY, status);
		super.put(MSG_KEY, msg);
	}

	public Object getResult() {
		return super.get(DEFAULT_RESULT_KEY);
	}

	public void addExtraResult(String key, Object result) {
		if (INTERNAL_KEYWORDS.contains(key)) {
			throw new RuntimeException(key + "是预定义关键字");
		}
		super.put(key, result);
	}

	public Object getExtraResult(String key) {
		return super.get(key);
	}

	public void setResult(Object result) {
		super.put(DEFAULT_RESULT_KEY, result);
	}

	public int getStatus() {
		return (Integer) super.get(STATUS_KEY);
	}

	public void setStatus(int status) {
		super.put(STATUS_KEY, status);
	}

	public String getMsg() {
		return (String) super.get(MSG_KEY);
	}

	public void setMsg(String msg) {
		super.put(MSG_KEY, msg);
	}
}
