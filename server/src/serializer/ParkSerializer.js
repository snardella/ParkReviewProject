class ParkSerializer {
  static async showData(park) {
    const allowedAttributes = ["id", "name", "location", "description", "picture"];

    let serializedPark = {};
    for (const attribute of allowedAttributes) {
      serializedPark[attribute] = park[attribute];
    }
    serializedPark.reviews = await park.$relatedQuery("reviews")

    const mappedRatings = serializedPark.reviews.map((review) => {
      const rating = review.rating
      return rating
    })

    const summedRatings = mappedRatings.reduce((acc, curr)=>  acc+curr)
    const averageRating = summedRatings/summedRatings.length

    serializedPark.averageRating = averageRating

    return serializedPark;
  }
}

export default ParkSerializer;
