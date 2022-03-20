package com.esiea.esieadelta.wrapper.article;

import java.util.ArrayList;
import java.util.List;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.model.Category;
import com.esiea.esieadelta.model.Comment;
import com.esiea.esieadelta.wrapper.category.BasicCategory;
import com.esiea.esieadelta.wrapper.comment.BasicComment;

public class CompleteArticle extends BasicArticle {

	private List<BasicCategory> categories = new ArrayList<>();
	
	private List<BasicComment> comments = new ArrayList<>();

	public CompleteArticle(Article article) {
		super(article);
		setCategories(article.getCategories());
		setComments(article.getComments());
	}
	
	public List<BasicCategory> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = new ArrayList<>();
		for ( Category category : categories) {
			getCategories().add(new BasicCategory(category));
		}
	}

	public List<BasicComment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		for ( Comment comment : comments) {
			getComments().add(new BasicComment(comment));
		}
	}
	
}
