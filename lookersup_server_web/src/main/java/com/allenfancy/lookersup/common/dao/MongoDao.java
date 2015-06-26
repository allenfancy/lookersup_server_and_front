package com.allenfancy.lookersup.common.dao;


import java.util.Collection;
import java.util.List;


import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;



/**
 * 作�?用的CRUD,后期扩展
 * 
 * @author Admin
 * 
 */
public abstract class MongoDao<T, PK> {

	private MongoTemplate mongoTemplate;
	private String collectionName;
	private Class<T> tclass;

	public abstract void setInit();

	/**
	 * 根据id删除
	 * 
	 * @param id
	 * @throws IllegalAccessException
	 */
	protected void deleteKey(PK id) {
		if (id == null) {
			throw new IllegalStateException(tclass.getName() + "id不能为空");
		}
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(id));
		mongoTemplate.remove(query, collectionName);
	}

	/**
	 * 根据ids批量删除
	 * 
	 * @param id
	 * @throws IllegalAccessException
	 */
	protected void deleteBatchKey(PK... ids) {
		if (ids == null) {
			throw new IllegalStateException(tclass.getName() + "ids不能为空");
		}
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").in(ids));
		mongoTemplate.remove(query, collectionName);
	}

	/**
	 * 根据ID查询
	 * 
	 * @param id
	 * @return
	 */
	protected T getByKey(PK id) {
		if (id == null) {
			return null;
		}
		return mongoTemplate.findById(id, tclass, collectionName);
	}

	protected List<T> findAll() {
		return mongoTemplate.findAll(tclass, collectionName);
	}
	/**
	 * 插入多条数据
	 * 
	 * @param ts
	 * @param companyId
	 */
	protected void insertBatch(Collection<T> ts) {
		mongoTemplate.insert(ts, collectionName);
	}

	protected void update(T t) {
		mongoTemplate.save(t, collectionName);
	}

	protected void insert(T t) {
		mongoTemplate.insert(t, collectionName);
	}

	// ////////////////////////////////
	public void setTemplate(MongoTemplate template) {
		this.mongoTemplate = template;
	}

	public void setMongoTemplate(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}

	public void setCollectionName(String collectionName) {
		this.collectionName = collectionName;
	}

	public void setTclass(Class<T> tclass) {
		this.tclass = tclass;
	}
}
