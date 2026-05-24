import Container from "@/components/Container";
import Title from "@/components/Title";
import { SINGLE_BLOG_QUERYResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { getBlogCategories, getOthersBlog, getSingleBlog } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Pencil } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const SingleBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog: SINGLE_BLOG_QUERYResult | null = await getSingleBlog(slug);
  if (!blog) return notFound();

  return (
    <div className="py-10">
      <Container className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <div className="md:col-span-3">
          {blog?.mainImage && (
            <Image
              src={urlFor(blog?.mainImage).url()}
              alt={blog.title || "Image du blog"}
              width={800}
              height={800}
              className="max-h-[500px] w-full rounded-lg object-cover"
            />
          )}
          <div>
            <div className="my-7 flex items-center gap-5 text-xs">
              <div className="group relative flex cursor-pointer items-center">
                {blog?.blogcategories?.map((item, index) => (
                  <p key={index} className="text-shop_dark_green font-semibold tracking-wider">
                    {item?.title}
                  </p>
                ))}
                <span className="bg-lightColor/30 group-hover:bg-shop_dark_green hoverEffect absolute -bottom-1.5 left-0 inline-block h-[2px] w-full hover:cursor-pointer" />
              </div>
              <p className="text-lightColor group hover:text-shop_dark_green hoverEffect relative flex items-center gap-1 hover:cursor-pointer">
                <Pencil size={15} /> {blog?.author?.name}
                <span className="bg-lightColor/30 group-hover:bg-shop_dark_green hoverEffect absolute -bottom-1.5 left-0 inline-block h-[2px] w-full" />
              </p>
              <p className="text-lightColor group hover:text-shop_dark_green hoverEffect relative flex items-center gap-1 hover:cursor-pointer">
                <Calendar size={15} /> {dayjs(blog.publishedAt).format("D MMMM YYYY")}
                <span className="bg-lightColor/30 group-hover:bg-shop_dark_green hoverEffect absolute -bottom-1.5 left-0 inline-block h-[2px] w-full" />
              </p>
            </div>
            <h2 className="my-5 text-2xl font-bold">{blog?.title}</h2>
            <div className="flex flex-col">
              <div className="text-lightColor">
                <div>
                  {blog.body && (
                    <PortableText
                      value={blog.body}
                      components={{
                        block: {
                          normal: ({ children }) => (
                            <p className="my-5 text-base/8 first:mt-0 last:mb-0">{children}</p>
                          ),
                          h2: ({ children }) => (
                            <h2 className="my-5 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="my-5 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                              {children}
                            </h3>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="my-5 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
                              {children}
                            </blockquote>
                          ),
                        },
                        types: {
                          image: ({ value }) => (
                            <Image
                              alt={value.alt || ""}
                              src={urlFor(value).width(2000).url()}
                              className="w-full rounded-2xl"
                              width={1400}
                              height={1000}
                            />
                          ),
                          separator: ({ value }) => {
                            switch (value.style) {
                              case "line":
                                return <hr className="my-5 border-t border-gray-200" />;
                              case "space":
                                return <div className="my-5" />;
                              default:
                                return null;
                            }
                          },
                        },
                        list: {
                          bullet: ({ children }) => (
                            <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">
                              {children}
                            </ul>
                          ),
                          number: ({ children }) => (
                            <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                              {children}
                            </ol>
                          ),
                        },
                        listItem: {
                          bullet: ({ children }) => {
                            return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>;
                          },
                          number: ({ children }) => {
                            return <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>;
                          },
                        },
                        marks: {
                          strong: ({ children }) => (
                            <strong className="font-semibold text-gray-950">{children}</strong>
                          ),
                          code: ({ children }) => (
                            <>
                              <span aria-hidden>`</span>
                              <code className="text-[15px]/8 font-semibold text-gray-950">
                                {children}
                              </code>
                              <span aria-hidden>`</span>
                            </>
                          ),
                          link: ({ value, children }) => {
                            return (
                              <Link
                                href={value?.href ?? "#"}
                                className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-hover:decoration-gray-600"
                              >
                                {children}
                              </Link>
                            );
                          },
                        },
                      }}
                    />
                  )}
                  <div className="mt-10">
                    <Link href="/blog" className="flex items-center gap-1">
                      <ChevronLeftIcon className="size-5" />
                      <span className="text-sm font-semibold">Retour au blog</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BlogLeft slug={slug} />
      </Container>
    </div>
  );
};

const BlogLeft = async ({ slug }: { slug: string }) => {
  const categories = await getBlogCategories();
  const blogs = await getOthersBlog(slug, 5);

  return (
    <div>
      <div className="border-lightColor rounded-md border p-5">
        <Title className="text-base">Catégories du blog</Title>
        <div className="mt-2 space-y-2">
          {categories?.map(({ blogcategories }, index) => (
            <div
              key={index}
              className="text-lightColor flex items-center justify-between text-sm font-medium"
            >
              <p>{blogcategories?.[0]?.title}</p>
              <p className="text-darkColor font-semibold">{`(1)`}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-lightColor mt-10 rounded-md border p-5">
        <Title className="text-base">Articles récents</Title>
        <div className="mt-4 space-y-4">
          {blogs?.map((blog, index) => (
            <Link
              href={`/blog/${blog?.slug?.current}`}
              key={index}
              className="group flex items-center gap-2"
            >
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="imageBlog"
                  width={100}
                  height={100}
                  className="border-shop_dark_green/10 group-hover:border-shop_dark_green hoverEffect h-16 w-16 rounded-full border object-cover"
                />
              )}
              <p className="text-lightColor group-hover:text-shop_dark_green hoverEffect line-clamp-2 text-sm">
                {blog?.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
