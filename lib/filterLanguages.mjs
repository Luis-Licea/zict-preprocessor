#!/usr/bin/node
import fs from "fs";
import { JSDOM } from "jsdom";

/**
* @param {string} inputPath The path to the HTML Wiktionary entry to modify.
* @param {string?} outputPath The path where the modified HTML file will be
* saved. If no output path is given, the file will be modified in-place.
*/
export async function filterLanguages(inputPath, outputPath = null) {
    if (!inputPath?.length) {
        return console.error("No path to file given.")
    }
    const saved = outputPath ?? inputPath

    const dom = await JSDOM.fromFile(inputPath);
    const document = dom.window.document;

    function filterTranslations() {
        const translationSections = [...document.querySelectorAll('.translations tbody tr td ul')]

        const translations = translationSections.reduce((translations, translationSection) => {
            return [...translations, ...translationSection.children]
        }, []);

        const relevantLanguages = [
            "English",
            "Russian",
            "Spanish",
            "Japanese"
        ]

        translations.filter(translation => {
            for (const language of relevantLanguages) {
                 if (translation.innerHTML.startsWith(language)) {
                     return true;
                 }
            }
            translation.remove();
            return false;
        });

        fs.writeFileSync(saved, document.body.innerHTML)
    }
    filterTranslations();
}
