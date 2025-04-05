import api from "../config/httpConfig";
import { UserProps } from "../types/types";

class AuthService {
  constructor() {}
  signin(data: UserProps) {
    return api.post("/api/users/auth", data);
  }
  register(data: UserProps) {
    return api.post("/api/users/register", data);
  }
  signout() {
    return api.post("/api/users/signout", {});
  }
}

export default new AuthService();
