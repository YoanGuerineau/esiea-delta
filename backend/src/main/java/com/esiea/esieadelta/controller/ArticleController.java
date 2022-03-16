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
import com.esiea.esieadelta.wrapper.article.CompleteArticle;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/private/article")
public class ArticleController {

	@Autowired
	private ArticleService articleService;

	@GetMapping("")
	public List<CompleteArticle> getArticles() {
		return articleService.getArticles();
	}

	@GetMapping("/{id}")
	public ResponseEntity<CompleteArticle> getArticle(@PathVariable("id") Integer id) {
		try {
			CompleteArticle article = articleService.getArticle(id);
			return new ResponseEntity<CompleteArticle>(article, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/search")
	public List<CompleteArticle> getArticlesByKeyword(@RequestParam("query") String keyword) {
		List<CompleteArticle> titlesMatching = articleService.getArticlesByTitle(keyword);
		List<CompleteArticle> contentsMatching = articleService.getArticlesByContent(keyword);
		List<CompleteArticle> results = new ArrayList<>();
		results.addAll(titlesMatching);
		results.addAll(contentsMatching);
		return results;
	}

	@PostMapping("")
	public ResponseEntity<CompleteArticle> addArticle(@RequestBody Article article) {
		try {
			CompleteArticle completeArticle = articleService.createArticle(article);
			return new ResponseEntity<CompleteArticle>(completeArticle, HttpStatus.OK);
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
	public ResponseEntity<CompleteArticle> replaceArticle(@RequestBody Article article) {
		try {
			CompleteArticle completeArticle = articleService.updateArticle(article);
			return new ResponseEntity<CompleteArticle>(completeArticle, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PatchMapping("")
	public ResponseEntity<CompleteArticle> partialReplaceArticle(@RequestBody Article article) {
		try {
			CompleteArticle existingArticle = articleService.getArticle(article.getId());
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
			if (article.getThumbnail() != null && !article.getThumbnail().equals(existingArticle.getThumbnail())) {
				existingArticle.setThumbnail(article.getThumbnail());
			}
			if (article.getCategories() != null && !article.getCategories().equals(existingArticle.getCategories())) {
				existingArticle.setCategories(article.getCategories());
			}
			existingArticle = articleService.updateArticle(existingArticle);
			return new ResponseEntity<CompleteArticle>(existingArticle, HttpStatus.OK);
		} catch (NotFoundException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
