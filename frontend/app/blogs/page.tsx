import React from "react";
import BlogCard from "./BlogCard";
import { Blog } from "../interfaces/Blog";
import { Response } from "../interfaces/Response";
import Link from "next/link";

const BlogsPage = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/blogs/", {
    cache: "no-store",
  });
  const data: Response<Blog> = await res.json();

  return (
    <>
      <div className="mx-10 my-10 flex flex-row justify-between">
        <h1>Blogs</h1>
        <Link href={"/blogs/new"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            New Blog
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center">
        {data.results.map((blog) => BlogCard(blog))}
      </div>
    </>
  );
};

export default BlogsPage;
