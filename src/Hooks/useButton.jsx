import axios from "axios";
import { useState } from "react";

function useButton(link) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(link);
      setData(res.data.episodes[0].server_data[0].link_m3u8);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export default useButton;
