// src/client/components/quiz-type-one/quiz-type-one.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import "./quiz-type-one.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../AuthContext";

const QuizTypeOne = ({ quizId, scoreTypes, onQuizComplete }) => {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [noteText, setNoteText] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [mongoUserId, setMongoUserId] = useState("");
  const [responses, setResponses] = useState({});
  const [notes, setNotes] = useState({});
  // const [status, setStatus] = useState("in progress");

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
              if (response.data.status === "finished") {
                setResponses({});
                setNotes({});
                setCurrentQuestionIndex(0);
                await createNewQuizResponse(data.mongoUserId, quizId);
              } else {
                setResponses(response.data.responses || {});
                setNotes(response.data.notes || {});
                setCurrentQuestionIndex(response.data.last_question_index || 0);
              }
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log("Quiz response not found, starting a new one.");
              await createNewQuizResponse(data.mongoUserId, quizId);
            } else {
              console.error("Error fetching quiz response:", error);
            }
          }
        }
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, quizId]);

  const createNewQuizResponse = async (userId, quizId) => {
    const initialScores = scoreTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    try {
      await axios.post("http://localhost:8000/api/quizresponse/new", {
        user_id: userId,
        quiz_id: quizId,
        responses: {},
        notes: {},
        status: "in progress",
        last_question_index: 0,
        total_scores: initialScores,
        started_at: new Date(),
        finished_at: null,
      });
    } catch (error) {
      console.error("Error creating new quiz response:", error);
    }
  };

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
  }, [quizId]);

  const handleAnswerClick = (score) => {
    const newResponses = { ...responses, [quizData.statements[currentQuestionIndex].number]: score };
    const newNotes = { ...notes, [quizData.statements[currentQuestionIndex].number]: noteText };
    setResponses(newResponses);
    setNotes(newNotes);

    if (currentQuestionIndex < quizData.statements.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setNoteText("");
      saveProgress(newResponses, newNotes, currentQuestionIndex + 1, "in progress");
    } else {
      const totalScores = calculateScores(newResponses);
      saveProgress(newResponses, newNotes, currentQuestionIndex + 1, "finished", totalScores);
      onQuizComplete(totalScores);
    }
  };

  const saveProgress = async (responses, notes, lastQuestionIndex, status, totalScores = {}) => {
    try {
      const response = await axios.put("http://localhost:8000/api/quizresponse", {
        user_id: mongoUserId,
        quiz_id: quizId,
        responses: responses,
        notes: notes, // Add notes here
        status: status,
        last_question_index: lastQuestionIndex,
        total_scores: totalScores,
        started_at: new Date(),
        finished_at: status === "finished" ? new Date() : null,
      });
      console.log("Progress saved:", response.data);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const calculateScores = (responses) => {
    const scores = scoreTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    for (const [statementNumber, score] of Object.entries(responses)) {
      const statement = quizData.statements.find((s) => s.number === parseInt(statementNumber));
      if (statement) {
        scores[statement.type] += score;
      }
    }

    return scores;
  };

  if (!quizData) return <div>Loading...</div>;

  if (currentQuestionIndex >= quizData.statements.length) {
    return <div>Error: Invalid question index</div>;
  }

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

QuizTypeOne.propTypes = {
  quizId: PropTypes.string.isRequired,
  scoreTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onQuizComplete: PropTypes.func.isRequired,
};

export default QuizTypeOne;
