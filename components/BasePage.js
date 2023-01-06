import { Container } from "reactstrap";
import Head from "next/head";
import { useRouter } from "next/router";

const BasePage = (props) => {
  const router = useRouter();
  const {
    indexPage,
    children,
    header,
    className = "",
    metaTitle = "Portfolio - Luis Ruiz",
    metaDescription = "My name is Luis Ruiz and I am an experienced software developer and freelance developer.",
    canonicalPath,
  } = props;

  const pageType = indexPage ? "index-page" : "base-page";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" key="description" content={metaDescription} />
        <meta name="title" key="title" content={metaTitle} />
        <meta property="og:title" key="og:title" content={metaTitle} />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.BASE_URL}${router.asPath}`}
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content={metaDescription}
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.BASE_URL}/images/section-1.png`}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
        />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link
          rel="canonical"
          href={`${process.env.BASE_URL}${
            canonicalPath ? canonicalPath : router.asPath
          }`}
        />
      </Head>
      <div className={`${pageType} ${className}`}>
        <Container>
          {header && (
            <div className="page-header">
              <h1 className="page-header-title">{header}</h1>
            </div>
          )}
          {children}
        </Container>
      </div>
    </>
  );
};

export default BasePage;
