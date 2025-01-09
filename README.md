# 📖 Study Buddy Application

Template for building projects with the MERN (MongoDB, Express, React, Node.js) stack.
This template was generated using `create-next-app` and `express-generator` for the
client and server, respectively.

## Prerequisites

- Install Node and npm [here](https://nodejs.org/en/download/)
- Install `yarn` with the command `npm install -g yarn`
- Set up a [MongoDB Atlas](https://www.mongodb.com/) instance. See [this video](https://www.youtube.com/watch?v=CcOL5h_ZFJM) for help!
- Create a `.env` file with a variable called `DB_URL` and paste your MongoDB url:

```bash
DB_URL=mongodb://mongodburl.example.com:portnumber
```

## Running

1. `cd` into `client` and run the command `yarn install` to install all dependencies
2. To start the client, run `yarn dev` in the same directory
3. In another command window, `cd` into `server` and run `yarn install` and `npm start`
   to install all dependencies and start the server.
4. To kill a port, use 'npx kill-port <PORT_NUMBER>'
5. For Linux/Mac use 'sudo lsof' to see what ports are active.
6. For Windows, use 'netstat -a -b'
7. If you want to change the port for server, head to the server/bins/www. 
   Look for the line ```var port = normalizePort(process.env.PORT || '3001');```
    Change it to any port you like!
8. Happy hacking!
hi!!!!!!!!

# Pushing to the ACM Repository:
```
git checkout branch-name (switch to branch) / git checkout -b branch-name (if branch non-existent)
git pull origin main (to get the latest files from main)
git add . (adds all the files/folders)
git status (to check your staged files/folders)
git commit -m "message"
git push
```

# Running Frontend Website
In one terminal:
```
cd backend
npm i
npm start
```

In another terminal:
```
cd ../frontend
npm i
npm run dev
```

NOTE: Make sure you have the following in an .env file:
```
MONGO_URI=mongodb+srv://<db_username>:<db_password>@studybuddy.nor8x.mongodb.net/posts?retryWrites=true&w=majority&appName=Studybuddy
PORT=<port_number>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```
