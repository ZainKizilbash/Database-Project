const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();
const port = 3000;


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
const queryinsertcoursetable = `
            INSERT INTO COURSES (COURSE_ID, COURSE_NAME, INSTRUCTOR_ID) VALUES ('CS100', 'Programming Fundamentals', '99T-0000');
            INSERT INTO COURSES (COURSE_ID, COURSE_NAME, INSTRUCTOR_ID) VALUES ('CS101', 'Object Oriented Programming', '99T-0000');
            INSERT INTO COURSES (COURSE_ID, COURSE_NAME, INSTRUCTOR_ID) VALUES ('CS102', 'Data Structures and Algorithms', '99T-0000');
            INSERT INTO COURSES (COURSE_ID, COURSE_NAME, INSTRUCTOR_ID) VALUES ('CS103', 'Computer Organisation and Assembly Language Programming', '99T-0000');
            INSERT INTO COURSES (COURSE_ID, COURSE_NAME, INSTRUCTOR_ID) VALUES ('CS104', 'Database Systems', '99T-0000');`;
        const queryinsertquestiontable = `
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF1', 'CS100', 'What is the purpose of a variable in programming?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF2', 'CS100', 'What does the term "IDE" stand for in programming?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF3', 'CS100', ' In programming, what does the acronym "OOP" stand for?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF4', 'CS100', 'Which of the following data types is not typically used to store numeric values?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF5', 'CS100', ' What is the purpose of the "if" statement in programming?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF6', 'CS100', ' What is the result of the expression 3 + 5 * 2?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF7', 'CS100', ' What is the role of a "function" in programming?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF8', 'CS100', 'What does the term "syntax error" refer to in programming?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF9', 'CS100', ' What does the acronym "GUI" stand for in programming?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('PF10', 'CS100', 'Which programming language is known for its use in web development and is often used for both client and server-side scripting?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP1', 'CS101', 'What is the main principle behind Object-Oriented Programming (OOP)?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP2', 'CS101', 'In OOP, what is the process of creating a new class based on an existing class called?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP3', 'CS101', 'Which OOP concept allows a class to have multiple methods with the same name but different parameters?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP4', 'CS101', 'What is the term for bundling data and methods that operate on the data within a single unit or class?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP5', 'CS101', 'Which OOP concept allows a class to have more than one form of a method?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP6', 'CS101', 'What is a constructor in OOP?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP7', 'CS101', 'In OOP, what is the term for hiding the internal details of an object and showing only the necessary functionality?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP8', 'CS101', 'Which OOP concept allows a class to have methods and fields that are defined in another class?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP9', 'CS101', 'What is the term for a blueprint for creating objects in OOP?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('OOP10', 'CS101', 'Which OOP principle promotes the reusability of code by allowing a class to inherit properties and behaviors from another class?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA1', 'CS102', 'What is the time complexity of the binary search algorithm?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA2', 'CS102', 'Which data structure is typically used to implement a LIFO structure?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA3', 'CS102', 'What is the purpose of a hash function in hash tables?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA4', 'CS102', 'Which sorting algorithm has the best average-case time complexity?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA5', 'CS102', 'In a binary tree, what is the maximum number of nodes at the kth level?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA6', 'CS102', 'What is the primary advantage of using dynamic programming in algorithms?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA7', 'CS102', 'Which of the following is an example of a greedy algorithm?');


            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA8', 'CS102', 'What is the purpose of Big-O notation in algorithm analysis?');


            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA9', 'CS102', 'In the context of hash tables, what is a collision?');


            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DSA10', 'CS102', 'Which data structure is used for Breadth-First Search (BFS) in a graph?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL1', 'CS103', 'What does the MOV instruction do in Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL2', 'CS103', 'Which of the following is a general-purpose register in x86 Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL3', 'CS103', 'What is the role of the CMP instruction in Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL4', 'CS103', 'Which flag is affected by the JMP instruction in Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL5', 'CS103', 'What is the purpose of the INT instruction in Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL6', 'CS103', 'Which addressing mode is used in the instruction "MOV BX, [SI]" in x86 Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL7', 'CS103', 'What is the primary function of the Stack Pointer (SP) register in Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL8', 'CS103', 'In Assembly Language, what does the JZ instruction do?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL9', 'CS103', 'What is the purpose of the RET instruction in Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('COAL10', 'CS103', 'Which of the following is not a flag affected by the ADD instruction in Assembly Language?');

            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB1', 'CS104', 'What does DBMS stand for?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB2', 'CS104', 'Which of the following is not a type of database model?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB3', 'CS104', 'What is the purpose of the SELECT statement in SQL?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB4', 'CS104', 'Which SQL clause is used to filter the results of a query?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB5', 'CS104', 'In a relational database, what is a primary key used for?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB6', 'CS104', 'Which type of join returns all rows when there is a match in one of the tables?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB7', 'CS104', 'What is normalization in the context of a relational database?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB8', 'CS104', 'Which SQL aggregate function calculates the average of a numeric column?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB9', 'CS104', 'What is ACID in the context of database transactions?');
            INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION) VALUES ('DB10', 'CS104', 'Which of the following is an example of a NoSQL database?');`;


    const insertanswerstable = 
    `INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF1', 'To make the code more colorful', 'To store and manage data', 'To confuse other programmers', 'To create loops easily', 'To store and manage data');
     INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF2', 'Integrated Development Environment', 'Internet Data Exchange', 'Interactive Design Environment', 'Intelligent Development Engine', 'Integrated Development Environment');
     INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF3', 'Object-Oriented Programming', 'Overly Obscure Procedures', 'Optimal Output Processes', 'Open-Source Protocol', 'Object-Oriented Programming');
     INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF4', 'int', 'float', 'str', 'bool', 'str');
     INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF5', 'To repeat a block of code', 'To declare a variable', 'To conditionally execute code', 'To create a function', 'To conditionally execute code');
     INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF6', '16', '11', '13', '26', '26');
     INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF7', 'To print text on the screen', 'To perform a specific task or calculation', 'To create a graphical user interface', 'To comment on the code', 'To perform a specific task or calculation');
     INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF8', 'An error in program logic', 'An error in the program structure or grammar', 'An error in runtime execution', 'An error caused by hardware issues', 'An error in the program structure or grammar');
     INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF9', 'General User Interface', 'Graphical User Interface', 'General Understanding of Interfaces', 'Global User Integration', 'Graphical User Interface');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('PF10', 'Java', 'Python', 'JavaScript', 'C++', 'JavaScript');

    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP1', 'Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction', 'Encapsulation');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP2', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Inheritance');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP3', 'Overloading', 'Overriding', 'Encapsulation', 'Abstraction', 'Overloading');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP4', 'Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction', 'Encapsulation');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP5', 'Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction', 'Polymorphism');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP6', 'A method that destroys an object', 'A method that initializes an object', 'A method that is used for mathematical operations', 'A method that is called automatically when an object is created', 'A method that is called automatically when an object is created');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP7', 'Polymorphism', 'Inheritance', 'Abstraction', 'Encapsulation', 'Abstraction');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP8', 'Polymorphism', 'Inheritance', 'Encapsulation', 'Abstraction', 'Inheritance');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP9', 'Class', 'Object', 'Method', 'Attribute', 'Class');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) 
    VALUES ('OOP10', 'Polymorphism', 'Inheritance', 'Abstraction', 'Encapsulation', 'Inheritance');

    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA1', 'O(log n)', 'O(n)', 'O(n^2)', 'O(1)', 'O(log n)');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA2', 'Stack', 'Queue', 'Heap', 'Linked List', 'Stack');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA3', 'Mapping data to a fixed-size array', 'Storing data in a sorted manner', 'Ensuring all elements are unique', 'Generating random numbers', 'Mapping data to a fixed-size array');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA4', 'Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort', 'Merge Sort');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA5', '2^(k+1) - 1', '2^k', '2^(k-1)', 'k^2', '2^k');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA6', 'Reducing time complexity', 'Reducing space complexity', 'Reducing code length', 'Reducing the need for testing', 'Reducing time complexity');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA7', 'Dijkstra Algorithm', 'Bubble Sort', 'Depth-First Search', 'Binary Search', 'Dijkstra Algorithm');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA8', 'Expressing the upper bound of an algorithm running time', 'Expressing the lower bound of an algorithm running time', 'Expressing the exact running time of an algorithm', 'Counting the number of operations in an algorithm', 'Expressing the upper bound of an algorithm running time');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA9', 'When two different keys hash to the same index', 'When a key is not found in the hash table', 'When the hash table is full', 'When a key is successfully inserted into the hash table', 'When two different keys hash to the same index');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DSA10', 'Queue', 'Stack', 'Heap', 'Linked List', 'Queue');

    -- CS103: Computer Organization and Assembly Language
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL1', 'Moves data from one location to another', 'Multiplies two values', 'Compares two values', 'Jumps to a specified location', 'Moves data from one location to another');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL2', 'AX', 'IP', 'CX', 'DX', 'AX');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL3', 'Compares two values', 'Moves data from one location to another', 'Adds two values', 'Multiplies two values', 'Compares two values');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL4', 'Zero flag (ZF)', 'Carry flag (CF)', 'Overflow flag (OF)', 'Sign flag (SF)', 'Zero flag (ZF)');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL5', 'Generates an interrupt', 'Moves data from one location to another', 'Compares two values', 'Jumps to a specified location', 'Generates an interrupt');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL6', 'Base-Indexed', 'Immediate', 'Register-Indirect', 'Relative', 'Base-Indexed');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL7', 'Manages the program counter', 'Manages the instruction register', 'Manages the instruction pointer', 'Manages the stack operations', 'Manages the stack operations');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL8', 'Jumps if zero flag (ZF) is set', 'Jumps if carry flag (CF) is set', 'Jumps if sign flag (SF) is set', 'Jumps if overflow flag (OF) is set', 'Jumps if zero flag (ZF) is set');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL9', 'Returns control to the calling function', 'Halts the program execution', 'Jumps to a specified location', 'Restores the stack pointer', 'Returns control to the calling function');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('COAL10', 'Carry flag (CF)', 'Zero flag (ZF)', 'Overflow flag (OF)', 'Sign flag (SF)', 'Overflow flag (OF)');

    -- CS104: Database Management Systems
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB1', 'Database Management System', 'Data Backup and Management System', 'Digital Business Management System', 'Data-Based Management System', 'Database Management System');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB2', 'Document-Oriented Model', 'Relational Model', 'Object-Oriented Model', 'Hierarchical Model', 'Document-Oriented Model');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB3', 'Retrieve data from the database', 'Update data in the database', 'Define the structure of the database', 'Delete data from the database', 'Retrieve data from the database');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB4', 'GROUP BY', 'ORDER BY', 'HAVING', 'WHERE', 'WHERE');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB5', 'Ensuring data integrity', 'Storing large binary objects', 'Enforcing referential integrity', 'Facilitating data retrieval', 'Ensuring data integrity');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB6', 'Inner Join', 'Left Join', 'Right Join', 'Full Outer Join', 'Inner Join');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB7', 'Organizing data into multiple tables', 'Ensuring data consistency', 'Removing redundant data', 'Optimizing database performance', 'Organizing data into multiple tables');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB8', 'SUM()', 'COUNT()', 'AVG()', 'MAX()', 'AVG()');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB9', 'Atomicity, Consistency, Isolation, Durability', 'Alliance, Collaboration, Integrity, Discipline', 'Agility, Creativity, Innovation, Diversity', 'Authentication, Confidentiality, Integrity, Availability', 'Atomicity, Consistency, Isolation, Durability');
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('DB10', 'MongoDB', 'MySQL', 'Oracle', 'PostgreSQL', 'MongoDB');
     `;


    const droptable1=`DROP TABLE STUDENTHISTORY`;
    const droptable2=`DROP TABLE SCORECARD`;
    const droptable3=`DROP TABLE ANSWERS`;
    const droptable4=`DROP TABLE QUESTIONS`;
