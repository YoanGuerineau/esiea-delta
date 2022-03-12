package com.esiea.esieadelta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.model.Category;
import com.esiea.esieadelta.service.ArticleService;
import com.esiea.esieadelta.service.CategoryService;
import com.esiea.esieadelta.service.NotAllowedException;
import com.esiea.esieadelta.service.NotFoundException;

@CrossOrigin( origins = "*", allowedHeaders = "*" )
@RestController
@RequestMapping("/api/private/category")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ArticleService articleService;
	
	@GetMapping("")
	public Iterable<Category> getCategories() {
		return categoryService.getCategories();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategory(@PathVariable("id") Integer id) {
		try {
			Category category = categoryService.getCategory( id );
			return new ResponseEntity<Category>( category, HttpStatus.OK );
		} catch (NotFoundException e) {
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}
	}
	
	@PostMapping("")
	public ResponseEntity<Category> addCategory(@RequestBody Category category) {
		try {
			category = categoryService.addCategory(category);
			return new ResponseEntity<Category>(category, HttpStatus.OK);			
		} catch ( NotAllowedException e ) {
			return new ResponseEntity<Category>( HttpStatus.METHOD_NOT_ALLOWED);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCategory(@PathVariable("id") Integer id) {
		try {
			categoryService.deleteCategory();
			return new ResponseEntity<String>( HttpStatus.OK );
		} catch (NotFoundException e ) {
			return new ResponseEntity<String>( HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("")
	public ResponseEntity<Category> replaceCategory(@RequestBody Category category) {
		try {
			category = categoryService.updateCategory(category);
			return new ResponseEntity<Category>( category, HttpStatus.OK );
		} catch ( NotFoundException e ) {
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}
	}
	
	@PostMapping("/{categoryId}/{articleId}")
	public void addArticleToCategory(
			@PathVariable(name = "categoryId") Integer categoryId,
			@PathVariable(name = "articleId") Integer articleId) {
		try {
			Category category = categoryService.getCategory(categoryId);
			Article article = articleService.getArticle(articleId);
			
			for ( Article articleInCategory : category.getArticles() ) {
				if ( article.getId() == articleInCategory.getId() ) {
					return;
				}
			}
			
			category.addArticle(article);
			categoryService.updateCategory(category);
		} catch (NotFoundException e) {
			e.printStackTrace();
		}
	}
}
