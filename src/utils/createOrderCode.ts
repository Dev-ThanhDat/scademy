export const createOrderCode = () =>
  `SUN-${new Date().getTime().toString().slice(-6)}`;
