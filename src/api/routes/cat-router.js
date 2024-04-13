import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';
import {body, param} from 'express-validator';
import {authenticateToken, createThumbnail, validationErrors} from '../../middlewares.js';
import multer from 'multer';

const catRouter = express.Router();

const storage = multer.diskStorage({
  destination:
      function(req, file, cb) {
        cb(null, 'uploads/');
      },
  filename:
      function(req, file, cb) {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const prefix = file.fieldname
        let extension = 'jpg'
        if (file.mimetype === 'image/png') {
          extension = 'png'
        } else if(file.mimetype === 'image/jpeg'){
          extension = 'jpeg'
        }
        const filename = `${prefix} - ${suffix}.${extension}`
        cb(null, filename);
      },
});

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  storage,
  fileFilter: (req, file, cb) => {
    // only allow images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

catRouter.route('/')
    .get(getCat)
    .post(authenticateToken,
    upload.single('file'),
    body("cat_name").trim().notEmpty(),
    validationErrors,
    createThumbnail,
    postCat);

catRouter.route('/:id')
    .get(validationErrors, getCatById)
    .put(authenticateToken,
    upload.single("file"),
    param("id").isNumeric().optional(),
    body("weight").trim().isNumeric().optional(),
    body("cat_name").trim().isLength({min: 3, max: 20}).optional(),
    body("owner").trim().isNumeric().optional(),
    validationErrors,
    putCat)
    .delete(authenticateToken, validationErrors, deleteCat);

export default catRouter;
