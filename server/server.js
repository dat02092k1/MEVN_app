var express = require('express'); 
const xlsx = require('xlsx');
const Joi = require('joi');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cron = require('node-cron')

var server = express();
var postModel = require('./src/post/postModel'); 
var userModel = require('./src/user/userModel'); 
var notiModel = require('./src/noti/notiModel'); 
var requestModel = require('./src/request/requestModel');  

const sendEmail = require ('./utils/mail');
const cloudinary = require('cloudinary').v2
var routes = require('./routes/routes'); 
var info = require('./routes/info.js'); 
var chat = require('./routes/chat'); 
var password = require('./routes/password.js'); 
const nodemailer = require('nodemailer');

const multer = require('multer');

var bodyParser = require('body-parser');

/*
var io = require('socket.io')(5000, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

io.on('connection', (socket) => {
  // connect
  console.log('welcome');

  socket.on('my-event', (data) => {
    console.log(`event` + data);
  });

  // join room
  socket.on('join-room', (roomId) => {
    console.log(`User joined room ${roomId}`);
    socket.join(roomId);
  });

  console.log(io.sockets.adapter.rooms);

  // leaver room
  socket.on('leave-room', (roomId) => {
    console.log(`User left room ${roomId}`);
    socket.leave(roomId);
  });

  // send msg
  socket.on('send-message', (message) => {
    console.log(`Message received: ${message}`);
    io.emit('receive-message', message);
  });

  // receive msg
  socket.on('new-message', (message) => {
    console.log(`New message: ${message}`);
    io.emit('receive-message', message);
  });

  // send noti
  socket.on('send-noti', (notification) => {
    console.log(notification);
    const room = notification.room;
    socket.to(room).emit('receive-noti', notification.noti); 
     
  });
   
  // disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

});
*/
 

const transporter = nodemailer.createTransport({             
  service: 'gmail',
  auth: {
    user: 'dbconsultant9@gmail.com', 
    pass: 'jwjvujtsmtqleosm',
    // actual pass: 'dbconsultant912'
  },
});

//set up cronjobs 
cron.schedule('*/10 * * * *', async () => {
    const user = await userModel.findOne({ address: 'consultanplatform@gmail.com' });
    console.log('auto ' + user);   
    console.log('auto ' + user.address);       
    const response = await transporter.sendMail({
      from: 'dbconsultant9@gmail.com',
      to: user.address,
      subject: "Node cron",
      html: `<div>
      This is what cron job does    </div>
    `
     });

     console.log(response);   
});

cloudinary.config({
    cloud_name: "dpnjutbws",
    api_key: "838171156289576",
    api_secret: "Jp7EiCngYu9TChznwt0ZPfjNKUI"
  });

var mongoose = require('mongoose');
const cors = require('cors');  
const { urlencoded } = require('express');

// pass: Fk95NRiMgSZT33ev ngodat02092001
const uri = "mongodb+srv://ngodat02092001:Fk95NRiMgSZT33ev@mevn-app.hvbfkwy.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } , function checkDb(err) {
    if (err) {
        console.log('err')
    }
    else {
        console.log('db connected');
    }
} );

// Thiết lập Multer
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

const validateFieldsMiddleware = (req, res, next) => {
  const workbook = xlsx.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

   const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    role: Joi.string().required(),
    birthdate:  Joi.required(),
    start_date: Joi.required(),
    end_date: Joi.required(),
  });

  const validationErrors = [];

  for (const item of data) {
    item.birthdate = formatDateExcel(item.birthdate);
    item.start_date = formatDateExcel(item.start_date);
    item.end_date = formatDateExcel(item.end_date);
     const { error } = schema.validate(item);
     
    if (error) {
      validationErrors.push(`Row ${data.indexOf(item) + 2}: ${error.message}`);
    }
     
  }
   

  console.log(validationErrors);

  if (validationErrors.length > 0) {
    return res.status(400).json({
      message: 'Validation errors',
      errors: validationErrors
    });
  }

  req.data = data;
   next();
};
  
const formatDateExcel = (dateNumber) => {
  return new Date(1900, 0, dateNumber);
}
server.use(cors({
    origin: 'http://127.0.0.1:5173'
}));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(routes);
server.use(info);
server.use(password);
server.use(chat); 

