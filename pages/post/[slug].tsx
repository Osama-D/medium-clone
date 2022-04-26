import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";
import newslettergif from "../../components/gifs/New message.gif";
import { useRouter } from "next/router";
import Image from "next/image";
import { BiUpArrow } from "react-icons/bi";
import { GoStar } from "react-icons/go";
import { BsTwitter } from "react-icons/bs";
import { GrFacebook } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { IoCopy } from "react-icons/io5";
import { BiErrorAlt } from "react-icons/bi";
import BlockContent from "@sanity/block-content-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import { FiSearch } from "react-icons/fi";
import { RiMailAddLine } from "react-icons/ri";
import { useAppContext } from "../../components/context";
import { VscClose } from "react-icons/vsc";
import { BsChevronLeft } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { db } from "../../components/firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";

// interface
interface Props {
  post: Post;
}
interface Props {
  posts: [Post];
}
// interface

// scroll to top
function scrolltotop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
// scroll to top

function Post({ post, posts }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [submited, setsubmited] = useState(false);
  const [sign, setsign] = useState(0);
  const [issending, setissending] = useState(false);
  const router = useRouter();
  const [usersetting, setusersetting] = useState(false);
  const [signup, setsignup] = useState(false);
  const {
    user,
    Emailuser,
    createUser,
    signInWithGoogle,
    signUpWithGoogle,
    logout,
    setfullname,
    fullname,
    // sign in & sign up
    handlesubmit,
    login,
    registeremail,
    setregisteremail,
    registerpassword,
    setregisterpassword,
    messageerr,
    setmessageerr,
    messageerr1,
    setmessageerr1,
    messageerr2,
    setmessageerr2,
    loginemail,
    setloginemail,
    loginpassword,
    setloginpassword,
    successlogin,
    setsuccesslogin,
    // sign in & sign up
  } = useAppContext();
  const [sentpopup, setsentpopup] = useState(false);
  const [commentside, setcommentside] = useState(false);

  function ClickedComment() {
    if (user) {
    } else {
      setsignup(true);
      setcommentside(false);
    }
  }
  // hide on top at specific height
  useEffect(() => {
    window.onscroll = function () {
      if (this.scrollY >= 444) {
        setup(true);
      } else {
        setup(false);
      }
    };
  });

  // hide on top at specific height

  // coppy url x hide it
  const [copypopup, setcopypopup] = useState(false);

  function copyCodeToClipboard() {
    setcopypopup(true);
    navigator.clipboard.writeText(window.location.toString());
  }
  useEffect(() => {
    const timeId = setTimeout(() => {
      setcopypopup(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  });

  // coppy url
  // console.log(post.author.bio);

  const [up, setup] = useState(false);
  const [popup, setPopup] = React.useState(false);

  function InpClicked(e: any) {
    const { name, value } = e.target;
    setemail((prevdata) => {
      return { ...prevdata, [name]: value };
    });
  }
  const [emaila, setemail] = useState({ email: "" });
  const [emailErr, setEmailErr] = useState(false);
  const [subs, setsubs] = useState(false);
  function submit(e: any) {
    e.preventDefault();
    const format = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/g;
    const emailform = document.getElementById("emailinp");
    if (emaila.email.match(format)) {
      addDoc(collection(db, "NewsLetters"), emaila)
        .then(() => {
          setPopup(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
      setsubs(true);
      setemail({ email: "" });
    } else {
      setEmailErr(true);
    }
  }

  /* response / side popup */
  const [response, setresponse] = useState(false);

  /* response / side popup */

  function InpClicked1(e: any) {
    const { name, value } = e.target;

    setCommentfield((prevdata) => {
      return { ...prevdata, [name]: value };
    });
  }

  const [commentfield, setCommentfield] = useState({
    comment: "",
  });
  const [likefield, setlikefield] = useState(0);

  let data = {
    _id: post && post._id,
    name: user && user.displayName,
    email: user && user.email,
    userImage: user && user.photoURL,
    comment: commentfield.comment,
  };
  useEffect(() => {
    setsentpopup(false);
  }, [data._id]);

  async function handleSubmitform(e: any) {
    e.preventDefault();
    setissending(true);
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setsubmited(true);
        setissending(false);
        commentfield.comment = "";
        setsentpopup(true);
      })
      .catch((err) => {
        console.log(err);
        setsubmited(false);
        setsentpopup(false);
      });
  }

  useEffect(() => {
    if (data.comment === "") {
      setresponse(true);
    } else {
      setresponse(false);
    }
  }, [data.comment]);

  // sanity rich text
  const CodeRenderer = ({ node }) => {
    if (!node.code) {
      return null;
    }
    return (
      <SyntaxHighlighter
        className="my-12 lowercase"
        language={node.language || "text"}
      >
        {node.code}
      </SyntaxHighlighter>
    );
  };
  const BlockRenderer = (props: any) => {
    const { style } = props.node;

    if (style === "h1") {
      return (
        <h1 className="text-[30px] font-bold text-gray-900  my-8">
          - {props.children}
        </h1>
      );
    } else if (style === "h2") {
      return (
        <h2 className="text-2xl font-bold text-gray-900  my-5">
          - {props.children}
        </h2>
      );
    } else if (style === "blockquote") {
      return (
        <blockquote className="text-gray-600 my-10 italic border-l-4 border-gray-900 pl-8">
          - {props.children}
        </blockquote>
      );
    }

    // Fall back to default handling
    return BlockContent.defaultSerializers.types.block(props);
  };

  // hide comment x like at specific height
  const { ref: myRef, inView: myelemisvisible } = useInView();
  // hide comment x like at specific height

  const [isopen, setisopen] = React.useState(false);

  const [newsletterpopup, setnewsletterpopup] = useState(false);
  function ClickedMail() {
    const usermail = { userEmail: user?.email };
    if (!user) {
      setsignup(true);
    } else if (user) {
      addDoc(collection(db, "NewsLettersBtn"), usermail)
        .then(() => {
          setnewsletterpopup(true);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }
  const [followed, setfollowed] = useState(false);

  function Clickedfollow() {
    const usermail = { userEmail: user?.email };

    if (user) {
      addDoc(collection(db, "Followed"), usermail)
        .then(() => {
          setfollowed((prev) => !prev);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setsignup(true);
    }
  }

  return (
    <main className="font-poppins grid grid-cols-7 ">
      {/* First section */}
      <div className="xl:flex justify-end  h-full hidden relative  ">
        <div className="fixed justify-between  h-full px-6 py-12  col-span-1 flex flex-col ">
          <div className="flex cursor-pointer ">
            <Link passHref href="/">
              <img
                className="h-14"
                src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/1151/Medium_logo_-_black-512.png"
                alt=""
              />
            </Link>
          </div>
          <div className="flex  flex-col justify-end items-end space-y-8 ">
            {" "}
            <Link href="/">
              <div>
                <Tooltip
                  // options
                  title="Home"
                  position="right"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  hideDelay={0}
                  distance={20}
                >
                  <HomeUnclicked />
                </Tooltip>
              </div>
            </Link>
            <Tooltip
              // options
              title="Notifications"
              position="right"
              trigger="mouseenter"
              arrow={true}
              delay={300}
              hideDelay={0}
              distance={20}
            >
              <Notif />{" "}
            </Tooltip>
            <Tooltip
              // options
              title="Lists"
              position="right"
              trigger="mouseenter"
              arrow={true}
              delay={300}
              hideDelay={0}
              distance={20}
            >
              <Readinglist />
            </Tooltip>
            <Tooltip
              // options
              title="Stories"
              position="right"
              trigger="mouseenter"
              arrow={true}
              delay={300}
              hideDelay={0}
              distance={20}
            >
              <Stories />
            </Tooltip>
          </div>
          {user && (
            <div className="relative z-40  justify-end flex">
              <div
                onClick={() => setusersetting(!usersetting)}
                className="w-8 h-8 cursor-pointer    rounded-full"
              >
                {user.photoURL ? (
                  <img
                    src={user && user.photoURL}
                    className="rounded-full "
                    alt=""
                  />
                ) : (
                  <div className="bg-green-600  cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                    <span className="text-white uppercase">
                      {user.displayName?.slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <div
                onClick={() => setusersetting(false)}
                className={usersetting ? "fixed  inset-0 z-[1000000]" : ""}
              ></div>
              <div
                className={`${
                  usersetting
                    ? "bg-gray-200  -translate-x-[0%] z-[1000000]  opacity-100 duration-300 ease-in-out   bottom-20 left-0  w-[20rem] sm:w-[25rem] px-10 py-8 rounded-lg shadow-lg absolute "
                    : "bg-gray-200  -translate-x-[200%] z-[1000000] opacity-0 duration-300 ease-in-out   bottom-20 left-0  w-[20rem] sm:w-[25rem] px-10 py-8 rounded-lg shadow-lg absolute "
                }`}
              >
                <h2
                  onClick={logout}
                  className="text-gray-800 z-50 hover:text-black duration-75 text-md cursor-pointer"
                >
                  Sign out
                </h2>
                <div className="my-4 border-b-[1px]  border-gray-400 w-full" />
                <div className="flex justify-start space-x-4  items-center">
                  {user.photoURL ? (
                    <img
                      className="w-10 h-10 rounded-full "
                      src={user && user.photoURL}
                      alt=""
                    />
                  ) : (
                    <div className="bg-green-600  cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                      <span className="text-white uppercase">
                        {user.displayName?.slice(0, 2)}
                      </span>
                    </div>
                  )}

                  <div className="">
                    <h2 className="text-gray-900 text-sm capitalize">
                      {user && user.displayName}
                    </h2>
                    <h3 className="text-gray-600 text-sm ">
                      @{user && user?.email?.split("@")[0]}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!user && <div></div>}
        </div>
      </div>
      {/* newsletterpopup */}
      {newsletterpopup && (
        <div
          onClick={() => setnewsletterpopup(false)}
          className={`${
            newsletterpopup
              ? "fixed inset-0 z-10 bg-gray-100   backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
              : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
          }`}
        />
      )}
      <div className="absolute">
        <div
          className={`${
            newsletterpopup
              ? "fixed scale-100  p-8 flex flex-col justify-center items-center text-center top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2    md:z-10 ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto  rounded-lg bg-white shadow-xl"
              : "fixed p-8 flex flex-col justify-center items-center text-center top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2  scale-0   md:z-10 ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto  rounded-lg bg-white shadow-xl"
          }`}
        >
          <div
            className="p-4  cursor-pointer  z-50  absolute top-0 pt-10 pr-10 right-0"
            onClick={() => setnewsletterpopup(false)}
          >
            <VscClose className="h-8 w-8  text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
          </div>{" "}
          <div>
            {" "}
            <Image height={260} width={260} src={newslettergif} alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Thank You For Your Subscription
            </h1>

            <h2>
              You will be getting daily news about {post.author.name} posts
            </h2>
            <div className="mt-8">
              <span className="text-white px-8 py-2 rounded-md  bg-green-600">
                {" "}
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* newsletterpopup */}
      <div className="border-gray-200  border-x-[1px] w-full h-full  col-span-7 xl:col-span-4 ">
        {copypopup && (
          <div className="fixed  m-10 mb-20 sm:mb-10  bottom-0 z-50 right-0 ">
            <div className="bg-gray-900  flex justify-between items-center text-white w-[18rem] md:w-[40rem] h-16 px-8 py-6 rounded-lg shadow-md">
              <h1>Link copied!</h1>
              <VscClose
                onClick={() => setcopypopup(false)}
                className="cursor-pointer h-6 w-6"
              />
            </div>
          </div>
        )}
        {up && (
          <div
            onClick={scrolltotop}
            className="fixed hidden sm:block animate-bounce duration-500 z-40 hover:bg-green-700 bg-green-600 shadow-xl cursor-pointer rounded-md p-[13px] m-10 bottom-0 right-0"
          >
            <BiUpArrow className="w-4 h-4 text-white" />
          </div>
        )}
        {/* second section */}
        <div className="block xl:hidden">
          <Header />
        </div>

        {/* bottom section */}
        <div className="w-full   z-50 block sm:hidden px-[30px] py-[20px] fixed bg-gray-100 shadow-md bottom-0">
          <div className="flex justify-between">
            <Link href="/">
              <div>
                {router.pathname === "/" ? <HomePhone /> : <HomePhone />}
              </div>
            </Link>
            {/* <Home /> */}
            <Link href="/SearchCo">
              <div>
                <Search />
              </div>
            </Link>
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
                <ReadingList />
              </div>
            </Tooltip>
          </div>
        </div>
        {/* bottom section */}
        <div className="wrapper z-0 mt-24 xl:mt-0 flex flex-col justify-center max-w-[800px] px-6">
          <div className="md:flex space-y-8  md:space-y-0 justify-between  items-center space-x-4 py-10 font-extralight text-sm">
            <div className="flex ">
              <div>
                <img
                  className="h-12 w-12 object-cover rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
              <div className="pl-4">
                <p className="font-medium text-base">
                  <span className="text-gray-900">{post.author.name}</span>
                </p>
                <div className="flex items-center ">
                  <p className="text-gray-600">
                    {new Date(post._createdAt).toDateString()}{" "}
                  </p>
                  <GoStar className="text-gray-500 ml-2 h-4" />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center space-x-6">
              <div className="border-[0.5px] sm:hidden border-gray-100 w-full"></div>

              <Tooltip
                // options
                title="Share on Twitter"
                position="top"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                hideDelay={0}
                distance={20}
              >
                <BsTwitter className="h-[18px] w-[18px] text-gray-500 hover:text-gray-900 duration-300 cursor-pointer" />
              </Tooltip>
              <Tooltip
                // options
                title="Share on Facebook"
                position="top"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                distance={20}
              >
                <GrFacebook className="h-[17px] w-[17px] text-gray-500 hover:text-gray-900 duration-300 cursor-pointer" />
              </Tooltip>
              <Tooltip
                // options
                title="Share on Linkedin"
                position="top"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                distance={20}
              >
                <BsLinkedin className="h-[17px] w-[17px] text-gray-500 hover:text-gray-900 duration-300 cursor-pointer" />
              </Tooltip>
              <Tooltip
                // options
                title="Copy Link"
                position="top"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                distance={20}
              >
                <IoCopy
                  onClick={copyCodeToClipboard}
                  className="h-[17px] w-[17px] text-gray-500 hover:text-gray-900 duration-300 cursor-pointer"
                />
              </Tooltip>
            </div>
          </div>
          {/* like x Comment fixed */}

          <div
            className={`${
              myelemisvisible
                ? "fixed hidden bottom-20 md:bottom-10 -translate-x-1/2 left-1/2 xl:left-[43%]"
                : "fixed bottom-20 md:bottom-10 -translate-x-1/2 left-1/2 xl:left-[43%]"
            }`}
          >
            <div className="  bg-white px-6 py-2 rounded-full shadow-xl">
              <div className="flex  space-x-8  items-center">
                {" "}
                <div className="flex space-x-2 ">
                  <Tooltip
                    // options

                    title="Likes"
                    position="top"
                    trigger="mouseenter"
                    arrow={true}
                    delay={300}
                    hideDelay={0}
                    distance={20}
                  >
                    <div className="flex cursor-not-allowed items-center space-x-2 cursor-pointer">
                      <Like />

                      <span className="text-sm  text-gray-500">
                        {likefield}
                      </span>
                    </div>
                  </Tooltip>
                </div>
                <div className="flex space-x-2">
                  <Tooltip
                    // options
                    title="Respond"
                    position="top"
                    trigger="mouseenter"
                    arrow={true}
                    delay={300}
                    hideDelay={0}
                    distance={20}
                  >
                    <div
                      onClick={() => setcommentside(true)}
                      className="flex space-x-2 items-center cursor-pointer"
                    >
                      <Comment />
                      <span className="text-sm text-gray-500">
                        {post.comments.length}
                      </span>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* like x Comment fixed */}

          <article className="">
            <h1 className="text-[32px] border-b-[1px] font-bold  mb-3 text-black ">
              {post.title}
            </h1>
            <h2 className="text-[20px]  font-light text-gray-500">
              {post.description}
            </h2>
            {isopen && (
              <div
                onClick={() => setisopen(false)}
                className="fixed inset-0 z-40 bg-gray-200/95"
              ></div>
            )}
            <div onClick={() => setisopen((prev) => !prev)}>
              <img
                className={`${
                  isopen
                    ? "max-h-[600px]  fixed z-50  m-auto inset-x-0 inset-y-0 p-2 bg-white rounded-sm overflow-y-scroll cursor-zoom-out   duration-500 ease-in-out"
                    : "h-auto  cursor-zoom-in my-8 w-full object-cover   duration-500 ease-in-out"
                }`}
                src={urlFor(post.mainImage).url()!}
                alt="image"
              />
            </div>
          </article>
          <div>
            <BlockContent
              blocks={post.body}
              className="capitalize mt-6 imagepaddingstyle li link text-[20px]"
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body || []}
              serializers={{
                types: {
                  block: BlockRenderer,
                  code: CodeRenderer,
                },
              }}
            />
          </div>
          {/* side comment */}

          <div className="">
            {commentside && (
              <div
                onClick={() => setcommentside(false)}
                className="fixed cursor-pointer z-40 inset-0 bg-gray-600/20"
              ></div>
            )}
            <div
              className={`${
                commentside
                  ? "bg-white overflow-x-hidden z-[100]  overflow-y-scroll translate-x-[0%] duration-500 drop-shadow-[0_35px_135px_rgba(0,0,0,0.5)] px-6 pt-6 h-full fixed w-[90%] md:w-[60%] lg:w-[45%] xl:w-[25%]  right-0 bottom-0"
                  : "bg-white  translate-x-[300%] duration-500 drop-shadow-[0_35px_135px_rgba(0,0,0,0.5)] px-6 pt-6 h-full fixed w-[25%]  right-0 bottom-0"
              }`}
            >
              <div className="flex  items-center justify-between">
                <h1 className="text-gray-900 font-bold text-xl">
                  Responses ({post.comments.length})
                </h1>
                <div className="flex  space-x-4 items-center">
                  <Tooltip
                    // options
                    title="View Community Guidelines"
                    position="bottom"
                    trigger="mouseenter"
                    arrow={true}
                    delay={300}
                    hideDelay={0}
                    distance={20}
                  >
                    <div className="flex space-x-2 cursor-pointer">
                      <MdOutlinePrivacyTip className="text-xl text-gray-700 hover:text-gray-900 duration-500 cursor-pointer " />
                    </div>
                  </Tooltip>

                  <VscClose
                    onClick={() => setcommentside(false)}
                    className="text-2xl text-gray-700 hover:text-gray-900 duration-500 cursor-pointer"
                  />
                </div>{" "}
              </div>

              {sentpopup ? (
                <div className=" flex flex-col py-8 px-2  text-center justify-center items-center drop-shadow-xl  my-10   duration-500 ease-in-out rounded-md bg-white">
                  <CommentSent />

                  <h1 className="text-xl text-green-600 ">
                    Your comment has been sent!
                  </h1>
                  <h2 className="text-sm">
                    once its gets approved it will display below!
                  </h2>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmitform}
                  className={`${
                    sentpopup
                      ? "my-10 drop-shadow-xl p-4 translate-x-[140%] duration-500 ease-in-out  rounded-md bg-white"
                      : "my-10 drop-shadow-xl p-4 translate-x-[0%] duration-500 ease-in-out  rounded-md bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {user && (
                      <div className="flex items-center space-x-4">
                        {user.photoURL ? (
                          <img
                            className="h-8 w-8  object-cover rounded-full"
                            src={user && user.photoURL}
                            alt=""
                          />
                        ) : (
                          <div className="bg-green-600  cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                            <span className="text-white uppercase">
                              {user.displayName?.slice(0, 2)}
                            </span>
                          </div>
                        )}
                        <p className="text-sm text-gray-900 capitalize">
                          {user && user.displayName}
                        </p>
                      </div>
                    )}
                  </div>

                  <textarea
                    onChange={InpClicked1}
                    onClick={ClickedComment}
                    maxLength={user ? 5000 : 0}
                    value={commentfield.comment}
                    name="comment"
                    id="comment"
                    className="my-6 text-sm w-full outline-none"
                    autoFocus
                    placeholder="what are your thoughts..."
                    required
                  ></textarea>

                  <div className="space-x-4 text-sm items-center  flex justify-end ">
                    <span
                      onClick={() => setcommentside(false)}
                      className="text-gray-600 cursor-pointer hover:text-gray-900 duration-200"
                    >
                      Cancel
                    </span>

                    <input
                      type="submit"
                      disabled={issending}
                      value={issending ? "Response..." : "Response"}
                      className={`${
                        response
                          ? "bg-green-200 pointer-events-none  text-white px-4 rounded-full py-2"
                          : "bg-green-600 cursor-pointer text-white px-4 rounded-full py-2"
                      }`}
                    />
                  </div>
                </form>
              )}

              <div className="">
                {post.comments.length === 0 ? (
                  <div className="my-[50%]">
                    <h2 className="text-xl text-gray-800">
                      There are currently no responses for this story.
                    </h2>
                    <h3 className="my-4 text-gray-700">
                      Be the first to respond.
                    </h3>
                  </div>
                ) : (
                  <div>
                    {post.comments.map((comment) => (
                      <div key={comment._id}>
                        <div className=" flex items-center space-x-4 ">
                          <div className="rounded-full w-8 h-8 bg-green-600">
                            {comment.userImage ? (
                              <img
                                src={urlFor(comment.userImage).url()!}
                                className="rounded-full h-8 w-8 object-cover cursor-pointer"
                                alt="imag"
                              />
                            ) : (
                              <span className="text-xs flex justify-center text-white items-center translate-y-[50%] top-1/2 left-1/2">
                                <span className="capitalize cursor-pointer">
                                  {comment.name
                                    ? comment.name
                                        .split(" ")[0][0]
                                        .toUpperCase() +
                                      comment.name
                                        .split(" ")[0][1]
                                        .toUpperCase()
                                    : ""}
                                </span>
                              </span>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm cursor-pointer">
                              {comment.name} {comment.last}
                            </span>
                            <span className="text-sm text-gray-600">
                              {new Date(comment._createdAt).toDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm mt-6 mb-4 break-words">
                          {"  "}
                          {comment.comment}
                        </p>
                        <div className=" cursor-not-allowed items-center flex space-x-2">
                          <Like />
                          <span className="text-sm text-gray-500">
                            {likefield}
                          </span>
                        </div>
                        <div className="border-b-[1px] border-gray-200 my-4"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* side comment */}
          <div
            ref={myRef}
            id="hide"
            className="flex  mb-36 mt-16 justify-between items-center"
          >
            <div className="flex  space-x-8  items-center">
              {" "}
              <div className="flex space-x-2">
                <Tooltip
                  // options

                  title="Likes"
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  hideDelay={0}
                  distance={20}
                >
                  <div className="flex cursor-not-allowed space-x-2 cursor-pointer">
                    <Like />

                    <span className="text-sm text-gray-500">{likefield}</span>
                  </div>
                </Tooltip>
              </div>
              <div className="flex space-x-2">
                <Tooltip
                  // options
                  title="Respond"
                  position="top"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  hideDelay={0}
                  distance={20}
                >
                  <div
                    onClick={() => setcommentside(true)}
                    className="flex space-x-2 cursor-pointer"
                  >
                    <Comment />
                    <span className="text-sm text-gray-500">
                      {post.comments.length}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="flex  cursor-not-allowed  space-x-2 ">
              <Tooltip
                // options
                title="Not working yet"
                position="top"
                trigger="mouseenter"
                arrow={true}
                delay={300}
                hideDelay={0}
                distance={20}
              >
                <div className=" cursor-not-allowed flex space-x-2">
                  <Save />
                </div>
              </Tooltip>
            </div>
          </div>

          {/* comments*/}
          <div className="w-full wrapper p-10 border-t-[4px] border-green-600  bg-gray-100">
            {subs ? (
              <div>
                <h1 className="text-2xl mb-2 capitalize font-bold">
                  thank you for your subscription
                </h1>
                <h2>
                  You will be getting daily news about {post.author.name} posts
                </h2>
              </div>
            ) : (
              <div className="z-0">
                <h1 className="text-2xl font-bold">
                  Get an email whenever {post.author.name} publishes.
                </h1>
                <form
                  onSubmit={submit}
                  className="pt-6 space-y-4 w-full   sm:space-x-4  justify-between flex flex-col sm:flex-row items-center"
                >
                  <div
                    className={`${
                      emailErr
                        ? " w-[100%]  sm:w-[67%]  animate-[wave_0.8s_ease-in-out_1]"
                        : " w-[100%]   sm:w-[67%]"
                    }`}
                  >
                    <input
                      value={emaila.email}
                      onChange={InpClicked}
                      name="email"
                      id="emailinp"
                      type="text"
                      className={`${
                        emailErr
                          ? "block z-0   w-full py-2.5 px-0 text-sm text-gray-600 bg-transparent border-0 border-b-[1px]  appearance-none  dark:border-red-600 dark:focus:border-primary-100 focus:outline-none focus:ring-0 focus:border-red-600  peer"
                          : "block z-0 w-full py-2.5 px-0 text-sm text-gray-600 bg-transparent border-0 border-b-[1px]  appearance-none  dark:border-gray-400 dark:focus:border-primary-100 focus:outline-none focus:ring-0 focus:border-green-600  peer"
                      }`}
                      placeholder="Your Email"
                      required
                    />{" "}
                    {emailErr && (
                      <BiErrorAlt className="text-red-500 absolute right-0 top-4" />
                    )}
                  </div>

                  <button
                    className="w-full sm:w-auto"
                    onClick={() => setEmailErr(false)}
                  >
                    <div className="flex  justify-center items-center space-x-2 bg-green-600 hover:bg-green-700  duration-500 text-white py-[11px] px-0 sm:px-8 rounded-full">
                      <RiMailSendLine className="h-[23px] w-[23px]" />
                      <span>Subscribe</span>
                    </div>
                  </button>
                </form>
                {emailErr && (
                  <h2 className="text-red-500 pb-4 pt-4 sm:pt-0 text-sm">
                    Enter a valid email address.
                  </h2>
                )}
                <h2 className="pr-4 text-xs  pt-6">
                  By signing up, you will create a Medium account if you don’t
                  already have one. Review our{" "}
                  <span className="cursor-pointer underline">
                    Privacy Policy
                  </span>{" "}
                  for more information about our privacy practices.
                </h2>
              </div>
            )}
          </div>

          <div className="py-12 ">
            <div className="flex items-center justify-between">
              <h1 className="capitalize text-xl font-medium">
                more from {post.author.name}
              </h1>
              <div className="flex space-x-4">
                <button
                  onClick={Clickedfollow}
                  // value={issending ? "Response..." : "Response"}
                  className={`${
                    followed
                      ? "border-[1px] rounded-full border-green-600 hover:border-green-800 duration-500  px-6 py-2 text-gray-900"
                      : "bg-green-600 rounded-full hover:bg-green-700 duration-500  px-4 py-2 text-white"
                  }`}
                >
                  {followed ? "Following" : "Follow"}
                </button>
                <div
                  onClick={ClickedMail}
                  className="h-[37px] w-[37px] cursor-pointer flex justify-center items-center  rounded-full bg-green-600 hover:bg-green-700 duration-500"
                >
                  <RiMailAddLine className="text-white text-xl" />
                </div>
              </div>
            </div>
            <div className="py-4 pr-0 mb-8 text-sm sm:pr-44">
              {" "}
              <BlockContent
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                blocks={post.author.bio}
              />
            </div>
            <div className="w-full">
              {/* post */}
              <Link passHref href={`/post/${post.slug.current}`}>
                <div className="flex  space-y-4 justify-between items-center">
                  <div className="space-y-2 flex flex-col  cursor-pointer">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(post._createdAt).toDateString()}
                      </p>
                      <p className="sm:text-[21px] text-[18px]  font-semibold ">
                        {post.title}
                      </p>
                    </div>
                    <div className="sm:line-clamp-3 line-clamp-2 text-[13px] sm:text-[15px] text-gray-900">
                      <BlockContent
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        blocks={post.body.slice(0, 2)}
                      />
                    </div>
                  </div>
                  <img
                    className="object-cover cursor-pointer w-24 h-24 sm:w-36 ml-10 sm:h-36"
                    src={urlFor(post.mainImage).url()!}
                    alt="image"
                  />
                </div>
              </Link>
              {/* post */}

              {/* write on medium */}
              <div className="border-b-[1px] border-gray-200 my-10 " />
              <div className="flex justify-center items-center space-x-4">
                <h1>Share your ideas with millions of readers.</h1>
                <Tooltip
                  // options
                  title="Not Working Yet"
                  position="right"
                  trigger="mouseenter"
                  arrow={true}
                  delay={300}
                  hideDelay={0}
                  distance={20}
                >
                  <button className="bg-gray-800 cursor-not-allowed text-sm hover:bg-gray-900 duration-500 px-4 py-2 text-white rounded-full">
                    Write on medium
                  </button>
                </Tooltip>
              </div>
              {/* write on medium */}

              {/* posts on map */}
              <div className="border-b-[1px] border-gray-200 my-10 " />
              {posts.slice(0, 10)?.map((post) => (
                <div key={post._id}>
                  <Link
                    passHref
                    key={post._id}
                    href={`/post/${post.slug.current}`}
                  >
                    <div className="flex  space-y-4 justify-between items-center">
                      <div className="space-y-2 flex flex-col  cursor-pointer">
                        <div>
                          <p className="text-sm text-gray-500">
                            {new Date(post._createdAt).toDateString()}
                          </p>
                          <p className="sm:text-[21px] text-[18px]  font-semibold ">
                            {post.title}
                          </p>
                        </div>
                        <div className="sm:line-clamp-3 line-clamp-2 text-[13px] sm:text-[15px] text-gray-900">
                          {" "}
                          <BlockContent
                            blocks={post.body.slice(0, 2)}
                            className="capitalize text-[16px]"
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                            projectId={
                              process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
                            }
                            content={post.body.slice(0, 2) || []}
                            serializers={{
                              types: {
                                code: CodeRenderer,
                              },
                            }}
                          />
                        </div>
                      </div>
                      <img
                        className="object-cover cursor-pointer w-24 h-24 sm:w-36 ml-10 sm:h-36"
                        src={urlFor(post.mainImage).url()!}
                        alt="image"
                      />
                    </div>
                  </Link>
                  <div className="border-b-[1px] border-gray-200 my-10 " />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* posts on map */}

      {/* third section */}
      <div className="h-[110vh]   hidescrollbar relative hidden xl:flex">
        <div
          className={`${
            user
              ? "fixed     bottom-0 top-0 overflow-y-scroll  w-[380px] col-span-2 px-8 py-0"
              : "fixed    bottom-0 top-0 overflow-y-scroll  w-[380px] col-span-2 px-8 py-16"
          }`}
        >
          {!user && (
            <div className="space-x-8">
              <button
                onClick={() => setsignup(true)}
                className="bg-gray-800 hover:bg-gray-900 duration-500 px-16 py-2 rounded-full text-white"
              >
                Get started
              </button>
              <button
                onClick={() => {
                  setsignup(true);
                  setsign(1);
                }}
                className="text-black hover:text-green-600"
              >
                Sign in
              </button>
            </div>
          )}
          <div className="w-full py-10 relative">
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="px-12 w-[100%] py-2 rounded-full border-gray-200 border-[1px] outline-none text-sm"
              type="text"
              placeholder="Search.."
              name=""
              id=""
            />
            <FiSearch className="absolute -translate-y-1/2 top-1/2  -translate-x-1/2 left-8 h-4" />
          </div>
          <div>
            {searchTerm !== "" && (
              <div
                className={`${
                  user
                    ? "bg-gray-100 w-[330px] top-[95px]  absolute p-4 space-y-2 rounded-md shadow-lg backdrop-blur-xl"
                    : "bg-gray-100 w-[330px]  top-[200px]  absolute p-4 space-y-2 rounded-md shadow-lg backdrop-blur-xl"
                }`}
              >
                <h2 className="mt-4">From Medium</h2>
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
                            <div key={post._id}>
                              <div className="my-8 cursor-pointer ">
                                <h2 className="text-sm word-breaks text-gray-900 hover:text-black duration-100">
                                  {post.title}
                                </h2>

                                <h2 className="text-xs text-gray-500">
                                  {" "}
                                  {new Date(
                                    post._createdAt
                                  ).toDateString()}{" "}
                                </h2>
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
          <div>
            <div>
              <img
                className="h-24 w-24 object-cover rounded-full"
                src={urlFor(post.author.image).url()!}
                alt=""
              />
              <h1 className="font-bold py-4 text-gray-900">
                {post.author.name}
              </h1>
              <h2 className="text-gray-500 text-sm">
                <BlockContent
                  className=""
                  dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                  projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                  blocks={post.author.bio}
                />
              </h2>
              <div className="py-4 flex items-center space-x-4">
                <button
                  value={followed ? "Followed" : "Follow"}
                  onClick={Clickedfollow}
                  className={`${
                    followed
                      ? "border-[1px] rounded-full border-green-600 hover:border-green-800 duration-500  px-6 py-2 text-gray-900"
                      : "bg-green-600 rounded-full hover:bg-green-700 duration-500  px-4 py-2 text-white"
                  }`}
                >
                  {followed ? "Following" : "Follow"}
                </button>
                <div
                  onClick={ClickedMail}
                  className="h-[37px] w-[37px] cursor-pointer flex justify-center items-center  rounded-full bg-green-600 hover:bg-green-700 duration-500"
                >
                  <RiMailAddLine className="text-white text-xl" />{" "}
                </div>
              </div>
              <div className="py-4">
                <h2 className="text-gray-900 text-md font-semibold capitalize">
                  more from medium
                </h2>
                <div className="py-6">
                  {posts.slice(0, 5)?.map((post) => (
                    <Link
                      passHref
                      key={post._id}
                      href={`/post/${post.slug.current}`}
                    >
                      <div className="flex items-start justify-between py-4">
                        <div className="space-y-2 flex flex-col jusify-center cursor-pointer">
                          <div className="flex items-center space-x-2">
                            {" "}
                            <img
                              alt="r"
                              className="h-6 rounded-full"
                              src={urlFor(post.author.image).url()!}
                            />
                            <span className="text-sm font-normal capitalize">
                              {post.author.name}
                            </span>
                          </div>
                          <div>
                            <p className="text-[16px] text-md font-semibold w-[225px]">
                              {post.title}
                            </p>
                          </div>
                        </div>
                        <div className="h-16 w-16 flex justify-start">
                          <img
                            className="h-full w-full rounded-md cursor-pointer  object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                            src={urlFor(post.mainImage).url()!}
                            alt="image"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="text-xs mt-10">
                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    Help
                  </span>

                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    Status
                  </span>

                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    Writers
                  </span>

                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    Blog
                  </span>

                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    Careers
                  </span>

                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    Privacy
                  </span>
                  <br />
                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    Terms
                  </span>

                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    About
                  </span>
                  <span className="cursor-pointer text-gray-500 hover:text-gray-900 duration-100 pr-4">
                    Knowable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SIGN UP */}
      {(() => {
        if (sign === 0) {
          return (
            <div className="text-center">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100   backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100  z-[100] md:z-10 ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto  rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full  md:mx-[20rem] my-[10rem]">
                    <div
                      className="p-4  cursor-pointer  z-50  absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8  text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex-col font-poppins text-2xl  flex justify-center my-10">
                          <h1 className="py-10">Join Medium.</h1>
                          <h2 className="text-sm max-w-[24rem] m-auto">
                            Create an account to receive great stories in your
                            inbox, personalize your homepage, and follow authors
                            and topics that you love.
                          </h2>
                        </div>
                        <div>
                          <div
                            onClick={signUpWithGoogle}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-[13px] px-4 py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <FcGoogle className="h-[19px] w-[19px]" />
                            <h2>Sign up with Google</h2>
                          </div>
                          <div
                            onClick={() => {
                              setsign(2);
                            }}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-10 px-[21px] py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <IoMailOutline className="h-[19px] w-[19px] text-black" />
                            <h2>Sign up with Email </h2>
                          </div>
                        </div>
                        <div className="font-poppins mb-16 text-sm flex justify-center">
                          Already have an account? {"  "}
                          <span
                            onClick={() => setsign(1)}
                            className="text-green-600 cursor-pointer font-bold ml-2"
                          >
                            {" "}
                            Sign in
                          </span>
                        </div>
                        <div className="font-poppins  mb-20   text-center text-gray-600 text-xs flex justify-center items-center">
                          <h2>
                            Click “Sign Up” to agree to Medium’s Terms of
                            Service and acknowledge that Medium’s Privacy Policy
                            applies to you.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 1) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 z-50 cursor-pointer absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize  font-poppins text-2xl  flex justify-center py-10">
                          <h1>Welcome back.</h1>
                        </div>
                        <div>
                          <div
                            onClick={signInWithGoogle}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-[13px] px-4 py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <FcGoogle />
                            <h2>Sign in with Google</h2>
                          </div>
                          <div
                            onClick={() => {
                              setsign(3);
                            }}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-10 px-[21px] py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <IoMailOutline className="h-[19px] w-[19px] text-black" />
                            <h2>Sign in with Email </h2>
                          </div>
                        </div>
                        <div className="font-poppins mb-16 text-sm flex justify-center">
                          No account?
                          <span
                            onClick={() => setsign(0)}
                            className="text-green-600 cursor-pointer font-bold ml-2"
                          >
                            {" "}
                            Create one
                          </span>
                        </div>
                        <div className="font-poppins  mb-20   text-center text-gray-600 text-xs flex justify-center items-center">
                          <h2>
                            Click “Sign In” to agree to Medium’s Terms of
                            Service and acknowledge that Medium’s Privacy Policy
                            applies to you.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 2) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 cursor-pointer absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex flex-col  font-poppins text-2xl  space-y-2 justify-center py-10">
                          <h1>Sign up with email</h1>
                          <h2 className="capitalize  font-poppins text-sm  ">
                            Enter your email address to create an account.
                          </h2>
                        </div>
                        <form
                          onSubmit={handlesubmit}
                          className="flex flex-col w-[90%] sm:w-[60%]  mb-10 mt-6 m-auto "
                        >
                          <label
                            className="text-gray-900 text-sm"
                            htmlFor="email"
                          >
                            Your Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            onChange={(e) => {
                              setregisteremail(e.target.value);
                            }}
                            className="w-full md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            type="text"
                            required
                            max={20}
                          />
                          <label
                            className="text-gray-900 text-sm mt-4"
                            htmlFor="password"
                          >
                            Your password
                          </label>
                          <input
                            onChange={(e) => {
                              setregisterpassword(e.target.value);
                            }}
                            name="password"
                            id="password"
                            type="password"
                            className="w-full my-2 md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            required
                            max={20}
                          />
                          <input
                            className="px-8 mt-4 w-[70%] m-auto py-2 bg-gray-900 cursor-pointer hover:bg-black duration-100 rounded-full text-white"
                            type="submit"
                            value={successlogin ? "Successed" : "Continue"}
                          />
                          {messageerr && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Invalid mail or password
                              </h2>
                            </div>
                          )}
                          {messageerr1 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Email already in use
                              </h2>
                            </div>
                          )}
                          {messageerr2 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">Weak Password</h2>
                            </div>
                          )}
                        </form>

                        <div
                          onClick={() => setsign(0)}
                          className="font-poppins items-center  mb-16 text-sm flex justify-center"
                        >
                          <BsChevronLeft className="text-green-600 h-4 w-4" />
                          <span className="text-green-600 cursor-pointer  ml-2">
                            {" "}
                            All sign up options
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 3) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 cursor-pointer absolute z-50 top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10 mt-6   md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex flex-col  font-poppins text-2xl  space-y-2 justify-center py-10">
                          <h1>Sign in with email</h1>
                          <h2 className="capitalize px-12 font-poppins text-sm  ">
                            Enter the email address & password associated with
                            your account, and we’ll send you right to home page.
                          </h2>
                        </div>
                        <form
                          onSubmit={login}
                          className="flex flex-col w-[90%] sm:w-[60%]  mb-10 mt-2 m-auto "
                        >
                          <label
                            className="text-gray-900 text-sm"
                            htmlFor="email"
                          >
                            Your Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            onChange={(e) => {
                              setloginemail(e.target.value);
                            }}
                            className="w-full md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            type="text"
                            required
                            max={20}
                          />
                          <label
                            className="text-gray-900 text-sm mt-4"
                            htmlFor="password"
                          >
                            Your password
                          </label>
                          <input
                            onChange={(e) => {
                              setloginpassword(e.target.value);
                            }}
                            name="password"
                            id="password"
                            type="password"
                            className="w-full my-2 md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            required
                            max={20}
                          />
                          <input
                            className="px-8 mt-8 w-[70%] m-auto py-2 bg-gray-900 cursor-pointer hover:bg-black duration-100 rounded-full text-white"
                            type="submit"
                            value="Continue"
                          />
                          {messageerr && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Invalid mail or password
                              </h2>
                            </div>
                          )}
                          {messageerr1 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Email already in use
                              </h2>
                            </div>
                          )}
                          {messageerr2 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">Weak Password</h2>
                            </div>
                          )}
                        </form>

                        <div
                          onClick={() => setsign(0)}
                          className="font-poppins items-center  mb-16 text-sm flex justify-center"
                        >
                          <BsChevronLeft className="text-green-600 h-4 w-4" />
                          <span className="text-green-600 cursor-pointer  ml-2">
                            {" "}
                            All sign up options
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }
      })()}
      {/* SIGN UP */}
    </main>
  );
}

export default Post;

//  if you want to use ssg (bellow)

// export const getStaticPaths: GetStaticPaths = async () => {
//   const query = `*[_type=="post"]{
//         _id,
//        slug{
//         current
//       }
//       }`;
//   const posts = await sanityClient.fetch(query);
//   const paths = posts.map((post: Post) => ({
//     params: {
//       slug: post.slug.current,
//     },
//   }));
//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
// let subscription = undefined;

// export const getStaticProps: GetStaticProps = async ({ params }) => { this is for ssg
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `
    *[_type=="post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
        name,
        bio,
        last,
        image,
        "imageUrl": image.asset->url
      },
      "comments": *[
          _type == "comment" && 
          post._ref == ^._id  && approved==true
       ]{name,last,comment,_createdAt, userImage},

      description,
      mainImage,
      title,
       slug,
       body
      }`;

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

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      posts,
    },

    // revalidate: 60, this is for ssg
  };
};

function CommentSent() {
  return (
    <svg
      className="max-h-[100px] my-6"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      data-name="Layer 1"
      width="924"
      height="458.12749"
      viewBox="0 0 924 458.12749"
    >
      <ellipse
        cx="448.17846"
        cy="584.7146"
        rx="21.53369"
        ry="6.76007"
        transform="translate(-396.01217 573.65899) rotate(-69.08217)"
        fill="#2f2e41"
      />
      <circle
        cx="408.37125"
        cy="617.2367"
        r="43.06735"
        transform="translate(-404.30923 700.52813) rotate(-80.78252)"
        fill="#2f2e41"
      />
      <rect
        x="250.74566"
        y="430.10005"
        width="13.08374"
        height="23.44171"
        fill="#2f2e41"
      />
      <rect
        x="276.91314"
        y="430.10005"
        width="13.08374"
        height="23.44171"
        fill="#2f2e41"
      />
      <ellipse
        cx="261.6488"
        cy="453.81434"
        rx="10.90314"
        ry="4.08868"
        fill="#2f2e41"
      />
      <ellipse
        cx="287.81628"
        cy="453.26918"
        rx="10.90314"
        ry="4.08868"
        fill="#2f2e41"
      />
      <circle
        cx="409.4616"
        cy="606.33348"
        r="14.71922"
        transform="translate(-155.63358 -208.64722) rotate(-1.68323)"
        fill="#fff"
      />
      <circle cx="271.4616" cy="385.39723" r="4.90643" fill="#3f3d56" />
      <path
        d="M366.59454,577.1852c-3.47748-15.57379,7.63867-31.31043,24.82861-35.1488s33.94423,5.67511,37.42171,21.24884-7.91492,21.31762-25.10486,25.156S370.072,592.75905,366.59454,577.1852Z"
        transform="translate(-138 -220.93625)"
        fill="#e6e6e6"
      />
      <ellipse
        cx="359.86311"
        cy="597.25319"
        rx="6.76007"
        ry="21.53369"
        transform="translate(-471.98369 445.52283) rotate(-64.62574)"
        fill="#2f2e41"
      />
      <path
        d="M387.21673,632.77358c0,4.21515,10.85327,12.53857,22.89656,12.53857s23.33515-11.867,23.33515-16.08209-11.29193.81775-23.33515.81775S387.21673,628.55843,387.21673,632.77358Z"
        transform="translate(-138 -220.93625)"
        fill="#fff"
      />
      <path
        d="M711.25977,500.2,664.48,546.37,558.75977,650.69l-2.13965,2.11L544.7002,664.56,519.71,639.87l-2.20019-2.17-45.69-45.13h-.00976L457.16992,578.1l-8.6499-8.55-25.76025-25.44-3.4795-3.44-41.06006-40.56a117.65792,117.65792,0,0,1-20.52-27.63c-.5-.91-.97022-1.83-1.43018-2.75A117.50682,117.50682,0,0,1,480.98,301.2h.01025c.37989.06.75.12,1.12989.2a113.60526,113.60526,0,0,1,11.91015,2.77A117.09292,117.09292,0,0,1,523.1499,317.1q1.4253.885,2.82031,1.8a118.17183,118.17183,0,0,1,18.46973,15.09l.3501-.35.3501.35a118.54248,118.54248,0,0,1,10.83007-9.58c.82959-.65,1.66993-1.29,2.50977-1.91a117.44922,117.44922,0,0,1,90.51025-21.06,111.92113,111.92113,0,0,1,11.91993,2.78q1.96507.55509,3.8999,1.2c1.04.34,2.08008.69,3.10986,1.07a116.42525,116.42525,0,0,1,24.39014,12.1q2.50488,1.63494,4.93994,3.42A117.54672,117.54672,0,0,1,711.25977,500.2Z"
        transform="translate(-138 -220.93625)"
        fill="#37a34a"
      />
      <path
        d="M664.48,546.37,558.75977,650.69l-2.13965,2.11L544.7002,664.56,519.71,639.87l-2.20019-2.17-45.69-45.13c7.34034-1.71,18.62012.64,22.75,2.68,9.79,4.83,17.84034,12.76,27.78028,17.28A46.138,46.138,0,0,0,550.68018,615.66c17.81982-3.74,31.60986-17.52,43.77-31.08,12.15966-13.57,24.58984-28.13,41.67968-34.42C645.14014,546.84,654.81982,546.09,664.48,546.37Z"
        transform="translate(-138 -220.93625)"
        opacity="0.15"
      />
      <path
        d="M741.33984,335.92a118.15747,118.15747,0,0,0-52.52978-30.55c-1.31983-.37-2.62988-.7-3.96-1.01A116.83094,116.83094,0,0,0,667.46,301.57c-1.02-.1-2.04-.17-3.06982-.22a115.15486,115.15486,0,0,0-15.43018.06,118.39675,118.39675,0,0,0-74.83984,33.45l-.36035-.36-.35987.36a118.61442,118.61442,0,0,0-46.6997-28.08c-.99024-.32-1.99024-.63-2.99024-.92a119.67335,119.67335,0,0,0-41.62012-4.45c-.38964.02-.77978.05-1.15966.09a118.30611,118.30611,0,0,0-69.39991,29.4c-1.82031,1.6-3.61035,3.28-5.35009,5.02A119.14261,119.14261,0,0,0,379.54,463.47c.3501.94.73,1.87006,1.12988,2.8a118.153,118.153,0,0,0,25.51026,37.95l38.91992,38.42,3.06006,3.03,84.21972,83.13,2.16992,2.15,22.12012,21.84,17.08985,16.87L741.33984,504.21A119.129,119.129,0,0,0,741.33984,335.92ZM739.23,502.08,573.75977,665.44l-14.94971-14.76-21.6499-21.37-2.16993-2.14-82.58007-81.53-3.01026-2.97L408.2998,502.09A115.19343,115.19343,0,0,1,383.54,465.37c-.3999-.93-.78027-1.86-1.12988-2.79A116.13377,116.13377,0,0,1,408.2998,338.04q2.79054-2.79,5.71-5.34H414.02a115.38082,115.38082,0,0,1,66.48-28.16q4.905-.42,9.81982-.42c1.23,0,2.4502.02,3.68018.06a116.0993,116.0993,0,0,1,29.6499,4.8c.99024.29,1.98.6,2.96.93a114.15644,114.15644,0,0,1,29.33008,14.49,115.61419,115.61419,0,0,1,16.41016,13.64l1.06006,1.06.34961-.35.35009.35,1.06006-1.06a115.674,115.674,0,0,1,85.71-33.86c1.27.04,2.54.1,3.81006.19,1.02.06,2.04.13,3.05029.23a115.12349,115.12349,0,0,1,19.08985,3.35c1.33984.34,2.66992.71,3.98974,1.12A115.9591,115.9591,0,0,1,739.23,502.08Z"
        transform="translate(-138 -220.93625)"
        fill="#3f3d56"
      />
      <path
        d="M506.87988,308.71c-6.41992,5.07-13.31006,9.75-17.48,16.68-3.06982,5.12-4.3999,11.07-5.39013,16.95-1.91993,11.44-2.73975,23.16-6.5,34.12994-3.75,10.97-11.06983,21.45-21.91993,25.54-6.73,2.53-14.1499,2.39-21.31982,1.9-17.68994-1.2-35.5-4.37-51.41992-12.16-8.8999-4.36-17.53028-10.24-27.41992-10.89a25.39538,25.39538,0,0,0-6.02.33A117.494,117.494,0,0,1,480.98,301.2h.01025c.37989.06.75.12,1.12989.2a113.60526,113.60526,0,0,1,11.91015,2.77A117.48205,117.48205,0,0,1,506.87988,308.71Z"
        transform="translate(-138 -220.93625)"
        opacity="0.15"
      />
      <path
        d="M224.76412,625.76982a28.74835,28.74835,0,0,0,27.7608-4.89018c9.72337-8.16107,12.77191-21.60637,15.25242-34.056L275.11419,550l-15.36046,10.57663c-11.04633,7.60609-22.34151,15.45585-29.99,26.47289s-10.987,26.0563-4.8417,37.97726Z"
        transform="translate(-138 -220.93625)"
        fill="#e6e6e6"
      />
      <path
        d="M226.07713,670.35248c-1.55468-11.32437-3.15331-22.7942-2.06278-34.24.96851-10.16505,4.06971-20.09347,10.38337-28.23408a46.968,46.968,0,0,1,12.0503-10.9196c1.205-.76061,2.31413,1.14911,1.11434,1.90641a44.6513,44.6513,0,0,0-17.66194,21.31042c-3.84525,9.78036-4.46274,20.44179-3.80011,30.83136.40072,6.283,1.25,12.52474,2.1058,18.75851a1.14389,1.14389,0,0,1-.771,1.358,1.11066,1.11066,0,0,1-1.358-.771Z"
        transform="translate(-138 -220.93625)"
        fill="#f2f2f2"
      />
      <path
        d="M241.05156,650.3137a21.16242,21.16242,0,0,0,18.439,9.51679c9.33414-.4431,17.11583-6.95774,24.12082-13.14262l20.71936-18.29363L290.618,627.738c-9.86142-.47193-19.97725-.91214-29.36992,2.12894s-18.05507,10.35987-19.77258,20.082Z"
        transform="translate(-138 -220.93625)"
        fill="#e6e6e6"
      />
      <path
        d="M221.68349,676.86232c7.48292-13.24055,16.16246-27.95592,31.67134-32.65919a35.34188,35.34188,0,0,1,13.32146-1.37546c1.41435.12195,1.06117,2.30212-.3506,2.18039a32.83346,32.83346,0,0,0-21.259,5.62435c-5.99423,4.0801-10.66138,9.75253-14.61162,15.76788-2.41964,3.68458-4.587,7.52548-6.75478,11.36122-.69277,1.22582-2.7177.341-2.01683-.89919Z"
        transform="translate(-138 -220.93625)"
        fill="#f2f2f2"
      />
      <circle cx="300.09051" cy="76.05079" r="43.06733" fill="#2f2e41" />
      <rect
        x="280.4649"
        y="109.85048"
        width="13.08374"
        height="23.44171"
        fill="#2f2e41"
      />
      <rect
        x="306.63238"
        y="109.85048"
        width="13.08374"
        height="23.44171"
        fill="#2f2e41"
      />
      <ellipse
        cx="291.36798"
        cy="133.56477"
        rx="10.90314"
        ry="4.08868"
        fill="#2f2e41"
      />
      <ellipse
        cx="317.53552"
        cy="133.0196"
        rx="10.90314"
        ry="4.08868"
        fill="#2f2e41"
      />
      <circle cx="301.18084" cy="65.14766" r="14.71923" fill="#fff" />
      <ellipse
        cx="444.18084"
        cy="289.08391"
        rx="4.88594"
        ry="4.92055"
        transform="translate(-212.34041 177.70056) rotate(-44.98705)"
        fill="#3f3d56"
      />
      <path
        d="M396.31372,256.93569c-3.47748-15.57379,7.63865-31.31043,24.82866-35.14881s33.94421,5.67511,37.42169,21.24891-7.91492,21.31768-25.10486,25.156S399.79126,272.50954,396.31372,256.93569Z"
        transform="translate(-138 -220.93625)"
        fill="#e6e6e6"
      />
      <ellipse
        cx="770.70947"
        cy="573.81404"
        rx="6.76007"
        ry="21.53369"
        transform="translate(-326.96946 400.5432) rotate(-39.51212)"
        fill="#2f2e41"
      />
      <circle
        cx="808.20127"
        cy="616.79758"
        r="43.06735"
        transform="translate(-226.36415 -83.51221) rotate(-9.21748)"
        fill="#2f2e41"
      />
      <rect
        x="676.74319"
        y="429.66089"
        width="13.08374"
        height="23.44171"
        fill="#2f2e41"
      />
      <rect
        x="650.5757"
        y="429.66089"
        width="13.08374"
        height="23.44171"
        fill="#2f2e41"
      />
      <ellipse
        cx="678.92379"
        cy="453.37519"
        rx="10.90314"
        ry="4.08868"
        fill="#2f2e41"
      />
      <ellipse
        cx="652.75631"
        cy="452.83005"
        rx="10.90314"
        ry="4.08868"
        fill="#2f2e41"
      />
      <path
        d="M823.27982,593.8192c-13.57764-11.21939-21.12423-21.50665-10.95965-33.80776s29.41145-13.178,42.98908-1.9586,16.34444,30.28655,6.17986,42.58766S836.85746,605.03859,823.27982,593.8192Z"
        transform="translate(-138 -220.93625)"
        fill="#37a34a"
      />
      <circle
        cx="793.31102"
        cy="594.44957"
        r="14.71922"
        transform="translate(-155.11887 -197.37727) rotate(-1.68323)"
        fill="#fff"
      />
      <circle cx="650.1378" cy="369.86765" r="4.90643" fill="#3f3d56" />
      <path
        d="M771.06281,606.5725c-2.98056,2.98056-5.08788,12.64434-.89538,16.83684s16.51464-.26783,19.49516-3.24834-4.50917-3.35271-8.70164-7.54518S774.04337,603.59194,771.06281,606.5725Z"
        transform="translate(-138 -220.93625)"
        fill="#fff"
      />
      <ellipse
        cx="841.39416"
        cy="654.27547"
        rx="6.76007"
        ry="21.53369"
        transform="translate(-316.14156 122.58618) rotate(-20.9178)"
        fill="#2f2e41"
      />
      <path
        d="M1061,679.06375H139a1,1,0,0,1,0-2h922a1,1,0,0,1,0,2Z"
        transform="translate(-138 -220.93625)"
        fill="#ccc"
      />
    </svg>
  );
}
function Comment() {
  return (
    <svg
      className=""
      width="24"
      fill="gray"
      height="24"
      viewBox="0 0 24 24"
      aria-label="responses"
    >
      <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path>
    </svg>
  );
}
function Like() {
  return (
    <svg
      fill="gray"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-label="clap"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.37.83L12 3.28l.63-2.45h-1.26zM13.92 3.95l1.52-2.1-1.18-.4-.34 2.5zM8.59 1.84l1.52 2.11-.34-2.5-1.18.4zM18.52 18.92a4.23 4.23 0 0 1-2.62 1.33l.41-.37c2.39-2.4 2.86-4.95 1.4-7.63l-.91-1.6-.8-1.67c-.25-.56-.19-.98.21-1.29a.7.7 0 0 1 .55-.13c.28.05.54.23.72.5l2.37 4.16c.97 1.62 1.14 4.23-1.33 6.7zm-11-.44l-4.15-4.15a.83.83 0 0 1 1.17-1.17l2.16 2.16a.37.37 0 0 0 .51-.52l-2.15-2.16L3.6 11.2a.83.83 0 0 1 1.17-1.17l3.43 3.44a.36.36 0 0 0 .52 0 .36.36 0 0 0 0-.52L5.29 9.51l-.97-.97a.83.83 0 0 1 0-1.16.84.84 0 0 1 1.17 0l.97.97 3.44 3.43a.36.36 0 0 0 .51 0 .37.37 0 0 0 0-.52L6.98 7.83a.82.82 0 0 1-.18-.9.82.82 0 0 1 .76-.51c.22 0 .43.09.58.24l5.8 5.79a.37.37 0 0 0 .58-.42L13.4 9.67c-.26-.56-.2-.98.2-1.29a.7.7 0 0 1 .55-.13c.28.05.55.23.73.5l2.2 3.86c1.3 2.38.87 4.59-1.29 6.75a4.65 4.65 0 0 1-4.19 1.37 7.73 7.73 0 0 1-4.07-2.25zm3.23-12.5l2.12 2.11c-.41.5-.47 1.17-.13 1.9l.22.46-3.52-3.53a.81.81 0 0 1-.1-.36c0-.23.09-.43.24-.59a.85.85 0 0 1 1.17 0zm7.36 1.7a1.86 1.86 0 0 0-1.23-.84 1.44 1.44 0 0 0-1.12.27c-.3.24-.5.55-.58.89-.25-.25-.57-.4-.91-.47-.28-.04-.56 0-.82.1l-2.18-2.18a1.56 1.56 0 0 0-2.2 0c-.2.2-.33.44-.4.7a1.56 1.56 0 0 0-2.63.75 1.6 1.6 0 0 0-2.23-.04 1.56 1.56 0 0 0 0 2.2c-.24.1-.5.24-.72.45a1.56 1.56 0 0 0 0 2.2l.52.52a1.56 1.56 0 0 0-.75 2.61L7 19a8.46 8.46 0 0 0 4.48 2.45 5.18 5.18 0 0 0 3.36-.5 4.89 4.89 0 0 0 4.2-1.51c2.75-2.77 2.54-5.74 1.43-7.59L18.1 7.68z"
      ></path>
    </svg>
  );
}
function HomeUnclicked() {
  return (
    <svg
      className="cursor-pointer text-gray-800 hover:text-black duration-100"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Home"
    >
      <path
        d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
function Save() {
  return (
    <svg
      className="cursor-not-allowed text-gray-800 hover:text-black duration-100"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z"
        fill="#000"
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

function Notif() {
  return (
    <svg
      className="cursor-not-allowed  text-gray-800 hover:text-black duration-100"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Notifications"
    >
      <path
        d="M15 18.5a3 3 0 1 1-6 0"
        stroke="currentColor"
        strokeLinecap="round"
      ></path>
      <path
        d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z"
        stroke="currentColor"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
function Stories() {
  return (
    <svg
      className="cursor-not-allowed  text-gray-800 hover:text-black duration-100"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Stories"
    >
      <path
        d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z"
        stroke="currentColor"
      ></path>
      <path
        d="M8 8.5h8M8 15.5h5M8 12h8"
        stroke="currentColor"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}
function Search() {
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
function ReadingList() {
  return (
    <svg
      className="cursor-not-allowed  text-gray-800 hover:text-black duration-100"
      width="25"
      height="25"
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
function Readinglist() {
  return (
    <svg
      className="cursor-not-allowed  text-gray-800 hover:text-black duration-100"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Lists"
    >
      <path
        d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z"
        stroke="currentColor"
        strokeLinecap="round"
      ></path>
      <path
        d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5"
        stroke="currentColor"
        strokeLinecap="round"
      ></path>
    </svg>
  );
}
