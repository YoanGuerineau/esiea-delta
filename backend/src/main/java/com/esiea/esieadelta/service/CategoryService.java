package com.esiea.esieadelta.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.esiea.esieadelta.model.Category;
import com.esiea.esieadelta.repository.CategoryRepository;
import com.esiea.esieadelta.wrapper.category.CategoryWrapper;
import com.esiea.esieadelta.wrapper.category.CompleteCategory;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryWrapper categoryWrapper;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	public CompleteCategory createCategory(Category category) throws NotAllowedException {
		if ( category.getId() == null ) {
			return upsertCategory(category);
		} else {
			throw new NotAllowedException();
		}
	}
	
	public List<CompleteCategory> getCategories() {
		return categoryWrapper.getCompleteCategories(categoryRepository.findAll());
	}
	
	public CompleteCategory getCategory(Integer id) throws NotFoundException {
		Optional<Category> result = categoryRepository.findById(id);
		if( result.isPresent() ) {
			return categoryWrapper.getCompleteCategory(result.get());
		} else { 
			throw new NotFoundException();
		}
	}
	
	public Optional<Category> getCategoryEntity(Integer id) {
		return categoryRepository.findById(id);
	}
	
	public Boolean categoryNameExists(String name) {
		return categoryRepository.findByName(name).iterator().hasNext();
	}

	public Category findCategoryByName(String name) {
		return categoryRepository.findByName(name).iterator().next();
	}
	
	public CompleteCategory updateCategory(Category category) throws NotFoundException {
		getCategory(category.getId());
		return upsertCategory(category);
	}
	
	public CompleteCategory updateCategory(CompleteCategory completeCategory) throws NotFoundException {
		getCategory(completeCategory.getId());
		return upsertCategory(completeCategory);
	}
	
	public CompleteCategory upsertCategory(Category category) {
		return categoryWrapper.getCompleteCategory(categoryRepository.save(category));
	}
	
	public CompleteCategory upsertCategory(CompleteCategory completeCategory) {
		return upsertCategory(categoryWrapper.getCategory(completeCategory));
	}
	
	public void deleteCategory(Integer id) throws NotFoundException {
		try {
			categoryRepository.deleteById(id);
		} catch ( EmptyResultDataAccessException e ) {
			throw new NotFoundException();
		}
	}
}
