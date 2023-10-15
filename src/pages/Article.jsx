import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { Loader, NoBlogFound } from "../layouts";
import { listingAPI } from "../apis/axios/blogsAPIs";
import { fallbackImg } from "../assets";

const Article = () => {
  const { blogUrl } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImgErr, setIsImgErr] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchBlog = async (blogUrl) => {
      try {
        const res = await listingAPI(
          `wp-json/wp/v2/posts?slug=${blogUrl}&_embed`
        );
        setBlog(res.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog(blogUrl);
  }, [blogUrl]);

  const iframeRef = useRef(null);
  const [messageData, setMessageData] = useState();

  const onResized = (data) => setMessageData(data);

  const onMessage = (data) => {
    setMessageData(data);
    iframeRef.current.sendMessage("Hello back from the parent page");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!isLoading && !blog && <NoBlogFound />}
      {!isLoading && blog && (
        <div className="flex items-center relative justify-center w-full">
          <section className="flex flex-col justify-start items-start gap-4 padding w-[95%] sm:max-w-[450px] md:max-w-[1200px]">
            <h1 className="text-2xl text-left md:text-3xl font-bold">
              {blog?.title?.rendered}
            </h1>
            <h3 className="text-lg font-medium text-gray-400">
              {parse(blog?.excerpt?.rendered)}
            </h3>
            <img
              src={
                isImgErr
                  ? fallbackImg
                  : blog?._embedded["wp:featuredmedia"]?.[0]?.source_url
              }
              alt={blog?.title?.rendered}
              className={
                "object-cover min-h-[200px] md:w-[60%] mx-auto rounded-xl border-black/20 border-2"
              }
              onError={() => setIsImgErr(true)}
            />

            <iframe
              srcDoc={`
     ${blog?.content?.rendered}
    `}
              style={{
                // position: "absolute",
                height: "1000px",
                top: "50%",
                left: 0,
                width: "100%",
                border: "none", // Optional: remove iframe border
              }}
              frameBorder={0}
              allowFullScreen
            ></iframe>
          </section>
        </div>
      )}
    </>
  );
};

export default Article;
