import { useState } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "~/stores/gameStore";
import { Button, Modal } from "antd";

export default function CloseGame() {
  const resetAll = useGameStore((state) => state.resetAll);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/");
    resetAll();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="relative">
      <div className="absolute -left-84 top-0">
        <Button type="primary" danger ghost shape="circle" onClick={showModal}>
          X
        </Button>
        <Modal
          okType="danger"
          closable={false}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={"Yes, Exit"}
          cancelText={"No, Continue"}
        >
          <p className="font-bold">Cancel the game?</p>
          <p>All rounds and scores will be lost.</p>
          <p>You'll need to set up a new game</p>
        </Modal>
      </div>
    </div>
  );
}
