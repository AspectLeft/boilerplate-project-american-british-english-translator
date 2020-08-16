/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

const { JSDOM } = require("jsdom");
let Translator;

suite("Functional Tests", () => {
  suiteSetup(() => {
    
    Translator = require('../public/translator.js');
  });

  suite("Function ____()", () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
      const value = "Mangoes are my favorite fruit.";
      const output = "Mangoes are my favourite fruit.";
      const textArea = global.document.getElementById("text-input");
      textArea.value = value;

      Translator.clickTranslate();

      const appended = global.document.getElementById("translated-sentence")
        .textContent;
      console.log(appended);
      assert.equal(appended, output);

      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      global.document.getElementById("translated-sentence").innerHTML = "";
      const value = "Nothing";
      const output = "Everything looks good to me!";
      const textArea = global.document.getElementById("text-input");
      textArea.value = value;

      Translator.clickTranslate();

      const appended = global.document.getElementById("translated-sentence")
        .textContent;
      console.log(appended);
      assert.equal(appended, output);

      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      global.document.getElementById("translated-sentence").innerHTML = "";
      const value = "";
      const output = "Error: No text to translate.";
      const textArea = global.document.getElementById("text-input");
      textArea.value = value;

      Translator.clickTranslate();

      const appended = global.document.getElementById("error-msg").innerHTML;
      console.log(appended);
      assert.equal(appended, output);

      done();
    });
  });

  suite("Function ____()", () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      const value = "Mangoes are my favorite fruit.";
      const output = "Mangoes are my favourite fruit.";
      const textArea = global.document.getElementById("text-input");
      textArea.value = value;
      
      
      Translator.clickTranslate();
      Translator.clickClear();
      
      assert.equal(global.document.getElementById("error-msg").innerHTML, '');
      assert.equal(global.document.getElementById("translated-sentence").innerHTML, '');
      assert.equal(global.document.getElementById("text-input").value, '');
      
      done();
    });
  });
});
