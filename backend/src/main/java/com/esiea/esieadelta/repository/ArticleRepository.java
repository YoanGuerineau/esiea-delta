package com.esiea.esieadelta.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.esiea.esieadelta.model.Article;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Integer> {

	public Iterable<Article> findByTitleIgnoreCaseContaining(String title);
	
	public Iterable<Article> findByContentIgnoreCaseContaining(String content);
	
	public Iterable<Article> findByAuthorIgnoreCaseContaining(String author);
}
