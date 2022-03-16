package com.esiea.esieadelta.wrapper.article;

import java.util.Date;

import com.esiea.esieadelta.model.Article;

public class BasicArticle {

	protected Integer id;
	protected String title;
	protected String author;
	protected Date date;
	protected String content;
	protected String thumbnail;
	
	public BasicArticle(Article article) {
		setId(article.getId());
		setTitle(article.getTitle());
		setAuthor(article.getAuthor());
		setDate(article.getDate());
		setContent(article.getContent());
		setThumbnail(article.getThumbnail());
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
}
