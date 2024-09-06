import Link from "next/link";
import React from "react";
import { Blog } from "../interfaces/Blog";

interface Props {
  blog: Blog;
}

const BlogCard = ({ blog }: Props) => {
  const { id, image, title, user } = blog;
  const maxLength = 20;

  const words = title.split(" ");
  let count = 0;
  let summerized = "";
  words.forEach((word) => {
    count += word.length + 1;
    if (count <= maxLength) summerized += word + " ";
    else return;
  });

  return (
    <div className="m-5 flex-row max-w-sm border bg-slate-200 border-gray-200 rounded-lg shadow">
      <Link href={`blogs/${id}`}>
        <div>
          <img
            className="rounded-t-lg w-96 h-96 object-cover"
            src={image}
            alt={summerized}
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between mb-2">
          <Link href={`blogs/${id}`}>
            <h5 className="text-2xl font-bold tracking-tight">{summerized}</h5>
          </Link>
          <h5 className="bg-indigo-100 text-indigo-800 text-xl font-medium px-2 dark:bg-indigo-900 dark:text-indigo-100 rounded-md">
            {user}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