server.post('/api/import', upload.single('file'), validateFieldsMiddleware, async (req, res) => {
  try {
    const data = req.data;
  console.log('api flag')
 
   // Kiểm tra xem email và tên người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
  //  const existingUsers = await Promise.all([
  //   userModel.find({ address: { $in: data.map(item => item.address) } }, { address: 1 }),
  //   userModel.find({ name: { $in: data.map(item => item.name) } }, { name: 1 })
  // ]);

  // const duplicateEmails = data.filter(item => existingUsers[0].some(user => user.address === item.address));
  // const duplicateNames = data.filter(item => existingUsers[1].some(user => user.name === item.name));

  // if (duplicateEmails.length > 0 || duplicateNames.length > 0) {
  //   const errors = {
  //     duplicateEmails,
  //     duplicateNames
  //   };
  //   res.status(400).json({ errors });
  //   return;
  // }

     
    // Thêm các user mới vào database
    const newUsers = await userModel.insertMany(data);
    res.send(newUsers);

  // Lưu dữ liệu vào MongoDB
  
  } catch (error) {
    console.log(error);
    res.status(500).send(error);

  }
} );

server.post('/api/upload-docs', upload.array('docs', 3), (req, res) => {
 
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).send({ message: 'No files uploaded' });
  }

  // Validate each file
  for (const file of files) {
    if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/msword' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.mimetype !== 'application/zip') {
      return res.status(400).send({ message: 'Invalid file type' });
    }
  }

  // Upload each file
  const uploadedFiles = [];

  for (const file of files) {
    const fileExtension = require('mime-types').extension(file.mimetype);

    console.log('File extension:', fileExtension);
    cloudinary.uploader.upload(file.path, {
      folder: 'File up-loads',
      resource_type: 'raw',
      format: fileExtension
    }, (error, result) => {
      if (error) {
        console.log('Error uploading document', error);
        res.status(500).send({ message: 'cant upload' });
      } else {
        console.log('Document uploaded successfully', result);
        uploadedFiles.push(result.secure_url)
         console.log(uploadedFiles);

         if (uploadedFiles.length === files.length) {
            // Create new post with uploaded photo URLs
            const post = new postModel({
              poster: req.body.poster,
              title: req.body.title,
              content: req.body.content,
              imageUrl: uploadedFiles,
            });

            post.save((err) => {
              if (err) {
                console.log(err);
                return res.status(500).send({ message: 'Failed to create post' });
              } else {
                console.log('post created successfully');
                return res.status(200).send({ message: 'Post created successfully' });
              }
            });  
        }
      }
    });
  }
})

server.post('/api/up/post', upload.array('docs', 3), (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).send({ message: 'No files uploaded' });
  }
})
server.post('/api/upload-doc', upload.single('doc'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/msword' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.mimetype !== 'application/zip') {
    return res.status(400).send({ message: 'Invalid file type' });
  }

  const fileExtension = require('mime-types').extension(file.mimetype);

  console.log('File:', file);
console.log('File path:', file.path);
console.log('File extension:', fileExtension);


  // console.log(fileExtension);
  cloudinary.uploader.upload(file.path, {
    folder: 'File up-loads',
    resource_type: 'raw',
    format: fileExtension
  }, (error, result) => {
    if (error) {
      console.log('Error uploading document', error);
      res.status(500).send({ message: 'cant upload' });
    } else {
      console.log('Document uploaded successfully', result);
      res.send({ url: result.secure_url });
    }
  });
});

server.post('/api/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
    const file = req.file;

    if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/msword' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.mimetype !== 'application/zip') {
      return res.status(400).send({ message: 'Invalid file type' });
    }
  
    const fileExtension = require('mime-types').extension(file.mimetype);

    cloudinary.uploader.upload(file.path, {
      folder: 'mevn_app'
    }, (error, result) => {
      if (error) {
        console.log('Error uploading image', error);
        res.status(500).send({ message: 'Error uploading image' });
      } else {
        console.log('Image uploaded successfully', result);
        res.send({ url: result.secure_url });
      }
    });
  });

server.post('/api/posts', upload.single('doc'), async (req, res) => {
  const file = req.file;
  console.log(file);  

  if (file.mimetype !== 'application/pdf' && file.mimetype !== 'application/msword' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.mimetype !== 'application/zip') {
    return res.status(400).send({ message: 'Invalid file type' });
  }

  const fileExtension = require('mime-types').extension(file.mimetype);

  cloudinary.uploader.upload(file.path, {
    folder: 'File up-loads',
    resource_type: 'raw',
    format: fileExtension
  }, async (error, result) => {              
    if (error) {
      console.log('Error uploading document', error);
      res.status(500).send({ message: 'cant upload' });
    } else {
      console.log('Document uploaded successfully', result);
      const imageUrl = result.secure_url;

      const post = new postModel({
        poster: req.body.poster,
        title: req.body.title,
        content: req.body.content,
        imageUrl: imageUrl
      });
      console.log(post);  

      const users = await userModel.find({ _id: { $ne: post.poster } });

      post.save(async (error, savedPost) => {
      if (error) {
        console.log('Error saving post', error);
        res.status(500).send({ message: 'Error saving post' });
      }
      else {
        console.log('Post saved successfully', savedPost);
        
        const notification = users.map((user) => ({
          userId: user._id,
          postId: post._id,
          message: `New post by ${post.poster}: ${post.title}`,
        }));
        
        await notiModel.insertMany(notification);
        

        res.status(201).json(post);
      }
    })
    }
  });
   
  });

