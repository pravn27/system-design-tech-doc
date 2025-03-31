import { Redirect } from "@docusaurus/router";

// make default landing page as docs
export default function Home() {
  return <Redirect to="/javascript-tech-doc/docs/category/js-documentations" />;
}
