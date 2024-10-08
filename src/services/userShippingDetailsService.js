import { requestFactory } from "../services/requester";

import { HOST } from "../constants/host";

const baseUrl = `${HOST}/users-shipping-details`;

export const userShippingDetailsServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    getOne: (userId) => request.get(`${baseUrl}/${userId}`),

    update: (userId, data) => request.put(`${baseUrl}/${userId}`, data),
  };
};
