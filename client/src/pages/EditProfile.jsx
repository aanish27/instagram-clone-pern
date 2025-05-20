import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import Avatar from "../components/Avatar";
import { setIsOptionsModalOpen } from "../app/features/uiSlice";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../hooks/Query/userQueryHooks";
import { useEffect } from "react";
import { removeEmptyFields } from "../app/helpers";
import Input from "../components/Input";
import Hint from "../components/Hint";
const serverUrl = import.meta.env.VITE_SERVER_URL;

function EditProfile() {
  const user = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();
  const userUpdateMutation = useUpdateUserMutation();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("bio", user.bio);
    setValue("name", user.name);
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("gender", user.gender);
    setValue("phone", user.phone);

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
              <div className="font-semibold">website</div>
              <Input
                type="text"
                register={register("website")}
                disable={true}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold capitalize">username</div>
              <Input
                type="text"
                placeholder="Username"
                register={register("username", {
                  required: "Username cannot be empty",
                })}
              />
              {errors && errors.username && (
                <Hint message={errors.username.message} />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold capitalize">name</div>
              <Input
                type="text"
                placeholder="Name"
                register={register("name", {
                  required: "Name cannot be empty.",
                })}
              />
              {errors && errors.name && <Hint message={errors.name.message} />}
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold capitalize">Bio</div>
              <Input
                type="text"
                placeholder="Bio"
                register={register("bio", { maxLength: 100 })}
              />
              {errors && errors.bio && <Hint message={errors.bio.message} />}
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold">Gender</div>
              <select
                className="select w-full rounded-xl bg-transparent"
                {...register("gender")}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold">Email</div>
              <Input
                type="text"
                placeholder="Email"
                register={register("email", {
                  required: "Email cannot be empty",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors && errors.email && (
                <Hint message={errors.email.message} />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-semibold capitalize">phone</div>
              <Input
                type="text"
                placeholder="Phone"
                register={register("phone", {
                  required: "Phone number cannot be empty",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />
              {errors && errors.phone && (
                <Hint message={errors.phone.message} />
              )}
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
