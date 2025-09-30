# To run 
    clone it
    npm install
    npm run dev
    
# About the project
+ This is an Express API built with Node.js. Its capabilities are meant to mimic a blog site’s features. 
+ You will be expected to use:
     + **MongoDB** -  to store the data.
     + **Cloudinary** -  to store images.
     + **JWT** - to handle authentication.


# About .env file
- You need you create a .env file and provide your variables

## About Cloudinary
``` 
API_KEY=<Your data>
API_SECRET=<Your data>
CLOUD_NAME=<Your data>
```

## About Secret Token
``` 
SECRET=<Your secret token>
```

## About mongo connection
``` 
DB_URI=<Your connection string from mongo>
```

# About the app 
+ The app mimic the capabilities of a blogsite/social media, including:

## User
+ Implemented user authentication and verification.
+ The user can follow/unfollow other users and add posts and reviews.
+ The user can update his/her own profile.
+ Also can perform basics user taks like login, logout, signup, create post and reviews, and delete its own account.
+ User password is encrypted.

## Post
+ The post will show a image, title and description.
+ It can be deleted, updated, comented, and liked/unliked

## Review
+ It can be created, updated, liked/unliked, and deleted
