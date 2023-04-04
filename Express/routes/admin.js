const express = require("express")
const path = require("path")
const router = express.Router()

router.use("/blog/create", (req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin","blog-create.html"))
})
router.use("/blogs", (req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin","blog-list.html"))
})
router.use("/blog/blog-edit", (req,res)=>{
    res.sendFile(path.join(__dirname, "../views/admin","blog-edit.html"))
})

module.exports = router