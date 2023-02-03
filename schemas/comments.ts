import { defineField, defineType } from "sanity";

export default defineType({
  name: "comments",
  title: "Comments",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "commentmessage",
      title: "CommentMessage",
      type: "string",
    }),
    defineField({
      name: "id",
      title: "Id",
      type: "string",
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      title: "name",
      email: "email",
    },
  },
});
