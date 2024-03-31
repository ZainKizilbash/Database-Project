const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();
const session = require('express-session');
const port = 3000;
app.use(session({
    secret: 'quizlet', 
    resave: false,
    saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: true })); 
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "zain",
    database: "postgres"
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL', err);
    });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/studentsignup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'studentsignup.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/instructorsignup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'instructorsignup.html'));
});

app.get('/studentdashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'studentdashboard.html'));
});

app.get('/instructordashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'instructordashboard.html'));
});

app.get('/addcourse.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'addcourse.html'));
});

app.get('/cs.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cs.html'));
});

app.get('/maths.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'maths.html'));
});

app.get('/othercourse.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'othercourse.html'));
});

app.get('/settings.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'settings.html'));
});

app.get('/changepersonal.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'changepersonal.html'));
});

app.get('/deleteaccount.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'deleteaccount.html'));
});

app.get('/confirmdelete.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/confirmdelete.html'));
});

app.get('/accountdeleted.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/accountdeleted.html'));
});

app.get('/accountnotdeleted.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/accountnotdeleted.html'));
});

app.get('/editcourse.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/editcourse.html'));
});

app.get('/changename.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/changename.html'));
});

app.get('/changeemail.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/changeemail.html'));
});

app.get('/changepassword.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/changepassword.html'));
});

app.get('/addquestions.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/addquestions.html'));
});

app.get('/editquestion.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/editquestion.html'));
});

app.get('/showscore', (req, res) => {
    res.render('showscore');
});

var studentinfo;
var instructorinfo;
var courseinfo;
var course;

const createTables = async () => {
    try {
        const querycreatestudenttable = `
            CREATE TABLE IF NOT EXISTS STUDENTS(
                STUDENT_ID VARCHAR(500) PRIMARY KEY,
                Fname varchar(500) NOT NULL,
                Lname varchar(500) NOT NULL,
                EMAIL varchar(500) NOT NULL UNIQUE,
                INSTITUTE varchar(500) NOT NULL,
                AGE int NOT NULL,
                PASSWORD VARCHAR(500) NOT NULL
            );
        `;

        const querycreateinstructortable = `
            CREATE TABLE IF NOT EXISTS INSTRUCTORS(
                INSTRUCTOR_ID VARCHAR(500) PRIMARY KEY,
                Fname varchar(500) NOT NULL,
                Lname varchar(500) NOT NULL,
                EMAIL varchar(500) NOT NULL UNIQUE,
                QUALIFICATION VARCHAR(500) NOT NULL,
                AGE INT,
                PASSWORD VARCHAR(500) NOT NULL
            );
        `;

        const querycreatecoursetable = `
            CREATE TABLE IF NOT EXISTS COURSES(
                COURSE_ID VARCHAR(500) PRIMARY KEY,
                COURSE_NAME VARCHAR(500) UNIQUE,
                RATING FLOAT DEFAULT NULL,
                INSTRUCTOR_ID VARCHAR(500) NOT NULL,
                FOREIGN KEY (INSTRUCTOR_ID) REFERENCES INSTRUCTORS(INSTRUCTOR_ID) ON UPDATE CASCADE ON DELETE CASCADE

            );
        `;



        const querycreatequestiontable = `
            CREATE TABLE IF NOT EXISTS QUESTIONS(
                QUESTION_ID VARCHAR(500) PRIMARY KEY,
                COURSE_ID VARCHAR(500),
                QUESTION VARCHAR(500) NOT NULL,
                FOREIGN KEY (COURSE_ID) REFERENCES COURSES(COURSE_ID) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `;

        const querycreateanswertable = `
            CREATE TABLE IF NOT EXISTS ANSWERS(
                QUESTION_ID VARCHAR(500),
                OPTION1 VARCHAR(500) NOT NULL,
                OPTION2 VARCHAR(500) NOT NULL,
                OPTION3 VARCHAR(500) NOT NULL,
                OPTION4 VARCHAR(500) NOT NULL,
                IS_CORRECT VARCHAR(500) NOT NULL,
                FOREIGN KEY (QUESTION_ID) REFERENCES QUESTIONS(QUESTION_ID) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `;

        const querycreatescorecardtable = `
            CREATE TABLE IF NOT EXISTS SCORECARD(
                STUDENT_ID VARCHAR(500),
                COURSE_ID VARCHAR(500),
                POINTS INT DEFAULT NULL,
                FOREIGN KEY (STUDENT_ID) REFERENCES STUDENTS(STUDENT_ID) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (COURSE_ID) REFERENCES COURSES(COURSE_ID) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `;

        const querycreatestudenthistorytable = `
            CREATE TABLE IF NOT EXISTS STUDENTHISTORY(
                STUDENT_ID VARCHAR(500),
                COURSE_ID VARCHAR(500),
                POINTS INT DEFAULT NULL,
                FOREIGN KEY (STUDENT_ID) REFERENCES STUDENTS(STUDENT_ID) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (COURSE_ID) REFERENCES COURSES(COURSE_ID) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `;



        // Execute the table creation queries
        await client.query(querycreatestudenttable);
        await client.query(querycreateinstructortable);
        await client.query(querycreatecoursetable);
        await client.query(querycreatequestiontable);
        await client.query(querycreateanswertable);
        await client.query(querycreatescorecardtable);
        await client.query(querycreatestudenthistorytable);
        //await client.query(queryinsertcoursetable);
        //await client.query(queryinsertquestiontable);
        //await client.query(insertanswerstable);
        console.log('Tables created successfully');

    } catch (error) {
        console.error('Error creating tables', error);
    }
};

