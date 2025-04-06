import BaseRepository from ".";

class RestaurantRepository extends BaseRepository {
  constructor() {
    super("/api/restaurants/");
  }
}

export default new RestaurantRepository();
