const express = require("express");
const router = express.Router();
const ProjectsDb = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  ProjectsDb.get()
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({ message: "server error" });
    });
});

router.post("/", validateProject, (req, res) => {
  ProjectsDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
      console.log(response, "response from post of new proj");
    })
    .catch(error => {
      res.status(500).json({ message: "server error" });
    });
});

router.put("/:id", validateProjId, (req, res) => {
  const id = req.params.id;
  // const updatedProj = {
  //   name: req.body.name,
  //   description: req.body.description
  // };
  console.log(req.body, "req from put proj");

  ProjectsDb.update(id, req.body).then(response => {
    res.status(201).json(response);
    console.log(response, "response from put/update proj");
  });
});

router.delete("/:id", validateProjId, (req, res) => {
  ProjectsDb.remove(req.params.id)
    .then(response => {
      res.status(201).json({ message: "project deleted" });
    })
    .catch(error => {
      res.status(500).json({ message: "server error" });
    });
});

router.get("/projActions/:id", validateProjId, (req, res) => {
  ProjectsDb.getProjectActions(req.params.id)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({ message: "server error" });
    });
});

////////middleware below

function validateProject(req, res, next) {
  console.log(req.body, "req body from val proj");
  !req.body
    ? res.status(400).json({ message: "missing project input" })
    : !req.body.name
    ? res.status(400).json({ message: "missing project name" })
    : !req.body.description
    ? res.status(400).json({ message: "missing project description" })
    : next();
}

function validateProjId(req, res, next) {
  ProjectsDb.get(req.params.id)
    .then(response => {
      response
        ? next()
        : res.status(400).json({ message: "project not found" });
    })
    .catch(error => {
      res.status(500).json({ message: "server error" });
    });
}

module.exports = router;
