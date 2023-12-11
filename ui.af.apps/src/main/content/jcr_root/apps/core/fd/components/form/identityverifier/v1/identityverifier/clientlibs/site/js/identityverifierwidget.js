/*******************************************************************************
 * Copyright 2023 Adobe
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

/**
 * This class is responsible for interacting with the file input widget. It implements the file preview,
 * file list, handling invalid file size, file name, file mime type functionality
 */
if (typeof window.IdentityVerifierWidget === 'undefined') {
    window.IdentityVerifierWidget = class {
        constructor(widget, identityVerifierElements) {
            this.#attachEventHandlers(widget, identityVerifierElements);
        }
        sessionId = "";
        #attachEventHandlers(widget, identityVerifierElements) {
            const {
                firstName,
                lastName,
                address,
                city,
                zipCode,
                ssn,
                aadhar,
                phone,
                submit,
                identityProvider,
                otpContainer,
                verifiedContainer,
                verifyOTP,
                otp,
                requiredText,
                invalidText,
                invalidOTP,
                loader
            } = identityVerifierElements;

            const payload = {};

            firstName?.addEventListener('change', (e)=> {
                payload.firstName = e.target.value;
            });
            lastName?.addEventListener('change', (e)=> {
                payload.lastName = e.target.value;
            });
            address?.addEventListener('change', (e)=> {
                payload.address = e.target.value;
            });
            city?.addEventListener('change', (e)=> {
                payload.city = e.target.value;
            });
            zipCode?.addEventListener('change', (e)=> {
                payload.zipCode = e.target.value;
            });
            ssn?.addEventListener('change', (e)=> {
                payload.ssn = e.target.value;
            });
            aadhar?.addEventListener('change', (e)=> {
                payload.aadhar = e.target.value;
            });
            phone?.addEventListener('change', (e)=> {
                payload.phone = e.target.value;
            });
            otp?.addEventListener('change', (e)=> {
                payload.otp = e.target.value;
            });
            submit?.addEventListener('click', async(e)=> {
                let data = {};
                let provider = "";
                loader.style.display = "block";
                identityProvider.style.display = "none";
                if(aadhar) {
                    data = {
                        "aadhaarNumber": payload.aadhar
                    }
                    provider="aadhaar";
                } else {
                    data = {
                        "firstName": payload.firstName,
                        "lastName": payload.lastName,
                        "phoneNumber": payload.phone,
                        "zip": payload.zipCode,
                        "address": payload.address,
                        "city": payload.city,
                        "ssn": payload.ssn
                    }
                    provider="ssn";
                }
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Basic YWRtaW46YWRtaW4=");
                var raw = JSON.stringify({
                "provider": provider,
                "data": data
                });
                let requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
                };
                fetch("/adobe/forms/af/idp/initiate", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.data.status === "error") {
                        throw error;
                    }
                    otpContainer.style.display = "block";
                    identityProvider.style.display = "none";
                    this.sessionId= result?.data?.sessionId;
                    loader.style.display = "none";
                })
                .catch((error) => {
                    invalidText.style.display="block";
                    loader.style.display = "none";
                    identityProvider.style.display = "block";
                });
            });


            verifyOTP?.addEventListener('click', () => {
                let myHeaders = new Headers();
                loader.style.display = "block";
                otpContainer.style.display = "none";
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", "Basic YWRtaW46YWRtaW4=");
                let provider = "";
                if(aadhar) {
                    provider="aadhaar"
                } else {
                    provider="ssn"
                }

                var raw = JSON.stringify({
                "provider": provider,
                "data": {
                    "sessionId": this.sessionId,
                    "otp": payload.otp
                }
                });
                
                let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
                
                fetch("/adobe/forms/af/idp/verify", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result?.data?.code === 200 || result?.data?.code === "success") {
                        otpContainer.style.display = "none";
                        verifiedContainer.style.display = "block";
                        loader.style.display = "none";
                    } else{
                        loader.style.display = "none";
                        otpContainer.style.display = "block";
                        throw error;
                    }
                })
                .catch(error => {
                    loader.style.display = false;
                    invalidOTP.style.display = "block";
                    otpContainer.style.display = "block";
                });
            })

            const fields = [firstName, lastName, address, city, zipCode, ssn, aadhar, phone].filter(field => field);

            otp?.addEventListener('change', () => {
                verifyOTP.disabled = !(otp?.value.trim() !== '');
            });

            fields.forEach(input => {
                input.addEventListener('change', function() {
                  const allFieldsFilled = firstName?.value.trim() !== '' &&
                                          lastName?.value.trim() !== '' &&
                                          city?.value.trim() !== '' &&
                                          zipCode?.value.trim() !== '' &&
                                          ssn?.value.trim() !== '' &&
                                          aadhar?.value.trim() !== '' &&
                                          phone?.value.trim() !== '' &&
                                          address?.value.trim() !== '';

                  submit.disabled = !allFieldsFilled;
                  invalidOTP.style.display = "none";
                  invalidText.style.display = "none";
                  requiredText.style.display = allFieldsFilled ? "none" : "block";
                });
            });
        }
    }
}