server.get('/api/post/:id', (req, res) => { 
    const id = req.params.id;
  
    postModel.findById(id)
      .then(post => {
        if (!post) {
          console.log('error');
          res.status(404).send({ message: 'Post not found' });
        } else {
          res.send({
            message: "This post",
            post
          });
        }
      })
      .catch(error => {
        console.log('Error retrieving post', error);
        res.status(500).send({ message: 'Error retrieving post' });
      });
  });
  
server.get('/api/get-noti', async (req, res, next) => {
  try {
    const userId = req.query._id;

    const notifications = await notiModel.find({
      userId,
      isRead: false,
    }).populate('postId');

    res.json(notifications);
  } catch (err) {
    next(err);
  }
}) 

server.patch('/api/read-noti/:id', async (req, res, next) => {
  try {
    const notificationId = req.params.id;

    const notification = await notiModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    res.json(notification);
  } catch (err) {
    next(err);
  }
}) 

server.post('/user/up-img', (req, res) => {
    const data = {
        image: req.body.image,
    };

    cloudinary.uploader.upload(data.image)
    .then((result) => {
        res.status(200).send({
          message: "success",
          result,
        });
      }).catch((error) => {
        res.status(500).send({
          message: "failure",
          error,
        });
      });
})
// pagination 5 pages one time
// server.get('/api/posts-pagination', async (req, res) => {
   
//   let { page, limit } = req.query;
//   if (!page) page = 1;
//   if (!limit) limit = 5;

//   // validate page and limit values
//   if (isNaN(page) || isNaN(limit)) {
//     return res.status(400).json({ message: 'Invalid page or limit value' });
//   }
//   console.log(page, limit);
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

   

//   const [posts, totalCount] = await Promise.all([
//     postModel
//       .find()
//       .sort({ createdAt: -1 })
//       .skip(startIndex)
//       .limit(limit)
//       .lean()
//       .exec(),
//     postModel.countDocuments().exec()
//   ]);

//   const results = {
//     posts,
//     totalCount,
//     totalPages: Math.ceil(totalCount / limit)
//   };

//   if (startIndex > 0) {
//     results.previous = { page: page - 1, limit };
//   }

//   if (endIndex < totalCount) {
//     results.next = { page: page + 1, limit };
//   }

//   res.status(200).json(results);
// });

server.get('/api/posts-pagination', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;

  const totalPosts = await postModel.countDocuments();
  const totalPages = Math.ceil(totalPosts / perPage);

  const posts = await postModel.find()
    .skip((page - 1) * perPage)
    .sort({ createdAt: -1 })
    .limit(perPage);

  res.json({
    currentPage: page,
    totalPages: totalPages,
    posts: posts
  });
})

server.post('/api/post/request', async (req, res) => {

  const request = new requestModel({
    studentId: req.body.studentId,
    content: req.body.content,
    title: req.body.title,
    username: req.body.username, 
  });

  await request.save();
  res.json(request);
})

server.post('/api/send-email', async (req, res) => {
  const { address } = req.body;

  try {
    // Get the user's email address from the user model
    const user = await userModel.findOne({ address: address });
    if (!user) return res.status(404).send('User not found.');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const to = user.address;
  
    const subject = "Password Reset Request";  
     const url = `http://127.0.0.1:5173/passwordReset/${user._id}`;

     console.log(token);
    await user.save();  
     // Send the email
     await transporter.sendMail({
      from: 'dbconsultant9@gmail.com',
      to,
      subject,
      text: url,
      html: `<div>
     your token: ${token}
    <br>
    <a href="http://127.0.0.1:5173/passwordReset/${user._id}">reset link</a>
    </div>
    `
     });


    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error sending email' });
  }
});

server.post('/reset', async (req, res) => {
  const { token, password } = req.body;
  console.log('flag pw'); 
  console.log(req.body);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    console.log((token));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = password; 
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

server.post('/api/test-email', async (req, res) => {
  try {
    const {
      mail
    } = req.body; 
    console.log(mail);
  
    const msg = await sendEmail({
        //the client email 
        to: mail,
        //sendGrid sender id 
        from: 'dbconsultant9@gmail.com',
        subject: 'Does this work?',
        text: 'Glad you are here .. yes you!',
        html:'<strong>It is working!!</strong>'
    }); 
    
    res.status(200).json({ message: msg });                  
} catch (e) {
    console.log(e);
    res.sendStatus(500);
}
});
function generatePassword() {
  let length = 10;
  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

server.listen(2000, function check(err) {
    if (err) console.log('err');
    else console.log('started');
});   
module.exports= {cloudinary};