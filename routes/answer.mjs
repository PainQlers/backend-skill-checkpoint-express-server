import connectionPool from "../utils/db.mjs";
import { Router } from "express";

const answerRouter = Router();

answerRouter.post("/:questionId/answers", async (req, res) => {
    const { questionId } = req.params;
    const { content } = req.body
    const newAnswer = {
      ...req.body
    }
  
    if(!content || content.length > 300) {
      return res.status(400).json({
        message: "Invalid request data."
      })
    }
  
    try{
      const idCheck = await connectionPool.query(
        `
        SELECT * FROM answers
        WHERE question_id = $1
        `,[questionId]
      );
  
      if(idCheck.rowCount === 0){
        return res.status(404).json({
          message: "Question not found."
        })
      }
  
      const result = await connectionPool.query(
        `
        INSERT INTO answers (question_id, content)
        VALUES ($1, $2)
        RETURNING *
        `,
        [
          questionId,
          newAnswer.content
        ]
      );
  
      if(result.rowCount === 0) {
        return res.status(404).json({
          message: "Question not found."
        })
      }
  
      return res.status(201).json({
        message: "Answer created successfully."
      })
    }catch(e) {
      return res.status(500).json({
        message: "Unable to create answers."
      })
    }
  })
  
answerRouter.get("/:questionId/answers", async (req, res) => {
    const { questionId } = req.params;
    try {
      const result = await connectionPool.query(
        `
        SELECT id, content FROM answers
        WHERE question_id = $1
        `,[questionId]
      )
  
      if(result.rowCount === 0) {
        return res.status(404).json({
          message: "Question not found."
        })
      }
  
      return res.status(200).json({
        data: result.rows,
      })
    }catch(e) {
      return res.status(500).json({
        message: "Unable to fetch answers."
      })
    }
  })
  
answerRouter.delete("/:questionId/answers", async (req, res) => {
    const { questionId } = req.params;
    try{
      const result = await connectionPool.query(
        `
        DELETE FROM answers
        WHERE question_id = $1
        `,[questionId]
      );
  
      if(result.rowCount === 0){
        return res.status(404).json({
          message: "Question not found."
        })
      }
  
      return res.status(200).json({
        message: "All answers for the question have been deleted successfully."
      })
    }catch(e) {
      return res.status(500).json({
        message: "Unable to delete answers."
      })
    }
  })

export default answerRouter;