import ReviewSerializer from "./ReviewSerializer.js";
import VoteSerializer from "./VoteSerializer.js"

class ParkSerializer {
    static async showData(park) {
        const allowedAttributes = ["id", "name", "location", "description", "picture"];

        let serializedPark = {};
        for (const attribute of allowedAttributes) {
            serializedPark[attribute] = park[attribute];
        }
      
        const voteTotal = await VoteSerializer.showData(park)
        serializedPark.voteTotal = voteTotal

        const reviews = await park.$relatedQuery("reviews");
        serializedPark.reviews = await Promise.all(
            reviews.map((review) => {
                return ReviewSerializer.showData(review);
            })
        );
        

        const mappedRatings = serializedPark.reviews.map((review) => {
            const rating = review.rating;
            return rating;
        });

        if (mappedRatings.length !== 0) {
            const summedRatings = mappedRatings.reduce((acc, curr) => acc + curr);
            const averageRating = summedRatings / mappedRatings.length;
            serializedPark.averageRating = averageRating;
        }
       
        return serializedPark;
    }

    static async showDetails(park) {
        const allowedAttributes = ["id", "name", "location", "description", "picture"];

        let serializedPark = {};
        for (const attribute of allowedAttributes) {
            serializedPark[attribute] = park[attribute];
        }
        const reviews = await park.$relatedQuery("reviews");
        serializedPark.reviews = await Promise.all(
            reviews.map((review) => {
                return ReviewSerializer.showData(review);
            })
        );

        const mappedRatings = serializedPark.reviews.map((review) => {
            const rating = review.rating;
            return rating;
        });

        if (mappedRatings.length !== 0) {
            const summedRatings = mappedRatings.reduce((acc, curr) => acc + curr);
            const averageRating = summedRatings / mappedRatings.length;
            serializedPark.averageRating = averageRating;
        }
      
        return serializedPark;
    }
}

export default ParkSerializer;