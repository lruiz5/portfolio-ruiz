import { useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import Typed from "typed.js";

const roles = ["Developer", "Tech Lover", "Team Player", "React JS"];
const Index = () => {
  const el = useRef(null);

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
    <BaseLayout className="cover">
      <div className="main-section">
        <div className="background-image">
          <img src="/images/background-index.png" />
        </div>
        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper`}>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Full Stack Web Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img className="image" src="/images/section-1.png" />
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                  Welcome to the portfolio website of Luis Ruiz. Get informed,
                  collaborate and discover projects I have worked on through the
                  years!
                </h1>
              </div>
              <span className="self-typed" ref={el}></span>
              <div className="hero-welcome-bio">
                <h1>Let's take a look on my work.</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Index;
