// components/LoadingWrapper.tsx
import React from "react";
import Spinner from "./Spinner";

interface LoadingWrapperProps {
  loading: boolean;
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  loading,
  children,
}) => {
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
