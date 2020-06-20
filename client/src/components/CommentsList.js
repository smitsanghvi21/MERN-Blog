import React from "react";

const CommentsList = (props) => {
  return (
    <div>
       <h4>Comments:</h4>
      {props.comments &&
        props.comments.map((item, i) => {
          return (
            <div className="comment" key={i}>
              <h3>{item.user}</h3>
              <p>{item.text}</p>
            </div>
          );
        })}
    </div>
  );
};
export default CommentsList;
