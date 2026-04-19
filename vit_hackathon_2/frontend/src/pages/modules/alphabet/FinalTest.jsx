import { useEffect, useState } from "react";
import { finalTestApi } from "../../../api/finalTestApi";
import { useNavigate } from "react-router-dom";

export default function FinalTest() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await finalTestApi.getFinalTest();
        const list = Array.isArray(data?.questions) ? data.questions : [];
        if (!cancelled) setQuestions(list);
      } catch {
        if (!cancelled) setQuestions([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = {
      expected: questions[index],
      actual: value,
    };
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    const result = await finalTestApi.submitFinalTest(answers);
    localStorage.setItem("finalResult", JSON.stringify(result));
    navigate("/report");
  };

  return (
    <div className="page-backdrop min-h-full flex-1 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/50 bg-white/90 p-6 shadow-xl backdrop-blur-md transition dark:border-slate-600/60 dark:bg-slate-900/85">
        <h1 className="mb-6 text-center font-dyslexic text-3xl font-semibold tracking-wide text-slate-900 drop-shadow-sm dark:text-slate-50">
          Final test
        </h1>

        <div className="space-y-5">
          {questions.map((q, i) => (
            <div
              key={i}
              className="rounded-2xl border border-sky-100/90 bg-slate-50/90 p-5 shadow-sm transition hover:shadow-md dark:border-slate-600 dark:bg-slate-800/60"
            >
              <p className="mb-2 font-dyslexic tracking-wide text-slate-600 dark:text-slate-300">
                Type:
              </p>

              <p className="mb-3 font-dyslexic text-lg font-medium tracking-wide text-slate-800 dark:text-slate-100">
                {q}
              </p>

              <input
                className="w-full rounded-xl border border-indigo-100 bg-white/95 px-4 py-3 font-dyslexic text-[16px] leading-relaxed tracking-wide text-slate-900 transition duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
                placeholder="Type here..."
                onChange={(e) => handleChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 py-3 font-dyslexic text-lg text-white shadow-md transition duration-200 hover:scale-[1.02] hover:brightness-105"
          onClick={handleSubmit}
        >
          Submit final test
        </button>
      </div>
    </div>
  );
}
