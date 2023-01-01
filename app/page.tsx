import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";
import NewsList from "./NewsList";
import response from "../response.json";
type Props = {};
async function Homepage({}: Props) {
  // fetch the news data
  const news: NewsResponse = await fetchNews(categories.join(","));
  // Set time out for 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      {/* NewsList */}
      <NewsList news={news} />
    </div>
  );
}

export default Homepage;
