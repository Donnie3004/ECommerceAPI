import server from './index.js';

server.listen(3000, (err)=>{
  if(err){
    console.error(err);
  }else{
    console.log(`Server started at PORT : 3000`);
  }
})