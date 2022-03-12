package com.esiea.esieadelta.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.esiea.esieadelta.model.Category;
import com.esiea.esieadelta.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	public Category createCategory(Category category) throws NotAllowedException {
		if (category.getId() == null) {
			return categoryRepository.save(category);
		} else {
			throw new NotAllowedException();
		}
	}
	
	public Iterable<Category> getCategories() {
		return categoryRepository.findAll();
	}
	
	public Category getCategory(Integer id) throws NotFoundException {
		Optional<Category> result = categoryRepository.findById(id);
		if( result.isPresent() ) {
			return result.get();
		} else { 
			throw new NotFoundException();
		}
	}
}
