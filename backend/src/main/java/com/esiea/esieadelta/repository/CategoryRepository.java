package com.esiea.esieadelta.repository;

import org.springframework.data.repository.CrudRepository;

import com.esiea.esieadelta.model.Category;

public interface CategoryRepository extends CrudRepository<Category, Integer> {

	public Iterable<Category> findByName(String name);
}
