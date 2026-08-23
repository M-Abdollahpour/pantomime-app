import { Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import type { FormAddTeamProps } from "~/types/gamePantoType";
import { TriangleAlert } from "lucide-react";

const FormAddTeam = ({
  onSubmit,
  control,
  errors,
  isMaxTeamsReached,
}: FormAddTeamProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-xl">
      <div className="flex w-full max-w-xl flex-col gap-3 rounded-lg border bg-[#F8FAFC] p-3 sm:flex-row">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              maxLength={10}
              showCount
              {...field}
              className="border rounded-lg px-2 py-1"
              placeholder="Team Name"
            />
          )}
        />
        <Button
          htmlType="submit"
          disabled={isMaxTeamsReached}
          className="w-full rounded-lg border px-4 py-2 sm:w-auto"
          type="primary"
        >
          Add Team
        </Button>
      </div>
      <div className="relative">
        <small className="text-red-600 absolute left-0 top-0 flex items-center gap-2">
          {errors.name?.message && <TriangleAlert />}
          {errors.name?.message}
        </small>
      </div>
    </form>
  );
};

export default FormAddTeam;
