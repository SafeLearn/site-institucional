const { Router } = require("express");
const router = Router();

router.get("/", function(req, res){
    res.sendFile("landing-page/home.html", { root: "public" });
});

module.exports = router;