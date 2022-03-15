package com.esiea.esieadelta.wrapper.article;

import java.util.ArrayList;
import java.util.List;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.model.Category;
import com.esiea.esieadelta.wrapper.category.BasicCategory;

public class CompleteArticle extends BasicArticle {

	private List<BasicCategory> categories = new ArrayList<>();

	public CompleteArticle(Article article) {
		super(article);
		setCategories(article.getCategories());
	}
	
	public List<BasicCategory> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> completeCategories) {
		for ( Category category : completeCategories) {
			getCategories().add(new BasicCategory(category));
		}
	}
}
