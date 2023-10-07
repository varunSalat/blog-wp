import parse from "html-react-parser";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { fallbackImg } from "../assets";

const MostViewedCard = ({ title, img, summary, url }) => {
  const navigate = useNavigate();
  const { scrollToTop } = useContext(UserContext);
  const [imgErr, setImgErr] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);
  return (
    <div className="flex flex-col gap-2 w-[min(350px,100%)]   rounded-xl shadow p-3 my-2">
      <figure>
        <img
          src={imgErr || isImgLoading ? fallbackImg : img}
          alt={title.slice(0, 15)}
          className="rounded-md h-[250px] object-cover w-full"
          onLoad={() => setIsImgLoading(false)}
          onError={() => setImgErr(true)}
        />
      </figure>
      <h1
        className="text-lg font-semibold cursor-pointer"
        onClick={() => {
          navigate(`/a/${url}`);
          scrollToTop();
        }}
      >
        {title.slice(0, 65)}...
      </h1>
      <span>{parse(summary.slice(0, 120))}...</span>
    </div>
  );
};
export default MostViewedCard;