//    client.query(droptable1);
// client.query(droptable2);
 //client.query(droptable3);
//    client.query(droptable4);

    // const query=`INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT) VALUES ('b1', 'MongoDB', 'MySQL', 'Oracle', 'PostgreSQL', 'MongoDB');`
    // // client.query(queryinsertcoursetable);
    // // client.query(queryinsertquestiontable);
    //client.query(insertanswerstable);
    // client.query(query);

    // const query1=`ALTER TABLE COURSES
    // ALTER COLUMN RATING TYPE DECIMAL(10, 2);`
    // client.query(query1);


    const query100=`
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD1', 'CS106', 'What does the term NPC stand for in game design?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD2', 'CS106', 'In game development, what is the purpose of a level editor?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD3', 'CS106', 'What does FPS stand for in the context of video games?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD4', 'CS106', 'Which of the following is a popular game engine used in the industry?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD5', 'CS106', 'What is ragdoll physics commonly used for in video games?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD6', 'CS106', 'What is the purpose of a HUD in a video game?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD7', 'CS106', 'In game design, what does AI refer to?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD8', 'CS106', 'Which game genre is known for its emphasis on storytelling and character development?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD9', 'CS106', 'What is the purpose of collision detection in game development?');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('GD10', 'CS106', 'Which term is commonly used to describe the process of testing a game before its official release?');
    `;
    const query101=`
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD1', 'Non-Playable Character', 'Non-Playable Companion', 'Non-Player Console', 'Non-Playable Campaign', 'Non-Playable Character');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD2', 'Create sound effects', 'Design game characters', 'Build game levels', 'Test game performance', 'Build game levels');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD3', 'Frames Per Second', 'First Person Shooter', 'Freeze Points System', 'Final Playable Stage', 'Frames Per Second');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD4', 'Unity', 'CryEngine', 'Frostbite', 'Anvil', 'Unity');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD5', 'Creating realistic animations', 'Simulating cloth movement', 'Implementing dynamic lighting', 'Simulating character movement', 'Simulating character movement');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD6', 'Head-Up Display', 'High-level User Design', 'Humanoid User Dialogue', 'Hardcore User Difficulty', 'Head-Up Display');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD7', 'Artificial Intelligence', 'Augmented Input', 'Advanced Interaction', 'Automated Infiltration', 'Artificial Intelligence');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD8', 'Role-Playing Games', 'First Person Shooters', 'Real-Time Strategy', 'Simulation Games', 'Role-Playing Games');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD9', 'Detecting player input', 'Preventing player collisions', 'Handling player animations', 'Checking game objectives', 'Preventing player collisions');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('GD10', 'Beta Testing', 'Alpha Testing', 'Playtesting', 'Debugging', 'Beta Testing');
    `;


    const query200=` 
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD1', 'CS105', 'What does HTML stand for');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD2', 'CS105', 'What is the purpose of CSS in web development');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD3', 'CS105', 'Explain the difference between margin and padding in CSS');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD4', 'CS105', 'What is the role of JavaScript in web development');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD5', 'CS105', 'What is a responsive web design');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD6', 'CS105', 'Explain the purpose of the <head> element in HTML');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD7', 'CS105', 'What is the CSS Box Model, and how does it work');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD8', 'CS105', 'Explain the purpose of the meta tag in HTML');
    
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD9', 'CS105', 'What are HTTP methods, and explain GET and POST');
    
    INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    VALUES ('WD10', 'CS105', 'What is the purpose of a web server in the context of web development');
    `;

    const query201=`
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD1', 'Hypertext Markup Language', 'Hyper Transfer Markup Language', 'High-Level Text Management Language', 'Home Tool Markup Language', 'Hypertext Markup Language');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD2', 'Control Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD3', 'Margin is outer space, and padding is inner space', 'Padding is outer space, and margin is inner space', 'Margin and padding are the same', 'Margin and padding are not used in CSS', 'Margin is outer space, and padding is inner space');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD4', 'JavaScript is used for styling web pages', 'JavaScript is used for creating databases', 'JavaScript is a server-side language', 'JavaScript is used for adding interactivity to web pages', 'JavaScript is used for adding interactivity to web pages');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD5', 'A design style that adapts to different screen sizes', 'A design style with fixed dimensions', 'A design style that works only on mobile devices', 'A design style that uses only images', 'A design style that adapts to different screen sizes');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD6', 'Defines metadata about the HTML document', 'Contains the main content of the HTML document', 'Includes external JavaScript files', 'Specifies the layout of the HTML document', 'Defines metadata about the HTML document');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD7', 'Model that represents how elements are displayed on a webpage', 'Model used for server-side scripting', 'Model for organizing HTML elements', 'Model for organizing CSS files', 'Model that represents how elements are displayed on a webpage');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD8', 'Defines the character set for the HTML document', 'Specifies the background color of the HTML document', 'Sets the viewport for responsive design', 'Indicates the primary language of the HTML document', 'Sets the viewport for responsive design');

    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD9', 'HTTP methods are used for creating web pages', 'GET is used for sending data to the server, and POST is used for retrieving data from the server', 'GET is used for retrieving data from the server, and POST is used for sending data to the server', 'HTTP methods are used for creating databases', 'GET is used for retrieving data from the server, and POST is used for sending data to the server');
    
    INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    VALUES ('WD10', 'Manages requests and responses between the client and server', 'Stores website data on the client-side', 'Responsible for creating web pages', 'Ensures web page security', 'Manages requests and responses between the client and server');
    `;
    client.query(query200);
    client.query(query201);



    // const query12=`INSERT INTO QUESTIONS (QUESTION_ID, COURSE_ID, QUESTION)
    // VALUES 
    //   ('DA1', 'GC100', 'What is the primary purpose of graphic design?'),
    //   ('DA2', 'GC100', 'Explain the concept of negative space in design.'),
    //   ('DA3', 'GC100', 'Define the term "color theory" in design.'),
    //   ('DA4', 'GC100', 'What is the significance of typography in graphic design?'),
    //   ('DA5', 'GC100', 'Describe the role of composition in visual arts.'),
    //   ('DA6', 'GC100', 'What is the importance of balance in design?'),
    //   ('DA7', 'GC100', 'Explain the concept of contrast in visual communication.'),
    //   ('DA8', 'GC100', 'Define the term "branding" in the context of design.'),
    //   ('DA9', 'GC100', 'Discuss the use of symbolism in logo design.'),
    //   ('DA10', 'GC100', 'How does perspective play a role in art and design?');`;
    //   client.query(query12);

    //   const query13=`
    //   INSERT INTO ANSWERS (QUESTION_ID, OPTION1, OPTION2, OPTION3, OPTION4, IS_CORRECT)
    //   VALUES
    //     ('DA1', 'Communicating a message visually', 'Creating interactive websites', 'Writing code for software development', 'Managing project timelines', 'Communicating a message visually'),
    //     ('DA2', 'Empty space around and between objects', 'Bright and vibrant colors', 'Positive space in design', 'The central focal point of a design', 'Empty space around and between objects'),
    //     ('DA3', 'The study of how colors interact', 'The use of black and white only', 'Color psychology in design', 'Creating color patterns for textiles', 'The study of how colors interact'),
    //     ('DA4', 'Arrangement of visual elements in design', 'Selecting the right type of paper', 'Typography in literature', 'Using bold colors in artwork', 'Arrangement of visual elements in design'),
    //     ('DA5', 'Creating 3D models', 'The organization of visual elements', 'Applying color to artwork', 'Digital illustration techniques', 'The organization of visual elements'),
    //     ('DA6', 'Achieving harmony and stability', 'Using a wide range of colors', 'Making designs visually complex', 'Emphasizing a single focal point', 'Achieving harmony and stability'),
    //     ('DA7', 'Using similar colors in a design', 'Creating uniformity in design', 'Avoiding variation in font styles', 'Creating visual interest through differences', 'Creating visual interest through differences'),
    //     ('DA8', 'Creating a unique visual identity', 'Using only black and white in design', 'Organizing files on a computer', 'Developing software applications', 'Creating a unique visual identity'),
    //     ('DA9', 'Using only text in logo design', 'Incorporating meaningful symbols', 'Using a wide range of unrelated symbols', 'Avoiding any symbolism in logos', 'Incorporating meaningful symbols'),
    //     ('DA10', 'A technique used in painting', 'The way objects appear in relation to each other', 'An advanced software for graphic design', 'A type of drawing tool', 'The way objects appear in relation to each other');
    //   `;
    //   client.query(query13);


