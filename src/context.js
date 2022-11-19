import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0)
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    amount: "",
    category: "",
    difficulty: "",
  });

  const [error, setError] = useState({
    color: "",
    message: "",
    duration:""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    const { amount, category, difficulty } = quiz;
    e.preventDefault();

    if (!amount) {
      setAlert("danger",  "Amount is required" );
    } else if (!category) {
      setAlert("danger",  "Category is required" );
    } else if (!difficulty) {
      setAlert("danger",  "Difficulty is required" );
    } else {
      const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple`;
      fetchQuestion(url);
    }
  };

  const setAlert = (color = "", message = "", duration=3) => {
    setError({ color, message,duration });
  };


  const fetchQuestion = async (url) => {
    setLoading(true);
    const response = await axios(url).catch((err) => console.log(err));
    if (response.data.results) {
      console.log(response.data.results);
      setQuestions(response.data.results);
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{ quiz, questions, loading, error,index, handleChange, handleSubmit }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
