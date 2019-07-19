const express = require('express');
const app =express();
const Joi = require('joi');

app.use(express.json());

const courses = [
    {id: 1, name: 'NodeJs'},
    {id: 2, name: 'Angular'},
    {id: 3, name: 'React'}
];
app.get('/', (req, res) => {
    res.send('Hello ExpressJs');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with sent id was not found');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The Course you are trying to update is no longer exist, try later...');
        return;
    }
    //const result = validator(req.body);
    const {error} = validator(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course trying to delete is not exist retry again later please...');
        return;
    }
    const index = courses.indexOf(course);
    courses.splice(index ,1);
    res.send(course);
});

function validator(c) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(c, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listining on port ${port}...`));