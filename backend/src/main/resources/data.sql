INSERT INTO articles (title, author, content, date) VALUES 
  ('Lorem Ipsum article', 'Yoan Guerineau', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non magna tincidunt, efficitur sapien a, mollis odio. Vestibulum non massa sed orci molestie aliquet vel ac purus. Maecenas finibus condimentum hendrerit. Ut ultrices enim metus, in venenatis urna imperdiet sit amet. Morbi tellus est, suscipit sed lacus vitae, sodales faucibus nunc. Etiam eget elit ullamcorper, pharetra mauris vulputate, fringilla nisi. Nulla mollis cursus euismod. In viverra, turpis quis luctus rutrum, massa mi malesuada justo, quis gravida felis lacus a ipsum. Morbi fringilla nunc sed justo placerat, nec ultrices tortor laoreet. Etiam tincidunt dolor nec elit ornare aliquet. Morbi tempus felis a massa congue tincidunt. Ut malesuada vel neque eu dictum. Nunc sed feugiat arcu. Etiam lorem massa, fermentum ullamcorper pharetra at, rhoncus at augue. Suspendisse vitae commodo risus, eu elementum libero. Nulla risus metus, porttitor ut est fringilla, volutpat mattis eros.

Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam aliquet massa ut mi feugiat malesuada quis tristique nisi. Donec sagittis massa nec quam tempor, vitae venenatis nibh gravida. Pellentesque ut nibh sed lorem pharetra bibendum. Duis non ipsum tincidunt, viverra purus at, egestas ipsum. Cras ultrices justo sit amet justo vehicula, non faucibus quam laoreet. Phasellus dignissim nulla vel dui rutrum, facilisis vehicula justo sagittis. Cras rutrum arcu augue, quis commodo magna mattis lobortis. Vestibulum nec orci accumsan elit aliquet mollis. Duis aliquet a nibh eget condimentum. Fusce fringilla eget magna eget accumsan. In ante elit, lacinia ac felis in, condimentum tristique massa. In hac habitasse platea dictumst. Phasellus consectetur placerat arcu nec ullamcorper. Mauris vulputate consectetur pretium.

Donec in volutpat ante. Sed ex arcu, tincidunt ac blandit et, mollis sit amet eros. Praesent feugiat turpis enim, mattis feugiat diam dictum in. Duis mollis rhoncus urna, at venenatis ligula. Sed id ligula non diam sagittis sodales nec eget massa. Maecenas sit amet nulla nisi. Morbi a orci id dui lobortis fringilla quis ut odio. Mauris ut orci maximus, consectetur nunc sit amet, convallis enim. Integer vehicula porttitor dui vitae fermentum. Nullam non diam quam. Suspendisse cursus tempus euismod. Aenean vel tortor eget ligula aliquam rhoncus eu nec justo. Suspendisse quis vestibulum neque.', 
CURDATE()),

  ('Another article', 'Yoan Guerineau', 'Here is the second article on esiea-delta. This article will be a short one. It is all about filling the space with some dummy text you know... No, you won''t get nor learn anything reading this, you can stop reading this.
Oh, you are still here? Great, let''s spend some more time together then. In fact, writing this article is not that easy because you need to make up content as you go, it seems like it is working for now because you are still reading it.
I think I will stop writing just now as I''m running out of ideas to simply fill all that blank space. Thank you for reading this though, I hope you had some fun reading this whole thing even though you didn''t get anything from it.', 
CURDATE()),
  
  ('Third article', 'Not Yoan Guerineau', 'This is the third article and it''s a short one to see how it goes with short text.', CURDATE());

INSERT INTO articles (title, author, content, date, thumbnail) VALUES 
('Fourth article', 'Maybe Yoan Guerineau', 'This one will only be a few words long.', CURDATE(), 'https://i.pinimg.com/originals/73/c4/c1/73c4c12d67609edb85c7e62b49be5c72.jpg'),
('Fifth article', 'Maybe Not Yoan Guerineau', 'Today I am writing an article that will take a few lines because we need to see how it fits with a thumbnail. Thumbnails could look great and will maybe make our users click more on the articles they see.
Maybe I am wrong and thumnails will only make them scroll even faster, seeking for an eye-catching thumbnail over a soft one... Headlines are also important and shouldn''t be neglicted, some people don''t even look at thmubnails and are only reading headlines.
I do think that headlines mixed up with thumbnails are super effective when used well. An "intense" almost clickbaiting headline mixed with an explosive eye-catching thumbnail would really get me to click on an article more than another.', CURDATE(), 'https://i.pinimg.com/originals/73/c4/c1/73c4c12d67609edb85c7e62b49be5c72.jpg');

INSERT INTO categories (name) VALUES 
('lorem'),
('short'),
('long'),
('english'),
('thumbnail');

INSERT INTO category_article (category_id, article_id) VALUES 
  (1,1),
  (2,3),
  (2,4),
  (3,1),
  (3,2),
  (3,5),
  (4,2),
  (4,3),
  (4,4),
  (4,5),
  (5,4),
  (5,5);