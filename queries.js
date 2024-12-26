const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tutorial',
    password: 'rudeus',
    port: 5432
});

const getStudents = (req, res) => {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount == 0)
            res.status(200).json(null);
        else
            res.status(200).json(results.rows);
    });
}

const createStudent = (req, res) => {
    let { firstname, lastname, origin } = req.body;
    pool.query('INSERT INTO students(firstname, lastname, origin) VALUES($1, $2, $3)', [firstname, lastname, origin], (error, results) => {
        if (error) {
            throw error;
        }
    });
    res.status(201).send('user created');
}

const updateStudent = (req, res) => {
    let id = parseInt(req.params.id);
    let { firstname, lastname, origin } = req.body;
    try {
        if (firstname) {
            pool.query('UPDATE students SET firstname = $1 WHERE id = $2', [firstname, id], (error, results) => {
                if (error) {
                    throw error;
                }
            });
        }
        if (lastname) {
            pool.query('UPDATE students SET lastname = $1 WHERE id = $2', [lastname, id], (error, results) => {
                if (error) {
                    throw error;
                }
            });
        }
        if (origin) {
            pool.query('UPDATE students SET origin = $1 WHERE id = $2', [origin, id], (error, results) => {
                if (error) {
                    throw error;
                }
            });
        }
        res.status(200).send("Student updated");
    } catch (error) {
        res.status(500);
    }
}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send("Student deleted");
    });
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}