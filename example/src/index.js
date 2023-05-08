import styles from "./styles.css";
import { exportedFn } from "./exported";

import("./dynamic.js").then(x => x.dynamicFn())

exportedFn();

console.log(process.env.TEST);
