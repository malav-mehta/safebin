import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paste } from "../lib";

const PastePage = () => {
  const { shortLink } = useParams<{ shortLink: string }>();
  const [paste, setPaste] = useState<{
    message?: string;
    hasError?: boolean;
    err?: any;
    paste?: TServerPaste;
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (loading) {
      Paste.get({ shortLink, password }).then((result) => {
        setLoading(false);
        setPaste(result);
        setPassword("");
      });
    }
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {paste.paste ? (
            <div>
              <h4>{paste.paste?.title}</h4>
              <p>{paste.paste?.paste_content}</p>
              <p>
                Created at:{" "}
                {new Date(paste.paste?.created_at).toLocaleDateString("en-US", {
                  day: "2-digit",
                  weekday: "short",
                  year: "numeric",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <p>
                Expires at:{" "}
                {new Date(paste.paste?.expiration_time).toLocaleDateString(
                  "en-US",
                  {
                    day: "2-digit",
                    weekday: "short",
                    year: "numeric",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                )}
              </p>
              <p>{paste.paste?.language}</p>
              <p>Reads: {paste.paste?.read_count}</p>
            </div>
          ) : (
            <p>{"Error: " + paste.err?.code || "Error"}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PastePage;
