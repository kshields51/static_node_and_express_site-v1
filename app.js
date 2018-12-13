const express = require('express'); // variable that holds express instance

const app = express(); // returns express application

app.use('/static', express.static('public'));
app.use(express.static('images'))
const data = require('./data.json')




app.set('view engine', 'pug') //tells the app to use pug. app.set can set other options in express too! By default express will look in a folder called views

app.get('/', (req, res) => { //creates a route route which is the path that the user takes to access data on the server. Also called an endpoint and is a command to run a certain function
    res.render('index', {data}); //render points to your pug file from the first parameter NOTE: you do not need a full filepath bc view engine is pug
    //data is a local in this route because it is the second parameter
});

app.get('/about', (req, res) => { //another route... the get method is used to handle requests to a certain url
    res.render('about')
});

app.get('/project/:id', (req, res) => {
    res.render('project', {projectName: data.projects[req.params.id].project_name,
    description: data.projects[req.params.id].description, technologies: data.projects[0].technologies,
githubLink: data.projects[req.params.id].github_link, liveLink: data.projects[req.params.id].live_link, profileImage: data.projects[req.params.id].image_urls[1].profile});
});






//view 4 will be pointing toward some kind of friendly error





app.listen(3000, () => { //sets up the server with the parameter being the port number
    console.log('The app is listening to port 3000') //this logs out a message on the command line that tells user what port the app is listening on
})