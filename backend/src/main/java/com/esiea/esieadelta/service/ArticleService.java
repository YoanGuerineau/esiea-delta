package com.esiea.esieadelta.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.repository.ArticleRepository;

@Service
public class ArticleService {

	@Autowired
	private ArticleRepository articleRepository;

	public Article createArticle(Article article) throws NotAllowedException {
		if (article.getId() == null) {
			return articleRepository.save(article);
		} else {
			throw new NotAllowedException();
		}
	}

	public Iterable<Article> getArticles() {
		return articleRepository.findAll();
	}

	public Iterable<Article> getArticlesByTitle(String title) {
		return articleRepository.findByTitleContaining(title);
	}

	public Iterable<Article> getArticlesByContent(String content) {
		return articleRepository.findByContentContaining(content);
	}

	public Article getArticle(Integer id) throws NotFoundException {
		Optional<Article> result = articleRepository.findById(id);
		if( result.isPresent() ) {
			return result.get();
		} else { 
			throw new NotFoundException();
		}
	}

	public Article updateArticle(Article article) throws NotFoundException {
		getArticle(article.getId());
		return articleRepository.save(article);
	}

	public void deleteArticle(Integer id) throws NotFoundException {
		try {
			articleRepository.deleteById(id);					
		} catch (EmptyResultDataAccessException exception) {
			throw new NotFoundException();
		}
	}
}
