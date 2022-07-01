# Image-Gallery-V1

## Description
This application allows you to upload any image. Before anything you'll need an account which
you can also create in this application.

## Technologies
* Frontend: Html, [TailwindCSS](https://tailwindcss.com/), Javascript and [Axios](https://axios-http.com/)
* Backend: [Node.js](https://nodejs.org/), [Express](http://expressjs.com/), [Mongoose](http://mongoosejs.com/) and [Cloudinary](https://cloudinary.com/).

## How to install
You can install it by doing a git clone:
```shell
git clone
```

and run npm install:
```shell
npm install
```

You'll also need to create a `.env` file with the following variables:
* PORT
* MONGO_URI
* JWT_SECRET
* JWT_LIFETIME
* CLOUD_NAME
* CLOUD_API_KEY

## How to run
You can run it by simply running the following command:
```shell
npm start
```

But if you want to use nodemon, run the following command:
```shell
npm run dev
```
