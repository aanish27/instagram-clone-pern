import { useForm } from "react-hook-form";
import { useStoreCommentMutation } from "../hooks/Query/commentQueryHooks";
import { useEffect } from "react";

function CommentForm({ postId }) {
  const { handleSubmit, register, reset, setValue } = useForm();
  const storeCommentMutation = useStoreCommentMutation(postId);

  useEffect(() => {
    setValue("postId", postId);
  }, []);

  const handleCommentSubmitClick = (data) => {
    storeCommentMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      className="flex w-full"
      onSubmit={handleSubmit(handleCommentSubmitClick)}>
      <input
        type="text"
        {...register("text", { required: true })}
        className="w-full px-1 placeholder:text-xs focus:outline-0"
        placeholder="Type Comment"
      />

      <input type="text" hidden {...register("postId", { required: true })} />
      <button className="ml-auto font-semibold text-blue-400">Post</button>
    </form>
  );
}

export default CommentForm;
