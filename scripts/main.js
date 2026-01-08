Hooks.once("polyglot.init", (LanguageProvider) => {
    const spoken = ["Alaani","Angram","Asdharia","Atak","Aureliani","Bosparano","Drachisch","Ferkina","Fjarningisch","Füchsisch","Garethi","Gjalskisch","Goblinisch","Grolmisch","Hjaldingsch","Isdira","Koboldisch","Sprache der Blumen","Mahrisch","Mohisch","Molochisch","Neckergesang","Nujuka","Altes Kemi","Oloarkh","Ologhaijan","Puka-Puka","Rabensprache","Rissoal","Rogolan","Rssahh","Ruuz","Thorwalsch","Tocamuyac","Trollisch","Tulamidya","Ur-Tulamidya","Z'Lit","Zelemja","Zhayad","Zhulchammaqra","Zyklopäisch"];

    const sign = ["Angram","Arkanil","Asdharia","Chrmk","Chuchas","Drakhard-Zinken","Drakned-Glyphen","Gimaril","Gjalskisch","Hjaldingsche Runen","Geheiligte Glyphen von Unau","Imperiale Zeichen","Isdira","Kusliker Zeichen","Mahrische Glyphen","Modernes Amulashtra","Nanduria","Altes Alaani","Altes Amulashtra","Altes Kemi","Ur-Tulamidya","Rogolan","Trollische Raumbilderschrift","Tulamidya","Wudu","Xo'Artal-Glyphen","Yash'Hualay-Glyphen","Zhayad","Zyklopische Runen"];

    class FictionalGameSystemLanguageProvider extends LanguageProvider {

        async getLanguages() {
            const langs = {};
            const languagesSetting = game.settings.get("polyglot", "Languages");
                for (let lang of spoken) {
                    langs[lang] = {
                        label: lang,
                        font: languagesSetting[lang]?.font || this.languages[lang]?.font || this.defaultFont,
                        rng: languagesSetting[lang]?.rng ?? "default",
                    };
                }
                for (let lang of sign) {
                    langs[lang] = {
                        label: lang,
                        font: languagesSetting[lang]?.font || this.languages[lang]?.font || this.defaultFont,
                        rng: languagesSetting[lang]?.rng ?? "default",
                    };
                }
            this.languages = langs;
        }

        getUserLanguages(actor) {
            let known_languages = new Set();
            let literate_languages = new Set();
            const spoken = Object.entries(actor.system.skill).filter(([k, v]) => k.includes("lang") && v);
            const written = Object.entries(actor.system.skill).filter(([k, v]) => k.includes("sign") && v);
            for (let lang of spoken) {
                known_languages.add(lang[0].replace("lang", ""));
            }
            for (let lang of written) {
                known_languages.add(lang[0].replace("sign", ""));
            }
            return [known_languages, literate_languages];
        }
    }
    game.polyglot.api.registerModule("dsa-polyglot-bridge", FictionalGameSystemLanguageProvider);
})