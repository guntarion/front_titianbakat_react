// src/client/components/quiz-type-one/quiz-type-one.jsx
// src/AuthContext.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./quiz-type-one.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../AuthContext"; 

const QuizTypeOne = () => {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [noteText, setNoteText] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [mongoUserId, setMongoUserId] = useState("");
  const [responses, setResponses] = useState({});
  const [status, setStatus] = useState("in progress");
  const quizId = "quiz_01_riasec"; // Set your quiz ID here

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setMongoUserId(data.mongoUserId || "");

        if (data.mongoUserId) {
          try {
            const response = await axios.get(`http://localhost:8000/api/quizresponse/${data.mongoUserId}/${quizId}`);
            if (response.data) {
              setResponses(response.data.responses || {});
              setCurrentQuestionIndex(response.data.last_question_index || 0);
            }
          } catch (error) {
            console.error("Error fetching quiz response:", error);
          }
        }
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/quiz/${quizId}`);
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswerClick = (score) => {
    const newResponses = { ...responses, [quizData.statements[currentQuestionIndex].number]: score };
    setResponses(newResponses);

    if (currentQuestionIndex < quizData.statements.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setNoteText("");
    } else {
      setStatus("finished");
      alert("Quiz completed!");
    }

    saveProgress(newResponses, currentQuestionIndex + 1, status);
  };

  const saveProgress = async (responses, lastQuestionIndex, status) => {
    try {
      const response = await axios.post("http://localhost:8000/api/quizresponse", {
        user_id: mongoUserId,
        quiz_id: quizId,
        responses: responses,
        status: status,
        last_question_index: lastQuestionIndex,
        total_scores: calculateScores(responses),
        started_at: new Date(),
        finished_at: status === "finished" ? new Date() : null,
      });
      console.log("Progress saved:", response.data);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const calculateScores = (responses) => {
    const scores = {
      type_realistic: 0,
      type_investigative: 0,
      type_artistic: 0,
      type_social: 0,
      type_enterprising: 0,
      type_conventional: 0,
    };

    for (const [statementNumber, score] of Object.entries(responses)) {
      const statement = quizData.statements.find((s) => s.number === parseInt(statementNumber));
      if (statement) {
        scores[statement.type] += score;
      }
    }

    return scores;
  };

  if (!quizData) return <div>Loading...</div>;

  const progress = ((currentQuestionIndex + 1) / quizData.statements.length) * 100;

  return (
    <div className="quiz-container">
      <div className="progress mb-3">
        <div
          className="progress-bar progress-bar-striped bg-success"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {progress.toFixed(0)}%
        </div>
      </div>
      <div className="question-container">
        <h3>{quizData.statements[currentQuestionIndex].statement}</h3>
        <div className="options">
          {["Nggak Banget", "Nggak", "Netral", "Iya", "Iya Banget"].map((option, index) => (
            <button key={option} onClick={() => handleAnswerClick(index - 2)}>
              {option}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Catatan Anda..."
          className="mt-3 answer-input"
        />
      </div>
      <p style={{ textAlign: "center" }}>{currentQuestionIndex + 1} of {quizData.statements.length} questions completed.</p>
    </div>
  );
};

export default QuizTypeOne;
