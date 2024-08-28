import multer from 'multer';
import {storage} from './cloud.js';

const upload = multer({storage:storage});

const multerPost = upload.array("profileImage");

export {multerPost}