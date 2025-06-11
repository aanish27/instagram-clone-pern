import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import { useEffect } from "react";
import { closeSidebar, expandSidebar } from "../app/features/uiSlice";
import { useForm } from "react-hook-form";
import { useSearchUsersQuery } from "../hooks/Query/userQueryHooks";
import { useQueryClient } from "@tanstack/react-query";

function Search() {
  const [searchParams, setSearchParams] = useState(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(closeSidebar());

    return () => {
      dispatch(expandSidebar());
      queryClient.removeQueries("userSearch");
    };
  }, []);

  const { isSuccess, data, refetch } = useSearchUsersQuery(searchParams, {
    enabled: !!searchParams,
  });

  const handleSearch = (data) => {
    setSearchParams(data);
    refetch();
  };

  return (
    <div className="block max-h-screen w-[20vw] p-5">
      <div className="text-2xl font-extrabold">Search</div>
      <div className="mt-5">
        <form onSubmit={handleSubmit(handleSearch)}>
          <Input
            register={register("search")}
            type={"text"}
            placeholder={"Search"}
            className={
              "input input-ghost h-10 w-[100%] rounded-lg bg-[#3d3a3c] focus:bg-[#3d3b3c]"
            }
          />
          <button> Search</button>
        </form>
        <div className="hide-scroll-bar max-h-[80vh] overflow-y-scroll">
          {isSuccess &&
            data.map((user) => {
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={user.profile_pic}
                      alt=""
                      className="h-15 w-15 rounded-full"
                    />
                    <div className="flex flex-col p-3">
                      <div className="font-semibold">{user.name}</div>
                      <div className="font-extralight text-gray-400">
                        followed By
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Search;
