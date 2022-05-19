const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./server/api');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  addToDatabase,
  deleteFromDatabasebyId,
  createMeeting,
  deleteAllFromDatabase,
} = require("./server/db");
const checkMillionDollarIdea = require('./server/checkMillionDollarIdea');

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html

// CORS
app.use(cors());

// Add middware for parsing request bodies here:

// Parsing
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
app.use('/api', apiRouter);

let minions = [];

minions = getAllFromDatabase("minions");

// Minions

apiRouter.get("/minions", (req, res, next) => {
  res.send(minions);
});

apiRouter.get("/minions/:minionId", (req, res, next) => {
  const foundMinion = getFromDatabaseById('minions', req.params.minionId);
  if (foundMinion) {
    res.status(200).send(foundMinion);
  } else {
    res.status(404).send()
  }
})

apiRouter.put("/minions/:minionId", (req, res, next) => {
  const foundMinion = getFromDatabaseById("minions", req.params.minionId);
  if (foundMinion) {
    const updatedMinion = updateInstanceInDatabase("minions", req.body);
    res.status(200).send(updatedMinion);
  } else {
    res.status(404).send();
  }
});

apiRouter.post('/minions', (req, res, next) => {
  const receivedMinion = addToDatabase("minions", req.body);
  if (receivedMinion) {
    res.status(201).send(receivedMinion);
  } else {
    res.status(404).send();
  }
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deletedMinion) {
    res.status(204).send("No Content");
  } else {
    res.status(404).send("Not Found");
  }
})

// Ideas

let ideas = [];

ideas = getAllFromDatabase("ideas");

apiRouter.get('/ideas', (req, res, next) => {
  res.send(ideas);
});

apiRouter.get("/ideas/:ideaId", (req, res, next) => { 
  const foundIdea = getFromDatabaseById("ideas", req.params.ideaId);

  if (foundIdea) {
    res.status(200).send(foundIdea);
  } else {
    res.status(404).send();
  }
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
   const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
  if (foundIdea) {
    const updatedIdea = updateInstanceInDatabase("ideas", req.body);
    res.status(200).send(updatedIdea);
  } else {
    res.status(404).send();
  }
})

apiRouter.post('/ideas', (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);
  if (newIdea) {
      checkMillionDollarIdea(req, res, next);
    res.status(201).send(newIdea);
  } else {
    res.status(404).send();
  }
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  const foundIdea = getFromDatabaseById("ideas", req.params.ideaId); 
  if (foundIdea) {
    deleteFromDatabasebyId("ideas", req.params.ideaId);
    res.status(204).send("No Content");
  } else {
    res.status(404).send();
  }
});


let meetings = [];

meetings = getAllFromDatabase("meetings");

apiRouter.get('/meetings',  (req, res, next) => {
    res.send(meetings)
});

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = createMeeting();
    if (newMeeting) {
      addToDatabase("meetings", newMeeting);
      res.status(201).send(newMeeting);
    } else {
      res.status(404).send();
    }
})

apiRouter.delete('/meetings', (req, res, next) => {
  if (meetings.length > 1) {
    meetings = deleteAllFromDatabase("meetings");
    res.status(204).send("No Content");
  }
});


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => { 

  })
}
