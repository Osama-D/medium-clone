export default {
  name: "comment",
  type: "document",
  title: "comment",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "last",
      type: "string",
    },
    {
      title: "userImage",
      name: "userImage",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Approved",
      name: "approved",
      type: "boolean",
      description: "Comment wont show on the site without approval",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "comment",
      type: "text",
    },
    {
      name: "likes",
      type: "number",
    },
    {
      name: "post",
      type: "reference",
      to: [{ type: "post" }],
    },
  ],
};
