import Link from "next/link";
import BlogCard from "./BlogCard";
import { BASE_API_URL } from "../constants/config";
import { Blog } from "../interfaces/Blog";

const BlogsPage = async () => {
  const res = await fetch(`${BASE_API_URL}/blogs/`, {
    cache: "no-store",
  });

  const data: Blog[] = await res.json();

  return (
    <div>
      <div className="flex flex-row justify-between mx-2">
        <h1 className="text-sm md:text-lg">Blogs</h1>
        <Link href={"/blogs/new"}>
          <button className="btn btn-primary btn-sm md:btn-md">New Blog</button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center">
        {data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
