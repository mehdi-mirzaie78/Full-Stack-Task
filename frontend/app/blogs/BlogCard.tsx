import Link from "next/link";
import React from "react";

interface Props {
  id: number;
  user: string;
  title: string;
  content: string;
  image: string;
}

const BlogCard = ({ id, user, title, image }: Props) => {
  return (
    <div className="my-10 mx-5 flex-row max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`blogs/${id}`}>
        <div>
          <img
            className="rounded-t-lg w-96 h-96 object-cover"
            src={image}
            alt={title}
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex flex-row justify-between mb-2">
          <Link href={`blogs/${id}`}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </Link>
          <h5 className="bg-indigo-100 text-indigo-800 text-xl font-medium px-2 dark:bg-indigo-900 dark:text-indigo-300 rounded-md">
            {user}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
