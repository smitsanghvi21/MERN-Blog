import React from "react";
import { Link } from "react-router-dom";

const ArticlesList = (props) => {
  const { articles } = props;
  const allArticles = articles.map((articles, key) => {
    const { title, content, name } = articles;
    let availableContent, readMore;
    if (content[key].length > 500) {
      availableContent = content[key].slice(0, 500);
      readMore = <Link to={`/articles/${name}`}>Read More</Link>;
    } else {
      availableContent = content;
    }
    return (
      <div key={key}>
        <Link to={`/articles/${name}`}>{title}</Link>
        <p>
          {availableContent}..
          <br />
          {readMore}
        </p>
        <hr />
      </div>
    );
  });
  return <div>{allArticles}</div>;
};
export default ArticlesList;
