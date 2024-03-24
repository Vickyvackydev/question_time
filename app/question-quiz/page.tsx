"use client";
import React, { useEffect, useState } from "react";
import "@/components/animated.css";
import axios from "axios";
import { useToken } from "@/context/AuthToken";
import QuestionModal from "@/components/question-modal";
import Image from "next/image";
import { FaPen, FaTrash } from "react-icons/fa";
import { useFetchData } from "@/hooks/useFetchData";
import Deletemodal from "@/components/deleteModal";
import { motion } from "framer-motion";

const QuestionQuiz = () => {
  const { token } = useToken();

  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data: question, updateQuestionData } = useFetchData();

  const handleNextQuestion = () => {
    if (currentQuestion < Object.entries(question).length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleDeleteQuestion = async (id: any) => {
    try {
      const response = await axios.delete(
        `https://qt.organogram.app/questions/${id}`,
        {
          headers: {
            token: token,
          },
        }
      );

      const questionEntries = Object.entries(question);

      // Filter out the question entry with the specified Id
      const updatedQuestions = questionEntries.filter(
        ([key, value]) => key !== id
      );

      // Convert the filtered array back to an object
      const updatedQuestionObject = Object.fromEntries(updatedQuestions);

      // Update the question data with the new state
      updateQuestionData(updatedQuestionObject);
      console.log("question deleted");
    } catch (error) {
      console.log("could not delete question");
    }
  };

  const handleSelectQuestion = (data: any) => {
    setSelectedQuestion(data);
    setModal(true);
  };

  // if (loading) return "Loading...";
  return (
    <main className="flex justify-center items-center lg:my-10 mt-16 relative lg:px-0 px-6">
      <div
        className={` ${
          Object.keys(question)?.length > 0 ? "animated-border" : "border-none"
        } lg:w-[50vw] w-full   rounded-lg lg:h-[600px] h-full flex justify-center items-center `}
      >
        <div>
          {Object.keys(question)?.length > 0 && (
            <button
              className="bg-transparent rounded-lg px-3 py-2   font-semibold hover:scale-75 transition-all duration-300 float-right  text-pink-500"
              onClick={() => {
                setModal(true);
                setMode("Add");
                setSelectedQuestion(null);
              }}
            >
              {modal ? "" : " Add More"}
            </button>
          )}
        </div>
        {Object.keys(question)?.length > 0 ? (
          <div
            key={Object.keys(question)[currentQuestion]}
            className="flex justify-center items-center flex-col mt-[6rem]"
          >
            <span className="text-green-500 font-medium lg:text-xl text-lg">
              Question of the day 🎉🎉
            </span>
            <span className="lg:text-5xl text-gray-300 font-semibold text-xl">
              {question[Object.keys(question)[currentQuestion]]?.question} ?
            </span>

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, duration: 1 }}
              className=" grid lg:grid-cols-2 grid-cols-1 lg:gap-[7rem] gap-[2rem] mt-9 "
            >
              {question[Object.keys(question)[currentQuestion]]?.options.map(
                (option: string, index: number) => (
                  <span
                    key={index}
                    className="text-white border-pink-500 border-b-2 lg:w-[20vw] w-full rounded-xl text-center py-[1rem] hover:bg-green-500 hover:bg-opacity-25 transition-all duration-300 hover:cursor-pointer"
                  >
                    {option}
                  </span>
                )
              )}
            </motion.div>

            <div className="absolute lg:right-[22.5rem] right-3  flex flex-col gap-5">
              <button
                className="flex justify-center items-center w-10 h-10 rounded-full bg-green-500 text-white hover:scale-90 transition-all duration-300"
                onClick={() => {
                  handleSelectQuestion(Object.keys(question)[currentQuestion]);
                  setMode("Edit");
                }}
              >
                <FaPen />
              </button>
              <button
                className="flex justify-center items-center w-10 h-10 rounded-full bg-green-500 text-white hover:scale-90 transition-all duration-300"
                onClick={() => {
                  setDeleteModal(true);
                  setSelectedQuestion(Object.keys(question)[currentQuestion]);
                }}
              >
                <FaTrash />
              </button>
            </div>

            <div className="flex gap-10 mt-12">
              <div onClick={handlePrevQuestion}>
                <Image
                  src={"/play.svg"}
                  width={30}
                  height={30}
                  alt="next image"
                  className="scale-x-[-1] cursor-pointer transition-all duration-150"
                />
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-pink-500 text-2xl font-semibold">
                  {currentQuestion + 1}
                </span>{" "}
                <span className="text-gray-300"> /</span>
                <span className="text-gray-300 font-medium">
                  {Object.keys(question)?.length}
                </span>
              </div>
              <div onClick={handleNextQuestion}>
                <Image
                  src={"/play.svg"}
                  width={30}
                  height={30}
                  alt="next image"
                  className="cursor-pointer hover:scale-95 transition-all duration-150"
                />
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 360, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center items-center my-[15rem]  flex-col gap-3 "
          >
            <span className="lg:text-3xl text-xl  text-center font-semibold text-purple-500">
              Oops!! 😔, No Questions Available at the Moment.
            </span>
            <span className="lg:text-xl text-lg font-medium text-pink-500">
              {" "}
              Why Don't You Add One 👇
            </span>
            <button
              className="bg-green-500 rounded-lg px-3 py-2  text-white font-semibold hover:scale-75 transition-all duration-300 "
              onClick={() => {
                setModal(true);
                setMode("Add");
              }}
            >
              Add Question
            </button>
          </motion.div>
        )}
      </div>
      <QuestionModal
        OpenModal={modal}
        CloseModal={() => setModal(false)}
        mode={mode}
        selectedId={Object.keys(question)[currentQuestion]}
      />

      <Deletemodal
        closeModal={() => setDeleteModal(false)}
        openModal={deleteModal}
        handleDelete={() => {
          handleDeleteQuestion(Object.keys(question)[currentQuestion]);
          setDeleteModal(false);
        }}
      />
    </main>
  );
};

export default QuestionQuiz;
