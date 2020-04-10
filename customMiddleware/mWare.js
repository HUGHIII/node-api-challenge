const ProjectsDb = require("../data/helpers/projectModel");
const ActionsDb = require("../data/helpers/actionModel");
module.exports = {
  validateProject,
  validateProjId,
  validateActionId,
  validateAction,
};

function validateProject(req, res, next) {
  console.log(req.body, "reqbody from validateproj custom mware");
  !req.body
    ? res.status(400).json({ message: "missing project input" })
    : !req.body.name
    ? res.status(400).json({ message: "missing name input" })
    : !req.body.description
    ? res.status(400).json({ message: "missing project description" })
    : next();
}

function validateProjId(req, res, next) {
  ProjectsDb.get(req.params.id)
    .then((response) => {
      response
        ? next()
        : res.status(400).json({ message: "project not found" });
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
}
function validateActionId(req, res, next) {
  ActionsDb.get(req.params.id)
    .then((response) => {
      response ? next() : res.status(400).json({ message: "action not found" });
    })
    .catch((error) => {
      res.status(500).json({ message: "server error" });
    });
}
function validateAction(req, res, next) {
  console.log(req.body, "req body from val action");
  !req.body
    ? res.status(400).json({ message: "missing action input" })
    : !req.body.notes
    ? res.status(400).json({ message: "missing action notes" })
    : !req.body.description
    ? res.status(400).json({ message: "missing action description" })
    : next();
}
