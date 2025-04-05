import api from "../config/httpConfig";

class BaseService {
  constructor(public url: string) {
    this.url = url;
  }

  create<T>(data: T) {
    return api.post(this.url, data);
  }
  update<T>(data: T, id: string) {
    return api.put(`${this.url}/${id}`, data);
  }
  get(id: string) {
    return api.get(`${this.url}/${id}`);
  }
  find(query: { [key: string]: string | number }) {
    return api.get(this.url, { params: { ...query } });
  }
  delete(id: string) {
    return api.delete(`${this.url}/${id}`);
  }
}

export default BaseService;
