import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Home.css";
import axios from "axios";
import QuestionsList from "../Questions/QuestionsList";
import { MdArrowForwardIos } from "react-icons/md";

const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [page, setPage] = useState("Home");
  const [allQuestions, setAllQuestions] = useState([]);
  let [currrentQuestion, setCurrrentQuestion] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
    // console.log(">>>>>>>>Home useEffect: 0");
    const fetchQuestions = async () => {
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 1");

      let questions = await axios.get(
        "http://localhost:4000/api/questions/all"
      );
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 2");

      // console.log(">>>>>>>>Fetched questions:", questions.data.data);

      questions = questions.data.data;
      console.log(">>>>>>>>Fetched questions:", questions);
      setAllQuestions(() => {
        return questions;
      });
    };
    fetchQuestions();
  }, [userData.user, navigate]);

  return (
    <div className="home">
      {/* show username in homepage */}
      <div className="home__top">
        {/* <Link to="/AskQuestion"> */}
        <button
          onClick={() => {
            navigate("/question");
          }}
          className="home_topBtn"
        >
          Ask Question
        </button>

        <h4>Welcome: {userData.user?.display_name}</h4>
      </div>
      {/* <button onClick={logout}>Log out</button> */}
      <h3 className="home__question">Questions</h3>
      <div> printed: {allQuestions[0]?.question_id}</div>
      <div className="home__questionLists">
        <div>
          {allQuestions?.map((question) => (
            <div key={question.question_id}>
              <div>{question.question}</div>
              <Link
                to={`/answer/questionId`}
                // to={`/answer/${question.question_id}`}
                // state prop used to pass the data along the link
                state={{
                  question: question,
                  currentUserId: userData.user?.id,
                }}
                className="Link"
              >
                <QuestionsList show={question} />
                <MdArrowForwardIos className="MdArrowForwardIos" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {allQuestions.length < 3 && <div className="home__questionListsBottom" />}
    </div>
  );
};

export default Home;
