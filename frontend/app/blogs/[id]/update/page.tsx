"use client";

import { BASE_API_URL } from "@/app/constants/config";
import { Blog } from "@/app/interfaces/Blog";
import useAuthQueryStore from "@/app/store/authStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  params: { id: number };
}

const UpdateBlogPage = ({ params: { id } }: Props) => {
  const router = useRouter();

  const { access, username } = useAuthQueryStore((s) => s.authQuery);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/blogs/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data: Blog = await res.json();
        setBlog(data);
        setIsLoading(false);

        if (username && data.user !== username) {
          router.push("/blogs");
        }
      } catch (error) {
        console.error(error);
        router.push("/blogs");
      }
    };

    if (isClient && access) {
      fetchBlog();
    }
  }, [id, username, access, isClient, router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`${BASE_API_URL}/blogs/${id}/`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    if (response.status === 200) {
      router.push(`/blogs/${id}`);
    } else {
      console.error("Failed to update the blog");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!isClient || !access || !blog) return null;

  return (
    <>
      <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight">
        Update Blog: {blog.title}
      </h2>
      <form
        className="max-w-3xl mx-auto p-2 md:p-8 text-xs md:text-md"
        onSubmit={onSubmit}
      >
        <Image
          className="rounded-t-lg w-96 sm:h-56 md:h-96  object-cover mx-auto"
          src={blog.image}
          alt={blog.title}
          height={500}
          width={500}
          priority
        />

        <label className="block mb-2 text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={blog.title}
          className="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label className="block mb-2 text-sm font-medium" htmlFor="image">
          Upload Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          className="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label className="block mb-2 text-sm font-medium" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={blog.content}
          className="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Type something ..."
        ></textarea>
        <div className="flex justify-center mt-5">
          <button type="submit" className="w-6/12 rounded-md btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateBlogPage;
