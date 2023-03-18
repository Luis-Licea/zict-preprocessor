import {getDirPath} from "../lib/path.mjs";
import { filterLanguages } from "../lib/filterLanguages.mjs";
import { mkdirSync, existsSync } from "fs";

const dirPath = getDirPath(import.meta.url);
const artifacts = `${dirPath}/artifacts`;
const articles = `${dirPath}/articles`;

if (!existsSync(artifacts)) {
    mkdirSync(artifacts);
}

const entries = [
    "bar",
    "hello",
    "japan",
    "o",
    "думать",
]
for (const entry of entries) {
    filterLanguages(`${articles}/${entry}.html`, `${artifacts}/${entry}-filtered.html`);
}
