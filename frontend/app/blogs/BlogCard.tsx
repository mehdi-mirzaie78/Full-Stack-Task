import Image from "next/image";
import Link from "next/link";
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
    <div className="my-4 mx-2 flex-row max-w-sm border bg-slate-200 border-gray-200 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-100">
      <Link href={`blogs/${id}`}>
        <div>
          <Image
            className="rounded-t-lg w-96 sm:h-56 md:h-96  object-cover"
            src={image}
            alt={summerized}
            height={500}
            width={500}
            priority
          />
        </div>
      </Link>

      <div className="px-2 pt-3 md:px-5 md:py-4">
        <div className="flex justify-between mb-2">
          <Link href={`blogs/${id}`}>
            <h5 className="text-sm md:text-xl font-bold tracking-tight">
              {summerized}
            </h5>
          </Link>
          <h5 className="bg-indigo-100 text-indigo-800 text-sm md:text-xl font-medium px-2 dark:bg-indigo-900 dark:text-indigo-100 rounded-md h-3/4 first-letter:uppercase">
            {user}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
