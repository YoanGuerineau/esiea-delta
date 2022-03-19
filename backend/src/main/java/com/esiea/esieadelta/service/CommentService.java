package com.esiea.esieadelta.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.esiea.esieadelta.model.Comment;
import com.esiea.esieadelta.repository.CommentRepository;
import com.esiea.esieadelta.wrapper.comment.CommentWrapper;
import com.esiea.esieadelta.wrapper.comment.CompleteComment;

@Service
public class CommentService {

	@Autowired
	private CommentWrapper commentWrapper;
	
	@Autowired
	private CommentRepository commentRepository;
	
	public CompleteComment createComment(Comment comment) throws NotAllowedException {
		if ( comment.getId() == null ) {
			return upsertComment(comment);
		} else {
			throw new NotAllowedException();
		}
	}
	
	public List<CompleteComment> getComments() {
		return commentWrapper.getCompleteComments(commentRepository.findAll());
	}
	
	public CompleteComment getComment(Integer id) throws NotFoundException {
		Optional<Comment> result = commentRepository.findById(id);
		if ( result.isPresent() ) {
			return commentWrapper.getCompleteComment(result.get());
		} else {
			throw new NotFoundException();
		}
	}
	
	public Optional<Comment> getCommentEntity(Integer id) {
		return commentRepository.findById(id);
	}
	
	public CompleteComment updateComment(Comment comment) throws NotFoundException {
		getComment(comment.getId());
		return upsertComment(comment);
	}
	
	public CompleteComment updateComment(CompleteComment completeComment) throws NotFoundException {
		getComment(completeComment.getId());
		return upsertComment(completeComment);
	}
	
	public CompleteComment upsertComment(Comment comment) {
		return commentWrapper.getCompleteComment(commentRepository.save(comment));
	}
	
	public CompleteComment upsertComment(CompleteComment completeComment) {
		return upsertComment(commentWrapper.getComment(completeComment));
	}
	
	public void deleteComment(Integer id) throws NotFoundException {
		try {
			commentRepository.deleteById(id);
		} catch ( EmptyResultDataAccessException e ) {
			throw new NotFoundException();
		}
	}
	
}
