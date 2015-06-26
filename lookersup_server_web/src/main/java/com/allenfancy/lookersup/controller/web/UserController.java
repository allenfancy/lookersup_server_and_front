package com.allenfancy.lookersup.controller.web;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.allenfancy.lookersup.dao.UserDao;
import com.allenfancy.lookersup.model.User;
import com.allenfancy.lookersup.utils.Result;

@Controller
@RequestMapping(value="lookersup/user")
public class UserController {

	@Autowired
	private UserDao userDao;
	
	
	@RequestMapping(value="/add.html",method={RequestMethod.POST})
	public @ResponseBody Object save(@RequestBody User user,HttpServletRequest req,HttpServletResponse res){
		
		// res.setHeader("Access-Control-Allow-Origin", "*");
		 userDao.saveUser(user);
		 return user;
	}
	
	@RequestMapping(value="/getByName/{name}",method={RequestMethod.GET})
	public @ResponseBody Object getByName(@PathVariable String name){
		 User user =  userDao.getByName(name);
		 Result result = new Result();
		 result.setStatus(0);
		 result.setResult(user);
		 return result;
	}
	
	
}
