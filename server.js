const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'Karl1234',
    database: 'blog',
  },
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let List = [];

knex.select('id', 'title', 'subtitle', 'time', 'likeNum', 'view').from('stories').then((result) => {
  List = result;
  for (let i = 0; i < List.length; i += 1) {
    knex('storyTags')
      .where('storyTags.storyId', List[i].id)
      .rightJoin('tags', 'tags.id', 'storyTags.tagId')
      .select('tags.name')
      .then((tags) => {
        List[i].tags = tags;
      });
    knex('stories')
      .rightJoin('users', 'users.id', 'stories.authorId')
      .where('stories.id', List[i].id)
      .select('users.name', 'users.imgLink')
      .then((author) => {
        List[i].author = {
          name: author[0].name,
          imgLink: author[0].imgLink,
        };
      });
  }
});

app.get('/api/stories', (req, res) => {
  res.json(List);
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
