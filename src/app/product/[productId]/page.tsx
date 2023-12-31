import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "util";

type Props = {
  params: {
    productId: string;
  };
};

const BREADCRUMBS = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Products",
    href: "/products",
  },
];

const page = async (props: Props) => {
  const payload = await getPayloadClient();
  const product = await payload.findByID({
    collection: "products",
    id: props.params.productId,
  });
  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === "string" ? image : (image.url as string)
    )
    .filter(Boolean);

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:grid-cols-2 lg:max-w-7xl lg:gap-x-8 lg:px-8  ">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={i} className="">
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <section className="mt-4">
              <div className="flex items-center ">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>
                <div className="ml-4 text-muted-foreground border-gray-300 pl-4 border-l">
                  {label}
                </div>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <Check aria-hidden className="h-5 w-5 text-green-500" />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant delivery
                </p>
              </div>
            </section>
          </div>
          {/*Image*/}
          <div className="mt-10 lg:col-start-2 lg:row-start-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={validUrls} />
            </div>
          </div>
          {/* Cart section  */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton/>
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm ">
                  <Shield className="mr-2 h5 flex-shrink-0 text-gray-400" />
                  <span className="text-muted-foreground hover:text-gray-700">
                    3-day return garantee
                  </span>
                  sdf
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductReel href="/products" query={{category:product.category,limit:4}}
      title={`Similar ${label}`}
      subtitile={`Browse similar products`}
      />
    </MaxWidthWrapper>
  );
};

export default page;
