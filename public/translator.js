import { americanOnly } from "./american-only.js";
import { britishOnly } from "./british-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";

const britishToAmericanSpelling = {};
Object.keys(americanToBritishSpelling).forEach(key => {
  britishToAmericanSpelling[americanToBritishSpelling[key]] = key;
});

const amtToBrt = word => {
  if (/^\d{1,2}\:\d{1,2}/.test(word)) {
    return word.replace(":", ".");
  }
  return null;
};

const brtToAmt = word => {
  if (/^\d{1,2}\.\d{1,2}/.test(word)) {
    return word.replace(/\./, ":");
  }
  return null;
};

const abPunc = str => {
  const word = str.replace(/\W/g, "");
  const word1 = americanToBritishSpelling[word.toLowerCase()] || word;
  if (word1 === word) {
    return null;
  }

  return str.replace(/\w*/, word1);
};

const baPunc = str => {
  const word = str.replace(/\W/g, "");
  const word1 = britishToAmericanSpelling[word.toLowerCase()] || word;
  if (word1 === word) {
    return null;
  }

  return str.replace(/\w*/, word1);
};

const ameToBreWithWrapper = (ame, l, r) => {
  let inter = ame
    .split(" ")
    .map(word => {
      const word1 = amtToBrt(word) || abPunc(word);
      if (word1) {
        return l + word1 + r;
      }
      return word;
    })
    .join(" ");
  Object.keys(americanOnly).forEach(key => {
    if (new RegExp(key + "\\W", "i").test(inter)) {
      inter = inter.replace(
        new RegExp(key, "ig"),
        "" + l + americanOnly[key] + r
      );
    }
  });
  Object.keys(americanToBritishTitles).forEach(key => {
    if (new RegExp(americanToBritishTitles[key] + "\\.\\W", "i").test(inter)) {
      inter = inter.replace(
        new RegExp("(?=" + americanToBritishTitles[key] + "\\.)", "ig"),
        l
      );

      inter = inter.replace(
        new RegExp("(?<=" + americanToBritishTitles[key] + ")\\.", "ig"),
        r
      );
    }
  });
  console.log(inter);
  return inter;
};

const ameToBre = ame => {
  return ameToBreWithWrapper(ame, "", "");
};

const breToAmeWithWrapper = (bre, l, r) => {
  let inter = bre
    .split(" ")
    .map(word => {
      const word1 = brtToAmt(word) || baPunc(word);
      if (word1) {
        return l + word1 + r;
      }
      return word;
    })
    .join(" ");
  Object.keys(britishOnly)
    .filter(key => new RegExp(key + "\\W", "i").test(inter))
    .forEach(key => {
      inter = inter.replace(
        new RegExp(key, "ig"),
        "" + l + britishOnly[key] + r
      );
    });
  Object.keys(americanToBritishTitles)
    .filter(key =>
      new RegExp(americanToBritishTitles[key] + "\\W", "i").test(inter)
    )
    .forEach(key => {
      inter = inter.replace(
        new RegExp("(?=" + americanToBritishTitles[key] + ")", "ig"),
        l
      );
      inter = inter.replace(
        new RegExp("(?<=" + americanToBritishTitles[key] + ")", "ig"),
        "." + r
      );
    });
  console.log(inter);
  return inter;
};

const breToAme = bre => {
  return breToAmeWithWrapper(bre, "", "");
};

const clickTranslate = () => {
  const option = document.getElementById("locale-select").value;

  const original = document.getElementById("text-input").value;
  
  if (!original) {
    document.getElementById("error-msg").innerHTML = "Error: No text to translate.";
    return;
  }
  
  let translated = "";

  switch (option) {
    case "american-to-british":
      translated = ameToBreWithWrapper(
        original,
        '<span class="highlight">',
        "</span>"
      );

      break;
    case "british-to-american":
      translated = breToAmeWithWrapper(
        original,
        '<span class="highlight">',
        "</span>"
      );
      break;
    default:
      return;
  }
  if (translated === original) {
    document.getElementById("translated-sentence").innerHTML += "Everything looks good to me!<br>";
    return;
  }

  document.getElementById("translated-sentence").innerHTML += translated;
  document.getElementById("translated-sentence").innerHTML += "<br>";
};

const clickClear = () => {
  document.getElementById('text-input').value = '';
  document.getElementById('translated-sentence').innerHTML = '';
  document.getElementById('error-msg').innerHTML = '';
}

document.getElementById("translate-btn").onclick = clickTranslate;
document.getElementById('clear-btn').onclick = clickClear;

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    ameToBre,
    breToAme,
    clickTranslate,
    clickClear
  };
} catch (e) {}
