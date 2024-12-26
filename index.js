const express = require('express');
const db = require('./queries');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    res.json({
        info: 'hello'
    });
});
app.get('/students', db.getStudents);
app.get('/students/:id', db.getStudentById);
app.put('/students/:id', db.updateStudent);
app.post('/students', db.createStudent);
app.delete('/students/:id', db.deleteStudent);

app.listen(port, () => {
    console.log(`server running at ${port}`);
})