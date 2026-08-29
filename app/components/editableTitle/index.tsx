import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useGameStore } from "~/stores/gameStore";
import { Input } from "antd";

type TitleFormValues = {
  title: string;
};

const schema: yup.ObjectSchema<TitleFormValues> = yup
  .object({
    title: yup
      .string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(20, "Title must be at most 20 characters"),
  })
  .required();

export default function EditableTitle() {
  const gameTitle = useGameStore((state) => state.gameTitle);
  const setGameTitle = useGameStore((state) => state.setGameTitle);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TitleFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { title: gameTitle },
  });

  useEffect(() => {
    reset({ title: gameTitle });
  }, [gameTitle, reset]);
  const onSubmit = ({ title }: TitleFormValues) => {
    setGameTitle(title.toUpperCase());
  };

  return (
    <form className="relative" onBlur={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            className="font-bold text-2xl text-center border-none uppercase"
          />
        )}
      />
      {errors.title && (
        <small className="text-red-600 block text-center absolute left-0 -bottom">
          {errors.title.message}
        </small>
      )}
    </form>
  );
}
