# your-tech-news

![License](https://img.shields.io/badge/License-mit-blue.svg)

## Description

This project is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. This app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Structure

- `server.js` The primary application script
- `\db` Holds the required mysql scripts to create and set up the initial application database


## Installation
In your command line interface (cli), navigate to the application directory and run the following commands:
```md
> npm install

```

## Usage
Set up your database by running the following command in your DB directory
```md
> mysql -u root
> SOURCE schema.sql;
> EXIT
```

Move to root directory of your proejct and run the following commands to seed your database and start the application
```md
> npm run seed
> npm start
```

## Resources

https://www.npmjs.com/package/express

https://www.npmjs.com/package/inquirer

https://www.npmjs.com/package/mysql2

https://www.npmjs.com/package/sequelize

## Screenshot of application

![Screenshot 2023-03-06 at 8 16 41 pm](https://user-images.githubusercontent.com/28996399/223081956-ab92d293-f962-4960-8bd1-9cd55bec7c59.png)

## Link to deployed application
https://still-reaches-36473.herokuapp.com/
