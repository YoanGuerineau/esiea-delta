package com.esiea.esieadelta.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.esiea.esieadelta.model.Article;
import com.esiea.esieadelta.model.Category;
import com.esiea.esieadelta.service.ArticleService;
import com.esiea.esieadelta.service.CategoryService;
import com.esiea.esieadelta.service.NotAllowedException;
import com.esiea.esieadelta.service.NotFoundException;
import com.esiea.esieadelta.wrapper.category.CompleteCategory;

@CrossOrigin( origins = "*", allowedHeaders = "*" )
@RestController
@RequestMapping("/api/private/category")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ArticleService articleService;
	
	@GetMapping("")
	public Iterable<CompleteCategory> getCategories() {
		return categoryService.getCategories();
	}

	@GetMapping("/{id}")
	public ResponseEntity<CompleteCategory> getCategory(@PathVariable("id") Integer id) {
		try {
			CompleteCategory completeCategory = categoryService.getCategory( id );
			return new ResponseEntity<CompleteCategory>( completeCategory, HttpStatus.OK );
		} catch (NotFoundException e) {
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}
	}
	
	@PostMapping("")
	public ResponseEntity<CompleteCategory> addCategory(@RequestBody Category category) {
		try {
			CompleteCategory completeCategory = categoryService.createCategory(category);
			return new ResponseEntity<CompleteCategory>(completeCategory, HttpStatus.OK);			
		} catch ( NotAllowedException e ) {
			return new ResponseEntity<>( HttpStatus.METHOD_NOT_ALLOWED);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCategory(@PathVariable("id") Integer id) {
		try {
			categoryService.deleteCategory(id);
			return new ResponseEntity<String>( HttpStatus.OK );
		} catch (NotFoundException e ) {
			return new ResponseEntity<String>( HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("")
	public ResponseEntity<CompleteCategory> replaceCategory(@RequestBody Category category) {
		try {
			CompleteCategory completeCategory = categoryService.updateCategory(category);
			return new ResponseEntity<CompleteCategory>( completeCategory, HttpStatus.OK );
		} catch ( NotFoundException e ) {
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}
	}
	
	@PatchMapping("")
	public ResponseEntity<CompleteCategory> partialReplaceCategory(@RequestBody Category category) {
		try {
			CompleteCategory existingCategory = categoryService.getCategory(category.getId());
			if ( category.getName() != null && !category.getName().equals(existingCategory.getName())) {
				existingCategory.setName(category.getName());
			}
			if ( category.getArticles() != null && !category.getArticles().equals(existingCategory.getArticles())) {
				existingCategory.setArticles(category.getArticles());
			}
			existingCategory = categoryService.updateCategory(existingCategory);
			return new ResponseEntity<CompleteCategory>( existingCategory, HttpStatus.OK );
		} catch ( NotFoundException e ) {
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}
	}
	
	@PostMapping("/{categoryId}/{articleId}")
	public void addArticleToCategory(
			@PathVariable(name = "categoryId") Integer categoryId,
			@PathVariable(name = "articleId") Integer articleId) {
		try {
			Category category = categoryService.getCategoryEntity(categoryId).get();
			Article article = articleService.getArticleEntity(articleId).get();
			
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
