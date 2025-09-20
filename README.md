# Q&A API (Forked Version)

This is a fork of the original Q&A API project.  
It is a RESTful API built with **Express.js** and **PostgreSQL**.  
This version includes modifications and improvements over the original.

---

## 🚀 Features

- **CRUD operations** for questions
- **Search functionality** for questions by title and category
- **Answer management** for each question
- **Input validation** for required fields and content length

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PainQlers/backend-skill-checkpoint-express-server.git
   cd backend-skill-checkpoint-express-server

2. Install dependencies:

    npm install

3. Set up your PostgreSQL database and update the connection details in ./utils/db.mjs.

4. Run the server:

  npm start 
  :The server will run on http://localhost:4000.

# API Endpoints

## Questions

GET /questions: Retrieve all questions

GET /questions/:id: Retrieve a specific question by ID

POST /questions: Create a new question

//payload example
{
  "title": "What is the capital of France?",
  "description": "This is a basic geography question asking about the capital city of France.",
  "category": "Geography"
}

PUT /questions/:questionId: Update an existing question

//payload example
{
  "title": "What is the largest planet in our solar system?",
  "description": "This is a basic astronomy question asking about the largest planet by size in the solar system.",
  "category": "Astronomy"
}

DELETE /questions/:questionId: Delete a question

GET /questions/search: Search questions by title and/or category

## Answers

GET /questions/:questionId/answers: Retrieve all answers for a specific question

POST /questions/:questionId/answers: Add a new answer to a question

//payload example
{
  "content": "The capital of France is Paris."
}

DELETE /questions/:questionId/answers: Delete all answers for a specific question

🔧 Acknowledgements

This project is a fork of the original Q&A API project.
Thanks to the original maintainers for creating this project.


  

  
