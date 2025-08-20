import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router";
import FooterLink from "../../components/FooterLink";

function AuthLayout({ children, title }) {
  return (
    <>
      <main className="flex h-[95vh] flex-col items-center justify-center overflow-scroll">
        <div className="w-full sm:max-w-[350px]">
          <div className="flex flex-col items-center justify-center gap-5 py-10 md:border-1 md:border-[#343434]">
            <div className="cookie-regular text-5xl">Instagram</div>
            <div className="w-full px-5">{children}</div>
            <div className="divider px-8">OR</div>
            {title === "login" && (
              <div className="flex items-center gap-2 font-semibold text-blue-500">
                <FaFacebook className="text-2xl" />
                <span>Log In with Facebook</span>
              </div>
            )}
            {<div className="text-sm">Forgot Passowrd?</div>}
          </div>
          <div className="my-2 py-4 text-center text-sm md:border-1 md:border-[#343434]">
            {title === "login" ? (
              <>
                Dont Have and Account?
                <Link to="/signup" className="ms-2 text-blue-500">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Have an Account?
                <Link to="/login" className="ms-2 text-blue-500">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="text-sm">Use on web.</div>
      </main>
      <footer className="px-10 text-center">
        <FooterLink text={"Meta"} />
        <FooterLink text={"API"} />
        <FooterLink text={"About"} />
        <FooterLink text={"Blog"} />
        <FooterLink text={"Jobs"} />
        <FooterLink text={"Help"} />
        <FooterLink text={"Privacy"} />
        <FooterLink text={"Terms"} />
        <FooterLink text={"Locations"} />
        <FooterLink text={"Instagram Lite"} />
        <FooterLink text={"Threads"} />
        <FooterLink text={"Meta Verfied"} icon={false} />
      </footer>
    </>
  );
}

export default AuthLayout;
