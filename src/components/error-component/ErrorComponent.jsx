import "./ErrorComponent.css";

export default function ErrorComponent() {
  return (
    <div className="not-found-wrapper">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-text">
        We are sorry, the page you are looking for could not be found :(
      </p>
    </div>
  );
}
