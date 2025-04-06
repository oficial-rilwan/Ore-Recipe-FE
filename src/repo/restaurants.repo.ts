import BaseRepository from ".";
import api from "../config/httpConfig";

class RestaurantRepository extends BaseRepository {
  constructor() {
    super("/api/restaurants");
  }

  searchHistory(query?: { [key: string]: string | number }) {
    return api.get(this.url + "/search-history", { params: { ...query } });
  }
}

export default new RestaurantRepository();
