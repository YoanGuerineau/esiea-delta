package com.esiea.esieadelta.wrapper.category;

import com.esiea.esieadelta.model.Category;

public class BasicCategory {

	protected Integer id;
	protected String name;
	
	public BasicCategory(Category category) {
		setId(category.getId());
		setName(category.getName());
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
