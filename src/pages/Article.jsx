import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Loader from "../layouts/Loader";
import { listingAPI } from "../apis/axios/blogsAPIs";
import { fallbackImg } from "../assets";
const Article = () => {
  const { blogUrl } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImgLoading, setIsImgLoading] = useState(true);
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

  // ERROR IN META FIX VARUN SALAT

  useEffect(() => {
    // document.title = `Scholarwithtech | blog website | ${blog.title.rendered.slice(
    //   0,
    //   30
    // )}`;
    // // changing meta description
    // const description = blog.title.rendered.slice(0, 155) || "";
    // const metaDescription = document.createElement("meta");
    // metaDescription.name = "description";
    // metaDescription.content = description;
  }, []);

  // const handleLikeBlog = async (blogId) => {
  //   const res = await axios.post(
  //     `https://blog-website-g6cd.onrender.com/api/like/${blogId}`
  //   );
  //   console.log(res);
  // };

  // const handleDislikeBlog = async (blogId) => {
  //   const res = await axios.post(
  //     `https://blog-website-g6cd.onrender.com/api/dislike/${blogId}`
  //   );
  //   console.log(res);
  // };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {!isLoading && (
        <div className="flex items-center justify-center w-full">
          <section className="flex flex-col justify-start items-start gap-4 padding max-w-[300px] sm:max-w-[450px] md:max-w-[1200px]">
            <h1 className="text-2xl text-left md:text-3xl font-bold">
              {blog.title.rendered}
            </h1>
            <h3 className="text-lg font-medium text-gray-400">
              {parse(blog.excerpt.rendered.slice(0, 100))}
            </h3>
            <img
              src={
                isImgErr
                  ? fallbackImg
                  : blog._embedded["wp:featuredmedia"]?.[0]?.source_url
              }
              alt={blog.title.rendered}
              className={
                "object-cover min-h-[200px] md:w-[60%] mx-auto rounded-xl border-black/20 border-2"
              }
              onError={() => setIsImgErr(true)}
              onLoad={() => setIsImgLoading(false)}
            />

            <article className="text-lg font-medium flex flex-col gap-4 justify-center items-center article-style max-w-[300px] sm:max-w-[450px] md:max-w-[1200px]">
              {parse(blog.content.rendered)}
            </article>
          </section>
        </div>
      )}
    </>
  );
};

export default Article;
