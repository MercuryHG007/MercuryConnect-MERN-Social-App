import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// IMPORTING ROUTES
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

// IMPORTING CONTROLLERS
import { register } from './controllers/auth.js'

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet);
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE SETUP
/* Use this to store files in the server*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
/* Use this to store files in the cloud */
const upload = multer({storage: storage});

// ROUTES WITH FILES
app.post('/auth/register', upload.single('profileImage'),(register)); //on the route of register, middleware function of upload image called before register(Controller)

// ROUTES
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

//  MONGOOSE SETUP
const port = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
})
.catch((error) => {
    console.log(error.message);
});
