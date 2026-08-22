import { Cog, Volume2 } from "lucide-react";
import { useState } from "react";
import { Button, Modal, Switch } from "antd";
import { useGameStore } from "~/stores/gameStore";

export default function Setting() {
  const soundSettings = useGameStore((state) => state.soundSettings);
  const setSoundSettings = useGameStore((state) => state.setSoundSettings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 text-center sm:px-6 sm:py-8">
      <div className="flex justify-end items-center">
        <div className="bg-[#E2E8F0]">
          <Button type="primary" onClick={showModal}>
            <Cog />
          </Button>
          <Modal
            className="text-center"
            title="Setting"
            closable={false}
            open={isModalOpen}
            footer={null}
          >
            <div className="absolute top-4 right-4">
              <Button type="primary" shape="round" onClick={handleOk}>
                Done
              </Button>
            </div>

            <span className="flex w-full max-w-xl items-center justify-center">
              <span className="flex-1 h-px bg-gray-200" />
            </span>
            <div className="flex gap-2 items-center py-2">
              <Volume2 />
              <h3>Sound & Music</h3>
            </div>
            <div className="border rounded-lg bg-[#F8FAFC] p-2">
              <div className="flex justify-between items-center">
                <span className="flex gap-2 p-2">
                  <Volume2 />
                  Sound Effects
                </span>
                <span>
                  <Switch
                    checked={soundSettings.soundEffects}
                    onChange={(checked) =>
                      setSoundSettings({
                        ...soundSettings,
                        soundEffects: checked,
                      })
                    }
                  />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex gap-2 p-2">
                  <Volume2 />
                  Party Music
                </span>
                <span>
                  <Switch
                    checked={soundSettings.partyMusic}
                    onChange={(checked) =>
                      setSoundSettings({
                        ...soundSettings,
                        partyMusic: checked,
                      })
                    }
                  />
                </span>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
