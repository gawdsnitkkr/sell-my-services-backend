## sell-my-services

search and sell your services to nearby locations

### Folder Structure

1. **bin**: It contains the main file 'www' which starts node server
2. **config**: All the configurable parameters and credentials
3. **data**: json data
4. **logs**: logs dumps here
5. **middlewares**: All the middlewares defined here
6. **models**: Sequelize models (database schema)
7. **modules**: Independent modules used throughout the app are defined here
8. **public**: All the static resources (js, css, images)
9. **routes**: All the routes
10. **services**: These act as middlemen between routes and database. All the database operations is made here.
11. **views**: Contains HTML and .ejs files used for rendering to frontend


### Naming Conventions

1. using camelCase for naming variables, functions in javascript
2. using camelCase for naming MySql tables, CSS IDs
3. using hyp-hens for naming CSS classes
4. using camelCase for naming files and folders
5. using UPPERCASE for constants and global variables
6. using PascalCase for naming Javascript classes and database models


### Coding Conventions

1. Line length max 80 characters for Javascript
2. Line length max 120 characters for HTML
3. Standard JS coding conventions- https://www.w3schools.com/js/js_conventions.asp

### Logging

1. Save all post requests to requestLogs table
2. If error in routes files is object (caused by sequelize) then it must be logged
3. All the service controllers must be logged
4. Error logs must start with text 'Error' followed by function name and followed by error.