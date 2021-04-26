export const isDevelopment = () => {
  return process.env.REACT_APP_Env === 'Development';
};

export const isStaging = () => {
  return process.env.REACT_APP_Env === 'Staging';
};

export const isLocalServer = () => {
  return process.env.REACT_APP_Env === 'LocalServer';
};
export const isProduction = () => {
  return process.env.REACT_APP_Env === 'Production';
};
