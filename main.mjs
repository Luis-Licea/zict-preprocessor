#!/usr/bin/node
import fs from "fs";
import { JSDOM } from "jsdom";

export async function main(filePath) {
    // const saved = "saved.html"
    const saved = filePath
    if (!filePath?.length) {
        return console.error("No path to file given.")
        return;
    }
    const dom = await JSDOM.fromFile(filePath);
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

        // return
        fs.writeFileSync(saved, document.body.innerHTML)
    }
    filterTranslations();
}

main(process.argv[2]);
