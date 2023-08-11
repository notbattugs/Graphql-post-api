import React, { useState, ChangeEvent, use } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
interface Post {
  text: string;
}

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      text
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($postCreateInput: PostInput!) {
    createPost(PostCreateInput: $postCreateInput) {
      text
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($postDeleteInput: ID!) {
    deletePost(id: $postDeleteInput)
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery<{ getPosts: Post[] }>(GET_POSTS);

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS],
  });

  const [deletePost] = useMutation(DELETE_POST, {
    refetchQueries: [GET_POSTS],
  });
  const [text, setText] = useState("");
  const [id,setId]=useState('');
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setId(event.target.value)
  };

  const [open, setOpen] = useState(false);
  console.log(open)

  if (loading) return <div>Loading</div>;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          padding: "20px",
        }}
      >
        {data?.getPosts.map((el: Post, index: number) => (
          <div
            key={index}
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: "black",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
              position: "relative",
            }}
          >    <Button onClick={()=> deletePost({
            variables: {
              postCreateInput: id
            },
          })}>🗑Del</Button>
            <BiDotsVerticalRounded
              style={{
                position: "absolute",
                color: "white",
                right: "5px",
                top: "25px",
                fontSize: "30px",
              }}
              onClick={() => setOpen(!open)}
            />

            <div
              style={{ color: "white", fontSize: "25px", fontWeight: "500" }}
            >
              {el.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          width: "30%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          position: "fixed",
          right: "0px",
        }}
      >
        <Button
          onClick={() => {
            createPost({
              variables: {
                postCreateInput: {
                  text: text,
                },
              },
            });
          }}
        >
          Upload
        </Button>
        <Input
          color="primary"
          disabled={false}
          placeholder=""
          size="lg"
          variant="soft"
          value={text}
          onChange={handleTextChange}
        />
      </div>
    </main>
  );
}
