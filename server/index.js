import app from "./api/index.js";


const PORT = process.env.PORT || 8080;
const Mode = process.env.MODE;

// Server listening
app.listen(PORT,(req,res)=>{
  console.log(`server is running on ${PORT}`)
});
