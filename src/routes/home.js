const { Router } = require("express");
const router = Router();

router.get("/", function(req, res){
    res.sendFile("/home.html", { root: "public" });
});

module.exports = router;