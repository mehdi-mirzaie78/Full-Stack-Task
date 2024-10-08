"use client";

import { BASE_API_URL } from "@/app/constants/config";
import useAuthQueryStore from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const NewBlogPage = () => {
  const router = useRouter();
  const { access } = useAuthQueryStore((s) => s.authQuery);
  const [isClient, setIsClient] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null); // 'success' or 'error'

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !access) {
      router.push("/auth/login");
    }
  }, [isClient, access, router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${BASE_API_URL}/blogs/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        Object.keys(data).map((key) => {
          setAlertType("error");
          setAlertMessage(data[key]);
        });
        throw new Error("Failed to create blog");
      }

      setAlertMessage("Blog created successfully!");
      setAlertType("success");
      setTimeout(() => router.push("/blogs"), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isClient || !access) return null;

  return (
    <>
      <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight">
        Create New Blog
      </h2>
      {alertMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white ${
            alertType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          role="alert"
        >
          {alertMessage}
        </div>
      )}
      <form
        className="max-w-3xl mx-auto p-2 md:p-8 m-10 text-xs md:text-md"
        onSubmit={onSubmit}
      >
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
    </>
  );
};

export default NewBlogPage;
