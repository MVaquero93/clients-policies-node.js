### A simple API with JWT Authentication, Authorization and a mocky as a database, made with Node.js

"npm install" and Enjoy.

You will need Postman for testing.

#### Postman instructions:

At first, you need to authenticate doing a POST to "localhost:4000/users/authenticate". At body take 'x-www-form-urlencoded' option and in KEY put 'name' and 'name_of_user' as a VALUE.

It will respond with user data and token. Copy the token and go to 'Authorization' option TYPE: Bearer Token, paste the token in the input and press Preview Request. Now you can test getting data with next routes:

- localhost:4000/users/list/:name
- localhost:4000/users/:id
- localhost:4000/users/name/:name
- localhost:4000/users/get-user-policie/:id

For more Postman tips visit https://learning.getpostman.com/docs/postman/sending_api_requests/requests/


