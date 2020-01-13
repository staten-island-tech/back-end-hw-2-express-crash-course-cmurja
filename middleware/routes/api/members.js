const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members.js");

//Get Members
router.get("/", (request, response) => response.json(members));

//Get Single Member
router.get("/:id", (request, response) => {
  const found = members.some(
    member => member.id === parseInt(request.params.id)
  );
  if (found) {
    response.json(
      members.filter(member => member.id === parseInt(request.params.id))
    );
  } else {
    response.status(400).json({
      message: `There is no member with the ID of ${request.params.id}`
    });
  }
});

//Create Member
router.post("/", (request, response) => {
  const newMember = {
    id: uuid.v4(),
    name: request.body.name,
    email: request.body.email,
    status: "active"
  };
  if (!newMember.name || !newMember.email) {
    return response
      .status(400)
      .json({ message: "Please include a name and email." });
  }

  members.push(newMember);
  response.json(members);
  // response.redirect("/");
});

//Update Member
router.put("/:id", (request, response) => {
  const found = members.some(
    member => member.id === parseInt(request.params.id)
  );
  if (found) {
    const updateMember = request.body;
    members.forEach(member => {
      if (member.id === parseInt(request.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        response.json({ message: "The member has been updated", member });
      }
    });
  } else {
    response.status(400).json({
      message: `There is no member with the ID of ${request.params.id}`
    });
  }
});

//Delete Member
router.delete("/:id", (request, response) => {
  const found = members.some(
    member => member.id === parseInt(request.params.id)
  );
  if (found) {
    response.json({
      message: "The member has been deleted.",
      members: members.filter(
        member => member.id !== parseInt(request.params.id)
      )
    });
  } else {
    response.status(400).json({
      message: `Ther is no member with the ID of ${request.params.id}`
    });
  }
});

module.exports = router;