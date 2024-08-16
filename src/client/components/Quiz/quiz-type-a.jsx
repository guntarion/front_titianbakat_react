// src/client/components/Quiz/quiz-type-a.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './quiz-type-a.css';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../AuthContext';
import config from '../../../config';

const QuizTypeA = ({
  quizId,
  scoreTypes,
  onQuizComplete,
  initialQuestionIndex = 0,
}) => {
  const { user } = useAuth();
  const [mongoUserId, setMongoUserId] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(initialQuestionIndex);
  const [noteText, setNoteText] = useState('');
  const [currentQuizResponseId, setCurrentQuizResponseId] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [responses, setResponses] = useState({});
  const [notes, setNotes] = useState({});
  const [statementTypeMap, setStatementTypeMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const createNewQuizResponse = async (userId, quizId) => {
    const initialScores = scoreTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    const quizResponseBody = {
      user_id: userId,
      quiz_id: quizId,
      responses: {},
      notes: {},
      status: 'in progress',
      last_question_index: 0,
      total_scores: initialScores,
      started_at: new Date(),
      finished_at: null,
    };

    console.log(
      'Creating new quiz response - Request body:',
      JSON.stringify(quizResponseBody, null, 2)
    );

    try {
      // Create quiz response
      const quizResponseUrl = `${config.API_URL}/quiz-responses`;
      console.log('Creating new quiz response - URL:', quizResponseUrl);
      const quizResponse = await axios.post(quizResponseUrl, quizResponseBody);
      console.log('New quiz response created:', quizResponse.data);

      // Set the current quiz response ID
      const newQuizResponseId = quizResponse.data.id;
      setCurrentQuizResponseId(newQuizResponseId);

      // Create quiz taken entry
      const quizTakenBody = {
        user_id: userId,
        quiz_id: quizId,
        response_id: newQuizResponseId,
        taken_at: new Date().toISOString(),
      };

      const quizTakenUrl = `${config.API_URL}/quiz-taken`;
      console.log('Creating new quiz taken entry - URL:', quizTakenUrl);
      const quizTakenResponse = await axios.post(quizTakenUrl, quizTakenBody);
      console.log('New quiz taken entry created:', quizTakenResponse.data);

      return newQuizResponseId;
    } catch (error) {
      console.error(
        'Error creating new quiz response or quiz taken entry:',
        error
      );
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        console.log('❌ No user authenticated');
        return;
      }

      console.log('🔑 Authenticated user ID:', user.uid);

      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('📄 User document exists');
          const data = docSnap.data();
          console.log('📋 User data:', data);

          let userMongoId;

          if (data.mongoUserId) {
            userMongoId = data.mongoUserId;
            setMongoUserId(userMongoId);
          } else {
            console.log('⚠️ No MongoDB User ID found, creating one');
            userMongoId = await checkCreateUser(user);
            await setDoc(docRef, { mongoUserId: userMongoId }, { merge: true });
            setMongoUserId(userMongoId);
          }

          // Proceed with fetching quiz responses
          try {
            const url = `${config.API_URL}/quiz-responses/${userMongoId}/${quizId}/latest`;
            console.log('🔍 Fetching latest quiz response - URL:', url);
            const response = await axios.get(url);
            console.log('📊 Latest quiz response data:', response.data);

            if (response.data) {
              if (response.data.status === 'finished') {
                console.log(
                  '🔄 Existing finished quiz found. Creating a new one.'
                );
                const newResponseId = await createNewQuizResponse(
                  userMongoId,
                  quizId
                );
                setCurrentQuizResponseId(newResponseId);
                setResponses({});
                setNotes({});
                setCurrentQuestionIndex(0);
              } else {
                setCurrentQuizResponseId(response.data._id);
                setResponses(response.data.responses || {});
                setNotes(response.data.notes || {});
                setCurrentQuestionIndex(
                  response.data.last_question_index || initialQuestionIndex
                );
              }
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log('🆕 No quiz response found, creating a new one.');
              const newResponseId = await createNewQuizResponse(
                userMongoId,
                quizId
              );
              setCurrentQuizResponseId(newResponseId);
              setCurrentQuestionIndex(initialQuestionIndex);
            } else {
              console.error('❌ Error fetching quiz response:', error);
            }
          }
        } else {
          console.log('❌ No Firestore document found for this user');
        }
      } catch (error) {
        console.error('❌ Error fetching Firestore document:', error);
      }
    };

    fetchUserData();
  }, [user, quizId, initialQuestionIndex]);

  const checkCreateUser = async (user) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/users/check-create`,
        {
          alamatEmail: user.email,
          role: 'user',
          namaLengkap: user.displayName || '',
          userPhoto: user.photoURL || '',
        }
      );
      return response.data.id;
    } catch (error) {
      console.error('Error checking/creating user:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setIsLoading(true);

        // Fetch quiz metadata
        const metadataResponse = await axios.get(
          `${config.API_URL}/quizzes/${quizId}`
        );

        // Fetch quiz statements and other details
        const statementsResponse = await axios.get(
          `${config.API_URL}/quiz/${quizId}`
        );

        // Combine the data
        const combinedQuizData = {
          ...metadataResponse.data,
          ...statementsResponse.data,
        };

        setQuizData(combinedQuizData);
        setStatementTypeMap(metadataResponse.data.statementTypeMap || {});

        console.log('Combined quiz data:', combinedQuizData);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  if (isLoading) {
    return <div>Loading quiz data...</div>;
  }

  if (!quizData || !quizData.quiz_statements) {
    return <div>Error: Quiz data is incomplete</div>;
  }

  const handleAnswerClick = (index) => {
    if (isLoading || !quizData.quiz_statements) {
      console.log('Quiz data is still loading or incomplete. Please wait.');
      return;
    }
    let score;
    const statement = quizData.quiz_statements[currentQuestionIndex];

    if (statement.polarity === 1) {
      score = index + 1; // For positive polarity, score is 1 to 5
    } else {
      score = 5 - index; // For negative polarity, score is 5 to 1
    }

    const newResponses = { ...responses, [statement.id]: score };
    const newNotes = { ...notes, [statement.id]: noteText };
    setResponses(newResponses);
    setNotes(newNotes);

    if (currentQuestionIndex < quizData.quiz_statements.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setNoteText('');
      saveProgress(
        newResponses,
        newNotes,
        currentQuestionIndex + 1,
        'in progress'
      );
    } else {
      const totalScores = calculateScores(newResponses);
      saveProgress(
        newResponses,
        newNotes,
        currentQuestionIndex + 1,
        'finished',
        totalScores
      );
      onQuizComplete(totalScores);
    }
  };

  const saveProgress = async (
    responses,
    notes,
    lastQuestionIndex,
    status,
    totalScores = {}
  ) => {
    try {
      if (!currentQuizResponseId) {
        console.error('No current quiz response ID available');
        return;
      }

      const url = `${config.API_URL}/quiz-responses/${currentQuizResponseId}`;
      // console.log('💾 Saving progress - URL:', url);
      const requestBody = {
        user_id: mongoUserId,
        quiz_id: quizId,
        responses: responses,
        notes: notes,
        status: status,
        last_question_index: lastQuestionIndex,
        total_scores: totalScores,
        started_at: new Date(),
        lastaccessed_at: new Date(),
        finished_at: status === 'finished' ? new Date() : null,
      };
      // console.log(
      //   '📤 Save progress request body:',
      //   JSON.stringify(requestBody, null, 2)
      // );
      const response = await axios.put(url, requestBody);
      console.log('✅ Progress saved #', requestBody.last_question_index);
    } catch (error) {
      console.error('❌ Error saving progress:', error);
    }
  };

  // Update the calculateScores function to use the correct data structure
  const calculateScores = (responses) => {
    if (!statementTypeMap || Object.keys(statementTypeMap).length === 0) {
      console.error('Statement type map is not available');
      return quizData.score_types.reduce((acc, type) => {
        acc[type] = 0;
        return acc;
      }, {});
    }

    const scores = quizData.score_types.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    for (const [statementId, score] of Object.entries(responses)) {
      const statement = quizData.quiz_statements.find(
        (s) => s.id === parseInt(statementId)
      );
      if (statement) {
        scores[statement.type] += score;
      }
    }

    return scores;
  };

  if (currentQuestionIndex >= quizData.quiz_statements.length) {
    return <div>Error: Invalid question index</div>;
  }

  const progress =
    ((currentQuestionIndex + 1) / quizData.quiz_statements.length) * 100;

  return (
    <div className='quiz-container'>
      <p>
        Anda dapat mengerjakan quiz ini dalam beberapa sesi. Jika Anda
        meninggalkan halaman ini, maka saat Anda kembali lagi, Anda dapat
        langsung melanjutkan tanpa memulai dari awal.
      </p>
      <div className='progress mb-3'>
        <div
          className='progress-bar progress-bar-striped bg-success'
          role='progressbar'
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {progress.toFixed(0)}%
        </div>
      </div>

      <div className='question-container'>
        <div className='options'>
          {['Nggak Banget', 'Nggak', 'Netral', 'Iya', 'Iya Banget'].map(
            (option, index) => (
              <button key={option} onClick={() => handleAnswerClick(index)}>
                {option}
              </button>
            )
          )}
        </div>
        <h3>{quizData.quiz_statements[currentQuestionIndex].statement_id}</h3>
        <input
          type='text'
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder='Catatan Anda...'
          className='mt-3 answer-input'
        />
      </div>
      <p style={{ textAlign: 'center' }}>
        {currentQuestionIndex + 1} dari {quizData.quiz_statements.length}{' '}
        pertanyaan terlampaui.
      </p>
    </div>
  );
};

QuizTypeA.propTypes = {
  quizId: PropTypes.string.isRequired,
  scoreTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onQuizComplete: PropTypes.func.isRequired,
  initialQuestionIndex: PropTypes.number,
};

export default QuizTypeA;
