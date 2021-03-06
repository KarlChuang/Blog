const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const database_url = process.env.DATABASE_URL;

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: database_url.split('@')[1].split(':')[0],
    port: database_url.split('@')[1].split(':')[1].split('/')[0],
    user: database_url.split('//')[1].split(':')[0],
    password: database_url.split('//')[1].split(':')[1].split('@')[0],
    database: database_url.split(':')[3].split('/')[1],
    ssl: true,
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
app.get('/db', (request, response) => {
  knex('storytags')
    .where('storytags.storyid', 1)
    .rightJoin('tags', 'tags.id', 'storytags.tagid')
    .select('*')
    .then(tags => response.json(tags));
});

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

app.get('/api/storylist', (req, res) => {
  knex('stories').select('id', 'title', 'subtitle', 'time', 'likenum', 'view').then((result) => {
    const List = result;
    for (let i = 0; i < List.length; i += 1) {
      knex('storytags')
        .where('storytags.storyid', List[i].id)
        .rightJoin('tags', 'tags.id', 'storytags.tagid')
        .select('tags.name')
        .then((tags) => {
          List[i].tags = tags.map(tag => tag.name);
          knex('stories')
            .rightJoin('users', 'users.id', 'stories.authorid')
            .where('stories.id', List[i].id)
            .select('users.name', 'users.imglink')
            .then((author) => {
              List[i].author = {
                name: author[0].name,
                imgLink: author[0].imglink,
              };
              let returnOrNot = true;
              for (let j = 0; j < List.length; j += 1) {
                if (List[j].author === undefined) {
                  returnOrNot = false;
                }
              }
              if (returnOrNot) {
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
  knex.select('id', 'title', 'subtitle', 'time', 'likenum', 'view', 'content').from('stories').where('id', req.params.id).then((result) => {
    const story = result[0];
    knex('storytags')
      .where('storytags.storyid', story.id)
      .rightJoin('tags', 'tags.id', 'storytags.tagid')
      .select('tags.name')
      .then((tags) => {
        story.tags = tags.map(tag => tag.name);
        knex('stories')
          .rightJoin('users', 'users.id', 'stories.authorid')
          .where('stories.id', story.id)
          .select('users.name', 'users.imglink')
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
    .where('replytostory', req.params.id)
    .rightJoin('users', 'users.id', 'messages.authorid')
    .select('messages.id', 'users.name', 'users.imglink', 'messages.time', 'messages.content')
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
    authorid: 1,
    time: newMessage.time,
    content: newMessage.content,
    replytostory: newMessage.replyToStory,
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
      knex('tags').select('id', 'name').where('name', tag).then((response) => {
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
          tagIds.push(response[0].id);
        }
        if (tagIds.length === newStoryTags.length) {
          knex('stories').insert({
            id: newStory.id,
            title: newStory.title,
            subtitle: newStory.subtitle,
            authorid: newStory.authorId,
            content: newStory.content,
            time: newStory.time,
            likenum: 0,
            view: 0,
          }).then(() => {
            tagIds.forEach((tid, index) => {
              knex('storytags').insert({
                storyid: newStory.id,
                tagid: tid,
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
