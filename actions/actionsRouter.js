const express = require("express");
const router = express.Router();
const ActionsDb = require("../data/helpers/actionModel");
const ProjectsDb = require("../data/helpers/projectModel");
const {
  validateActionId,
  validateAction,
  validateProjId,
} = require("../customMiddleware/mWare");

router.get("/", (req, res) => {
  ActionsDb.get()
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

router.get("/:id", (req, res) => {
  ActionsDb.get(req.params.id)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

router.post("/:id", validateAction, validateProjId, (req, res) => {
  const addAction = { ...req.body, project_id: req.params.id };
  ActionsDb.insert(addAction)
    .then((response) => {
      res.status(201).json(response);
      console.log(response, "res from insert/post action");
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  ActionsDb.remove(req.params.id)
    .then((reponse) => {
      res.status(201).json({ message: "action deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  ActionsDb.update(req.params.id, req.body)
    .then((response) => {
      res.status(201).json(response);
      console.log(response, "res from put/update action");
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
});

module.exports = router;
