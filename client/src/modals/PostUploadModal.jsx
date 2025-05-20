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
import { IoClose, IoLocationOutline } from "react-icons/io5";
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

function PostUploadModal({ props }) {
  const { isEdit } = props;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [post, setPost] = useState(null);
  const [preview, setPreview] = useState();
  const authUser = useSelector((state) => state.auth.authUser);
  const storePostMutation = useStorePostMutation();
  const updatePostMutation = useUpdatePostMutation();
  const dispatch = useDispatch();

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
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(uploadedImage);
    setPreview(objectUrl);
    setValue("attachment", uploadedImage);
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedImage]);

  const handlePostUpload = (data) => {
    if (!isEdit) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      storePostMutation.mutate(formData, {
        onSuccess: () => {
          setUploadedImage(null);
          dispatch(setIsPostUploadModalOpen(false));
        },
      });
    } else {
      removeEmptyFields(data);
      updatePostMutation.mutate(post && post.id, data, {
        onSuccess: () => {
          setUploadedImage(null);
          dispatch(setIsPostEditModalOpen({ state: false, props: null }));
        },
      });
    }
  };

  const handleGoBackClick = () => {
    if (!isEdit) {
      setUploadedImage(null);
    } else {
      dispatch(setIsPostEditModalOpen({ state: false, props: null }));
    }
  };

  const modalOnClose = (e) => {
    if (e && e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    if (!isEdit) {
      dispatch(setIsPostUploadModalOpen(false));
    } else {
      dispatch(setIsPostEditModalOpen({ state: false, props: null }));
    }
  };

  return (
    <dialog
      id="postUploadModal"
      className="modal backdrop-blur"
      onKeyDown={modalOnClose}>
      {uploadedImage != null || isEdit ? (
        <div className="modal-box bg-insta-black flex h-[80vh] w-[60vw] max-w-[100vw] flex-col items-center justify-center p-0">
          <div className="flex w-[100%] justify-between bg-black p-2">
            <button onClick={handleGoBackClick}>
              {isEdit ? <IoClose /> : <FaArrowLeft />}
            </button>
            <h2>{isEdit ? "Edit Post" : "Create new Post"}</h2>
            <button
              type="submit"
              form="postUploadForm"
              className="font-semibold text-blue-500">
              {isEdit ? "Update" : "Share"}
            </button>
          </div>
          <div className="flex h-[100%] w-[100%]">
            <img
              src={isEdit ? (post ? post.attachment : "") : preview}
              className="w-[65%]"
            />
            <div className="flex w-[100%] flex-col p-2">
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
                className="w-[100%]">
                <textarea
                  className="h-35 w-[100%]"
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
        <div className="modal-box bg-insta-black flex flex-col items-center justify-center">
          <h2>Create new Post</h2>
          <hr className="m-1 w-100"></hr>
          <div {...getRootProps()} className="h-100 w-100">
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
        </div>
      )}
      <form method="dialog" className="modal-backdrop"></form>
    </dialog>
  );
}

export default PostUploadModal;
