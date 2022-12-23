import axios from "axios";
import React, { ReactElement, useState } from "react";
import classes from "../components/errors/errors.module.css";

interface UseRequestProps {
  url: string;
  method: "post" | "get" | "put" | "delete";
  body?: any;
  onSuccess?: () => void;
}

const useRequest = ({ url, method, body }: UseRequestProps) => {
  //method === 'POST' || 'GET' || 'PUT' || 'DELETE'
  const [errors, setErrors] = useState<null | ReactElement>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors(
          <div className={classes.errors}>
            <ul>
              {err.response?.data.errors.map((error: any, index: number) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        );
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
