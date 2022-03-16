package com.esiea.esieadelta.model;

import java.util.ArrayList;
import java.util.Date;
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

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table( name = "articles" )
public class Article {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "article_id" )
	private Integer id;
	private String title;
	private String author;
	@DateTimeFormat( pattern = "yyyy-MM-dd" )
	private Date date;
	private String content;
	@ManyToMany( 
		fetch = FetchType.LAZY,
		cascade = {
			CascadeType.MERGE
		}
	)
	@JoinTable(
		name = "category_article",
		joinColumns = @JoinColumn( name = "article_id" ),
		inverseJoinColumns = @JoinColumn( name = "category_id" )
	)
	private List<Category> categories = new ArrayList<>();
	
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
	
	public List<Category> getCategories() {
		return categories;
	}
	
	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}
	
}
