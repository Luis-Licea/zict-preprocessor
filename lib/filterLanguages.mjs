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
        return console.error("No path to file given.");
    }
    const saved = outputPath ?? inputPath;

    const dom = await JSDOM.fromFile(inputPath);
    const document = dom.window.document;

    const spanish = [
        "Español",
        "Inglés",
        "Ruso",
        "Latín",
        "Griego",
        "Esperanto",
        "Japonés",
    ];
    const english = [
        "English",
        "Russian",
        "Spanish",
        "Japanese",
        "Esperanto",
        "Latin",
        "Greek",
    ];
    const relevantLanguages = [...spanish, ...english];

    /**
     * @param {[string]} relevantLanguages The list of languages to keep in the
     * Wiktionary translation tables. The rest will be removed.
     */
    function filterTranslations(relevantLanguages) {
        const translationSections = [
            ...document.querySelectorAll(".translations tbody tr td ul"),
        ];

        const translations = translationSections.reduce(
            (translations, translationSection) => {
                return [...translations, ...translationSection.children];
            },
            []
        );
        const irrelevantTranslations = translations.filter((translation) => {
            for (const language of relevantLanguages) {
                if (translation.innerHTML.startsWith(language)) {
                    return false;
                }
            }
            return true;
        });

        irrelevantTranslations.map((translation) => translation.remove());
    }

    /**
     * @param {[string]} relevantLanguages The list of languages to keep in the
     * Wiktionary article. The rest will be removed.
     */
    function filterLanguages(relevantLanguages) {
        const languages = [...document.querySelectorAll("details summary h2")];
        const irrelevantLanguages = languages.filter(
            (language) => !relevantLanguages.includes(language.id)
        );
        for (const language of irrelevantLanguages) {
            const languageDetails = language.parentElement.parentElement;
            if (!languageDetails) {
                continue;
            }
            languageDetails.remove();
        }
    }

    filterTranslations(relevantLanguages);
    filterLanguages(relevantLanguages);
    fs.writeFileSync(saved, document.body.innerHTML);
}
