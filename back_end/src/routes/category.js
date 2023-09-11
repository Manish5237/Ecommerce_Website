const express = require('express');
const { requireSignin, adminMiddleware } = require('../common_middleware');
const router = express.Router();
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controller/category');
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({ storage })


router.post('/category/create',requireSignin,adminMiddleware,upload.single('categoryImage'),addCategory);
router.post('/category/update',upload.array('categoryImage'),updateCategories);
router.post('/category/delete',deleteCategories);
router.get('/category/getcategory',getCategories);


module.exports = router;