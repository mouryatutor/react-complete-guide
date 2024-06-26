import QUESTIONS from '../question.js';
import { useCallback, useState } from 'react';
import quizComplete from '../assets/quiz-complete.png';
import QuestionTimeout from './QuestionTimeout.jsx';

export default function Quiz() {

    const [selectedAnswer, setSelectedAnswers] = useState([]);
    const activeQuestionIndex = selectedAnswer.length;
    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

    if(isQuizCompleted) {
        return (
            <div id="summary">
                <img src={quizComplete} alt="Quiz Completed" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }


    const suffledQuestions = [...QUESTIONS[activeQuestionIndex].answers];
    suffledQuestions.sort((q1,q2) =>  Math.random() - 0.5);

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setSelectedAnswers((prevSelectedAnswers) => {
            return [...prevSelectedAnswers, selectedAnswer];
        })
    },[])

    const skipNextAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer]);
    

    return (
       <div id='quiz'>
          <div id='questions'>
            <QuestionTimeout 
                key={activeQuestionIndex}
                timeout={10000}
                onTimeout={skipNextAnswer}    
            />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id='answers'>
                {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
                    <li key={answer} className='answer'>
                        <button onClick={handleSelectAnswer}>
                            {answer}
                        </button>
                    </li>
                ))} 
            </ul>
           </div>
       </div>
    )
    
}