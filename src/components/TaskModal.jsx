import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import TaskForm from "./TaskForm";

const TaskModal = ({ isOpen, onOpen, onClose, editId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaskForm onClose={onClose} editId={editId}></TaskForm>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
