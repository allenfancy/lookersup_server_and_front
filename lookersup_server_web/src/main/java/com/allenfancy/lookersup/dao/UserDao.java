package com.allenfancy.lookersup.dao;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.allenfancy.lookersup.common.dao.MongoDao;
import com.allenfancy.lookersup.model.User;

@Repository
public class UserDao extends MongoDao<User,ObjectId>{

	@Autowired
	private MongoTemplate mongoTemplate;
	
	
	public void saveUser(User user){
		user.setCreate_time(new Date().getTime());
		user.setUpdate_time(user.getCreate_time());
		user.setId(new ObjectId().toString());
		mongoTemplate.insert(user, "users");
	}
	
	public User getByName(String name){
		Query query = new Query();
		query.addCriteria(Criteria.where("name").is(name));
		return mongoTemplate.findOne(query, User.class, "users");
	}
	
	@Override
	@Autowired
	public void setInit() {
		// TODO Auto-generated method stub
		setMongoTemplate(mongoTemplate);
		setTclass(User.class);
		setCollectionName("users");
	}

}
