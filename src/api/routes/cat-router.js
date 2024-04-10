import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import multer from 'multer';
import {createThumbnail} from '../../middlewares.js';

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

const upload = multer({destination: 'uploads/', storage});

catRouter.route('/')
  .get(getCat)
  .post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;
