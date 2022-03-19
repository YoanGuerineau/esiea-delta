DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  article_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  author VARCHAR(256) NOT NULL,
  content VARCHAR(MAX) NOT NULL,
  date DATETIME NOT NULL,
  thumbnail VARCHAR(2048) DEFAULT NULL
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
	category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(256) NOT NULL
);

DROP TABLE IF EXISTS category_article;
CREATE TABLE category_article (
	category_id BIGINT NOT NULL,
	article_id BIGINT NOT NULL
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
  comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  content VARCHAR(512) NOT NULL,
  author VARCHAR(256) NOT NULL,
  date DATETIME NOT NULL
);

DROP TABLE IF EXISTS comment_article;
CREATE TABLE comment_article (
  comment_id BIGINT NOT NULL,
  article_id BIGINT NOT NULL
);