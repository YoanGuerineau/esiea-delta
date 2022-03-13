DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  article_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  author VARCHAR(250) NOT NULL,
  content VARCHAR(MAX) NOT NULL,
  date DATE NOT NULL
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
	category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(250) NOT NULL
);

DROP TABLE IF EXISTS category_article;
CREATE TABLE category_article (
	category_id BIGINT NOT NULL,
	article_id BIGINT NOT NULL
);