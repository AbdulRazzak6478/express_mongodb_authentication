
User Authentication 

SignUp
- User need to signup with `username`,` email` and `password`,
- 1.we are checking if user is already exist or not ,if exist through an error.
- 2.after that we are converting plain user password to encryptedHashPassword format to store in user database. For that we use bcryptjs library.
- 3.After that we are creating a new user with encryptedHashPassword.

Login
- 1.we are checking if the user exist or not ,if exist then only can login, else through an error.
- 2.getting user details from user register email and comparing and checking encryptedHashPassword and plain password are same or not  with bcryptjs library.
- 3.if password doesn't matches through error,
- 4.if matches then generating a jsonwebtoken for user verification on api accessing .

Users Details
- 1.passing a `jsonwebtoken token` as `auth-access-token` in headers to check the user is authenticated to access the routes.
- 2.protecting routes through auth middleware and token verification to access it.

