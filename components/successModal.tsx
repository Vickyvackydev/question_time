import React from "react";
import Modal from "./modal";
import { FaCheck, FaCheckCircle, FaTimes } from "react-icons/fa";

interface SucessModalProps {
  openModal: boolean;
  closeModal: () => void;
  mode: string;
}

//  resuable delete component to delete an todo data with the id
const SuccessModal = ({ openModal, closeModal, mode }: SucessModalProps) => {
  return (
    <Modal isOpen={openModal} isClose={closeModal} maxWidth="w-[450px]">
      <div className="flex flex-col gap-4 items-center justify-center">
        <span className="flex justify-center items-center w-20 h-20 rounded-full border-4 border-green-500 text-5xl text-green-500">
          <FaCheckCircle />
        </span>

        <span className="text-2xl font-medium text-gray-300">
          {`Question ${mode}ed`}
        </span>
        <div className="text-gray-300">
          <span>{`Question has being ${mode}ed successfully `}</span>
          <span>Kindly refresh the page to view your changes.</span>
        </div>

        <div className="flex gap-10 ">
          <button
            type="button"
            className=" rounded-lg px-3 py-2  text-green-500 font-semibold hover:scale-75 transition-all duration-300 mt-6"
            onClick={closeModal}
          >
            Ok Got it
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
// end...
