import React from "react";

function Card({ children }) {
  return <div className="card">{children}</div>;
}
function Header({ children, css }) {
  return <div className={`card-header ${css}`}>{children}</div>;
}
function Title({ children }) {
  return <h5 className="card-title">{children}</h5>;
}
function Body({ children }) {
  return <div className="card-body">{children}</div>;
}
function Footer({ children }) {
  return <div className="card-footer">{children}</div>;
}

Card.header = Header;
Card.title = Title;
Card.body = Body;
Card.footer = Footer;

export default Card;
