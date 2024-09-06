import Link from "next/link";
import BlogCard from "./BlogCard";
import { BASE_API_URL } from "../constants/config";
import { Blog } from "../interfaces/Blog";
import { Response } from "../interfaces/Response";

const BlogsPage = async () => {
  const res = await fetch(`${BASE_API_URL}/blogs/`, {
    cache: "no-store",
  });

  const data: Response<Blog> = await res.json();

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>Blogs</h1>
        <Link href={"/blogs/new"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            New Blog
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center">
        {data.results.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default BlogsPage;
