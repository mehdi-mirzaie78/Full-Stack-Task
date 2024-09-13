"use client";

import { Blog } from "@/app/interfaces/Blog";
import Image from "next/image";
import Link from "next/link";
import useAuthQueryStore from "@/app/store/authStore";
import { useEffect, useState } from "react";
import DateTime from "@/app/components/DateTime";
import { BASE_API_URL } from "@/app/constants/config";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: number };
}

const BlogDetailPage = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const { username: currentUser, access } = useAuthQueryStore(
    (state) => state.authQuery
  );
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const fetchedBlog: Blog = await res.json();
          setBlog(fetchedBlog);
          setIsOwner(fetchedBlog.user === currentUser);
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, currentUser]);

  if (loading) return <p>Loading...</p>;

  if (!blog) return <p>Blog not found.</p>;

  const { user, title, content, image, createdAt } = blog;

  const handleDelete = async () => {
    try {
      const resp = await fetch(`${BASE_API_URL}/blogs/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (resp.status === 204) {
        router.push("/blogs");
        router.refresh();
      } else {
        throw new Error("Failed to delete the blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="max-sm:mx-2 md:mx-5">
      <Link href="/blogs">
        <button className="btn btn-xs sm:btn-sm md:btn-md">Go Back</button>
      </Link>
      <div className="mx-auto my-5 sm:flex rounded-lg">
        <div className="sm:w-full md:w-2/4 flex justify-center">
          <div className="relative w-full h-80 md:h-96 lg:h-[700px]">
            <Image
              className="rounded-lg object-cover"
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>

        <div className="sm:w-full md:w-2/4 sm:px-1 md:px-5 py-5">
          <div className="flex justify-between align-middle">
            <div>
              <h5 className="first-letter:uppercase max-w-32 bg-indigo-100 text-indigo-800 text-xl font-medium px-2 dark:bg-indigo-900 dark:text-indigo-100 rounded-md">
                {user}
              </h5>
            </div>
            <div className="text-center text-slate-500 text-xs">
              Updated: <DateTime dateTimeString={blog.updatedAt} />
            </div>
          </div>

          <div className="flex-row justify-between mt-5">
            <h5 className="text-xl font-bold tracking-tight first-letter:uppercase">
              {title}
            </h5>
          </div>

          <p className="mt-1 font-normal text-gray-700 dark:text-gray-400 md:text-justify sm:text-sm">
            {content}
          </p>

          {/* Conditionally render the button */}
          {isOwner && access && (
            <>
              <div className="mt-5 flex justify-between">
                <button className="btn btn-sm btn-error" onClick={handleDelete}>
                  Delete
                </button>
                <Link
                  href={`/blogs/${id}/update`}
                  className="btn btn-sm btn-primary mr-2"
                >
                  Update
                </Link>
              </div>
              <div className="mt-5 text-center text-slate-500 text-xs">
                Created: <DateTime dateTimeString={createdAt} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
