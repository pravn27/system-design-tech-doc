import { Redirect } from "@docusaurus/router";

// make default landing page as docs
export default function Home() {
  return <Redirect to="/system-design-tech-doc/docs/category/documentations" />;
}
