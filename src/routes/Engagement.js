import React, { useEffect, useState } from 'react';
import 'animate.css/animate.css';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import moment from 'moment';

const Main = styled.div`
    margin=top: 10px;
    padding: 30px 0px;
    height: 630px;
    max-width: 100%;
    overflow: hidden;
`;

const DQWrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
    // box-shadow: 5px 5px 5px 5px;
`;

const DQHeader = styled.h2`
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 300;
`;

const BonusRibbon = styled.div``;

const DQForm = styled.div`
    background-color: lightgray;
    border: solid black 2px;
    padding: 20px 50px;
`;

const DQuestion = styled.div`
    width: 80%;
    background-color: #EFAE4B;
    padding: 20px 10px;
    border: dashed green 2px;
    margin: 0 auto 20px;
    font-size: 28px;
    font-weight: 800;
`;

const DQAnswerLayout = styled.div`
    display: flex;
    height: 200px;
    justify-content: space-around;
    flex-wrap: wrap;

`;

const DQAnswer = styled.button`
    width: 50%;
    background-color: purple;
    border-radius: 20px;
    color: white;
`;

const AnsweredRight = styled.div`
    background-color: green;
    padding: 50px;
    max-width: 500px;
    color: white;
    margin: 0 auto;
`;

const AnsweredWrong = styled.div`
    background-color: red;
    padding: 50px;
    max-width: 500px;
    color: white;
    margin: 0 auto;
`;

const hasBonus = false;
const dailyQuestion = {
    question: 'What is the capitol of Kenya?',
    connection: {
        connectionType: 'article',
        link: ''
    },
    answerType: 'multipleChoice', answers: [
        { text: 'Nairobi', isCorrect: true },
        { text: 'Kitui', isCorrect: false },
        { text: 'Dar Saloam', isCorrect: false },
        { text: 'Kilamanjaro', isCorrect: false },
    ]
}
// const connectionTypes = [ 'video', 'article' ];
// const answerTypes = [ 'multipleChoice' ];

function Engagement() {
    const [answeredStatus, setAnsweredStatus] = useState();
    const [hasAnsweredDailyQuestion, setHasAnsweredDailyQuesiton] = useState();
    const [showMessage, setShowMessage] = useState();
    const [messageExit, setMessageExit] = useState();
    const [dqFormExit, setDqFormExit] = useState();
    const [currentEngagement, setCurrentEngagement] = useState();

    useEffect(() => {
        initialize()
    }, []);

    const initialize = async () => {
        const data = await getDocs(collection(db, "engagement"));
        const engagements = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        let latest = { date: moment().subtract(1, 'year').format("YYYY-MM-DD") };
        engagements.forEach(e => {
            if (moment(latest.date).isBefore(e.date)) {
                latest = e;
            }
        });
        setCurrentEngagement(latest);
    }

    const selectAnswer = answer => {
        setDqFormExit(true);
        setTimeout(() => {
            setShowMessage(true);
            setTimeout(() => {
                setMessageExit(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 1000)
            }, 2500);
            setAnsweredStatus(answer.isCorrect);
            setHasAnsweredDailyQuesiton(true);
        }, 800)
    }

    return (
        <Main className='container'>
            {currentEngagement && (
                <>
                    {!hasAnsweredDailyQuestion && (
                        <DQWrapper >
                            <DQHeader>Daily Question</DQHeader>
                            {hasBonus && <BonusRibbon></BonusRibbon>}
                            <DQForm className={'animate__animated ' + (dqFormExit ? 'animate__bounceOutDown' : 'animate__zoomIn')}>
                                <DQuestion>{currentEngagement.question}</DQuestion>
                                <DQAnswerLayout>
                                    {currentEngagement.answerType && currentEngagement.answerType === 'multipleChoice' && (
                                        <>
                                            {currentEngagement.answers.length > 0 && currentEngagement.answers.map((answer, idx) => (
                                                <DQAnswer onClick={() => selectAnswer(answer)}>{answer.text}</DQAnswer>
                                            ))}
                                        </>
                                    )}
                                </DQAnswerLayout>
                            </DQForm>
                        </DQWrapper>
                    )}
                    {/* <h1 className='animate__animated animate__bounceIn'>This is the engagement page</h1> */}
                    {hasAnsweredDailyQuestion && showMessage && (
                        <>
                            {answeredStatus && (
                                <AnsweredRight className={'animate__animated ' + (messageExit ? 'animate__bounceOutLeft' : 'animate__bounceInRight')}>
                                    Congratulation! You got it right!
                                </AnsweredRight>
                            )}
                            {!answeredStatus && (
                                <AnsweredWrong className={'animate__animated ' + (messageExit ? 'animate__bounceOutRight' : 'animate__bounceInLeft')}>
                                    Sorry Wrong Answer!
                                </AnsweredWrong>
                            )}
                        </>
                    )}
                    {hasAnsweredDailyQuestion && !showMessage && (
                        // show post or video here
                        <div>article or video conection</div>
                    )}
                </>
            )}

        </Main>
    )
}

export default Engagement;