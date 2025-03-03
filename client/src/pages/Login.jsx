import { FaFacebook } from "react-icons/fa6";
import FooterLink from "../components/FooterLink";

function Login() {
  return (
    <section className="flex h-[100vh] flex-col items-center justify-evenly">
      <main className="flex w-[10vw] min-w-[350px] flex-col items-center justify-center">
        <div className="shadow-mg flex w-full flex-col items-center justify-center gap-5 md:border-1 md:border-[#343434] py-10">
          <div className="cookie-regular text-6xl">Instagram</div>
          <form action="" className="m-1 flex w-full flex-col px-8">
            <input
              type="text"
              className="mt-2 rounded-[2px] border-1 border-[#424242] bg-[#191919] p-1 placeholder:text-xs focus:outline-none"
              placeholder="Username or email"
            />
            <input
              type="text"
              className="mt-2 rounded-[2px] border-1 border-[#424242] bg-[#191919] p-1 placeholder:text-xs focus:outline-none"
              placeholder="Password"
            />
            <button className="my-3 rounded-lg bg-[#0096FF] p-1 hover:bg-blue-500">
              Log in
            </button>
          </form>
          <div className="relative flex w-full items-center px-8">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="mx-4 flex-shrink font-semibold text-gray-500">
              OR
            </span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>
          <div className="flex items-center gap-2 font-semibold text-blue-500">
            <FaFacebook className="text-2xl" />
            <span className="">Log In with Facebook</span>
          </div>
          <div className="text-sm">Forgot Passowrd?</div>
        </div>
        <div className="my-2 md:border-1 md:border-[#343434] w-full text-sm text-center py-4">
          Dont Have and Account?
          <a href="" className="ms-2 text-blue-500">
            Sign up
          </a>
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
    </section>
  );
}

export default Login;
