package com.esiea.esieadelta.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table( 
	name = "categories",
	uniqueConstraints = { @UniqueConstraint( 	columnNames = { "name" } ) }
)
public class Category {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "category_id" )
	private Integer id;
	@Column( name = "name", unique = true )
	private String name;
	@ManyToMany( mappedBy = "categories" )
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
