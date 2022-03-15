package com.esiea.esieadelta.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table( name = "categories" )
public class Category {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "category_id" )
	private Integer id;
	private String name;
	@ManyToMany( 
		fetch = FetchType.LAZY,
		cascade = {
			CascadeType.PERSIST,
			CascadeType.MERGE
		}
	)
	@JoinTable(
		name = "category_article",
		joinColumns = @JoinColumn( name = "category_id" ),
		inverseJoinColumns = @JoinColumn( name = "article_id" )
	)
	private List<Article> articles = new ArrayList<>();
	
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
	
	public List<Article> getArticles() {
		return articles;
	}
	
	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}

	public void addArticle(Article article) {
		this.articles.add(article);
		article.getCategories().add(this);
	}
	
	public void removeArticle(Article article) {
		this.articles.remove(article);
		article.getCategories().remove(this);
	}
}
