import express from 'express'; 
const server = express(); 
server.use(express.json()); 

declare global {
  namespace Express {
    export interface Request {
      validatedBody: any;
    }
  }
}

export default server