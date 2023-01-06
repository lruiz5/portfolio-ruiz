import { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import Typed from "typed.js";
import { useGetUser } from "actions/user";
import Image from "next/image";

const roles = ["Developer", "Tech Lover", "Team Player", "React JS", "Next JS"];
const Index = () => {
  const el = useRef(null);
  const flipInterval = useRef();
  const [isFlipping, setIsFlipping] = useState(false);
  const tagline = `Let's take a look at my work.`;
  const { data: user, loading } = useGetUser();

  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current);
  }, []);

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping((previousFlip) => !previousFlip);
    }, 10000);
  };

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: roles, // Strings to display
      loop: true,
      startDelay: 300,
      typeSpeed: 50,
      backSpeed: 60,
      backDelay: 1000,
      loopCount: 0,
      showCursor: true,
      cursorChar: "|",
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <BaseLayout
      user={user}
      loading={loading}
      navClass={"transparent"}
      className={`cover ${isFlipping ? "cover-orange" : "cover-blue"}`}
    >
      <BasePage indexPage metaTitle="Portfolio - Luis Ruiz">
        <div className="main-section">
          <div className="background-image">
            <Image
              width={1550}
              height={500}
              alt="textured-bg"
              src="/images/background-index.png"
            />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <Image
                        width={450}
                        height={550}
                        alt="featured"
                        className="image"
                        src="/images/section-1.jpg"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <Image
                        width={450}
                        height={550}
                        alt="featured"
                        className="image"
                        src="/images/section-2.jpg"
                      />
                      <div className="shadow-custom-orange">
                        <div className="shadow-inner-orange"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Luis Ruiz. Get informed,
                    collaborate and discover projects I have worked on through
                    the years!
                  </h1>
                </div>
                <span className="self-typed" ref={el}></span>
                <div className="hero-welcome-bio">
                  <h1>{tagline}</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default Index;
