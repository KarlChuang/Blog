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

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'dist/home')));
app.use('/like', express.static(path.join(__dirname, 'public')));
app.use('/like', express.static(path.join(__dirname, 'dist/home')));
app.use('/view', express.static(path.join(__dirname, 'public')));
app.use('/view', express.static(path.join(__dirname, 'dist/home')));
app.use('/tag/:name', express.static(path.join(__dirname, 'public')));
app.use('/tag/:name', express.static(path.join(__dirname, 'dist/home')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/storyList', (req, res) => {
  knex.select('id', 'title', 'subtitle', 'time', 'likeNum', 'view').from('stories').then((result) => {
    const List = result;
    for (let i = 0; i < List.length; i += 1) {
      knex('storyTags')
        .where('storyTags.storyId', List[i].id)
        .rightJoin('tags', 'tags.id', 'storyTags.tagId')
        .select('tags.name')
        .then((tags) => {
          List[i].tags = tags.map(tag => tag.name);
          knex('stories')
            .rightJoin('users', 'users.id', 'stories.authorId')
            .where('stories.id', List[i].id)
            .select('users.name', 'users.imgLink')
            .then((author) => {
              List[i].author = {
                name: author[0].name,
                imgLink: author[0].imgLink,
              };
              if (List[i + 1] === undefined) {
                res.json(List);
              }
            })
            .catch(() => {
              res.send('404 Not Found');
            });
        })
        .catch(() => {
          res.send('404 Not Found');
        });
    }
  })
  .catch(() => {
    res.send('404 Not Found');
  });
});

app.use('/story/:id', express.static(path.join(__dirname, 'public')));
app.use('/story/:id', express.static(path.join(__dirname, 'dist/story')));

app.get('/api/story/:id', (req, res) => {
  knex.select('id', 'title', 'subtitle', 'time', 'likeNum', 'view', 'content').from('stories').where('id', req.params.id).then((result) => {
    const story = result[0];
    knex('storyTags')
      .where('storyTags.storyId', story.id)
      .rightJoin('tags', 'tags.id', 'storyTags.tagId')
      .select('tags.name')
      .then((tags) => {
        story.tags = tags.map(tag => tag.name);
        knex('stories')
          .rightJoin('users', 'users.id', 'stories.authorId')
          .where('stories.id', story.id)
          .select('users.name', 'users.imgLink')
          .then((author) => {
            story.author = {
              name: author[0].name,
              imgLink: author[0].imgLink,
            };
            res.json(story);
          })
          .catch(() => {
            res.send('404 Not Found');
          });
      })
      .catch(() => {
        res.send('404 Not Found');
      });
  })
  .catch(() => {
    res.send('404 Not Found');
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
