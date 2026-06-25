import React from 'react';
import { filepath } from '../helpers/urlConfig';
// import { Link } from 'react-router-dom';
// import * as url from '../helpers/url';

const About = () => {
  return (
    <>
      <section className="about">
        <div className="row">
          <div className="image">
            <img
              src={filepath + '/assets/static/NOCFOLF83536987N.webp'}
              alt=""
            />
          </div>

          <div className="content">
            <p>
              Welcome to SmartCalcTools – your one-stop destination for free,
              accurate, and easy-to-use online calculators. We built
              SmartCalcTools with a simple mission: ✅ Make everyday
              calculations fast, simple, and reliable. ✅ Help users save time
              and make better decisions. ✅ Provide a single platform for
              health, finance, and math tools.
            </p>
            <h3>What We Offer</h3>
            <p>
              At SmartCalcTools, you can find a wide range of calculators,
              including: Health Calculators – BMI, BMR, Calories, Ideal Weight,
              Heart Rate Finance Calculators – EMI, SIP, Loan, FD, RD, Tax,
              Retirement Math & Conversion Tools – Percentage, Age, Date, Unit
              Conversion Everyday Tools – Time Difference, GPA, Fuel Cost, and
              more Our goal is to cover all major calculators in one place,
              similar to leading sites like calculator.net — but with a clean
              design, fast performance, and user-friendly experience.
            </p>
            <h3>Our Promise</h3>
            <p>
              Accuracy: We use standard formulas and reliable methods. Speed:
              Instant results without sign-ups or downloads. Privacy: We do not
              collect unnecessary personal data. Free Forever: All our
              calculators are completely free to use.
            </p>
            <h3>Who I Am</h3>
            <p>
              I am a solo developer and creator behind SmartCalcTools. I built
              this platform to make everyday calculations simple, accurate, and
              accessible for everyone. Whether you’re a student, professional,
              or just someone who needs quick answers, my goal is to give you
              fast, reliable, and easy-to-use tools — all in one place.
            </p>
            <h3>Get in Touch</h3>
            <p>
              Have suggestions or need a new calculator? 📧
              smhubonline@gmail.com – we’d love to hear from you!
            </p>
            {/* <a href="collections.html" className="inline-btn">
              our collections
            </a> */}
          </div>
        </div>
        {/* <div className="box-container">
          <Link to={url.collections()}>
            <div className="box">
              <i className="fas fa-graduation-cap"></i>
              <div>
                <h3>+10k</h3>
                <p>Our collections</p>
              </div>
            </div>
          </Link>

          <Link to={url.calculators()}>
            <div className="box">
              <i className="fas fa-sticky-note"></i>
              <div>
                <h3>+40k</h3>
                <p>Our Calculators</p>
              </div>
            </div>
          </Link>
          <Link to={url.teachers()}>
            <div className="box">
              <i className="fas fa-chalkboard-user"></i>
              <div>
                <h3>+2k</h3>
                <p>Our Teachers</p>
              </div>
            </div>
          </Link>
          <div className="box">
            <i className="fas fa-briefcase"></i>
            <div>
              <h3>100%</h3>
              <p>job placement</p>
            </div>
          </div>
        </div> */}
      </section>

      {/* <section className="reviews">
        <h1 className="heading">student's reviews</h1>

        <div className="box-container">
          <div className="box">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Necessitatibus, suscipit a. Quibusdam, dignissimos consectetur.
              Sed ullam iusto eveniet qui aut quibusdam vero voluptate libero
              facilis fuga. Eligendi eaque molestiae modi?
            </p>
            <div className="student">
              <img src={filepath + '/assets/images/pic-2.jpg'} alt="" />
              <div>
                <h3>john deo</h3>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Necessitatibus, suscipit a. Quibusdam, dignissimos consectetur.
              Sed ullam iusto eveniet qui aut quibusdam vero voluptate libero
              facilis fuga. Eligendi eaque molestiae modi?
            </p>
            <div className="student">
              <img src={filepath + '/assets/images/pic-3.jpg'} alt="" />
              <div>
                <h3>john deo</h3>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Necessitatibus, suscipit a. Quibusdam, dignissimos consectetur.
              Sed ullam iusto eveniet qui aut quibusdam vero voluptate libero
              facilis fuga. Eligendi eaque molestiae modi?
            </p>
            <div className="student">
              <img src={filepath + '/assets/images/pic-4.jpg'} alt="" />
              <div>
                <h3>john deo</h3>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Necessitatibus, suscipit a. Quibusdam, dignissimos consectetur.
              Sed ullam iusto eveniet qui aut quibusdam vero voluptate libero
              facilis fuga. Eligendi eaque molestiae modi?
            </p>
            <div className="student">
              <img src={filepath + '/assets/images/pic-5.jpg'} alt="" />
              <div>
                <h3>john deo</h3>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Necessitatibus, suscipit a. Quibusdam, dignissimos consectetur.
              Sed ullam iusto eveniet qui aut quibusdam vero voluptate libero
              facilis fuga. Eligendi eaque molestiae modi?
            </p>
            <div className="student">
              <img src={filepath + '/assets/images/pic-6.jpg'} alt="" />
              <div>
                <h3>john deo</h3>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Necessitatibus, suscipit a. Quibusdam, dignissimos consectetur.
              Sed ullam iusto eveniet qui aut quibusdam vero voluptate libero
              facilis fuga. Eligendi eaque molestiae modi?
            </p>
            <div className="student">
              <img src={filepath + '/assets/images/pic-7.jpg'} alt="" />
              <div>
                <h3>john deo</h3>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default About;
