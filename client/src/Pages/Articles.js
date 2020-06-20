import React, { useState, useEffect } from "react";
import articles from "./Content";
import { Link } from "react-router-dom";
import ArticleList from "../components/ArticleList";
import CommentForm from "../components/CommentForm";
import CommentsList from "../components/CommentsList";
import Like from '../components/Like';

const Articles = ({ match }) => {
  const name = match.params.name;

  const [articleInfo, setArticleInfo] = useState([]);
  const [commentsData, setCommentsData]= useState([]);
  //fetching url name/handle from the articles Route path

  useEffect(() => {
    let headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    fetch(`/api/articles/${name}`, headers)
      .then((res) => res.json())
      .then(
        (result) => {
          setArticleInfo(result);
          console.log("ex");
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  });

  //Return name if url path matches the name of the article
  const foundArticle = articles.find((article) => article.name === name);
  //display articles except the current one
  const otherArticles = articles.filter((article) => article.name !== name);
 
  return (
    <div>
      {foundArticle ? (
        <div>
          
        {foundArticle.name}
          <h2>{foundArticle.title}</h2>
          <Like likes={articleInfo.upvotes} foundArticle={foundArticle.name} setArticleInfo={setArticleInfo}/>
          <p>{foundArticle.content}</p>

          <CommentForm name={name} setArticleInfo={setArticleInfo} />
          <CommentsList comments={articleInfo.comments}/>
          <Link className="btn" to="/articles-all">
            All blog
          </Link>
        </div>
      ) : (
        <h4>Not found</h4>
      )}
      <ArticleList articles={otherArticles} />
    </div>
  );
};
export default Articles;
