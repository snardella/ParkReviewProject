class ParkSerializer {
    static async showData(park) {
        const allowedAttributes = ["id", "name", "location", "description", "picture"];

        let serializedPark = {};
        for (const attribute of allowedAttributes) {
            serializedPark[attribute] = park[attribute];
        }
        serializedPark.reviews = await park.$relatedQuery("reviews")
        for (let i = 0; i < serializedPark.reviews.length; i++) {
            serializedPark.reviews[i].user = await serializedPark.reviews[i].$relatedQuery("user")
        }
        const mappedRatings = serializedPark.reviews.map((review) => {
            const rating = review.rating
            return rating
        })
        debugger
        const summedRatings = mappedRatings.reduce((acc, curr) => acc + curr)
        const averageRating = summedRatings / mappedRatings.length

        serializedPark.averageRating = averageRating

        return serializedPark;
    }
}

export default ParkSerializer;