import { useContext, useState, useEffect, createContext } from "react";

export const PageContext = createContext({
  page: "",
  pageName: () => {},
});

const PageProvider = ({ children }) => {
  const [page, setPage] = useState("");
  const pageName = (name) => {
    setPage(name);
  };
  return (
    <PageContext.Provider value={{ page, pageName }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageProvider;
