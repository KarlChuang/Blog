const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
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
/*
passport.use(new FacebookStrategy({
  clientID: '153878698487543',
  clientSecret: '4502edc1eb43e19139a922ebe7f435bc',
  callbackURL: 'http://www.example.com/auth/facebook/callback',
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
*/
app.use('/', express.static(path.join(__dirname, 'public/home')));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/like', express.static(path.join(__dirname, 'public/home')));
app.use('/like', express.static(path.join(__dirname, 'dist')));
app.use('/view', express.static(path.join(__dirname, 'public/home')));
app.use('/view', express.static(path.join(__dirname, 'dist')));
app.use('/tag/:name', express.static(path.join(__dirname, 'public/home')));
app.use('/tag/:name', express.static(path.join(__dirname, 'dist')));
app.use('/newstory', express.static(path.join(__dirname, 'public/home')));
app.use('/newstory', express.static(path.join(__dirname, 'dist')));

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

app.use('/story/:id', express.static(path.join(__dirname, 'public/story')));
app.use('/story/:id', express.static(path.join(__dirname, 'dist')));

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

app.get('/api/handleid', (req, res) => {
  knex('messages')
    .select('id')
    .then(ids => Math.max(...ids.map(obj => obj.id)) + 1)
    .then((messageId) => {
      knex('stories')
        .select('id')
        .then(ids => Math.max(...ids.map(obj => obj.id)) + 1)
        .then((storyId) => {
          res.json({
            storyId,
            messageId,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/messages/:id', (req, res) => {
  knex('messages')
    .where('replyToStory', req.params.id)
    .rightJoin('users', 'users.id', 'messages.authorId')
    .select('messages.id', 'users.name', 'users.imgLink', 'messages.time', 'messages.content')
    .then((result) => {
      const newData = result.map(message => ({
        id: message.id,
        author: {
          name: message.name,
          imgLink: message.imgLink,
        },
        time: message.time,
        content: message.content,
      }));
      res.json(newData);
    })
    .catch(() => {
      res.send('404 Not Found');
    });
});

app.post('/api/addmessage', (req, res) => {
  const newMessage = JSON.parse(JSON.stringify(req.body));
  knex('messages').insert({
    id: newMessage.id,
    authorId: 1,
    time: newMessage.time,
    content: newMessage.content,
    replyToStory: newMessage.replyToStory,
  })
  .catch((err) => {
    console.log(err);
  });
});

app.post('/api/addStory', (req, res) => {
  const newStory = JSON.parse(JSON.stringify(req.body));
  const newStoryTags = newStory.tags.filter((item, index, inputArray) => (
    inputArray.indexOf(item) === index
  ));
  const tagIds = [];
  knex('tags').select('id').then((ids) => {
    const newTagId = Math.max(...ids.map(obj => obj.id));
    return newTagId;
  }).then((tagId) => {
    let newTagId = tagId;
    newStoryTags.forEach((tag) => {
      knex('tags').select('Id', 'name').where('name', tag).then((response) => {
        if (response.length === 0) {
          newTagId += 1;
          tagIds.push(newTagId);
          knex('tags').insert({
            Id: newTagId,
            name: tag,
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          tagIds.push(response[0].Id);
        }
        if (tagIds.length === newStoryTags.length) {
          knex('stories').insert({
            id: newStory.id,
            title: newStory.title,
            subtitle: newStory.subtitle,
            authorId: newStory.authorId,
            content: newStory.content,
            time: newStory.time,
            likeNum: 0,
            view: 0,
          }).then(() => {
            tagIds.forEach((tid, index) => {
              knex('storyTags').insert({
                storyId: newStory.id,
                tagId: tid,
              }).then(() => {
                if (index === tagIds.length - 1) {
                  res.send('success');
                }
              })
              .catch((err) => {
                console.log(err);
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
