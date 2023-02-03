"use client";
import React, { useState, useEffect } from "react";
import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { Post } from "@/typings";
interface props {
  id: string;
}
const Comment = ({ id }: props) => {
  const [loading, setLoading] = useState(false);
  const [comment, setComments] = useState({
    name: "",
    email: "",
    CommentMessage: "",
  });
  const [commentBox, setCommentBox] = useState([]);
  const fetchComments = async () => {
    const query =
      await groq`*[_type=="comments" && id==$id  && approved==true]{...}`;
    const data = await client.fetch(query, { id }).then((data) => data);
    setCommentBox(data);
    console.log(commentBox, data);
  };
  useEffect(() => {
    fetchComments();
  }, []);
  const addCommentData = (data: string, text: string) => {
    setComments((prev) => {
      return { ...prev, [data]: text };
    });
  };
  const load = () => {
    setLoading((prev) => !prev);
  };
  const sendMessage = (email: string, name: string, message: string) => {
    client
      .create({
        _type: "comments",
        name: name,
        email: email,
        id: id,
        commentmessage: message,
      })

      .then((result) => {
        console.log(`Created book with id: ${result._id}`);
        load();
        alert(
          `Message sent successfully \n your comment will display once an admin approves`
        );
      });
    load();
  };
  const sendMail = async () => {
    var constant = comment?.email.length - 4;

    if (
      comment?.email.includes(".com") &&
      comment?.email[constant] === "." &&
      comment?.email.includes("@") &&
      comment?.name.length > 1 &&
      comment?.CommentMessage?.length > 5
    ) {
      load();
      console.log(comment.email);

      const response = await fetch("/api/informmail", {
        method: "POST",
        body: JSON.stringify({ email: comment.email }),
      });
      const data = await response.json();
      if (data?.message === "commented successfully") {
        validate();
      } else {
        alert("invalid email");
        load();
      }
    } else {
      let message = `Please make sure you're using a valid email.  \n Note:  email, message and name box can't be empty. \n message must be longer than five characters`;
      return alert(message);
    }
  };
  const validate = () => {
    load();
    var constant = comment?.email.length - 4;
    if (
      comment?.email.includes(".com") &&
      comment?.email[constant] === "." &&
      comment?.email.includes("@") &&
      comment?.name.length > 1 &&
      comment?.CommentMessage?.length > 5
    ) {
      setLoading(false);
      sendMessage(comment?.email, comment?.name, comment?.CommentMessage);
      setComments({ email: "", CommentMessage: "", name: "" });
    } else {
      load();
      let message = `Please make sure you're using a valid email.  \n Note:  email, message and name box can't be empty. \n message must be longer than five characters`;
      return alert(message);
    }
  };

  return (
    <div className="w-full lg:w-7/12  flex flex-col lg:ml-auto lg:mr-auto p-4  lg:p-10 mt-10 border-2 border-gray-200">
      {commentBox.length > 0 && (
        <p className="text-[#364253] font-bold leading-[1.4] text-[1.6rem]">
          Comments
        </p>
      )}

      {commentBox.length > 0 &&
        commentBox?.map(
          (comment: {
            _createdAt: string;
            _id: string;
            _rev: string;
            _type: string;
            _updatedAt: string;
            commentmessage: string;
            email: string;
            id: string;
            name: string;
          }) => {
            return (
              <div key={comment._id} className="flex flex-col gap-4 mt-4 mb-4">
                <div className="flex gap-4">
                  <img
                    className="w-[50px] h-[50px] hidden lg:block"
                    src="https://secure.gravatar.com/avatar/61af828541d54d78679bd641011d8181?s=120&d=mm&r=g"
                  />
                  <div>
                    <p className="font-bold text-[#6b717e] leading-[1.7] text-[1.15rem]">
                      {comment.name}
                    </p>
                    <p className="leading-[1.8] font-normal text-[#6b717e] ">
                      {comment.commentmessage}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            );
          }
        )}
      <div className="flex flex-col gap-6">
        <p className="text-[#364253] font-bold leading-[1.4] text-[1.6rem]">
          Leave a Reply
        </p>
        <p className="text-[#f7ab0a]">
          Your email address will not be published. Required fields are marked *
        </p>
        <div className="flex flex-col gap-4">
          <p className="leading-[1.8] font-normal">Comment *</p>
          <textarea
            value={comment.CommentMessage}
            onChange={(e) => addCommentData("CommentMessage", e.target.value)}
            className="w-full h-[200px] outline-0 border-[1px] border-gray-200 p-4 font-normal"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="leading-[1.8] font-normal">Name*</p>
          <textarea
            value={comment.name}
            onChange={(e) => addCommentData("name", e.target.value)}
            className="w-full resize-none h-[50px] outline-0 border-[1px] border-gray-200 px-4 py-1 font-normal"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="leading-[1.8] font-normal">Email*</p>
          <textarea
            value={comment.email}
            onChange={(e) => addCommentData("email", e.target.value)}
            className="w-full resize-none h-[50px] outline-0 border-[1px] border-gray-200 px-4 py-1 font-normal"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            validate();
          }}
          className=" py-4 bg-[#f7ab0a] hover:bg-[#d1a341] font-bold text-white text-[.925rem] leading-[1.5] "
        >
          {loading ? "Loading..." : "Post Comment"}
        </button>
      </div>
    </div>
  );
};

export default Comment;
