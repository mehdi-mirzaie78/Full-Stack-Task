import React from "react";

const NewBlogPage = () => {
  return (
    <form className="max-w-3xl mx-auto p-8 m-10 border rounded-md">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="title"
      >
        Title
      </label>
      <input
        className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="title"
      />

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="image"
      >
        Upload Image
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="image_help"
        id="image"
        type="file"
      />

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="content"
      >
        Content
      </label>
      <textarea
        id="content"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Type something ..."
      ></textarea>
    </form>
  );
};

export default NewBlogPage;
