import { type NextPage } from "next";
import { api } from "~/utils/api";

const Ideas: NextPage = () => {
  const posts = api.posts.getAll.useQuery();

  if (posts.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default Ideas;
