import BaseService from "./BaseService";

class RestaurantService extends BaseService {
  constructor() {
    super("/api/restaurants/");
  }
}

export default new RestaurantService();
