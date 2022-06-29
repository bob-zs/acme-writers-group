const express = require('express');
const app = express();
const { db, User, Story } = require('./db');
const path = require('path');
const { USERS, STORIES } = require("./seed-data");

app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll({
      attributes: {
        exclude: ['bio']
      } 
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id', async(req, res, next)=> {
  try {
    res.send(await User.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id/stories', async(req, res, next)=> {
  try {
    const stories = await Story.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.send(stories);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/users', async(req, res, next) => {
  try {

    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      bio: faker.lorem.paragraph()
    }
  }
  catch(ex) {
    next(ex);
  }
});

app.delete('/api/users/:id', async(req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  }
  catch(ex) {
    next(ex);
  }
});

app.post('/api/users/:id/stories', async(req, res, next) => {
  try {
    return {
        userId: null,
      //
        title: faker.random.words(5),
        body: faker.lorem.paragraphs(5),
        favorite: faker.datatype.boolean(),
        userId: Math.ceil(Math.random() * 100)
    }
  }
  catch(ex) {
    next(ex);
  }
});

app.delete('/api/stories/:id', async(req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);
    await story.destroy();
    res.sendStatus(204);
  }
  catch(ex) {
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

const seed = async()=> {
  await db.sync({force: true})
  
  //Prepopulate User data
  await Promise.all(USERS.map( user => User.create(user)))
  await Promise.all(STORIES.map( story => Story.create(story)))
};

seed();
