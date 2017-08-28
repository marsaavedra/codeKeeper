
Code Keeper


Code Keeper allows developers to store and organize snippets of code which can be easily accessed through a search bar based on titles, languages and description. 



PREREQUISITES
Before running this web application, you must install its dependents through the command line by typing:

npm install

The server must also be prompted. In the comman line type:

node server.js

Ensure your web server is starting with a dynamic port.
   * For an express app, the code for this would look like:
   ```js
   var port = process.env.PORT || 3000;
   ...
   app.listen(port, function() {
   ```
   * This allows you to get the port from the bound environment variable (using `process.env.PORT`) if it exists, so that when your app starts on heroku's machine it will start listening on the appropriate port.
   * You app will still run on port 3000 locally if you haven't set an environment variable.



DEPLOYMENT
Prereqs: for deployment, git and heroku CLI must be installed. Here is a link to get you started: https://devcenter.heroku.com/articles/git#prerequisites-installing-git-and-the-heroku-cli 

Here are Steps for Deployment into a live setting:

Commit all changes (if you haven't already with the above steps) using `git add .` and `git commit -am "<message>"`. If you haven't run into any errors at this point, you should be able to proceed to the next section. 


### Steps to Deploy

1. Log in to Heroku.

2. Run the command: `git remote –v` 

3. Run the command `heroku create`.
   

4. Run `git remote –v` again.
   * This isn't necessary, but helps to confirm that Heroku is now in your list of remotes. This time you should see the `heroku` remote.
   

5. Run the command `git push heroku master`. A series of processes will be initiated. Once the process is complete note the name of the app.

6. Log in to your Heroku account at www.heroku.com . You will see a list or a (single) app. Note the one that has the same funky name as you saw in bash. Click on it.

7. Click on settings. Then, scroll down until you see the part that says: "Domains". Note the URL listed under Heroku Domain.

8. Finally, go in your browser to the URL listed under the Heroku Domain. If all went well you should see your website!

BUILT WITH

mysql2
Passport
Express
BCrypt


AUTHORS
Andrew Dicer
Jhongert Fuentes
Jose Rivas
Maria Saavedra

