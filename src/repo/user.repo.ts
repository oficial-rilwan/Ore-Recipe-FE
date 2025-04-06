import BaseRepository from ".";
import api from "../config/httpConfig";
import { UserProps } from "../types/types";

class UserRepository extends BaseRepository {
  constructor() {
    super("/api/users");
  }
  me() {
    return api.get("/api/users/me");
  }
  signin(data: UserProps) {
    return api.post("/api/users/auth", data);
  }
  register(data: UserProps) {
    return api.post("/api/users/register", data);
  }
  signout() {
    return api.post("/api/users/signout", {});
  }
  deactivate(data: UserProps) {
    return api.post("/api/users/deactivate", data);
  }
}

export default new UserRepository();
