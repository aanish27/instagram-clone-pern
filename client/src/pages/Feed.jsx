import StoryRow from "../components/StoryRow";
import PostContainer from "../components/PostContainer";
import axios from "axios";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import RightSidebar from "../components/RightSidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotificationReload } from "../app/features/uiSlice";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

function Feed() {
  const dispatch = useDispatch();
  const { isError, data, error, isSuccess } = useQuery({
    queryKey: ["feed"],
    queryFn: () => axiosInstance.get("/post").then((res) => res.data),
  });

  if (isError) console.log(error);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/notifications/connect",
      {
        withCredentials: true,
      },
    );

    eventSource.onmessage = (event) => {
      console.log(event.data);
      dispatch(toggleNotificationReload());
    };

    return () => eventSource.close();
  }, []);

  return (
    <MainLayout>
      <main className="hide-scroll-bar my-10 max-h-screen w-full overflow-y-scroll p-1 md:my-0 md:px-5 lg:w-[40%]">
        <StoryRow />
        <div className="flex w-full flex-col items-center justify-center md:px-20">
          {isSuccess &&
            data &&
            data.map((post) => {
              return <PostContainer key={post.id} {...post} />;
            })}
        </div>
      </main>
      <RightSidebar />
    </MainLayout>
  );
}

export default Feed;
