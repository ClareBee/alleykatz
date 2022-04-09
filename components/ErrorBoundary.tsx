import { Flex, Text } from "@chakra-ui/react";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { FaPoop } from "react-icons/fa";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so next render shows fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Flex width="100%" alignItems="center" justifyContent="center" flexDirection="column" color="brand.700">
        <FaPoop />
          <Text>Sorry! There was an error</Text>
          <Text>Try refreshing the page...</Text>
        </Flex>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
