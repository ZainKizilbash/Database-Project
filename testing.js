const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();
const port = 4000;


app.use(express.urlencoded({ extended: true })); // Use built-in body parser
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
        res.sendFile(path.join(__dirname, 'studentdashboard.html'));
    });

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, 'views'));

    // Add this function to calculate the score
// Add this function to calculate the score
async function calculateScore(userAnswers) {
    let score = 0;
    let x='';

    // Iterate over the keys of the userAnswers object
    for (const questionId of Object.keys(userAnswers)) {
        const selectedOption = userAnswers[questionId];
        console.log(selectedOption);
        console.log(questionId);

        // Assuming you have the correct answer stored in the 'answers' table
        const result = await client.query(`
            SELECT *
            FROM answers
            WHERE question_id = $1;
        `, [questionId]);
        if (selectedOption==1){
            x=result.rows[0].option1;
        }
        else if (selectedOption==2){
            x=result.rows[0].option2;
        }
        else if (selectedOption==3){
            x=result.rows[0].option3;
        }
        else if (selectedOption==4){
            x=result.rows[0].option4;
        }
        console.log(x);

        if (x==result.rows[0].is_correct) {
            score++;
        }
    }

    return score;
}





    app.get('/questions/:courseId', async (req, res) => {
        try {
            const courseId = req.params.courseId;
    
            // Fetch questions and corresponding options from the database based on courseId
            const result = await client.query(`
                SELECT q.*, a.option1, a.option2, a.option3, a.option4, a.is_correct
                FROM questions q
                INNER JOIN answers a ON q.question_id = a.question_id
                WHERE q.course_id = $1;
            `, [courseId]);
    
            // Organize the data into a map for easy grouping
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
    
            // Convert the map values to an array
            const questions = Array.from(questionsMap.values());
    
            // Render the questions.html page and pass the questions data
            res.render('questions', { courseId, questions });
        } catch (error) {
            console.error('Error fetching questions:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.post('/submit', async (req, res) => {
        try {
            const userAnswers = req.body; // Assuming the form data is sent as form data
    
            // Assuming you have a function to calculate the score
            const score = await calculateScore(userAnswers); // Add await here
    
            // Render a page showing the user's score
            res.render('score', { score });
        } catch (error) {
            console.error('Error processing form submission:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
