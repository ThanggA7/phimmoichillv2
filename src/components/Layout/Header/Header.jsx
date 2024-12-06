import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faBars,
  faXmark,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
function Header() {
  const [search, setSearch] = useState(true);
  const [menu, setMenu] = useState(false);
  const [searchFilm, setSearchFilm] = useState("");
  const [resultFilm, setResultFilm] = useState([]);
  const [more, setMore] = useState([]);
  const [resultSearch, setResultSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const SearchFilm = (e) => {
    setSearchFilm(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const Search = async (value) => {
      try {
        const response = await axios.get(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${value}&limit=5`
        );
        if (response.data.data == null) return;
        setResultFilm(response.data.data.items);
        setMore(response.data.data.params.pagination.totalItems);
      } catch (error) {}
    };
    const handleInputChange = _.debounce((searchFilm) => {
      Search(searchFilm);
    }, 1000);
    handleInputChange(searchFilm);
  }, [searchFilm]);

  return (
    <div
      className={`${
        isScrolled ? "bg-[#14151C]" : "bg-transparent"
      } sticky top-0 z-30 transition-all duration-300`}
    >
      <header className="flex items-center justify-between py-3 px-6 relative z-90   ">
        {search == true && (
          <div className="flex gap-5">
            {menu == false ? (
              <button
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                <FontAwesomeIcon
                  className="block xl:hidden text-white text-[20px]"
                  icon={faBars}
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenu(!menu);
                }}
                className="block xl:hidden"
              >
                <FontAwesomeIcon
                  className="text-[25px] text-[#e75353f5]"
                  icon={faXmark}
                />
              </button>
            )}
            <a href="/">
              <img
                className="w-[120px]"
                src="https://www.rophim.net/images/logo.svg"
                alt=""
              />
            </a>
          </div>
        )}

        <div className="w-[350px] h-[45px] rounded-md bg-[#2d3139b2] flex items-center hidden xl:flex  relative ">
          <FontAwesomeIcon
            className="p-3 text-[px] text-[white]"
            icon={faMagnifyingGlass}
          />
          <input
            onChange={SearchFilm}
            value={searchFilm}
            className="w-full h-full bg-transparent outline-none  text-[white]"
            placeholder="Tìm kiếm phim, diễn viên"
            type="text"
          />
          {searchFilm && (
            <div className="w-[350px] bg-[#2d3139ad] absolute top-[40px] z-50 rounded-xl p-3">
              {resultFilm.map((rsf, index) => {
                return (
                  <Link
                    key={index}
                    to={`/info/${rsf.slug}`}
                    className="w-full h-[70px] rounded-md p-1 flex items-center gap-4 hover:bg-[#3e434ba6] "
                  >
                    <img
                      className="w-[50px] h-full object-cover"
                      src={`https://phimimg.com/${rsf.poster_url}`}
                      alt=""
                    />

                    <div>
                      <p className="text-white text-[17px] w-[270px] overflow-hidden text-ellipsis whitespace-nowrap ">
                        {rsf.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-white text-[14px] ">{rsf.lang}</p>
                        <div className="flex items-center gap-2">
                          <div className="bg-black w-[5px] h-[5px] rounded-full"></div>
                          <p className="text-white text-[14px] ">{rsf.time}</p>
                        </div>{" "}
                        <div className="flex items-center gap-2">
                          <div className="bg-black w-[5px] h-[5px] rounded-full"></div>
                          <p className="text-white text-[14px] ">{rsf.year}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              {more > 5 && (
                <Link className="w-full h-[40px] rounded-md p-1 flex items-center justify-center gap-4 bg-slate-600 ">
                  <p className="text-[17px] font-medium text-white">
                    Xem thêm...
                  </p>
                </Link>
              )}
              {resultFilm.length == 0 && (
                <div className="w-full h-[40px] rounded-md p-1 flex items-center justify-center gap-4 bg-slate-600 ">
                  <p className="text-[14px] font-medium text-white hover:text-[#FEDD8A] cursor-pointer">
                    Không tìm thấy kết quả nào
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* PC  */}
        <nav className="hidden xl:block">
          <ul className="flex items-center gap-[30px] text-[white]">
            <li>
              <a href="#!">Chủ đề</a>
            </li>
            <li>
              <a href="#!">Phim lẻ</a>
            </li>
            <li>
              <a href="#!">Phim bộ</a>
            </li>
            <li>
              <a href="#!">Quốc gia</a>
            </li>
            <li>
              <a href="#!">Diễn viên</a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 text-white hidden xl:flex">
          <button className="flex gap-3 items-center w-[130px] p-[5px] bg-[#FFFFFF] text-[#3A4783] rounded-xl justify-center  ">
            <FontAwesomeIcon icon={faUser} />
            <a href="#">Đăng nhập</a>
          </button>

          <button className="flex gap-3 items-center w-[120px] p-[5px]  border rounded-xl justify-center ">
            <FontAwesomeIcon icon={faUserPlus} />
            <a href="#">Đăng ký</a>
          </button>
        </div>
        {search == false && (
          <div
            className="w-full h-[35px] rounded-md bg-[#2D3139] flex items-center mr-2 p-2 xl:hidden relative
            "
          >
            <input
              onChange={SearchFilm}
              value={searchFilm}
              className="w-full h-full bg-transparent outline-none mb-[3px] text-[white]"
              placeholder="Tìm kiếm phim, diễn viên"
              type="text"
            />
            {searchFilm && (
              <div className="w-full bg-[#2d3139fa] absolute top-[40px] left-0 z-50 rounded-xl p-3">
                {resultFilm.map((rsf, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/info/${rsf.slug}`}
                      className="w-full h-[70px] rounded-md p-1 flex items-center gap-4 "
                    >
                      <img
                        className="w-[50px] h-full object-cover"
                        src={`https://phimimg.com/${rsf.poster_url}`}
                        alt=""
                      />

                      <div>
                        <p className="text-white text-[17px] w-[270px] overflow-hidden text-ellipsis whitespace-nowrap ">
                          {rsf.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-white text-[14px] ">{rsf.lang}</p>
                          <div className="flex items-center gap-2">
                            <div className="bg-black w-[5px] h-[5px] rounded-full"></div>
                            <p className="text-white text-[14px] ">
                              {rsf.time}
                            </p>
                          </div>{" "}
                          <div className="flex items-center gap-2">
                            <div className="bg-black w-[5px] h-[5px] rounded-full"></div>
                            <p className="text-white text-[14px] ">
                              {rsf.year}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {more > 5 && (
                  <Link className="w-full h-[40px] rounded-md p-1 flex items-center justify-center gap-4 bg-slate-600 ">
                    <p className="text-[17px] font-medium text-white">
                      Xem thêm...
                    </p>
                  </Link>
                )}
                {resultFilm.length == 0 && (
                  <div className="w-full h-[40px] rounded-md p-1 flex items-center justify-center gap-4 bg-slate-600 ">
                    <p className="text-[14px] font-medium text-white hover:text-[#FEDD8A] cursor-pointer">
                      Không tìm thấy kết quả nào
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {search == true ? (
          <button
            onClick={() => {
              setSearch(!search);
            }}
            className="text-white text-[20px] block xl:hidden"
          >
            <FontAwesomeIcon
              className="text-[20px] text-[white]"
              icon={faMagnifyingGlass}
            />
          </button>
        ) : (
          <button
            onClick={() => {
              setSearch(!search);
              setSearchFilm("");
            }}
            className="block xl:hidden"
          >
            <FontAwesomeIcon
              className="text-[25px] text-[#e75353f5]"
              icon={faXmark}
            />
          </button>
        )}
      </header>

      {/* MOBILE / TABLET / NAVBAR */}
      {menu == true && (
        <div className="w-full  bg-[#3A4783]  ">
          <div className="p-3">
            <div className="flex items-center justify-center gap-4 text-white">
              <button className="flex gap-3 items-center w-[130px] p-[10px] bg-[#FFFFFF] text-[#3A4783] rounded-xl  ">
                <FontAwesomeIcon icon={faUser} />
                <a href="#">Đăng nhập</a>
              </button>

              <button className="flex gap-3 items-center w-[120px] p-[10px]  border rounded-xl">
                <FontAwesomeIcon icon={faUserPlus} />
                <a href="#">Đăng ký</a>
              </button>
            </div>
            <nav className="mt-[15px] text-[white] font-semibold">
              <ul className="grid grid-cols-2 gap-2">
                <li>
                  <a href="#!">Chủ đề</a>
                </li>
                <li>
                  <a href="#!">Phim lẻ</a>
                </li>
                <li>
                  <a href="#!">Phim bộ</a>
                </li>
                <li>
                  <a href="#!">Quốc gia</a>
                </li>
                <li>
                  <a href="#!">Diễn viên</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;