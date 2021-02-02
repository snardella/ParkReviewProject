import UserSerializer from "./UserSerializer.js";

class ReviewSerializer {
  static async showData(review) {
    const allowedAttributes = ["comments", "rating"];

    let serializedReview = {};
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute];
    }
    const user = await review.$relatedQuery("user");
    const serializedUser = UserSerializer.showData(user);
    serializedReview.user = serializedUser;
    return serializedReview;
  }
}

export default ReviewSerializer;
