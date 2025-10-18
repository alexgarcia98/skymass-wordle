import { SkyMass } from "@skymass/skymass";

const sm = new SkyMass({ key: process.env["SKYMASS_KEY"] });
var attempt = 0

import wordles from './wordles.json' with { type: "json"};
import nonwordles from './nonwordles.json' with { type: "json"};

var randindex = Math.floor(Math.random() * wordles.length);

// global statistics
// - games played
// - win%
// - guess distribution (1-6) (does not include failures)

sm.page("/wordle", (ui) => {
    let to_guess = wordles[randindex]

    const {
        w00, w01, w02, w03, w04,
        w10, w11, w12, w13, w14,
        w20, w21, w22, w23, w24,
        w30, w31, w32, w33, w34,
        w40, w41, w42, w43, w44,
        w50, w51, w52, w53, w54,
        c00, c01, c02, c03, c04,
        c10, c11, c12, c13, c14,
        c20, c21, c22, c23, c24,
        c30, c31, c32, c33, c34,
        c40, c41, c42, c43, c44,
        c50, c51, c52, c53, c54,
        tg, not_cleared
    } = ui.getState(() => ({
        w00: "-", w01: "-", w02: "-", w03: "-", w04: "-", 
        w10: "-", w11: "-", w12: "-", w13: "-", w14: "-", 
        w20: "-", w21: "-", w22: "-", w23: "-", w24: "-", 
        w30: "-", w31: "-", w32: "-", w33: "-", w34: "-", 
        w40: "-", w41: "-", w42: "-", w43: "-", w44: "-", 
        w50: "-", w51: "-", w52: "-", w53: "-", w54: "-", 
        c00: "gray", c01: "gray", c02: "gray", c03: "gray", c04: "gray",
        c10: "gray", c11: "gray", c12: "gray", c13: "gray", c14: "gray",
        c20: "gray", c21: "gray", c22: "gray", c23: "gray", c24: "gray",
        c30: "gray", c31: "gray", c32: "gray", c33: "gray", c34: "gray",
        c40: "gray", c41: "gray", c42: "gray", c43: "gray", c44: "gray",
        c50: "gray", c51: "gray", c52: "gray", c53: "gray", c54: "gray",
        tg: "", not_cleared: true
    }));

    ui.md`
    # Wordle Unlimited

    Enter a 5 letter word and click Submit.

    Green letters are placed properly in the final word.

    Yellow letters exist in the final word, but are in the wrong position.

    Try to guess the word within 6 attempts. Good luck!
    `

    ui.txt("word", `${tg}`, {size: "xl", color: "blue", align: "center"});

    const name = ui.string("guess", {
        label: "Guess",
        pattern: "[a-zA-Z]{5}"
    });

    const isDisabled = !(
        name.isReady && 
        name.val != "" &&
        not_cleared &&
        (nonwordles.includes(name.val) || wordles.includes(name.val)))

    const btn1 = ui.button("button", {
        label: "Submit",
        disabled: isDisabled,
    });

    const btn2 = ui.button("newword", {
        label: "New Word",
        disabled: not_cleared,
    });

    ui.md`
        ~ ~ ~ {w00} {w01} {w02} {w03} {w04} ~ ~ ~
        ~ ~ ~ {w10} {w11} {w12} {w13} {w14} ~ ~ ~
        ~ ~ ~ {w20} {w21} {w22} {w23} {w24} ~ ~ ~
        ~ ~ ~ {w30} {w31} {w32} {w33} {w34} ~ ~ ~
        ~ ~ ~ {w40} {w41} {w42} {w43} {w44} ~ ~ ~
        ~ ~ ~ {w50} {w51} {w52} {w53} {w54} ~ ~ ~
    `;

    const size = "l"
    const align = "center"

    ui.txt("w00", `${w00}`, {size, color: c00, align});
    ui.txt("w01", `${w01}`, {size, color: c01, align});
    ui.txt("w02", `${w02}`, {size, color: c02, align});
    ui.txt("w03", `${w03}`, {size, color: c03, align});
    ui.txt("w04", `${w04}`, {size, color: c04, align});

    ui.txt("w10", `${w10}`, {size, color: c10, align});
    ui.txt("w11", `${w11}`, {size, color: c11, align});
    ui.txt("w12", `${w12}`, {size, color: c12, align});
    ui.txt("w13", `${w13}`, {size, color: c13, align});
    ui.txt("w14", `${w14}`, {size, color: c14, align});

    ui.txt("w20", `${w20}`, {size, color: c20, align});
    ui.txt("w21", `${w21}`, {size, color: c21, align});
    ui.txt("w22", `${w22}`, {size, color: c22, align});
    ui.txt("w23", `${w23}`, {size, color: c23, align});
    ui.txt("w24", `${w24}`, {size, color: c24, align});

    ui.txt("w30", `${w30}`, {size, color: c30, align});
    ui.txt("w31", `${w31}`, {size, color: c31, align});
    ui.txt("w32", `${w32}`, {size, color: c32, align});
    ui.txt("w33", `${w33}`, {size, color: c33, align});
    ui.txt("w34", `${w34}`, {size, color: c34, align});

    ui.txt("w40", `${w40}`, {size, color: c40, align});
    ui.txt("w41", `${w41}`, {size, color: c41, align});
    ui.txt("w42", `${w42}`, {size, color: c42, align});
    ui.txt("w43", `${w43}`, {size, color: c43, align});
    ui.txt("w44", `${w44}`, {size, color: c44, align});

    ui.txt("w50", `${w50}`, {size, color: c50, align});
    ui.txt("w51", `${w51}`, {size, color: c51, align});
    ui.txt("w52", `${w52}`, {size, color: c52, align});
    ui.txt("w53", `${w53}`, {size, color: c53, align});
    ui.txt("w54", `${w54}`, {size, color: c54, align});


    let w = ""
    let c = ["gray", "gray", "gray", "gray", "gray"]
    if (btn1.didClick) {
        w = name.val
        let temp1 = name.val
        let temp2 = to_guess
        for (let i = 0; i < 5; i++) {
            if (temp1[i] == temp2[i]) {
                temp1 = temp1.slice(0, i) + "*" + temp1.slice(i + 1)
                temp2 = temp2.slice(0, i) + "*" + temp2.slice(i + 1)
                c[i] = "green"
            }
        }
        if (temp1 == "*****") {
            ui.setState(({}) => {
                return {
                    not_cleared: false
                };
            });
        }
    
        for (let i = 0; i < 5; i++) {
            if (temp1[i] != "*") {
                let ind = temp2.indexOf(temp1[i])
                if (ind != -1) {
                    temp2 = temp2.slice(0, ind) + "-" + temp2.slice(ind + 1)
                    c[i] = "yellow"
                }
            }
        }

        
        if (attempt == 0) {
            ui.setState(({}) => {
                return {
                    c00: c[0], c01: c[1], c02: c[2], c03: c[3], c04: c[4]
                };
            });
            ui.setState(({}) => {
                return {
                    w00: `${w[0]}`, w01: `${w[1]}`, w02: `${w[2]}`, w03: `${w[3]}`, w04: `${w[4]}`
                };
            });
        }
        else if (attempt == 1) {
            ui.setState(({}) => {
                return {
                    c10: c[0], c11: c[1], c12: c[2], c13: c[3], c14: c[4]
                };
            });
            ui.setState(({}) => {
                return {
                    w10: `${w[0]}`, w11: `${w[1]}`, w12: `${w[2]}`, w13: `${w[3]}`, w14: `${w[4]}`
                };
            });
        }
        else if (attempt == 2) {
            ui.setState(({}) => {
                return {
                    c20: c[0], c21: c[1], c22: c[2], c23: c[3], c24: c[4]
                };
            });
            ui.setState(({}) => {
                return {
                    w20: `${w[0]}`, w21: `${w[1]}`, w22: `${w[2]}`, w23: `${w[3]}`, w24: `${w[4]}`
                };
            });
        }
        else if (attempt == 3) {
            ui.setState(({}) => {
                return {
                    c30: c[0], c31: c[1], c32: c[2], c33: c[3], c34: c[4]
                };
            });
            ui.setState(({}) => {
                return {
                    w30: `${w[0]}`, w31: `${w[1]}`, w32: `${w[2]}`, w33: `${w[3]}`, w34: `${w[4]}`
                };
            });
        }
        else if (attempt == 4) {
            ui.setState(({}) => {
                return {
                    c40: c[0], c41: c[1], c42: c[2], c43: c[3], c44: c[4]
                };
            });
            ui.setState(({}) => {
                return {
                    w40: `${w[0]}`, w41: `${w[1]}`, w42: `${w[2]}`, w43: `${w[3]}`, w44: `${w[4]}`
                };
            });
        }
        else if (attempt == 5) {
            ui.setState(({}) => {
                return {
                    c50: c[0], c51: c[1], c52: c[2], c53: c[3], c54: c[4]
                };
            });
            ui.setState(({}) => {
                return {
                    w50: `${w[0]}`, w51: `${w[1]}`, w52: `${w[2]}`, w53: `${w[3]}`, w54: `${w[4]}`
                };
            });
            ui.setState(({}) => {
                return {
                    not_cleared: false
                };
            });
            if (temp1 != "*****") {
                ui.setState(({}) => {
                    return {
                        tg: to_guess
                    };
                });
            }
        }
        attempt++
        name.setVal("")
    }

    if (btn2.didClick) {
        randindex = Math.floor(Math.random() * wordles.length);
        to_guess = wordles[randindex]
        attempt = 0
        ui.setState(({}) => {
            return {
                w00: "-", w01: "-", w02: "-", w03: "-", w04: "-", 
                w10: "-", w11: "-", w12: "-", w13: "-", w14: "-", 
                w20: "-", w21: "-", w22: "-", w23: "-", w24: "-", 
                w30: "-", w31: "-", w32: "-", w33: "-", w34: "-", 
                w40: "-", w41: "-", w42: "-", w43: "-", w44: "-", 
                w50: "-", w51: "-", w52: "-", w53: "-", w54: "-", 
                c00: "gray", c01: "gray", c02: "gray", c03: "gray", c04: "gray",
                c10: "gray", c11: "gray", c12: "gray", c13: "gray", c14: "gray",
                c20: "gray", c21: "gray", c22: "gray", c23: "gray", c24: "gray",
                c30: "gray", c31: "gray", c32: "gray", c33: "gray", c34: "gray",
                c40: "gray", c41: "gray", c42: "gray", c43: "gray", c44: "gray",
                c50: "gray", c51: "gray", c52: "gray", c53: "gray", c54: "gray",
                tg: "", not_cleared: true
            }
        });
    }

    });
