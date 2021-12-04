import axios from "axios";
import { useCallback, useState, useEffect } from "react";

const usePost = (url, body, headers) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(url, body, { headers });
      if (res && res.status === 200) {
        setData(res);
      } else {
        console.log("Something went wrong, please try again later.");
        setData(null);
      }
    } catch (error) {
      setError(error);
      setData(null);
    }
    console.log("inside usepost");
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData, url]);

  return { loading, data, error };
};

export default usePost;
