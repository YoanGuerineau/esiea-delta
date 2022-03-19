package com.esiea.esieadelta.wrapper.article;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.wrapper.category.CategoryWrapper;
import com.esiea.esieadelta.wrapper.comment.CommentWrapper;

@Component
public class ArticleWrapper {
	
	@Autowired
	private CategoryWrapper categoryWrapper;
	
	@Autowired
	private CommentWrapper commentWrapper;
	
	public CompleteArticle getCompleteArticle(Article article) {
		return new CompleteArticle(article);
	}
	
	public List<CompleteArticle> getCompleteArticles(Iterable<Article> articles) {
		List<CompleteArticle> completeArticles = new ArrayList<>();
		for ( Article article : articles ) {
			completeArticles.add(getCompleteArticle(article));
		}
		return completeArticles;
	}
	
	public List<Article> getArticles(List<BasicArticle> basicArticles) {
		List<Article> articles = new ArrayList<>();
		for (BasicArticle basicArticle : basicArticles) {
			articles.add(getArticleFromBasic(basicArticle));
		}
		return articles;
	}
	
	public Article getArticle(CompleteArticle completeArticle) {
		Article article = getArticleFromBasic(completeArticle);
		article.setCategories(categoryWrapper.getCategories(completeArticle.getCategories()));
		article.setComments(commentWrapper.getComments(completeArticle.getComments()));
		return article;
	}
	
	public Article getArticleFromBasic(BasicArticle basicArticle) {
		Article article = new Article();
		article.setId(basicArticle.getId());
		article.setTitle(basicArticle.getTitle());
		article.setAuthor(basicArticle.getAuthor());
		article.setDate(basicArticle.getDate());
		article.setContent(basicArticle.getContent());
		article.setThumbnail(basicArticle.getThumbnail());
		return article;
	}
}
