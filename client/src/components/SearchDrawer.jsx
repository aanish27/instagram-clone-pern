/* eslint-disable import/no-restricted-paths */
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdSearch } from "react-icons/io";
import DrawerLayout from "../app/layouts/DrawerLayout";
import { useSearchUsersQuery } from "../features/user/userQueryHooks";
import Input from "./Input";
import UserCardLayout from "./UserCardLayout";

function Search() {
  const [searchParams, setSearchParams] = useState(null);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    return () => {
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
    <DrawerLayout
      title={"Search"}
      body={
        <>
          <form onSubmit={handleSubmit(handleSearch)} className="flex gap-2">
            <Input
              register={register("search")}
              type={"text"}
              placeholder={"Search"}
            />
            <button className="bg-insta-black btn h-8 rounded-lg p-1 py-4">
              <IoMdSearch className="text-2xl" />
            </button>
          </form>
          {isSuccess &&
            data.map((user) => {
              return (
                <UserCardLayout
                  key={user.id}
                  username={user.username}
                  avatar={user.profile_pic}>
                  {""}
                </UserCardLayout>
              );
            })}
        </>
      }
    />
  );
}

export default Search;
