import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { CiFaceSmile } from "react-icons/ci";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { removeEmptyFields } from "../app/helpers";
import { IoLocationOutline } from "react-icons/io5";
import { LuContactRound } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import Hint from "../components/Hint";
import {
  useGetPostQuery,
  useStorePostMutation,
  useUpdatePostMutation,
} from "../hooks/Query/postQueryHooks";
import {
  setIsPostEditModalOpen,
  setIsPostUploadModalOpen,
} from "../app/features/uiSlice";
import Input from "../components/Input";
import PostUploadModalHeader from "../components/PostUploadModalHeader";

function PostUploadModal({ props }) {
  const { isEdit } = props;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [post, setPost] = useState(null);
  const [preview, setPreview] = useState();
  const authUser = useSelector((state) => state.auth.authUser);
  const { mutate: storePostMutation, isPending: storeIsPending } =
    useStorePostMutation();
  const { mutate: updatePostMutation, isPending: updateIsPending } =
    useUpdatePostMutation();
  const isPending = updateIsPending || storeIsPending;
  const dispatch = useDispatch();
  const [isSucceeded, setIsSucceeded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { data, isSuccess } = useGetPostQuery(props.id, {
    enabled: isEdit,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setPost(data);
      setPreview(data.attachment);
      setValue("caption", data.caption);
    }
  }, [isSuccess, data, setValue]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    if (!uploadedImage) {
      return;
    }
    const objectUrl = URL.createObjectURL(uploadedImage);
    setPreview(objectUrl);
    setValue("attachment", uploadedImage);
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedImage]);

  const handlePostUpload = (data) => {
    setPreview(null);
    if (!isEdit) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value.length === 0) return;
        formData.append(key, value);
      });
      removeEmptyFields(formData);
      storePostMutation(formData, {
        onSuccess: () => {
          setIsSucceeded(true);
        },
      });
    } else {
      removeEmptyFields(data);
      updatePostMutation(post && post.id, data, {
        onSuccess: () => {
          setIsSucceeded(true);
        },
      });
    }
  };

  const removeAttachment = () => {
    setUploadedImage(null);
    setPreview(null);
  };

  const modalOnClose = (e) => {
    if (e && e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    if (isEdit) {
      dispatch(setIsPostEditModalOpen({ state: false, props: null }));
    } else {
      dispatch(setIsPostUploadModalOpen(false));
    }
  };

  return (
    <dialog
      id="postUploadModal"
      className="modal backdrop-blur"
      onKeyDown={modalOnClose}>
      {preview ? (
        <div className="modal-box bg-insta-black flex min-h-[80vh] max-w-[60vw] flex-col p-0">
          <PostUploadModalHeader
            handleGoBackClick={isEdit ? modalOnClose : removeAttachment}
            isEdit={isEdit}
            showButton={true}
          />
          <div className="flex">
            <img src={preview} className="h-auto w-[65%]" />
            <div className="flex w-full flex-col p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar img={authUser.profile_pic} />
                  <div className="flex flex-col p-3">
                    <div className="font-semibold">{authUser.username}</div>
                  </div>
                </div>
              </div>
              <form
                id="postUploadForm"
                onSubmit={handleSubmit(handlePostUpload)}
                className="w-full">
                <textarea
                  className="h-35 w-full"
                  {...register("caption", { maxLength: 200 })}></textarea>
                <div className="flex items-center justify-between">
                  <div className="">
                    <CiFaceSmile className="" />
                    <div className="hidden">
                      <EmojiPicker />
                    </div>
                  </div>
                  <div className="text-xs font-extralight text-gray-500">
                    {watch("caption") ? `${watch("caption").length} / 200` : ""}
                  </div>
                </div>
                {!isEdit && (
                  <Input
                    register={register("attachment")}
                    type="file"
                    className="hidden"
                  />
                )}
              </form>
              {errors?.caption && <Hint message={errors.caption.message} />}
              <div className="my-5 flex flex-col gap-5">
                <div className="flex justify-between">
                  <div>Add Location</div>
                  <IoLocationOutline className="text-2xl" />
                </div>
                <div className="flex justify-between">
                  <div>Add Collaborators</div>
                  <LuContactRound className="text-2xl" />
                </div>
                <div className="flex justify-between">
                  <div>Accessibility</div>
                  <FaChevronDown className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-box bg-insta-black flex min-h-[50vh] max-w-[25vw] flex-col items-center p-0">
          <PostUploadModalHeader handleGoBackClick={modalOnClose} />
          {isPending && (
            <div className="flex grow items-center justify-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          )}
          {isSucceeded && (
            <div className="flex grow items-center justify-center">
              <div
                className="radial-progress text-green-400"
                style={{
                  "--value": "100",
                  "--size": "15rem",
                  "--thickness": "1rem",
                }}
                aria-valuenow={100}
                role="progressbar">
                Success
              </div>
            </div>
          )}
          {!uploadedImage && !isSucceeded && !isPending &&  (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="flex items-center justify-center">
                  <p>Drag photos here</p>
                </div>
              ) : (
                <div className="flex h-100 flex-col items-center justify-center gap-3">
                  <MdOutlinePhotoLibrary className="text-6xl" />
                  <p className="text-xl">Drag photos here</p>
                  <button className="btn btn-primary">
                    Select from computer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <form method="dialog" className="modal-backdrop"></form>
    </dialog>
  );
}

export default PostUploadModal;
