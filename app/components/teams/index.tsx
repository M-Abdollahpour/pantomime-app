import { Input, Button } from "antd";
import { UsersRound } from "lucide-react";
import { GiAmericanFootballPlayer } from "react-icons/gi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import {
  UserOutlined,
  MinusOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { capitalString } from "~/utils/capitalString";
import type { TeamItemProps } from "~/types/gamePantoType";

const TeamItem = ({
  title,
  teams,
  onUpdateTeamName,
  onUpdateTeamPlayerCount,
  onUpdatePlayerName,
  onRemoveTeam,
}: TeamItemProps) => {
  return (
    <ul className="flex w-full max-w-xl flex-col gap-4">
      <div className="flex gap-2">
        <UsersRound />
        <span>{title}</span>
      </div>
      {teams.map((item) => (
        <li
          key={item.id}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border bg-[#F8FAFC] p-3 sm:p-4"
        >
          <div className="flex w-full flex-col gap-2 border-b py-2 sm:flex-row sm:items-center">
            <Avatar>
              <AvatarImage src="avatars/performing art.jpeg" alt="@pranathip" />
              <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              maxLength={10}
              showCount
              className="w-full rounded-lg border px-2 py-1"
              type="text"
              defaultValue={item.name}
              onBlur={(e) =>
                onUpdateTeamName(item.id, capitalString(e.target.value))
              }
            />
            {teams.length > 2 && (
              <Button
                onClick={() => onRemoveTeam(item.id)}
                type="primary"
                danger
                className="text-red-500"
                shape="circle"
                icon={<CloseOutlined />}
              />
            )}
          </div>

          <div className="border-b py-2 flex w-full justify-between">
            <span className="flex gap-2 items-center">
              <GiAmericanFootballPlayer />
              players
            </span>
            <span className="flex items-center gap-4">
              <Button
                onClick={() =>
                  onUpdateTeamPlayerCount(item.id, item.playerCount - 1)
                }
                type="primary"
                disabled={item.playerCount === 1}
                icon={<MinusOutlined />}
                shape="circle"
              />
              <span className="inline-block w-4 text-center">
                {item.playerCount}
              </span>
              <Button
                onClick={() =>
                  onUpdateTeamPlayerCount(item.id, item.playerCount + 1)
                }
                type="primary"
                disabled={item.playerCount === 10}
                icon={<PlusOutlined />}
                shape="circle"
              />
            </span>
          </div>

          <div className="w-full">
            <p className="flex items-center gap-2 py-2">
              <MdOutlineDriveFileRenameOutline />
              Named Members
            </p>
            <div className="flex flex-col gap-2">
              {item.players.map((player) => (
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  maxLength={10}
                  showCount
                  placeholder="Name"
                  key={player.id}
                  className="border rounded-lg px-2 py-1"
                  defaultValue={player.name}
                  onBlur={(event) =>
                    onUpdatePlayerName(
                      item.id,
                      player.id,
                      capitalString(event.target.value),
                    )
                  }
                />
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TeamItem;
