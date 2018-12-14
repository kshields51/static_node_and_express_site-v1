const express = require('express'); // variable that holds express instance

const app = express(); // returns express application

app.use('/static', express.static('public')); // links to the public folder where the css is stored
app.use('/static2', express.static('images')) // links to the folder where the images are saved
const data = require('./data.json') //links to the JSON file where the data is stored




app.set('view engine', 'pug') //tells the app to use pug. app.set can set other options in express too! By default express will look in a folder called views

app.get('/', (req, res) => { //creates a route route which is the path that the user takes to access data on the server. Also called an endpoint and is a command to run a certain function
    res.render('index', {data}); //render points to your pug file from the first parameter NOTE: you do not need a full filepath bc view engine is pug
    //data is a local in this route because it is the second parameter
});

app.get('/about', (req, res) => { //another route... the get method is used to handle requests to a certain url
    res.render('about')
});


app.get('/project/:id', (req, res) => { //a route that dynamically changes depending on the req.params.id which corresponds to the id in the JSON file. This makes each page show a different project
    res.render('project', {projectName: data.projects[req.params.id].project_name,
    description: data.projects[req.params.id].description, technologies: data.projects[req.params.id].technologies,
githubLink: data.projects[req.params.id].github_link, liveLink: data.projects[req.params.id].live_link, profileImage: data.projects[req.params.id].image_urls[1].profile});
});



app.use((req, res, next) => { //this throws a 404 error if a page that does not exist is accessed
    const err = new Error ('Sorry, there was an error'); //creates the error object
    err.status = 404; //sets the status
    next(err);
})


//view 4 will be pointing toward some kind of friendly error
app.use((err, req, res, next) => {
    res.locals.error = err; //creates the error object
    console.log('Sorry, there was an error') //prints an errror to the console
    res.render('error', err); // new route with the name error. second parameter is the error object
    


})




app.listen(3000, () => { //sets up the server with the parameter being the port number
    console.log('The app is listening to port 3000') //this logs out a message on the command line that tells user what port the app is listening on
})