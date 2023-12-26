const storeSession = (key, value) => {
  sessionStorage.setItem(key, value);
};

const lookInSession = (key) => {
  return sessionStorage.getItem(key);
};

const removeSession = (key) => {
  sessionStorage.removeItem(key);
};

const logOutUser = () => {
  sessionStorage.clear();
};
export { storeSession, lookInSession, removeSession, logOutUser };
