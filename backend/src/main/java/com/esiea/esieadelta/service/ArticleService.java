package com.esiea.esieadelta.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.repository.ArticleRepository;
import com.esiea.esieadelta.wrapper.article.ArticleWrapper;
import com.esiea.esieadelta.wrapper.article.CompleteArticle;

@Service
public class ArticleService {

	@Autowired
	private ArticleRepository articleRepository;
	
	@Autowired
	private ArticleWrapper articleWrapper;

	public CompleteArticle createArticle(Article article) throws NotAllowedException {
		if (article.getId() == null) {
			return upsertArticle(article);
		} else {
			throw new NotAllowedException();
		}
	}

	public List<CompleteArticle> getArticles() {
		return articleWrapper.getCompleteArticles(articleRepository.findAll());
	}

	public List<CompleteArticle> getArticlesByTitle(String title) {
		return articleWrapper.getCompleteArticles(articleRepository.findByTitleContaining(title));
	}

	public List<CompleteArticle> getArticlesByContent(String content) {
		return articleWrapper.getCompleteArticles(articleRepository.findByContentContaining(content));
	}
	
	public List<CompleteArticle> getArticlesByAuthor(String author) {
		return articleWrapper.getCompleteArticles(articleRepository.findByAuthorContaining(author));
	}

	public CompleteArticle getArticle(Integer id) throws NotFoundException {
		Optional<Article> result = articleRepository.findById(id);
		if( result.isPresent() ) {
			return articleWrapper.getCompleteArticle(result.get());
		} else { 
			throw new NotFoundException();
		}
	}
	
	public Optional<Article> getArticleEntity(Integer id) {
		return articleRepository.findById(id);
	}

	public CompleteArticle updateArticle(Article article) throws NotFoundException {
		getArticle(article.getId());
		return upsertArticle(article);
	}
	
	public CompleteArticle updateArticle(CompleteArticle completeArticle) throws NotFoundException {
		getArticle(completeArticle.getId());
		return upsertArticle(completeArticle);
	}

	public CompleteArticle upsertArticle(Article article) {
		return articleWrapper.getCompleteArticle(articleRepository.save(article));
	}
	
	public CompleteArticle upsertArticle(CompleteArticle completeArticle) {
		return upsertArticle(articleWrapper.getArticle(completeArticle));
	}

	public void deleteArticle(Integer id) throws NotFoundException {
		try {
			articleRepository.deleteById(id);					
		} catch (EmptyResultDataAccessException exception) {
			throw new NotFoundException();
		}
	}
}
