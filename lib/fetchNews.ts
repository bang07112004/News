import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";
const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // GraphQL query
  const query = gql`
    query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "us"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          url
          title
          source
        }
        pagination {
          count
          limit
          total
          offset
        }
      }
    }
  `;
  // Fetch function with Next.js 13 caching...
  const res = await fetch(
    "https://sumqayit.stepzen.net/api/tailored-mongoose/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );
  console.log("loading new data from api for category ", category, keywords);
  const newsResponse = await res.json();
  // Sort function by image vs not image present
  const news = sortNewsByImage(newsResponse.data.myQuery);
  return news
  // console.log(newsResponse)
  // return newsResponse;
};
export default fetchNews;
