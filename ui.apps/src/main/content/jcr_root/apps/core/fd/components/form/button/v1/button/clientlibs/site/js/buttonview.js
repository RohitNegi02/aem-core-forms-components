/*******************************************************************************
 * Copyright 2022 Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
(function() {

    "use strict";
    class Button extends FormView.FormFieldBase {

        static NS = FormView.Constants.NS;
        /**
         * Each FormField has a data attribute class that is prefixed along with the global namespace to
         * distinguish between them. If a component wants to put a data-attribute X, the attribute in HTML would be
         * data-{NS}-{IS}-x=""
         * @type {string}
         */
        static IS = "adaptiveFormButton";
        static bemBlock = 'cmp-button';
        static selectors  = {
            self: "[data-" + this.NS + '-is="' + this.IS + '"]',
            text: `.${Button.bemBlock}__text`,
        };

        /**
         * Return the questionmark element.
         * @readonly
         * @returns {HTMLElement}
         */
        get qm() {
            return document.getElementById(`${this.element.id}-questionMark`);
        }

        /**
         * Return the widget element that is used to capture the value from the user
         * @returns {HTMLElement}
         */
        getWidget() {
            return this.element;
        }

        /**
         * Return the description element.
         * @returns {HTMLElement}
         */
        getDescription() {
            return document.getElementById(`${this.element.id}-longDescription`);
        }

        /**
         * Return the button text element.
         * @returns {HTMLElement}
         */
        getText() {
            return this.element.querySelector(Button.selectors.text);
        }

        setModel(model) {
            super.setModel(model);
            this.element.addEventListener("click", () => {
                this._model.dispatchEvent(new FormView.Actions.Click())
            });
        }

        getErrorDiv() {
            return null;
        }

        _updateValue(value) {
            // do nothing
        }
    }

    FormView.Utils.setupField(({element, formContainer}) => {
        return new Button({element, formContainer})
    }, Button.selectors.self);

})();
