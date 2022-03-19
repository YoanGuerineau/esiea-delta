package com.esiea.esieadelta.wrapper.comment;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.esiea.esieadelta.model.Comment;
import com.esiea.esieadelta.wrapper.article.ArticleWrapper;

@Component
public class CommentWrapper {
	
	@Autowired ArticleWrapper articleWrapper;
	
	public CompleteComment getCompleteComment(Comment comment) {
		return new CompleteComment(comment);
	}
	
	public List<CompleteComment> getCompleteComments(Iterable<Comment> comments) {
		List<CompleteComment> completeComments = new ArrayList<>();
		for (Comment comment : comments) {
			completeComments.add(getCompleteComment(comment));
		}
		return completeComments;
	}
	
	public List<Comment> getComments(List<BasicComment> basicComments) {
		List<Comment> comments = new ArrayList<>();
		for(BasicComment basicComment : basicComments) {
			comments.add(getCommentFromBasic(basicComment));
		}
		return comments;
	}
	
	public Comment getComment(CompleteComment completeComment) {
		Comment comment = getCommentFromBasic(completeComment);
		comment.setArticle(articleWrapper.getArticleFromBasic(completeComment.getArticle()));
		return comment;
	}
	
	public Comment getCommentFromBasic(BasicComment basicComment) {
		Comment comment = new Comment();
		comment.setId(basicComment.getId());
		comment.setContent(basicComment.getContent());
		comment.setAuthor(basicComment.getAuthor());
		comment.setDate(basicComment.getDate());
		return comment;
	}
}
