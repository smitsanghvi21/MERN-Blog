import React, { useState } from "react";
import articles from "./Content";
import ArticleList from "../components/ArticleList";

const ArticlesListPage = () => {
  const [articleData, setArticleData] = useState(articles);
  return (
    <div>
      <ArticleList articles={articleData} />
    </div>
  );
};
export default ArticlesListPage;
