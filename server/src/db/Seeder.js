import { connection } from "../boot.js";

import ParkSeeder from "./seeders/ParkSeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding parks...")
    await ParkSeeder.seed()

    console.log("done!")
    await connection.destroy();
  }
}

export default Seeder 