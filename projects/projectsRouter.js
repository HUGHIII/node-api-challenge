const express = require("express");
const router = express.Router();
const ProjectsDb = require("../data/helpers/projectModel");
const {
  validateProject,
  validateProjId,
} = require("../customMiddleware/mWare");

router.get("/", (req, res) => {
  ProjectsDb.get()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

router.post("/", validateProject, (req, res) => {
  ProjectsDb.insert(req.body)
    .then((response) => {
      res.status(201).json(response);
      console.log(response, "response from post of new proj");
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

router.delete("/:id", validateProjId, (req, res) => {
  ProjectsDb.remove(req.params.id)
    .then((response) => {
      res.status(201).json({ message: "project deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

router.put("/:id", validateProjId, (req, res) => {
  const id = req.params.id;
  console.log(req, "req from put proj");

  ProjectsDb.update(id, req.body).then((response) => {
    res.status(201).json(response);
    console.log(response, "response from put/update proj");
  });
});

router.get("/projActions/:id", validateProjId, (req, res) => {
  ProjectsDb.getProjectActions(req.params.id)
    .then((response) => {
      console.log(
        response,
        "response from getprojectactions with params passed as arg"
      );
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

module.exports = router;
