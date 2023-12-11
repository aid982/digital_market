import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const perks = [
  {
    name: "Fast delivery",
    icon: ArrowDownToLine,
    description: "Very fast delivery",
  },
  {
    name: "Good quality",
    icon: CheckCircle,
    description: "All goods are checked by our team",
  },
  {
    name: "Ecko friendly",
    icon: Leaf,
    description: "Lorem ipsum dolor s aspernatur assumenda ab, placeat architecto ad dolore alias dolores, facilis ullam.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center items-center flex flex-col max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Digital marketplace for{" "}
            <span className="text-[hsl(var(--primary))]">
              all kinds of products
            </span>
          </h1>
          <p className="mt-6 max-w-prose text-muted-foreground text-lg mb-3">
            Welcome to our store.{" "}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href={"/products"} className={buttonVariants({})}>
              Browse trending
            </Link>
            <Button variant={"ghost"}>Our quaility &rarr;</Button>
          </div>
        </div>
        {/*Todos List products*/}
        <ProductReel title="Brand new" href="dklfjg" query={{
          sort:"desc",limit:4
        }}/>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  {<perk.icon className="w-1/3 h-1/3" />}
                </div>
              </div>

              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
