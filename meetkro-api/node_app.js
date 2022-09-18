/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const express = require('express');
const app = express();
const router = express.Router();
const http = require('http');
const path = require('path');
const { exec } = require('child_process');

// const morgan = require('morgan');
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: 'false' }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(morgan('dev'))
app.use('/admin', express.static(path.join(__dirname, '../admin/dist/admin')));
app.get(/\/admin\/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/dist/admin/index.html'));
});

// github push event api, restart keyword will restart the server
router.post('/githubPushEvent', async (req, res) => {
  // console.log(req.body.payload);
  // console.log('head',req.body.payload.head_commit);
  // if (req.body.payload.head_commit.message.includes("deploy")) {
    exec('sudo git pull', (err, stdout, stderr) => {
      if (err) {

        console.error(err);
      } else {
        console.log('executed & deployed');
        // let message = req.body?.payload?.head_commit?.message;
        // if (message.includes('restart')) {
        //   exec('pm2 restart 0', (err, stdout, stderr) => {
        //     if (err) {
        //       console.error(err);
        //     } else {
        //       if (stderr) {
        //         console.log("stderr:>", stderr);
        //       } else {
        //         console.log("stdout", stdout);
        //       }
        //     }
        //   })
        // }
      }
      res.status(200);
    })
  // }
})

app.use(router)





const httpServer = http.createServer(app);
httpServer.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('http server running on port ' + PORT);
  }
});
