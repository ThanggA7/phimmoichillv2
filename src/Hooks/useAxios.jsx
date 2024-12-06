import axios from "axios";
import { useEffect, useState } from "react";

function useAxios(link) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const API = async () => {
      try {
        const res = await axios.get(link);
        setData(res.data.data.items);
      } catch (error) {}
    };
    API();
  }, [link]);

  return data;
}

export default useAxios;
