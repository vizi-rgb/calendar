export const ErrorMessageText = ({ message }: { message?: string }) => {
  return <small className="text-destructive">{message}</small>;
};
