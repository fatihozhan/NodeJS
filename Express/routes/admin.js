const express = require("express")
const path = require("path")
const router = express.Router()

router.use("/blog/create", (req,res)=>{
/*     res.sendFile(path.join(__dirname, "../views/admin","blog-create.html")) */
res.render("admin/blog-create")
})
router.use("/blogs", (req,res)=>{
/*     res.sendFile(path.join(__dirname, "../views/admin","blog-list.html")) */
res.render("admin/blog-list")
})
router.use("/blog/blog-edit", (req,res)=>{
/*     res.sendFile(path.join(__dirname, "../views/admin","blog-edit.html"))
*/
res.render("admin/blog-edit")
})

module.exports = router