createTables();

app.post('/register-student', (req, res) => {
    const { studentID, firstName, lastName, email, institute, age, password } = req.body;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@nu\.edu\.pk$/;

    if (!emailPattern.test(email)) {
        return res.status(400).send('Invalid email format. Please use a valid nu.edu.pk email.');
    }

    const queryinsertstudent = 'INSERT INTO students (STUDENT_ID, Fname, Lname, email, institute, age, password) VALUES ($1, $2, $3, $4, $5, $6, $7)';


    client.query(queryinsertstudent, [studentID, firstName, lastName, email, institute, age, password])
        .then(() => {
            console.log('Data inserted successfully');
            res.send('Data inserted successfully');
        })
        .catch(err => {
            console.error('Error executing query', err);
            res.status(500).send('Error inserting data');
        });
});

app.post('/register-instructor', (req, res) => {
    const { instructorID, firstName, lastName, email, qualification, age, password } = req.body;


    const queryinsertinstructor = 'INSERT INTO INSTRUCTORS (INSTRUCTOR_ID, Fname, Lname, email, qualification, age, password) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    client.query(queryinsertinstructor, [instructorID, firstName, lastName, email, qualification, age, password])
        .then(() => {
            console.log('Data inserted successfully');
            res.send('Data inserted successfully');
        })
        .catch(err => {
            console.error('Error executing query', err);
            res.status(500).send('Error inserting data');
        });
});



