import BaseRepository from ".";

class RecipeRepository extends BaseRepository {
  constructor() {
    super("/api/recipes/");
  }
}

export default new RecipeRepository();
