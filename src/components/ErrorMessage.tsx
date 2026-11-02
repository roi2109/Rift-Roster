interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <strong>Could not load data.</strong>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
