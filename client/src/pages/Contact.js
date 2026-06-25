import React from 'react';
import { filepath } from '../helpers/urlConfig';

const Contact = () => {
  var link = '#';
  return (
    <section className="contact">
      <div className="row">
        <div className="image">
          <img src={filepath + '/assets/images/contact-img.svg'} alt="" />
        </div>

        {/* <form action="" method="post">
          <h3>get in touch</h3>
          <input
            type="text"
            placeholder="enter your name"
            name="name"
            required
            maxLength="50"
            className="box"
          />
          <input
            type="email"
            placeholder="enter your email"
            name="email"
            required
            maxLength="50"
            className="box"
          />
          <input
            type="number"
            placeholder="enter your number"
            name="number"
            required
            maxLength="50"
            className="box"
          />
          <textarea
            name="msg"
            className="box"
            placeholder="enter your message"
            required
            maxLength="1000"
            cols="30"
            rows="10"
          ></textarea>
          <input
            type="submit"
            value="send message"
            className="inline-btn"
            name="submit"
          />
        </form> */}
        <img src={filepath + '/assets/static/companylogo.png'} alt="" />
      </div>

      <div className="box-container">
        <div className="box">
          <i className="fas fa-phone"></i>
          <h3>phone number</h3>
          <a href="tel:918276866745">+91 8276866745</a>
        </div>

        <div className="box">
          <i className="fas fa-envelope"></i>
          <h3>email address</h3>
          <a href="mailto:shaikhanas@gmail.com">smhubonline@gmail.com</a>
        </div>

        <div className="box">
          <i className="fas fa-map-marker-alt"></i>
          <h3>office address</h3>
          <a href={link}>
            Moyna (Near SBI BANK - Moyna), Purba Medinipur, West Bengal, india -
            721629
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
