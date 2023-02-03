import Image from "next/image";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import { PortableTextComponents } from "@portabletext/react";

export const RichTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 m-10 mx-auto">
          <Image
            className="object-contain"
            src={urlFor(value).url()}
            alt="blog content"
            fill
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => {
      return <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>;
    },
    number: ({ children }: any) => {
      return <ol className="mt-lg list-decimal">{children}</ol>;
    },
  },
  block: {
    h1: ({ children }: any) => {
      return <h1 className="text-5xl py-10 folt-bold">{children}</h1>;
    },
    h2: ({ children }: any) => {
      return <h2 className="text-4xl py-10 folt-bold">{children}</h2>;
    },
    h3: ({ children }: any) => {
      return <h3 className="text-3xl py-10 folt-bold">{children}</h3>;
    },

    h4: ({ children }: any) => {
      return <h4 className="text-2xl py-10 folt-bold">{children}</h4>;
    },
    normal: ({ children }: any) => {
      return (
        <p className="text-[16px] leading-[30px] py-[1px] folt-normal">
          {children}
        </p>
      );
    },
    blockquote: ({ children }: any) => {
      return (
        <blockquote className="border-l-[#f7ab0a] border-l-4 pl-5 py-5 my-5">
          {children}
        </blockquote>
      );
    },
  },
  marks: {
    em: ({ children }) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),

    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          className="underline decoration-[#f7ab0a] hover:decoration-black"
          rel={rel}
          href={value.href}
        >
          {children}
        </Link>
      );
    },
  },
};