app.post('/login.html', async (req, res) => {
    const { email, password } = req.body;

    try {
        const studentResult = await client.query(
            'SELECT * FROM students WHERE email = $1 AND password = $2',
            [email, password]
        );

        const instructorResult = await client.query(
            'SELECT * FROM instructors WHERE email = $1 AND password = $2',
            [email, password]
        );

        // If a student is found, redirect to the student dashboard
        if (studentResult.rows.length > 0) {
            studentinfo = studentResult.rows[0];
            instructorinfo = studentResult.rows[0];
            const student = studentResult.rows[0];
            req.session.user = student;
            res.redirect(`/studentdashboard.html?fname=${student.fname}&lname=${student.lname}`);
        }
        // If an instructor is found, redirect to the instructor dashboard
        else if (instructorResult.rows.length > 0) {
            instructorinfo = instructorResult.rows[0];
            studentinfo = instructorResult.rows[0];
            const instructor = instructorResult.rows[0];
            req.session.user = instructor;
            res.redirect(`/instructordashboard.html?fname=${instructor.fname}&lname=${instructor.lname}`);
        } else {
            //res.send('No such account. Please check your email and password.');
            alert('No such account. Please check your email and password.');
        }
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/delete-account', async (req, res) => {
    try {
        const { password } = req.body;

        const studentResult = await client.query('SELECT PASSWORD FROM STUDENTS WHERE EMAIL=$1', [studentinfo.email]);
        const instructorResult = await client.query('SELECT PASSWORD FROM INSTRUCTORS WHERE EMAIL=$1', [instructorinfo.email]);
        let userType = ''; 
        let user;
        if (studentResult.rows.length > 0) {
            // User is a student
            userType = 'student';
            user = studentinfo;
        } else if (instructorResult.rows.length > 0) {
            // User is an instructor
            userType = 'instructor';
            user = instructorinfo;
        } else {
            // If the email doesn't exist in either table, it's an invalid account
            res.status(400).send('Invalid account');
            return;
        }
        console.log(user.fname, user.lname);
        if (user.password == password) {
            res.redirect(`/confirmdelete.html?type=${userType}`);

            app.post('/confirm-delete', async (req, res) => {
                try {
                    const { confirmDeletion } = req.body;

                    if (confirmDeletion === 'true') {
                        if (userType == 'instructor') {
                            const deleteQuery = await client.query(`DELETE FROM INSTRUCTORS WHERE EMAIL=$1`, [user.email]);
                            console.log('Account deleted successfully');
                            res.redirect(`/accountdeleted.html?confirmDeletion=${confirmDeletion}&fname=${user.fname}&lname=${user.lname}`);
                        }
                        else {
                            const deleteQuery = await client.query(`DELETE FROM STUDENTS WHERE EMAIL=$1`, [user.email]);
                            console.log('Account deleted successfully');
                            res.redirect(`/accountdeleted.html?confirmDeletion=${confirmDeletion}&fname=${user.fname}&lname=${user.lname}`);
                        }
                    }

                    else {
                        if (userType == 'student') {
                            res.redirect(`/studentdashboard.html?fname=${user.fname}&lname=${user.lname}`);
                        }
                        else {
                            res.redirect(`/instructordashboard.html?fname=${user.fname}&lname=${user.lname}`);
                        }

                    }
                } catch (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                }
            });

        } else {
            res.status(400).send('Invalid password');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


console.log(`Server running on port ${port}`);
app.post('/courseForm', async (req, res) => {
    const { courseId, courseName } = req.body;
    course = courseId;
    try {
        // Check if courseId or courseName already exist in the table
        const results = await client.query('SELECT * FROM courses WHERE course_id = $1 OR course_name = $2', [courseId, courseName]);

        if (results.rows.length > 0) {
            // courseId or courseName already exist
            res.status(400).send('CourseId or CourseName already exists');
        } else {
            // courseId and courseName do not exist, insert them into the table
            const insertQuery = await client.query('INSERT INTO courses (course_id, course_name, instructor_id) VALUES ($1, $2, $3)', [courseId, courseName, instructorinfo.instructor_id]);
            // res.status(200).send('Data inserted successfully');
            res.redirect(`/addquestions.html`);
        }
    } catch (error) {
        console.error('Database query error: ', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/mathcourseForm', async (req, res) => {
    const { courseId, courseName } = req.body;
    course = courseId;
    try {
        // Check if courseId or courseName already exist in the table
        const results = await client.query('SELECT * FROM courses WHERE course_id = $1 OR course_name = $2', [courseId, courseName]);

        if (results.rows.length > 0) {
            // courseId or courseName already exist
            res.status(400).send('CourseId or CourseName already exists');
        } else {
            // courseId and courseName do not exist, insert them into the table
            const insertQuery = await client.query('INSERT INTO courses (course_id, course_name, instructor_id) VALUES ($1, $2, $3)', [courseId, courseName, instructorinfo.instructor_id]);
            //res.status(200).send('Data inserted successfully');
            res.redirect(`/addquestions.html`);
        }
    } catch (error) {
        console.error('Database query error: ', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/othercourseForm', async (req, res) => {
    const { courseId, courseName } = req.body;
    course = courseId;
    try {
        // Check if courseId or courseName already exist in the table
        const results = await client.query('SELECT * FROM courses WHERE course_id = $1 OR course_name = $2', [courseId, courseName]);

        if (results.rows.length > 0) {
            // courseId or courseName already exist
            res.status(400).send('CourseId or CourseName already exists');
        } else {
            // courseId and courseName do not exist, insert them into the table
            const insertQuery = await client.query('INSERT INTO courses (course_id, course_name, instructor_id) VALUES ($1, $2, $3)', [courseId, courseName, instructorinfo.instructor_id]);
            // res.status(200).send('Data inserted successfully');
            res.redirect(`/addquestions.html`);
        }
    } catch (error) {
        console.error('Database query error: ', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/addquestionform', async (req, res) => {
    try {
        const questionData = [];
        const answerData = [];

        for (let i = 1; i <= 10; i++) {
            const q_id = req.body[`q${i}_id`];
            const question = req.body[`question${i}`];
            const q_opt1 = req.body[`q${i}_option1`];
            const q_opt2 = req.body[`q${i}_option2`];
            const q_opt3 = req.body[`q${i}_option3`];
            const q_opt4 = req.body[`q${i}_option4`];
            const q_correct = req.body[`q${i}_correct`];

            questionData.push([q_id, course, question]);

            answerData.push([q_id, q_opt1, q_opt2, q_opt3, q_opt4, q_correct]);
        }

        for (let i = 0; i < 10; i++) {
            const questionQuery = `INSERT INTO questions (question_id, course_id, question) VALUES ($1, $2, $3)`;
            const questionValues = [questionData[i][0], course, questionData[i][2]];
            console.log(questionValues);
            await client.query(questionQuery, questionValues);
        }

        for (let i = 0; i < 10; i++) {
            const answersValues = [
                answerData[i][0],
                answerData[i][1],
                answerData[i][2],
                answerData[i][3],
                answerData[i][4],
                answerData[i][5]
            ];
            const answersQuery = `INSERT INTO answers (question_id, option1, option2, option3, option4, is_correct) VALUES ($1, $2, $3, $4, $5, $6)`;

            console.log(answersValues);
            await client.query(answersQuery, answersValues);
        }

        res.send('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.get('/selectcourse.html', async (req, res) => {
    try {
        const studentId = studentinfo.student_id;
        const result = await client.query(`
            SELECT
                c.*,
                i.Fname AS instructor_fname,
                i.Lname AS instructor_lname,
                sh.points,
                CASE
                    WHEN sh.points IS NULL THEN 'Attempt'
                    WHEN sh.points < 8 THEN 'For Improvement'
                    ELSE NULL
                END AS action
            FROM
                COURSES c
            LEFT JOIN
                STUDENTHISTORY sh ON c.COURSE_ID = sh.COURSE_ID AND sh.STUDENT_ID = $1
            LEFT JOIN
                INSTRUCTORS i ON c.INSTRUCTOR_ID = i.INSTRUCTOR_ID;
        `, [studentId]);

        // Extract course data from the result
        const courses = result.rows;
        // Send the HTML file as the response, passing the courses data
        res.render('selectcourse', { courses });
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/questions/:courseId', async (req, res) => {
    try {
        await client.query('BEGIN'); // Start the transaction

        const courseId = req.params.courseId;

        // Fetch questions and corresponding options from the database based on courseId
        const result = await client.query(`
            SELECT q.*, a.option1, a.option2, a.option3, a.option4, a.is_correct
            FROM questions q
            INNER JOIN answers a ON q.question_id = a.question_id
            WHERE q.course_id = $1;
        `, [courseId]);

        const q = await client.query(`SELECT * FROM COURSES WHERE course_id=$1`, [courseId]);
        courseinfo = q.rows[0];

        const questionsMap = new Map();
        result.rows.forEach(row => {
            if (!questionsMap.has(row.question_id)) {
                questionsMap.set(row.question_id, {
                    question_id: row.question_id,
                    question: row.question,
                    options: [
                        { option_id: 1, option_text: row.option1 },
                        { option_id: 2, option_text: row.option2 },
                        { option_id: 3, option_text: row.option3 },
                        { option_id: 4, option_text: row.option4 },
                    ],
                    correct_option: row.is_correct,
                });
            }
        });

        let questions = Array.from(questionsMap.values());

        // Shuffle questions order
        questions = shuffleArray(questions);

        // Shuffle options order for each question
        questions.forEach(question => {
            question.options = shuffleArray(question.options);
        });

        await client.query('COMMIT'); 
        res.render('questions', { courseId, questions });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


app.post('/submit', async (req, res) => {


    try {
        await client.query('BEGIN'); // Start the transaction

        const userAnswers = req.body; 
        const score = await calculateScore(userAnswers); 
        const checkExistingRecordQuery = `
            SELECT * FROM STUDENTHISTORY WHERE STUDENT_ID=$1 AND COURSE_ID=$2
        `;

        const insertHistoryQuery = `
            INSERT INTO STUDENTHISTORY (STUDENT_ID, COURSE_ID, POINTS) VALUES ($1, $2, $3)
        `;

        const updateHistoryQuery = `
            UPDATE STUDENTHISTORY SET POINTS=$1 WHERE STUDENT_ID=$2 AND COURSE_ID=$3
        `;

        const insertScorecardQuery = `
            INSERT INTO SCORECARD (STUDENT_ID, COURSE_ID, POINTS) VALUES ($1, $2, $3)
        `;

        const updateScorecardQuery = `
            UPDATE SCORECARD SET POINTS=$1 WHERE STUDENT_ID=$2 AND COURSE_ID=$3
        `;

        const existingRecord = await client.query(checkExistingRecordQuery, [studentinfo.student_id, courseinfo.course_id]);

        if (existingRecord.rows.length === 0) {
            // If no existing record, insert new records
            await client.query(insertHistoryQuery, [studentinfo.student_id, courseinfo.course_id, score]);
            await client.query(insertScorecardQuery, [studentinfo.student_id, courseinfo.course_id, score]);
        } else {
            // If existing record, update the records
            await client.query(updateHistoryQuery, [score, studentinfo.student_id, courseinfo.course_id]);
            await client.query(updateScorecardQuery, [score, studentinfo.student_id, courseinfo.course_id]);
        }

        await client.query('COMMIT'); // Commit the transaction
        res.redirect(`/showscore?score=${score}&courseId=${courseinfo.course_id}`);

    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction in case of an error
        console.error('Error processing form submission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/rate-quiz/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    res.render('ratequiz', { courseId });
});

app.post('/submit-quiz-rating', async (req, res) => {
    try {
        await client.query('BEGIN'); // Start the transaction
        const { courseId, quizrating } = req.body;

        // Update the COURSES table with the submitted quiz rating
        await client.query(`
        UPDATE COURSES
SET
    RATING = CASE
                WHEN RATING IS NULL THEN $1
                ELSE (RATING + $1) / 2
             END
WHERE COURSE_ID = $2;
    `, [quizrating, courseId]);
        await client.query('COMMIT'); 
        res.redirect(`/studentdashboard.html?fname=${studentinfo.fname}&lname=${studentinfo.lname}`);
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error('Error submitting quiz rating', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/viewcourses.html', async (req, res) => {
    try {
        let courses;
        const query = await client.query('SELECT * FROM STUDENTS WHERE EMAIL=$1', [studentinfo.email]);
        if (query.rows.length != 0) {
            const result = await client.query(`SELECT *
                FROM courses c
                JOIN studenthistory sh ON c.course_id = sh.course_id
                WHERE sh.student_id = $1`, [studentinfo.student_id]);
            courses = result.rows;
        }
        else {
            const query2 = await client.query('SELECT * FROM INSTRUCTORS WHERE EMAIL=$1', [instructorinfo.email]);
            if (query2.rows.length != 0) {
                const query = `
                SELECT *
                FROM courses c
                WHERE c.instructor_id = $1
            `;

                const result = await client.query(query, [instructorinfo.instructor_id]);
                courses = result.rows;
            }
        }
        res.render('viewcourses', { courses });
    } catch (error) {
        console.error('Error querying the database for courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/viewscorecard/:courseId', async (req, res) => {
    try {
        await client.query('BEGIN'); // Start the transaction
        const courseId = req.params.courseId;

        const result = await client.query(`
            SELECT s.student_id, st.fname, st.lname, c.course_name, s.points
            FROM scorecard s
            JOIN students st ON s.student_id = st.student_id
            JOIN courses c ON s.course_id = c.course_id
            WHERE s.course_id = $1
            ORDER BY s.points DESC;
        `, [courseId]);

        const scorecardData = result.rows;
        await client.query('COMMIT'); 
        res.render('viewscorecard', { scorecardData, courseName: scorecardData.length > 0 ? scorecardData[0].course_name : 'Unknown Course' });
    } catch (error) {
        await client.query('ROLLBACK'); // Start the transaction
        console.error('Error querying the database for scorecard:', error);
        res.status(500).send('Internal Server Error');
    }
});

async function calculateScore(userAnswers) {
    let score = 0;
    let x = '';

    for (const questionId of Object.keys(userAnswers)) {
        const selectedOption = userAnswers[questionId];

        const result = await client.query(`
            SELECT *
            FROM answers
            WHERE question_id = $1;
        `, [questionId]);
        if (selectedOption == 1) {
            x = result.rows[0].option1;
        }
        else if (selectedOption == 2) {
            x = result.rows[0].option2;
        }
        else if (selectedOption == 3) {
            x = result.rows[0].option3;
        }
        else if (selectedOption == 4) {
            x = result.rows[0].option4;
        }

        if (x == result.rows[0].is_correct) {
            score++;
        }
    }

    return score;
}
app.get('/deletecourse.html', (req, res) => {
    const courses = [
        { course_id: 1, course_name: 'Course 1' },
        { course_id: 2, course_name: 'Course 2' },
        // Add more courses as needed
    ];

    res.render('deletecourse', { courses });
});

app.post('/deletecourse/:courseId', async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const courseName = req.body.courseName;

        res.redirect('/deletecourse.html');
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/viewprogress.html', async (req, res) => {
    try {
        const studentId = studentinfo.student_id;

        const result = await client.query(`
            SELECT c.course_name, sh.points
            FROM studenthistory sh
            JOIN courses c ON sh.course_id = c.course_id
            WHERE sh.student_id = $1
        `, [studentId]);

        const courseNames = result.rows.map(row => row.course_name);
        const scores = result.rows.map(row => row.points);

        res.render('viewprogress', { courseNames, scores });
    } catch (error) {
        console.error('Error querying the database for scores:', error);
        res.status(500).send('Internal Server Error');
    }
});


//SETTINGS
app.post('/changeName', async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        console.log(firstName, lastName);

        // Check if the user is a student
        const studentResult = await client.query(`SELECT * FROM students WHERE email = $1`, [studentinfo.email]);
        if (studentResult.rows.length > 0) {
            // User is a student, update the students table
            await client.query(`UPDATE students SET fname = $1, lname = $2 WHERE email = $3`, [firstName, lastName, studentinfo.email]);
            console.log('Student name updated successfully');
            res.redirect(`/studentdashboard.html?fname=${studentinfo.fname}&lname=${studentinfo.lname}`);
        }

        // Check if the user is an instructor
        const instructorResult = await client.query(`SELECT * FROM instructors WHERE email = $1`, [instructorinfo.email]);
        if (instructorResult.rows.length > 0) {
            // User is an instructor, update the instructors table
            await client.query(`UPDATE instructors SET fname = $1, lname = $2 WHERE email = $3`, [firstName, lastName, instructorinfo.email]);
            console.log('Instructor name updated successfully');
            res.redirect(`/instructordashboard.html?fname=${instructorinfo.fname}&lname=${instructorinfo.lname}`);
        }

        // If no user is found
        console.log('User not found');
        return res.status(404).send('User not found');
    } catch (error) {
        console.error('Error updating name:', error);
        return res.status(500).send('Internal Server Error');
    }
});


app.post('/changeEmail', async (req, res) => {
    try {
        const { email } = req.body;

        // Check email format for students
        // Check if the user is a student
        const studentResult = await client.query(`SELECT * FROM students WHERE email = $1`, [studentinfo.email]);
        if (studentResult.rows.length > 0) {
            const studentEmailRegex = /^[a-zA-Z0-9._-]+@nu\.edu\.pk$/;
            if (!studentEmailRegex.test(email)) {
                return res.status(400).send('Invalid email format for students');
            }
            // Check if the new email is already in use for students
            const duplicateStudentEmail = await client.query(`SELECT * FROM students WHERE email = $1`, [email]);
            if (duplicateStudentEmail.rows.length > 0) {
                return res.status(400).send('Email already in use for students. Try again with a different email');
            }

            // User is a student, update the students table
            await client.query(`UPDATE students SET email=$1 WHERE email = $2`, [email, studentinfo.email]);
            console.log('Student email updated successfully');
            res.redirect(`/studentdashboard.html?fname=${studentinfo.fname}&lname=${studentinfo.lname}`);
        }

        // Check if the user is an instructor
        const instructorResult = await client.query(`SELECT * FROM instructors WHERE email = $1`, [instructorinfo.email]);
        if (instructorResult.rows.length > 0) {
            // Check email format for instructors
            const instructorEmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
            if (!instructorEmailRegex.test(email)) {
                return res.status(400).send('Invalid email format for instructors');
            }
            // Check if the new email is already in use for instructors
            const duplicateInstructorEmail = await client.query(`SELECT * FROM instructors WHERE email = $1`, [email]);
            if (duplicateInstructorEmail.rows.length > 0) {
                return res.status(400).send('Email already in use for instructors. Try again with a different email');
            }

            // User is an instructor, update the instructors table
            await client.query(`UPDATE instructors SET email=$1 WHERE email = $2`, [email, instructorinfo.email]);
            console.log('Instructor email updated successfully');
            res.redirect(`/instructordashboard.html?fname=${instructorinfo.fname}&lname=${instructorinfo.lname}`);
        }

        // If no user is found
        console.log('User not found');
        return res.status(404).send('User not found');
    } catch (error) {
        console.error('Error updating email:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.post('/changePassword', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Check if the user is a student
        const studentResult = await client.query(`SELECT * FROM students WHERE email = $1`, [studentinfo.email]);
        if (studentResult.rows.length > 0) {
            // User is a student, check if new password is the same as the old password
            if (currentPassword != studentResult.rows[0].password) {
                return res.status(401).send('Incorrect current password');
            }

            if (currentPassword == newPassword) {
                return res.status(400).send('New password cannot be set as the old password');
            }

            // Check if the current password matches the student's password


            // Update the student's password
            await client.query(`UPDATE students SET password=$1 WHERE email = $2`, [newPassword, studentinfo.email]);
            console.log('Student password updated successfully');
            res.redirect(`/studentdashboard.html?fname=${studentinfo.fname}&lname=${studentinfo.lname}`);
        }

        // Check if the user is an instructor
        const instructorResult = await client.query(`SELECT * FROM instructors WHERE email = $1`, [instructorinfo.email]);
        if (instructorResult.rows.length > 0) {
            // User is an instructor, check if new password is the same as the old password
            if (currentPassword != instructorResult.rows[0].password) {
                return res.status(401).send('Incorrect current password');
            }

            if (currentPassword == newPassword) {
                return res.status(400).send('New password cannot be set as the old password');
            }

            // Check if the current password matches the instructor's password


            // Update the instructor's password
            await client.query(`UPDATE instructors SET password=$1 WHERE email = $2`, [newPassword, instructorinfo.email]);
            console.log('Instructor password updated successfully');
            res.redirect(`/instructordashboard.html?fname=${instructorinfo.fname}&lname=${instructorinfo.lname}`);
        }

        // If no user is found
        console.log('User not found');
        return res.status(404).send('User not found');
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.get('/removecourse', async (req, res) => {
    try {
        await client.query('BEGIN'); // Start the transaction
        // Assuming instructorinfo is available in your request
        const instructorId = instructorinfo.instructor_id;

        // Fetch the courses for the logged-in instructor
        const courses = await client.query('SELECT * FROM COURSES WHERE INSTRUCTOR_ID=$1', [instructorId]);

        // Render the "removecourse.html" view with the courses data
        await client.query('COMMIT'); 
        res.render('removecourse', { courses: courses.rows });
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error('Error retrieving courses', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/removecourse', async (req, res) => {
    try {
        await client.query('BEGIN'); // Start the transaction
        const instructorId = instructorinfo.instructor_id;
        const courseId = req.body.courseId;
        // Verify that the selected course belongs to the instructor
        const verificationQuery = await client.query(
            'SELECT * FROM COURSES WHERE INSTRUCTOR_ID = $1 AND COURSE_ID = $2',
            [instructorId, courseId]
        );

        if (verificationQuery.rows.length === 0) {
            return res.status(403).send('Unauthorized Access');
        }

        // Delete the course
        await client.query('DELETE FROM COURSES WHERE COURSE_ID = $1', [courseId]);
        await client.query('COMMIT'); 
        res.redirect(`/instructordashboard.html?fname=${instructorinfo.fname}&lname=${instructorinfo.lname}`);
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error('Error removing course:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/editquiz', (req, res) => {
    const courseId = req.body.courseId;
    console.log(courseId);

    res.render('editquestion', { courseId: courseId });
});

app.get('/editquiz', async (req, res) => {
    try {
        const instructorId = instructorinfo.instructor_id;

        const courses = await client.query('SELECT * FROM COURSES WHERE INSTRUCTOR_ID=$1', [instructorId]);

        res.render('editquiz', { courses: courses.rows });
    } catch (error) {
        console.error('Error retrieving courses', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/updatequestion', async (req, res) => {
    try {
        const { courseId, questionId, newQuestion, option1, option2, option3, option4, correctAnswer } = req.body;
        console.log(courseId);
        const existingQuestion = await client.query('SELECT * FROM QUESTIONS WHERE QUESTION_ID=$1 AND COURSE_ID=$2', [questionId, courseId]);
        if (existingQuestion.rows.length === 0) {
            return res.status(404).send('No such question found');
        }

        await client.query('UPDATE QUESTIONS SET QUESTION=$1 WHERE QUESTION_ID=$2', [newQuestion, questionId]);

        await client.query(
            'UPDATE ANSWERS SET OPTION1=$1, OPTION2=$2, OPTION3=$3, OPTION4=$4, IS_CORRECT=$5 WHERE QUESTION_ID=$6',
            [option1, option2, option3, option4, correctAnswer, questionId]
        );
        res.redirect(`/instructordashboard.html?fname=${instructorinfo.fname}&lname=${instructorinfo.lname}`);
    } catch (error) {
        console.error('Error updating question and answers', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
