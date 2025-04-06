import BaseRepository from ".";
import api from "../config/httpConfig";

class RecipeRepository extends BaseRepository {
  constructor() {
    super("/api/recipes");
  }

  searchHistory(query?: { [key: string]: string | number }) {
    return api.get(this.url + "/search-history", { params: { ...query } });
  }
}

export default new RecipeRepository();
