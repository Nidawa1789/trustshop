import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const blogs = await getAllBlogs(6);

  return (
    <div>
      <Container>
        <Title>Page des blogues</Title>
        <div className="mt-5 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog) => (
            <div key={blog?._id} className="group overflow-hidden rounded-md">
              {blog?.mainImage && (
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="max-h-80 w-full object-cover"
                />
              )}
              <div className="bg-gray-100 p-5">
                <div className="flex items-center gap-5 text-xs">
                  <div className="group relative flex cursor-pointer items-center">
                    {blog?.blogcategories?.map((item, index) => (
                      <p key={index} className="text-shop_dark_green font-semibold tracking-wider">
                        {item?.title}
                      </p>
                    ))}
                    <span className="bg-lightColor/30 group-hover:bg-shop_dark_green hoverEffect absolute -bottom-1.5 left-0 inline-block h-[2px] w-full hover:cursor-pointer" />
                  </div>
                  <p className="text-lightColor group hover:text-shop_dark_green hoverEffect relative flex items-center gap-1 hover:cursor-pointer">
                    <Calendar size={15} /> {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    <span className="bg-lightColor/30 group-hover:bg-shop_dark_green hoverEffect absolute -bottom-1.5 left-0 inline-block h-[2px] w-full" />
                  </p>
                </div>
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="hover:text-shop_dark_green hoverEffect mt-5 line-clamp-2 text-base font-bold tracking-wide"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
