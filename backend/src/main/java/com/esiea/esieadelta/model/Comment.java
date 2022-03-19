package com.esiea.esieadelta.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table( name = "comments" )
public class Comment {

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	@Column( name = "comment_id" )
	private Integer id;
	private String content;
	private String author;
	@DateTimeFormat( pattern = "yyyy-MM-dd HH:mm:ss")
	private Date date;
	@ManyToOne( 
		fetch = FetchType.LAZY,
		cascade = {
			CascadeType.DETACH
		}
	)
	@JoinTable(
		name = "comment_article",
		joinColumns = @JoinColumn( name = "comment_id" ),
		inverseJoinColumns = @JoinColumn( name = "article_id")
	)
	private Article article;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
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
	
	public Article getArticle() {
		return article;
	}
	
	public void setArticle(Article article) {
		this.article = article;
	}
	
}
