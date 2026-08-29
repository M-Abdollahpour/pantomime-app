import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import type { GameSettingProps } from "~/types/componentsType";

const GameSetting = ({
  title,
  icon,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: GameSettingProps) => {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="flex items-center gap-2">
        {icon}
        {title}
      </span>
      <span className="flex justify-center items-center gap-2">
        <Button
          shape="circle"
          type="primary"
          icon={<MinusOutlined />}
          disabled={value <= min}
          onClick={() => onChange(value - step)}
        />
        <span className="inline-block w-10 text-center">
          {value}
          {unit}
        </span>
        <Button
          shape="circle"
          type="primary"
          icon={<PlusOutlined />}
          disabled={value >= max}
          onClick={() => onChange(value + step)}
        />
      </span>
    </div>
  );
};

export default GameSetting;
