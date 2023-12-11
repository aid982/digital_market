"use client";
import { TQueryValidator } from "@/lib/validators/queryValidator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";

import Link from "next/link";
import React from "react";
import ProductListing from "./ProductListing";

type Props = {
  title: string;
  subtitile?: string;
  href?: string;
  query: TQueryValidator;
};

const FALLBACKLIMIT = 4;

const ProductReel = (props: Props) => {
  const { title, subtitile, href, query } = props;
  const { data: queryResults, isLoading } =
    trpc.getInifiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACKLIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );
  let mapPr: (Product | null)[] = [];
  const products = queryResults?.pages.flatMap((page) => page.items);
  if (products && products.length) {
    mapPr = products;
  } else if (isLoading) {
    mapPr = new Array<null>(query.limit ?? FALLBACKLIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}

          {subtitile ? (
            <p className="text-sm mt-2 text-muted-foreground">{subtitile}</p>
          ) : null}
        </div>
        {href ? (
          <Link
            className="hidden text-sm font-medium text-blue-400 md:block hover:text-blue-300"
            href={href}
          >
            Shop the collection <span>&rarr;</span>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-10">
            {mapPr.map((product, i) => (
              <ProductListing key={i} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
