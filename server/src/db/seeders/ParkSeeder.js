import { Park } from "../../models/index.js";

class ParkSeeder {
    static async seed() {
        const parkData = [{
                name: "Middlesex Fellsway Park",
                location: "Medford, MA",
                description: "Wonderful public park for taking a leisurely hike",
                rating: "4.5",
                picture: "https://miro.medium.com/max/1200/1*faUffoe2QCOMqVhpxzpa7g.png",
                userId: "1",
            },
            {
                name: "Jamaica Pond",
                location: "Jamaica Plain, MA",
                description: "This is a lovely park with a beautiful pond! Great for a family walk!",
                rating: "4",
                picture: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/jamaica-pond-boat-house-boston-loriann-dantonio.jpg",
                userId: "1",
            },
            {
                name: "Boston Common",
                location: "Boston, MA",
                description: "This is where 'Good Will Hunting' was filmed!!!",
                rating: "4",
                picture: "https://d21xlh2maitm24.cloudfront.net/bst/bostoncommon.jpg?mtime=20180503113829",
                userId: "1",
            },
            {
                name: "Arnold Arboretum Park",
                location: "Jamaica Plain, MA",
                description: "A botanical garden Park",
                rating: "5",
                picture: "https://arboretum.harvard.edu/wp-content/uploads/2020/08/Bussey_Hill_Aerial_Hetman.jpg",
                userId: "1",
            },
        ];

        for (const singleParkData of parkData) {
            const currentPark = await Park.query().findOne({ name: singleParkData.name });
            if (!currentPark) {
                await Park.query().insert(singleParkData);
            }
        }
    }
}

export default ParkSeeder;