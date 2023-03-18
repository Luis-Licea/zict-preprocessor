import {getDirPath} from "../lib/path.mjs";
import { filterLanguages } from "../lib/filterLanguages.mjs";
import { mkdirSync, existsSync } from "fs";

const dirPath = getDirPath(import.meta.url);
const artifacts = `${dirPath}/artifacts`;
const articles = `${dirPath}/articles`;

if (!existsSync(artifacts)) {
    mkdirSync(artifacts);
}

filterLanguages(`${articles}/hello.html`, `${artifacts}/hello-filtered.html`);
filterLanguages(`${articles}/japan.html`, `${artifacts}/japan-filtered.html`);
