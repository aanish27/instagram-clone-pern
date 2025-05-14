import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import Avatar from "../components/Avatar";
import { setIsOptionsModalOpen } from "../app/features/uiSlice";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../hooks/Query/userQueryHooks";
import { useEffect } from "react";
import { removeEmptyFields } from "../app/helpers";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function EditProfile() {
  const user = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();
  const userUpdateMutation = useUpdateUserMutation();
  const { register, setValue, handleSubmit, reset } = useForm();

  useEffect(() => {
    setValue("bio", user.bio);
    setValue("name", user.name);
    setValue("username", user.username);

    return () => {
      reset();
    };
  }, []);

  const changePictureOptions = [
    {
      title: "upload photo",
      onClick: {
        actionType: "updateAvatar",
        data: { username: user.username },
      },
      textColor: "text-blue-400",
    },
    {
      title: "remove current photo",
      onClick: {
        actionType: "deleteAvatar",
        data: { username: user.username },
      },
      textColor: "text-red-400",
    },
  ];

  const handleChangePictureClick = () => {
    dispatch(
      setIsOptionsModalOpen({
        props: { title: "change profile photo", options: changePictureOptions },
        state: true,
      }),
    );
  };

  const handleUserUpdateSubmit = (data) => {
    removeEmptyFields(data);
    userUpdateMutation.mutate(data);
  };

  return (
    <MainLayout>
      <div className="flex h-screen w-full flex-col items-center justify-center overflow-scroll">
        <div className="flex h-full w-[80vh] flex-col p-10">
          <h1 className="py-3 font-bold">Edit Proflie</h1>
          <div className="card card-border bg-insta-black mb-10 rounded-2xl">
            <div className="card-body">
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar
                    img={`${serverUrl}/${user.profile_pic}`}
                    size={"h-18 w-18"}
                  />
                  <div className="flex flex-col p-3">
                    <div className="font-semibold">{user.username}</div>
                    <div className="font-extralight text-gray-400">
                      {user.name}
                    </div>
                  </div>
                </div>
                <button
                  className="btn justify-end rounded-2xl bg-blue-500"
                  onClick={handleChangePictureClick}>
                  Change Photo
                </button>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleUserUpdateSubmit)}
            className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <div className="font-semibold">webite</div>
              <input
                type="text"
                className="input bg-insta-black w-full rounded-xl"
                name="website"
                disabled
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold">Email</div>
              <input
                type="text"
                className="input bg-insta-black w-full rounded-xl"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold capitalize">username</div>
              <input
                type="text"
                className="input bg-insta-black w-full rounded-xl"
                {...register("username")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold capitalize">name</div>
              <input
                type="text"
                className="input bg-insta-black w-full rounded-xl"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold capitalize">Bio</div>
              <input
                type="text"
                className="input bg-insta-black w-full rounded-xl"
                {...register("bio")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold capitalize">phone</div>
              <input
                type="text"
                className="input bg-insta-black w-full rounded-xl"
                {...register("phone")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold">Gender</div>
              <select className="input w-full rounded-xl bg-transparent">
                <option className="male">Male</option>
                <option className="female">Female</option>
                <option className="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold">
                Show account suggestions on profiles
              </div>
              <div className="border-insta-black rounded-2xl border shadow-sm">
                <div className="card-body flex-row items-center justify-center">
                  <div>
                    <h2 className="card-title">
                      Show account suggestions on profiles
                    </h2>
                    <p>
                      Choose whether people can see similar account suggestions
                      on your profile, and whether your account can be suggested
                      on other profiles.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
              </div>
            </div>
            <button className="btn ml-auto w-[50%] rounded-2xl bg-blue-500">
              Submit
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditProfile;
