import { ThreeDot } from "react-loading-indicators";

export default function LoadingIndicator({ Loading }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <ThreeDot
        variant="bounce"
        color="#32cd32"
        size="medium"
        text={Loading}
        textColor="blue"
      />
    </div>
  );
}
