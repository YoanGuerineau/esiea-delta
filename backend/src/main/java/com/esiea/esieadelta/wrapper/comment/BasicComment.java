package com.esiea.esieadelta.wrapper.comment;

import java.util.Date;

import com.esiea.esieadelta.model.Comment;

public class BasicComment {

	protected Integer id;
	protected String content;
	protected String author;
	protected Date date;
	
	public BasicComment( Comment comment ) {
		setId(comment.getId());
		setContent(comment.getContent());
		setAuthor(comment.getAuthor());
		setDate(comment.getDate());
	}

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
	
}
