import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import "./quiz-type-a.css";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../../AuthContext";
import config from '../../../config';

const QuizTypeA = ({ quizId, scoreTypes, onQuizComplete }) => {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [noteText, setNoteText] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [mongoUserId, setMongoUserId] = useState("");
  const [responses, setResponses] = useState({});
  const [notes, setNotes] = useState({});

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
            const url = `${config.API_URL}/quizresponse/${data.mongoUserId}/${quizId}`;
            console.log("Fetching quiz response - URL:", url);
            console.log("Fetching quiz response - mongoUserId:", data.mongoUserId);
            console.log("Fetching quiz response - quizId:", quizId);

            const response = await axios.get(url);
            console.log("Quiz response data:", response.data);
            
            
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

    const requestBody = {
      user_id: userId,
      quiz_id: quizId,
      responses: {},
      notes: {},
      status: "in progress",
      last_question_index: 0,
      total_scores: initialScores,
      started_at: new Date(),
      finished_at: null,
    };

    console.log("Creating new quiz response - Request body:", JSON.stringify(requestBody, null, 2));

    try {
      const url = `${config.API_URL}/quizresponse/new`;
      console.log("Creating new quiz response - URL:", url);
      const response = await axios.post(url, requestBody);
      console.log("New quiz response created:", response.data);
    } catch (error) {
      console.error("Error creating new quiz response:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
    }
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/quiz/${quizId}`);
        setQuizData(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleAnswerClick = (score) => {
    const newResponses = { ...responses, [quizData.quiz_statements[currentQuestionIndex].id]: score };
    const newNotes = { ...notes, [quizData.quiz_statements[currentQuestionIndex].id]: noteText };
    setResponses(newResponses);
    setNotes(newNotes);

    if (currentQuestionIndex < quizData.quiz_statements.length - 1) {
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
      const response = await axios.put(`${config.API_URL}/quizresponse`, {
        user_id: mongoUserId,
        quiz_id: quizId,
        responses: responses,
        notes: notes,
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

    for (const [statementId, score] of Object.entries(responses)) {
      const statement = quizData.quiz_statements.find((s) => s.id === statementId);
      if (statement) {
        scores[statement.type] += score * statement.polarity;
      }
    }

    return scores;
  };

  if (!quizData) return <div>Loading...</div>;

  if (currentQuestionIndex >= quizData.quiz_statements.length) {
    return <div>Error: Invalid question index</div>;
  }

  const progress = ((currentQuestionIndex + 1) / quizData.quiz_statements.length) * 100;

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
        <h3>{quizData.quiz_statements[currentQuestionIndex].statement_id}</h3>
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
      <p style={{ textAlign: "center" }}>{currentQuestionIndex + 1} dari {quizData.quiz_statements.length} pertanyaan terlampaui.</p>
    </div>
  );
};

QuizTypeA.propTypes = {
  quizId: PropTypes.string.isRequired,
  scoreTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onQuizComplete: PropTypes.func.isRequired,
};

export default QuizTypeA;