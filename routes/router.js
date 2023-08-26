//Mise en place du serveur
const express = require('express');
const app = express();
const fs =require('fs');
const tasks = JSON.parse(fs.readFileSync('db.json')).tasks


// page d'accueil
app.get('/', (req, res) => {
    res.redirect('/tasks')
})

//page de tout les élément
app.get('/tasks', (req, res) => {
    let message = ''
    res.render('tasks', { tasks, message })
})

//page de créeation d'un élément
app.post('/tasks/create', (req, res) => {
    const newTask = { 
        id: Date.now(), 
        title: req.body.title,
        description: req.body.description,
        date:req.body.date,
        status: req.body.status,
    };
    tasks.push(newTask);
    fs.writeFileSync('db.json', JSON.stringify({ tasks }));
    // let message = 'La tâche a bien été ajoutée';
    res.redirect('/tasks');
});

//page de supprimer un élément
app.get('/tasks/delete/:id', (req, res) => {
    const newTasks = tasks.filter(task => task.id !== parseInt(req.params.id)); 
    fs.writeFileSync('db.json', JSON.stringify({ tasks: newTasks }));
    // let message = 'La tâche a bien été supprimée';
    res.redirect('/tasks');
});

//page pour un seul élément
app.get('/tasks/show/:id', (req, res) => {
    const task = tasks.find(t => parseInt(t.id) === parseInt(req.params.id)); 
//ajoute le template de show.ejs
    res.render('show',{task});
    console.log(task);
});

//Export du module router
module.exports = app;