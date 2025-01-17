import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookShareButton } from "react-share";
import Plyr from "plyr";
import Hls from "hls.js";
import "plyr/dist/plyr.css";
import FacebookComments from "../../components/Comment/FacebookComment/FacebookComments";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faComments,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
function Watch() {
  const [category, setCatgetory] = useState([]);
  const [watchinfo, setWatchInfo] = useState([]);
  const [chap2, setChap2] = useState("");
  const [watchchap, setWatchChap] = useState([]);
  const [images, setImages] = useState({});
  const [actors, setActors] = useState([]);
  const [film, setFilm] = useState("");
  const [DX, setDX] = useState([]);
  const { id } = useParams();
  const { chap } = useParams();
  const videoRef = useRef(null);
  const [noti, setNoti] = useState("");
  useEffect(() => {
    const WatchFilm = async () => {
      try {
        const res = await axios.get(`https://phimapi.com/phim/${id}`);
        setWatchInfo(res.data.movie);
        setWatchChap(res.data.episodes[0].server_data);
        setChap2(res.data.episodes[0].server_data.length);
        setCatgetory(res.data.movie.category);
        setActors(res.data.movie.actor);
        setFilm(res.data.episodes[0].server_data[0].link_m3u8);
        document.title = `Xem phim ${res.data.movie.name} - ${res.data.movie.origin_name}  `;
      } catch (error) {}
    };

    WatchFilm();
  }, [id]);

  useEffect(() => {
    actors.forEach(async (actor) => {
      try {
        const { data } = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
            actor
          )}&prop=pageimages&format=json&pithumbsize=500&origin=*`
        );
        const pageKey = Object.keys(data.query.pages)[0];
        const source = data.query.pages[pageKey]?.thumbnail?.source;
        if (source) setImages((prev) => ({ ...prev, [actor]: source }));
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }, [actors]);

  useEffect(() => {
    const random = Math.floor(Math.random() * 10);
    const APIUPDATE = async (random) => {
      try {
        const res = await axios.get(
          `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${random}`
        );
        setDX(res.data.items);
      } catch (error) {}
    };
    APIUPDATE(random);
  }, []);
  useEffect(() => {
    const random = Math.floor(Math.random() * 10);
    const APIUPDATE = async (random) => {
      try {
        const res = await axios.get(
          `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${random}`
        );
        setDX(res.data.items);
      } catch (error) {}
    };
    APIUPDATE(random);
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    const player = new Plyr(videoElement, {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      settings: ["speed", "quality", "captions"],
    });

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(film);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });

      const adStart = 15 * 60 + 1;
      const adEnd = 15 * 60 + 32;
      const skipAd = () => {
        if (
          videoElement.currentTime >= adStart &&
          videoElement.currentTime <= adEnd
        ) {
          videoElement.currentTime = adEnd + 1;
        }
      };
      videoElement.addEventListener("timeupdate", skipAd);

      return () => {
        hls.destroy();
      };
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = film;
      videoElement.play();
    }

    return () => {
      hls.destroy();
      videoElement.removeEventListener("timeupdate", skipAd);
      player.destroy();
    };
  }, [film]);

  useEffect(() => {
    const Noti = async () => {
      try {
        const res = await axios.get(`https://be-csc.vercel.app/api/noti/${id}`);
        if (res.data.content !== null) setNoti(res.data.content);
      } catch (error) {}
    };
    Noti();
  }, [id]);

  return (
    <>
      <div className="lg:px-4 px-2 ">
        <div className="flex items-center gap-3 hidden md:flex mt-2">
          <Link
            to={"/"}
            className="w-[30px] h-[30px] flex items-center justify-center rounded-full border group hover:bg-white"
          >
            <FontAwesomeIcon
              className="text-white group-hover:text-black"
              icon={faAngleLeft}
            />
          </Link>
          <h1 className="text-white ">Xem phim {watchinfo.name}</h1>
        </div>

        <div className=" mt-[30px]">
          <video ref={videoRef} id="my-hls-video" controls />
        </div>
        <div className=" mx-auto lg:p-4   mt-[25px]">
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="xl:w-2/3">
              <div className="p-3">
                <div>
                  <div className="flex items-center justify-between hidden xl:flex">
                    <div className="flex gap-[20px] items-center">
                      <img
                        className="w-[100px] object-cover rounded-lg"
                        src={`${watchinfo.poster_url}`}
                        alt=""
                      />

                      <div className="flex flex-col gap-[2px]">
                        <p className="text-[19px] text-white font-[600]">
                          {watchinfo.name}
                        </p>
                        <p className="text-[14px] text-[#F4CE70]">
                          {watchinfo.origin_name}
                        </p>

                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          <div className=" bg-white rounded-[5px]">
                            <span className="text-[12px] px-1 text-black">
                              {watchinfo.quality}
                            </span>
                          </div>

                          <div className=" border rounded-[5px]">
                            <span className="text-[12px] px-1 text-white">
                              {watchinfo.year}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          {category.map((category, index) => {
                            return (
                              <div
                                key={index}
                                className=" bg-[#272931] rounded-[4px]"
                              >
                                <span className="p-2 text-[12px] text-black text-white hover:text-[#F4CE70]">
                                  {category.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="w-[500px] overflow-hidden text-ellipsis line-clamp-4 text-[#AAAA]  text-[14px]">
                        {watchinfo.content}
                      </p>

                      <Link
                        to={`/info/${id}`}
                        className="flex items-center gap-1 text-[#F4CE70] text-[14px] mt-[10px]"
                      >
                        Thông tin phim
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="text-[14px] mt-[2px]"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#aaaaaa62] my-[1em] xl:block hidden"></div>
                <div>
                  {noti && (
                    <div className="w-full bg-gradient-to-r to-[#9B53C5] from-[#4958CF] rounded-lg flex items-center p-2">
                      <div className="flex items-center gap-2 ">
                        <div className="bg-[#2F3B8B] rounded-full p-1 w-[50px] ">
                          <img
                            src="https://www.rophim.net/images/alarm.gif"
                            alt=""
                          />
                        </div>
                        <strong className="text-white">{noti}</strong>
                      </div>
                    </div>
                  )}
                  <div className=" mt-2 border rounded-[5px] w-[70px] text-center">
                    <span className="text-[15px] px-1 text-white">Phụ đề</span>
                  </div>
                  <div className="mt-[20px] grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2  gap-3">
                    {watchchap.map((watchchap, index) => {
                      return chap2 > 1 ? (
                        <NavLink
                          to={`/watch/${id}/${watchchap.slug}`}
                          onClick={() => {
                            setFilm(watchchap.link_m3u8);
                          }}
                          key={index}
                          className={({ isActive }) =>
                            isActive
                              ? "flex items-center justify-center  gap-2 px-2 py-1 bg-[#5aac5aa8] w-full h-[50px] rounded-md text-white text-[14px] group hover:text-[#F2CE71]"
                              : "flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-full h-[50px] rounded-md text-white text-[14px] group hover:text-[#F2CE71]"
                          }
                        >
                          <FontAwesomeIcon
                            className="text-[15px] text-white  group-hover:text-[#F2CE71] "
                            icon={faPlay}
                          />
                          Tập {index + 1}
                        </NavLink>
                      ) : (
                        <Link
                          key={index}
                          className="flex items-center justify-center  gap-2 w-full  md:w-[300px] h-[150px] rounded-[8px] text-white text-[14px] group hover:text-[#F2CE71] relative "
                        >
                          <div className="absolute bg-gradient-to-r from-[#838699]  w-full h-full top-0 left-0 rounded-bl-lg rounded-tl-lg"></div>
                          <div className="absolute left-[15px] text-[17px] text-white font-[600] ">
                            <p>{watchinfo.name}</p>
                            <div className="p-1 bg-white rounded-md w-[100px] mt-2 ">
                              <p className="text-black text-[12px] text-center font-medium">
                                Xem bản này
                              </p>
                            </div>
                          </div>
                          <img
                            src={`${watchinfo.thumb_url}`}
                            className="w-full h-full object-cover rounded-[8px]"
                            alt=""
                          />
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-[35px]">
                    <div className="flex items-center gap-3 " id="comment">
                      <FontAwesomeIcon
                        className="text-[20px] text-white  group-hover:text-[#F2CE71] "
                        icon={faComments}
                      />
                      <span className="text-[20px] text-white">Bình luận</span>
                    </div>
                    <div className="w-full bg-[white]  rounded-xl mt-5 ">
                      <FacebookComments
                        href={`https://www.noazmovie.site/${id}`}
                        className="p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-1/3 flex">
              <div className="h-full w-[1px] bg-[#aaaaaa52]"></div>

              <div className="p-3 w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href="#comment"
                      className="flex flex-col items-center p-2 hover:bg-[#1f2028b2] gap-1 rounded-md"
                    >
                      <FontAwesomeIcon
                        className="text-[18px] hover:text-[#FFD875] text-white"
                        icon={faComments}
                      />
                      <p className="text-[12px] font-[400] text-white">
                        Bình luận
                      </p>
                    </a>
                    <div className="w-[1px] h-[30px] bg-[#aaaaaa28]"></div>
                    <FacebookShareButton
                      url={`http://localhost:5174/watch/${id}`}
                    >
                      <div className="flex flex-col items-center p-2 hover:bg-[#1f2028b2] gap-1 rounded-md">
                        <FontAwesomeIcon
                          className="text-[18px] hover:text-[#FFD875] text-white"
                          icon={faPaperPlane}
                        />
                        <p className="text-[12px] font-[400] text-white">
                          Chia sẻ
                        </p>
                      </div>
                    </FacebookShareButton>
                  </div>
                  <button className="flex flex-col items-center p-2 hover:bg-[#1f2028b2] gap-1 rounded-md">
                    <FontAwesomeIcon
                      className="text-[18px] hover:text-[#FFD875] text-white"
                      icon={faComments}
                    />
                    <p className="text-[12px] font-[400] text-white">
                      Đánh giá
                    </p>
                  </button>
                </div>
                <div className="w-full h-[1px] bg-[#aaaaaa28] my-[1em]"></div>
                <div>
                  <h1 className="text-[20px] text-white">Diễn viên</h1>
                  <div className="mt-[20px] grid lg:grid-cols-3 grid-cols-2 gap-3">
                    {actors.map((actors, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center gap-1"
                        >
                          <img
                            src={
                              images[actors] ||
                              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                            }
                            className="w-[80px] h-[80px] rounded-full object-cover"
                            alt=""
                          />
                          <p className="text-[14] text-center text-white hover:text-[#F4CE70] w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {actors}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#aaaaaa28] my-[1em]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Watch;
