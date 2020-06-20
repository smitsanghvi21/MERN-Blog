import React from "react";

const Like = (props) => {
  const { foundArticle, setArticleInfo, likes } = props;
  const handleOnClick = async () => {
    const result = await fetch(`/api/articles/${foundArticle}/likes`, {
      method: "POST",
    });
    const body = await result.json();
    setArticleInfo(body);
  };
  return (
    <div>
      <p>Total likes: {likes}</p>
      <button onClick={handleOnClick}>Like</button>
    </div>
  );
};
export default Like;
