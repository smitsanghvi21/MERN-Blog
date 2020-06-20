import React, { useState } from "react";

const CommentForm = (props) => {
  const { name, setArticleInfo } = props;
  const initialState = {
    name: "",
    comment: "",
  };
  const [userData, setUserData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //sending a post request to post comments
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (userData.name.length > 0 && userData.comment.length > 2) {
      fetch(
        `/api/articles/${name}/comment`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: userData.name, text: userData.comment }),
        },
        (userData) => console.log(userData)
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setArticleInfo(result);
            setUserData(initialState);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        );
    }
  };
  return (
    <div id="add-comment-form">
      <label>Name</label>
      <input name="name" value={userData.name} onChange={handleChange} />
      <label>Comment</label>
      <input name="comment" value={userData.comment} onChange={handleChange} />
      <button onClick={handleOnSubmit}>Add</button>
    </div>
  );
};
export default CommentForm;
