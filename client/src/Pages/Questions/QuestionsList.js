import React, { useEffect } from "react";

import "./QuestionsList.css";
import { MdAccountCircle } from "react-icons/md";

function QuestionsList({ show }) {
  return (
    <div className="question">
      <div className="question__user">
        <MdAccountCircle style={{ fontSize: 58 }} className="MdAccountCircle" />
        <span>{show?.user_name}</span>
      </div>
      <div>
        <p>
          {show?.question ||
            show?.answer ||
            "['the question/answer goes here]'?"}
        </p>
      </div>
    </div>
  );
}

export default QuestionsList;
