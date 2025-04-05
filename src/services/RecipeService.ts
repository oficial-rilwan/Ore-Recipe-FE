import BaseService from "./BaseService";

class RecipeService extends BaseService {
  constructor() {
    super("/api/recipes/");
  }
}

export default new RecipeService();
