package com.esiea.esieadelta.wrapper.category;

import java.util.ArrayList;
import java.util.List;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.model.Category;
import com.esiea.esieadelta.wrapper.article.BasicArticle;

public class CompleteCategory extends BasicCategory {

	private List<BasicArticle> articles = new ArrayList<>();

	public CompleteCategory(Category category) {
		super(category);
		setArticles(category.getArticles());
	}
	
	public List<BasicArticle> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		for ( Article article : articles ) {
			getArticles().add(new BasicArticle(article));
		}
	}
}
