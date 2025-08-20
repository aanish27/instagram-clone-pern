import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { RiLinkM } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import Input from "../../../components/Input";
import useToggleModal from "../../../hooks/useToggleModal";
import { useGetConnectionsQuery } from "../../follow/followQueryHooks";
import { setIsShareModalOpen } from "../uiSlice";
import ShareLink from "./ShareLink";

function ShareModal() {
  const { register } = useForm();
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetConnectionsQuery();
  const { isShareModalOpen } = useSelector((state) => state.ui);
  useToggleModal(isShareModalOpen, "shareModal");

  const modalOnClose = (e) => {
    if (e.type == "keydown" && e.code !== "Escape") {
      return;
    }
    dispatch(setIsShareModalOpen(false));
  };

  return (
    <dialog
      id="shareModal"
      className="modal"
      onKeyDown={modalOnClose}
      onClick={modalOnClose}>
      <div
        className="modal-box bg-insta-black overflow-clip"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-center text-lg capitalize">share</h3>
        <hr className="my-2 w-full"></hr>
        <div className="flex flex-col gap-3">
          <form className="flex gap-2">
            <Input
              register={register("followee")}
              type={"text"}
              placeholder={"Search"}
              className={
                "input input-ghost h-10 w-[100%] rounded-lg bg-[#3d3a3c] focus:bg-[#3d3b3c]"
              }
            />
            <button> Search</button>
          </form>
          <div className="flex h-[25vh] max-h-[20vh] flex-wrap items-center justify-between gap-4 overflow-scroll overflow-x-hidden">
            {isSuccess &&
              data?.map((connection) => {
                return (
                  <Avatar
                    key={connection.id}
                    size={"h-20 w-20"}
                    img={connection.profile_pic}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <ShareLink icon={<RiLinkM />} title={"Copy Link"} />
          <ShareLink icon={<FaFacebook />} title={"Facebook"} />
          <ShareLink icon={<FaFacebookMessenger />} title={"Messenger"} />
          <ShareLink icon={<FaWhatsapp />} title={"Whatsapp"} />
          <ShareLink icon={<CiMail />} title={"Email"} />
          <ShareLink icon={<FaThreads />} title={"Threads"} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={modalOnClose}>
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default ShareModal;
