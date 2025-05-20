import { useForm } from "react-hook-form";
import { useStoreCommentMutation } from "../hooks/Query/commentQueryHooks";
import { useEffect } from "react";
import Input from "../components/Input";

function CommentForm({ postId }) {
  const { handleSubmit, register, resetField, setValue } = useForm();
  const storeCommentMutation = useStoreCommentMutation(postId);

  useEffect(() => {
    setValue("postId", postId);
  }, []);

  const handleCommentSubmitClick = (data) => {
    storeCommentMutation.mutate(data, {
      onSuccess: () => {
        resetField("text");
      },
    });
  };

  return (
    <form
      className="flex w-full"
      onSubmit={handleSubmit(handleCommentSubmitClick)}>
      <Input
        register={register("text", { required: true })}
        type="text"
        className="w-full border-none bg-transparent p-0 placeholder:text-xs focus:outline-0"
        placeholder={"Type Comment"}
      />
      <Input
        type="text"
        hidden={true}
        register={register("postId", { required: true })}
      />
      <button className="ml-auto font-semibold text-blue-400">Post</button>
    </form>
  );
}

export default CommentForm;
