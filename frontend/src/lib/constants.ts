export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) throw new Error("API Base URL is not set.");

export const Token = {
  Refresh: "refresh",
  Access: "access",
};

export const ApiEndpoint = {
  Auth: {
    Refresh: BASE_URL + "/api/token/refresh",
    Authenticate: BASE_URL + "/api/token/",
    Register: BASE_URL + "/api/user/register/",
  },
  Product: {
    List: BASE_URL + "/api/products/seller/",
    Create: BASE_URL + "/api/products/seller/",
    Delete: BASE_URL + "/api/products/delete/",
    All: BASE_URL + "/api/products/",
  },
};
