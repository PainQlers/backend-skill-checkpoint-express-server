import connectionPool from "../utils/db.mjs";
import { Router } from "express";

const questionAnswer = Router();

questionAnswer.get("/", async (req, res) => {
    try{
      const result = await connectionPool.query("SELECT * FROM questions")
    return res.status(200).json({
      data: result.rows
    });
    }catch(e) {
      return res.status(500).json({
        message: "Unable to fetch questions."
      })
    }
  });
  
questionAnswer.post("/", async (req, res) => {
    const { title, description, category} = req.body;
    const newQuestion = {
      ...req.body
    }
  
    if(!title || !description || !category) {
      return res.status(400).json({
        message: "Invalid request data."
      })
    }
  
      try{
        const result = await connectionPool.query(
          `
          INSERT INTO questions (title, description, category)
          VALUES ($1, $2, $3)
          `,
          [
            newQuestion.title,
            newQuestion.description,
            newQuestion.category
          ]
        )
    
        return res.status(201).json({
          message: "Question created successfully."
        })
      }catch(e) {
        return res.status(500).json({
          message: "Unable to create question."
        })
      }
  })
  
questionAnswer.get("/:id(\\d+)", async (req, res) => {
    const { id } = req.params;
    try{
      const result = await connectionPool.query(`SELECT * FROM questions WHERE id = $1`,[id])
  
      if(result.rows.length === 0) {
        return res.status(404).json({
          message: "Question not found."
        })
      }
  
    return res.status(200).json({
      data: result.rows
    });
    }catch(e) {
      return res.status(500).json({
        message: "Unable to fetch questions."
      })
    }
    
  })
  
questionAnswer.put("/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const {title, description, category} = req.body;
    const newQuestion = {
      ...req.body
    }
  
    if(!title || !description || !category) {
      return res.status(400).json({
        message: "Invalid request data."
      });
    }
  
    try{
      const result = await connectionPool.query(
        `
        UPDATE questions
        SET title = $1,
            description = $2,
            category = $3
        WHERE id = $4
        `,
        [
          newQuestion.title,
          newQuestion.description,
          newQuestion.category,
          questionId
        ]
      );
  
      if(result.rowCount === 0) {
        return res.status(404).json({
          message: "Question not found."
        });
      }
  
      return res.status(200).json({
        message: "Question updated successfully."
      });
    }catch(e) {
      return res.status(500).json({
        message: "Unable to fetch questions."
      })
    }
  })
  
questionAnswer.delete("/:questionId", async (req, res) => {
    const { questionId } = req.params;
    try{
      const result = await connectionPool.query(
        `
        DELETE FROM questions
        WHERE id = $1 RETURNING *
        `,[questionId]
      );
  
      if(result.rowCount === 0){
        return res.status(404).json({
          message: "Question not found."
        })
      }
  
      return res.status(200).json({
        message: "Question post has been deleted successfully."
      })
    }catch(e) {
      return res.status(500).json({
        message: "Unable to delete question."
      })
    }
  })
  
questionAnswer.get("/search", async (req, res) => {
    try{
    const titleParam = req.query.title ? `%${req.query.title}%` : null;
    const categoryParam = req.query.category ? `%${req.query.category}%` : null;
    const result = await connectionPool.query(
      `
      SELECT * FROM questions
      WHERE title ILIKE COALESCE($1, title)
      AND category ILIKE COALESCE($2, category)
      `,
      [
        titleParam,
        categoryParam
      ]
    );
    return res.status(200).json({
      data: result.rows
    })
    }catch(e) {
      return res.status(500).json({
        message: "Unable to fetch a question."
      })
    }
  })

export default questionAnswer;