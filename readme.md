This Repository contains frontend and backend of the app

### Features-
- Users can upload any file and the file is saved to google drive.
- Users can share the uploaded link with anyone.
- Users can download the file with the help of shared URl.
  
#### Setting up the frontend locally-
- Go inside frontend folder.
- install the depedencies using command npm install .
- run application locally using script npm run start.

#### Setting up Backend locally -
- Go inside backend folder.
- install the depedencies using command npm install.
- create .env file according to example file.
- create service account on google developer console. enable google drive api. get key file and rename it googleCredentails.json, paste it on backend folder.
- run application locally using script npm run start.

#### connecting backend and fronend locally-
To fetch the data from your backend server, change the apiURl variable in the app.js file with correspoding url where backend is running locally. app.js is located inside frontend folder.
