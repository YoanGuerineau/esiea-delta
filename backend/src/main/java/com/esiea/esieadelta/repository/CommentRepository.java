package com.esiea.esieadelta.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.esiea.esieadelta.model.Comment;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {

}
