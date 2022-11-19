import Loading from "./component/Loading";
import QuizForm from "./component/QuizForm";
import { useGlobalContext } from "./context";

function App() {
  const { questions, loading, index } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }

  if (questions.length > 0) {
    const { question, incorrect_answers, correct_answer } = questions[index];
    let answers = [...incorrect_answers];
    const randomNumber = parseInt(Math.random() * (3 - 0) + 0);
    answers.splice(randomNumber,0,correct_answer);

    return (
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : 0/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question'>
          next question
        </button>
      </section>
    )
  }
  return (
    <main>
      <QuizForm />
    </main>
  );
}

export default App;
