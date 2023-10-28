const setLocalStorage = (name: string, token: string) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(name, token);
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }
};

const getLocalStorage = (name: string) => {
  if (typeof window !== "undefined") {
    try {
      return window.localStorage.getItem(name);
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return null;
    }
  }
};

const removeLocalStorage = (name: string) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(name);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }
};

export { setLocalStorage, getLocalStorage, removeLocalStorage };
