import { Children, cloneElement } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ActiveLink = ({ children, ...props }) => {
  const router = useRouter();
  const child = Children.only(children);
  let className = child.props.className || "";
  let title = child.props.title || "Page";

  if (router.asPath === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`;
  }

  delete props.activeClassName;

  return (
    <Link {...props} className={className} href={props.href}>
      {title}
    </Link>
  );
};

export default ActiveLink;
