import { type NextPage } from "next";
import { signOut, signIn, useSession } from "next-auth/react";

const Settings: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="disabled:drop-shadow-mdflex flex gap-4 rounded-full bg-green-300 bg-gradient-rd from-green-400 via-green-400 to-green-500 px-6 py-4 text-lg font-semibold opacity-70 shadow-md drop-shadow-lg disabled:bg-stone-200 disabled:from-stone-300 disabled:via-stone-200 disabled:to-stone-200 disabled:text-stone-800 disabled:shadow-inner disabled:drop-shadow-md"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Settings;
