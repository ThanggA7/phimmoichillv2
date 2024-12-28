import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "../../components/Layout/Loading/Loading";
function Category() {
  const [Category, setCategory] = useState([""]);
  const [titlePage, settitlePage] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState([""]);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#e1f5fe",
      },
    },
  });
  const { id } = useParams();
  useEffect(() => {
    const Category = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://phimapi.com/v1/api/danh-sach/${id}?page=${page}&limit=32`
        );
        setCategory(res.data.data.items);
        settitlePage(res.data.data.titlePage);
        setTotalPage(res.data.data.params.pagination.totalPages);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    Category();
  }, [id, page]);

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <span class="flex items-center justify-center  text-[35px] font-extrabold text-white">
            NOAZMOVIE
          </span>
        </div>
      ) : (
        <div>
          <div className="p-4">
            <div>
              <h1 className="text-[1.8rem] text-white font-[600]">
                {titlePage}
              </h1>
            </div>
            <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-5 mt-[20px] ">
              {Category.map((Category, index) => {
                return (
                  <Link
                    key={index}
                    to={`/info/${Category.slug}`}
                    className="flex items-center flex-col justify-center mt-[20px]"
                  >
                    <div className="w-full h-[300px] rounded-lg">
                      <img
                        className="w-full h-full object-cover"
                        src={`https://phimimg.com/${Category.poster_url}`}
                        alt=""
                      />
                      <div className="w-full h-full  rounded-lg  hover:bg-[#00000000]"></div>
                    </div>
                    <p className="text-center text-white text-[14px] w-[150px] overflow-hidden  text-ellipsis line-clamp-1 mt-1 hover:text-yellow-300">
                      {Category.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center p-2 mt-[30px]">
            <Stack spacing={2}>
              <ThemeProvider theme={theme}>
                <Pagination
                  color="secondary"
                  count={totalPage}
                  page={page}
                  onChange={handleChange}
                />
              </ThemeProvider>
            </Stack>
          </div>
        </div>
      )}
    </>
  );
}

export default Category;
