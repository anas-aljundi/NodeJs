const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/courses', {useNewUrlParser: true}).then(() => console.log('connected successfully to the DB...'))
                                            .catch(err => console.log('something went wrong...', err));

const CourseSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength:4, maxlength:100},
    category: {type: String, required: true, enum: ['Programming', 'Desinger', 'Architect']},
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {return v.length > 0;},
            message: 'A course should have at least one tag.'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {type: Number, required: function() {return this.isPublished;}}
});

const Course = mongoose.model('Course', CourseSchema);

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        category: '-',
        author: 'Anas-Aljundi',
        tags: null,
        isPublished: true,
        price: 12
    });
    try {
        return await course.save();
    }
    catch(ex) {
        for (field in ex.errors)
           return ex.errors[field].message;
    }
    
}

async function run() {
    try{
        const res = await createCourse();
        console.log(res);
    }
    catch(ex) {
        console.log(ex);
    }
    
}

run();