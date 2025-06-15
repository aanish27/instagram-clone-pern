import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiFaceSmile } from "react-icons/ci";
import Input from "../../../components/Input";
import { useStoreCommentMutation } from "../../../hooks/query/commentQueryHooks";

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
    <div className="flex items-center justify-center">
      <CiFaceSmile className="text-2xl" />
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
    </div>
  );
}

export default CommentForm;
