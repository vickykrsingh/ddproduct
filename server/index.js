import { app } from "./api/index.js";
// Rest api
// app.use('*',function(req,res){
  // res.sendFile(path.join(__dirname,"*./client/build/index.html"));
// })

const PORT = process.env.PORT || 8080;
const Mode = process.env.MODE;

// Server listening
app.listen(PORT);
