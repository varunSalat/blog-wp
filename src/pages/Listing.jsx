import { List, Pagination, SideBlog, MostViewedCard } from "../components";
import { useSearchParams } from "react-router-dom";
import NoBlogFound from "../layouts/NoBlogFound";
import { useEffect } from "react";
import { listingAPI } from "../apis/axios/blogsAPIs";
import { useState } from "react";
import { categoryRe, tag } from "../constants/constant";
import { ListingLoader } from "../layouts";

const Listing = () => {
  // HOOKS
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [most, setMost] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // FUNCTIONS
    const fetchFunc = async (searchParams) => {
      let page = searchParams?.get("page");
      let s = searchParams?.get("s");
      let cat = searchParams?.get("cat");

      if (page === null) {
        page = 1;
      }
      if (s !== null) {
        s = `&search=${s}`;
      } else {
        s = "";
      }
      if (cat !== null) {
        let c = categoryRe[cat];
        cat = `&categories=${c}`;
      } else {
        cat = "";
      }
      try {
        const response = await listingAPI(
          `/wp-json/wp/v2/posts?page=${page}&per_page=10&_embed${s}${cat}`
        );
        const totalResponseSize = await listingAPI(
          `/wp-json/wp/v2/posts?_embed${s}${cat}`
        );
        setData(response);
        setTotalPage(totalResponseSize);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const mostFetchFunc = async () => {
      try {
        const response = await listingAPI(
          `/wp-json/wp/v2/posts?tags=${tag}&per_page=10&_embed`
        );
        setMost(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    Promise.all([fetchFunc(searchParams), mostFetchFunc()]).then(() => {
      setIsLoading(false);
    });
  }, [searchParams]);

  useEffect(() => {
    document.title = "Scholarwithtech | blog website | Information blog";
  }, []);
  if (isLoading) {
    return <ListingLoader />;
  }
  return (
    <>
      <div className="grid xl:grid-cols-12">
        <div className="hidden md:flex md:col-span-2 flex-col gap-2 w-full padding"></div>
        <section className="padding flex flex-col gap-4 w-full col-span-8">
          <div>
            <span className="my-2 block text-2xl font-semibold">Articles </span>
            <div className="border-b-2 border-black/10" />
          </div>
          {data === null || data.data.length === 0 ? (
            <NoBlogFound />
          ) : (
            data.data.map((blogData) => (
              <List
                key={blogData.id}
                url={blogData.slug}
                title={blogData.title.rendered}
                summary={blogData.excerpt.rendered}
                cat={blogData.categories[0]}
                img={blogData._embedded["wp:featuredmedia"]?.[0]?.source_url}
              />
            ))
          )}
          <div className="flex justify-end">
            <Pagination totalBlogs={totalPage?.data?.length} />
          </div>
        </section>
        <div className="hidden xl:flex md:col-span-2 flex-col gap-2 w-full padding">
          <div>
            <span className="my-2 block text-2xl font-semibold">
              Most Viewed
            </span>
          </div>
          {most.data.map((blogData) => (
            <SideBlog
              key={blogData.id}
              title={blogData.title.rendered}
              img={blogData._embedded["wp:featuredmedia"]?.[0]?.source_url}
              url={blogData.slug}
            />
          ))}
        </div>
      </div>

      <div className="xl:grid block md:grid-cols-12">
        <div className="hidden md:flex md:col-span-2 flex-col gap-2 w-full padding"></div>
        <section className="padding flex flex-col gap-4 w-full col-span-8">
          <div>
            <span className="my-2 block text-2xl font-semibold">
              Most Viewed
            </span>
            <div className="border-b-2 border-black/10" />
          </div>
          <div className="flex gap-8 mt-6 justify-center flex-wrap">
            {most.data.map((blogData) => (
              <MostViewedCard
                key={blogData.id}
                title={blogData.title.rendered}
                img={blogData._embedded["wp:featuredmedia"]?.[0]?.source_url}
                summary={blogData.excerpt.rendered}
                url={blogData.slug}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Listing;
