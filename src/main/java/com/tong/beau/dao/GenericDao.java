package com.tong.beau.dao;

import java.util.List;
 
public interface GenericDao<E, K> {
 
    void save(E entity);
     
    void update(E entity);
    
    void saveOrUpdate(E entity);
     
    void remove(E entity);
     
    E find(K key);
     
    List<E> list();
     
}