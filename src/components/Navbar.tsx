import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import {cookies} from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import UserAccountNav from "./UserAccountNav";

type Props = {};

const Navbar =async  (props: Props) => {
  const nextCookies = cookies();
  const user = await getServerSideUser(nextCookies);
  console.log('user',user)
  return (
    <div className="bg-white sticky z-50 top-0 h-16  inset-x-0">
      <header className="relative ">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/*TODO: Mobile nav*/}
              <div className="ml-4 flex lg:ml-0">
                <Link href={"/"}>
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>
              <div className="hidden z-50 mt-2 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              {/* Auth  */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end  lg:space-x-6">
                  {user ? <UserAccountNav user={user}/> : (
                    <Link
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                      href={"/sign-in"}
                    >
                      Sign in
                    </Link>
                  )}
                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}
                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      href={"/sign-up"}
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  {user ? (
                    <div className="flex lg:ml-6">
                      <span className="h-6 w-px bg-gray-200"></span>
                    </div>
                  ) : null}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;