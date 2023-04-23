import cors from "cors";
import express from "express";
import router from "./src/routes/router.mjs";

const app = express();

const PORT = 7867;

app.use(cors());
app.use(express.json({extended: true}));
app.use(express.urlencoded({ extended: true}));
app.use('/public',express.static('public'));
app.use('/api',router);

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})