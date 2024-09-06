"use client";

import { BASE_API_URL } from "@/app/constants/config";
import useAuthQueryStore from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const NewBlogPage = () => {
  const router = useRouter();
  const { access } = useAuthQueryStore((s) => s.authQuery);
  if (!access) router.push("/auth/login");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const response = await fetch(`${BASE_API_URL}/blogs/`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    const data = await response.json();

    if (data.status === 201) {
      router.push("/blogs");
    }
  };

  return (
    <form className="max-w-3xl mx-auto p-8 m-10" onSubmit={onSubmit}>
      <label className="block mb-2 text-sm font-medium" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        required
        className="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label className="block mb-2 text-sm font-medium" htmlFor="image">
        Upload Image
      </label>
      <input
        id="image"
        name="image"
        type="file"
        required
        className="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />

      <label className="block mb-2 text-sm font-medium" htmlFor="content">
        Content
      </label>
      <textarea
        id="content"
        name="content"
        className="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Type something ..."
      ></textarea>
      <div className="flex justify-center mt-5">
        <button type="submit" className="w-6/12 rounded-md btn btn-primary">
          Add
        </button>
      </div>
    </form>
  );
};

export default NewBlogPage;
