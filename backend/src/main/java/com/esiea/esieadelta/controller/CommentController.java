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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esiea.esieadelta.model.Comment;
import com.esiea.esieadelta.service.CommentService;
import com.esiea.esieadelta.service.NotAllowedException;
import com.esiea.esieadelta.service.NotFoundException;
import com.esiea.esieadelta.wrapper.comment.CompleteComment;

@CrossOrigin( origins = "*", allowedHeaders = "*" )
@RestController
@RequestMapping("/esiea-delta-backend/api/private/comment")
public class CommentController {

	@Autowired
	private CommentService commentService;
	
	@GetMapping("")
	public Iterable<CompleteComment> getComments() {
		return commentService.getComments();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CompleteComment> getComment(@PathVariable("id") Integer id) {
		try {
			CompleteComment completeComment = commentService.getComment(id);
			return new ResponseEntity<CompleteComment>( completeComment, HttpStatus.OK );
		} catch ( NotFoundException e) {
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}
	}
	
	@PostMapping("")
	public ResponseEntity<CompleteComment> addComment(@RequestBody Comment comment) {
		try {
			CompleteComment completeComment = commentService.createComment(comment);
			return new ResponseEntity<CompleteComment>( completeComment, HttpStatus.OK );
		} catch (NotAllowedException e) {
			return new ResponseEntity<>( HttpStatus.METHOD_NOT_ALLOWED );
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteComment(@PathVariable("id") Integer id) {
		try {
			commentService.deleteComment(id);
			return new ResponseEntity<>( HttpStatus.OK );
		} catch (NotFoundException e) {
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}
	}
	
	@PatchMapping("")
	public ResponseEntity<CompleteComment> partialReplaceComment(@RequestBody Comment comment) {
		try {
			CompleteComment existingComment = commentService.getComment(comment.getId());
			if (comment.getContent() != null && !comment.getContent().equals(existingComment.getContent())) {
				existingComment.setContent(comment.getContent());
			}
			if (comment.getAuthor() != null && !comment.getAuthor().equals(existingComment.getAuthor())) {
				existingComment.setAuthor(comment.getAuthor());
			}
			if (comment.getDate() != null && !comment.getDate().equals(existingComment.getDate())) {
				existingComment.setDate(comment.getDate());
			}
			if (comment.getArticle() != null && !comment.getArticle().equals(existingComment.getArticle())) {
				existingComment.setArticle(comment.getArticle());
			}
			existingComment = commentService.updateComment(existingComment);
			return new ResponseEntity<CompleteComment>( existingComment, HttpStatus.OK );
		} catch (NotFoundException e) {
			return new ResponseEntity<>( HttpStatus.NOT_FOUND );
		}
	}
}
