import React, { useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { Post } from "../typing";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { sanityClient, urlFor } from "../sanity";
import { GetServerSideProps } from "next";
import { GoStar } from "react-icons/go";
import { Tooltip } from "react-tippy";

interface Props {
  posts: [Post];
}

function Search({ posts }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  return (
    <div className="mt-[90px]  font-poppins">
      <Header />
      <div className="mx-10">
        <div className="w-[100%]  m-auto py-10 relative">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="px-14 w-[100%] py-2 rounded-full border-gray-200 border-[1px] outline-none text-sm"
            type="text"
            placeholder="Search.."
            name=""
            id=""
          />
          <FiSearch className="absolute -translate-y-1/2 top-1/2  -translate-x-1/2 left-8 h-4" />
        </div>
      </div>
      {/* search */}

      <div className="mb-32 mx-10">
        {searchTerm !== "" && (
          <div className={`${searchTerm ? "" : "  "}`}>
            <h2 className="mt-4 capitalize font-bold text-xl">Search</h2>
            <hr />
            {posts
              .filter((val) => {
                if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                } else if (searchTerm == "") {
                  return val;
                }
              })
              .map((post) => {
                return (
                  <>
                    <div>
                      <Link
                        passHref
                        key={post._id}
                        href={`/post/${post.slug.current}`}
                      >
                        <div className="" key={post._id}>
                          <div className="flex items-center justify-between">
                            <div className="my-8 cursor-pointer ">
                              <div className="flex  justify-start items-center">
                                <img
                                  className="h-6  rounded-full"
                                  src={urlFor(post && post.author.image).url()!}
                                  alt=""
                                />
                                <span className="font-medium ml-2 text-xs capitalize">
                                  {post.author.name}
                                </span>
                                <GoStar className="h-[10px] ml-2 w-[10px]" />
                              </div>
                              <h2 className="text-md py-2 font-semibold word-breaks text-gray-900 hover:text-black duration-100">
                                {post.title}
                              </h2>

                              <h2 className="text-xs text-gray-500">
                                {" "}
                                {new Date(post._createdAt).toDateString()}{" "}
                              </h2>
                            </div>

                            <img
                              className="  object-cover cursor-pointer w-20 ml-10 h-20 rounded-md"
                              src={urlFor(post && post.mainImage).url()!}
                              alt="image"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                );
              })}
          </div>
        )}
      </div>
      {/* search */}
      {/* bottom section */}
      <div className="w-full z-50 block sm:hidden px-[30px] py-[20px] fixed bg-gray-100 shadow-md bottom-0">
        <div className="flex justify-between">
          <Link href="/">
            <div>{router.pathname === "/" ? <Homee /> : <HomePhone />}</div>
          </Link>
          {/* <Home /> */}
          <div>
            <Searchphone />
          </div>
          <Tooltip
            // options
            title="Not working yet"
            position="bottom"
            trigger="mouseenter"
            arrow={true}
            delay={300}
            hideDelay={0}
            distance={20}
          >
            <div>
              <Readinglist />
            </div>
          </Tooltip>
        </div>
      </div>
      {/* bottom section */}
    </div>
  );
}

export default Search;
function Searchphone() {
  return (
    <svg
      className="cursor-pointer text-gray-800 hover:text-black duration-100"
      width="25"
      height="24"
      fill="none"
      aria-label="search"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.8 10.69a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73a8.05 8.05 0 0 0-5.94-13.5z"
        fill="#A8A8A8"
      ></path>
    </svg>
  );
}
function HomePhone() {
  return (
    <svg
      className="cursor-pointer text-gray-800 hover:text-black duration-100"
      width="24"
      height="24"
      fill="none"
      aria-label="home"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.72 2.93a.45.45 0 0 1 .56 0l.34-.43-.34.43 9.37 7.5a.56.56 0 1 0 .7-.86l-9.38-7.5a1.55 1.55 0 0 0-1.94 0l-9.38 7.5a.56.56 0 0 0 .7.86l9.37-7.5zm7.17 9.13v-1.4l.91.69a.5.5 0 0 1 .2.4V20a2 2 0 0 1-2 2h-4a.5.5 0 0 1-.5-.5V17a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v4.5a.5.5 0 0 1-.5.5H6a2 2 0 0 1-2-2v-8.25a.5.5 0 0 1 .2-.4l.91-.68V20c0 .5.4.89.89.89h3.39V17a2.11 2.11 0 0 1 2.11-2.11h1A2.11 2.11 0 0 1 14.61 17v3.89H18a.89.89 0 0 0 .89-.89v-7.95z"
        fill="#A8A8A8"
      ></path>
    </svg>
  );
}
function Homee() {
  return (
    <svg
      className="cursor-pointer text-gray-800 hover:text-black duration-100"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="home"
    >
      <path
        d="M4.5 21.25V10.87c0-.07.04-.15.1-.2l7.25-5.43a.25.25 0 0 1 .3 0l7.25 5.44c.06.04.1.12.1.2v10.37c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v5.5c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      ></path>
      <path
        d="M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
function Readinglist() {
  return (
    <svg
      className="cursor-not-allowed text-gray-800 hover:text-black duration-100"
      width="25"
      height="24"
      viewBox="0 0 25 25"
      fill="none"
      aria-label="Reading list"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3a2 2 0 0 0-2 2v1H6a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4V8a2 2 0 0 0-2-2H9V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v12a.5.5 0 1 0 1 0V5a2 2 0 0 0-2-2h-9zM5 8a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v12.98l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V8z"
        fill="#757575"
      ></path>
    </svg>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query1 = `
      *[_type=="post"]{
        _id,
        title,
        _createdAt,
        author -> {
        name,
        image
      },
      description,
      mainImage,
      body,
      slug
      }`;
  const posts = await sanityClient.fetch(query1);

  return {
    props: {
      posts,
    },

    // revalidate: 60,
  };
};
