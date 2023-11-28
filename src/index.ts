import { PrismaClient, Producer } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';

const client = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_ANON || "");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const prisma = new PrismaClient();
const port = parseInt(process.env.PORT || "", 10);
const app = express();
app.use(express.json());



app.post("/sign", async (req, res, next) => {
 const body = req.body;

 if(!body.email || !body.password || !body.name || !body.location) {
  return res.status(407).json({
   error: true,
   description: "email or password is not defined"
  })
 };

 try {
   const user = await prisma.producer.create({
    data: {
     email: body.email,
     password: body.password,
     location: body.location,
     name: body.name,
    }
   }).finally(async () => {
     await prisma.$disconnect();
   });
  
  
   const token = jwt.sign(user.id_producer, process.env.SECRET || "", {
    expiresIn: 60 * 20
   });
  
   res.status(200).json({
    token: token
   })

 } catch(err) {
  console.log(err);
  res.status(400).json({
    error: true,
    cause: err
  })
 }

});

app.post("/login", async (req, res) => {
 const body = req.body as Producer;
 
 console.log(body)
 if(!body.email || !body.password) {
  return res.status(407).json({
   error: true,
   description: "email or password is not defined"
  })
 };

 const user = await prisma.producer.findUnique({
  where: {
   email: body.email
  },
  select: {
    id_producer: true
  }
 });

 if(user) {
  const token = jwt.sign(user.id_producer, process.env.SECRET || "", (err, decode) => {
   if(err) {
    res.status(407).json({
     error: true,
     description: err.cause
    })
   } else {
    res.status(200).json({
     error: false,
     token: decode,
    })
   }
  });


 } else {
  return res.status(404).json({
   error: true,
   description: "user not found"
  });
 }






})

app.get("/images/:id", async (req, res) => {
  const param = req.params.id;
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, process.env.SECRET || "", async (err, decode) => {
      if(err) {
        return res.status(404).json({
          errorCode: "NOT0001",
          statusCode: 407,
          cause: "token it not valid"
        })
      };

      if(param) {
        let user = await prisma.producer.findUnique({
          where: {
            id_producer: param,
          },
          include: {
            images: true,
          }
        });
    
        if(user !== null) {
          res.status(200).json({
            userName: user.name,
            time: Date.now(),
            images: user.images
          })
        } else {
          res.status(404).json({
            errorCode: "UND0001",
            statusCode: 404,
            cause: "user not found"
          })
        }
      } else {
        return res.status(404).json({
          erroCode: "UND0001",
          statusCode: 404,
          cause: "params id is undefined",
        })
      }

    })
  } else {
    return res.status(407).json({
      errorCode: "NOT0001",
      statusCode: 407,
      cause: "token is undefined"
    })
  }
 

})

app.get("/images", async (req, res) => {
  const token = req.headers.authorization;
  
  if(token) {

    jwt.verify(token, process.env.SECRET || "", async (err, decode) => {
      if(err) {
       return res.status(407).json({
          statusError: "NOT0001",
          cause: err.message,
          description: "this token is invalid"
        });
      }
      const photos = await prisma.images.findMany();
      res.status(200).json({
        images: photos,
        size: photos.length,
        data: Date.now(),
      })

    });

  } else {
    res.status(400).json({
      statusError: "UND0001",
      cause: "token is not defined"
    })
  }

 
});

app.post("/", upload.single("photos"), (req, res, next) => {
 const file = req.file;
 const token = req.headers.authorization;
 
 if(file && token) {
   jwt.verify(token, process.env.SECRET || "", async (err, decode) => {
    if(err) {
      console.error(err);
      return res.status(407).json({
        error: true,
        cause: ""
      })
    } else {
      console.log(decode, "id")
      const { data, error } = await client.storage
      .from("photos")
      .upload(file.originalname, file.buffer, {
        contentType: file.mimetype
      });

      if(error) {
        console.error(error);
        return res.status(400).json({
          error: "Duplicate",
          statusCode: 409,
          message: error.message,  
        })
      } else {

      const url = client.storage
      .from("photos")
      .getPublicUrl(data.path);
    
      const image = await prisma.producer.update({
        where: {
          id_producer: decode?.toString(),
        },
        data: {
          images: {
            create: {
              url: url.data.publicUrl
            }
          }
        }
      })
        
     return res.status(200).json({
       error: false,
       auth: true,
       action: "upload photos by user id",
       image: {
        name: image.name,
        id: image.id_producer
       },
       token: token,  
      })
     }

    }
   });

   
 } else {
  return res.status(407).json({
   error: true,
   cause: "file or header autorization is undefined"
  })
 }
});


app.listen(port, () => {
 console.log("server running in http://localhost:" + port);
})