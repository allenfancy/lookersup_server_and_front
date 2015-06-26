package com.allenfancy.lookersup.model;

public class User {
	
	private String id;
	private String name;
	private String password;
	private String openId;
	private String sex;
	private String nickName;
	private Long create_time;
	private Long update_time;
	private Long login_time;
	private String login_account_type;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public Long getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Long create_time) {
		this.create_time = create_time;
	}

	public Long getUpdate_time() {
		return update_time;
	}

	public void setUpdate_time(Long update_time) {
		this.update_time = update_time;
	}

	public Long getLogin_time() {
		return login_time;
	}

	public void setLogin_time(Long login_time) {
		this.login_time = login_time;
	}

	public String getLogin_account_type() {
		return login_account_type;
	}

	public void setLogin_account_type(String login_account_type) {
		this.login_account_type = login_account_type;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}
