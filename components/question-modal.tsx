import React, { useState } from "react";
import Modal from "./modal";
import axios from "axios";
import { useToken } from "@/context/AuthToken";
import SuccessModal from "./successModal";

interface Props {
  OpenModal: boolean;
  CloseModal: () => void;
  mode: string;
  selectedId: any;
}
const QuestionModal = ({ OpenModal, CloseModal, mode, selectedId }: Props) => {
  const { token } = useToken();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const listedOptions = [...options];
    listedOptions[index] = value;
    setOptions(listedOptions);
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(
        "https://qt.organogram.app/questions",
        {
          question,
          options,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("questions added");
      setSuccessModal(true);
      setQuestion("");
      setOptions(["", "", "", ""]);
      CloseModal();
    } catch (error) {
      console.log("error creating question", error);
      setLoading(false);
    }
  };
  const handleEditQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `https://qt.organogram.app/questions/${selectedId}`,
        {
          question,
          options,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("questions updated");

      setSuccessModal(true);
      setQuestion("");
      setOptions(["", "", "", ""]);
      CloseModal();
    } catch (error) {
      console.log("error updating question", error);
      setLoading(false);
    }
  };
  return (
    <>
      <Modal isOpen={OpenModal} isClose={CloseModal} maxWidth="w-[400px]">
        <div>
          <span className="text-purple-500">Please fill in the details</span>

          <form
            className="flex flex-col gap-5 mt-5"
            onSubmit={
              mode !== "Edit" ? handleSubmitQuestion : handleEditQuestion
            }
          >
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="text-purple-300">
                Question
              </label>
              <input
                type="text"
                id="question"
                placeholder="question here..."
                value={question}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuestion(e.target.value)
                }
                className="w-full h-12 outline-none rounded-lg pl-3 border-b border-purple-500 bg-transparent placeholder:text-xs text-gray-300"
              />
            </div>

            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="text-purple-300">
                Option 1
              </label>
              <input
                type="text"
                id="option1"
                placeholder="option 1"
                value={options[0]}
                onChange={(e) => handleOptionChange(0, e.target.value)}
                className="w-full border-b h-12 outline-none rounded-lg pl-3 border-purple-500 bg-transparent placeholder:text-xs text-gray-300"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="text-purple-300">
                Option 2
              </label>
              <input
                type="text"
                id="option2"
                placeholder="option 2"
                value={options[1]}
                onChange={(e) => handleOptionChange(1, e.target.value)}
                className="w-full border-b h-12 outline-none rounded-lg pl-3 border-purple-500 bg-transparent placeholder:text-x text-gray-300"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="text-purple-300">
                Option 3
              </label>
              <input
                type="text"
                id="option3"
                placeholder="option 3"
                value={options[2]}
                onChange={(e) => handleOptionChange(2, e.target.value)}
                className="w-full border-b h-12 outline-none rounded-lg pl-3 border-purple-500 bg-transparent placeholder:text-xs text-gray-300"
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="" className="text-purple-300">
                Option 4
              </label>
              <input
                type="text"
                id="option4"
                placeholder="option 4"
                value={options[3]}
                onChange={(e) => handleOptionChange(3, e.target.value)}
                className="w-full border-b h-12 outline-none rounded-lg pl-3 border-purple-500 bg-transparent placeholder:text-xs text-gray-300"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 rounded-lg px-3 py-2  text-white font-semibold hover:scale-75 transition-all duration-300 mt-6"
            >
              {`${loading ? `${mode}ing...` : `${mode} question`}`}
            </button>
          </form>
        </div>
      </Modal>
      <SuccessModal
        openModal={successModal}
        closeModal={() => setSuccessModal(false)}
        mode={mode}
      />
    </>
  );
};

export default QuestionModal;
