import FooterLink from "../../components/FooterLink";

function AuthLayout({ children }) {
  return (
    <section className="flex h-[100vh] flex-col items-center justify-evenly">
      <main className="flex w-[10vw] min-w-[350px] flex-col items-center justify-center">
        {children}
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

export default AuthLayout
