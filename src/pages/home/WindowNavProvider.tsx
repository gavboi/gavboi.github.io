import { createContext, useContext, useState, ReactNode } from "react";

type WindowNavContextType = {
  pushWindow: (window: ReactNode) => void;
  popWindow: () => void;
  currentWindow: ReactNode | null;
};

const WindowNavContext = createContext<WindowNavContextType | null>(null);

export function WindowNavProvider({ children }: { children: ReactNode }) {
  const [windowStack, setWindowStack] = useState<ReactNode[]>([]);

  /**
   * Open a window by adding it to the top of the window stack.
   *
   * @param window Window to open
   */
  const pushWindow = (window: React.ReactNode) => {
    setWindowStack([...windowStack, window]);
  };

  /**
   * Close the topmost window by removing it from the window stack.
   */
  const popWindow = () => {
    if (windowStack.length > 0) {
      setWindowStack(windowStack.slice(0, -1));
    }
  };

  return (
    <WindowNavContext.Provider
      value={{
        pushWindow,
        popWindow,
        currentWindow:
          windowStack.length > 0 ? windowStack[windowStack.length - 1] : null,
      }}
    >
      {children}
    </WindowNavContext.Provider>
  );
}

export function useWindowNav() {
  const context = useContext(WindowNavContext);

  if (!context) {
    throw new Error("useWindowNav must be used within a WindowNavProvider");
  }

  return context;
}
