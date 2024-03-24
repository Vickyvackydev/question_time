import React from "react";
import Modal from "./modal";
import { FaTimes } from "react-icons/fa";

interface DeletemodalProps {
  openModal: boolean;
  closeModal: () => void;
  handleDelete: () => void;
}

//  resuable delete component to delete an todo data with the id
const Deletemodal = ({
  openModal,
  closeModal,
  handleDelete,
}: DeletemodalProps) => {
  return (
    <Modal isOpen={openModal} isClose={closeModal} maxWidth="w-[450px]">
      <div className="flex flex-col gap-4 items-center justify-center">
        <span className="flex justify-center items-center w-20 h-20 rounded-full border-4 border-red-400 text-5xl text-red-400">
          <FaTimes />
        </span>

        <span className="text-2xl font-medium text-gray-300">
          Are You Sure?
        </span>
        <div className="text-gray-300">
          <span>{`Do you really want to delete this Quiz question ?`} </span>
          <span>This process cannot be undone.</span>
        </div>

        <div className="flex gap-10 ">
          <button
            type="button"
            className="bg-gray-500 rounded-lg px-3 py-2  text-white font-semibold hover:scale-75 transition-all duration-300 mt-6"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 rounded-lg px-3 py-2  text-white font-semibold hover:scale-75 transition-all duration-300 mt-6"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Deletemodal;
// end...
