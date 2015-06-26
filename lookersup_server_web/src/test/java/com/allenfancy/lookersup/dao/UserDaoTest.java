package com.allenfancy.lookersup.dao;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import com.allenfancy.lookersup.model.User;

@ContextConfiguration(locations={"classpath:main.xml","classpath:mongo.xml"})
public class UserDaoTest extends AbstractJUnit4SpringContextTests{

	@Autowired
	private UserDao userDao;
	
	
	@Test
	public void testSaveUser(){
		User user = new User();
		user.setName("fancy");
		user.setNickName("¥Û…Ò");
		user.setPassword("123");
		
		userDao.saveUser(user);
	}
}
