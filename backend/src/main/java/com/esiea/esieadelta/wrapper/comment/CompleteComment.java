package com.esiea.esieadelta.wrapper.comment;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.model.Comment;
import com.esiea.esieadelta.wrapper.article.BasicArticle;

public class CompleteComment extends BasicComment{

	private BasicArticle article;
	
	public CompleteComment(Comment comment) {
		super(comment);
		setArticle(comment.getArticle());		
	}

	public BasicArticle getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = new BasicArticle(article);
	}
	
}
