# **📖 StudyLink Application**

StudyLink is a platform designed to streamline the process for students to find and connect with study partners with ease. 
By fostering a collaborative and friendly learning environment (without the awkwardness), StudyLink makes it easier than ever for students to collaborate, discuss about school life, and excel academically together.

## Prerequisites

- Install Node and npm [here](https://nodejs.org/en/download/)
- Install `yarn` with the command `npm install -g yarn`
- Set up a [MongoDB Atlas](https://www.mongodb.com/) instance. See [this video](https://www.youtube.com/watch?v=CcOL5h_ZFJM) for help!
- Create a `.env` file with a variable called `DB_URL` and paste your MongoDB url:

```bash
DB_URL=mongodb://mongodburl.example.com:portnumber
```

## Running Locally

1. npm build
2. npm start
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

# Running Frontend Website (If JSON file method isn't working)
In one terminal, to run the backend:
```
cd backend
npm i
npm start
```

In another terminal, to run the frontend:
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
