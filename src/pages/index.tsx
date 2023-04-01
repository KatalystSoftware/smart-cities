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
          className="disabled:drop-shadow-mdflex flex gap-4 rounded-full bg-green-300 bg-gradient-rd from-green-400 via-green-400 to-green-500 px-6 py-4 text-lg font-semibold opacity-70 shadow-md drop-shadow-lg disabled:bg-stone-200 disabled:from-stone-300 disabled:via-stone-200 disabled:to-stone-200 disabled:text-stone-800 disabled:shadow-inner disabled:drop-shadow-md"
          onClick={() => void signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Home;
