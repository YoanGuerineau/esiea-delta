package com.esiea.esieadelta.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.service.ArticleService;
import com.esiea.esieadelta.service.NotAllowedException;
import com.esiea.esieadelta.service.NotFoundException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/private/article")
public class ArticleController {

	@Autowired
	private ArticleService articleService;

	@GetMapping("")
	public Iterable<Article> getArticles() {
		return articleService.getArticles();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Article> getArticle(@PathVariable("id") Integer id) {
		try {
			Article article = articleService.getArticle(id);
			return new ResponseEntity<Article>(article, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/search")
	public Iterable<Article> getArticlesByKeyword(@RequestParam("query") String keyword) {
		List<Article> titlesMatching = (List<Article>) articleService.getArticlesByTitle(keyword);
		List<Article> contentsMatching = (List<Article>) articleService.getArticlesByContent(keyword);
		List<Article> results = new ArrayList<>();
		results.addAll(titlesMatching);
		results.addAll(contentsMatching);
		return results;
	}

	@PostMapping("")
	public ResponseEntity<Article> addArticle(@RequestBody Article article) {
		try {
			article = articleService.createArticle(article);
			return new ResponseEntity<Article>(article, HttpStatus.OK);
		} catch (NotAllowedException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteArticle(@PathVariable("id") Integer id) {
		try {
			articleService.deleteArticle(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("")
	public ResponseEntity<Article> replaceArticle(@RequestBody Article article) {
		try {
			article = articleService.updateArticle(article);
			return new ResponseEntity<Article>(article, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PatchMapping("")
	public ResponseEntity<Article> partialReplaceArticle(@RequestBody Article article) {
		try {
			Article existingArticle = articleService.getArticle(article.getId());
			if (article.getTitle() != null && !article.getTitle().equals(existingArticle.getTitle())) {
				existingArticle.setTitle(article.getTitle());
			}
			if (article.getContent() != null
					&& !article.getContent().equals(existingArticle.getContent())) {
				existingArticle.setContent(article.getContent());
			}
			if (article.getAuthor() != null && !article.getAuthor().equals(existingArticle.getAuthor())) {
				existingArticle.setAuthor(article.getAuthor());
			}
			if (article.getDate() != null && !article.getDate().equals(existingArticle.getDate())) {
				existingArticle.setDate(article.getDate());
			}
			if (article.getCategories() != null && !article.getCategories().equals(existingArticle.getCategories())) {
				existingArticle.setCategories(article.getCategories());
			}
			existingArticle = articleService.updateArticle(existingArticle);
			return new ResponseEntity<Article>(existingArticle, HttpStatus.OK);
		} catch (NotFoundException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
