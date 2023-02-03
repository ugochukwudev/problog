import { Inter } from "@next/font/google";
import { previewData } from "next/headers";
const inter = Inter({ subsets: ["latin"] });
import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import PreviewSuspense from "../../components/PreviewSuspense";
import PreviewBlogList from "@/components/PreviewBlogList";
import BlogList from "@/components/BlogList";
const query = groq`*[_type=="post"] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)`;
export const revalidate = 60; // revalidate this page every 60 seconds
export default async function HomePage() {
  if (previewData()) {
    return (
      <PreviewSuspense fallback={<div>Loading preview...</div>}>
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }
  const posts = await client.fetch(query);
  console.log(posts);

  return <BlogList posts={posts} />;
}
