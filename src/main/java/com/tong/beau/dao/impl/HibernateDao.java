package com.tong.beau.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tong.beau.dao.GenericDao;

/**
 * Basic DAO operations dependent with Hibernate's specific classes
 * @see SessionFactory
 */
@Transactional(propagation= Propagation.REQUIRED, readOnly=false)
public class HibernateDao<E, K extends Serializable> implements GenericDao<E, K> {
 
    protected SessionFactory sessionFactory;
    protected Class<? extends E> daoType;
 
    @SuppressWarnings("unchecked")
	public HibernateDao() {
        daoType = (Class<E>) ((ParameterizedType) getClass().getGenericSuperclass())
                        .getActualTypeArguments()[0];
    }
 
    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
 
    protected Session currentSession() {
        return sessionFactory.getCurrentSession();
    }
 
    @Override
    public void save(E entity) {
        currentSession().save(entity);
    }
 
    @Override
    public void update(E entity) {
        currentSession().update(entity);
    }
    
    @Override
    public void saveOrUpdate(E entity) {
    	currentSession().saveOrUpdate(entity);
    }
 
    @Override
    public void remove(E entity) {
        currentSession().delete(entity);
    }
 
    @SuppressWarnings("unchecked")
	@Override
    public E find(K key) {
        return (E) currentSession().get(daoType, key);
    }
 
    @SuppressWarnings("unchecked")
	@Override
    public List<E> list() {
        return currentSession().createCriteria(daoType).list();
    }
}
