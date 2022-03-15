package com.esiea.esieadelta.wrapper.category;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.esiea.esieadelta.model.Category;
import com.esiea.esieadelta.wrapper.article.ArticleWrapper;

@Component
public class CategoryWrapper {
	
	@Autowired
	private ArticleWrapper articleWrapper;
	
	public CompleteCategory getCompleteCategory(Category category) {
		return new CompleteCategory(category);
	}
	
	public List<CompleteCategory> getCompleteCategories(Iterable<Category> categories) {
		List<CompleteCategory> completeCategories = new ArrayList<>();
		for(Category category : categories) {
			completeCategories.add(getCompleteCategory(category));
		}
		return completeCategories;
	}
	
	public List<Category> getCategories(List<BasicCategory> basicCategories) {
		List<Category> categories = new ArrayList<>();
		for (BasicCategory basicCategory : basicCategories) {
			categories.add(getCategoryFromBasic(basicCategory));
		}
		return categories;
	}
	
	public Category getCategory(CompleteCategory completeCategory) {
		Category category = getCategoryFromBasic(completeCategory);
		category.setArticles(articleWrapper.getArticles(completeCategory.getArticles()));
		return category;
	}
	
	public Category getCategoryFromBasic(BasicCategory basicCategory) {
		Category category = new Category();
		category.setId(basicCategory.getId());
		category.setName(basicCategory.getName());
		return category;
	}
}
