import { Blog } from "@/app/interfaces/Blog";
import React from "react";
import BlogCard from "../BlogCard";
import Link from "next/link";

interface Props {
  params: { id: number };
}

const BlogDetailPage = async ({ params: { id: pk } }: Props) => {
  const res = await fetch(`http://127.0.0.1:8000/api/blogs/${pk}`, {
    cache: "no-store",
  });
  const blog: Blog = await res.json();
  const { id, user, title, content, image, createdAt, updatedAt } = blog;
  return (
    <>
      <Link href={"/blogs"}>
        <button className="m-5 border p-2 rounded">Go Back</button>
      </Link>
      <div className="mx-auto my-10 flex-row max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="rounded-t-lg mx-auto object-cover"
          src={image}
          alt={title}
        />

        <div className="p-5">
          <div className="flex flex-row justify-between mb-2">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>

            <h5 className="bg-indigo-100 text-indigo-800 text-xl font-medium px-2 dark:bg-indigo-900 dark:text-indigo-300 rounded-md">
              {user}
            </h5>
          </div>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {content}
          </p>

          <div className="text-center border-t-2 border-neutral-100 pt-4 text-surface/75 dark:border-white/10 dark:text-neutral-300">
            {createdAt.toString().substring(0, 10)}{" "}
            {createdAt.toString().substring(11, 16)}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
