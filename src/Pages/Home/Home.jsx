import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import {
  faPlay,
  faHeart,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import axios from "axios";
function Home() {
  const [Authentication, setAuthentication] = useState(false);
  const [MCN, setMCN] = useState([]);
  const [random, setRandom] = useState("");
  const HQ = useAxios("https://phimapi.com/v1/api/quoc-gia/han-quoc");
  const TQ = useAxios("https://phimapi.com/v1/api/quoc-gia/trung-quoc");
  const HH = useAxios("https://phimapi.com/v1/api/danh-sach/hoat-hinh");
  const PL = useAxios(`https://phimapi.com/v1/api/danh-sach/phim-le?limit=25`);
  const PB = useAxios(`https://phimapi.com/v1/api/danh-sach/phim-bo?limit=25`);
  const TV = useAxios(`https://phimapi.com/v1/api/danh-sach/tv-shows?limit=25`);
  const KH = useAxios(`https://phimapi.com/v1/api/the-loai/khoa-hoc?limit=25`);
  const DX = useAxios(`https://phimapi.com/v1/api/nam/2024?page=2&limit=64`);
  useEffect(() => {
    const APIUPDATE = async () => {
      try {
        const res = await axios.get(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat"
        );
        setMCN(res.data.items);
      } catch (error) {}
    };
    APIUPDATE();

    setTimeout(() => {}, 3000);
  }, []);

  return (
    <div>
      <div className="w-full lg:h-[500px]">
        <div className="lg:absolute inset-0 w-full lg:h-[500px]">
          <Swiper effect="fade" modules={[Pagination, EffectFade]} speed={800}>
            {MCN.map((mcn, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="">
                    <div className="w-full h-full absolute top-0 left-0  bg-pixel-overlay z-10 pointer-events-none"></div>{" "}
                    <img
                      className="w-full lg:h-[750px] object-cover "
                      src={`${mcn.thumb_url}`}
                      alt=""
                    />
                    <div className="absolute lg:left-16 left-4 lg:bottom-[220px] bottom-[50px] ease-in-out animate-slideIn ">
                      <div>
                        <img
                          className="w-[150px] lg:block hidden"
                          src={`${mcn.poster_url}`}
                          alt=""
                        />
                      </div>
                      <div className="flex items-center gap-4 mt-4 ">
                        <div className=" bg-white rounded-[6px]">
                          <span className="px-1 text-black">FHD</span>
                        </div>
                        <div className=" border rounded-[6px]">
                          <span className="px-1 text-white">{mcn.year}</span>
                        </div>
                      </div>
                      <Link
                        to={`info/${mcn.slug}`}
                        className="text-white font-bold text-[25px] w-[600px] mt-4"
                      >
                        {mcn.name}
                      </Link>

                      <div className=" lg:flex items-center gap-[25px] mt-4 hidden">
                        <Link
                          to={`watch/${mcn.slug}`}
                          className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-[#FEDD8A] hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] ]"
                        >
                          <FontAwesomeIcon
                            className="text-[20px]"
                            icon={faPlay}
                          />
                        </Link>

                        <div className="flex items-center gap-5 border px-4 py-2 rounded-xl hover:border-white">
                          <button>
                            <FontAwesomeIcon
                              className="text-white text-[25px] hover:text-[#FEDD8A]"
                              icon={faHeart}
                            />
                          </button>
                          <div className="w-[1px] h-[25px] bg-white"></div>
                          <Link to={`/info/${mcn.slug}`}>
                            <FontAwesomeIcon
                              className="text-white text-[25px] hover:text-[#FEDD8A]"
                              icon={faCircleInfo}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="px-4 relative bottom-0 z-20 lg:block hidden">
        <h1 className="lg:text-[25px] text-white lg:font-semibold lg:w-full w-[235px] overflow-hidden text-ellipsis whitespace-nowrap ">
          Đề xuất hot
        </h1>
        <div className="mt-[20px]">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
              1460: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
          >
            {DX.map((dx, index) => {
              return (
                <SwiperSlide key={index} className="group">
                  <div className="w-full">
                    <Link to={`/info/${dx.slug}`}>
                      <img
                        className="w-[209px] h-[300px] object-cover"
                        src={`https://phimimg.com/${dx.poster_url}`}
                        alt=""
                      />

                      <p className="mt-1 text-white lg:text-center text-[14px] w-[150px] overflow-hidden  text-ellipsis line-clamp-1">
                        {dx.name}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div>
        <div className="p-4 lg:block hidden ">
          <div className="p-4 w-full  bg-[#272A39] rounded-xl flex flex-col gap-[10px]">
            <div className="flex items-center lg:flex-row gap-14 flex-col ">
              <div className="w-[35%]">
                <h1 className="text-[28px] font-bold text-white">
                  Phim Hàn Quốc mới
                </h1>
                <Link className="text-[14px] text-white" href="#!">
                  Xem toàn bộ
                </Link>
              </div>
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={4}
                spaceBetween={30}
                navigation={true}
                className="relative overflow-visible"
              >
                {HQ.map((hq, index) => {
                  return (
                    <SwiperSlide key={index} className="group z-0">
                      <Link to={`/info/${hq.slug}`}>
                        <div>
                          <div className="relative">
                            <img
                              className="rounded-xl"
                              src={`https://phimimg.com/${hq.thumb_url}`}
                              alt={hq.name}
                            />

                            <div className="absolute bottom-0 left-3">
                              <div className="flex">
                                <div className="w-[70px] h-[20px] flex items-center justify-center bg-[#5E6070] rounded-tl-[6px]">
                                  <p className="text-center text-[14px]">
                                    {hq.quality}
                                  </p>
                                </div>
                                <div className="w-[70px] h-[20px] flex items-center justify-center bg-[#2CA20D] rounded-tr-[6px]">
                                  <p className="text-center text-[14px]">
                                    {hq.lang}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-white text-[14px] hover:text-[#F2CE71] w-[200px] whitespace-nowrap text-ellipsis overflow-hidden">
                            {hq.name}
                          </p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="flex items-center gap-14">
              <div className="w-[35%]">
                <h1 className="text-[28px] font-bold text-white">
                  Phim Trung Quốc mới
                </h1>
                <Link className="text-[14px] text-white" href="#!">
                  Xem toàn bộ
                </Link>
              </div>
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={4}
                spaceBetween={30}
                navigation={true}
                className="mySwiper"
              >
                {TQ.map((tq, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link to={`/info/${tq.slug}`}>
                        <div>
                          <div className="relative">
                            <img
                              className="rounded-xl"
                              src={`https://phimimg.com/${tq.thumb_url}`}
                              alt=""
                            />

                            <div className="absolute bottom-0 left-3">
                              <div className="flex ">
                                <div className="w-[70px] h-[20px] flex items-center justify-center bg-[#5E6070] rounded-tl-[6px]">
                                  <p className="text-center text-[14px]">
                                    {tq.quality}
                                  </p>
                                </div>
                                <div className="w-[70px] h-[20px] flex items-center justify-center bg-[#2CA20D] rounded-tr-[6px]">
                                  <p className="text-center text-[14px]">
                                    {tq.lang}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-white text-[14px] hover:text-[#F2CE71] w-[200px] whitespace-nowrap text-ellipsis overflow-hidden">
                            {tq.name}
                          </p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="flex items-center gap-14">
              <div className="w-[35%]">
                <h1 className="text-[28px] font-bold text-white">
                  Phim Hoạt Hình mới
                </h1>
                <Link className="text-[14px] text-white" href="#!">
                  Xem toàn bộ
                </Link>
              </div>
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={4}
                spaceBetween={30}
                navigation={true}
                className="mySwiper"
              >
                {HH.map((hh, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link to={`/info/${hh.slug}`}>
                        <div>
                          <div className="relative">
                            <img
                              className="rounded-xl"
                              src={`https://phimimg.com/${hh.thumb_url}`}
                              alt=""
                            />

                            <div className="absolute bottom-0 left-3">
                              <div className="flex ">
                                <div className="w-[70px] h-[20px] flex items-center justify-center bg-[#5E6070] rounded-tl-[6px]">
                                  <p className="text-center text-[14px]">
                                    {hh.quality}
                                  </p>
                                </div>
                                <div className="w-[70px] h-[20px] flex items-center justify-center bg-[#2CA20D] rounded-tr-[6px]">
                                  <p className="text-center text-[14px]">
                                    {hh.lang}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-white text-[14px] hover:text-[#F2CE71] w-[200px] whitespace-nowrap text-ellipsis overflow-hidden">
                            {hh.name}
                          </p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h1 className="lg:text-[25px] text-white lg:font-semibold lg:w-full w-[235px] overflow-hidden text-ellipsis whitespace-nowrap ">
            Phim Điện Ảnh Mới Coóng
          </h1>
          <div className="mt-[20px]">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 7,
                  spaceBetween: 20,
                },
              }}
            >
              {PL.map((pl, index) => {
                return (
                  <SwiperSlide key={index} className="group">
                    <div className="w-full">
                      <Link to={`/info/${pl.slug}`}>
                        <img
                          className="w-[209px] h-[300px] object-cover"
                          src={`https://phimimg.com/${pl.poster_url}`}
                          alt=""
                        />

                        <p className="mt-1 text-white lg:text-center text-[14px] w-[150px] overflow-hidden  text-ellipsis line-clamp-2">
                          {pl.name}
                        </p>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="lg:text-[25px] text-white lg:font-semibold lg:w-[500px] w-[235px] overflow-hidden text-ellipsis whitespace-nowrap ">
              Mãn nhãn với phim khoa học viễn tưởng
            </h1>
            <Link className="text-white" href="#!">
              Xem thêm
            </Link>
          </div>
          <div className="mt-[25px]">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              <div className="w-full">
                {KH.map((kh, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link to={`/info/${kh.slug}`}>
                        <div>
                          <div className="relative">
                            <img
                              className="rounded-lg w-[500px] h-[300px] object-cover hidden lg:block"
                              src={`https://phimimg.com/${kh.thumb_url}`}
                              alt=""
                            />
                            <img
                              className="rounded-lg w-[209px] h-[300px] object-cover lg:hidden block"
                              src={`https://phimimg.com/${kh.poster_url}`}
                              alt=""
                            />
                          </div>

                          <div className="ml-[20px] -mt-[80px] flex items-center gap-2 ">
                            <img
                              className="w-[100px]  rounded-xl z-[99999] object-cover hidden lg:block"
                              src={`https://phimimg.com/${kh.poster_url}`}
                              alt=""
                            />

                            <div className="mt-[75px]">
                              <p className="text-white lg:text-[19px] lg:font-semibold w-[150px] lg:w-full overflow-hidden text-ellipsis whitespace-nowrap lg:text-center lg:text-nowrap mt-3 lg:mt-0">
                                {kh.name}
                              </p>
                              <p className="text-white text-[14px] hidden lg:block">
                                {kh.episode_current}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
          </div>
        </div>

        <div className="p-4">
          <h1 className="lg:text-[25px] text-white lg:font-semibold lg:w-full w-[235px] overflow-hidden text-ellipsis whitespace-nowrap ">
            Mãn nhãn với các phim bộ
          </h1>
          <div className="mt-[20px]">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 8,
                  spaceBetween: 20,
                },
              }}
              className="mySwiper"
            >
              {PB.map((pb, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="w-full">
                      <Link to={`/info/${pb.slug}`}>
                        <img
                          className="w-[209px] h-[300px] object-cover"
                          src={`https://phimimg.com/${pb.poster_url}`}
                          alt=""
                        />

                        <p className="mt-1 text-white text-center text-[14px] w-[150px] overflow-hidden  text-ellipsis line-clamp-2">
                          {pb.name}
                        </p>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="p-4">
          <h1 className="lg:text-[25px] text-white lg:font-semibold lg:w-full w-[235px] overflow-hidden text-ellipsis whitespace-nowrap ">
            Các chương trình TV Shows hấp dẫn
          </h1>
          <div className="mt-[20px]">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 8,
                  spaceBetween: 20,
                },
              }}
              className="mySwiper"
            >
              {TV.map((tvs, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="w-full">
                      <Link to={`/info/${tvs.slug}`}>
                        <img
                          className="w-[209px] h-[300px] object-cover"
                          src={`https://phimimg.com/${tvs.poster_url}`}
                          alt=""
                        />

                        <p className="mt-1 text-white text-center text-[14px] w-[150px] overflow-hidden  text-ellipsis line-clamp-2">
                          {tvs.name}
                        </p>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
