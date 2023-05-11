import { config } from "dotenv";
import { createApp } from "./utils/createApp";
import './database';
config();  

const PORT = process.env.PORT || 3001;

async function main() {
  try {
    const app = createApp();
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
main();
