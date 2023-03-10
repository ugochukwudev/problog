import React from "react";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import { Post } from "../../../../typings";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/RichTextComponents";
import Link from "next/link";
import Comment from "@/components/Comment";
import SharePost from "@/components/SharePost";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const query = groq`*[_type=="post"]{
  slug
}`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);
  return slugRoutes.map((slug) => ({
    slug,
  }));
};
export const revalidate = 60; // revalidate this page every 60 seconds
const Post = async ({ params: { slug } }: Props) => {
  const query = groq`
    *[_type=="post" && slug.current == $slug][0]
    {
        ...,
        author->,
        categories[]->
    }`;

  const post: Post = await client.fetch(query, { slug });
  console.log(post);

  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#f7ab0a] text-white ">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between ">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post?.mainImage).url()}
              alt={post?.author?.name}
              fill
            />
          </div>
          <section className="p-5 bg-[#f7ab0a] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5 ">
              <div>
                <h1 className="text-4xl font-extrabold ">{post.title}</h1>
                <p>
                  {new Date(post?._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <Image
                  className="rounded-full"
                  src={urlFor(post?.author?.image).url()}
                  alt={post?.author?.name}
                  height={40}
                  width={40}
                />
                <div className="w-64">
                  <h3 className="text-lg font-bold">--{post.author.name}</h3>
                </div>
              </div>
            </div>
            <div>
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end">
                {post.categories.map((category) => {
                  return (
                    <p
                      className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                      key={category._id}
                    >
                      {category.title}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>
      <PortableText value={post.body} components={RichTextComponents} />
      <SharePost {...post} />
      <Comment id={post._id} />
    </article>
  );
};

export default Post;
