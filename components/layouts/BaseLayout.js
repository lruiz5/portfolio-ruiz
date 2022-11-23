import Header from "@/components/shared/Header";

const BaseLayout = (props) => {
  const { className, navClass = "with-bg", user, loading, children } = props;
  return (
    <div className="layout-container">
      <Header className={navClass} user={user} loading={loading} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
