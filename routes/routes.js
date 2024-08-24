const express = require("express");
const router = express.Router();
const { verifyAccount, users_list, user_detail, delete_user, update_user_detail } = require('../controller/users');
const { primarylistItems, creatPrimary, deletePrimary, editPrimary } = require('../controller/primary');
const { register, login, sendConde, verifyCode, generatePassword, resetPassword, resendConde } = require("../controller/authentication");
const { createblog, bloglist, blogdetail, updateblog, deleteblog, usersblog } = require("../controller/blog");
const { createCategory, categorylist, deleteCategory } = require("../controller/categories");
const { makecamments, userCommentList, deleteComments } = require("../controller/comment");
const { likeunlike, likelist, userlikes } = require("../controller/likes");


//TODO: Authentication API routing
router.post('/register', register)
router.post('/login', login) 
router.post('/send_code', sendConde)
router.post('/resendCode', resendConde)
router.post('/verify_code', verifyCode)
router.post('/generate_password', generatePassword)
router.post('/reset_password', resetPassword)


//TODO: Users API routing
router.get('/userlist', users_list)
router.get('/user_detail/:id', user_detail)
router.delete('/delete_user/:id', delete_user)
router.post('/verify_account/:id', verifyAccount)
router.put('/update_users', update_user_detail)


//TODO: Primary API routings
router.post('/create_primary', creatPrimary)
router.get('/primary_list', primarylistItems)
router.delete('/delete/:id', deletePrimary)
router.put('/update_primary', editPrimary)


//TODO: Blogs API routing
router.post('/createblog', createblog)
router.get('/bloglist', bloglist)
router.get('/usersblog/:userId', usersblog)
router.get('/blogdetail/:id', blogdetail)
router.put('/updateblog', updateblog)
router.delete('/deleteblog/:id', deleteblog)


//TODO: Category API routing
router.post('/createCategory', createCategory)
router.get('/categorylist', categorylist)
router.delete('/deletecategory/:id', deleteCategory)


//TODO: Comments API routing
router.post('/comment', makecamments)
router.get('/commentlist/:userId', userCommentList)
router.delete('/deletecomment/:id', deleteComments)


//TODO: Like blog & unlike routing
router.post('/like_unlike', likeunlike)
router.get('/likelist', likelist)
router.get('/userlikes/:userId', userlikes)


module.exports = router;
