import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { handlePlusOne, handleMinusOne } from "../services/PostServices";
import { StyledCard } from "./styled/Post";
import { CardContent, Typography } from "@mui/material";

const PostDetails = (): JSX.Element => {
  const { id } = useParams();

  const [data, setData] = useState<any>({});

  const getSinglePost = async (postId: string) => {
    const res = await axios.get(`/posts/${postId}`);
    setData(res.data);
  };

  useEffect(() => {
    getSinglePost(id as string);
  }, []);

  return (
    <div>
      <p>{data.postTitle}</p>
      <StyledCard>
        <CardContent>
          <p>{data.numberOfLikes}</p>
          <div
            onClick={async () => {
              if (!handlePlusOne) return;
              await handlePlusOne(data._id as string, {
                numberOfLikes: data.numberOfLikes + 1,
              });
              getSinglePost(id as string);
            }}
          >
            +1
          </div>
          <div
            onClick={async () => {
              if (!handleMinusOne) return;
              await handleMinusOne(data._id as string, {
                numberOfLikes: data.numberOfLikes - 1,
              });

              getSinglePost(id as string);
            }}
          >
            -1
          </div>
          <Typography variant="h3" gutterBottom>
            {data.postTitle}
          </Typography>
          <Typography variant="h6">{data.postBody}</Typography>
          <p>{data.postDate}</p>
        </CardContent>
      </StyledCard>
    </div>
  );
};

export default PostDetails;
