import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookProvider, ShareButton } from "react-facebook";
import { React, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  faPlay,
  faHeart,
  faPlus,
  faPaperPlane,
  faComments,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function Info() {
  const [value, setValue] = useState(0);
  const [info, getInfo] = useState("");
  const [actors, setActors] = useState([]);
  const [category, setCatgetory] = useState([]);
  const [director, setDirector] = useState([]);
  const [country, setCountry] = useState([]);
  const [chap, setChap] = useState([]);
  const [DX, setDX] = useState([]);
  const [cmt, setcmt] = useState("");
  const [chap2, setChap2] = useState("");
  const [hideinfo, setHideInfo] = useState(true);
  const [images, setImages] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const url = "https://yourwebsite.com";
  useEffect(() => {
    const InfoFilm = async () => {
      try {
        const res = await axios.get(`https://phimapi.com/phim/${id}`);
        getInfo(res.data.movie);
        setCatgetory(res.data.movie.category);
        setDirector(res.data.movie.director);
        setCountry(res.data.movie.country);
        setChap(res.data.episodes[0].server_data);
        setChap2(res.data.episodes[0].server_data.length);
        setActors(res.data.movie.actor);
      } catch (error) {}
    };
    InfoFilm();
  }, [id]);

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
  const response = `${info.content}`;
  const decodeHTML = (html) => {
    const div = document.createElement("p");
    div.innerHTML = html;
    return div.textContent || div.innerText;
  };

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

  return (
    <>
      <div className="">
        <div className="xl:absolute  inset-0  relative">
          <div className="relative w-full xl:h-[550px]">
            <div className=" absolute w-full h-full bg-[#00000042] bg-pixel-overlay top-0 left-0  pointer-events-none"></div>
            <img
              className="w-full h-full object-cover "
              src={`${info.thumb_url}`}
              alt=""
            />
          </div>
          <div className="absolute w-[160px] bottom-[-170px]  left-1/2 -translate-x-1/2 -translate-y-1/2 xl:hidden block">
            <img
              className="rounded-[10px] w-full h-full"
              src={`${info.poster_url}`}
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center flex-col justify-center gap-2 mt-[65px] xl:hidden block">
          <p className="text-[25px] text-white font-[600]">{info.name}</p>
          <div className="flex items-center justify-center gap-2">
            <p
              onClick={() => {
                setHideInfo(!hideinfo);
              }}
              className="text-[14px] text-[#B89E5C] "
            >
              Thông tin phim
            </p>
            <FontAwesomeIcon
              className="text-[14px] text-[#B89E5C] mb-1"
              icon={faCaretDown}
            />
          </div>
        </div>
        <div className="xl:mt-[360px] flex p-4 relative flex-col xl:flex-row ">
          {hideinfo && (
            <div className="xl:w-[30%] w-full  xl:bg-gradient-to-t from-[#171922e8] to-[#181b25ec] rounded-tl-[20px] xl:rounded-tr-[45px] max-xl:rounded-[15px] max-xl:bg-[#14151C] ">
              <div className="p-5">
                <img
                  className="w-[160px] h-[240px] object-cover rounded-lg hidden xl:block"
                  src={`${info.poster_url}`}
                  alt=""
                />

                <div className="mt-3 xl:block hidden">
                  <p className="text-[25px] text-white font-[600]">
                    {info.name}
                  </p>
                  <p className="text-[14px] text-[#F4CE70]">
                    {info.origin_name}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <div className=" bg-white rounded-[6px]">
                    <span className="px-1 text-black"> {info.quality}</span>
                  </div>
                  {category.map((ctg, index) => {
                    return (
                      <div key={index} className=" border rounded-[6px]">
                        <span className="px-1 text-white">{ctg.name}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <span className="text-[14px] text-white font-[500]">
                    Giới thiệu:
                  </span>
                  <p className="text-[14px] font-[300] text-[#aaa]">
                    {decodeHTML(response)}
                  </p>
                </div>

                <div className="mt-3 flex  flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] text-white font-[500]">
                      Quốc gia:
                    </span>
                    {country.map((country, index) => {
                      return (
                        <p
                          key={index}
                          className="text-[14px] font-[300] text-[#aaa]"
                        >
                          {country.name}
                        </p>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] text-white font-[500]">
                      Đạo diễn:
                    </span>
                    {director.map((dir, index) => {
                      return (
                        <p
                          key={index}
                          className="text-[14px] font-[300] text-[#aaa]"
                        >
                          {dir}
                        </p>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] text-white font-[500]">
                      Thời lượng:
                    </span>
                    <p className="text-[14px] font-[300] text-[#aaa]">
                      {info.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="xl:w-[70%] xl:bg-gradient-to-t from-[#171922e8] to-[#181b25ec]  rounded-tl-[45px] rounded-tr-[25px]">
            <div className="px-4 py-7">
              <div className="flex items-center">
                <div className="flex items-center md:gap-[50px] sm:flex-row flex-col gap-3 ">
                  <Link
                    to={`/watch/${id}`}
                    className="px-7 py-4 bg-gradient-to-t to-[#ecd59a] from-[#e2c988] rounded-[25px] text-[18px] font-bold hover:opacity-80 max-md:w-full text-center"
                  >
                    <FontAwesomeIcon className="text-[20px] " icon={faPlay} />{" "}
                    Xem ngay
                  </Link>
                  <div className="flex items-center md:gap-[35px] gap-[25px]">
                    <button className="flex flex-col items-center p-2 hover:bg-[#1f2028b2] gap-1 rounded-md">
                      <FontAwesomeIcon
                        className="text-[18px] hover:text-[#FFD875] text-white"
                        icon={faHeart}
                      />

                      <p className="text-[12px] font-[400] text-white ">
                        Yêu thích
                      </p>
                    </button>
                    <button className="flex flex-col items-center p-2 hover:bg-[#1f2028b2] gap-1 rounded-md">
                      <FontAwesomeIcon
                        className="text-[18px] hover:text-[#FFD875] text-white"
                        icon={faPlus}
                      />

                      <p className="text-[12px] font-[400] text-white ">
                        Thêm vào
                      </p>
                    </button>
                    <FacebookProvider appId="93bf4f1bd52766f54a98afca49ac24ae">
                      <ShareButton
                        className="flex flex-col items-center p-2 hover:bg-[#1f2028b2] gap-1 rounded-md"
                        href={url}
                      >
                        {" "}
                        <FontAwesomeIcon
                          className="text-[18px] hover:text-[#FFD875] text-white"
                          icon={faPaperPlane}
                        />
                        <p className="text-[12px] font-[400] text-white ">
                          Chia sẻ
                        </p>
                      </ShareButton>
                    </FacebookProvider>
                    <button className="flex flex-col items-center p-2 hover:bg-[#1f2028b2] gap-1 rounded-md">
                      <FontAwesomeIcon
                        className="text-[18px] hover:text-[#FFD875] text-white"
                        icon={faComments}
                      />

                      <p className="text-[12px] font-[400] text-white ">
                        Bình luận
                      </p>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 w-[100px] rounded-lg border">
                    <FontAwesomeIcon
                      className="text-[30px] text-white"
                      icon={faImdb}
                    />{" "}
                    <p className="text-[20px] text-white font-medium">0</p>
                  </div>
                </div>
              </div>

              <div className="mt-[30px]">
                <Tabs
                  className="text-white"
                  textColor="inherit"
                  value={value}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#D97D54",
                    },
                  }}
                  onChange={handleChange}
                  aria-label="tabs example"
                >
                  <Tab label={<span className="text-[12px]">Tập phim</span>} />
                  <Tab
                    label={<span className=" text-[12px]">Diễn viên</span>}
                  />
                  <Tab label={<span className=" text-[12px]">Đề xuất</span>} />
                </Tabs>

                <div className="mt-[25px]">
                  {value === 0 && (
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {chap.map((chap, index) => {
                          return chap2 > 2 ? (
                            <Link
                              key={index}
                              to={`/watch/${id}/${chap.slug}`}
                              className="flex items-center justify-center  gap-2 px-2 py-1 bg-[#282B3A] w-[150px] h-[50px] rounded-md text-white text-[14px] group hover:text-[#F2CE71] "
                            >
                              <FontAwesomeIcon
                                className="text-[15px] text-white  group-hover:text-[#F2CE71] "
                                icon={faPlay}
                              />
                              Tập {index + 1}
                            </Link>
                          ) : (
                            <Link
                              key={index}
                              to={`/watch/${id}/${chap.slug}`}
                              className="flex items-center justify-center  gap-2 w-full  md:w-[300px] h-[150px] rounded-[8px] text-white text-[14px] group hover:text-[#F2CE71] relative "
                            >
                              <div className="absolute bg-gradient-to-r from-[#838699]  w-full h-full top-0 left-0 rounded-bl-lg rounded-tl-lg"></div>
                              <div className="absolute left-[15px] text-[17px] text-white font-[600] ">
                                <p>{info.name}</p>
                                <div className="p-1 bg-white rounded-md w-[100px] mt-2 ">
                                  <p className="text-black text-[12px] text-center font-medium">
                                    Xem bản này
                                  </p>
                                </div>
                              </div>
                              <img
                                src={`${info.thumb_url}`}
                                className="w-full h-full object-cover rounded-[8px]"
                                alt=""
                              />
                            </Link>
                          );
                        })}
                      </div>

                      <div className="mt-[35px]">
                        <div className="flex items-center gap-3">
                          <FontAwesomeIcon
                            className="text-[20px] text-white  group-hover:text-[#F2CE71] "
                            icon={faComments}
                          />
                          <span className="text-[20px] text-white">
                            Bình luận
                          </span>
                        </div>
                        <div className="w-full bg-[#14151C] h-[200px] rounded-xl mt-5 flex items-center justify-center">
                          <FontAwesomeIcon
                            className="text-[18px] text-white  group-hover:text-[#F2CE71] font-[300] "
                            icon={faComments}
                          />
                          <span className="text-[15px] text-white ml-3 font-[300]">
                            Chưa có bình luận nào
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {value === 1 && (
                    <div>
                      <h2 className="text-[25px] font-[600] text-white ">
                        Diễn viên
                      </h2>
                      <div className="mt-[35px] grid grid-cols-2 xl:grid-cols-5 sm:grid-cols-4 gap-4">
                        {actors.map((actors, index) => {
                          return (
                            <div key={index} className="relative ">
                              <div className="w-full h-full bg-[#00000049] absolute top-0 left-0 pointer-events-none"></div>
                              <img
                                className="rounded-md w-full h-full object-cover"
                                src={
                                  images[actors] ||
                                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                }
                                alt=""
                              />

                              <p className="text-[14px] text-white absolute bottom-0 left-1 w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                                {actors}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {value === 2 && (
                    <div>
                      <h2 className="text-[25px] font-[600] text-white ">
                        Có thể bạn sẽ thích
                      </h2>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7 mt-[25px]">
                        {DX.map((dx, index) => {
                          return (
                            <Link key={index} to={`/info/${dx.slug}`}>
                              <div>
                                <div className="flex items-center flex-col">
                                  <div className="relative">
                                    <img
                                      className="rounded-xl w-[180px] h-[250px] object-cover"
                                      src={`${dx.poster_url}`}
                                      alt="Anh"
                                    />
                                  </div>
                                  <p className="mt-2 text-white text-[14px] hover:text-[#F2CE71] w-[170px] line-clamp-2 text-center text-ellipsis overflow-hidden">
                                    {dx.name}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;