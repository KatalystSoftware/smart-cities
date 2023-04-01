import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    const redirectToApp = async () => {
      await router.push("/home");
    };
    if (sessionData) {
      redirectToApp().catch((error) =>
        console.error("Error redirecting to app", error)
      );
    }
  }, [router, sessionData]);

  if (sessionData) {
    return (
      <div>
        <p>Redirecting to app...</p>
      </div>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-black">You are not signed in</p>
        <button
          className="rounded-full bg-black/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-black/20"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Home;
