import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { useGlobalContext } from "../context";

const useGet = (url) => {
  const [data, setData] = useState([]);
  const { setLoading } = useGlobalContext();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      if (res && res.statusCode === 200) {
        setData(res);
      } else {
        console.log("Something went wrong, please try again later.");
        setData(null);
      }
    } catch (error) {
      console.log(error);
      setData(null);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData, url]);

  return { data };
};

export default useGet;
