import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { CiFaceSmile } from "react-icons/ci";
// import RightSidebarItem from "./RightSidebarItem";
import profile_pic from "../assets/car.jpg";
import axios from "axios";
import { FetchPostContext } from "../provider/provider";

function PostUploadModal() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { isFetchAgain , setFetchAgain } = useContext(FetchPostContext);

  useEffect(() => {
    if (!uploadedImage) {
      setPreview(null);
      reset();
      return;
    }

    const objectUrl = URL.createObjectURL(uploadedImage);
    setPreview(objectUrl);
    setValue("attachment", uploadedImage);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedImage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handlePostUpload = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await axios
      .post("http://localhost:3000/post", formData, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data.message);
        setFetchAgain(!isFetchAgain)
        document.getElementById("postUploadModal").close();
        setTimeout(() => {
          setUploadedImage(null);
        }, 1000);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
      });
  };

  const handleGoBackClick = () => {
    setUploadedImage(null)
  }

  return (
    <dialog id="postUploadModal" className="modal backdrop-blur">
      {uploadedImage != null ? (
        <div className="modal-box bg-insta-black flex h-[80vh] w-[60vw] max-w-[100vw] flex-col items-center justify-center p-0">
          <div className="flex w-[100%] justify-between bg-black p-2">
            <button onClick={handleGoBackClick}>
              <FaArrowLeft />
            </button>
            <h2>Create new Post</h2>
            <button
              type="submit"
              form="postUploadForm"
              className="font-semibold text-blue-500">
              Share
            </button>
          </div>
          <div className="flex h-[100%] w-[100%]">
            <img src={preview} alt="" className="w-[65%]" />
            <div className="flex w-[100%] flex-col p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={profile_pic}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col p-3">
                    <div className="font-semibold">Aanish</div>
                  </div>
                </div>
              </div>
              <form
                id="postUploadForm"
                onSubmit={handleSubmit(handlePostUpload)}
                className="w-[100%]">
                <textarea
                  className="h-35 w-[100%]"
                  {...register("caption")}></textarea>
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
                <input
                  type="file"
                  className="hidden"
                  {...register("attachment")}
                />
              </form>
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
      {/* <form method="dialog" className="modal-backdrop">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
            ✕
          </button>T
        </form> */}
    </dialog>
  );
}

export default PostUploadModal;
