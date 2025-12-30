(function () {
    var O = function () {
        var q, C, F, G, D, w, b = window.RH || window.Maitre;
        void 0 === window.Maitre && (window.Maitre = {});
        void 0 === window.RH && (window.RH = {});
        var r = {referrer: !1, source: !1, campaign: !0, fingerprinting: !1, session: !1};
        var H = q = !1;
        var g = {};
        var K = C = !1;
        var I = D = !0;
        var E = w = !1;
        var L = 0;
        var RH_JM = 0;
        mtg = function (a) {
            return document.createElement(a)
        };
        mtid = function (a) {
            return document.getElementById(a)
        };
        capitalizeFirstLetter = function (a) {
            return a.charAt(0).toUpperCase() + a.slice(1);
        };
        toTitleCase = function (a) {
            return a.replace(
                /\w\S*/g,
                function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        };
        alert_or_console = function (error) {
            mtid('mtr-form') == null ? console.error(error) : alert(error)
        }
        isEmpty = function (obj) {
            return Object.keys(obj).length === 0;
        }
        phoneFormat = function (input, format, code, iso) {
            input = input.replace(/\D/g, '');
            if (input.charAt(0) === '0') {
                input = input.substring(1);
            }
            format = format || 10;
            input = input.substring(0, format);

            if (typeof libphonenumber === 'undefined') {
                var script = document.createElement('script');
                script.src = 'https://unpkg.com/libphonenumber-js/bundle/libphonenumber-js.min.js';
                document.head.appendChild(script);
            }

            var size = input.length;
            if (size > 1 && typeof libphonenumber !== 'undefined') {
                var phoneNumber = libphonenumber.parsePhoneNumberFromString("+" + code + input, iso);
                var formattedPhoneNumber = phoneNumber.nationalNumber.toString();
                input = formattedPhoneNumber;
            }
            return input;
        }

        RH.pendingReferral = function (data, c) {
            try{
                var list_result_array = g.tools.getListUuid();
                var list_uuid = list_result_array[0];
                let rh_variable = list_result_array[1];
                list_uuid != null && config[list_uuid] != undefined ? g.methods.pendingReferral(data, c, config[list_uuid], window[rh_variable]) : console.error("No referrer exists.");
            }catch (err) {
                g.tools.sendErrorNotification(err, "pendingReferral 67");
                console.error("[ReferralHero] An unexpected error occurred in method pending referral:", err);
            }
        };

        RH.trackReferral = function (a, c, d) {
            try{
                a && 0 < a.trim().length ? g.tools.asyncRequest.request(g.tools.getWidgetUrl(config[Object.keys(config)[0]]) + "/find_list_and_settings", "POST", {
                    ui: a,
                    user_uuid: b.uuid
                }, function (f) {
                    if(f.response == "ok"){
                        f.list_uuid.forEach(function(list_uuid) {
                            let rh_variable = "RH_"+list_uuid;
                            list_uuid != null && config[list_uuid] != undefined && g.methods.trackReferral(a, c, d, config[list_uuid], window[rh_variable]);
                        })
                    }else{
                        var list_result_array = g.tools.getListUuid();
                        var list_uuid = list_result_array[0];
                        let rh_variable = list_result_array[1];
                        if(list_uuid != null && config[list_uuid] != undefined){
                            g.methods.trackReferral(a, c, d, config[list_uuid], window[rh_variable]);
                        }else{
                            console.error("[ReferralHero] Referral Conversion Event not tracked.");
                        }
                    }
                }, function (f) {
                    console.error(f)
                }) : console.error("[ReferralHero] Referral Conversion Event not tracked because the function is missing unique identifier.");
            }catch (err) {
                g.tools.sendErrorNotification(err, "trackReferral 97");
                console.error("[ReferralHero] An unexpected error occurred in method track referral:", err);
            }
        };

        RH.organicTrackReferral = function (data, c) {
            try{
                var list_uuid = null;
                let rh_variable = null;
                g.tools.asyncRequest.request(g.tools.getWidgetUrl(config[Object.keys(config)[0]]) + "/find_list_and_settings", "POST", {
                    ui: data,
                    user_uuid: b.uuid
                }, function (f) {
                    if(f.response == "ok"){
                        f.list_uuid.forEach(function(list_uuid) {
                            rh_variable = "RH_"+list_uuid;
                            config[list_uuid] != undefined && g.methods.organicTrackReferral(data, c, config[list_uuid], window[rh_variable]);
                        })
                    }else{
                        var list_result_array = g.tools.getListUuid();
                        var list_uuid = list_result_array[0];
                        let rh_variable = list_result_array[1];
                        if(list_uuid != null && config[list_uuid] != undefined){
                            g.methods.organicTrackReferral(data, c, config[list_uuid], window[rh_variable]);
                        }else{
                            console.error("[ReferralHero] Referral Conversion Event not tracked. Please use RH_[uuid].organicTrackReferral if you wish to track an organic subscriber");
                        }
                    }
                }, function (f) {
                    console.error(f)
                });
            }catch (err) {
                g.tools.sendErrorNotification(err, "organicTrackReferral 129");
                console.error("[ReferralHero] An unexpected error occurred in organic track referral:", err);
            }
        };

        RH.form = {
            submit: function (data, noError) {
                try{
                    var list_result_array = g.tools.getListUuid();
                    var list_uuid = list_result_array[0];
                    let rh_variable = list_result_array[1];
                    list_uuid != null && config[list_uuid] != undefined ? g.form.submit(data, config[list_uuid], window[rh_variable]) : noError == undefined ? console.error("Error fetching referrer. Please use RH_[uuid].form.submit if you wish to add an organic subscriber.") : console.log("");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "RH.form.submit 149");
                    console.error("[ReferralHero] An unexpected error occurred in method form submit:", err);
                }
            }
        };

        g.methods = {
            identify: function (a, c, d, config, RH) {
                try{
                    var ui = config.settings.unique_identifier == 'email' ? a.email : config.settings.unique_identifier == 'phone_number' ? a.phone_number : config.settings.unique_identifier == 'other_identifier_value' ? a.other_identifier_value : 'crypto_wallet_address';
                    if (config.settings.recaptcha.enable) r.session = !0, console.warn("[ReferralHero] Identify() disabled because Recaptcha is enabled."); else if (a) if (ui && "" != ui.trim()) {
                        var anonymous_visitor = g.tools.getAnonymousVisitorId(RH);
                        var f = g.tools.readCookie("__maitre-session-" + config.uuid);
                        c || !f ? (c = {
                            test_mode: w,
                            check_status: !1,
                            one_click_signup: !0,
                            name: a.name,
                            email: a.email,
                            phone_number: a.phone_number,
                            crypto_wallet_address: a.crypto_wallet_address,
                            other_identifier_value: a.other_identifier_value,
                            extra_field: a.extra_field,
                            extra_field_2: a.extra_field_2,
                            extra_field_3: a.extra_field_3,
                            extra_field_4: a.extra_field_4,
                            option_field: a.option_field,
                            address: a.address,
                            terms_conditions: !0,
                            uuid: config.uuid,
                            host: config.defaults.default_url,
                            source: RH.source,
                            campaign: config.uuid,
                            fingerprint: RH.fingerprint,
                            recaptcha: G,
                            require_leaderboard: config.settings.sharing.leaderboard.show,
                            upsert: a.upsert,
                            sub_id: anonymous_visitor,
                            subscribe_page_url: window.location.href,
                            landing_page_url: window.location.href,
                            widget_type: "identify",
                            referrer: RH.referrer,
                            skip_verification: a.skip_verification || false
                        }, g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/post", "POST", c, function (e) {
                            "error" == e.response ? config.callbacks.hasOwnProperty("error") && (console.error(e.message), config.callbacks.error(a)) : "affiliate_referral_found" == e.response ? console.log("Affiliate referral cannot be identifed.") : "subscriber_not_created" != e.response && (RH.response = Maitre.response = e.response, RH.optin_data = Maitre.optin_data =
                                e.data, RH.confirmation_links = e.confirmation_links, w || g.tools.storeSignupCookie(!0, config, RH), config.callbacks.hasOwnProperty("subscriberLoaded") && config.callbacks.subscriberLoaded(e.response, e.data), d && d(e.data));
                            r.session = !0;
                            g.tools.update_buttons_text(config, RH);
                        }, function (e) {
                            config.callbacks.hasOwnProperty("error") ? (console.error("[ReferralHero] Identify() error."), config.callbacks.error(a)) : alert_or_console(config.settings.alerts.server_problem)
                        })) : (r.session = !0, console.warn("[ReferralHero] Identify() did not execute because this subscriber has already been identified by cookie."))
                    } else console.error("[ReferralHero] Function is missing "+ config.settings.unique_identifier +".");
                    else console.warn("[ReferralHero] Function is missing required variable data.");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.methods.identify 202");
                    console.error("[ReferralHero] An unexpected error occurred in identify:", err);
                }
            },
            trackReferral: function (a, c, d, config, RH){
                try{
                    var f = "__maitre-conversion-" + config.uuid;
                    var nac = "";
                    var mac = "";
                    var ac = "";
                    var anonymous_visitor = RH.anonymous;
                    var arr = document.cookie.split('; ');
                    arr.forEach(function(element){
                        if(element.includes('anonymous') && !element.startsWith("__nps-anonymous-referral-code-") && !element.startsWith("__maitre-anonymous-referral-code-")){
                            anonymous_visitor = element.split('=')[1];
                            if (element.includes('maitre-anonymous')) {
                                mac = element.split('=')[0];
                            }else if(element.includes('nps-anonymous')){
                                nac = element.split('=')[0];
                            }
                        }else if (element.includes('anonymous-referral-code')) {
                            ac = element.split('=')[0];
                        }
                    })
                    var referrer_code = g.tools.getReferrerCode(RH);
                    config.settings.track_events ? a && 0 < a.trim().length ? (a = {
                            uuid: config.uuid,
                            url: window.location.href,
                            fingerprint: RH.fingerprint,
                            source: RH.source,
                            campaign: config.uuid,
                            sub_id: anonymous_visitor,
                            host: config.defaults.default_url,
                            referrer: referrer_code,
                            status: "registered",
                            [config.settings.unique_identifier]: a
                        }, "object" ===
                        typeof c && (a.name = c.name, a.conversion_value = c.value, a.transaction_id = c.transaction_id, a.conversion_category = c.category, a.product_id = c.product_id), g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/track_referral", "POST", a, function (e) {
                            "subscriber_created" == e.response || "subscriber_complete_event" == e.response || "subscriber_retrieved" == e.response ? (RH.referral_data = e.data, g.tools.createCookie(f, e.data.id, 3650, config, RH), (mac != "" && g.tools.createCookie(mac, e.data.id, 3650, config, RH)), (nac != "" && g.tools.createCookie(nac, e.data.id, 3650, config, RH)), (ac != "" && g.tools.createCookie(ac, e.data.code, 3650, config, RH)), console.info("[ReferralHero] Referral '" + e.data.id + "' tracked."), "function" === typeof c ? c(e.data) : "function" === typeof d && d(e.data)) : (e.message == "Referrer is not present" ? console.log("[ReferralHero] Referral Conversion Event not tracked because no referrer exists in the database or found in cookie.") : console.warn(e.message))
                        }, function (e) {
                            console.error(e)
                        })) :
                        console.error("[ReferralHero] Referral Conversion Event not tracked because the function is missing'"+ config.settings.unique_identifier +"'.") : console.error("[ReferralHero] Function did not execute because your campaign ‘Goal’ is not set up to track two or three conversion events");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.methods.trackReferral 246");
                    console.error("[ReferralHero] An unexpected error occurred in trackReferral:", err);
                }
            }, 
            organicTrackReferral: function (a, c, config, RH) {
                try{
                    var ui = config.settings.unique_identifier == 'email' ? a.email : config.settings.unique_identifier == 'phone_number' ? a.phone_number : 'crypto_wallet_address'
                    var f = "__maitre-conversion-" + config.uuid;
                    var d = "__maitre-session-" + config.uuid;
                    var nac = "";
                    var mac = "";
                    var ac = "";
                    var anonymous_visitor = RH.anonymous;
                    var arr = document.cookie.split('; ');
                    arr.forEach(function(element){
                        if(element.includes('anonymous') && !element.startsWith("__nps-anonymous-referral-code-") && !element.startsWith("__maitre-anonymous-referral-code-")){
                            anonymous_visitor = element.split('=')[1];
                            if (element.includes('maitre-anonymous')) {
                                mac = element.split('=')[0];
                            }else if(element.includes('nps-anonymous')){
                                nac = element.split('=')[0];
                            }
                        }else if (element.includes('anonymous-referral-code')) {
                            ac = element.split('=')[0];
                        }
                    });
                    var referrer_code = g.tools.getReferrerCode(RH);
                    ui && 0 < ui.trim().length ? (a = {
                            uuid: config.uuid,
                            url: window.location.href,
                            fingerprint: RH.fingerprint,
                            source: RH.source,
                            campaign: config.uuid,
                            sub_id: anonymous_visitor,
                            host: config.defaults.default_url,
                            referrer: referrer_code,
                            status: "registered",
                            name: a.name,
                            email: a.email,
                            phone_number: a.phone_number,
                            crypto_wallet_address: a.crypto_wallet_address,
                            extra_field: a.extra_field,
                            extra_field_2: a.extra_field_2,
                            extra_field_3: a.extra_field_3,
                            extra_field_4: a.extra_field_4,
                            option_field : a.option_field,
                            address: a.address,
                            terms_conditions: !0,
                            conversion_value: a.value,
                            transaction_id: a.transaction_id,
                            product_id: a.product_id,
                            conversion_category: a.category,
                            subscribe_page_url: window.location.href,
                            landing_page_url: window.location.href,
                            nps_ids: g.tools.npsCookie("__nps-anonymous-")
                        }, g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/organic_track_referral", "POST", a, function (e) {
                            "subscriber_created" == e.response || "subscriber_complete_event" == e.response || "subscriber_retrieved" == e.response ? (RH.referral_data = RH.optin_data = e.data, e.data.referred ? (g.tools.createCookie(f, e.data.id, 3650, config, RH), (mac != "" && g.tools.createCookie(mac, e.data.id, 3650, config, RH)), (nac != "" && g.tools.createCookie(nac, e.data.id, 3650, config, RH)), (ac != "" && g.tools.createCookie(ac, e.data.code, 3650, config, RH))) : (!g.tools.readCookie(c) && g.tools.eraseCookie(d, config, RH) ,g.tools.createCookie(d, e.data.id, 365, config, RH)), !e.data.referred && console.info("[ReferralHero] Organic Subscriber '" + e.data.id + "' tracked."), e.data.referred && console.info("[ReferralHero] Referral '" + e.data.id + "' tracked."), "function" === typeof c && c(e.data)) : (e.message == "Referrer is not present" ? console.log("[ReferralHero] Referral not created or tracked because no referrer exists in the database or found in cookie.") : e.response == "subscriber_not_verified" ? (console.log("[ReferralHero] Subscriber '" + e.data.id +"' is not verified"), (!g.tools.readCookie(c) && g.tools.eraseCookie(d, config, RH) ,g.tools.createCookie(d, e.data.id, 365, config, RH))) : console.warn(e.message))
                        }, function (e) {
                            console.error(e)
                        })) :
                        console.error("[ReferralHero] Referral Conversion Event not tracked because the function is missing'"+ config.settings.unique_identifier +"'.");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.methods.organicTrackReferral 308");
                    console.error("[ReferralHero] An unexpected error occurred in organicTrackReferral:", err);
                }
            },
            stripe_checkout: function (a, config, RH) {
                try{
                    var anonymous_visitor = g.tools.getAnonymousVisitorId(RH);
                    a ? g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/stripe_checkout", "POST", {
                            uuid: config.uuid,
                            url: window.location.href,
                            fingerprint: RH.fingerprint,
                            source: RH.source,
                            campaign: config.uuid,
                            host: config.defaults.default_url,
                            referrer: RH.referrer,
                            status: "registered",
                            checkout_id: a,
                            terms_conditions: !0,
                            sub_id: anonymous_visitor,
                            subscribe_page_url: window.location.href,
                            landing_page_url: window.location.href,
                            nps_ids: [anonymous_visitor]
                        }, function (e) {
                        if ( "subscriber_created" == e.response || "subscriber_retrieved" == e.response || "subscriber_complete_event" == e.response ){
                            console.log('success')
                        } 
                        else{
                            console.error(e.message);
                        }
                    }, function (e) {
                        console.error(e)
                    }) : console.error("[ReferralHero] Stripe checkout ID not present");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.methods.stripe_checkout 341");
                    console.error("[ReferralHero] An unexpected error occurred in stripe checkout:", err);
                }
            },
            pendingReferral: function (a, c, config, RH) {
                try{
                    var ui = config.settings.unique_identifier == 'email' ? a.email : config.settings.unique_identifier == 'phone_number' ? a.phone_number : 'crypto_wallet_address'
                    var f = "__maitre-conversion-" + config.uuid;
                    var anonymous_visitor = g.tools.getAnonymousVisitorId(RH);
                    var referrer_code = g.tools.getReferrerCode(RH);
                    config.settings.track_events ? ui && 0 < ui.trim().length ? (a = {
                            uuid: config.uuid,
                            url: window.location.href,
                            fingerprint: RH.fingerprint,
                            source: RH.source,
                            campaign: config.uuid,
                            host: config.defaults.default_url,
                            referrer: referrer_code,
                            status: "custom_event_pending",
                            name: a.name,
                            email: a.email,
                            phone_number: a.phone_number,
                            crypto_wallet_address: a.crypto_wallet_address,
                            extra_field: a.extra_field,
                            extra_field_2: a.extra_field_2,
                            extra_field_3: a.extra_field_3,
                            extra_field_4: a.extra_field_4,
                            option_field : a.option_field,
                            address: a.address,
                            terms_conditions: !0,
                            conversion_value: a.value,
                            transaction_id: a.transaction_id,
                            conversion_category: a.category,
                            sub_id: anonymous_visitor,
                            subscribe_page_url: window.location.href,
                            landing_page_url: window.location.href,
                            tags: a.tags
                        }, g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/pending_referral", "POST", a, function (e) {
                            "subscriber_created" == e.response || "subscriber_retrieved" == e.response ? (RH.referral_data = e.data, g.tools.createCookie(f, e.data.id, 3650, config, RH), console.info("[ReferralHero] Pending Referral '" + e.data.id + "' tracked."), "function" === typeof c ? c(e.data) : "function" === typeof d && d(e.data)) : (e.message == "[ReferralHero] Referral not created or tracked because no referrer exists in the database or found in cookie." ? console.log("[ReferralHero] Referral not created or tracked because no referrer exists in the database or found in cookie.") : console.warn(e.message))
                        }, function (e) {
                            console.error(e)
                        })) :
                        console.error("[ReferralHero] Function is missing '"+ config.settings.unique_identifier +"'.") : console.error("[ReferralHero] Function did not execute because your campaign ‘Goal’ is not set up to track two or three conversion events");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.methods.pendingReferral 385");
                    console.error("[ReferralHero] An unexpected error occurred in pending referral:", err);
                }
            },
            trackTransaction: function (a, config, RH) {
                try{
                    var ui = config.settings.unique_identifier
                    a ? g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/track_transaction", "POST", {
                        uuid: config.uuid,
                        amount: a.amount,
                        transaction_id: a.transaction_id,
                        lifetime_spend: a.lifetime_spend,
                        [config.settings.unique_identifier]: a[ui],
                        product_id: a.product_id
                    }, function (e) {
                        if (e.response == "transaction_created") {
                            console.log("success")
                        }else {
                            console.log(e.message)
                        }
                    }, function (e) {
                        console.error(e)
                    }) : console.error("[ReferralHero] Hash is not present.");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.methods.trackTransaction 409");
                    console.error("[ReferralHero] An unexpected error occurred in track transaction:", err);
                }
             
            }
        };

        g.add_script = function (cdn) {
            try{
                var a = mtg("script");
                a.setAttribute("type", "text/javascript");
                a.async = !0;
                a.setAttribute("src", cdn);
                (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(a);
                return a;
            }catch (err) {
                g.tools.sendErrorNotification(err, "g.add_script 418");
                console.error("[ReferralHero] An unexpected error occurred in method add_script:", err);
            } 
        }
        g.loadFingerPrint = function (RH) {
            try {
                if (typeof FingerprintJS !== 'undefined') {
                    FingerprintJS.load()
                        .then(fp => fp.get())
                        .then(result => {
                            RH.fingerprint = result.visitorId || "";
                            r.fingerprinting = true;
                        })
                        .catch(error => {
                            g.tools.sendErrorNotification(error, "g.loadFingerPrint modern 432");
                            console.error("[ReferralHero] An unexpected error occurred:", error);
                            r.fingerprinting = true;
                        });
                } else {
                    r.fingerprinting = true;
                }
            } catch (err) {
                g.tools.sendErrorNotification(err, "g.loadFingerPrint 440");
                console.error("[ReferralHero] An unexpected error occurred in method loadFingerPrint:", err);
            }
        };
        g.loadKakao = function (config) {
            try{
                if (config.settings.kakao_app_key) {
                    Kakao.init(config.settings.kakao_app_key);
                }
            }catch (err) {
                g.tools.sendErrorNotification(err, "g.loadKakao 446");
                console.error("[ReferralHero] An unexpected error occurred in method loadKakao:", err);
            }
        };
        g.loadReCaptcha = function (config, RH) {
            try{
                C =
                    !0;
                F = grecaptcha.render("RHCaptcha", {
                    sitekey: config.settings.recaptcha.public_key,
                    size: "invisible",
                    callback: function (a) {
                        G = a;
                        data = g.tools.getFormValues(null, RH);
                        g.form.submit(data, config, RH)
                    }
                });
                console.info("[ReferralHero] ReCaptcha has been added to the page.");
            }catch (err) {
                g.tools.sendErrorNotification(err, "g.loadReCaptcha 465");
                console.error("[ReferralHero] An unexpected error occurred in method loadRecaptcha:", err);
            }
        };
        g.loadFacebookPixel = function (config) {
            try{
                K = !0;
                fbq("init", config.settings.facebook_pixel.id);
                fbq("track", "PageView");
                console.info("[ReferralHero] Facebook Pixel has been added to the page.");
            }catch (err) {
                g.tools.sendErrorNotification(err, "g.loadFacebookPixel 476");
                console.error("[ReferralHero] An unexpected error occurred in method loadFacebookPixel:", err);
            }
        };

        g.helpers = {
            handleWalletError(walletName, err, context = '', extraIgnored = []) {
                const ignoredErrors = [
                    "User closed modal",
                    "User rejected",
                    "User rejected the request.",
                    ...extraIgnored
                ];

                if (!ignoredErrors.some(msg => err?.message?.includes(msg))) {
                    g.tools.sendErrorNotification(err, context);
                    console.error(`[ReferralHero] An unexpected error occurred in method connect${walletName}:`, err);
                } else {
                    console.warn(`[ReferralHero] ${walletName} closed/rejected by user:`, err.message);
                }
            }
        };

        g.libraries = {
            fp: function (RH) {
                try{
                    if (w) r.fingerprinting = !0; else if ("undefined" ===
                        typeof window.FingerprintJS) {
                            if(!global_config["enableFP"]){
                                global_config["enableFP"] = true
                                var a = g.add_script("https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@4.6.2/dist/fp.min.js")
                                a.readyState ? a.onreadystatechange = function () {
                                    "complete" != this.readyState && "loaded" != this.readyState || g.loadFingerPrint(RH)
                                } : (a.onload = g.loadFingerPrint(RH), a.onerror = function () {
                                    r.fingerprinting = !0
                                });
                            }else{
                                g.loadFingerPrint(RH)
                            }
                    } else g.loadFingerPrint(RH);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.libraries.fp 499");
                    console.error("[ReferralHero] An unexpected error occurred in method libraries fp:", err);
                }
            },

            qr: function () {
                g.add_script("https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js")
            },
            web3: function () {
                g.add_script("https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.4/web3.min.js")
            },
            wc: function () {
                g.add_script("https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider@1.7.1/dist/umd/index.min.js")
            },
            carousel: function () {
                g.add_script("https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js")
            },
            kakao_talk: function (config) {
                try{
                    if(!global_config["enableKakao"]){
                        global_config["enableKakao"] = true
                        var a = g.add_script("https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js");
                        a.setAttribute("crossorigin", "anonymous");
                        a.readyState ? a.onreadystatechange = function () {
                            "complete" != this.readyState && "loaded" != this.readyState || g.loadKakao(config)
                        } : (a.onload = g.loadKakao(config), a.onerror = function () {
                            r.fingerprinting = !0
                        });
                    }else{
                        g.loadKakao(config)
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.kakao_talk 530");
                    console.error("[ReferralHero] An unexpected error occurred in method kakao_talk:", err);
                }
            },
            auto_form_submission: function (config, RH) {
                try{
                    console.log("[ReferralHero] Auto form submission enabled.");
                    if(config.settings.enable_form_submission){
                        console.log("[ReferralHero] Auto form submission triggered.")
                            setTimeout(function() {
                                const jsonStringArray = config.settings.form_ids;
                                const parsedArray = jsonStringArray.map(jsonString => JSON.parse(jsonString));
                                console.log(parsedArray)

                                function getField(formData, pattern) {
                                    var field = {};
                                    formData.forEach(function(value, key) {
                                    if (key.toLowerCase().includes(pattern)) {
                                        field[pattern] = value;
                                    }
                                    });
                                    return field;
                                }
                                parsedArray.forEach(obj => {
                                    for (const key in obj) {
                                        if (obj.hasOwnProperty(key)) {
                                            const value = obj[key];
                                            var forms = document.querySelectorAll(`form[${key}="${value}"]`);
                                            var iframes = document.querySelectorAll('iframe');
                                            if (iframes.length > 0) {
                                                iframes.forEach(function (iframe) {
                                                    try{
                                                    var iframeDoc = iframe.contentWindow.document;
                                                    } catch (e) {}
                                                    
                                                    if (iframeDoc) {
                                                        var iframeForms = iframeDoc.querySelectorAll(`form[${key}="${value}"]`);
                                                        forms = Array.from(forms).concat(Array.from(iframeForms));
                                                    }
                                                })
                                            }
                                            forms.forEach(form => {
                                                console.log(form)
                                                if (form.id == 'mtr-form') {
                                                    return;
                                                }
                                                console.log(config.settings)
                                                form.addEventListener("submit", function (event) {
                                                    const form = event.target;

                                                    if (form) {
                                                        const formData = new FormData(form);
                                                        var ui = config.settings.unique_identifier;
                                                        var name_data = getField(formData, 'name');
                                                        var ui_data = getField(formData, ui);

                                                        var data = {
                                                            name: name_data.name,
                                                        }
                                                        data[ui] = ui_data[ui]; 
                                                        console.log(data)                                            
                                                        if(RH && data[ui]){
                                                            console.log("Submitting..")
                                                            if(config.settings.form_action == 'submit'){
                                                                g.form.submit(data, config, RH);
                                                                console.log("Submitted")
                                                            }else if(config.settings.form_action == 'pending'){
                                                                if(RH.referrer && !config.settings.track_events){
                                                                    g.form.submit(data, config, RH);
                                                                }else{
                                                                    RH.pendingReferral(data); 
                                                                }
                                                            }
                                                            
                                                        }
                                                    }
                                                });
                                            });
                                        }
                                    }
                                });
                            }, 3000);
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.auto_form_submission 614");
                    console.error("[ReferralHero] An unexpected error occurred in method auto_form_submission:", err);
                }
            }, 
            facebook_pixel: function (config) {
                try{
                    if ("undefined" === typeof window.fbq) {
                        if (!window.fbq) {
                            var a = window.fbq = function () {
                                a.callMethod ? a.callMethod.apply(a, arguments) : a.queue.push(arguments)
                            };
                            window._fbq || (window._fbq = a, a.push = a, a.loaded = !0, a.version = "2.0");
                            a.queue = [];
                            g.add_script("https://connect.facebook.net/en_US/fbevents.js")
                            var d = setInterval(function () {
                                var f = !1;
                                try {
                                    f = "undefined" !== typeof fbq
                                } catch (e) {
                                    console.log("[ReferralHero] Error while loading Facebook Pixel ", e)
                                }
                                f && (clearInterval(d), g.loadFacebookPixel(config))
                            }, 100)
                        }
                    } else g.loadFacebookPixel(config);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.libs.facebook_pixel 640");
                    console.error("[ReferralHero] An unexpected error occurred in method auto_form_submission:", err);
                }
            }, 
            recaptcha: function (config, RH) {
                try{
                    if ("undefined" === typeof __google_recaptcha_client) {
                        var a = mtg("script");
                        a.setAttribute("type", "text/javascript");
                        a.async = !0;
                        a.setAttribute("src", "https://www.google.com/recaptcha/api.js?render=explicit");
                        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(a);
                        var c = setInterval(function () {
                            var d = !1;
                            try {
                                d = "undefined" !== typeof grecaptcha && "function" == typeof grecaptcha.render
                            } catch (f) {
                                console.log("Error while loading ReCaptcha ",
                                    f)
                            }
                            d && (clearInterval(c), g.loadReCaptcha(config, RH))
                        }, 100)
                    } else { 
                        g.loadReCaptcha(config, RH)
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.libs.recaptcha 666");
                    console.error("[ReferralHero] An unexpected error occurred in method recaptcha:", err);
                }
            }
        };

        g.tools = {
            getOriginalHost: function () {
                try{
                    return window.location != window.parent.location ? document.referrer : window.location.href;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.getOriginalHost 677");
                    console.error("[ReferralHero] An unexpected error occurred in method getOriginalHost:", err);
                }
            }, getDefaultUrl: function (a) {
                try{
                    return a.default_url && "" != a.default_url.trim() ? a.default_url : this.getOriginalHost().split("?")[0];
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.getDefaultUrl 684");
                    console.error("[ReferralHero] An unexpected error occurred in method getDefaultUrl:", err);
                }
            }, getWidgetUrl: function (config) {
                try{
                    return b.base_url + "/widget/" + config.uuid;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.getWidgetUrl 691");
                    console.error("[ReferralHero] An unexpected error occurred in method getWidgetUrl:", err);
                }
            }, getReferrer: function (config, RH) {
                try{
                    this.readCookie("__maitre-referrer-" + config.uuid);
                    var a = "__maitre-referrer-" + config.uuid, rn = "__maitre-referrer-name-" + config.uuid, c = this.readCookie(a); rnc = this.readCookie(rn);
                    var anonymous_visitor = g.tools.checkAnonymousVisitor();   
                    var sc_name = "__maitre-session-" + config.uuid;
                    var session_cookie = this.readCookie(sc_name);
                    if (c && (c == this.getParams("mwr") || (c != this.getParams("mwr") && anonymous_visitor == this.getParams("mwr")) || (this.getParams("mwr")) == undefined)) RH.referrer = c, RH.referrer_name = rnc, RH.advocate_first_name = g.tools.fetch_complete_name(rnc)[0], RH.advocate_last_name = g.tools.fetch_complete_name(rnc)[1], r.referrer = !0; else {
                        var d = this.getParams("mwr");
                        r.referrer = !0;
                        d && d != RH.anonymous ? g.tools.asyncRequest.request(this.getWidgetUrl(config) + "/check_referral_code", "POST", {
                            uuid: config.uuid,
                            ref_code: d
                        }, function (f) {
                            if(session_cookie == null || (session_cookie != null && session_cookie != f.referrer_sub_id)){
                                if ((c == null || f.referrer_cookie_override == "last_touch" && "ok" == f.response && f.referrer_status != "anonymous") && f.verified) {
                                    if(!config.settings.allow_organic_traffic_tracking){  
                                        RH.referrer = d;
                                        RH.referrer_name = f.referrer_name;
                                        RH.advocate_first_name = f.advocate_first_name;
                                        RH.advocate_last_name = f.advocate_last_name;
                                        g.tools.createCookie(a, d, 90, config, RH);
                                        g.tools.createCookie(rn, f.referrer_name, 90, config, RH);
                                        var referrer_name_val = g.tools.get_referrer_name(RH, config)
                                        if (referrer_name_val) {
                                            var elements = document.querySelectorAll('.text-field, .mtr-text-field');
                                            elements.forEach(function(element) {
                                                element.innerHTML = element.innerHTML.replace(/<span class="mtr-hide">(%referrer_name%)<\/span>/g, referrer_name_val || '').replace(/<span class="mtr-hide">(%advocate_first_name%)<\/span>/g, RH.advocate_first_name || g.tools.fetch_complete_name(referrer_name_val)[0] || '').replace(/<span class="mtr-hide">(%advocate_last_name%)<\/span>/g, RH.advocate_last_name || g.tools.fetch_complete_name(referrer_name_val)[1] || '');
                                            });
                                        }
                                    }else{
                                        RH.referrer = d;
                                        RH.referrer_name = f.referrer_name;
                                        RH.advocate_first_name = f.advocate_first_name;
                                        RH.advocate_last_name = f.advocate_last_name;
                                        g.tools.createCookie(a, d, 90, config, RH);
                                        g.tools.createCookie(rn, f.referrer_name, 90, config, RH);
                                        if(f.anonymous){
                                            g.tools.getAnonymous(config, RH);
                                        }
                                    }
                                }else if ((f.referrer_cookie_override == "last_touch" && "ok" == f.response && f.referrer_status == "anonymous") && f.verified){
                                    RH.referrer = c;
                                    RH.referrer_name = rnc;
                                    RH.advocate_first_name = f.advocate_first_name;
                                    RH.advocate_last_name = f.advocate_last_name;
                                }
                                else if ((f.referrer_cookie_override == "first_touch" && "ok" == f.response) && f.verified){
                                    RH.referrer = c;
                                    RH.referrer_name = g.tools.readCookie("__maitre-referrer-name-"+ config.uuid);
                                    RH.advocate_first_name = f.advocate_first_name;
                                    RH.advocate_last_name = f.advocate_last_name;
                                    var referrer_name_val = g.tools.get_referrer_name(RH, config)
                                    if (referrer_name_val) {
                                        var elements = document.querySelectorAll('.text-field, .mtr-text-field');
                                        elements.forEach(function(element) {
                                            element.innerHTML = element.innerHTML.replace(/<span class="mtr-hide">(%referrer_name%)<\/span>/g, referrer_name_val || '').replace(/<span class="mtr-hide">(%advocate_first_name%)<\/span>/g, RH.advocate_first_name || g.tools.fetch_complete_name(referrer_name_val)[0] || '').replace(/<span class="mtr-hide">(%advocate_last_name%)<\/span>/g, RH.advocate_last_name || g.tools.fetch_complete_name(referrer_name_val)[1] || '');
                                        });
                                    }
                                }
                                else if ("error" == f.response && f.message == "Subscriber doesn't exist") {
                                    // console.log("Subscriber doesn't exist");
                                }
                            }
                            r.referrer = !0
                        }, function (f) {
                            console.error(f)
                        }) : r.referrer = !0
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getReferrer 764");
                    console.error("[ReferralHero] An unexpected error occurred in method get referrer:", err);
                }
            },getReferrerGlobal: function (config, RH) {
                try{
                    var a = "__maitre-referrer-global", rn = "__maitre-referrer-name-global", c = this.readCookie(a); rnc = this.readCookie(rn);
                    var anonymous_visitor = g.tools.checkAnonymousVisitor();   
                    var sc_name = "__maitre-session-" + config.uuid;
                    var session_cookie = this.readCookie(sc_name);
                    if (c && (c == this.getParams("mwr") || (c != this.getParams("mwr") && anonymous_visitor == this.getParams("mwr")) || (this.getParams("mwr")) == undefined)){ 
                        RH.referrer = c; 
                        RH.referrer_name = rnc; 
                        RH.advocate_first_name = g.tools.fetch_complete_name(rnc)[0]; 
                        RH.advocate_last_name = g.tools.fetch_complete_name(rnc)[1];
                        r.referrer = !0; 
                        var referrer_name_val = g.tools.get_referrer_name(RH, config)
                        if (referrer_name_val) {
                            var elements = document.querySelectorAll('.text-field, .mtr-text-field');
                            elements.forEach(function(element) {
                                element.innerHTML = element.innerHTML.replace(/<span class="mtr-hide">(%referrer_name%)<\/span>/g, referrer_name_val || '').replace(/<span class="mtr-hide">(%advocate_first_name%)<\/span>/g, RH.advocate_first_name || g.tools.fetch_complete_name(referrer_name_val)[0] || '').replace(/<span class="mtr-hide">(%advocate_last_name%)<\/span>/g, RH.advocate_last_name || g.tools.fetch_complete_name(referrer_name_val)[1] || '');
                            });
                        }
                    }else {
                        var d = this.getParams("mwr");
                        r.referrer = !0;
                        d && d != RH.anonymous ? g.tools.asyncRequest.request(this.getWidgetUrl(config) + "/check_referral_code", "POST", {
                            uuid: config.uuid,
                            ref_code: d
                        }, function (f) {
                            if(session_cookie == null || (session_cookie != null && session_cookie != f.referrer_sub_id)){
                                if ("ok" == f.response && f.verified && (c == null || f.referrer_cookie_override == "last_touch")) {
                                    if(!config.settings.allow_organic_traffic_tracking){  
                                        RH.referrer = d;
                                        RH.referrer_name = f.referrer_name;
                                        RH.advocate_first_name = f.advocate_first_name;
                                        RH.advocate_last_name = f.advocate_last_name;
                                        g.tools.createCookie(a, d, 90, config, RH);
                                        g.tools.createCookie(rn, f.referrer_name, 90, config, RH);
                                        g.tools.createCookie("__maitre-campaign-referrer-global", config.uuid, 90, config, RH);
                                        var referrer_name_val = g.tools.get_referrer_name(RH, config)
                                        if (referrer_name_val) {
                                            var elements = document.querySelectorAll('.text-field, .mtr-text-field');
                                            elements.forEach(function(element) {
                                                element.innerHTML = element.innerHTML.replace(/<span class="mtr-hide">(%referrer_name%)<\/span>/g, referrer_name_val || '').replace(/<span class="mtr-hide">(%advocate_first_name%)<\/span>/g, RH.advocate_first_name || g.tools.fetch_complete_name(referrer_name_val)[0] || '').replace(/<span class="mtr-hide">(%advocate_last_name%)<\/span>/g, RH.advocate_last_name || g.tools.fetch_complete_name(referrer_name_val)[1] || '');
                                            });
                                        }
                                    }else{
                                        RH.referrer = d;
                                        RH.referrer_name = f.referrer_name;
                                        RH.advocate_first_name = f.advocate_first_name;
                                        RH.advocate_last_name = f.advocate_last_name;
                                        g.tools.createCookie(a, d, 90, config, RH);
                                        g.tools.createCookie(rn, f.referrer_name, 90, config, RH);
                                        g.tools.createCookie("__maitre-campaign-referrer-global", config.uuid, 90, config, RH);
                                        if(f.anonymous){
                                            g.tools.getAnonymous(config, RH);
                                        }
                                    }
                                }else if ((f.referrer_cookie_override == "first_touch" && "ok" == f.response) && f.verified){
                                    RH.referrer = c;
                                    var referrer_name_val = g.tools.get_referrer_name(RH, config);
                                    RH.referrer_name = referrer_name_val;
                                    var ref_complete_name = g.tools.fetch_complete_name(RH.referrer_name);
                                    RH.advocate_first_name = ref_complete_name[0];
                                    RH.advocate_last_name = ref_complete_name[1];
                                    if (referrer_name_val) {
                                        var elements = document.querySelectorAll('.text-field, .mtr-text-field');
                                        elements.forEach(function(element) {
                                            element.innerHTML = element.innerHTML.replace(/<span class="mtr-hide">(%referrer_name%)<\/span>/g, referrer_name_val || '').replace(/<span class="mtr-hide">(%advocate_first_name%)<\/span>/g, RH.advocate_first_name || g.tools.fetch_complete_name(referrer_name_val)[0] || '').replace(/<span class="mtr-hide">(%advocate_last_name%)<\/span>/g, RH.advocate_last_name || g.tools.fetch_complete_name(referrer_name_val)[1] || '');
                                        });
                                    }
                                }
                                else if ("error" == f.response && f.message == "Subscriber doesn't exist") {
                                    // console.log("Subscriber doesn't exist");
                                }
                            }
                            r.referrer = !0
                        }, function (f) {
                            console.error(f)
                        }) : r.referrer = !0
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getReferrer 846");
                    console.error("[ReferralHero] An unexpected error occurred in method get referrer global:", err);
                }
            }, getAnonymous: function (config, RH) {
                try{
                    if(config.settings.nps_widget.enabled){
                        return false
                    }
                    var a = config.settings.allow_organic_traffic_tracking ? "__nps-anonymous-" + config.uuid : "__maitre-anonymous-" + config.uuid, c = g.tools.readCookie(a);
                    RH.anonymous = c ? c : '';
                    setTimeout( function(){
                        // g.tools.readCookie("__maitre-anonymous-" + config.uuid);
                        var rh = "__maitre-referrer-" + config.uuid, ref = g.tools.readCookie(rh);
                        var ref_global = g.tools.readCookie("__maitre-referrer-global");
                        var a = config.settings.allow_organic_traffic_tracking ? "__nps-anonymous-" + config.uuid : "__maitre-anonymous-" + config.uuid, c = g.tools.readCookie(a);
                        var anonymous_code = config.settings.allow_organic_traffic_tracking ? "__nps-anonymous-referral-code-" + config.uuid : "__maitre-anonymous-referral-code-" + config.uuid, anonymous_code_val = g.tools.readCookie(anonymous_code);
                    //    if (c) RH.anonymous = c, r.anonymous = !0; else {
                            var d = ref_global || ref || g.tools.getParams("mwr");
                            ( !RH_JM ) ? g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/check_anonymous_link", "POST", {
                                uuid: config.uuid,
                                host: config.defaults.default_url,
                                landing_page_url: window.location.href,
                                visit_page: window.location.href,
                                referrer: d,
                                source: RH.source,
                                sub_id: c ? c : '',
                                visitor_ids: g.tools.npsCookie("__maitre-anonymous-").length ? g.tools.npsCookie("__maitre-anonymous-") : g.tools.npsCookie("__nps-anonymous-"),
                                referrer_page: document.referrer,
                                hubspot_utk_cookie: g.tools.readCookie("hubspotutk")
                            }, function (f) {
                                if ("list_not_match" == f.response) {
                                }else if ( "ok" == f.response && f.data.response == 'subscriber_created' ){
                                c = f.data.data.id
                                anonymous_code_val = f.data.data.code
                                RH.anonymous = c, g.tools.createCookie(a, c, 90, config, RH)
                                RH.anonymous_referral_code = anonymous_code_val, g.tools.createCookie(anonymous_code, anonymous_code_val, 90, config, RH);
                                config.settings.horizontal_banner.show && g.generate.horizontal_banner(config, RH);
                                if(!g.tools.sessionPresent()){
                                    g.tools.applyMWR(f.data.data.code, config);
                                }
                                if(!global_config["updateVisitScheduled"]){
                                    setTimeout(function(){g.tools.update_visit_duration(config, RH)}, 5000)
                                }
                                } 
                                else if("ok" == f.response && f.data.response == 'anonymous_subscriber_retrieved'){
                                RH.anonymous = f.data.sub_id;
                                RH.anonymous_referral_code = anonymous_code_val;
                                if(c == null) {g.tools.createCookie(a, f.data.sub_id, 90, config, RH);}
                                config.settings.horizontal_banner.show && g.generate.horizontal_banner(config, RH);
                                if(!g.tools.sessionPresent()){
                                    g.tools.applyMWR(f.data.code, config);
                                }
                                console.log('[ReferralHero] Active visitor retrieved');
                                if(!global_config["updateVisitScheduled"]){
                                    setTimeout(function(){g.tools.update_visit_duration(config, RH)}, 5000)
                                }
                                }
                                else{
                                // console.error(f.message);
                                }
                                r.anonymous = !0
                            }, function (f) {
                                console.error(f)
                            }) : r.anonymous = !0
                    // }
                    }, config.settings.allow_organic_traffic_tracking ? 5000 : 2000);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getAnonymous 913");
                    console.error("[ReferralHero] An unexpected error occurred in method get anonymous:", err);
                }
            }, getVisits: function (config, RH) {
                try{
                    setTimeout( function(){
                        g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/check_nps_visit", "POST", {
                            uuid: config.uuid,
                            host: config.defaults.default_url,
                            landing_page_url: window.location.href,
                            visit_page: window.location.href,
                            source: RH.source,
                            visitor_ids: g.tools.npsCookie("__maitre-anonymous-").length ? g.tools.npsCookie("__maitre-anonymous-") : g.tools.npsCookie("__nps-anonymous-"),
                            sub_ids: g.tools.npsCookie("__maitre-session-"),
                        }, function (z) {
                            console.log("[ReferralHero] NPS widget tracked.")
                        }, function (z) {
                            console.error("[ReferralHero] Error while tracking NPS widget")
                        });
                    }, 2000);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getVisits 934");
                    console.error("[ReferralHero] An unexpected error occurred in method get visits:", err);
                }
            }, getSource: function (config, RH) {
                try{
                    var a = this.readCookie("__maitre-source-" + config.uuid);
                    if (a) r.source = !0, RH.source = a; else {
                        var c = !0;
                        a = "__maitre-source-" + config.uuid;
                        var d = this.readCookie(a), f = this.getParams("source"),
                            e = this.getParams("mws"), k = this.getParams("utm_source");
                        if (d) RH.source = d; else {
                            
                            if (config.defaults.source && "" != config.defaults.source.trim()) var h = config.defaults.source; else f ? h = f : e ? h = e : k ? h = k : document.referrer && (h = document.createElement("a"), h.href = document.referrer, h = h.hostname, -1 < h.indexOf("facebook.com") ? h = "facebook" : -1 < h.indexOf("messenger.com") ? h = "facebook_messenger" : -1 < h.indexOf("twitter.com") || -1 < h.indexOf("t.co") ? h = "twitter" : -1 < h.indexOf("telegram.org") ? h = "telegram" : -1 < h.indexOf("linkedin.com") ?
                                h = "linkedin" : -1 < h.indexOf("gmail.com") || -1 < h.indexOf("mail.google.com") || -1 < h.indexOf("yahoo.com") || -1 < h.indexOf("outlook.com") || -1 < h.indexOf("outlook.live.com") ? h = "email" : -1 < h.indexOf("google") ? h = "google" : -1 < h.indexOf("referralhero.com") && (h = ""), c = !1);
                            RH.source = void 0 == h ? "" : h;
                            h && c && g.tools.createCookie(a, h, 90, config, RH)
                        }
                        r.source = !0
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getSource 955");
                    console.error("[ReferralHero] An unexpected error occurred in method get source:", err);
                }
            }, getCampaign: function (config, RH) {
                try{
                    var a = this.readCookie("__maitre-campaign-" + config.uuid);
                    if (a) r.campaign = !0, config.uuid = a; else {
                        var c;
                        a = "__maitre-campaign-" + config.uuid;
                        var d = this.readCookie(a), f =
                            this.getParams("campaign"), e = this.getParams("mwc"), k = this.getParams("utm_campaign");
                        d ? config.uuid = d : (config.defaults.campaign && "" != config.defaults.campaign.trim() ? c = config.defaults.campaign : f ? c = f : e ? c = e : k && (c = k), config.uuid = void 0 == c ? "" : c, c && g.tools.createCookie(a, c, 90, config, RH));
                        r.campaign = !0
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getCampaign 970");
                    console.error("[ReferralHero] An unexpected error occurred in method getCampaign:", err);
                }
            }, getSessionCookie: function (a, config, RH, visited_page = !0) {
                try{
                    if (true) {
                        if (!r.session_cookie) {
                            var c = g.tools.readCookie("__maitre-session-" + config.uuid);
                            c && g.tools.asyncRequest.request(this.getWidgetUrl(config) + "/check_subscriber", "POST", {
                                uuid: config.uuid, sub_id: c, 
                                dashboard_widget: (mtid(config.defaults.form_container_id) || mtid(config.defaults.form_container_id_two)) ? !0 : !1,
                                horizontal_banner: config.settings.horizontal_banner.show,
                                signup_widget: mtid(config.defaults.signup_form_container_id) ? !0 : !1,
                                visit_page: window.location.href,
                                require_leaderboard: config.settings.sharing.leaderboard.show,
                                visited_page: visited_page
                            }, function (d) {
                                "error" != d.response ? (RH.optin_data = Maitre.optin_data = d.data, RH.response = Maitre.response = d.response, RH.confirmation_links = d.confirmation_links, a && g.sharing.open(config, RH), g.tools.applyMWR(d.data.code, config), config.settings.horizontal_banner.show && g.generate.horizontal_banner(config, RH), config.callbacks.hasOwnProperty("subscriberLoaded") && config.callbacks.subscriberLoaded(d.response, d.data), g.tools.trackVisitUrl(c, config, RH)) : "error" == d.response && g.tools.eraseCookie("__maitre-session-" + config.uuid, config, RH), mtid("mtr-optin-form") && (mtid("mtr-optin-form").style.display = "block");
                            }, function (d) {
                                console.error(d)
                            })
                        }
                    } else setTimeout(this.getSessionCookie, 50);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getSessionCookie 994");
                    console.error("[ReferralHero] An unexpected error occurred in method get session cookie:", err);
                }
            }, trackVisitUrl: function (c, config, RH){
                try{
                    if (config.settings.enable_visit_url && window.location.href.split('?')[0] == config.settings.track_visit_url) {
                        RH_JM = 1;
                        var f = "__maitre-conversion-" + config.uuid;
                        var a = {
                            uuid: config.uuid,
                            url: window.location.href,
                            fingerprint: RH.fingerprint,
                            source: RH.source,
                            campaign: RH.campaign,
                            host: config.defaults.default_url,
                            referrer: RH.referrer,
                            sub_id: RH.optin_data.id,
                            status: "registered",
                        }
                        g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/track_referral", "POST", a, function (e) {
                            "subscriber_created" == e.response || "subscriber_complete_event" == e.response || "subscriber_retrieved" == e.response ? (RH.referral_data = e.data, g.tools.createCookie(f, e.data.id, 3650, config, RH), console.info("[ReferralHero] Referral '" + e.data.id + "' tracked.")) : (e.message == "[ReferralHero] Referral Conversion Event not tracked because no referrer exists in the database or found in cookie" ? console.log("[ReferralHero] Referral Conversion Event not tracked because no referrer exists in the database or found in cookie.") : console.warn(e.message))
                        }, function (e) {
                            console.error(e)
                        })
                                
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.trackVisitUrl 1021");
                    console.error("[ReferralHero] An unexpected error occurred in method track visit url:", err);
                }
            }, getIdentity: function (config, RH) {
                try{
                    var a = b.queue.filter(function (c) { return "identify" == c[0] });
                    0 < a.length ? g.methods.identify(a[0][1], a[0][2], null, config, RH) : r.session = !0;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getIdentity 1029");
                    console.error("[ReferralHero] An unexpected error occurred in method getIdentity:", err);
                }
            }, getParams: function (a) {
                try{
                    var c = {};
                    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (d, f, e) {
                        var key, value;
                        try {
                            key = decodeURIComponent(f);
                        } catch (e1) {
                            key = f;
                        }
                        try {
                            value = decodeURIComponent(e);
                        } catch (e2) {
                            value = e;
                        }
                        c[key] = value;
                        return d;
                    });
                    return a ? c[a] : c;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getParams 1040");
                    console.error("[ReferralHero] An unexpected error occurred in method getParams:", err);
                }
            }, verify_tracking_code: function (config) {
                try{
                    var a = mtg("div");
                    a.id = "mtr-popup-verify-container";
                    var c = mtg("div");
                    c.classList = "mtr-popup-verify-close";
                    c.innerText = "\u00d7";
                    c.addEventListener("click", function (f) {
                        f.preventDefault();
                        a.remove()
                    });
                    a.appendChild(c);
                    c = mtg("div");
                    c.classList = "mtr-popup-verify-status";
                    a.appendChild(c);
                    c = mtg("div");
                    c.classList = "mtr-popup-verify-text-container";
                    var d = mtg("div");
                    d.innerText = "ReferralHero installation verified.";
                    d.classList = "mtr-header-3";
                    c.appendChild(d);
                    d = mtg("div");
                    d.innerText = config.settings.nps_widget.enabled ? "The ReferralHero NPS tracking code has been properly installed on this page." : "The ReferralHero tracking code has been properly installed on this page.";
                    d.classList = "mtr-p-tag"
                    c.appendChild(d);
                    a.appendChild(c);
                    document.getElementsByTagName("body")[0].appendChild(a);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.verify_tracking_code 1071");
                    console.error("[ReferralHero] An unexpected error occurred in method verify_tracking_code:", err);
                }
            }, getFormValues: function (a, RH) {
                try{
                    var c = a ? a : mtid("mtr-optin-form");
                    a = c.querySelector("[name='email']");
                    var d = c.querySelector("[name='name']"), f = c.querySelector("[name='extra_field']"),
                    e = c.querySelector("[name='extra_field_2']"), eee = c.querySelector("[name='extra_field_3']"), eeee = c.querySelector("[name='extra_field_4']"), cc = c.querySelector("[name='country_code']"), o= c.querySelector("[name='phone_number']"), l = c.querySelector("[name='crypto_wallet_address']"), z = c.querySelector("[name='crypto_wallet_provider']"), s = c.querySelector("[name='other_identifier']"), x = c.querySelector("[name='option_field']"), dd = c.querySelector("[name='address']");
                    var j = c.querySelector("[name='is_sharing_optin_form'");
                    var t = c.querySelector("[name='tags_field']");
                    c = c.querySelector("[name='terms']");
                    return {
                        name: d ? d.value : null,
                        email: a ? a.value : null,
                        phone_number: o ? (cc.value + o.value?.replace(/\s/g, '')) : null,
                        crypto_wallet_address: l ? l.value : null,
                        crypto_wallet_provider: z ? z.value : null,
                        other_identifier_value: s ? s.value : null,
                        extra_field: f ? f.value : null,
                        extra_field_2: e ? e.value : null,
                        extra_field_3: eee ? eee.value : null,
                        extra_field_4: eeee ? eeee.value : null,
                        option_field: x ? x.value : null,
                        address: dd ? dd.value : null,
                        is_sharing_optin_form: j ? j.value : false,
                        terms: c ? c.checked : null,
                        sub_id: "",
                        subscribe_page_url: window.location.href,
                        landing_page_url: window.location.href,
                        tags: t ? [t.value] : null,
                    };
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getFormValues 1104");
                    console.error("[ReferralHero] An unexpected error occurred in method getFormValues:", err);
                }
            }, createCookie: function (a, c, d, config, RH) {
                try{
                    var f = new Date;
                    var d = config.settings.cookie_window;
                    f.setTime(f.getTime() + 864E5 * d);
                    dm = window.location.host.match('localhost:') ? "localhost" : window.location.host.replace('www.', '')
                    if (config.settings.allow_subdomain_cookie){
                    var subdomain = dm.split('.')[0];
                    var rootDomain = dm.split('.').slice(-2).join('.');
                    dm = dm.replace(`${subdomain}.${rootDomain}`, rootDomain);
                    }
                    d = "; expires=" + f.toUTCString();
                    document.cookie = a + "=" + c + d + "; domain=" + dm + "; SameSite=None; Secure; path=/"
                    if (a.includes("session")){
                        d = "__maitre-anonymous-" + config.uuid;
                        g.tools.eraseCookie(d, config, RH);
                        RH.anonymous = c, g.tools.createCookie(d, c, 90, config, RH)
                        if(RH.optin_data){
                            g.tools.applyMWR(RH.optin_data.code, config);
                        }
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.createCookie 1127");
                    console.error("[ReferralHero] An unexpected error occurred in method createCookie:", err);
                }
            }, createNpsCookie: function (name, value, expireString, config) {
                try{
                    var expires = "";
                    if (expireString) {
                      var intervalParts = expireString.split(' ');
                      var count = parseInt(intervalParts[0]);
                      var unit = intervalParts[1];

                      var date = new Date();

                      // Convert the count based on the unit to milliseconds
                      switch (unit) {
                        case 'days':
                          date.setTime(date.getTime() + count * 24 * 60 * 60 * 1000);
                          break;
                        case 'hours':
                          date.setTime(date.getTime() + count * 60 * 60 * 1000);
                          break;
                        case 'minutes':
                            date.setTime(date.getTime() + count * 60 * 1000);
                            break;
                        case 'months':
                          date.setMonth(date.getMonth() + count);
                          break;
                        // Add more cases as needed

                        default:
                          // Default to days if the unit is not recognized
                          date.setTime(date.getTime() + count * 24 * 60 * 60 * 1000);
                          break;
                      }

                      expires = "; expires=" + date.toUTCString();
                    }

                    var dm = window.location.host.match('localhost:') ? "localhost" : window.location.host.replace('www.', '');
                    if (config.settings.allow_subdomain_cookie) {
                      var subdomain = dm.split('.')[0];
                      var rootDomain = dm.split('.').slice(-2).join('.');
                      dm = dm.replace(`${subdomain}.${rootDomain}`, rootDomain);
                    }

                    document.cookie = name + "=" + value + expires + "; domain=" + dm +
                      "; SameSite=None; Secure; path=/";
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.createNpsCookie 1175");
                    console.error("[ReferralHero] An unexpected error occurred in method createNpsCookie:", err);
                }
            }, parseInterval: function(interval) {
                try{
                    var parts = interval.split(' ');
                    var value = parseInt(parts[0]);
                    var unit = parts[1].toLowerCase();

                    switch (unit) {
                        case 'days':
                        return value * 24 * 60 * 60 * 1000;
                        case 'hours':
                        return value * 60 * 60 * 1000;
                        case 'minutes':
                        return value * 60 * 1000;
                        case 'months':
                        // Note: This is an approximation, not considering varying days in a month
                        return value * 30 * 24 * 60 * 60 * 1000;
                        default:
                        return 0; // Unknown unit
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.parseInterval 1198");
                    console.error("[ReferralHero] An unexpected error occurred in method parseInterval:", err);
                }
            }, isDisplaySecond: function() {
                try{
                    const urlParams = new URLSearchParams(window.location.search);
                    return urlParams.get('second') === 'true';
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.isDisplaySecond 1206");
                    console.error("[ReferralHero] An unexpected error occurred in method isDisplaySecond:", err);
                }
            }, readCookie: function (a) {
                try{
                    if (document.cookie == undefined) {
                        return null; // no cookies available
                    }
                    a += "=";
                    for (var c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                        for (var f = c[d]; " " == f.charAt(0);) f = f.substring(1, f.length);
                        if (0 == f.indexOf(a)) return f.substring(a.length, f.length)
                    }
                    return null;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.readCookie 1218");
                    console.error("[ReferralHero] An unexpected error occurred in method readCookie:", err);
                }
            }, npsCookie: function (prefix) {
                try{
                    var matchingValues = [];

                    document.cookie.split(";").forEach(function (cookie) {
                        var trimmedCookie = cookie.trim();

                        if (trimmedCookie.startsWith(prefix)) {
                            var value = trimmedCookie.split('=')[1];
                            matchingValues.push(value);
                        }
                    });

                    return matchingValues;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.npsCookie 1236");
                    console.error("[ReferralHero] An unexpected error occurred in method npsCookie:", err);
                }
            }, referrerCookie: function (prefix) {
                try{
                    var cookies = document.cookie.split(";");
                
                    for (var i = 0; i < cookies.length; i++) {
                        var trimmedCookie = cookies[i].trim();
                
                        if (trimmedCookie.startsWith(prefix)) {
                            return trimmedCookie.split("=")[1]; 
                        }
                    }
                
                    return null;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.referrerCookie 1253");
                    console.error("[ReferralHero] An unexpected error occurred in method referrerCookie:", err);
                }
			},eraseCookie: function (a, config, RH) {
                try{
                    this.createCookie(a, "", -1, config, RH);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.eraseCookie 1260");
                    console.error("[ReferralHero] An unexpected error occurred in method eraseCookie:", err);
                }
            }, storeSignupCookie: function (a, config, RH) {
                try{
                    var c = "__maitre-session-" + config.uuid;
                    if ("subscriber_created" == RH.response || "subscriber_retrieved" == RH.response) if (!this.readCookie(c) || a) this.eraseCookie(c, config, RH), this.createCookie(c,
                        RH.optin_data.id, 365, config, RH);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.storeSignupCookie 1269");
                    console.error("[ReferralHero] An unexpected error occurred in method storeSignupCookie:", err);
                }
            }, countriesData: function(){
                try{
                    var d = [{"country":"Afghanistan","code":"93","iso":"AF","format":"9"},
                    {"country":"Albania","code":"355","iso":"AL","format":"8"},
                    {"country":"Algeria","code":"213","iso":"DZ","format":"9"},
                    {"country":"American Samoa","code":"1-684","iso":"AS","format":"10"},
                    {"country":"Andorra","code":"376","iso":"AD","format":"9"},
                    {"country":"Angola","code":"244","iso":"AO","format":"10"},
                    {"country":"Anguilla","code":"1-264","iso":"AI","format":"10"},
                    {"country":"Antarctica","code":"672","iso":"AQ","format":"10"},
                    {"country":"Antigua and Barbuda","code":"1-268","iso":"AG","format":"10"},
                    {"country":"Argentina","code":"54","iso":"AR","format":"10"},
                    {"country":"Armenia","code":"374","iso":"AM","format":"8"},
                    {"country":"Aruba","code":"297","iso":"AW","format":"7"},
                    {"country":"Australia","code":"61","iso":"AU","format":"9"},
                    {"country":"Austria","code":"43","iso":"AT","format":"10"},
                    {"country":"Azerbaijan","code":"994","iso":"AZ","format":"9"},
                    {"country":"Bahamas","code":"1-242","iso":"BS","format":"10"},
                    {"country":"Bahrain","code":"973","iso":"BH","format":"8"},
                    {"country":"Bangladesh","code":"880","iso":"BD","format":"10"},
                    {"country":"Barbados","code":"1-246","iso":"BB","format":"10"},
                    {"country":"Belarus","code":"375","iso":"BY","format":"9"},
                    {"country":"Belgium","code":"32","iso":"BE","format":"9"},
                    {"country":"Belize","code":"501","iso":"BZ","format":"7"},
                    {"country":"Benin","code":"229","iso":"BJ","format":"9"},
                    {"country":"Bermuda","code":"1-441","iso":"BM","format":"10"},
                    {"country":"Bhutan","code":"975","iso":"BT","format":"10"},
                    {"country":"Bolivia","code":"591","iso":"BO","format":"10"},
                    {"country":"Bosnia and Herzegovina","code":"387","iso":"BA","format":"8"},
                    {"country":"Botswana","code":"267","iso":"BW","format":"10"},
                    {"country":"Brazil","code":"55","iso":"BR","format":"11"},
                    {"country":"British Indian Ocean Territory","code":"246","iso":"IO","format":"7"},
                    {"country":"British Virgin Islands","code":"1-284","iso":"VG","format":"10"},
                    {"country":"Brunei","code":"673","iso":"BN","format":"10"},
                    {"country":"Bulgaria","code":"359","iso":"BG","format":"9"},
                    {"country":"Burkina Faso","code":"226","iso":"BF","format":"8"},
                    {"country":"Burundi","code":"257","iso":"BI","format":"10"},
                    {"country":"Cambodia","code":"855","iso":"KH","format":"9"},
                    {"country":"Cameroon","code":"237","iso":"CM","format":"9"},
                    {"country":"Canada","code":"1","iso":"CA","format":"10"},
                    {"country":"Cape Verde","code":"238","iso":"CV","format":"10"},
                    {"country":"Cayman Islands","code":"1-345","iso":"KY","format":"10"},
                    {"country":"Central African Republic","code":"236","iso":"CF","format":"10"},
                    {"country":"Chad","code":"235","iso":"TD","format":"10"},
                    {"country":"Chile","code":"56","iso":"CL","format":"10"},
                    {"country":"China","code":"86","iso":"CN", "format":"11"},
                    {"country":"Christmas Island","code":"61","iso":"CX","format":"10"},
                    {"country":"Cocos Islands","code":"61","iso":"CC","format":"10"},
                    {"country":"Colombia","code":"57","iso":"CO","format":"10"},
                    {"country":"Comoros","code":"269","iso":"KM","format":"10"},
                    {"country":"Cook Islands","code":"682","iso":"CK","format":"5"},
                    {"country":"Costa Rica","code":"506","iso":"CR","format":"8"},
                    {"country":"Croatia","code":"385","iso":"HR","format":"9"},
                    {"country":"Cuba","code":"53","iso":"CU","format":"10"},
                    {"country":"Curacao","code":"599","iso":"CW","format":"10"},
                    {"country":"Cyprus","code":"357","iso":"CY","format":"8"},
                    {"country":"Czech Republic","code":"420","iso":"CZ","format":"9"},
                    {"country":"Democratic Republic of the Congo","code":"243","iso":"CD","format":"10"},
                    {"country":"Denmark","code":"45","iso":"DK","format":"8"},
                    {"country":"Djibouti","code":"253","iso":"DJ","format":"10"},
                    {"country":"Dominica","code":"1-767","iso":"DM","format":"10"},
                    {"country":"Dominican Republic","code":"1-809, 1-829, 1-849","iso":"DO","format":"10"},
                    {"country":"East Timor","code":"670","iso":"TL","format":"8"},
                    {"country":"Ecuador","code":"593","iso":"EC","format":"9"},
                    {"country":"Egypt","code":"20","iso":"EG","format":"10"},
                    {"country":"El Salvador","code":"503","iso":"SV","format":"8"},
                    {"country":"Equatorial Guinea","code":"240","iso":"GQ","format":"10"},
                    {"country":"Eritrea","code":"291","iso":"ER","format":"10"},
                    {"country":"Estonia","code":"372","iso":"EE","format":"8"},
                    {"country":"Ethiopia","code":"251","iso":"ET","format":"10"},
                    {"country":"Falkland Islands","code":"500","iso":"FK","format":"5"},
                    {"country":"Faroe Islands","code":"298","iso":"FO","format":"5"},
                    {"country":"Fiji","code":"679","iso":"FJ","format":"10"},
                    {"country":"Finland","code":"358","iso":"FI","format":"10"},
                    {"country":"France","code":"33","iso":"FR","format":"9"},
                    {"country":"French Polynesia","code":"689","iso":"PF","format":"6"},
                    {"country":"Gabon","code":"241","iso":"GA","format":"7"},
                    {"country":"Gambia","code":"220","iso":"GM","format":"10"},
                    {"country":"Georgia","code":"995","iso":"GE","format":"9"},
                    {"country":"Germany","code":"49","iso":"DE","format":"11"},
                    {"country":"Ghana","code":"233","iso":"GH","format":"9"},
                    {"country":"Gibraltar","code":"350","iso":"GI","format":"10"},
                    {"country":"Greece","code":"30","iso":"GR","format":"10"},
                    {"country":"Greenland","code":"299","iso":"GL","format":"6"},
                    {"country":"Grenada","code":"1-473","iso":"GD","format":"10"},
                    {"country":"Guam","code":"1-671","iso":"GU","format":"10"},
                    {"country":"Guatemala","code":"502","iso":"GT","format":"8"},
                    {"country":"Guernsey","code":"44-1481","iso":"GG","format":"10"},
                    {"country":"Guinea","code":"224","iso":"GN","format":"10"},
                    {"country":"Guinea-Bissau","code":"245","iso":"GW","format":"10"},
                    {"country":"Guyana","code":"592","iso":"GY","format":"10"},
                    {"country":"Haiti","code":"509","iso":"HT","format":"10"},
                    {"country":"Honduras","code":"504","iso":"HN","format":"8"},
                    {"country":"Hong Kong","code":"852","iso":"HK","format":"8"},
                    {"country":"Hungary","code":"36","iso":"HU","format":"9"},
                    {"country":"Iceland","code":"354","iso":"IS","format":"10"},
                    {"country":"India","code":"91","iso":"IN","format":"10"},
                    {"country":"Indonesia","code":"62","iso":"ID","format":"11"},
                    {"country":"Iran","code":"98","iso":"IR","format":"10"},
                    {"country":"Iraq","code":"964","iso":"IQ","format":"10"},
                    {"country":"Ireland","code":"353","iso":"IE","format":"9"},
                    {"country":"Isle of Man","code":"44-1624","iso":"IM","format":"10"},
                    {"country":"Israel","code":"972","iso":"IL","format":"9"},
                    {"country":"Italy","code":"39","iso":"IT","format":"10"},
                    {"country":"Ivory Coast","code":"225","iso":"CI","format":"10"},
                    {"country":"Jamaica","code":"1-876","iso":"JM","format":"10"},
                    {"country":"Japan","code":"81","iso":"JP","format":"10"},
                    {"country":"Jersey","code":"44-1534","iso":"JE","format":"10"},
                    {"country":"Jordan","code":"962","iso":"JO","format":"9"},
                    {"country":"Kazakhstan","code":"7","iso":"KZ","format":"10"},
                    {"country":"Kenya","code":"254","iso":"KE","format":"10"},
                    {"country":"Kiribati","code":"686","iso":"KI","format":"8"},
                    {"country":"Kosovo","code":"383","iso":"XK","format":"8"},
                    {"country":"Kuwait","code":"965","iso":"KW","format":"8"},
                    {"country":"Kyrgyzstan","code":"996","iso":"KG","format":"9"},
                    {"country":"Laos","code":"856","iso":"LA","format":"8"},
                    {"country":"Latvia","code":"371","iso":"LV","format":"8"},
                    {"country":"Lebanon","code":"961","iso":"LB","format":"8"},
                    {"country":"Lesotho","code":"266","iso":"LS","format":"8"},
                    {"country":"Liberia","code":"231","iso":"LR","format":"8"},
                    {"country":"Libya","code":"218","iso":"LY","format":"10"},
                    {"country":"Liechtenstein","code":"423","iso":"LI","format":"8"},
                    {"country":"Lithuania","code":"370","iso":"LT","format":"8"},
                    {"country":"Luxembourg","code":"352","iso":"LU","format":"9"},
                    {"country":"Macao","code":"853","iso":"MO","format":"10"},
                    {"country":"Macedonia","code":"389","iso":"MK","format":"10"},
                    {"country":"Madagascar","code":"261","iso":"MG","format":"10"},
                    {"country":"Malawi","code":"265","iso":"MW","format":"10"},
                    {"country":"Malaysia","code":"60","iso":"MY", "format":"9"},
                    {"country":"Maldives","code":"960","iso":"MV","format":"7"},
                    {"country":"Mali","code":"223","iso":"ML","format":"8"},
                    {"country":"Malta","code":"356","iso":"MT","format":"8"},
                    {"country":"Marshall Islands","code":"692","iso":"MH","format":"7"},
                    {"country":"Mauritania","code":"222","iso":"MR","format":"10"},
                    {"country":"Mauritius","code":"230","iso":"MU","format":"8"},
                    {"country":"Mayotte","code":"262","iso":"YT","format":"10"},
                    {"country":"Mexico","code":"52","iso":"MX","format":"10"},
                    {"country":"Micronesia","code":"691","iso":"FM","format":"10"},
                    {"country":"Moldova","code":"373","iso":"MD","format":"8"},
                    {"country":"Monaco","code":"377","iso":"MC","format":"8"},
                    {"country":"Mongolia","code":"976","iso":"MN","format":"8"},
                    {"country":"Montenegro","code":"382","iso":"ME","format":"8"},
                    {"country":"Montserrat","code":"1-664","iso":"MS","format":"10"},
                    {"country":"Morocco","code":"212","iso":"MA","format":"8"},
                    {"country":"Mozambique","code":"258","iso":"MZ","format":"12"},
                    {"country":"Myanmar","code":"95","iso":"MM","format":"10"},
                    {"country":"Namibia","code":"264","iso":"NA","format":"10"},
                    {"country":"Nauru","code":"674","iso":"NR","format":"10"},
                    {"country":"Nepal","code":"977","iso":"NP","format":"10"},
                    {"country":"Netherlands","code":"31","iso":"NL","format":"9"},
                    {"country":"Netherlands Antilles","code":"599","iso":"AN","format":"8"},
                    {"country":"New Caledonia","code":"687","iso":"NC","format":"6"},
                    {"country":"New Zealand","code":"64","iso":"NZ","format":"10"},
                    {"country":"Nicaragua","code":"505","iso":"NI","format":"8"},
                    {"country":"Niger","code":"227","iso":"NE","format":"8"},
                    {"country":"Nigeria","code":"234","iso":"NG","format":"10"},
                    {"country":"Niue","code":"683","iso":"NU","format":"4"},
                    {"country":"North Korea","code":"850","iso":"KP","format":"10"},
                    {"country":"Northern Mariana Islands","code":"1-670","iso":"MP","format":"10"},
                    {"country":"Norway","code":"47","iso":"NO","format":"8"},
                    {"country":"Oman","code":"968","iso":"OM","format":"10"},
                    {"country":"Pakistan","code":"92","iso":"PK","format":"10"},
                    {"country":"Palau","code":"680","iso":"PW","format":"7"},
                    {"country":"Palestine","code":"970","iso":"PS","format":"9"},
                    {"country":"Panama","code":"507","iso":"PA","format":"8"},
                    {"country":"Papua New Guinea","code":"675","iso":"PG","format":"8"},
                    {"country":"Paraguay","code":"595","iso":"PY","format":"9"},
                    {"country":"Peru","code":"51","iso":"PE","format":"9"},
                    {"country":"Philippines","code":"63","iso":"PH","format":"10"},
                    {"country":"Pitcairn","code":"64","iso":"PN","format":"9"},
                    {"country":"Poland","code":"48","iso":"PL","format":"9"},
                    {"country":"Portugal","code":"351","iso":"PT","format":"9"},
                    {"country":"Puerto Rico","code":"1-787, 1-939","iso":"PR","format":"10"},
                    {"country":"Qatar","code":"974","iso":"QA","format":"8"},
                    {"country":"Republic of the Congo","code":"242","iso":"CG","format":"10"},
                    {"country":"Reunion","code":"262","iso":"RE","format":"12"},
                    {"country":"Romania","code":"40","iso":"RO","format":"10"},
                    {"country":"Russia","code":"7","iso":"RU","format":"10"},
                    {"country":"Rwanda","code":"250","iso":"RW","format":"8"},
                    {"country":"Saint Barthelemy","code":"590","iso":"BL","format":"10"},
                    {"country":"Saint Helena","code":"290","iso":"SH","format":"10"},
                    {"country":"Saint Kitts and Nevis","code":"1-869","iso":"KN"},
                    {"country":"Saint Lucia","code":"1-758","iso":"LC","format":"10"},
                    {"country":"Saint Martin","code":"590","iso":"MF","format":"10"},
                    {"country":"Saint Pierre and Miquelon","code":"508","iso":"PM","format":"10"},
                    {"country":"Saint Vincent and the Grenadines","code":"1-784","iso":"VC","format":"10"},
                    {"country":"Samoa","code":"685","iso":"WS","format":"5"},
                    {"country":"San Marino","code":"378","iso":"SM","format":"10"},
                    {"country":"Sao Tome and Principe","code":"239","iso":"ST","format":"10"},
                    {"country":"Saudi Arabia","code":"966","iso":"SA","format":"9"},
                    {"country":"Senegal","code":"221","iso":"SN","format":"10"},
                    {"country":"Serbia","code":"381","iso":"RS","format":"9"},
                    {"country":"Seychelles","code":"248","iso":"SC","format":"10"},
                    {"country":"Sierra Leone","code":"232","iso":"SL","format":"10"},
                    {"country":"Singapore","code":"65","iso":"SG","format":"8"},
                    {"country":"Sint Maarten","code":"1-721","iso":"SX","format":"10"},
                    {"country":"Slovakia","code":"421","iso":"SK","format":"10"},
                    {"country":"Slovenia","code":"386","iso":"SI","format":"10"},
                    {"country":"Solomon Islands","code":"677","iso":"SB","format":"10"},
                    {"country":"Somalia","code":"252","iso":"SO","format":"10"},
                    {"country":"South Africa","code":"27","iso":"ZA","format":"9"},
                    {"country":"South Korea","code":"82","iso":"KR","format":"10"},
                    {"country":"South Sudan","code":"211","iso":"SS","format":"10"},
                    {"country":"Spain","code":"34","iso":"ES","format":"9"},
                    {"country":"Sri Lanka","code":"94","iso":"LK","format":"7"},
                    {"country":"Sudan","code":"249","iso":"SD","format":"10"},
                    {"country":"Suriname","code":"597","iso":"SR","format":"10"},
                    {"country":"Svalbard and Jan Mayen","code":"47","iso":"SJ","format":"10"},
                    {"country":"Swaziland","code":"268","iso":"SZ","format":"10"},
                    {"country":"Sweden","code":"46","iso":"SE","format":"7"},
                    {"country":"Switzerland","code":"41","iso":"CH","format":"9"},
                    {"country":"Syria","code":"963","iso":"SY","format":"9"},
                    {"country":"Taiwan","code":"886","iso":"TW","format":"9"},
                    {"country":"Tajikistan","code":"992","iso":"TJ","format":"10"},
                    {"country":"Tanzania","code":"255","iso":"TZ","format":"6"},
                    {"country":"Thailand","code":"66","iso":"TH","format":"9"},
                    {"country":"Togo","code":"228","iso":"TG","format":"8"},
                    {"country":"Tokelau","code":"690","iso":"TK","format":"10"},
                    {"country":"Tonga","code":"676","iso":"TO","format":"10"},
                    {"country":"Trinidad and Tobago","code":"1-868","iso":"TT","format":"10"},
                    {"country":"Tunisia","code":"216","iso":"TN","format":"8"},
                    {"country":"Turkey","code":"90","iso":"TR","format":"10"},
                    {"country":"Turkmenistan","code":"993","iso":"TM","format":"10"},
                    {"country":"Turks and Caicos Islands","code":"1-649","iso":"TC","format":"10"},
                    {"country":"Tuvalu","code":"688","iso":"TV","format":"10"},
                    {"country":"U.S. Virgin Islands","code":"1-340","iso":"VI","format":"10"},
                    {"country":"Uganda","code":"256","iso":"UG","format":"10"},
                    {"country":"Ukraine","code":"380","iso":"UA","format":"9"},
                    {"country":"United Arab Emirates","code":"971","iso":"AE","format":"9"},
                    {"country":"United Kingdom","code":"44","iso":"GB","format":"10"},
                    {"country":"United States","code":"1","iso":"US","format":"10"},
                    {"country":"Uruguay","code":"598","iso":"UY","format":"8"},
                    {"country":"Uzbekistan","code":"998","iso":"UZ","format":"10"},
                    {"country":"Vanuatu","code":"678","iso":"VU","format":"10"},
                    {"country":"Vatican","code":"379","iso":"VA","format":"10"},
                    {"country":"Venezuela","code":"58","iso":"VE","format":"7"},
                    {"country":"Vietnam","code":"84","iso":"VN","format":"9"},
                    {"country":"Wallis and Futuna","code":"681","iso":"WF","format":"10"},
                    {"country":"Western Sahara","code":"212","iso":"EH","format":"10"},
                    {"country":"Yemen","code":"967","iso":"YE","format":"9"},
                    {"country":"Zambia","code":"260","iso":"ZM","format":"9"},
                    {"country":"Zimbabwe","code":"263","iso":"ZW","format":"9"}];
                    return d;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.countriesData 1516");
                    console.error("[ReferralHero] An unexpected error occurred in method countriesData:", err);
                }
            }, createHiddenField: r, ajax: {
                xhr: null, request: function (a, c, d, f, e, k) {
                    try{
                        this.xhr || (this.xhr = window.ActiveX ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest);
                        var h = this.xhr;
                        h.onreadystatechange = function () {
                            4 === h.readyState && 200 === h.status ? f(JSON.parse(h.responseText)) : 4 === h.readyState && (e ? e() : console.error("[ReferralHero] Ajax call has failed."))
                        };
                        h.onerror = function () {
                            e ? e() : console.error("[ReferralHero] Ajax call has failed.")
                        };
                        this.xhr.open(c, a, false);
                        this.xhr.setRequestHeader("Content-Type", "application/json");
                        k && this.xhr.setRequestHeader("Authorization", k);
                        this.xhr.send(JSON.stringify(d));
                    }catch (err) {
                        g.tools.sendErrorNotification(err, "g.tools.ajax.request 1535");
                        console.error("[ReferralHero] An unexpected error occurred in method request:", err);
                    }
                }
            }, asyncRequest: {
                requestQueue: [],
                isProcessing: false,
                xhr: null,
                processQueue: function() {
                    try{
                        if (this.requestQueue.length === 0) {
                            this.isProcessing = false;
                            return;
                        }
                        this.isProcessing = true;
                        const nextRequest = this.requestQueue.shift();
                        this.xhr = window.ActiveX ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest;
                        const h = this.xhr;
                        h.onreadystatechange = () => {
                            if (4 === h.readyState) {
                                return new Promise((resolve, reject) => {
                                    try {
                                        if (200 === h.status) {
                                            const responseData = JSON.parse(h.responseText);
                                            // Wrap success callback in a promise to ensure it completes
                                            Promise.resolve(nextRequest.success(responseData))
                                                .then(() => resolve())
                                                .catch(reject);
                                        } else {
                                            // Wrap error handling in a promise
                                            Promise.resolve(
                                                nextRequest.error
                                                    ? nextRequest.error()
                                                    : console.error("[ReferralHero] Ajax call has failed.")
                                            )
                                            .then(() => resolve())
                                            .catch(reject);
                                        }
                                    } catch (err) {
                                        g.tools.sendErrorNotification(err, "g.tools.asyncRequest.processQueue 1574");
                                        console.error("[ReferralHero] Error processing request", err);
                                        reject(err);
                                    }
                                })
                                .then(() => {
                                    // Only process next request after success/error callback is fully complete
                                    this.processQueue();
                                })
                                .catch((err) => {
                                    console.error("[ReferralHero] Callback processing error", err);
                                    // Still continue processing queue
                                    this.processQueue();
                                });
                            }
                        };
                        h.onerror = () => {
                            return new Promise((resolve, reject) => {
                                // Wrap error handling in a promise
                                Promise.resolve(
                                    nextRequest.error
                                        ? nextRequest.error()
                                        : console.error("[ReferralHero] Ajax call has failed.")
                                )
                                .then(() => resolve())
                                .catch(reject);
                            })
                            .then(() => {
                                this.processQueue();
                            })
                            .catch((err) => {
                                console.error("[ReferralHero] Error handler processing error", err);
                                this.processQueue();
                            });
                        };
                        h.open(nextRequest.method, nextRequest.url, true);
                        h.setRequestHeader("Content-Type", "application/json");
                        if (nextRequest.authToken) {
                            h.setRequestHeader("Authorization", nextRequest.authToken);
                        }
                        h.send(JSON.stringify(nextRequest.data));
                    }catch (err) {
                        g.tools.sendErrorNotification(err, "g.tools.asyncRequest.processQueue 1616");
                        console.error("[ReferralHero] An unexpected error occurred in method processQueue:", err);
                    }
                },
                request: function (a, c, d, f, e, k) {
                    try{
                        const requestObj = {
                            url: a,
                            method: c,
                            data: d,
                            success: f,
                            error: e,
                            authToken: k
                        };
                        
                        this.requestQueue.push(requestObj);
                        if (!this.isProcessing) {
                            this.processQueue();
                        }
                    }catch (err) {
                        g.tools.sendErrorNotification(err, "g.tools.asyncRequest.request 1636");
                        console.error("[ReferralHero] An unexpected error occurred in method processQueue:", err);
                    }
                }
            }, extend: function () {
                try{
                    for (var a = 1; a < arguments.length; a++) for (var c in arguments[a]) arguments[a].hasOwnProperty(c) && ("object" === typeof arguments[0][c] && "object" === typeof arguments[a][c] ? this.extend(arguments[0][c], arguments[a][c]) : arguments[0][c] = arguments[a][c]);
                    return arguments[0];
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.extend 1645");
                    console.error("[ReferralHero] An unexpected error occurred in method extend:", err);
                }
            }, numberWithCommas: function (a) {
                try{
                    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.numberWithCommas 1652");
                    console.error("[ReferralHero] An unexpected error occurred in method numberWithCommas:", err);
                }
            }, copyToClipboard: function (a, c) {
                try{
                    if (document.body.createTextRange) {
                        var d = document.body.createTextRange();
                        d.moveToElementText(a);
                        d.select()
                    } else if (window.getSelection && document.createRange) {
                        a.readOnly = !1;
                        d = document.createRange();
                        d.selectNodeContents(a);
                        var f = window.getSelection();
                        f.removeAllRanges();
                        f.addRange(d);
                        "TEXTAREA" != a.nodeName && "INPUT" != a.nodeName || a.select();
                        a.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i) &&
                        (a.setSelectionRange(0, 999999), a.readOnly = !0)
                    }
                    try {
                        var e = document.execCommand("copy")
                    } catch (h) {
                        e = !1
                    }
                    if (e) {
                        H = !0;
                        setTimeout(function () {
                            H = !1
                        }, 500);
                        console.info("[ReferralHero] Referral link copied to clipboard.")
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.copyToClipboard 1685");
                    console.error("[ReferralHero] An unexpected error occurred in method copyToClipboard:", err);
                }
            }, mobileCheck: function () {
                try{
                    var a = !1, c = navigator.userAgent || navigator.vendor || window.opera;
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(c) ||
                        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,
                            4)) || "undefined" !== typeof window.orientation || -1 !== navigator.userAgent.indexOf("IEMobile")) a = !0;
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.mobileCheck 1696");
                    console.error("[ReferralHero] An unexpected error occurred in method mobileCheck:", err);
                }
            }, isIOSDevice: function () {
                try{
                    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.isIOSDevice 1703");
                    console.error("[ReferralHero] An unexpected error occurred in method isIOSDevice:", err);
                }
            }, differenceArray: function(arr1, arr2){
                return arr1.filter(x => !arr2.includes(x));
            }, getNumberWithOrdinal(n) {
                try{
                    var s = ["th", "st", "nd", "rd"],
                        v = n % 100;
                    return n + (s[(v - 20) % 10] || s[v] || s[0]);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.getNumberWithOrdinal 1714");
                    console.error("[ReferralHero] An unexpected error occurred in method getNumberWithOrdinal:", err);
                }
            }, checkOneClickSignup: function (config, RH) {
                var a = config.defaults.hasOwnProperty("email") && "" != config.defaults.email.trim() ? config.defaults.email.trim() : this.getParams(config.settings.one_click_signup.email);
                a && (a = {
                    email: a,
                    name: config.defaults.hasOwnProperty("name") && "" != config.defaults.name.trim() ? config.defaults.name.trim() : this.getParams(config.settings.one_click_signup.name) || this.getParams("maitre_name"),
                    extra_field: config.defaults.hasOwnProperty("extra_field") && "" != config.defaults.extra_field.trim() ? config.defaults.extra_field.trim() : this.getParams(config.settings.one_click_signup.extra_field) || this.getParams("maitre_extra_field"),
                    extra_field_2: config.defaults.hasOwnProperty("extra_field_2") && "" != config.defaults.extra_field_2.trim() ? config.defaults.extra_field_2.trim() : this.getParams(config.settings.one_click_signup.extra_field_2) || this.getParams("maitre_extra_field_2"),
                    extra_field_3: config.defaults.hasOwnProperty("extra_field_3") && "" != config.defaults.extra_field_3.trim() ? config.defaults.extra_field_3.trim() : this.getParams(config.settings.one_click_signup.extra_field_3) || this.getParams("maitre_extra_field_3"),
                    extra_field_4: config.defaults.hasOwnProperty("extra_field_4") && "" != config.defaults.extra_field_4.trim() ? config.defaults.extra_field_4.trim() : this.getParams(config.settings.one_click_signup.extra_field_4) || this.getParams("maitre_extra_field_4")
                }, E = !0, g.form.submit(a, config, RH))
            }, addLinkForCommonEmailsWithText: function (text, RH) {
                try{
                    var a = RH.optin_data ? RH.optin_data.email.split("@")[1] : "email.com", c = "",
                        d = text;
                    "gmail.com" == a || "googlemail.com" == a ? c = "https://gmail.com" : "yahoo.com" == a || "ymail.com" == a ? c = "https://mail.yahoo.com" : "hotmail.com" == a || "live.com" == a || "outlook.com" == a || "msn.com" == a || "hotmail.co.uk" == a ? c = "https://mail.live.com" : "icloud.com" == a || "me.com" == a || "mac.com" == a ? c = "https://www.icloud.com/#mail" : "aol.com" == a && (c = "https://mail.aol.com");
                    "" !=
                    c && (d = d.replace('email', "&nbsp;<a href='" + c + "' target='_blank'>email</a>"));
                    return d;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.addLinkForCommonEmailsWithText 1736");
                    console.error("[ReferralHero] An unexpected error occurred in method addLinkForCommonEmailsWithText:", err);
                }
            }, addLinkForCommonEmails: function (config, RH) {
                try{
                    var a = RH.optin_data ? RH.optin_data.email.split("@")[1] : "email.com", c = "",
                        d = config.settings.sharing.verification.text_email;
                    "gmail.com" == a || "googlemail.com" == a ? c = "https://gmail.com" : "yahoo.com" == a || "ymail.com" == a ? c = "https://mail.yahoo.com" : "hotmail.com" == a || "live.com" == a || "outlook.com" == a || "msn.com" == a || "hotmail.co.uk" == a ? c = "https://mail.live.com" : "icloud.com" == a || "me.com" == a || "mac.com" == a ? c = "https://www.icloud.com/#mail" : "aol.com" == a && (c = "https://mail.aol.com");
                    "" !=
                    c && (d = d.replace(config.settings.sharing.verification.email_replace, "<a href='" + c + "' target='_blank'>" + config.settings.sharing.verification.email_replace + "</a>"));
                    return d;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.addLinkForCommonEmails 1748");
                    console.error("[ReferralHero] An unexpected error occurred in method addLinkForCommonEmails:", err);
                }
            }, lightenColor: function (a, c) {
                try{
                    var d = parseInt(a, 16), f = Math.round(2.55 * c), e = (d >> 16) + f, k = (d >> 8 & 255) + f;
                    d = (d & 255) + f;
                    return (16777216 + 65536 * (255 > e ? 1 > e ? 0 : e : 255) + 256 * (255 > k ? 1 > k ? 0 : k : 255) + (255 > d ? 1 > d ? 0 : d : 255)).toString(16).slice(1);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.lightenColor 1757");
                    console.error("[ReferralHero] An unexpected error occurred in method lightenColor:", err);
                }
            }, sendEMail: function (a, c, d, f, e, config) {
                try{
                    if(mtid("mtr-form-submit-button")){
                        mtid("mtr-form-submit-button").innerHTML = g.tools.tailwindSpinner();
                        mtid("mtr-form-submit-button").disabled = !0
                    }
                    g.tools.asyncRequest.request(config.settings.lambda.email_endpoint, "POST", {
                        TEMPLATE_ID: config.settings.lambda.pm_template_id,
                        CAMPAIGN_ID: config.uuid + "-confirmation_email",
                        TO: a,
                        FROM: config.settings.lambda.email_from,
                        REPLY_TO: config.settings.lambda.email_replyto,
                        SUBSTITUTION_DATA: {name: c, confirmation_link: d}
                    }, function (k) {
                        k.success ? console.log("[ReferralHero] Email sent successfully.") : console.warn("[ReferralHero] Failed to send email.\nLog: " + k);
                        f && f()
                        if(mtid("mtr-form-submit-button")){
                            mtid("mtr-form-submit-button").innerHTML = config.settings.form.submit_button.text
                            mtid("mtr-form-submit-button").disabled = !1
                        }
                    }, function (k) {
                        console.error("[ReferralHero] There was a problem sending the confirmation email. " + k);
                        if(mtid("mtr-form-submit-button")){
                            mtid("mtr-form-submit-button").innerHTML = config.settings.form.submit_button.text
                            mtid("mtr-form-submit-button").disabled = !1
                        }
                        e && e()
                    }, config.settings.lambda.email_authorization)
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.sendEMail 1789");
                    console.error("[ReferralHero] An unexpected error occurred in method sendEMail:", err);
                }
            }, sendSMS: function (a, c, d, f, config) {
                try{
                    g.tools.asyncRequest.request(config.settings.lambda.sms_endpoint,
                        "POST", {
                            body: config.settings.lambda.sms_body,
                            confirmation_link: c,
                            to: a,
                            from: config.settings.lambda.sms_from
                        }, function (e) {
                            "queued" == e.status ? console.log("[ReferralHero] SMS sent successfully.") : console.error("[ReferralHero] Failed to send SMS.\nLog: " + e);
                            d && d()
                        }, function (e) {
                            console.error("[ReferralHero] There was a problem sending the SMS. " + e);
                            d && d()
                        }, config.settings.lambda.sms_authorization)
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.sendSMS 1808");
                    console.error("[ReferralHero] An unexpected error occurred in method sendSMS:", err);
                }
            }, reloadWidgets: function(interval, config, RH) {
                try{
                    if (config && config.defaults && !config.settings.list_canceled) {
                        if (mtid(config.defaults.form_container_id) && config.settings.show_signup_widget == "show") {
                            g.tools.appendWidgetToContainer(config.defaults.form_container_id, g.generate.form, interval, config, RH);
                            if(mtid("mtr-load-spinner")){
                                mtid(config.defaults.form_container_id).removeChild(document.getElementById("mtr-load-spinner"));
                            }
                        } else if (mtid(config.defaults.form_container_id_two) && config.settings.show_signup_widget == "show") {
                            g.tools.appendWidgetToContainer(config.defaults.form_container_id_two, g.generate.form, interval, config, RH);
                            if(mtid("mtr-load-spinner")){
                                mtid(config.defaults.form_container_id_two).removeChild(document.getElementById("mtr-load-spinner"));
                            }
                        } else if (mtid(config.defaults.signup_form_container_id) && config.settings.enable_features.signup_widget) {
                            g.tools.appendWidgetToContainer(config.defaults.signup_form_container_id, g.generate.signup_widget_form, interval, config, RH);
                            if(mtid("mtr-load-spinner")){
                                mtid(config.defaults.signup_form_container_id).removeChild(document.getElementById("mtr-load-spinner"));
                            }
                        } else if (mtid(config.defaults.inline_button_container_id)) {
                            g.tools.appendWidgetToContainer(config.defaults.inline_button_container_id, g.generate.inline_button, interval, config, RH);
                        } else if (mtid(config.defaults.signup_inline_button_container_id)) {
                            g.tools.appendWidgetToContainer(config.defaults.signup_inline_button_container_id, g.generate.signup_inline_button, interval, config, RH);
                        } 
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.reloadWidgets 1827");
                    console.error("[ReferralHero] An unexpected error occurred in method reloadWidgets:", err);
                }
            }, appendWidgetToContainer: function(containerId, widgetGenerator, interval, config, RH) {
                try{
                    var container = mtid(containerId);
                    if (container) {
                        if (!container.querySelector('form') && !container.querySelector('#mtr-sharing-screen') && !container.querySelector('#thankyou-form') && !container.querySelector('#maitre-inline-button')) {
                        var widget = widgetGenerator(config, RH);
                        container.appendChild(widget);
                        clearInterval(interval);
                        }
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.appendWidgetToContainer 1841");
                    console.error("[ReferralHero] An unexpected error occurred in method appendWidgetToContainer:", err);
                }
            }, findFont: function (code){
                try{
                    var fo = {
                        "inherit": "inherit",

                        "arial": "'Arial', sans-serif",
                        "caveat": "'Caveat', cursive",
                        "codystar": "'Codystar', cursive",
                        "comic_neue": "'Comic Neue', cursive",
                        "covered_by_your_grace": "'Covered By Your Grace', cursive",
                        "dancing_script": "'Dancing Script', cursive",
                        "edu_sa_beginner": "'Edu SA Beginner', cursive",
                        "finger_paint": "'Finger Paint', cursive",
                        "great_vibes": "'Great Vibes', cursive",
                        "gurajada": "'Gurajada', serif",
                        "helvetica": "Helvetica",
                        "hi_melody": "'Hi Melody', cursive",
                        "im_fell_dw_pica": "'IM Fell DW Pica', serif",
                        "josefin_sans": "'Josefin Sans', sans-serif",
                        "kalam": "'Kalam', cursive",
                        "lato": "'Lato', sans-serif",
                        "meddon": "'Meddon', cursive",
                        "metamorphous": "'Metamorphous', cursive",
                        "monospace": "Monospace",
                        "montez": "'Montez', cursive",
                        "montserrat": "'Montserrat', sans-serif",
                        "nova_mono": "'Nova Mono', monospace",
                        "nunito": "'Nunito', sans-serif",
                        "open_sans": "'Open Sans', sans-serif",
                        "orbitron": "'Orbitron', sans-serif",
                        "oregano": "'Oregano', cursive",
                        "oswald": "'Oswald', sans-serif",
                        "over_the_rainbow": "'Over the Rainbow', cursive",
                        "pacifico": "'Pacifico', cursive",
                        "permanent_marker": "'Permanent Marker', cursive",
                        "quicksand": "'Quicksand', sans-serif",
                        "roboto": "'Roboto', sans-serif",
                        "rubik_gemstones": "'Rubik Gemstones', cursive",
                        "rubik_vinyl": "'Rubik Vinyl', cursive",
                        "sedgwick_ave": "'Sedgwick Ave', cursive",
                        "shadows_into_light": "'Shadows Into Light', cursive",
                        "silkscreen": "'Silkscreen', cursive",
                        "slackey": "'Slackey', cursive",
                        "sniglet": "'Sniglet', cursive",
                        "source_code_pro": "'Source Code Pro', monospace",
                        "space_mono": "'Space Mono', monospace",
                        "spectral": "'Spectral', serif",
                        "sunflower": "'Sunflower', sans-serif",
                        "supermercado_one": "'Supermercado One', cursive",
                        "times_new_roman": "Times New Roman",
                        "unbounded": "'Unbounded', cursive",
                        "zeyada": "'Zeyada', cursive"
                    };
                    return fo[code];
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.findFont 1899");
                    console.error("[ReferralHero] An unexpected error occurred in method findFont:", err);
                }

            }, get_id_number: function (id){
                try{
                    var i = id.split("-");
                    return i[i.length-1];
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.get_id_number 1908");
                    console.error("[ReferralHero] An unexpected error occurred in method get_id_number:", err);
                }
                
            }, generateElement: function (data, RH){
                try{
                    var el = document.createElement(data.tagName);
                    for(var attribute in data){
                        if (['tagName', 'children', 'text'].includes(attribute)){ continue; }
                        if(data["id"] != undefined && data["id"].startsWith("button-link") && attribute == "href" && RH.optin_data){
                            let url = data[attribute].replace(/\?$/, "");
                            let separator = url.includes("?") ? "&" : "?";
                            el.setAttribute(attribute, `${url}${separator}rh_sub_id=${RH.optin_data.id}`);
                        }else{
                            el.setAttribute(attribute, data[attribute]);
                        }
                        if(attribute == 'data-font-family-code'){ el.style.fontFamily = g.tools.findFont(data[attribute]);}
                    }
                    if (data.text){ el.innerHTML = data.text;}
                    for(var i = 0; i< data.children.length; i++){
                        el.appendChild(g.tools.generateElement(data.children[i], RH));
                    }
                    return el;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.generateElement 1930");
                    console.error("[ReferralHero] An unexpected error occurred in method generateElement:", err);
                }

            }, designElement: function (designer_data, config, RH, widget_type = null){
                try{
                    var element_json = designer_data.element_attributes.replace("justify-center", "mtr-justify-center").replace("items-center", "mtr-items-center").replace(" mb-4", " mtr-mb-4").replace("flex", "mtr-flex").replace("display: mtr-flex", "display: flex");

                    var fields = ["grid-field", "image-field", "line-field", "text-field", "button-field", "spacer-field", "coupon-field", "form-input-field", "drag"];

                    fields.forEach(function (field) {
                        if(!(field == "grid-field" && element_json.includes("sub-grid-field"))){
                            element_json = element_json.replace(field, "mtr-" + field);
                        }
                    })

                    var data = JSON.parse(element_json.replace(/&quot;/gi,'"'));

                    // if (data.id == "maitre-signup-widget-form-fields" || data.id == "maitre-optin-form-fields"){return false;}
                    
                    var el = g.tools.generateElement(data, RH);

                    if(el.classList.contains('mtr-text-field')){
                        try{
                            var referrer_name_val = g.tools.get_referrer_name(RH, config)
                            var ref_complete_name = g.tools.fetch_complete_name(referrer_name_val);
                            var ref_first_name_val = RH.advocate_first_name || ref_complete_name[0];
                            var ref_last_name_val = RH.advocate_last_name || ref_complete_name[1]
                            var mwr_val = this.getParams("mwr")
                            if(mwr_val && widget_type != "horizontal_banner"){
                                referrer_name_val = null;
                                ref_first_name_val = null;
                                ref_last_name_val = null;
                            }
                            var substituted_data = el.firstChild.innerHTML.replace(/%referrer_name%/gi, referrer_name_val || '<span class="mtr-hide">%referrer_name%</span>').replace(/%total_positions%/gi, config.settings.total_sub_positions).replace(/%advocate_first_name%/gi, ref_first_name_val || '<span class="mtr-hide">%advocate_first_name%</span>').replace(/%advocate_last_name%/gi, ref_last_name_val || '<span class="mtr-hide">%advocate_last_name%</span>')
                            el.firstChild.innerHTML = g.tools.substitute_phone_number(substituted_data);
                        }
                        catch(h){
                        }
                    }

                    if(el.classList.contains('verification-field')){
                    el.appendChild(g.generate.sharingVerificationBox(el, config.settings.signup_widget_form.verification, config, RH));
                    }
                    if(el.classList.contains('mtr-video-field')){
                        const videoEl = el.querySelector('video');
                        const iframeEl = el.querySelector('iframe');

                        if (videoEl) {
                            videoEl.style.maxWidth = "100%";
                        } else if (iframeEl) {
                            iframeEl.style.maxWidth = "100%";
                        }
                    }
                    
                    //if(el.classList.contains('coupon-field') && (RH.optin_data?.coupon_details && el.getAttribute('data-reward-ids'))){
                    //    ap_el = g.generate.couponBox(el, RH)
                    //    if(ap_el){
                    //        el.appendChild(ap_el);
                    //    }
                    //}
                    
                    if(el.hasAttribute('data-font-family-code')){
                        el.style.fontFamily = g.tools.findFont(el.getAttribute('data-font-family-code'));
                    }
                    if(el.classList.contains('mtr-image-field')){
                        el.style.minWidth = "200px";
                        if(designer_data.valid_image == true){
                            el.querySelector('img').src = designer_data.image;
                        }else{
                            el.style.display = "none"
                        }
                    };

                    return el;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.designElement 2006");
                    console.error("[ReferralHero] An unexpected error occurred in method designElement:", err);
                }
            }, designSharingElement: function (designer_data, config, RH){
                try{
                    var element_json = designer_data.element_attributes.replace("justify-center", "mtr-justify-center").replace("items-center", "mtr-items-center").replace(" mb-4", " mtr-mb-4").replace("flex", "mtr-flex").replace("display: mtr-flex", "display: flex");
                    
                    var fields = ["grid-field", "image-field", "line-field", "stats-field", "rewards-field", "share-link-field", "social-links-field", "referrals-field", "text-field", "button-field", "spacer-field", "coupon-field", "lb-field", "social-box-field", "qa-field", "motivation-prompt-field", "social-actions-field", "drag"];
                    
                    fields.forEach(function (field) {
                        if(!(field == "grid-field" && element_json.includes("sub-grid-field"))){
                            element_json = element_json.replace(field, "mtr-" + field);
                        }
                    })

                    var data = JSON.parse(element_json.replace(/&quot;/gi,'"'));

                    var el = g.tools.generateElement(data, RH);

                    if(el.classList.contains('mtr-text-field') && RH.optin_data){
                    try{
                        var total_referrals = RH.optin_data.people_referred;
                        if(RH.optin_data.two_three_step_conversion_event){
                            total_referrals = RH.optin_data.pending_referrals;
                        }
                        var substituted_data = el.firstChild.innerHTML.replace(/%total_referrals%/gi, total_referrals).replace(/%points%/gi, RH.optin_data.points).replace(/%position%/gi, RH.optin_data.position).replace(/%total_positions%/gi, RH.optin_data.total_sub_positions).replace(/%name%/gi, RH.optin_data.name).replace(/%referral_code%/gi, RH.optin_data.referral_code).replace(/%first_name%/gi, RH.optin_data.first_name).replace(/%last_name%/gi, RH.optin_data.last_name).replace(/%advocate_first_name%/gi, RH.optin_data.advocate_first_name || '').replace(/%advocate_last_name%/gi, RH.optin_data.advocate_last_name || '').replace(/%extra_field%/gi, RH.optin_data.extra_field || '');
                        el.firstChild.innerHTML = g.tools.substitute_phone_number(substituted_data);
                    }
                    catch(h){
                    }
                    }
                    //if(el.classList.contains('coupon-field') && (RH.optin_data?.coupon_details && el.getAttribute('data-reward-ids'))){
                    //    ap_el = g.generate.couponBox(el, RH)
                    //    if(ap_el){
                    //        el.appendChild(ap_el);
                    //    }
                    //}
                    if(el.classList.contains('mtr-coupon-field')){
                        ap_el = g.generate.couponBox(el, RH)
                        if(ap_el){
                            el.appendChild(ap_el);
                        }
                    }

                    if(el.classList.contains('mtr-motivation-prompt-field') && RH.optin_data){
                    el.firstChild.innerHTML = el.firstChild.innerHTML.replace(/%x%/gi, config.settings.sharing.motivation_prompt.motivation_value).replace(/%jump_position%/gi, RH.optin_data.jump_position);
                    }
                        
                    if(el.classList.contains('mtr-image-field')){
                        el.style.minWidth = "200px";
                        if(designer_data.image_type == "image/svg+xml"){
                            el.style.display = "none"
                        }else if(designer_data.image_type == "image/png"){
                            if(designer_data.valid_image == true){
                                el.querySelector('img').src = designer_data.image;
                            }else{
                                el.style.display = "none"
                            }
                        }
                    }
                    if(el.classList.contains('mtr-lb-field')){
                        el.appendChild(g.generate.leaderboard(el, config, RH));
                    }
                    if(el.classList.contains('mtr-video-field')){
                        const videoEl = el.querySelector('video');
                        const iframeEl = el.querySelector('iframe');

                        if (videoEl) {
                            videoEl.style.maxWidth = "100%";
                        } else if (iframeEl) {
                            iframeEl.style.maxWidth = "100%";
                        }
                    }
                    if(el.classList.contains('mtr-rewards-field')){
                        el.appendChild(g.generate.bonusList(el, config, RH));
                        var rew_arr = config.settings.sharing.rewards.list
                        var count_rewards = 0
                        var c = config.settings.sharing.rewards.list; 
                        rsa = [];

                        try{
                            var pr = el.getAttribute('data-rewards-order').split(' ')

                            var ar = c.map(a => a.id.toString());
                            var rr = g.tools.differenceArray(ar, pr);
                            pr = pr.concat(rr);

                            pr.forEach(function(a){
                                if(RH.optin_data.eligible_rewards.includes(parseInt(a, 10))){
                                    if(a.label != ""){
                                    label_present = true;
                                    }
                                    if(el.getAttribute("data-rewards-orientation")=="row"){
                                    if(el.getAttribute('data-rewards-toggle-'+a) == 'true'){
                                        a && rsa.push(c.find(obj => { return obj.id == a }))
                                    }
                                    }else{
                                        a && rsa.push(c.find(obj => { return obj.id == a }))
                                    }
                                }
                            })
                            rsa = rsa.filter(reward => reward);
                        }
                        catch(h){
                            rsa = c;
                        }
                        var new_sorted_array = [];
                        try{
                            if(el.getAttribute('data-order-rearranged') == undefined || el.getAttribute('data-order-rearranged') == "false"){
                                rsa.forEach(function(rwd, i) {
                                    if (rwd.category == "signing_up" && ( ( rwd.signup_type == "referral" && !RH.optin_data.referred) || (rwd.signup_type == "organic_subscriber" && RH.optin_data.referred ))){return;}
                                    if (RH.optin_data.unlocked_rewards.includes(rwd.id)) {
                                        new_sorted_array.push(rwd);
                                    }
                                })
                                rsa.forEach(function(rwd, i) {
                                    if (rwd.category == "signing_up" && ( ( rwd.signup_type == "referral" && !RH.optin_data.referred) || (rwd.signup_type == "organic_subscriber" && RH.optin_data.referred ))){return;}
                                    if (!RH.optin_data.unlocked_rewards.includes(rwd.id)) {
                                        new_sorted_array.push(rwd);
                                    }
                                })
                            }else{
                                new_sorted_array = rsa;
                            }
                        }catch{
                            new_sorted_array = rsa;
                        }
                        count_rewards = new_sorted_array.length


                        let intervalId = setInterval(function(){
                            if(document.getElementsByClassName('.swiper-container')){
                                var containers = document.getElementsByClassName('swiper-container');
                                Array.from(containers).forEach(function(container) {
                                    var lists = container.getElementsByClassName('mtr-rewards-list');
                                    Array.from(lists).forEach(function(list) {
                                        list.style.display = 'flex';
                                    });
                                });

                                if(!g.tools.mobileCheck()){
                                    var swiper = new Swiper('.swiper-container', {
                                        loop: true,
                                        speed: 400,
                                        spaceBetween: g.tools.mobileCheck() ? 80 : 17,
                                        initialSlide: 0,
                                        autoplay: false,
                                        centerSlides: false,
                                        autoplay: false,
                                        navigation: {
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                        },
                                        pagination: {
                                            el: '.swiper-pagination',
                                            type: 'custom',
                                            renderCustom: function (swiper, current, total) {
                                                var sh_c = current % count_rewards == 0 ? count_rewards :  current % count_rewards;
                                            return sh_c + ' of ' + count_rewards + ' rewards';
                                            },
                                        },
                                        breakpoints: {
                                            0: {
                                            slidesPerView: 1.75,
                                            },
                                            600: {
                                            slidesPerView: 2.5,
                                            },
                                            1000: {
                                            slidesPerView: 2.5,
                                            },
                                        },
                                        effect:'slide'
                                    });
                                } else{
                                    var swiper = new Swiper('.swiper-container', {
                                        loop: true,
                                        speed: 400,
                                        spaceBetween: g.tools.mobileCheck() ? 80 : 17,
                                        initialSlide: 0,
                                        autoplay: false,
                                        centerSlides: false,
                                        autoplay: false,
                                        navigation: {
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                        },
                                        pagination: {
                                            el: '.swiper-pagination-mobile',
                                            type: 'custom',
                                            renderCustom: function (swiper, current, total) {
                                                var sh_c = current % count_rewards == 0 ? count_rewards :  current % count_rewards;
                                            return sh_c + ' of ' + count_rewards + ' rewards';
                                            },
                                        },
                                        breakpoints: {
                                            0: {
                                            slidesPerView: 1.75,
                                            },
                                            600: {
                                            slidesPerView: 2.5,
                                            },
                                            1000: {
                                            slidesPerView: 2.5,
                                            },
                                        },
                                        effect:'slide'
                                    });
                                }
                                clearInterval(intervalId);
                            }
                        }, 2000);

                        setTimeout(() => {
                            clearInterval(intervalId);
                        }, 15000);
                    }
                    if(el.classList.contains('mtr-verification-field')){
                        el.appendChild(g.generate.sharingVerificationBox(el, config.settings.sharing.verification, config, RH));
                    }
                    if(el.classList.contains('mtr-stats-field')){
                        el.appendChild(g.generate.subscriberPositionStats(el, config, RH));
                    }
                    if(el.classList.contains('mtr-referrals-field')){
                        el.appendChild(g.generate.myReferrals(el, config, RH));
                    }
                    if(el.classList.contains('mtr-share-link-field')){
                        el.appendChild(g.generate.referralLinkContainer(el, config, RH));
                    }
                    if(el.classList.contains('mtr-social-links-field')){
                        el.appendChild(g.generate.socialLinksBox(el, config, RH));
                    }
                    if(el.classList.contains('mtr-social-actions-field')){
                        el.appendChild(g.generate.socialActionsBox(el, config, RH));
                    }
                    if(el.classList.contains('how-it-works-field')){
                        el.appendChild(g.generate.howItWorks(el, config, RH));
                    }
                    if(el.classList.contains('faq-field')){
                        el.appendChild(g.generate.faqBox(el, config, RH));
                    }
                    if(el.classList.contains('qr-code-field')){
                        const tryRenderQR = () => {
                            if (typeof QRCodeStyling !== "undefined") {
                                el.appendChild(g.generate.qrCode(el, config, RH));
                            } else {
                                setTimeout(tryRenderQR, 100);
                            }
                        };

                        tryRenderQR();
                    }

                    return el;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.designSharingElement 2253");
                    console.error("[ReferralHero] An unexpected error occurred in method designSharingElement:", err);
                }
            
            },counter: function (event) {
                try{
                    $('.owl-carousel .owl-nav').removeClass('disabled');
                    var element   = event.target;         
                        var items     = event.item.count;    
                        var item      = event.item.index + 1;   
                    
                    // it loop is true then reset counter from 1
                    if(item > items) {
                        item = item - items
                    }
                    $('.counter').html(item+" of "+items+" rewards");
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.toools.counter 2270");
                    console.error("[ReferralHero] An unexpected error occurred in method counter:", err);
                }
            }, spinner: function(size, color){
                try{
                    size = size || '18px'
                    color = color || '#000'
                    var spinner_size = size.replace('px', '') * 2;
                    return '<svg width="'+spinner_size+'" height="'+spinner_size+'" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke-width="3" stroke="#ccc" /><circle cx="25" cy="25" r="20" fill="none" stroke-width="3" stroke="'+color+'"><animate attributeName="stroke-dasharray" values="1, 200; 90, 200; 90, 200" begin="0s" dur="1.5s" repeatCount="indefinite" /><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" begin="0s" dur="1.5s" repeatCount="indefinite" /></circle></svg>';
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.spinner 2280");
                    console.error("[ReferralHero] An unexpected error occurred in method spinner:", err);
                }
            }, tailwindSpinner:  function(){
                return '<div class="mtr-loader"></div>';
            }, tailwindCheckmark: function(){
                return '<div class="mtr-checkmark"></div>'
            }, tailwindCheckmarkThin: function(){
                return '<div class="mtr-checkmark-thin"></div>'
            },
            check_discord_join: function(invite_id, sub_id, interval, checked_background, checked, the_social_bg_color, RH){
                try{
                    RH.optin_data && g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/check_discord_join", "POST", {
                        subscriber_id: RH.optin_data.id,
                        invite_id: invite_id
                    }, function (z) {
                        if (z.response == "success"){
                            checked_background.style.backgroundColor = the_social_bg_color;
                            checked.classList.remove("mtr-loading");
                            checked.classList.add("mtr-checked");
                            checked.style.backgroundColor = the_social_bg_color;
                        }
                    }, function (z) {
                        console.error("[ReferralHero] Error while check discord action: " + z)
                    })
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.check_discord_join 2306");
                    console.error("[ReferralHero] An unexpected error occurred in method check_discord_join:", err);
                }
            }, check_telegram_join: function(invite_id, sub_id, interval, checked_background, checked, the_social_bg_color, RH){
                try{
                    RH.optin_data && g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/check_telegram_join", "POST", {
                        subscriber_id: RH.optin_data.id,
                        invite_id: invite_id
                    }, function (z) {
                        if (z.response == "success"){
                            checked_background.style.backgroundColor = the_social_bg_color;
                            checked.classList.remove("mtr-loading");
                            checked.classList.add("mtr-checked");
                            checked.style.backgroundColor = the_social_bg_color;
                        }
                    }, function (z) {
                        console.error("[ReferralHero] Error while check telegram action: " + z)
                    })
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.check_telegram_join 2325");
                    console.error("[ReferralHero] An unexpected error occurred in method check_telegram_join:", err);
                }
            }, applyMWR: function (mwr, config) {
                try{
                    if (config.settings.admin_has_organic_traffic_tracking_campaign && config.settings.apply_mwr_enabled){
                        var currentUrl = window.location.href;
                        var url = new URL(currentUrl);
                        url.searchParams.set('mwr', mwr);
                        history.pushState(null, null, url.toString());
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.applyMWR 2337");
                    console.error("[ReferralHero] An unexpected error occurred in method applyMWR:", err);
                }
            }, generate_new_session: function (config, RH) {
                try{
                    var a = "__maitre-session-" + config.uuid;
                    var c = this.readCookie(a);
                    if(!c){
                        var d = this.getParams("rh_sub_id");
                        d && g.tools.asyncRequest.request(this.getWidgetUrl(config) + "/find_subscriber_in_list", "POST", {
                            code: d
                        }, function (f) {
                            if (f.response == "ok"){
                                RH.optin_data = f.data
                                g.tools.createCookie(a, d, 90, config, RH);
                            }
                        }, function (f) {
                            console.error(f)
                        })
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate_new_session 2358");
                    console.error("[ReferralHero] An unexpected error occurred in method generate_new_session:", err);
                }
            }, trackOrganic: function (data, c) {
                try{
                    var arr = document.cookie.split('; ');
                    var a = "__maitre-referrer-";
                    var list_uuid = null;
                    let rh_variable = null;
                    arr.forEach(function(element){
                        if(element.startsWith(a) && !element.startsWith("__maitre-referrer-name")){
                            list_uuid = element.split('-')[2].split('=')[0];
                            rh_variable = "RH_"+list_uuid;
                            window[rh_variable].referrer = element.split('=')[1];
                        }
                    });
                    if(list_uuid != null && config[list_uuid] != undefined){
                        g.methods.organicTrackReferral(data, c, config[list_uuid], window[rh_variable]);
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.trackOrganic 2378");
                    console.error("[ReferralHero] An unexpected error occurred in method trackOrganic:", err);
                }
            }, checkAnonymousVisitor: function () {
                try{
                    var anonymous_visitor = RH.anonymous_referral_code;
                    var arr = document.cookie.split('; ');
                    arr.forEach(function(element){
                        if(element.includes('anonymous-referral-code-')){
                            anonymous_visitor = element.split('=')[1];
                        }
                    })
                    return anonymous_visitor;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.checkAnonymousVisitor 2392");
                    console.error("[ReferralHero] An unexpected error occurred in method checkAnonymousVisitor:", err);
                }
            }, replaceCookies: function(config, RH, referral_code, sub_id){
                try{
                    var arr = document.cookie.split('; ');
                    arr.forEach(function(element){
                        if(element.startsWith('__nps-anonymous-referral-code-') || element.startsWith('__maitre-anonymous-referral-code-') ){
                            var cookie = element.split('=')[0];
                            g.tools.eraseCookie(cookie, config, RH);
                            g.tools.createCookie(cookie, referral_code, 90, config, RH);
                        }else if(element.startsWith('__nps-anonymous-')){
                            var cookie = element.split('=')[0];
                            g.tools.eraseCookie(cookie, config, RH);
                            g.tools.createCookie(cookie, sub_id, 90, config, RH);
                        }
                    })
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.replaceCookies 2410");
                    console.error("[ReferralHero] An unexpected error occurred in method replaceCookies:", err);
                }
            }, referrer_cookie_present: function(){
                try{
                    var arr = document.cookie.split('; ');
                    var present = false;
                    arr.forEach(function(element){
                        if(element.startsWith('__maitre-referrer-')){
                            present = true;
                        }
                    })
                    return present;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.referrer_cookie_present 2424");
                    console.error("[ReferralHero] An unexpected error occurred in method referrer_cookie_present:", err);
                }
            }, sessionPresent: function(){
                try{
                    var arr = document.cookie.split('; ');
                    var a = "__maitre-session-";
                    for (var i = 0; i < arr.length; i++) {
                        var element = arr[i];
                        if(element.startsWith(a)){
                            return true;
                        }
                    };
                    return false;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.sessionPresent 2439");
                    console.error("[ReferralHero] An unexpected error occurred in method sessionPresent:", err);
                }
            }, getAnonymousVisitorId: function(RH){
                try{
                    var anonymous_visitor = RH.anonymous;
                    var arr = document.cookie.split('; ');
                    arr.forEach(function(element){
                        if(element.includes('anonymous') && !element.startsWith("__nps-anonymous-referral-code-") && !element.startsWith("__maitre-anonymous-referral-code-")){
                            anonymous_visitor = element.split('=')[1];
                        }
                    })
                    return anonymous_visitor;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.getAnonymousVisitorId 2453");
                    console.error("[ReferralHero] An unexpected error occurred in method getAnonymousVisitorId:", err);
                }
            }, error_widget: function(){
                try{
                    var widget = document.createElement("div");
                    widget.style.width = "80%"
                    widget.style.margin = "5px 10%"
                    var error = document.createElement("div");
                    error.style.width = "60%"
                    error.style.color = "red"
                    error.style.padding = "30px 30px 5px 30px"
                    error.style.margin = "10px 20%"
                    error.style.borderTop = "4px solid red"
                    error.style.borderRadius = "5px"
                    error.style.backgroundColor= "white"
                    var b = document.createElement("div");
                    b.id = "abc"
                    b.innerHTML = "<center>Your ReferralHero subscription has been canceled. You must reactivate to continue using ReferralHero.</center><br>"
                    b.style.fontSize = "x-large"
                    var s = document.createElement("div");
                    s.style.color = "black"
                    s.style.marginBottom = "0px"
                    s.innerHTML = "<center>Powered By ReferralHero</center>"
                    error.appendChild(b);
                    error.appendChild(s);
                    widget.appendChild(error);

                    return widget;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.error_widget 2483");
                    console.error("[ReferralHero] An unexpected error occurred in method error_widget:", err);
                }
            }, update_visit_duration: function(config, RH){
                try{
                    global_config["updateVisitScheduled"] = true
                    var c = g.tools.readCookie("__maitre-session-" + config.uuid) || g.tools.readCookie("__nps-anonymous-" + config.uuid) || g.tools.readCookie("__maitre-anonymous-" + config.uuid);
                    c && g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/update_visit_duration", "POST", {
                        uuid: config.uuid, 
                        sub_id: c,
                        visit_page: window.location.href,
                        hubspot_utk_cookie: g.tools.readCookie("hubspotutk")
                    }, function (e) {
                        if(e.response == "success"){
                            setTimeout(function(){
                                g.tools.update_visit_duration(config, RH);
                            }, 30000);
                        }
                    }, function (e) {
                        console.error(e)
                    })
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.update_visit_duration 2505");
                    console.error("[ReferralHero] An unexpected error occurred in method update_visit_duration:", err);
                }
            }, substitute_phone_number: function(text){
                try{
                    text = text.split("&nbsp;").join(" ");
                    const phoneRegex = /(?:^|\s+)(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})(?=\s|$)/g;

                    return text.replace(phoneRegex, function(match, phone) {
                        const cleanNumber = phone.replace(/\D+/g, '');
                
                        if (cleanNumber.length === 10) {
                            return ` <a href="tel:${cleanNumber}" class="auto-style-258">${phone}</a>`; // Maintain spacing for readability
                        } else {
                            return match;
                        }
                    });
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.substitute_phone_number 2523");
                    console.error("[ReferralHero] An unexpected error occurred in method substitute_phone_number:", err);
                }
            }, fetch_complete_name: function(name){
                try{
                    if (!name || name.trim() === "") {
                    return ["", ""];
                    }
                
                    const sanitized = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)\s*/i, "").trim();
                    const nameParts = sanitized.split(/\s+/);
                
                    if (nameParts.length === 0) {
                    return ["", ""];
                    } else if (nameParts.length === 1) {
                    return [nameParts[0], ""];
                    } else {
                    return [nameParts[0], nameParts.slice(1).join(" ")];
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.fetch_complete_name 2543");
                    console.error("[ReferralHero] An unexpected error occurred in method fetch_complete_name:", err);
                }
            }, update_buttons_text: function(config, RH){
                try{
                    var floating_button_div = mtid("maitre-floating-button");
                    var inner_text_floating_button = config.settings.floating_button.identified_label
                    if(floating_button_div && inner_text_floating_button){
                        floating_button_div.innerText = inner_text_floating_button;
                    }

                    var inline_button_div = mtid("maitre-inline-button");
                    var inner_text_inline_button = config.settings.inline_button.identified_label;
                    if(inline_button_div && inner_text_inline_button){
                        inline_button_div.innerText = inner_text_inline_button;
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.update_buttons_text 2560");
                    console.error("[ReferralHero] An unexpected error occurred in method update_buttons_text:", err);
                }
            }, get_referrer_name: function(RH, config){
                try{
                    var referrer_name = RH.referrer_name;
                    var arr = document.cookie.split('; ');
                    if(referrer_name == undefined){
                        for (let i = 0; i < arr.length; i++) {
                            var ref_cookie = '__maitre-referrer-name-';
                            if(config.settings.allow_global_subscribers_tracking){
                                ref_cookie = '__maitre-referrer-name-global';
                            }
                            if (arr[i].includes(ref_cookie)) {
                                referrer_name = arr[i].split('=')[1];
                                break; 
                            }
                        }
                    }
                    return referrer_name;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.get_referrer_name 2581");
                    console.error("[ReferralHero] An unexpected error occurred in method get_referrer_name:", err);
                }
            }, getReferrerCode: function(RH){
                try{
                    var referrer_code = RH.referrer;
                    var arr = document.cookie.split('; ');
                    if(referrer_code == undefined){
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i].includes('__maitre-referrer-') && !arr[i].startsWith("__maitre-referrer-name")) {
                                referrer_code = arr[i].split('=')[1];
                                break; 
                            }
                        }
                    }
                    return referrer_code;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.getReferrerCode 2598");
                    console.error("[ReferralHero] An unexpected error occurred in method getReferrerCode:", err);
                }
            }, deleteOldReferrerCookie: function(config, RH){
                try{
                    var arr = document.cookie.split('; ');
                    arr.forEach(function(element){
                        if(element.includes('__maitre-referrer-')){
                            g.tools.eraseCookie(element, config, RH);
                        }
                    });
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.deleteOldReferrerCookie 2610");
                    console.error("[ReferralHero] An unexpected error occurred in method deleteOldReferrerCookie:", err);
                }
            }, getListUuid: function(){
                try{
                    var arr = document.cookie.split('; ');
                    var st = "__maitre-referrer-";
                    var list_uuid = null;
                    var rh_variable = null;
                    if(RH.allow_global_subscribers_tracking){
                        arr.forEach(function(element){
                            if(element.startsWith("__maitre-campaign-referrer-global")){
                                list_uuid = element.split('=')[1]
                                rh_variable = "RH_"+list_uuid;
                            }
                        });
                    }else{
                        arr.forEach(function(element){
                            if(element.startsWith(st) && !element.startsWith("__maitre-referrer-name")){
                                list_uuid = element.split('-')[2].split('=')[0];
                                rh_variable = "RH_"+list_uuid;
                            }
                        });
                    }
                    return [list_uuid, rh_variable];
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.getListUuid 2636");
                    console.error("[ReferralHero] An unexpected error occurred in method getListUuid:", err);
                }
            }, sendErrorNotification: function(error_message, context = "") {
                try{
                    let firstLine = "";
                    if (error_message && typeof error_message === "object") {
                        firstLine = error_message.message ? error_message.message.split("\n")[0] : String(error_message);
                    } else {
                        firstLine = String(error_message).split("\n")[0];
                    }
                    g.tools.asyncRequest.request(((b.base_url + "/widget/" + global_config["alert_uuid"]) + "/script_error"), "POST", {
                        uuid: global_config["alert_uuid"],
                        error_message: firstLine,
                        context: context
                    }, function (f) {
                        console.log("Slack Alert sent");
                    }, function (f) {
                        console.error(f)
                    }) 

                }catch (err) {
                    console.error("[ReferralHero] An unexpected error occurred in method sendErrorNotification:", err);
                }
            }
        };

        g.callbacks = {
            success: function (a, config, RH) {
                try{
                    config.callbacks.hasOwnProperty("success") ? (config.callbacks.success(a, config, RH), w || g.tools.storeSignupCookie(a, config, RH),
                    "subscriber_created" != a.response || w || E || (false  ? g.tools.sendSMS(a.data.phone_number, a.confirmation_links.sms, null, null, config) : (false) && g.tools.sendEMail(a.data.email, a.data.name, a.confirmation_links.email, null, null, config))) : (mtid("mtr-form-submit-button") && ((config.settings.signup_widget_form.redirection.enable || config.settings.signup_widget_form.option_redirection.enable) ? mtid("mtr-form-submit-button").disabled = !0 : (mtid("mtr-form-submit-button").disabled = !1, mtid("mtr-form-submit-button").innerHTML = q ? config.settings.form.submit_button.check_position : config.settings.form.submit_button.text)), "server_problem" == a.response ?
                        config.callbacks.hasOwnProperty("serverProblem") ? (console.log("[ReferralHero] Custom serverProblem callback called."), config.callbacks.serverProblem()) : alert_or_console(config.settings.alerts.server_problem) : "failed_recaptcha_test" == a.response ? config.callbacks.hasOwnProperty("failedRecaptcha") ? (console.log("[ReferralHero] Custom failedRecaptcha callback called."), config.callbacks.failedRecaptcha()) : alert_or_console(config.settings.alerts.failed_recaptcha) : "subscriber_not_found" == a.response ? config.callbacks.hasOwnProperty("subscriberNotFound") ?
                            (console.log("[ReferralHero] Custom subscriberNotFound callback called."), config.callbacks.subscriberNotFound()) : alert_or_console(config.settings.alerts.subscriber_not_found) : ("affiliate_referral_found" == a.response && (mtid(config.defaults.form_container_id) || mtid(config.defaults.form_container_id_two))) ? alert_or_console("Access Denied. Please contact the campaign manager if you believe this is an error.") : ("affiliate_referral_success" == a.response && (mtid(config.defaults.form_container_id) || mtid(config.defaults.form_container_id_two))) ? alert_or_console("You are currently not an advocate for this campaign. Please sign up or contact the campaign manager for access.") : "email_not_valid" == a.response ? config.callbacks.hasOwnProperty("emailNotValid") ? (console.log("[ReferralHero] Custom emailNotValid callback called."), config.callbacks.emailNotValid(a.reason)) : alert_or_console(a.reason) : (w || RH.repeated_verification == false && g.tools.storeSignupCookie(a, config, RH), K && fbq("track", "Lead"), "subscriber_created" != a.response || w || E ? g.callbacks.post_success(a, config, RH) : config.settings.sharing.verification.sms_confirmation ?
                            g.callbacks.post_success(a, config, RH) : ( config.settings.sharing.verification.enabled && a.confirmation_links.email_sent != "true") ? g.tools.sendEMail(a.data.email, a.data.name, a.confirmation_links.email, function () {
                                g.callbacks.post_success(a, config, RH)
                            }, null, config) : g.callbacks.post_success(a, config, RH)));
                    g.tools.update_buttons_text(config, RH);
                    config.callbacks.hasOwnProperty("afterSuccess") && config.callbacks.afterSuccess(a);
                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.callbacks.success 2676");
                    console.error("[ReferralHero] An unexpected error occurred in method success:", err);
                }  
            }, post_success: async function (a, config, RH) {
                try {
                    if (!RH.optin_data) return;
                    const getOptionRedirect = (optField, redirectionConfig) => {
                        if (!optField || !redirectionConfig?.enable) return null;
                        const groups = redirectionConfig.option_data || {};
                        for (const group of Object.values(groups)) {
                            if ((group.options || []).includes(optField)) return group.url;
                        }
                        return null;
                    };
                    const selectedOption = RH.optin_data.option_field;
                    const signupOptionRedirect = getOptionRedirect(selectedOption, config.settings.signup_widget_form.option_redirection);
                    const sharingOptionRedirect = getOptionRedirect(selectedOption, config.settings.sharing.option_redirection);
                    const isSharingContainer = mtid(config.defaults.form_container_id) || mtid(config.defaults.form_container_id_two) || mtid(config.defaults.sharing_form_container_id);
                    const isSignupContainer = mtid(config.defaults.signup_form_container_id);
                    const sharingRedirectUrl = config.settings.sharing.redirection.enable ? config.settings.sharing.redirection.url : sharingOptionRedirect;
                    const signupRedirectUrl = config.settings.signup_widget_form.redirection.enable ? config.settings.signup_widget_form.redirection.url : signupOptionRedirect;
                    const queryParams = `?rh_email=${RH.optin_data.email}&rh_name=${RH.optin_data.name}&rh_extra_field=${RH.optin_data.extra_field}&rh_extra_field_2=${RH.optin_data.extra_field_2}&rh_extra_field_3=${RH.optin_data.extra_field_3}&rh_extra_field_4=${RH.optin_data.extra_field_4}&rh_code=${RH.optin_data.code}&rh_sub_id=${RH.optin_data.id}`;
                    (isSharingContainer
                        ? (sharingRedirectUrl ? window.location.replace(encodeURI(sharingRedirectUrl + queryParams)) : g.sharing.open(config, RH))
                        : (isSignupContainer
                            ? (signupRedirectUrl ? window.location.replace(encodeURI(signupRedirectUrl + queryParams)) : g.callbacks.post_success_msg(a, config, RH))
                            : (q || (mtid("maitre-floating-button") && !isSignupContainer) || mtid(config.defaults.inline_button_container_id)
                                ? g.sharing.open(config, RH)
                                : g.callbacks.post_success_msg(a, config, RH)
                            )
                        )
                    );
                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.callbacks.post_success 2685");
                    console.error("[ReferralHero] An unexpected error occurred in method post_success:", err);
                } 
            }, trackEvents: function () {
                try{
                    var a = b.queue.filter(function (d) {
                        return "track" == d[0]
                    });
                    if (0 < a.length) {
                        for (var c = 0; c < a.length; c++) {
                            g.trackEvent(a[c][1], a[c][2]);
                        }
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.trackEvents 2699");
                    console.error("[ReferralHero] An unexpected error occurred in method trackEvents:", err);
                }  
            }, post_success_msg: function (a, config, RH) {
                try{
                    if (mtid("maitre-floating-button")){
                        g.sharing.open(config, RH)
                    }
                    if(config.settings.enable_features.signup_widget && config.settings.signup_widget_form.confirmation_screen_popup.enable && mtid(config.defaults.signup_form_container_id) && !config.settings.sharing.popup){
                        g.generate.popup(g.generate.thankyou_screen(config, RH), config)
                    }
                    else if(mtid("mtr-optin-form")){
                        var primaryMethod = RH.optin_data?.primary_identifier;
                        var secondaryMethod = primaryMethod === "sms" ? "email" : "sms";

                        if (RH.optin_data && !RH.optin_data.verified && RH.optin_data[primaryMethod + "_enabled"] === "true") {
                            var b = g.generate.signupVerificationScreen(config, RH, primaryMethod);
                            var c = mtid("mtr-optin-form");
                            if (c) {
                                c.innerHTML = "";
                                c.appendChild(b);
                            }
                            return false; 
                        }
                        else if (RH.optin_data && !RH.optin_data.verified && RH.optin_data[secondaryMethod + "_enabled"] === "true") {
                            var b = g.generate.signupVerificationScreen(config, RH, secondaryMethod);
                            var c = mtid("mtr-optin-form");
                            if (c) {
                                c.innerHTML = "";
                                c.appendChild(b);
                            }
                            return false;
                        } else{
                            if (config.settings.signup_widget_form.thankyou_screen_settings){
                                var designer_data = config.settings.signup_widget_form.thankyou_screen_settings;
                                for( var i in designer_data){
                                    var el = g.tools.designElement(designer_data[i], config, RH);
                                    if(el.classList.contains('mtr-coupon-field')){
                                        ap_el = g.generate.couponBox(el, RH)
                                        if(ap_el){
                                            el.appendChild(ap_el);
                                        }
                                    }
                                    if (el.id == "thankyou-form"){
                                        var t_el = el;
                                        t_el.style.background = t_el.getAttribute("data-bg") == "color" ? t_el.getAttribute("data-bg-color") : "url('" + designer_data[i].image + "')";
                                        t_el.style.backgroundSize = t_el.getAttribute("data-bg-size");
                                    }else{
                                        if(el.classList.contains('mtr-text-field')){
                                            try{
                                                var substituted_data = el.firstChild.innerHTML.replace(/%total_positions%/gi, config.settings.total_sub_positions).replace(/%advocate_first_name%/gi, RH.advocate_first_name || '<span class="mtr-hide">%advocate_first_name%</span>').replace(/%advocate_last_name%/gi, RH.advocate_last_name || '<span class="mtr-hide">%advocate_last_name%</span>').replace(/%extra_field%/gi, RH.optin_data?.extra_field || '');
                                                el.firstChild.innerHTML = g.tools.substitute_phone_number(substituted_data);
                                            }
                                            catch(h){
                                            }
                                        }
                                        if(el.classList.contains('mtr-coupon-field')){
                                            if(ap_el){
                                                t_el.appendChild(ap_el);
                                            }
                                            }
                                        else {
                                            t_el.appendChild(el);
                                        }
                                    }
                                }
                                t_el.querySelectorAll('.sub-grid-field').forEach((el)=>{
                                    try{
                                        var gId = el.getAttribute('data-grid-id');
                                        el.style.maxWidth = "100%"
                                        t_el.querySelector('#'+gId).appendChild(el);
                                        console.log("here")
                                        console.log(t_el);
                                    } 
                                    catch(h){
                                        console.log(h)
                                    }
                                });
                                t_el.querySelectorAll('.sub-box-field').forEach((el)=>{
                                    try{
                                        var gId = el.getAttribute('data-box-id');
                                        t_el.querySelector('#'+gId).appendChild(el);
                                    }
                                    catch(h){
                                    }
                                });
                                t_el.querySelectorAll('.sub-column-field').forEach((el)=>{
                                    try{
                                        var gId = el.getAttribute('data-column-id');
                                        t_el.querySelector('#'+gId).appendChild(el);
                                    }
                                    catch(h){
                                        console.log(h)
                                    }
                                });
                                document.getElementById("mtr-optin-form").innerHTML = "";
                                document.getElementById("mtr-optin-form").style.maxWidth = "95%";
                                document.getElementById('mtr-optin-form').style.borderRadius = t_el.style.borderRadius;
                                document.getElementById("mtr-optin-form").appendChild(t_el);
                            }    
                        }
                        
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.tools.post_success_msg 2803");
                    console.error("[ReferralHero] An unexpected error occurred in method post_success_msg:", err);
                } 
            }, invitation_success: function (a, config, RH) {
                try{
                    config.callbacks.hasOwnProperty("success") ? (config.callbacks.invitation_success(a), w || g.tools.storeSignupCookie(a, config, RH),
                    "subscriber_created" != a.response || w || E || ( false ? g.tools.sendSMS(a.data.phone_number, a.confirmation_links.sms, null, null, config) : false && g.tools.sendEMail(a.data.email, a.data.name, a.confirmation_links.email, null, null, config))) : (mtid("mtr-form-submit-button") && (mtid("mtr-form-submit-button").disabled = !1, mtid("mtr-form-submit-button").innerHTML = config.settings.quick_add_form.submit_button.text ? config.settings.form.submit_button.check_position : config.settings.quick_add_form.submit_button.text), "server_problem" == a.response ?
                    config.callbacks.hasOwnProperty("serverProblem") ? (console.log("[ReferralHero] Custom serverProblem callback called."), config.callbacks.serverProblem()) : alert_or_console(config.settings.alerts.server_problem) : "failed_recaptcha_test" == a.response ? config.callbacks.hasOwnProperty("failedRecaptcha") ? (console.log("[ReferralHero] Custom failedRecaptcha callback called."), config.callbacks.failedRecaptcha()) : alert_or_console(config.settings.alerts.failed_recaptcha) : "subscriber_not_found" == a.response ? config.callbacks.hasOwnProperty("subscriberNotFound") ?
                        (console.log("[ReferralHero] Custom subscriberNotFound callback called."), config.callbacks.subscriberNotFound()) : alert_or_console(config.settings.alerts.subscriber_not_found) : "email_not_valid" == a.response ? config.callbacks.hasOwnProperty("emailNotValid") ? (console.log("[ReferralHero] Custom emailNotValid callback called."), config.callbacks.emailNotValid(a.reason)) : alert_or_console(a.reason) : (w || g.tools.storeSignupCookie(a, config, RH), K && fbq("track", "Lead"), "subscriber_created" != a.response || w || E ? g.callbacks.post_success(a, config, RH) : document.getElementById("mtr-quickadd-form").reset() && mtid("mtr-quick-add-form-input-country") && (mtid("mtr-quick-add-form-input-country").options["selectedIndex"] = 228), mtid("mtr-quick-add-form-input-country") && ( mtid("mtr-quick-add-form-input-country").options[228].innerHTML = config.settings.quick_add_form.phone_number.country_code)));
                    var submit_button = document.querySelectorAll("[id='mtr-quick-add-form-submit-button']");
                    for(var i = 0; i < submit_button.length; i++) {
                        submit_button[i].style.backgroundColor = config.settings.quick_add_form.submit_button.color;
                        submit_button[i].innerText = config.settings.quick_add_form.submit_button.text;
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.invitation_success 2818");
                    console.error("[ReferralHero] An unexpected error occurred in method invitation_success:", err);
                }   
            }
        };

        g.form = {
            incomplete: function (a, config, RH, qf = !1, form = config.settings.form) {
                try{
                    var c = a.querySelector("[name='email']"), d = a.querySelector("[name='name']"),
                        f = a.querySelector("[name='extra_field']"),
                        e = a.querySelector("[name='extra_field_2']"),
                        eee = a.querySelector("[name='extra_field_3']"),
                        eeee = a.querySelector("[name='extra_field_4']"),
                        x = a.querySelector("[name='option_field']"),
                        dd = a.querySelector("[name='address']"),
                        t = a.querySelector("[name='tags_field']"),
                        cc = a.querySelector("[name='country_code']"),
                        o = a.querySelector("[name='phone_number']"),
                        l = a.querySelector("[name='crypto_wallet_address']"),
                        z = a.querySelector("[name='crypto_wallet_provider']"),
                        s = a.querySelector("[name='other_identifier']");
                        ac = a.querySelector("[name='terms2']");
                        a = a.querySelector("[name='terms']");

                    if (qf){
                        const form = document.getElementById("mtr-quickadd-form");
                        if (!form.checkValidity()) {
                            form.reportValidity();
                            return;
                        }
                        return config.settings.quick_add_form.email.require && config.settings.quick_add_form.email.required && "" == c.value.trim() 
                        || config.settings.quick_add_form.name.require && config.settings.quick_add_form.name.required && "" == d.value.trim() && !q 
                        || config.settings.quick_add_form.extra_field.require && config.settings.quick_add_form.extra_field.required && "" == f.value.trim() && !q 
                        || config.settings.quick_add_form.extra_field_2.require && config.settings.quick_add_form.extra_field_2.required && "" == e.value.trim() && !q 
                        || config.settings.quick_add_form.extra_field_3.require && config.settings.quick_add_form.extra_field_3.required && "" == eee.value.trim() && !q 
                        || config.settings.quick_add_form.extra_field_4.require && config.settings.quick_add_form.extra_field_4.required && "" == eeee.value.trim() && !q 
                        || config.settings.quick_add_form.phone_number.require && config.settings.quick_add_form.phone_number.required && "" == o.value.trim() && !q 
                        || config.settings.quick_add_form.option_field.require && config.settings.quick_add_form.option_field.required && "" == x.value.trim() && !q ? 
                        "form_incomplete" : !config.settings.quick_add_form.terms_conditions.require || a.checked || q ? "valid" : "terms_not_accepted"
                    }
                    else{
                        return form.email.require && form.email.required && "" == c.value.trim() && !q 
                        || form.crypto_wallet_address.require && form.crypto_wallet_address.required && "" == l.value.trim() && !q 
                        || form.crypto_wallet_address.require && config.settings.sharing.verification.crypto_wallet_confirmation && "" == z.value.trim() && !q 
                        || form.other_identifier.require && "" == s.value.trim() && !q 
                        || form.name.require && form.name.required && "" == d.value.trim() && !q 
                        || form.extra_field.require && form.extra_field.required && "" == f.value.trim() && !q 
                        || form.extra_field_2.require && form.extra_field_2.required && "" == e.value.trim() && !q 
                        || form.extra_field_3.require && form.extra_field_3.required && "" == eee.value.trim() && !q 
                        || form.extra_field_4.require && form.extra_field_4.required && "" == eeee.value.trim() && !q 
                        || form.option_field.require && form.option_field.required && "" == x.value.trim() && !q 
                        || form.address.require && form.address.required && "" == dd.value.trim() && !q
                        || form.tags_field && form.tags_field.require && form.tags_field.required && "" == t.value.trim() && !q
                        || form.phone_number.require && form.phone_number.required && "" == o.value.trim() && !q 
                        || form.crypto_wallet_address.require && form.crypto_wallet_address.required && "" == l.value.trim() && !q 
                        ? "form_incomplete" : ((!form.terms_conditions.require || a.checked) && (!form.terms_conditions_2.require || ac.checked)) || q ? "valid" : "terms_not_accepted";
                    }
                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.form.incomplete 2871");
                    console.error("[ReferralHero] An unexpected error occurred in method incomplete:", err);
                }   
                
            }, submit: function (a, config, RH, qf = !1, form = config.settings.form, widget_type = null, button_clicked = null, from_api = false) {
                try{
                    RH_JM = 1;
                    if(mtid("mtr-form-submit-button")){
                        mtid("mtr-form-submit-button").innerHTML = g.tools.tailwindSpinner();
                        mtid("mtr-form-submit-button").disabled = !0
                    }
                    config.callbacks.hasOwnProperty("beforeSubmit") && (config.callbacks.beforeSubmit(a), g.form.data && (a = g.tools.extend(a, g.form.data)));    
                    var referrer_code = g.tools.getReferrerCode(RH);
                    if(from_api){
                        referrer_code = null; // referrer code is set to null because when from_api is true the referred visitor would have been converted already and now we need to create organic subscriber in uuid specified campaign. 
                    }
                    var c = {
                        test_mode: w,
                        check_status: !qf ? q : false,
                        one_click_signup: E,
                        name: a.name,
                        email: a.email,
                        extra_field: a.extra_field,
                        extra_field_2: a.extra_field_2,
                        extra_field_3: a.extra_field_3,
                        extra_field_4: a.extra_field_4,
                        option_field: a.option_field,
                        address: a.address,
                        phone_number: (a.phone_number && a.phone_number.length > 2) ? a.phone_number.replace(/[{()}-]/g, '') : "",
                        crypto_wallet_address: a.crypto_wallet_address,
                        crypto_wallet_provider: a.crypto_wallet_provider,
                        other_identifier_value: a.other_identifier_value,
                        terms_conditions: !qf ? a.terms : true,
                        uuid: config.uuid,
                        host: config.defaults.default_url,
                        referrer: !qf ? (from_api ? null : (RH.referrer || referrer_code)) : RH.optin_data.code,
                        status: !qf ? (( config.settings.track_events && ( RH.referrer || RH.anonymous || referrer_code || (a && a.advocate_name))) ? "custom_event_pending" : "registered") : (config.settings.track_events ? "custom_event_pending" : "registered"),
                        source: !qf ? RH.source : "Quick Add Referral",
                        campaign: config.uuid,
                        fingerprint: RH.fingerprint,
                        recaptcha: G,
                        require_leaderboard: config.settings.sharing.leaderboard.show,
                        is_quick_add_referral: qf,
                        nps_ids: g.tools.npsCookie("__nps-anonymous-"),
                        widget_type: widget_type,
                        tags: a.tags,
                        advocate_name: (from_api ? null : a.advocate_name),
                        form_button_click: button_clicked,
                        is_api_submission: from_api
                    };

                    if(config.settings.campaign_stopped == true && (button_clicked == "Sign up" || widget_type == "signup_widget")){
                        // Create modal container
                        var modal = document.createElement("div");
                        modal.style.position = "fixed";
                        modal.style.top = "0";
                        modal.style.left = "0";
                        modal.style.width = "100%";
                        modal.style.height = "100%";
                        modal.style.backgroundColor = "rgba(0,0,0,0.6)";
                        modal.style.display = "flex";
                        modal.style.justifyContent = "center";
                        modal.style.alignItems = "center";
                        modal.style.zIndex = "9999";

                        // Create popup box
                        var box = document.createElement("div");
                        box.style.background = "#fff";
                        box.style.padding = "20px";
                        box.style.borderRadius = "8px";
                        box.style.textAlign = "center";
                        box.style.maxWidth = "400px";
                        box.style.width = "90%";
                        box.innerHTML = "<p>This campaign has ended. If you believe this is a mistake, feel free to reach out to the campaign manager.</p>";

                        // Close button
                        var closeBtn = document.createElement("button");
                        closeBtn.innerText = "Close";
                        closeBtn.style.marginTop = "15px";
                        closeBtn.style.padding = "8px 16px";
                        closeBtn.style.background = "#007bff";
                        closeBtn.style.color = "#fff";
                        closeBtn.style.border = "none";
                        closeBtn.style.borderRadius = "4px";
                        closeBtn.style.cursor = "pointer";

                        // Close action
                        closeBtn.onclick = function () {
                            document.body.removeChild(modal);
                        };

                        box.appendChild(closeBtn);
                        modal.appendChild(box);
                        document.body.appendChild(modal);


                        if (!qf){
                            var submit_button = document.getElementById("mtr-form-submit-button")
                            submit_button.disabled = !1;
                            submit_button.innerText = form.submit_button.text;
                        }
                        return
                    }

                    if (!qf) {
                        var c_name = config.settings.allow_organic_traffic_tracking ? "__nps-anonymous-" + config.uuid : "__maitre-anonymous-" + config.uuid
                        if(!from_api){
                            c.sub_id = RH.anonymous || g.tools.getAnonymousVisitorId(RH);
                        }
                        c.subscribe_page_url = window.location.href;
                        c.landing_page_url = window.location.href;
                    }

                    var submit_button = document.getElementById("mtr-form-submit-button")
                    if (qf){
                        g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/post", "POST", c, function (d) {
                            d.response == "subscriber_retrieved" ? alert_or_console("[ReferralHero] Subscriber already exists with this unique identifier") : ""
                            "error" == d.response ? config.callbacks.hasOwnProperty("error") ? (console.error(d.message), config.callbacks.error(a)) : d.error ? alert(d.error) : alert_or_console(config.settings.alerts.subscriber_not_found) : (RH.response = Maitre.response = d.response,
                            g.callbacks.invitation_success(d, config, RH)) 
                            RH.optin_data = d.referrer_data || RH.optin_data;
                            if (!d.error){
                              var s_button = mtid("mtr-quick-add-form-submit-button");
                              s_button.innerHTML = g.tools.tailwindCheckmark(); 
                            }
                            setTimeout(function(){
                                mtid(config.defaults.form_container_id) && ((mtid(config.defaults.form_container_id).innerHTML = ""),  mtid(config.defaults.form_container_id).appendChild(g.generate.sharing_screen(config, RH)));
                                mtid(config.defaults.form_container_id_two) && ((mtid(config.defaults.form_container_id_two).innerHTML = ""),  mtid(config.defaults.form_container_id_two).appendChild(g.generate.sharing_screen(config, RH)));
                                mtid(config.defaults.sharing_form_container_id) && ((mtid(config.defaults.sharing_form_container_id).innerHTML = ""),  mtid(config.defaults.sharing_form_container_id).appendChild(g.generate.sharing_screen(config, RH)));
                            }, 300);
                            // mtid("mtr-quick-add-form-input-country") && (mtid("mtr-quick-add-form-input-country").options["selectedIndex"] = 228), mtid("mtr-quick-add-form-input-country") && ( mtid("mtr-quick-add-form-input-country").options[228].innerHTML = config.settings.quick_add_form.phone_number.country_code);
                        }, function (d) {
                            config.callbacks.hasOwnProperty("error") ? (console.error("[ReferralHero] There seems to be an error"), config.callbacks.error(a)) : alert_or_console(config.settings.alerts.server_problem)
                        });
                        // mtid("mtr-quick-add-form-submit-button") && (mtid("mtr-quick-add-form-submit-button").disabled = !1, mtid("mtr-quick-add-form-submit-button").innerHTML = config.settings.quick_add_form.submit_button.text);
                    }
                    else{
                        g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/post", "POST", c, function (d) {
                            if(submit_button && !(widget_type == "signup_widget" && (config.settings.signup_widget_form.redirection.enable || config.settings.signup_widget_form.option_redirection.enable))){
                                submit_button.disabled = !1;
                                submit_button.innerText = form.submit_button.text;
                            }
                            "error" == d.response ? config.callbacks.hasOwnProperty("error") ? (console.error(d.message), config.callbacks.error(a)) : d.error ? alert(d.error) : alert_or_console(config.settings.alerts.subscriber_not_found) : (RH.response = Maitre.response = d.response, RH.repeated_verification = (d.repeated_verification === "enabled") || false, RH.optin_data = d.data, RH.confirmation_links = d.confirmation_links,
                                g.callbacks.success(d, config, RH)), config.settings.horizontal_banner.show && g.generate.horizontal_banner(config, RH), setTimeout( function(){ (g.tools.readCookie("__maitre-session-" + config.uuid) && !(mtid(config.defaults.signup_form_container_id)) && !(mtid(config.defaults.form_container_id)) && !(mtid(config.defaults.form_container_id_two))) ? g.tools.getSessionCookie(!0, config, RH, !1) : null}, 6000), g.tools.replaceCookies(config, RH, d?.data?.code, d?.data?.id);
                        }, function (d) {
                            config.callbacks.hasOwnProperty("error") ? (console.error("[ReferralHero] There seems to be an error"), config.callbacks.error(a)) : alert_or_console(config.settings.alerts.server_problem)
                        });
                        mtid("mtr-crypto-provider-connect") && (mtid("mtr-crypto-provider-connect").disabled = !1, mtid("mtr-crypto-provider-connect").innerHTML = "Connect", mtid("mtr-crypto-provider-connect").style.backgroundColor = form.submit_button.color);
                    }
                    config.settings.recaptcha.enable && C && grecaptcha.reset(F);
                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.form.submit 2961");
                    console.error("[ReferralHero] An unexpected error occurred in submit:", err);
                }
            }, npsSubmit: function (a, config, RH) {
                try{
                    RH_JM = 1;

                    config.callbacks.hasOwnProperty("beforeSubmit") && (config.callbacks.beforeSubmit(a), g.form.data && (a = g.tools.extend(a, g.form.data)));
                    if (true) {                    
                        var c = {
                            test_mode: w,
                            check_status: q,
                            one_click_signup: E,
                            name: a.name,
                            email: a.email,
                            extra_field: a.extra_field,
                            extra_field_2: a.extra_field_2,
                            extra_field_3: a.extra_field_3,
                            extra_field_4: a.extra_field_4,
                            option_field: a.option_field,
                            phone_number: a.phone_number ? a.phone_number.replace(/[{()}-]/g, '') : "",
                            crypto_wallet_address: a.crypto_wallet_address,
                            crypto_wallet_provider: a.crypto_wallet_provider,
                            other_identifier_value: a.other_identifier_value,
                            terms_conditions: a.terms,
                            uuid: config.uuid,
                            host: config.defaults.default_url,
                            referrer: RH.referrer,
                            visitor_ids: g.tools.npsCookie("__maitre-anonymous-").length ? g.tools.npsCookie("__maitre-anonymous-") : g.tools.npsCookie("__nps-anonymous-"),
                            status: config.settings.track_events && RH.referrer ? "custom_event_pending" : "registered",
                            source: RH.source,
                            campaign: config.uuid,
                            fingerprint: RH.fingerprint,
                            recaptcha: G,
                            require_leaderboard: config.settings.sharing.leaderboard.show,
                            sub_id: g.tools.readCookie("__maitre-session-" + config.uuid),
                            sub_ids: g.tools.npsCookie("__maitre-session-"),
                            subscribe_page_url: window.location.href,
                            landing_page_url: window.location.href,
                            points: a.points,
                            desc: a.desc,
                            visit_page: window.location.href,
                            screen: a.screen
                        };
                        g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/feedback", "POST", c, function (d) {
                            if ("error" == d.response) {
                                if (config.callbacks.hasOwnProperty("error")) {
                                        console.error(d.message);
                                        config.callbacks.error(a);
                                } else {
                                    alert(config.settings.alerts.subscriber_not_found);
                                }
                            } else {
                                //RH.response = Maitre.response = d.response;
                                //RH.optin_data = d.data;
                                //RH.confirmation_links = d.confirmation_links;
                                //g.callbacks.success(d);

                                if(d.response == "feedback_generated" && d.new_visitor){
                                    var a = "__nps-anonymous-" + config.uuid, 
                                    c = d.data.id
                                    g.tools.createCookie(a, c, 90, config, RH);
                                }

                                if(data.second){
                                    g.generate.nps_secondary(data, config, RH);
                                }
                                else{
                                    overlay = document.getElementById('nps-popup-overlay')
                                    var hb = document.getElementById('nps-widget-' + config.uuid);
                                    //hb.style.display = "none";
                                    var f = "__nps-popup-closed-" + config.uuid;
                                    //overlay && (overlay.style.display = "none");

                                    g.tools.createCookie(f,  new Date().getTime(), 3650, config, RH);

                                    if (hb && hb.firstElementChild) {
                                        var firstChild = hb.firstElementChild;
                                        Array.from(firstChild.children).forEach(function (child) {
                                            if(!child.classList.contains('nps-banner-close')){
                                                firstChild.removeChild(child);
                                            }
                                        });

                                        var centerText = document.createElement('div');
                                        centerText.textContent = config.settings.nps_widget.thanks_message;
                                        centerText.style.position = 'absolute';
                                        centerText.style.top = '50%';
                                        centerText.style.left = '50%';
                                        centerText.style.transform = 'translate(-50%, -50%)';
                                        centerText.style.textAlign = 'center';
                                        centerText.style.fontSize = '24px';

                                        firstChild.appendChild(centerText);
                                    }
                                }
                            }
                        }, function (d) {
                            config.callbacks.hasOwnProperty("error") ? (console.error("[ReferralHero] There seems to be an error"), config.callbacks.error(a)) : alert_or_console(config.settings.alerts.server_problem)
                        });
                        // mtid("mtr-form-submit-button") && (mtid("mtr-form-submit-button").disabled = !1, mtid("mtr-form-submit-button").innerHTML = config.settings.form.submit_button.text);
                        mtid("mtr-crypto-provider-connect") && (mtid("mtr-crypto-provider-connect").disabled = !1, mtid("mtr-crypto-provider-connect").innerHTML = "Connect", mtid("mtr-crypto-provider-connect").style.backgroundColor = config.settings.form.submit_button.color);
                        config.settings.recaptcha.enable && C && grecaptcha.reset(F)
                    } else console.error("[ReferralHero] You must specifiy an email address."),
                        alert_or_console(config.settings.alerts.form_incomplete);
                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.form.npsSubmit 3067");
                    console.error("[ReferralHero] An unexpected error occurred in submit:", err);
                }            
            }, resendVerification: function (config, RH, verification_type) {
                try{
                    var c = g.tools.readCookie("__maitre-session-" + config.uuid) || RH.optin_data.id;
                    c && g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/resend_code", "POST", {
                        uuid: config.uuid, sub_id: c,
                        require_leaderboard: config.settings.sharing.leaderboard.show,
                        verification_type: verification_type
                    }, function (d) {
                        if("error" != d.response){
                            var code_status = document.getElementById(`resend-status${config.uuid}`)
                            if(code_status){
                                var otpInputs = document.querySelectorAll(`#mtr-otp-container input[type="number"]`);
                                otpInputs.forEach(function(input) {
                                    input.value = '';
                                });
                            
                                code_status.style.display = "block"
                                setTimeout(function(){
                                    code_status.style.display = "none" 
                                }, 1000)
                            }
                        }
                    }, function (d) {
                        console.error(d)
                    });
                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.form.resendVerification 3096");
                    console.error("[ReferralHero] An unexpected error occurred in resend code:", err);
                }   
            }, codeVerification: function (data, config, RH, widget_type) {
                try{
                    var c = g.tools.readCookie("__maitre-session-" + config.uuid) || RH.optin_data.id;
                    c && g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/verify_code", "POST", {
                        uuid: config.uuid, sub_id: c,
                        require_leaderboard: config.settings.sharing.leaderboard.show,
                        code: data.code,
                        verification_type: data.verification_type,
                        widget_type: widget_type
                    }, function (d) {
                        if("custom_redirect" == d.response || "custom_option_redirect" == d.response){
                            window.location.href = d.url;
                        }else if("subscriber_retrieved" == d.response){
                            if(data.widget == "signup"){
                                RH.optin_data = Maitre.optin_data = d.data, RH.response = Maitre.response = d.response
                                g.callbacks.post_success_msg({}, config, RH)
                            }else{
                                (RH.optin_data = Maitre.optin_data = d.data, RH.response = Maitre.response = d.response, RH.confirmation_links = d.confirmation_links, RH.device_recognized = RH.repeated_verification, g.tools.readCookie("__maitre-session-" + config.uuid) == null && g.tools.storeSignupCookie(!0, config, RH), !0 && g.sharing.open(config, RH), g.tools.applyMWR(d.data.code, config), config.settings.horizontal_banner.show && g.generate.horizontal_banner(config, RH), config.callbacks.hasOwnProperty("subscriberLoaded") && config.callbacks.subscriberLoaded(d.response, d.data), g.tools.trackVisitUrl(c, config, RH))
                            }
                        }else{
                            if("error" == d.response){
                                g.tools.eraseCookie("__maitre-session-" + config.uuid, config, RH)
                            }else{
                                mtid("mtr-form-submit-button").innerHTML = data.submit_text
                                var invalid_code = document.getElementById(`invalid-code${config.uuid}`)
                                if(invalid_code){
                                    var otpInputs = document.querySelectorAll(`#mtr-otp-container input[type="number"]`);
                                    otpInputs.forEach(function(input) {
                                        input.value = '';
                                    });

                                    invalid_code.style.display = "block"
                                    setTimeout(function(){
                                        invalid_code.style.display = "none" 
                                    }, 1000)
                                }
                            }
                        }
                    }, function (d) {
                        console.error(d)
                    });
                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.form.codeVerification 3142");
                    console.error("[ReferralHero] An unexpected error occurred in code verification:", err);
                }   
            }, regenerate: function (a, config, RH) {
                try{
                    a && (config = g.tools.extend(config, a));
                    a = g.generate.form(config, RH);
                    mtid(config.defaults.form_container_id).innerHTML = "";
                    mtid(config.defaults.form_container_id).appendChild(a)
                    mtid(config.defaults.form_container_id_two).innerHTML = "";
                    mtid(config.defaults.form_container_id_two).appendChild(a)
                    mtid(config.defaults.signup_form_container_id).innerHTML = "";
                    mtid(config.defaults.signup_form_container_id).appendChild(a);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.form.regenerate 3156");
                    console.error("[ReferralHero] An unexpected error occurred in method regenerate:", err);
                } 
            }
        };

        g.verification = {
            connectWallet: function(pr){
                try{
                    return pr == "phantom" ? g.verification.connectPhantom() : (pr == "coinbase" ? g.verification.connectCB(): (pr == "trust_wallet" ? g.verification.connectTW() : (pr == "metamask" ? g.verification.connectMM() : g.verification.connectWC())));
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.verification.connectWallet 3167");
                    console.error("[ReferralHero] An unexpected error occurred in method connectWallet:", err);
                } 
            },
            connectPhantom: async function(){
                try{
                    if(window.phantom) {
                        var provider = window.phantom?.solana;
                        await provider.connect()
                        var key = await provider.publicKey.toString()
                        return key
                    }else if(g.tools.mobileCheck()){
                        var url = encodeURIComponent(window.location.href);
                        var ref = encodeURIComponent(window.location.origin);
                        g.tools.isIOSDevice() ? window.location = "https://phantom.app/ul/browse/"+url+"?ref="+ref : window.location = "intent://phantom.app/ul/browse/"+url+"?ref="+ref+"#Intent;package=app.phantom;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end";
                    }
                    return 0;
                } catch (err) {
                    g.helpers.handleWalletError("Phantom", err, "g.verification.connectPhantom 3202");
                }
            },
            connectWC: async function() {
                try{
                    var provider = new WalletConnectProvider.default({
                        rpc: {
                            1: "https://cloudflare-eth.com/",
                            137: "https://polygon-rpc.com/",
                        },
                    });
                    await provider.enable();
                    const web3 = new Web3(provider);
                    window.w3 = web3
                    var accounts  = await web3.eth.getAccounts();
                    var key = accounts[0];
                    return key;
                } catch (err) {
                    g.helpers.handleWalletError("WC", err, "g.verification.connectWC 3220");
                }
            },
            connectMM: async function() {
                try{
                    if (window.ethereum) {
                        var provider = window.ethereum.isMetaMask ? window.ethereum : null;
                        if (window.ethereum.providers?.length) {
                            window.ethereum.providers.forEach(async (p) => {
                                if (p.isMetaMask && !p.isTrustWallet) provider = p;
                            });
                        }
                        if (provider == null) return 0;
                        await provider.request({method: "eth_requestAccounts"});
                        window.web3 = new Web3(provider)
                        var accounts  = await web3.eth.getAccounts();
                        var key = accounts[0];
                        return key
                    }else if(g.tools.mobileCheck() && !navigator.share){
                        var provider = new WalletConnectProvider.default({
                            rpc: {
                                1: "https://cloudflare-eth.com/",
                            }
                        });
                        await provider.enable();
                        window.w3 = new Web3(provider);
                        var accounts  = await web3.eth.getAccounts();
                        var key = accounts[0];
                        return key
                    }else if(g.tools.mobileCheck()){
                        var url = window.location.href.replace(window.location.protocol,"").slice(2);
                        g.tools.isIOSDevice() ? window.location = "https://metamask.app.link/dapp/"+url : window.location = "intent://metamask.app.link/dapp/"+url+"#Intent;package=io.metamask;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end";
                    }
                    return 0;
                } catch (err) {
                    g.helpers.handleWalletError("MM", err, "g.verification.connectMM 3255", ["No provider selected", "Request rejected", "Already processing eth_requestAccounts"]);
                }
            },
            connectCB: async function() {
                try{
                    if (window.ethereum) {
                        var provider = window.ethereum.isCoinbaseWallet ? window.ethereum : null;
                        if (window.ethereum.providers?.length) {
                            window.ethereum.providers.forEach(async (p) => {
                                if (p.isCoinbaseWallet) provider = p;
                            });
                        }
                        if (provider == null) return 0;
                        await provider.request({method: "eth_requestAccounts"});
                        window.web3 = new Web3(provider)
                        var accounts  = await web3.eth.getAccounts();
                        var key = accounts[0];
                        return key
                    }else if(g.tools.mobileCheck()){
                        var url = encodeURIComponent(window.location.href);
                        g.tools.isIOSDevice() ? window.location = "https://go.cb-w.com/dapp?cb_url="+url : window.location = "intent://go.cb-w.com/dapp?cb_url="+url+"#Intent;package=org.toshi;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end";
                    }
                    return 0;
                } catch (err) {
                    g.helpers.handleWalletError("CB", err, "g.verification.connectCB 3279");
                }
            },
            connectTW: async function() {
                try{
                    if (window.trustwallet) {
                        var provider = g.tools.mobileCheck() ? window.trustwallet.ethereum : window.trustwallet;
                        await provider.request({method: "eth_requestAccounts"});    
                        window.web3 = new Web3(provider)
                        var accounts  = await web3.eth.getAccounts();
                        var key = accounts[0];
                        return key
                    }else if(g.tools.mobileCheck() && !navigator.share){
                        var provider = new WalletConnectProvider.default({
                            rpc: {
                                1: "https://cloudflare-eth.com/"
                            }
                        });
                        await provider.enable();
                        window.web3 = new Web3(provider)
                        var accounts  = await web3.eth.getAccounts();
                        var key = accounts[0];
                        return key
                    }else if(g.tools.mobileCheck()){
                        var url = window.location.href;
                        g.tools.isIOSDevice() ? window.location = "https://link.trustwallet.com/open_url?coin_id=60&url="+url : window.location = "intent://link.trustwallet.com/open_url?coin_id=60&url="+url+"#Intent;package=com.wallet.crypto.trustapp;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end";
                    }
                    return 0;
                } catch (err) {
                    g.helpers.handleWalletError("TW", err, "g.verification.connectTW 3308");
                }
            }
        }

        g.sharing = {
            open: function (config, RH) {
                try{
                    console.log("SHARING OPEN");
                    var a = g.generate.sharing_screen(config, RH);
                    if(!a){
                        return false;
                    }
                    if(mtid("mtr-popup-container") && ( mtid("maitre-floating-button") || mtid(config.defaults.inline_button_container_id))){
                        mtid("mtr-popup-container").innerHTML = '';
                        mtid("mtr-popup-container").appendChild(a);
                    } 
                    else if (config.settings.sharing.popup) {
                        g.generate.popup(a, config)
                    } else {
                        var c = mtid(config.defaults.sharing_screen_container_id);
                        if (c) c.innerHTML = "", c.appendChild(a);
                        else if (c = mtid(config.defaults.form_container_id)) c.innerHTML = "", c.appendChild(a)
                        else if (c = mtid(config.defaults.form_container_id_two)) c.innerHTML = "", c.appendChild(a)
                        if (s = mtid(config.defaults.sharing_form_container_id)) s.innerHTML = "", s.appendChild(a)
                    }
                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.sharing.open 3323");
                    console.error("[ReferralHero] An unexpected error occurred in method sharing open:", err);
                }
            }, regenerate: function (a, config, RH) {
                try{
                    a && (config = g.tools.extend(config, a));
                    return g.generate.sharing_screen(config, RH);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.sharing.regenerate 3331");
                    console.error("[ReferralHero] An unexpected error occurred in method sharing regenerate:", err);
                }
            }
        };

        g.fields = {
            name_field: function (form, config) {
                try{
                    var e = mtg("input");
                        
                    e.id = "mtr-form-input-name";
                    e.setAttribute("type", "text");
                    e.setAttribute("name", "name");
                    form.name.required && e.setAttribute("required", "true");

                    e.style.color = form.input_field.color;
                    e.style.backgroundColor = form.input_field.background_color;
                    e.style.height = form.input_field.height;
                    e.style.borderColor = form.input_field.border_color;
                    e.style.borderWidth = form.input_field.border_width;
                    e.style.borderRadius = form.input_field.border_radius;
                    e.style.fontFamily = g.tools.findFont(form.input_field.font_family);
                    e.style.fontSize = form.input_field.font_size;
                    e.style.width = form.input_field.width;
                    e.style.marginBottom = form.input_field.distance;
                    e.setAttribute("placeholder",
                        form.name.placeholder);
                    e.addEventListener("focus", function () {
                        e.style.borderColor = config.settings.design.colors.primary
                    });
                    e.addEventListener("blur", function () {
                        e.style.borderColor = form.input_field.border_color;
                    });

                    return e;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.fields.name_field 3368");
                    console.error("[ReferralHero] An unexpected error occurred in method name_field:", err);
                }
            }, 
            phone_number: function (form, config) {
                try{
                    var ca = mtg("input");
                    ca.id = "mtr-form-input-phone";
                    ca.setAttribute("type", "tel");
                    ca.setAttribute("name", "phone_number");
                    form.phone_number.required && ca.setAttribute("required", "true");

                    ca.style.color = form.input_field.color;
                    ca.style.backgroundColor = form.input_field.background_color;
                    ca.style.height = form.input_field.height;
                    ca.style.borderColor = form.input_field.border_color;
                    ca.style.borderWidth = form.input_field.border_width;
                    ca.style.borderRadius = form.input_field.border_radius;
                    ca.style.fontFamily = g.tools.findFont(form.input_field.font_family);
                    ca.style.fontSize = form.input_field.font_size;
                    ca.addEventListener('invalid', () => { (ca.value === '') ?  ca.setCustomValidity('Enter phone number!') : ca.setCustomValidity(config.settings.alerts.invalid_phone_number || 'Invalid phone number') });
                    ca.setAttribute("placeholder", form.phone_number.placeholder);
                    ca.addEventListener("focus", function () {
                        ca.style.borderColor = config.settings.design.colors.primary
                    });
                    ca.addEventListener("blur", function () {
                        ca.style.borderColor = form.input_field.border_color;
                    });

                    return ca;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.fields.phone_number 3399");
                    console.error("[ReferralHero] An unexpected error occurred in method phone_number:", err);
                }
            },
            email: function (form, config) {
                try{
                    var u = mtg("input");
                    u.id = "mtr-form-input-email";
                    u.setAttribute("type", "email");
                    u.setAttribute("name", "email");
                    form.email.required && u.setAttribute("required", "true");
                    u.setAttribute("placeholder", form.email.placeholder);

                    u.style.color = form.input_field.color;
                    u.style.backgroundColor = form.input_field.background_color;
                    u.style.height = form.input_field.height;
                    u.style.borderColor = form.input_field.border_color;
                    u.style.borderWidth = form.input_field.border_width;
                    u.style.borderRadius = form.input_field.border_radius;
                    u.style.fontFamily = g.tools.findFont(form.input_field.font_family);
                    u.style.fontSize = form.input_field.font_size;
                    u.style.width = form.input_field.width;
                    u.style.marginBottom = form.input_field.distance;

                    u.addEventListener("focus", function () {
                        u.style.borderColor = config.settings.design.colors.primary
                    });
                    u.addEventListener("blur", function () {
                        u.style.borderColor = form.input_field.border_color;
                    });

                    return u;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.fields.email 3432");
                    console.error("[ReferralHero] An unexpected error occurred in method email:", err);
                }
            },
            country_field: function (form, config) {
                try{
                    var fci = mtg("select");
                    fci.setAttribute("name", "country_code");
                    fci.style.height = '43px';
                    fci.style.width = '100%';
                    fci.id = "mtr-form-input-country";
                    var countries = g.tools.countriesData();
                    countries.forEach(function (p) {
                        var option = mtg("option");
                        option.innerHTML = p.country;
                        option.setAttribute("data-select",p.country);
                        option.setAttribute("format",p.format);
                        option.setAttribute("code",p.code);
                        option.setAttribute("iso",p.iso);
                        option.value = "+" + p.code;
                        if (p.code == form.phone_number.country_code.substring(1)){
                            option.selected = 'selected'
                        }
                        fci.appendChild(option);
                    });
                    fci.options[fci.selectedIndex].innerHTML = fci.options[fci.selectedIndex].value;

                    fci.style.color = form.input_field.color;
                    fci.style.backgroundColor = form.input_field.background_color;
                    fci.style.height = form.input_field.height;
                    fci.style.borderColor = form.input_field.border_color;
                    fci.style.borderWidth = form.input_field.border_width;
                    fci.style.borderRadius = form.input_field.border_radius;
                    fci.style.fontFamily = g.tools.findFont(form.input_field.font_family);
                    fci.style.fontSize = form.input_field.font_size;
                    fci.style.marginBottom = form.input_field.distance;

                    fci.addEventListener('focus mouseleave', function () {
                        for (var focus_option of this.options){
                            focus_option.innerHTML = focus_option.getAttribute("data-select");
                        }
                        fci.style.borderColor = config.settings.design.colors.primary;
                    });
                    fci.addEventListener('blur', function () {
                        fci.style.borderColor = "#cccccc";
                    });

                    return fci;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.fields.country_field 3481");
                    console.error("[ReferralHero] An unexpected error occurred in method country_field:", err);
                }
            },
            other_identifier: function (form, config) {
                try{
                    var io = mtg("input");
                    io.id = "mtr-form-input-other-identifier";
                    io.setAttribute("type", "text");
                    io.setAttribute("name", "other_identifier");
                    io.setAttribute("required", "true");
                    io.setAttribute("placeholder", form.other_identifier.placeholder);

                    io.style.color = form.input_field.color;
                    io.style.backgroundColor = form.input_field.background_color;
                    io.style.height = form.input_field.height;
                    io.style.borderColor = form.input_field.border_color;
                    io.style.borderWidth = form.input_field.border_width;
                    io.style.borderRadius = form.input_field.border_radius;
                    io.style.fontFamily = g.tools.findFont(form.input_field.font_family);
                    io.style.fontSize = form.input_field.font_size;
                    io.style.width = form.input_field.width;
                    io.style.marginBottom = form.input_field.distance;

                    io.addEventListener("focus", function () {
                        io.style.borderColor = config.settings.design.colors.primary
                    });
                    io.addEventListener("blur", function () {
                        io.style.borderColor = form.input_field.border_color;
                    });

                    return io;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.fields.other_identifier 3514");
                    console.error("[ReferralHero] An unexpected error occurred in method other_identifier:", err);
                }
            },
            option_field: function (form, config) {
                try{
                    var oft = mtg("select");
                    oft.id = "mtr-form-select-option-field";
                    oft.className = "mtr-form-field";
                    oft.setAttribute("name", "option_field");
                    oft.setAttribute("type", "text");
                    oft.setAttribute("name", "option_field");
                    form.option_field.required && oft.setAttribute("required", "true");

                    oft.style.color = form.input_field.color;
                    oft.style.backgroundColor = form.input_field.background_color;
                    oft.style.height = form.input_field.height;
                    oft.style.borderColor = form.input_field.border_color;
                    oft.style.borderWidth = form.input_field.border_width;
                    oft.style.borderRadius = form.input_field.border_radius;
                    oft.style.fontFamily = g.tools.findFont(form.input_field.font_family);
                    oft.style.fontSize = form.input_field.font_size;
                    oft.style.width = form.input_field.width;
                    oft.style.marginBottom = form.input_field.distance;

                    var oft_values = form.option_field.options
                    
                    //oft.addEventListener('focus', function () {
                    //    oft.style.borderColor = config.settings.design.colors.primary;
                    //});
                    
                    oft.addEventListener('blur', function () {
                        oft.style.borderColor = form.input_field.border_color;
                    });
                    
                    if (form.option_field.placeholder){
                        var option = mtg("option");                        
                        option.value = ""
                        option.text = form.option_field.placeholder
                        oft.appendChild(option);
                        option.disabled = form.option_field.required;
                    }

                    for (var i = 0; i < oft_values.length; i++){
                        var val = oft_values[i];
                        var option = mtg("option");                        
                        option.value = val;
                        option.text = val;
                        oft.appendChild(option);

                        option.id = "option_"+val+1;
                    };

                    return oft;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.fields.option_field 3569");
                    console.error("[ReferralHero] An unexpected error occurred in method option_field:", err);
                }
            },
            tags_field: function (form, config) {
                try{
                    var oft = mtg("select");
                    oft.id = "mtr-form-select-option-field";
                    oft.className = "mtr-form-field";
                    oft.setAttribute("name", "tags_field");
                    oft.setAttribute("type", "text");
                    oft.setAttribute("name", "tags_field");
                    form.tags_field.required && oft.setAttribute("required", "true");

                    oft.style.color = form.input_field.color;
                    oft.style.backgroundColor = form.input_field.background_color;
                    oft.style.height = form.input_field.height;
                    oft.style.borderColor = form.input_field.border_color;
                    oft.style.borderWidth = form.input_field.border_width;
                    oft.style.borderRadius = form.input_field.border_radius;
                    oft.style.fontFamily = g.tools.findFont(form.input_field.font_family);
                    oft.style.fontSize = form.input_field.font_size;
                    oft.style.width = form.input_field.width;
                    oft.style.marginBottom = form.input_field.distance;

                    var oft_values = form.tags_field.options
                    
                    //oft.addEventListener('focus', function () {
                    //    oft.style.borderColor = config.settings.design.colors.primary;
                    //});
                    
                    oft.addEventListener('blur', function () {
                        oft.style.borderColor = form.input_field.border_color;
                    });
                    
                    if (form.tags_field.placeholder){
                        var option = mtg("option");                        
                        option.value = ""
                        option.text = form.tags_field.placeholder
                        oft.appendChild(option);
                        option.disabled = form.tags_field.required;
                    }

                    for (var i = 0; i < oft_values.length; i++){
                        var val = oft_values[i];
                        var option = mtg("option");                        
                        option.value = val;
                        option.text = val;
                        oft.appendChild(option);

                        option.id = "option_"+val+1;
                    };

                    return oft;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.fields.tags_field 3624");
                    console.error("[ReferralHero] An unexpected error occurred in method tags_field:", err);
                }
            },
            address_field: function(form, config) {
                try {
                    var ad = mtg("div");
                    ad.id = "mtr-form-address-field";
                    ad.className = "mtr-form-field";
                    ad.style.display = "flex";
                    ad.style.justifyContent = form.input_field.alignment;

                    var adr = mtg("input");
                    adr.id = "mtr-form-input-address";
                    adr.setAttribute("type", "text");
                    adr.setAttribute("name", "address");
                    form.address.required && adr.setAttribute("required", "true");
                    adr.setAttribute("placeholder", form.address.placeholder);

                    // Styles
                    var inputStyle = form.input_field;
                    adr.style.color = inputStyle.color;
                    adr.style.backgroundColor = inputStyle.background_color;
                    adr.style.height = inputStyle.height;
                    adr.style.borderColor = inputStyle.border_color;
                    adr.style.borderWidth = inputStyle.border_width;
                    adr.style.borderRadius = inputStyle.border_radius;
                    adr.style.fontFamily = g.tools.findFont(inputStyle.font_family);
                    adr.style.fontSize = inputStyle.font_size;
                    adr.style.width = inputStyle.width;
                    adr.style.marginBottom = inputStyle.distance;

                    if (config.defaults.hasOwnProperty("address")) {
                        adr.setAttribute("value", config.defaults.address);
                    }

                    var suggestionBox = mtg("div"); 
                    suggestionBox.className = "mtr-address-suggestions"; 
                    var inputWidth = parseInt(inputStyle.width, 10);
                    suggestionBox.style.width = Math.max(inputWidth - 20, 20) + "%";
                    suggestionBox.style.display = "none"; 
                    ad.appendChild(suggestionBox);

                    // Debounce typing
                    var debounceTimer;
                    adr.addEventListener("input", function () {
                        var query = adr.value.trim();
                        clearTimeout(debounceTimer);
                        if (query.length < 3) {
                            suggestionBox.style.display = "none";
                            return;
                        }
                        debounceTimer = setTimeout(function () {
                            var url = g.tools.getWidgetUrl(config) + "/address_prepopulate?q=" + encodeURIComponent(query);
                            g.tools.asyncRequest.request(url, "GET", {}, function(response) {
                                suggestionBox.innerHTML = "";
                                var suggestions = [];
                                try {
                                    suggestions = Array.isArray(response) ? response : JSON.parse(response);
                                } catch (err) {
                                    console.error("Invalid suggestions response:", err, response);
                                    suggestionBox.style.display = "none";
                                    return;
                                }
                                if (suggestions.length) {
                                    suggestions.forEach(function(s) {
                                        var opt = mtg("div");
                                        opt.className = "mtr-address-suggestion";
                                        opt.textContent = s;
                                        opt.addEventListener("mouseenter", function() {
                                            opt.style.backgroundColor = "#e0f0ff"; 
                                        });
                                        opt.addEventListener("mouseleave", function() {
                                            opt.style.backgroundColor = "transparent"; 
                                        });
                                        opt.addEventListener("click", function() {
                                            adr.value = s;
                                            suggestionBox.style.display = "none";
                                        });
                                        suggestionBox.appendChild(opt);
                                    });
                                    suggestionBox.style.display = "block";
                                } else {
                                    suggestionBox.style.display = "none";
                                }
                            }, function(error) {
                                console.error("Address autocomplete request failed:", error);
                            });
                        }, 300); // debounce 300ms
                    });

                    adr.addEventListener("focus", function () {
                        adr.style.borderColor = config.settings.design.colors.primary;
                    });
                    adr.addEventListener("blur", function () {
                        setTimeout(function () {
                            suggestionBox.style.display = "none";
                        }, 200);
                        adr.style.borderColor = form.input_field.border_color;
                    });

                    ad.appendChild(adr);

                    // RETURN both ad and adr
                    return { wrapper: ad, input: adr };

                } catch (err) {
                    g.tools.sendErrorNotification(err, "g.fields.address_field 3731");
                    console.error("[ReferralHero] An unexpected error occurred in method address_field:", err);
                }
            },
            extra_field: function (form) {
                
            }
        };

        g.generate = {
            stylesheet: function (a) {
                try{
                    var c = mtg("style");
                    c.type = "text/css";
                    c.innerHTML = a;
                    document.getElementsByTagName("head")[0].appendChild(c);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.stylesheet 3748");
                    console.error("[ReferralHero] An unexpected error occurred in method generate stylesheet:", err);
                }
            }, linkStylesheet: function(a) {
                try{
                    var c = mtg("link");
                    c.rel = "stylesheet";
                    c.type="text/css";
                    c.href = a;
                    document.getElementsByTagName("head")[0].appendChild(c);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.linkStylesheet 3759");
                    console.error("[ReferralHero] An unexpected error occurred in method linkStylesheet:", err);
                }
            }, form: function (config, RH, check_status_widget = false) {
                try{
                    var a =
                        mtg("div");
                    a.id = "mtr-optin-form";
                    a.classList.add(`mtr-custom-css-${config.uuid}`);
                    if(config.settings.sharing.open_if_signed_up && g.tools.readCookie("__maitre-session-" + config.uuid) ){
                        a.style.display = "none";
                    }
                    a.style.borderRadius = config.settings.form.form_border.radius;
                    if(config.settings.form.form_border.shadow == true){
                        a.style.boxShadow = `0 0px 12px ${config.settings.form.form_border.color}`
                    }
                    if(config.settings.form.widget_width) {
                        a.style.maxWidth = '95%';
                        a.style.width = !g.tools.mobileCheck() ? config.settings.form.widget_width : '98%';
                    }
                    var c = mtg("form");
                    c.id = "mtr-form";
                    c.setAttribute("method", "POST");
                    c.setAttribute("autocomplete", "off");
                    c.setAttribute("action", "#");
                    c.style.borderTopColor = config.settings.form.border;
                    c.style.borderStyle = config.settings.form.form_border.style;
                    c.style.borderWidth = config.settings.form.form_border.width;
                    c.style.borderRadius = config.settings.form.form_border.radius;
                    c.style.borderColor = config.settings.form.form_border.color;
                    c.style.padding = config.settings.form.widget_padding;

                    if (!isEmpty(config.settings.form.designer_settings)){
                        if (config.settings.form.background.enable_color){
                            c.style.backgroundColor = config.settings.form.background.color;
                        }
                        else if (null != config.settings.form.background.image && "" != config.settings.signup_widget_form.background.image) {
                            c.style.backgroundImage = "url('" + config.settings.form.background.image + "')";
                            c.style.backgroundSize = config.settings.form.background.image_size;
                        }
                    }
                    else if (null != config.settings.form.cover && "" != config.settings.signup_widget_form.cover) {
                        var d = mtg("div");
                        d.id = "mtr-form-cover";
                        d.style.backgroundImage = "url('" + config.settings.form.cover + "')";
                        c.appendChild(d)
                    }
                    config.settings.recaptcha.enable && (d = mtg("div"), d.id = "RHCaptcha", c.appendChild(d));
                    var vr = mtg("div");
                    vr.id="mtr-optin-verification-container"
                    c.appendChild(vr);
                    d = mtg("div");
                    d.id = "mtr-form-fields";
                    if (config.settings.form.name.require) {
                        var f = mtg("div");
                        f.id = "mtr-form-field-name";
                        f.className = "mtr-form-field";

                        var e = g.fields.name_field(config.settings.form, config);

                        f.style.display = "flex";
                        f.style.justifyContent = config.settings.form.input_field.alignment;

                        config.defaults.hasOwnProperty("name") && e.setAttribute("value", config.defaults.name);
                        f.appendChild(e);
                    }
                    if (config.settings.form.email.require) {
                        var te = mtg("div");
                        te.id = "mtr-form-field-email";
                        te.className = "mtr-form-field";

                        var u = g.fields.email(config.settings.form, config);
                        
                        te.style.display = "flex";
                        te.style.justifyContent = config.settings.form.input_field.alignment;
                        config.defaults.hasOwnProperty("email") && u.setAttribute("value", config.defaults.email);
                        te.appendChild(u);
                    }
                    if (config.settings.form.phone_number.require) {
                        var fpn = mtg("div");
                        fpn.className = "mtr-flex phone-num-row";
                        var o = mtg("div");
                        o.id = "mtr-form-field-phone";
                        o.className = "mtr-form-field";
                        
                        var ca = g.fields.phone_number(config.settings.form, config);

                        ca.addEventListener('input', () =>{
                            ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                            ca.setCustomValidity('');
                        });

                        o.style.width = config.settings.form.input_field.width.slice(0, -1)*0.7 + '%';
                        o.style.marginBottom = config.settings.form.input_field.distance;
                        fpn.style.justifyContent = config.settings.form.input_field.alignment;

                        config.defaults.hasOwnProperty("phone_number") && ca.setAttribute("value", config.defaults.name);
                        o.appendChild(ca);

                        // Country code field

                        var fc = mtg("div");
                        fc.id = "mtr-form-field-country";
                        fc.className = "mtr-form-field";
                        fc.style.maxWidth = "30%";
                        fc.style.width = "30%";

                        var fci = g.fields.country_field(config.settings.form, config);

                        fc.appendChild(fci);
                        fpn.appendChild(fc);
                        fpn.appendChild(o);
                        fci.onchange = function() {
                            for (var selected_option of this.options){
                                selected_option.innerHTML = selected_option.getAttribute("data-select");
                                ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                                ca.setCustomValidity('');
                            }
                            this.options[this.selectedIndex].innerHTML = this.options[this.selectedIndex].value 
                            this.blur();
                        }
                    }
                    if (config.settings.form.crypto_wallet_address.require) {
                        var cw = mtg("div");
                        cw.id = "mtr-form-field-crypto-wallet";
                        cw.className = "mtr-form-field";
                        var ci = mtg("input");
                        ci.id = "mtr-form-input-crypto-wallet";
                        ci.setAttribute("type", "text");
                        ci.setAttribute("name", "crypto_wallet_address");
                        !config.settings.sharing.verification.crypto_wallet_confirmation && config.settings.form.crypto_wallet_address.required && ci.setAttribute("required", "true");
                        ci.setAttribute("placeholder", config.settings.form.crypto_wallet_address.placeholder);

                        ci.style.color = config.settings.form.input_field.color;
                        ci.style.backgroundColor = config.settings.form.input_field.background_color;
                        ci.style.height = config.settings.form.input_field.height;
                        ci.style.borderColor = config.settings.form.input_field.border_color;
                        ci.style.borderWidth = config.settings.form.input_field.border_width;
                        ci.style.borderRadius = config.settings.form.input_field.border_radius;
                        ci.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        ci.style.fontSize = config.settings.form.input_field.font_size;
                        ci.style.width = config.settings.form.input_field.width;
                        ci.style.marginBottom = config.settings.form.input_field.distance;
                        cw.style.display = "flex";
                        cw.style.justifyContent = config.settings.form.input_field.alignment;

                        ci.addEventListener("focus", function () {
                            ci.style.borderColor = config.settings.design.colors.primary
                        });
                        ci.addEventListener("blur", function () {
                            ci.style.borderColor = config.settings.form.input_field.border_color;

                        });
                        config.defaults.hasOwnProperty("crypto_wallet_address") && ci.setAttribute("value", config.defaults.name);
                        cw.appendChild(ci)

                        var cp = mtg("div");
                        cp.id = "mtr-form-field-crypto-wallet-provider";
                        var cpi = mtg("button");
                        cpi.className = "mtr-form-field";
                        cpi.id = "mtr-form-provider-connect";
                        cpi.setAttribute("type", "button");
                        cpi.innerHTML = config.settings.form.crypto_wallet_provider.placeholder;
                        cpi.setAttribute("name","crypto_wallet_provider");
                        cpi.value = "";

                        cpi.style.color = config.settings.form.input_field.color;
                        cpi.style.backgroundColor = config.settings.form.input_field.background_color;
                        cpi.style.height = config.settings.form.input_field.height;
                        cpi.style.borderColor = config.settings.form.input_field.border_color;
                        cpi.style.borderWidth = config.settings.form.input_field.border_width;
                        cpi.style.borderRadius = config.settings.form.input_field.border_radius;
                        cpi.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        cpi.style.fontSize = config.settings.form.input_field.font_size;
                        cpi.style.width = config.settings.form.input_field.width;
                        cpi.style.marginBottom = config.settings.form.input_field.distance;
                        cp.style.display = "flex";
                        cp.style.justifyContent = config.settings.form.input_field.alignment;

                        var sel = mtg("div");
                        sel.id = "provider-list"
                        sel.className = "provider-list-content"
                        config.settings.form.providers.forEach(function (p) {
                            var a = mtg("a");
                            a.className = p;
                            a.setAttribute("value", p);
                            a.innerHTML = toTitleCase(p.replace("_", " "));
                            a.onclick = async function(){    
                            cpi.value = p ;
                            cpi.innerText = toTitleCase(p.replace("_", " "));
                                var pr = cpi.value
                                if (pr){
                                    var key = await g.verification.connectWallet(pr);
                                    if ( key ){
                                        ci.value = key;
                                        cpi.style.borderColor = "#5cb85c"
                                        vr.innerHTML = "";
                                        vr.style.padding = "";
                                        cpi.innerText = toTitleCase(p.replace("_", " ")) + " Successfully Connected!";
                                        cpi.classList.add(pr);
                                        cpi.style.backgroundPosition = "25px 7px";
                                        cpi.style.textAlign = "center";
                                    } 
                                    else {
                                        ci.value = "";
                                        cpi.style.borderColor = "#d9534f";
                                        cpi.classList.remove('metamask', 'phantom', 'wallet_connect', 'coinbase');
                                        cpi.style.textAlign = "left";
                                        vr.style.padding = "0.55em"
                                        vr.innerHTML = "<p id='mtr-sharing-verification'>Connect Wallet Failed. Please make sure you have the " + toTitleCase(pr.replace("_", " ")) + " wallet extension installed. <a href='" + g.generate.cryptoWalletExtensionLink(pr) + "' target='_blank'> Install here.</a></p>"
                                    }
                                }
                                else{ 
                                    alert_or_console("Please select valid crypto provider")
                                }
                            };
                            sel.appendChild(a);
                            
                        });
                        config.defaults.hasOwnProperty("crypto_wallet_provider") && ci.setAttribute("value", config.defaults.name);
                        cp.appendChild(cpi);
                        cp.appendChild(sel);
                        
                        if (config.settings.sharing.verification.crypto_wallet_confirmation){
                            cpi.onclick = function() {
                                sel.classList.toggle("show");
                            }

                            window.onclick = function(event) {
                                if (!event.target.matches('#mtr-form-provider-connect')) {
                                    var dropdowns = document.getElementsByClassName("provider-list-content");
                                    var i;
                                    for (i = 0; i < dropdowns.length; i++) {
                                    var openDropdown = dropdowns[i];
                                    if (openDropdown.classList.contains('show')) {
                                        openDropdown.classList.remove('show');
                                    }
                                    }
                                }
                            }
                            ci.style.display = "none";
                            cw.style.margin = "0px";
                            
                        }
                    }
                    if (config.settings.form.other_identifier.require) {
                        var oi = mtg("div");
                        oi.id = "mtr-form-field-other-identifier";
                        oi.className = "mtr-form-field";
                        oi.style.display = "flex";
                        oi.style.justifyContent = config.settings.form.input_field.alignment;

                        var io = g.fields.other_identifier(config.settings.form, config);

                        config.defaults.hasOwnProperty("other_identifier") && u.setAttribute("value", config.defaults.other_identifier);
                        oi.appendChild(io);
                    }
                    if (config.settings.form.address.require) {
                        var field = g.fields.address_field(config.settings.form, config);
                        var adr = field.input;
                        var ad = field.wrapper;
                    }
                    if (config.settings.form.extra_field.require) {
                        var k = mtg("div");
                        k.id = "mtr-form-field-extra";
                        k.className = "mtr-form-field";
                        var h = mtg("input");
                        h.id = "mtr-form-input-extra-field";
                        h.setAttribute("type", "text");
                        h.setAttribute("name", "extra_field");
                        config.settings.form.extra_field.required && h.setAttribute("required", "true");
                        h.setAttribute("placeholder", config.settings.form.extra_field.placeholder);

                        h.style.color = config.settings.form.input_field.color;
                        h.style.backgroundColor = config.settings.form.input_field.background_color;
                        h.style.height = config.settings.form.input_field.height;
                        h.style.borderColor = config.settings.form.input_field.border_color;
                        h.style.borderWidth = config.settings.form.input_field.border_width;
                        h.style.borderRadius = config.settings.form.input_field.border_radius;
                        h.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        h.style.fontSize = config.settings.form.input_field.font_size;
                        h.style.width = config.settings.form.input_field.width;
                        h.style.marginBottom = config.settings.form.input_field.distance;
                        k.style.display = "flex";
                        k.style.justifyContent = config.settings.form.input_field.alignment;

                        h.addEventListener("focus", function () {
                            h.style.borderColor = config.settings.design.colors.primary
                        });
                        h.addEventListener("blur", function () {
                            h.style.borderColor = config.settings.form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("extra_field") &&
                        h.setAttribute("value", config.defaults.extra_field);
                        k.appendChild(h)
                    }
                    if (config.settings.form.extra_field_2.require) {
                        var n = mtg("div");
                        n.id = "mtr-form-field-extra-2";
                        n.className = "mtr-form-field";
                        var l = mtg("input");
                        l.id = "mtr-form-input-extra-field-2";
                        l.setAttribute("type", "text");
                        l.setAttribute("name", "extra_field_2");
                        config.settings.form.extra_field_2.required && l.setAttribute("required", "true");
                        l.setAttribute("placeholder", config.settings.form.extra_field_2.placeholder);

                        l.style.color = config.settings.form.input_field.color;
                        l.style.backgroundColor = config.settings.form.input_field.background_color;
                        l.style.height = config.settings.form.input_field.height;
                        l.style.borderColor = config.settings.form.input_field.border_color;
                        l.style.borderWidth = config.settings.form.input_field.border_width;
                        l.style.borderRadius = config.settings.form.input_field.border_radius;
                        l.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        l.style.fontSize = config.settings.form.input_field.font_size;
                        l.style.width = config.settings.form.input_field.width;
                        l.style.marginBottom = config.settings.form.input_field.distance;
                        n.style.display = "flex";
                        n.style.justifyContent = config.settings.form.input_field.alignment;

                        l.addEventListener("focus", function () {
                            l.style.borderColor = config.settings.design.colors.primary
                        });
                        l.addEventListener("blur", function () {
                            l.style.borderColor = config.settings.form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("extra_field_2") && l.setAttribute("value", config.defaults.extra_field_2);
                        n.appendChild(l)
                    }
                    if (config.settings.form.extra_field_3.require) {
                        var n3 = mtg("div");
                        n3.id = "mtr-form-field-extra-3";
                        n3.className = "mtr-form-field";
                        var l3 = mtg("input");
                        l3.id = "mtr-form-input-extra-field-3";
                        l3.setAttribute("type", "text");
                        l3.setAttribute("name", "extra_field_3");
                        config.settings.form.extra_field_3.required && l3.setAttribute("required", "true");
                        l3.setAttribute("placeholder", config.settings.form.extra_field_3.placeholder);

                        l3.style.color = config.settings.form.input_field.color;
                        l3.style.backgroundColor = config.settings.form.input_field.background_color;
                        l3.style.height = config.settings.form.input_field.height;
                        l3.style.borderColor = config.settings.form.input_field.border_color;
                        l3.style.borderWidth = config.settings.form.input_field.border_width;
                        l3.style.borderRadius = config.settings.form.input_field.border_radius;
                        l3.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        l3.style.fontSize = config.settings.form.input_field.font_size;
                        l3.style.width = config.settings.form.input_field.width;
                        l3.style.marginBottom = config.settings.form.input_field.distance;
                        n3.style.display = "flex";
                        n3.style.justifyContent = config.settings.form.input_field.alignment;

                        l3.addEventListener("focus", function () {
                            l3.style.borderColor = config.settings.design.colors.primary
                        });
                        l3.addEventListener("blur", function () {
                            l3.style.borderColor = config.settings.form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("extra_field_3") && l3.setAttribute("value", config.defaults.extra_field_3);
                        n3.appendChild(l3)
                    }
                    if (config.settings.form.extra_field_4.require) {
                        var n4 = mtg("div");
                        n4.id = "mtr-form-field-extra-4";
                        n4.className = "mtr-form-field";
                        var l4 = mtg("input");
                        l4.id = "mtr-form-input-extra-field-4";
                        l4.setAttribute("type", "text");
                        l4.setAttribute("name", "extra_field_4");
                        config.settings.form.extra_field_4.required && l4.setAttribute("required", "true");
                        l4.setAttribute("placeholder", config.settings.form.extra_field_4.placeholder);

                        l4.style.color = config.settings.form.input_field.color;
                        l4.style.backgroundColor = config.settings.form.input_field.background_color;
                        l4.style.height = config.settings.form.input_field.height;
                        l4.style.borderColor = config.settings.form.input_field.border_color;
                        l4.style.borderWidth = config.settings.form.input_field.border_width;
                        l4.style.borderRadius = config.settings.form.input_field.border_radius;
                        l4.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        l4.style.fontSize = config.settings.form.input_field.font_size;
                        l4.style.width = config.settings.form.input_field.width;
                        l4.style.marginBottom = config.settings.form.input_field.distance;
                        n4.style.display = "flex";
                        n4.style.justifyContent = config.settings.form.input_field.alignment;

                        l4.addEventListener("focus", function () {
                            l4.style.borderColor = config.settings.design.colors.primary
                        });
                        l4.addEventListener("blur", function () {
                            l4.style.borderColor = config.settings.form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("extra_field_4") && l4.setAttribute("value", config.defaults.extra_field_4);
                        n4.appendChild(l4)
                    }
                    if (config.settings.form.option_field.require) {
                        var of = mtg("div");
                        of.id = "mtr-form-option-field";
                        of.className = "mtr-form-field";
                        of.style.display = "flex";
                        of.style.justifyContent = config.settings.form.input_field.alignment;

                        var oft = g.fields.option_field(config.settings.form, config);

                        config.defaults.hasOwnProperty("option_field") && oft.setAttribute("value", config.defaults.option_field);
                        of.appendChild(oft);
                    };

                    if (config.settings.form.tags_field.require) {
                        var tf = mtg("div");
                        tf.id = "mtr-form-option-field";
                        tf.className = "mtr-form-field";
                        tf.style.display = "flex";
                        tf.style.justifyContent = config.settings.form.input_field.alignment;

                        var tft = g.fields.tags_field(config.settings.form, config);

                        config.defaults.hasOwnProperty("tags_field") && tft.setAttribute("value", config.defaults.tags_field);
                        tf.appendChild(tft);
                    };

                    var st = mtg("div");
                    st.className = "mtr-form-field";
                    st.style.justifyContent = 'center';

                    var y = mtg("div");
                    y.id = "mtr-form-field-submit";
                    y.className = "mtr-form-field";
                    var p = mtg("button");
                    p.id = "mtr-form-submit-button";
                    p.setAttribute("type", "submit");
                    p.innerHTML = config.settings.form.submit_button.text;
                    p.style.backgroundColor = config.settings.form.submit_button.color;
                    p.style.color = config.settings.form.submit_button.label_color;
                    p.style.width = '100%';
                    p.style.borderRadius = config.settings.form.submit_button.corner_roundness;
                    p.style.fontSize = config.settings.form.submit_button.font_size;
                    p.style.height = config.settings.form.submit_button.height;
                    p.style.fontWeight = config.settings.form.submit_button.bold ? 'bolder' : 'normal';
                    p.style.textDecoration = config.settings.form.submit_button.underline ? 'underline' : 'none';
                    p.style.fontStyle = config.settings.form.submit_button.italic ? 'italic' : 'none';
                    p.style.fontFamily = g.tools.findFont(config.settings.form.submit_button.font_family);

                    y.appendChild(p);
                    if (config.settings.form.terms_conditions.require) {
                        var form_tc1 = mtg("div");
                        form_tc1.style.width = config.settings.form.input_field.width;
                        var v = mtg("div");
                        v.id = "mtr-form-field-tc";
                        v.className = "mtr-form-field";
                        if (config.settings.form.input_field.alignment === "center") {
                        form_tc1.style.margin = "0 auto";
                        } else if (config.settings.form.input_field.alignment === "flex-end") {
                        form_tc1.style.marginLeft = "auto";
                        }
                        //v.style.justifyContent = config.settings.form.input_field.alignment;

                        var x = mtg("input");
                        x.id = "mtr-form-tc-checkbox";
                        x.setAttribute("type", "checkbox");
                        x.setAttribute("name", "terms");
                        
                        var A = mtg("label");
                        A.id = "mtr-form-tc-text";
                        A.setAttribute("for", "mtr-form-tc-checkbox");
                        A.innerHTML = config.settings.form.terms_conditions.text;
                        A.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        A.style.color = config.settings.form.input_field.color;
                        A.style.display = "inline-block"
                        const bgColor = config.settings.form.background.color.toLowerCase();
                        const inputBorder = config.settings.form.input_field.border_color.toLowerCase();
                        let borderColor;
                        if (bgColor === "#ffffff" && (inputBorder === "#ffffff" || inputBorder === "#fff")) {
                            borderColor = "#2c3e50";
                        } else {
                            borderColor = config.settings.form.input_field.border_color;
                        }
                        const oldStyle = document.getElementById('dynamic-tc-before-style');
                        if (oldStyle) oldStyle.remove();
                        
                        const style = document.createElement('style');
                        style.id = 'dynamic-tc-before-style';
                        style.textContent = `
                        #mtr-form-tc-text::before {
                            border-color: ${borderColor} !important;
                        }
                        `;
                        document.head.appendChild(style);

                        var tcUrl = config.settings.form.terms_conditions.url;
                        if (tcUrl && tcUrl.trim() !== "") {
                        var z = mtg("a");
                        z.id = "mtr-form-tc-link";
                        z.setAttribute("href", tcUrl);
                        z.setAttribute("target", "_blank");
                        z.style.position = "relative";
                        z.style.zIndex = "10"
                        z.innerText = "\ud83d\udd17";
                        A.appendChild(z);
                        }
                        A.appendChild(document.createTextNode("\u00A0\u00A0"));

                        var A2 = mtg("span");
                        A2.innerHTML = config.settings.form.terms_conditions.text2;
                        A2.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        A2.style.color = config.settings.form.input_field.color;
                        A2.style.display = "inline-block"
                        A.appendChild(A2);

                        var tcUrl2 = config.settings.form.terms_conditions.url2;
                        if (tcUrl2 && tcUrl2.trim() !== "") {
                        var z2 = mtg("a");
                        z2.id = "mtr-form-tc-link";
                        z2.setAttribute("href", tcUrl2);
                        z2.setAttribute("target", "_blank");
                        z2.style.position = "relative";
                        z2.style.zIndex = "10"
                        z2.innerText = "\ud83d\udd17";
                        A.appendChild(z2);
                        }

                        v.appendChild(x);
                        v.appendChild(A);
                        form_tc1.appendChild(v);
                    }

                    if (config.settings.form.terms_conditions_2.require) {
                        var form_tc2 = mtg("div");
                        form_tc2.style.width = config.settings.form.input_field.width;
                        if (config.settings.form.input_field.alignment === "center") {
                        form_tc2.style.margin = "0 auto";
                        } else if (config.settings.form.input_field.alignment === "flex-end") {
                        form_tc2.style.marginLeft = "auto";
                        }
                        form_tc2.style.marginBottom = "10px";
                        var vc = mtg("div");
                        vc.id = "mtr-form-field-tc-2";
                        vc.className = "mtr-form-field";
                        // vc.style.justifyContent = config.settings.form.input_field.alignment;

                        var xc = mtg("input");
                        xc.id = "mtr-form-tc-checkbox-2";
                        xc.setAttribute("type", "checkbox");
                        xc.setAttribute("name", "terms2");
                        
                        var Ac = mtg("label");
                        Ac.id = "mtr-form-tc-text-2";
                        Ac.setAttribute("for", "mtr-form-tc-checkbox-2");
                        Ac.innerHTML = config.settings.form.terms_conditions_2.text;
                        Ac.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        Ac.style.color = config.settings.form.input_field.color;
                        const bgColor = config.settings.form.background.color.toLowerCase();
                        const inputBorder = config.settings.form.input_field.border_color.toLowerCase();
                        let borderColor;
                        if (bgColor === "#ffffff" && (inputBorder === "#ffffff" || inputBorder === "#fff")) {
                            borderColor = "#2c3e50";
                        } else {
                            borderColor = config.settings.form.input_field.border_color;
                        }
                        const oldStyle = document.getElementById('dynamic-tc-before-style-2');
                        if (oldStyle) oldStyle.remove();
                        
                        const style = document.createElement('style');
                        style.id = 'dynamic-tc-before-style-2';
                        style.textContent = `
                        #mtr-form-tc-text-2::before {
                            border-color: ${borderColor} !important;
                        }
                        `;
                        document.head.appendChild(style);

                        vc.appendChild(xc);
                        vc.appendChild(Ac);
                        form_tc2.appendChild(vc);
                    }

                    //appending fields according to form field positions
                    if (config.settings.form.field_positions){
                        var field_positions = config.settings.form.field_positions.split(" ");
                        field_positions = field_positions.filter(function(str) {
                            return /\S/.test(str);
                        });
                        for (var field_name of field_positions){
                            switch(field_name){
                                case "name":
                                    config.settings.form.name.require && d.appendChild(f);
                                    break;
                                case "email":
                                    config.settings.form.email.require && d.appendChild(te);
                                    break;
                                case "phone":
                                    config.settings.form.phone_number.require && d.appendChild(fpn);
                                    break;
                                case "crypto":
                                    config.settings.form.crypto_wallet_address.require && d.appendChild(cw);
                                    config.settings.form.crypto_wallet_address.require && config.settings.sharing.verification.crypto_wallet_confirmation && d.appendChild(cp);
                                    break;
                                case "other":
                                    config.settings.form.other_identifier.require && d.appendChild(oi);
                                    break;
                                case "address":
                                    config.settings.form.address.require && d.appendChild(ad);
                                    break;
                                case "extra1":
                                    config.settings.form.extra_field.require && d.appendChild(k);
                                    break;
                                case "extra2":
                                    config.settings.form.extra_field_2.require && d.appendChild(n);
                                    break;
                                case "extra3":
                                    config.settings.form.extra_field_3.require && d.appendChild(n3);
                                    break;
                                case "extra4":
                                    config.settings.form.extra_field_4.require && d.appendChild(n4);
                                    break;
                                case "options":
                                    config.settings.form.option_field.require && d.appendChild(of);
                                    break;
                                case "tags":
                                    config.settings.form.tags_field.require && d.appendChild(tf);
                                    break;
                            }
                        }
                    }else{
                        config.settings.form.name.require && d.appendChild(f);
                        config.settings.form.email.require && d.appendChild(te);
                        config.settings.form.phone_number.require && d.appendChild(fpn);
                        config.settings.form.crypto_wallet_address.require && d.appendChild(cw);
                        config.settings.form.crypto_wallet_address.require && config.settings.sharing.verification.crypto_wallet_confirmation && d.appendChild(cp);
                        config.settings.form.other_identifier.require && d.appendChild(oi);
                        config.settings.form.address.require && d.appendChild(ad);
                        config.settings.form.extra_field.require && d.appendChild(k);
                        config.settings.form.extra_field_2.require && d.appendChild(n);
                        config.settings.form.extra_field_3.require && d.appendChild(n3);
                        config.settings.form.extra_field_4.require && d.appendChild(n4);
                        config.settings.form.option_field.require && d.appendChild(of);
                        config.settings.form.tags_field.require && d.appendChild(tf);
                    }
                    config.settings.form.terms_conditions.require && d.appendChild(form_tc1);
                    config.settings.form.terms_conditions_2.require && d.appendChild(form_tc2);
                    var button_container = mtg('div');
                    button_container.style.width = config.settings.form.submit_button.width;
                    button_container.style.display = "flex";
                    button_container.style.justifyContent = config.settings.form.submit_button.alignment;
                    button_container.style.flexDirection = "column";

                    try{
                        var button_margin_left = config.settings.form.submit_button.alignment == 'flex-start' ? '0%' : config.settings.form.submit_button.alignment == 'flex-end' ? ('100' - config.settings.form.submit_button.width.replace('%',''))+'%' : ('100' - config.settings.form.submit_button.width.replace('%',''))/2+'%'
                        button_container.style.marginLeft = button_margin_left;
                    }catch(h){}

                    button_container.appendChild(y);
                    button_container.appendChild(st);
                    d.appendChild(button_container);
                    t = mtg("div");
                    t.id = "mtr-form-status-container";
                    var B = mtg("a");
                    B.id = "mtr-form-status";
                    if(check_status_widget == true){
                        (config.settings.form.email.require && config.settings.unique_identifier != "email" && (q ? ( config.settings.form.email.required && u.setAttribute("required", !0), te.style.display = "flex") : (u.removeAttribute("required"), te.style.display = "none")), config.settings.form.crypto_wallet_address.require && config.settings.unique_identifier != "crypto_wallet_address" && (q ? (config.settings.form.crypto_wallet_address.required && ci.setAttribute("required", !0), cw.style.display = "flex") : (ci.removeAttribute("required"), cw.style.display = "none")), config.settings.form.crypto_wallet_address.require && config.settings.sharing.verification.crypto_wallet_confirmation && (q ? (cpi.setAttribute("required", !0), cp.style.display = "flex") : (cp.style.display = "none")), config.settings.form.phone_number.require && config.settings.unique_identifier != "phone_number" && (q ? (config.settings.form.phone_number.required && ca.setAttribute("required", !0), fpn.style.display = "flex") : (ca.removeAttribute("required"), fpn.style.display = "none")), config.settings.form.other_identifier.require && config.settings.unique_identifier != "other_identifier_value" && (q ? (io.setAttribute("required", !0), oi.style.display = "flex") : (io.removeAttribute("required"), oi.style.display = "none")), config.settings.form.name.require && (q ? (config.settings.form.name.required && e.setAttribute("required", !0), f.style.display = "flex") : (e.removeAttribute("required"), f.style.display = "none")), config.settings.form.address.require && (q ? (config.settings.form.address.required && adr.setAttribute("required", !0), ad.style.display = "flex") : (adr.removeAttribute("required"), ad.style.display = "none")), config.settings.form.extra_field.require && (q ? (config.settings.form.extra_field.required && h.setAttribute("required", !0), k.style.display = "flex") : (h.removeAttribute("required"), k.style.display = "none")), config.settings.form.extra_field_2.require && (q ? (config.settings.form.extra_field_2.require && n.setAttribute("required", !0), n.style.display = "flex") : (l.removeAttribute("required"), n.style.display = "none")), config.settings.form.extra_field_3.require && (q ? (config.settings.form.extra_field_3.require && n3.setAttribute("required", !0), n3.style.display = "flex") : (l3.removeAttribute("required"), n3.style.display = "none")), config.settings.form.extra_field_4.require && (q ? (config.settings.form.extra_field_4.require && n4.setAttribute("required", !0), n4.style.display = "flex") : (l4.removeAttribute("required"), n4.style.display = "none")), config.settings.form.option_field.require && (q ? (config.settings.form.option_field.require && of.setAttribute("required", !0), of.style.display = "flex") : (oft.removeAttribute("required"), of.style.display = "none")), config.settings.form.tags_field.require && (q ? (config.settings.form.tags_field.require && tf.setAttribute("required", !0), tf.style.display = "flex") : (tft.removeAttribute("required"), tf.style.display = "none")), config.settings.form.terms_conditions.require && (v.style.display = q ? "flex" : "none"), q, p.innerText = q ? config.settings.form.submit_button.text : config.settings.form.submit_button.check_position, B.innerText = q ? config.settings.form.status.text : config.settings.form.status.back, q = !q)
                    }else{
                        B.style.fontFamily = g.tools.findFont(config.settings.form.submit_button.font_family);
                        B.style.fontSize = config.settings.form.submit_button.login_font_size;
                        B.style.color = config.settings.form.submit_button.login_text_colour || '#000000';
                        B.addEventListener("click",
                            function (J) {
                                J.preventDefault();
                                (config.settings.form.email.require && config.settings.unique_identifier != "email" && (q ? ( config.settings.form.email.required && u.setAttribute("required", !0), te.style.display = "flex") : (u.removeAttribute("required"), te.style.display = "none")), config.settings.form.crypto_wallet_address.require && config.settings.unique_identifier != "crypto_wallet_address" && (q ? (config.settings.form.crypto_wallet_address.required && ci.setAttribute("required", !0), cw.style.display = "flex") : (ci.removeAttribute("required"), cw.style.display = "none")), config.settings.form.crypto_wallet_address.require && config.settings.sharing.verification.crypto_wallet_confirmation && config.settings.unique_identifier != "crypto_wallet_address" &&  (q ? (cpi.setAttribute("required", !0), cp.style.display = "flex") : (cp.style.display = "none")), config.settings.form.phone_number.require && config.settings.unique_identifier != "phone_number" && (q ? (config.settings.form.phone_number.required && ca.setAttribute("required", !0), fpn.style.display = "flex") : (ca.removeAttribute("required"), fpn.style.display = "none")), config.settings.form.other_identifier.require && config.settings.unique_identifier != "other_identifier_value" && (q ? (io.setAttribute("required", !0), oi.style.display = "flex") : (io.removeAttribute("required"), oi.style.display = "none")), config.settings.form.name.require && (q ? (config.settings.form.name.required && e.setAttribute("required", !0), f.style.display = "flex") : (e.removeAttribute("required"), f.style.display = "none")), config.settings.form.address.require && (q ? (config.settings.form.address.required && adr.setAttribute("required", !0), ad.style.display = "flex") : (adr.removeAttribute("required"), ad.style.display = "none")), config.settings.form.extra_field.require && (q ? (config.settings.form.extra_field.required && h.setAttribute("required", !0), k.style.display = "flex") : (h.removeAttribute("required"), k.style.display = "none")), config.settings.form.extra_field_2.require && (q ? (config.settings.form.extra_field_2.require && n.setAttribute("required", !0), n.style.display = "flex") : (l.removeAttribute("required"), n.style.display = "none")), config.settings.form.extra_field_3.require && (q ? (config.settings.form.extra_field_3.require && n3.setAttribute("required", !0), n3.style.display = "flex") : (l3.removeAttribute("required"), n3.style.display = "none")), config.settings.form.extra_field_4.require && (q ? (config.settings.form.extra_field_4.require && n4.setAttribute("required", !0), n4.style.display = "flex") : (l4.removeAttribute("required"), n4.style.display = "none")), config.settings.form.option_field.require && (q ? (config.settings.form.option_field.require && of.setAttribute("required", !0), of.style.display = "flex") : (oft.removeAttribute("required"), of.style.display = "none")), config.settings.form.tags_field.require && (q ? (config.settings.form.tags_field.require && tf.setAttribute("required", !0), tf.style.display = "flex") : (tft.removeAttribute("required"), tf.style.display = "none")), config.settings.form.terms_conditions.require && (v.style.display = q ? "flex" : "none"), q, p.innerText = q ? config.settings.form.submit_button.text : config.settings.form.submit_button.check_position, B.innerText = q ? config.settings.form.status.text : config.settings.form.status.back, q = !q)
                            });
                        B.setAttribute("href", "javascript: void(0);");
                        B.innerHTML = config.settings.form.status.text;
                        st.appendChild(B);
                    }
        
                    //appending form elements
                    if (!isEmpty(config.settings.form.designer_settings)){
                        var designer_data = config.settings.form.designer_settings
                        var grid_arr = [];
                        for( var i in designer_data){
                            var el = g.tools.designElement(designer_data[i], config, RH);
                            if (el){
                            if (el.getAttribute('id') == 'maitre-optin-form-fields'){
                                el.appendChild(d);
                                c.appendChild(el);
                            }
                            else{
                                c.appendChild(el);
                                if(el.classList.contains('mtr-grid-field')){grid_arr.push(el);}
                            }
                            }
                        }
                        c.querySelectorAll('.sub-grid-field').forEach((el)=>{
                            var gId = el.getAttribute('data-grid-id');
                            el.style.maxWidth = "100%"
                            c.querySelector('#'+gId).appendChild(el);
                        });
                        c.querySelectorAll('.sub-column-field').forEach((el)=>{
                            var gId = el.getAttribute('data-column-id');
                            c.querySelector('#'+gId).appendChild(el);
                        });
                    }else{
                        c.appendChild(d);
                    }

                    ((mtid(config.defaults.form_container_id) || mtid(config.defaults.form_container_id_two) || mtid(config.defaults.sharing_form_container_id) || mtid('maitre-floating-button') || mtid(config.defaults.inline_button_container_id)) ? c.appendChild(t) : "")
                    c.addEventListener("submit", function (J) {
                        J.preventDefault();
                        var button_clicked = p.innerHTML;
                        p.innerHTML = g.tools.tailwindSpinner();
                        p.disabled = !0;
                        form_validity = g.form.incomplete(c, config, RH);
                        "valid" == form_validity ? config.settings.recaptcha.enable && C ? grecaptcha.execute(F) : (data = g.tools.getFormValues(c, RH), g.form.submit(data, config, RH, !1, config.settings.form, "dashboard_widget", button_clicked)) : ("form_incomplete" == form_validity ? alert_or_console(config.settings.alerts.form_incomplete) : "terms_not_accepted" == form_validity ? alert_or_console(config.settings.alerts.terms_conditions) : "invalid_phone_number" == form_validity &&
                            alert_or_console(config.settings.alerts.invalid_phone_number), p.disabled = !1, p.innerText = q ? config.settings.form.submit_button.check_position : config.settings.form.submit_button.text)
                    });
                    (config.settings.design.powered_by || config.settings.design.powered_by) && c.appendChild(g.generate.poweredBy("form", config));
                    config.settings.recaptcha.enable && "" != config.settings.recaptcha.public_key.trim() && g.libraries.recaptcha(config, RH);
                    a.appendChild(c);
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.form 4459");
                    console.error("[ReferralHero] An unexpected error occurred in method generate form:", err);
                }
            }, sharing_screen: function (config, RH) {
                try{
                    var a = mtg("div");
                    a.id = "mtr-sharing-screen";
                    a.style.border = 'none';
                    a.classList.add(`mtr-custom-css-${config.uuid}`);
                    
                    //var d = mtg("div");
                    //d.id = "mtr-sharing-body";

                    if (!RH.optin_data) {
                        return;
                    }

                    var primaryMethod = RH.optin_data?.primary_identifier;
                    var secondaryMethod = RH.optin_data?.secondary_identifier;

                    if ((RH.optin_data && !RH.optin_data.verified && RH.optin_data[primaryMethod + "_enabled"] === "true" && primaryMethod != "crypto_wallet_address") || (g.tools.readCookie("__maitre-session-" + config.uuid) == null && RH.repeated_verification && !RH.device_recognized && primaryMethod != "crypto_wallet_address")) {
                        var b = g.generate.verificationScreen(config, RH, primaryMethod);
                        var c = mtid(config.defaults.form_container_id) || mtid(config.defaults.form_container_id_two) || mtid(config.defaults.sharing_form_container_id)
                        if(c){
                            c.innerHTML = ""
                            c.appendChild(b)
                        }else if (mtid(config.defaults.inline_button_container_id)){
                            return b;
                        }
                        return false;
                    }
                    else if (RH.optin_data && !RH.optin_data.verified && RH.optin_data[secondaryMethod + "_enabled"] === "true") {
                        var b = g.generate.verificationScreen(config, RH, secondaryMethod);
                        var c = mtid(config.defaults.form_container_id) 
                        if(c){
                            c.innerHTML = ""
                            c.appendChild(b)
                        }
                        return false;
                    } else{

                        if (!isEmpty(config.settings.form.sharing_screen_designer)){
                            var designer_data = config.settings.form.sharing_screen_designer
                            
                            for( var i in designer_data){
                                var el = g.tools.designSharingElement(designer_data[i], config, RH);
                                try{
                                    if (el.id == "mtr-sharing-body"){
                                        var t_el = el;
                                        t_el.style.background = t_el.getAttribute("data-bg") == "color" ? t_el.getAttribute("data-bg-color") : "url('" + designer_data[i].image + "')";
                                        t_el.style.backgroundSize = t_el.getAttribute("data-bg-size");
                                        t_el.style.padding = t_el.getAttribute("data-widget-padding");
                                    }else{
                                        t_el.appendChild(el);
                                        if(el.classList.contains('mtr-qa-field') && !el.classList.contains('sub-grid-field') && !el.classList.contains('sub-box-field')){t_el.appendChild(g.generate.quickadd(config, RH))}
                                    }
                                }
                                catch(h){

                                }
                            }
                            t_el.querySelectorAll('.sub-grid-field').forEach((el)=>{
                                try{
                                    var gId = el.getAttribute('data-grid-id');
                                    el.style.maxWidth = "100%"
                                    if(el.classList.contains('mtr-qa-field')){el.querySelector('#'+gId).appendChild(g.generate.quickadd(config, RH))}
                                    t_el.querySelector('#'+gId).appendChild(el);
                                    }
                                catch(h){
                                }
                            });
                            t_el.querySelectorAll('.sub-box-field').forEach((el)=>{
                                try{
                                    var gId = el.getAttribute('data-box-id');
                                    t_el.querySelector('#'+gId).appendChild(el);
                                    if(el.classList.contains('mtr-qa-field')){t_el.querySelector('#'+gId).appendChild(g.generate.quickadd(config, RH))}
                                }
                                catch(h){
                                }
                            });
                            t_el.querySelectorAll('.sub-column-field').forEach((el)=>{
                                try{
                                    var gId = el.getAttribute('data-column-id');
                                    if(el.classList.contains('mtr-qa-field')){el.querySelector('#'+gId).appendChild(g.generate.quickadd(config, RH))}
                                    t_el.querySelector('#'+gId).appendChild(el);
                                }
                                catch(h){
                                }
                            });


                            a.innerHTML = "";
                            a.style.width = !g.tools.mobileCheck() ? t_el.getAttribute('data-widget-width') && t_el.getAttribute('data-widget-width') : '98%';
                            a.style.maxWidth = !g.tools.mobileCheck() ? '95%' : '100%';
                            a.style.borderRadius = t_el.style.borderRadius;
                            a.appendChild(t_el);
                        }    
                        return a;
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.sharing_screen 4553");
                    console.error("[ReferralHero] An unexpected error occurred in method generate sharing_screen:", err);
                }
            }, check_status_widget: function (config) {
                try{
                    var a =
                    mtg("div");
                    a.id = "mtr-optin-form";
                    a.classList.add(`mtr-custom-css-${config.uuid}`);
                    a.style.borderRadius = config.settings.form.form_border.radius;
                    if(config.settings.form.widget_width){
                    a.style.maxWidth = '95%';
                    a.style.width = !g.tools.mobileCheck() ? config.settings.form.widget_width : '98%';
                    }
                    var c = mtg("form");
                    c.id = "mtr-form";
                    c.setAttribute("method", "POST");
                    c.setAttribute("autocomplete", "off");
                    c.setAttribute("action", "#");
                    c.style.borderTopColor = config.settings.form.border;
                    c.style.borderStyle = config.settings.form.form_border.style;
                    c.style.borderWidth = config.settings.form.form_border.width;
                    c.style.borderRadius = config.settings.form.form_border.radius;
                    c.style.borderColor = config.settings.form.form_border.color;
                    c.style.padding = config.settings.form.widget_padding;

                    if (!isEmpty(config.settings.form.designer_settings)){
                    if (config.settings.form.background.enable_color){
                        c.style.backgroundColor = config.settings.form.background.color;
                    }
                    else if (null != config.settings.form.background.image && "" != config.settings.signup_widget_form.background.image) {
                        c.style.backgroundImage = "url('" + config.settings.form.background.image + "')";
                        c.style.backgroundSize = config.settings.form.background.image_size;
                    }
                    }
                    else if (null != config.settings.form.cover && "" != config.settings.signup_widget_form.cover) {
                    var d = mtg("div");
                    d.id = "mtr-form-cover";
                    d.style.backgroundImage = "url('" + config.settings.form.cover + "')";
                    c.appendChild(d)
                    }
                    var vr = mtg("div");
                    vr.id="mtr-optin-verification-container"
                    c.appendChild(vr);
                    d = mtg("div");
                    d.id = "mtr-form-fields";
                    if(config.settings.form.email.require){
                        var t = mtg("div");
                        t.id = "mtr-form-field-email";
                        t.className = "mtr-form-field";
                        var u = g.fields.email(config.settings.form, config);

                        t.style.display = "flex";
                        t.style.justifyContent = config.settings.form.input_field.alignment;
                        config.defaults.hasOwnProperty("email") && u.setAttribute("value", config.defaults.email);
                        t.appendChild(u);
                    }

                    if (config.settings.form.phone_number.require) {
                        var fpn = mtg("div");
                        fpn.className = "mtr-flex phone-num-row";
                        var o = mtg("div");
                        o.id = "mtr-form-field-phone";
                        o.className = "mtr-form-field";
                        
                        var ca = g.fields.phone_number(config.settings.form, config);

                        ca.addEventListener('input', () =>{
                            ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                            ca.setCustomValidity('');
                        });

                        o.style.width = config.settings.form.input_field.width.slice(0, -1)*0.7 + '%';
                        o.style.marginBottom = config.settings.form.input_field.distance;
                        fpn.style.justifyContent = config.settings.form.input_field.alignment;

                        config.defaults.hasOwnProperty("phone_number") && ca.setAttribute("value", config.defaults.name);
                        o.appendChild(ca);

                        var fc = mtg("div");
                        fc.id = "mtr-form-field-country";
                        fc.className = "mtr-form-field";
                        fc.style.maxWidth = "30%";

                        var fci = g.fields.country_field(config.settings.form, config);

                        fc.appendChild(fci);
                        fpn.appendChild(fc);
                        fpn.appendChild(o);
                        fci.onchange = function() {
                            for (var selected_option of this.options){
                                selected_option.innerHTML = selected_option.getAttribute("data-select");
                                ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                                ca.setCustomValidity('');
                            }
                            this.options[this.selectedIndex].innerHTML = this.options[this.selectedIndex].value 
                            this.blur();
                        }
                    }
                    if (config.settings.form.crypto_wallet_address.require) {
                        var cw = mtg("div");
                        cw.id = "mtr-form-field-crypto-wallet";
                        cw.className = "mtr-form-field";
                        var ci = mtg("input");
                        ci.id = "mtr-form-input-crypto-wallet";
                        ci.setAttribute("type", "text");
                        ci.setAttribute("name", "crypto_wallet_address");
                        !config.settings.sharing.verification.crypto_wallet_confirmation && config.settings.form.crypto_wallet_address.required && ci.setAttribute("required", "true");
                        ci.setAttribute("placeholder", config.settings.form.crypto_wallet_address.placeholder);

                        ci.style.color = config.settings.form.input_field.color;
                        ci.style.backgroundColor = config.settings.form.input_field.background_color;
                        ci.style.height = config.settings.form.input_field.height;
                        ci.style.borderColor = config.settings.form.input_field.border_color;
                        ci.style.borderWidth = config.settings.form.input_field.border_width;
                        ci.style.borderRadius = config.settings.form.input_field.border_radius;
                        ci.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        ci.style.fontSize = config.settings.form.input_field.font_size;
                        ci.style.width = config.settings.form.input_field.width;
                        ci.style.marginBottom = config.settings.form.input_field.distance;
                        cw.style.display = "flex";
                        cw.style.justifyContent = config.settings.form.input_field.alignment;

                        ci.addEventListener("focus", function () {
                            ci.style.borderColor = config.settings.design.colors.primary
                        });
                        ci.addEventListener("blur", function () {
                            ci.style.borderColor = config.settings.form.input_field.border_color;

                        });
                        config.defaults.hasOwnProperty("crypto_wallet_address") && ci.setAttribute("value", config.defaults.name);
                        cw.appendChild(ci);

                        var cp = mtg("div");
                        cp.id = "mtr-form-field-crypto-wallet-provider";
                        var cpi = mtg("button");
                        cpi.className = "mtr-form-field";
                        cpi.id = "mtr-form-provider-connect";
                        cpi.setAttribute("type", "button");
                        cpi.innerHTML = config.settings.form.crypto_wallet_provider.placeholder;
                        cpi.setAttribute("name","crypto_wallet_provider");
                        cpi.value = "";

                        cpi.style.color = config.settings.form.input_field.color;
                        cpi.style.backgroundColor = config.settings.form.input_field.background_color;
                        cpi.style.height = config.settings.form.input_field.height;
                        cpi.style.borderColor = config.settings.form.input_field.border_color;
                        cpi.style.borderWidth = config.settings.form.input_field.border_width;
                        cpi.style.borderRadius = config.settings.form.input_field.border_radius;
                        cpi.style.fontFamily = g.tools.findFont(config.settings.form.input_field.font_family);
                        cpi.style.fontSize = config.settings.form.input_field.font_size;
                        cpi.style.width = config.settings.form.input_field.width;
                        cpi.style.marginBottom = config.settings.form.input_field.distance;
                        cp.style.display = "flex";
                        cp.style.justifyContent = config.settings.form.input_field.alignment;

                        var sel = mtg("div");
                        sel.id = "provider-list"
                        sel.className = "provider-list-content"
                        config.settings.form.providers.forEach(function (p) {
                            var a = mtg("a");
                            a.className = p;
                            a.setAttribute("value", p);
                            a.innerHTML = toTitleCase(p.replace("_", " "));
                            a.onclick = async function(){    
                            cpi.value = p ;
                            cpi.innerText = toTitleCase(p.replace("_", " "));
                                var pr = cpi.value
                                if (pr){
                                    var key = await g.verification.connectWallet(pr);
                                    if ( key ){
                                        ci.value = key;
                                        cpi.style.borderColor = "#5cb85c"
                                        vr.innerHTML = "";
                                        vr.style.padding = "";
                                        cpi.innerText = toTitleCase(p.replace("_", " ")) + " Successfully Connected!";
                                        cpi.classList.add(pr);
                                        cpi.style.backgroundPosition = "25px 7px";
                                        cpi.style.textAlign = "center";
                                    } 
                                    else {
                                        ci.value = "";
                                        cpi.style.borderColor = "#d9534f";
                                        cpi.classList.remove('metamask', 'phantom', 'wallet_connect', 'coinbase');
                                        cpi.style.textAlign = "left";
                                        vr.style.padding = "0.55em"
                                        vr.innerHTML = "<p id='mtr-sharing-verification'>Connect Wallet Failed. Please make sure you have the " + toTitleCase(pr.replace("_", " ")) + " wallet extension installed. <a href='" + g.generate.cryptoWalletExtensionLink(pr) + "' target='_blank'> Install here.</a></p>"
                                    }
                                }
                                else{ 
                                    alert_or_console("Please select valid crypto provider")
                                }
                            };
                            sel.appendChild(a);
                            
                        });
                        config.defaults.hasOwnProperty("crypto_wallet_provider") && ci.setAttribute("value", config.defaults.name);
                        cp.appendChild(cpi);
                        cp.appendChild(sel);
                        
                        if (config.settings.sharing.verification.crypto_wallet_confirmation){
                            cpi.onclick = function() {
                                sel.classList.toggle("show");
                            }

                            window.onclick = function(event) {
                                if (!event.target.matches('#mtr-form-provider-connect')) {
                                    var dropdowns = document.getElementsByClassName("provider-list-content");
                                    var i;
                                    for (i = 0; i < dropdowns.length; i++) {
                                    var openDropdown = dropdowns[i];
                                    if (openDropdown.classList.contains('show')) {
                                        openDropdown.classList.remove('show');
                                    }
                                    }
                                }
                            }
                            ci.style.display = "none";
                            cw.style.margin = "0px";
                            
                        }
                    }
                    if (config.settings.form.other_identifier.require) {
                        var oi = mtg("div");
                        oi.id = "mtr-form-field-other-identifier";
                        oi.className = "mtr-form-field";
                        oi.style.display = "flex";
                        oi.style.justifyContent = config.settings.form.input_field.alignment;

                        var io = g.fields.other_identifier(config.settings.form, config);

                        config.defaults.hasOwnProperty("other_identifier") && u.setAttribute("value", config.defaults.other_identifier);
                        oi.appendChild(io);
                    }

                    var y = mtg("div");
                    y.id = "mtr-form-field-submit";
                    y.className = "mtr-form-field";
                    var p = mtg("button");
                    p.id = "mtr-form-submit-button";
                    p.setAttribute("type", "submit");
                    p.innerHTML = config.settings.form.submit_button.text;
                    p.style.backgroundColor = config.settings.form.submit_button.color;
                    p.style.color = config.settings.form.submit_button.label_color;
                    p.style.width = '100%';
                    p.style.borderRadius = config.settings.form.submit_button.corner_roundness;
                    p.style.fontSize = config.settings.form.submit_button.font_size;
                    p.style.height = config.settings.form.submit_button.height;
                    p.style.fontWeight = config.settings.form.submit_button.bold ? 'bolder' : 'normal';
                    p.style.textDecoration = config.settings.form.submit_button.underline ? 'underline' : 'none';
                    p.style.fontStyle = config.settings.form.submit_button.italic ? 'italic' : 'none';
                    p.style.fontFamily = g.tools.findFont(config.settings.form.submit_button.font_family);
                    y.appendChild(p);
                    d.appendChild(config.settings.unique_identifier == "email" ? t 
                    : config.settings.unique_identifier == "phone_number" ? fpn 
                    : config.settings.unique_identifier == "crypto_wallet_address" && config.settings.sharing.verification.crypto_wallet_confirmation ? cp 
                    : config.settings.unique_identifier == "crypto_wallet_address" ? cw 
                    : oi );
                    d.appendChild(y);

                    t = mtg("div");
                    t.id = "mtr-form-status-container";
                    var B = mtg("a");
                    B.id = "mtr-form-status";
                    B.addEventListener("click",
                        function (J) {
                            J.preventDefault();
                            g.tools.readCookie("__maitre-session-" + config.uuid) ? g.tools.getSessionCookie(!0, config, RH) : (config.settings.form.name.require && (q ? (e.setAttribute("required", !0), f.style.display = "block") : ''), config.settings.form.extra_field.require && config.settings.form.extra_field_2.require && (q ? (n.setAttribute("required", !0), n.style.display =
                                "block") : (l.removeAttribute("required"), n.style.display = "none")), config.settings.form.terms_conditions.require && (v.style.display = q ? "block" : "none"), q || config.settings.unique_identifier == "email" ? u.focus() : config.settings.unique_identifier == "phone_number" ? ca.focus() : config.settings.unique_identifier == "crypto_wallet_address" ? ci.focus() : io.focus(), p.innerText = q ? config.settings.form.submit_button.text : config.settings.form.submit_button.check_position, B.innerText = q ? config.settings.form.status.text : config.settings.form.status.back, q = !q)
                        });
                    B.setAttribute("href", "javascript: void(0);");
                    B.innerHTML = config.settings.form.status.text;
                    t.appendChild(B);
                    B.click();
                    c.appendChild(d);
                    (config.settings.widget_type == "BothWidget" ? c.appendChild(t) : "")
                    c.addEventListener("submit", function (J) {
                        J.preventDefault();
                        p.innerHTML = g.tools.tailwindSpinner();
                        p.disabled = !0;
                        (data = g.tools.getFormValues(c, RH), g.form.submit(data, config, RH, 0))
                    });
                    (config.settings.design.powered_by || config.settings.design.powered_by) && c.appendChild(g.generate.poweredBy("form", config));
                    config.settings.recaptcha.enable && "" != config.settings.recaptcha.public_key.trim() && g.libraries.recaptcha(config, RH);
                    a.appendChild(c);
                    if (mtid(config.defaults.form_container_id)) {
                        mtid(config.defaults.form_container_id).appendChild(a)
                    } else if (mtid(config.defaults.form_container_id_two)) {
                        mtid(config.defaults.form_container_id_two).appendChild(a)
                    } else if (mtid(config.defaults.sharing_form_container_id) && !mtid("mtr-sharing-screen")){
                        mtid(config.defaults.sharing_form_container_id).appendChild(a)
                    } else if (mtid(config.defaults.inline_button_container_id)){
                        mtid(config.defaults.inline_button_container_id).appendChild(a)
                    } else if (config.settings.horizontal_banner.show){
                        a = g.generate.horizontal_banner(config, RH);
                        document.getElementsByTagName("body")[0].appendChild(a);
                    }
                    else config.settings.floating_button.enable && (a = g.generate.floating_button(config, RH),
                        document.getElementsByTagName("body")[0].appendChild(a));
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.check_status_widget 4853");
                    console.error("[ReferralHero] An unexpected error occurred in method check_status_widget:", err);
                }
            }, popup: function (a, config) {
                try{
                    var c = mtid("mtr-popup-body");
                    if (c) c.innerHTML = "", c.appendChild(a); else {
                        var d = mtg("div");
                        d.id = "mtr-popup-container";
                        c = mtg("div");
                        c.id = "mtr-popup-body";
                        if (a instanceof Node) {
                            c.appendChild(a);
                        }else{
                            return
                        }
                        var f = document.getElementsByTagName("body")[0];
                        f.className += " noscroll";
                        document.addEventListener("click", (k) => {
                            var target = k.target;
                            var popupContent = document.querySelector("#mtr-sharing-body");
                            if (!Object.is(target, popupContent) && (Object.is(target, c) || Object.is(target, d))){
                                k.preventDefault();
                                mtid("mtr-form") && mtid("mtr-form").reset();
                                mtid("mtr-form-provider-connect") && mtid("mtr-form-provider-connect").removeAttribute('style'), mtid("mtr-form-provider-connect") && mtid("mtr-form-provider-connect").setAttribute("class","mtr-form-field"), mtid("mtr-form-provider-connect") && mtid("mtr-form-provider-connect").setAttribute("value",""), mtid("mtr-form-provider-connect") && ( mtid("mtr-form-provider-connect").innerHTML = config.settings.form.crypto_wallet_provider.placeholder );
                                mtid("mtr-form-input-country") && (mtid("mtr-form-input-country").options["selectedIndex"] = 228), mtid("mtr-form-input-country") && ( mtid("mtr-form-input-country").options[228].innerHTML = config.settings.form.phone_number.country_code);
                                f.classList.remove("noscroll");
                                d.remove();
                                console.log('SHARING CLOSE');
                                config.callbacks.hasOwnProperty("popupClose") && config.callbacks.popupClose()
                            }
                        });
                        if (w) {
                            var e = mtg("a");
                            e.id = "mtr-popup-test-mode-container";
                            e.innerHTML = "Test Mode &#9432;";
                            e.setAttribute("href", "https://support.referralhero.com/article/18-how-to-test-maitre");
                            e.setAttribute("target",
                                "_blank");
                            d.appendChild(e)
                        }
                        d.appendChild(a);
                        d.appendChild(c);
                        f.appendChild(d);
                        setTimeout(function () {
                            d.className += " show";
                            config.callbacks.hasOwnProperty("popupOpen") && config.callbacks.popupOpen()
                        }, 100)
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.popup 4899");
                    console.error("[ReferralHero] An unexpected error occurred in method generate popup:", err);
                }
            }, MessengerLink: function (config, RH) {
                try{
                    return g.tools.mobileCheck() ? "fb-messenger://share?redirect_uri=" + encodeURIComponent(config.defaults.default_url) + "&link=" + encodeURIComponent(this.referralLink("facebook_messenger", config, RH)) + "app_id=" + config.settings.facebook_app_id : "https://www.facebook.com/v2.8/dialog/send?app_id="+ config.settings.facebook_app_id +"&link=" + encodeURIComponent(this.referralLink("facebook_messenger", config, RH)) +
                        "&redirect_uri=" + encodeURIComponent(config.defaults.default_url) + "&relation=opener&display=popup&mobile_iframe=true&sdk=joey";
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.MessengerLink 4907");
                    console.error("[ReferralHero] An unexpected error occurred in method generate MessengerLink:", err);
                }
            }, poweredBy: function (a, config) {
                try{
                    var c = mtg("div");
                    c.id = "mtr-" + a + "-branding-container";
                    a = mtg("a");
                    a.className = "mtr-form-powered-by";
                    a.setAttribute("href", "https://referralhero.com?utm_source=powered_by&utm_medium=widget&utm_campaign=Inbound&ref=" + window.location.hostname + "&uuid=" + config.uuid);
                    a.innerHTML = "powered by <strong>ReferralHero</strong>";
                    c.appendChild(a);
                    return c;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.poweredBy 4921");
                    console.error("[ReferralHero] An unexpected error occurred in method generate poweredBy:", err);
                }
            }, floating_button: function (config, RH) {
                try{
                    var a =
                        mtg("div");
                    a.id = "maitre-floating-button";
                    var inner_text_val = config.settings.floating_button.text;
                    if(g.tools.readCookie("__maitre-session-" + config.uuid)){
                        inner_text_val = config.settings.floating_button.identified_label;
                    }
                    a.innerText = inner_text_val;
                    a.style.backgroundColor = config.settings.floating_button.color;
                    a.style.color = config.settings.floating_button.text_color;
                    a.style.fontFamily = g.tools.findFont(config.settings.floating_button.font_family);
                    a.style.fontSize = config.settings.floating_button.text_size+'px';
                    a.classList.add(config.settings.floating_button.position);
                    a.style.borderRadius = '25px';
                    a.addEventListener("click", function (c) {
                        c.preventDefault();
                        config.settings.sharing.open_if_signed_up && g.tools.readCookie("__maitre-session-" + config.uuid) ? ((g.tools.getSessionCookie(!0, config, RH), g.generate.popup(g.generate.sharing_screen(config, RH), config)) && g.generate.popup(g.generate.sharing_screen(config, RH), config)) : g.generate.popup(g.generate.form(config, RH),config)
                    });
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.floating_button 4946");
                    console.error("[ReferralHero] An unexpected error occurred in method generate floating_button:", err);
                }
            }, points: function (RH) {
                try{
                    return RH.optin_data ? g.tools.numberWithCommas(RH.optin_data.points) : 12;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.points 4953");
                    console.error("[ReferralHero] An unexpected error occurred in method generate points:", err);
                }
            }, referralLinkContainer: function(el, config, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);

                    var sharing_outer_container = mtg("div");
                    sharing_outer_container.id = "mtr-sharing-outer-container"+id_num;
                    sharing_outer_container.classList.add("mtr-sharing-outer-container");
                    // sharing_outer_container.classList.add("mtr-bg-c-gray-100");
                    sharing_outer_container.classList.add("mtr-p-5");
                    sharing_outer_container.classList.add("mtr-radius20");
                    sharing_outer_container.style.width = '100%';
                    sharing_outer_container.style.fontFamily = g.tools.findFont(el.getAttribute('data-copy-button-font-family')) || 'inherit';
                    sharing_outer_container.style.backgroundColor = el.getAttribute('data-element-bg-color') || '#f1f0f5';

                    f = mtg("div");
                    f.id = "mtr-sharing-plain-container-"+id_num;
                    f.classList.add("mtr-sharing-plain-container");
                    //f.style.width = el.getAttribute('data-share-link-width')+'%';
                    //f.style.position = 'relative';
                    f.style.width = el.getAttribute('data-share-link-width')+'%' || '100%';
                    f.style.borderColor = el.getAttribute('data-share-link-input-border-color') || '#E1E1E1';
                    f.style.borderStyle = el.getAttribute('data-border-style') || 'solid';
                    f.style.borderWidth = el.getAttribute('data-share-link-input-border-width')+'px' || '0px';
                    f.style.borderRadius = el.getAttribute('data-share-link-input-border-radius')+'px' || '12px';
                    f.style.lineHeight = el.getAttribute('data-sharing_link_height_box')+'px' || '25px';
                    f.style.backgroundColor = el.getAttribute('data-share-link-bg-color') || '#ffffff';
                    f.style.display = "flex";
                    f.style.flexDirection = "row";
                    f.style.overflow = "hidden"

                    
                    var u = mtg("input");
                    var csm = el.getAttribute('data-copy-button-share-message') || '%referral_link%'
                    u.id = "mtr-sharing-plain-link-"+id_num;
                    u.classList.add("mtr-sharing-plain-link");
                    u.readOnly = !0;
                    u.setAttribute("type", "text");

                    var ref_link_val = ''
                    if(el.getAttribute('data-share-link-second-field') == undefined || el.getAttribute('data-share-link-second-field') == 'false'){
                        ref_link_val = g.generate.referralLink("", config, RH, false, el)
                    }else{
                        ref_link_val = g.generate.referralLink("", config, RH, true, el)
                    }
                    u.value = csm.replace('%referral_link%', ref_link_val).replace('%referral_code%', RH.optin_data.referral_code);
                    u.style.color = el.getAttribute('data-share-link-text-color') || '#222222';
                    // u.style.backgroundColor = el.getAttribute('data-share-link-bg-color') || '#ffffff';
                    u.style.fontSize = el.getAttribute('data-sharing_link_input_font_size') || '14px';
                    u.style.paddingLeft = '16px';
                    u.style.textAlign = el.getAttribute('data-share-link-input-alignment') || 'left';
                    u.style.fontSize = el.getAttribute('data-sharing_link_input_font_size') || '15px';
                    u.style.fontFamily = g.tools.findFont(el.getAttribute('data-copy-button-font-family')) || 'inherit';
                    u.style.lineHeight = el.getAttribute('data-sharing_link_line_height')+'px' || '15px';
                    u.style.fontWeight = el.getAttribute('data-copy-button-font-weight') || 'normal';
                    u.style.fontStyle = el.getAttribute('data-copy-button-font-style') || '';
                    u.style.textDecoration = el.getAttribute('data-copy-button-text-decoration') || '';
                    u.style.setProperty("border", "none", "important");

                    var y = mtg("div");
                    y.style.cursor = 'pointer';
                    
                    y.id = "mtr-sharing-link-button-"+id_num;
                    y.classList.add("mtr-sharing-link-button");
                    var copy_button_val =  el.getAttribute('data-copy-button-text-change') || config.settings.sharing.referral_link.copy_button;
                    var copy_button_type = el.getAttribute('data-copy-button-type');
                    y.innerHTML = copy_button_val;
                    y.style.color = el.getAttribute('data-copy-button-text-color') || '#00000';
                    y.style.borderColor = el.getAttribute('data-copy-button-text-color') || '#000000';
                    y.style.backgroundColor = el.getAttribute('data-copy-button-bg-color') || '#ffffff';
                    y.style.fontStyle = el.getAttribute('data-copy-button-font-style') || '';
                    y.style.textDecoration = el.getAttribute('data-copy-button-text-decoration') || '';
                    if (copy_button_type == 'text'){
                        y.style.fontFamily = g.tools.findFont(el.getAttribute('data-copy-button-font-family')) || 'inherit';
                    }else if(copy_button_type == 'icon'){
                        y.innerHTML = '<i class="auto-style-78 material-icons">content_copy</i>';
                        y.style.fontFamily = 'Material Icon';
                    }
                    y.style.borderStyle = el.getAttribute('data-border-style') || 'solid';
                    y.style.borderWidth = el.getAttribute('data-share-link-copy-border-width')+'px' || '0px';
                    y.style.borderRadius = el.getAttribute('data-share-link-copy-border-radius')+'px' || '12px';
                    y.style.fontWeight = el.getAttribute('data-copy-button-font-weight') || 'normal';

                    // uppertext sharing link
                    var sharing_uppertext_area = mtg("div");
                    sharing_uppertext_area.id = "mtr-sharing-upper-text-area"+id_num;
                    sharing_uppertext_area.classList.add("mtr-sharing-upper-text-area");
                    sharing_uppertext_area.classList.add("mtr-flex")
                    sharing_uppertext_area.classList.add("mtr-items-center")
                    sharing_uppertext_area.classList.add("mtr-justify-between")
                    sharing_uppertext_area.classList.add("mtr-mt-3")
                    sharing_uppertext_area.classList.add("mtr-mb-3")
                    sharing_uppertext_area.style.width = '92%';
                    //uppertext title
                    var sharing_uppertext_title = mtg("div");
                    sharing_uppertext_title.id = "mtr-sharing-uppertext-title"+id_num;
                    sharing_uppertext_title.classList.add("mtr-sharing-uppertext-title")
                    sharing_uppertext_title.classList.add("mtr-text-xs")
                    sharing_uppertext_title.classList.add("mtr-text-c-gray-500")
                    sharing_uppertext_title.classList.add("mtr-font-medium")
                    sharing_uppertext_title.innerHTML = el.getAttribute('data-share-link-uppercase-title') != undefined ? el.getAttribute('data-share-link-uppercase-title') : "HERE IS YOUR UNIQUE REFERRAL LINK";
                    sharing_uppertext_title.style.fontSize = el.getAttribute('data-sharing_link_title_font_size') || "12px";
                    sharing_uppertext_title.style.lineHeight = el.getAttribute('data-sharing_link_title_font_height') || "20px";
                    sharing_uppertext_title.style.color = el.getAttribute('data-share-link-text-color') || "#000000";
                    sharing_uppertext_title.style.fontWeight = el.getAttribute('data-copy-button-font-weight') || 'normal';
                    sharing_uppertext_title.style.fontStyle = el.getAttribute('data-copy-button-font-style') || '';
                    sharing_uppertext_title.style.textDecoration = el.getAttribute('data-copy-button-text-decoration') || '';
                    //uppertext bubble
                    var sharing_uppertext_bubble = mtg("div");
                    sharing_uppertext_bubble.id = "mtr-sharing-uppertext-bubble"+id_num;
                    sharing_uppertext_bubble.classList.add("mtr-sharing-uppertext-bubble")
                    sharing_uppertext_bubble.classList.add("mtr-text-xs")
                    sharing_uppertext_bubble.classList.add("mtr-text-white")
                    sharing_uppertext_bubble.classList.add("mtr-py-1")
                    sharing_uppertext_bubble.classList.add("mtr-px-2.5")
                    sharing_uppertext_bubble.classList.add("mtr-rounded-full")
                    sharing_uppertext_bubble.classList.add("mtr-uppercase")
                    sharing_uppertext_bubble.style.fontWeight = el.getAttribute('data-copy-button-font-weight') || 'normal';
                    sharing_uppertext_bubble.style.fontStyle = el.getAttribute('data-copy-button-font-style') || '';
                    sharing_uppertext_bubble.style.textDecoration = el.getAttribute('data-copy-button-text-decoration') || '';
                    var upper_bubble_text = el.getAttribute("data-share-link-uppercase-bubble") != undefined ? el.getAttribute("data-share-link-uppercase-bubble") : "GET %p% POINTS";
                    sharing_uppertext_bubble.innerHTML = upper_bubble_text.replace("%p%", config.settings.social_actions_points['copy_link'] != null ? config.settings.social_actions_points['copy_link'] : '0');
                    sharing_uppertext_bubble.style.fontSize = el.getAttribute('data-sharing_link_title_font_size') || "12px";
                    sharing_uppertext_bubble.style.lineHeight = el.getAttribute('data-sharing_link_title_font_height') || "20px";
                    sharing_uppertext_bubble.style.backgroundColor = el.getAttribute('data-bg-color-points-share-link') || '#403754';
                    sharing_uppertext_bubble.style.color = el.getAttribute('data-bg-color-points-text-share-link') || '#FFFFFF';
                    if(config.settings.is_conversion_events_goal){sharing_uppertext_bubble.style.display = "none"};

                    sharing_uppertext_area.appendChild(sharing_uppertext_title);
                    sharing_uppertext_area.appendChild(sharing_uppertext_bubble);




                    y.addEventListener("click", function (p) {
                        H ||
                        ( !g.tools.mobileCheck() || !navigator.share ) ? (p.preventDefault(), g.tools.copyToClipboard(u, y)) : "";
                        if ( navigator.share && g.tools.mobileCheck() ) {
                            var copy_share_message = el.getAttribute('data-copy-button-share-message') || "You should really check this out %referral_link%";
                            navigator.share({
                                text: g.generate.socialMessage(copy_share_message, g.generate.referralLink("", config, RH))
                            })
                            .catch(console.error);
                        } 
                        y.innerHTML = g.tools.tailwindCheckmarkThin();
                        y.style.width = "fit-content";
                        RH.optin_data && g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/click", "POST", {
                            subscriber_id: RH.optin_data.id,
                            social: "copy_link"
                        }, function (z) {
                            console.log("[ReferralHero] Tracked click on Copy button.")
                        }, function (z) {
                            console.error("[ReferralHero] Error while clicking copy button")
                        });
                        setTimeout(function(){
                            y.style.width = "";
                            if (copy_button_type == 'text'){
                                y.innerHTML = copy_button_val;
                            }else if(copy_button_type == 'icon'){
                                y.innerHTML = '<i class="auto-style-78 material-icons">content_copy</i>';
                                y.style.fontFamily = 'Material Icon';
                            }
                        }, 1000);
                    });

                    f.appendChild(u);
                    f.appendChild(y);

                    sharing_outer_container.appendChild(sharing_uppertext_area)
                    sharing_outer_container.appendChild(f)

                    return sharing_outer_container;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.referralLinkContainer 5122");
                    console.error("[ReferralHero] An unexpected error occurred in method generate referralLinkContainer:", err);
                }
            }, socialMessage: function (a, c) {
                try{
                    if (a) return a.replace(/%referral_link%/gi, c).replace(/%referral_code%/gi, c);
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate socialmessage 5129");
                    console.error("[ReferralHero] An unexpected error occurred in method generate socialMessage:", err);
                }
            }, socialSharingLink: function (a, config, RH) {
                try{
                    var c = "";
                    "facebook" == a ? c = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(this.referralLink("facebook", config, RH)) : "twitter" == a ? c = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.socialMessage(config.settings.sharing.socials.twitter.message,
                        this.referralLink("twitter", config, RH))) : "email" == a ? c = "mailto:?subject=" + encodeURIComponent(config.settings.sharing.socials.email.subject) + "&body=" + encodeURIComponent(this.socialMessage(config.settings.sharing.socials.email.message, this.referralLink("email", config, RH))) : "sms" == a ? c = "smsto:?&body=" + encodeURIComponent(this.socialMessage(config.settings.sharing.socials.sms.message, this.referralLink("sms", config, RH))) : "sms_qr_android" == a ? c = "SMSTO::"+this.socialMessage(config.settings.sharing.socials.sms.message, this.referralLink("sms", config, RH)) : "sms_qr_ios" == a ? c = "SMSTO:addcontacts:"+this.socialMessage(config.settings.sharing.socials.sms.message, this.referralLink("sms", config, RH)) : "whatsapp" == a ? c = "https://api.whatsapp.com/send?text=" + encodeURIComponent(this.socialMessage(config.settings.sharing.socials.whatsapp.message, this.referralLink("whatsapp", config, RH))) : "facebook-messenger" == a ? c = this.MessengerLink(config, RH) : "linkedin" == a ? c = "https://www.linkedin.com/shareArticle?mini=true&url=" +
                        encodeURIComponent(this.referralLink("linkedin", config, RH)) + "&title=" + encodeURIComponent(this.socialMessage(config.settings.sharing.socials.linkedin.message, this.referralLink("linkedin", config, RH))) : "reddit" == a ? c = "https://www.reddit.com/submit?url=" + encodeURIComponent(this.referralLink("reddit", config, RH)) + "&title=" + config.settings.sharing.socials.reddit.message : "pinterest" == a ? c = "https://www.pinterest.com/pin/create/button/?url="+encodeURIComponent(this.referralLink("pinterest", config, RH))+"&description="+encodeURIComponent(this.socialMessage(config.settings.sharing.socials.pinterest.message, this.referralLink("pinterest", config, RH)))+"&media="+config.settings.sharing.socials.pinterest.image : "telegram" == a ? c = "https://t.me/share/url?url=" + encodeURIComponent(this.referralLink("telegram", config, RH)) + "&text=" + encodeURIComponent(config.settings.sharing.socials.telegram.message) :
                        "line" == a && (c = "https://line.me/R/msg/text/?" + encodeURIComponent(this.socialMessage(config.settings.sharing.socials.line.message, this.referralLink("line", config, RH))));
                    return c;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.socialSharingLink 5141");
                    console.error("[ReferralHero] An unexpected error occurred in method generate socialSharingLink:", err);
                }
            }, socialLinksBox: function(el, config, RH){
                try{
                    var id_num = g.tools.get_id_number(el.id);

                    var t = mtg("div");
                    t.id = "mtr-sharing-socials-container-"+id_num;
                    t.classList.add("mtr-sharing-socials-container");
                    t.classList.add("mtr-gap-x-4", "mtr-gap-y-4");
                    if(config.settings.is_conversion_events_goal){
                    t.classList.add("mtr-sharing-socials-container-hroizontal")
                    }else{
                    t.classList.add("mtr-grid", "sm:mtr-grid-cols-3")
                    }
                    t.style.minWidth = "100%";
                    t.style.width = "auto";
                    t.style.padding = "5px";
                    t.style.backgroundColor = el.getAttribute('data-element-bg-color') || '#f1f0f5';
                    t.style.borderRadius = "20px";
                    t.style.fontFamily = g.tools.findFont(el.getAttribute('data-font-family-code')) || 'inherit';

                    var sa = el.getAttribute('data-social-links-icon-order').split(" ");
                    sa = sa.filter(function(str) {
                        return /\S/.test(str);
                    });
                    sa.forEach(function (p) {
                        var v = p.replace("_", "-").toLowerCase();

                        var outer_div = mtg("div");
                        outer_div.id = "mtr-sharing-social-outer-div-"+ v;
                        outer_div.classList.add("mtr-sharing-social-outer-div", "mtr-sharing-social-outer-div-"+ id_num);
                        outer_div.classList.add("mtr-col-span-1", "mtr-bg-white", "mtr-flex", "mtr-items-center", "mtr-justify-start");
                        outer_div.style.height = "fit-content";
                        outer_div.style.width = "fit-content";
                        if(config.settings.is_conversion_events_and_social_actions_goal){
                            outer_div.style.minWidth = "170px"
                        }else{
                            outer_div.style.setProperty("min-width", "0px", "important");
                            outer_div.style.backgroundColor = "transparent";
                        }
                        outer_div.style.display = "flex"
                        outer_div.style.flexDirection = "row"
                        outer_div.style.alignItems = "center";
                        outer_div.style.justifyContent = "flex-start";
                        outer_div.style.margin = el.getAttribute('data-social-links-icon-space')+'px' || '0px';
                        outer_div.style.padding = el.getAttribute('data-social-link-padding')+'px' || '0px';
                        outer_div.style.borderRadius = el.getAttribute('data-social-links-icon-roundness')+'px' || '30px';
                        outer_div.style.fontWeight = el.getAttribute('data-social-link-font-weight') || 'normal';
                        outer_div.style.fontStyle = el.getAttribute('data-social-link-font-style-decor') || 'normal';
                        outer_div.style.textDecoration = el.getAttribute('data-social-link-text-decoration')|| '';

                        var x = mtg("div");
                        x.id = "mtr-sharing-social-" + v;
                        x.className = "mtr-sharing-social";
                        x.classList.add("mtr-sharing-social", "mtr-sharing-social-"+ v);
                        x.setAttribute("title", "Share on " + p);
                        x.setAttribute("data-url", g.generate.socialSharingLink(v, config, RH));
                        if(v == "sms" && g.tools.mobileCheck() && g.tools.isIOSDevice()){
                            x.setAttribute("data-url", "sms:&body=" + encodeURIComponent(g.generate.socialMessage(config.settings.sharing.socials.sms.message, g.generate.referralLink("sms", config, RH))));
                        }
                        x.style.width = x.style.height = el.getAttribute('data-social-links-icon-size')+'px' || '40px';
                        x.style.backgroundColor = el.getAttribute('data-social-links-bg-color') || '#f1f0f5';
                        x.style.borderRadius = el.getAttribute('data-social-links-icon-roundness')+'px' || '30px';
                        x.style.borderStyle = el.getAttribute('data-border-style') || 'solid';
                        x.style.borderWidth = el.getAttribute('data-social_link_border_width')+'px' || '0px';
                        x.style.borderColor = el.getAttribute('data-social-links-icon-color') || '#000000';

                        var reward_message = mtg("div");
                        reward_message.id = "mtr-sharing-social-reward-"+v
                        reward_message.classList.add("mtr-sharing-social-reward" , "mtr-uppercase", "mtr-sharing-social-reward-"+v, "mtr-sharing-social-reward-"+id_num, "mtr-p-tag");
                        reward_message.innerHTML = el.getAttribute("data-social-links-social-header-text").replace("%p%", config.settings.social_actions_points[`${p}`] != null ? config.settings.social_actions_points[`${p}`] : '0') || "get 5 points";
                        reward_message.style.fontSize = el.getAttribute('data-social-link-font-size') != null ? el.getAttribute('data-social-link-font-size')+'px' : "12px";
                        reward_message.style.margin = '0px 7px';
                        reward_message.style.width = '60%';
                        reward_message.style.color = el.getAttribute('data-social-link-text-color') || '#000000';
                        reward_message.style.textAlign = el.getAttribute('data-align') || 'center';
                        if(config.settings.is_conversion_events_goal){reward_message.style.display = "none"}


                        el.getAttribute('data-social-links-icon-type') == 'customize' && x.classList.add("customize");
                        x.addEventListener("click", function (A) {
                            x.innerHTML = g.tools.tailwindCheckmarkThin();
                            x.style.backgroundImage = "none";
                            x.style.display = "flex";
                            x.style.alignItems = "center";
                            x.style.justifyContent = "center";
                            "sms" == v && !g.tools.mobileCheck() ? g.generate.qr_code_images(config, RH) : ("kakao-talk" == v ? g.generate.kakao_talk_share_link(config, RH) : ("email" == v || "sms" == v && g.tools.mobileCheck() || "facebook-messenger" == v && g.tools.mobileCheck() ? window.location = x.getAttribute("data-url") : window.open(x.getAttribute("data-url"))));
                            RH.optin_data && g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/click", "POST", {
                                subscriber_id: RH.optin_data.id,
                                social: v
                            }, function (z) {
                                console.log("[ReferralHero] Tracked click on " + p + " button.")
                            }, function (z) {
                                console.error("[ReferralHero] Error while clicking social sharing buttons: " + z)
                            });
                            setTimeout(function(){
                                x.innerHTML = "";
                                x.style.backgroundImage = "";
                                x.style.display = "";
                                x.style.alignItems = "";
                                x.style.justifyContent = "";
                            }, 1000);
                        });
                        outer_div.appendChild(x);
                        outer_div.appendChild(reward_message);
                        t.appendChild(outer_div);
                    });

                    if (el.getAttribute('data-social-links-icon-order').includes('sms')){
                        var q = mtg("div");
                        q.id = "mtr-qr-code-container";
                        q.className = "mtr-hide";
                        if(config.settings.is_conversion_events_and_social_actions_goal){
                            q.style.marginLeft = "80px";
                            q.style.width = "480px";
                        }
                        var qh = mtg("div");
                        qh.id = "mtr-qr-code-header";
                        qh.classList.add("mtr-p-tag")
                        qh.innerHTML = config.settings.sharing.socials.sms.qr_code_header;
                        qh.style.color = "#ffffff"
                        q.appendChild(qh);
                        var i = mtg("div");
                        i.id = "mtr-qr-code-image";
                        var j = mtg("div");
                        j.id = "mtr-qr-code-image-android";
                        var k = mtg("div");
                        k.id = "mtr-qr-code-image-ios";
                        i.appendChild(j);
                        i.appendChild(k);
                        q.appendChild(i);
                        t.appendChild(q);
                    }
                    return t;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.socialLinksBox 5278");
                    console.error("[ReferralHero] An unexpected error occurred in method generate socialLinksBox:", err);
                }
            }, referralLink: function (a, config,RH, second_field = false, el = null) {
                try{
                    if (RH.optin_data) {
                        if(el != null && el.getAttribute("data-rotating-referral-link-toggle") == 'true'){
                            var url = window.location.href;
                            var baseUrl = url.split('?')[0];
                            var c = baseUrl + '?mwr=' + RH.optin_data.code;
                        }else{
                            if(second_field){
                                var url = el.getAttribute('data-referral-link-tag-value')
                                var baseUrl = url.split('?')[0];
                                var params = url.split('?')[1];
                                var c = baseUrl + '?mwr=' + RH.optin_data.code;
                                if (params) {
                                    var searchParams = new URLSearchParams(params);
                                    searchParams.delete('mwr');
                                    params = searchParams.toString();
                                }
                                if(params){
                                    c = c + '&' + params;
                                }
                            }else{
                                var c = RH.optin_data.referral_link
                            }
                        }
                        a && (c = -1 < RH.optin_data.referral_link.indexOf("https://maitreapp.co/l/") ||
                        -1 < RH.optin_data.referral_link.indexOf("https://app.referralhero.com/l/") ? c + ("?mws=" + a) : c + ("&mws=" + a));
                        return c
                    }
                    return config.defaults.default_url + "?mwr=ABc123";
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.referralLink 5312");
                    console.error("[ReferralHero] An unexpected error occurred in method generate referralLink:", err);
                }
            }, cryptoWalletExtensionLink: function (a) {
                try{
                    var c = "";
                    "coinbase" == a ? c = "https://coinbase-wallet.onelink.me/q5Sx/fdb9b250" : "phantom" == a ? c = "https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" : "metamask" == a ? c = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" : "trust_wallet" == a ? c = "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph" : ""
                    return c;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.cryptoWalletExtensionLink 5321");
                    console.error("[ReferralHero] An unexpected error occurred in method generate cryptoWalletExtensionLink:", err);
                }
            }, kakao_talk_share_link: function(config, RH){
                try{
                  if (config.settings.kakao_app_key) {
                    referral_link = g.generate.referralLink('kakao_talk', config, RH);
                    Kakao.Share.sendDefault({
                      objectType: 'feed',
                      content: {
                        title: config.settings.sharing.socials.kakao_talk.title,
                        description: g.generate.socialMessage(config.settings.sharing.socials.kakao_talk.message, referral_link),
                        imageUrl: config.settings.sharing.socials.kakao_talk.image || '',
                        link: {
                          mobileWebUrl: referral_link,
                          webUrl: referral_link,
                        },
                      },
                    });
                  }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.kakao_talk_share_link 5342");
                    console.error("[ReferralHero] An unexpected error occurred in method generate kakao_talk_share_link:", err);
                }
            }, qr_code_images: function(config, RH){
                try{
                    var l = mtid("mtr-qr-code-image")
                    var cont = mtid("mtr-qr-code-container")
                    var parent = cont.parentElement;
                    var targetElement = parent.querySelector("#mtr-sharing-social-outer-div-sms");
                    var targetIcon = targetElement.querySelector("#mtr-sharing-social-sms")
                    var targetParaTag = targetElement.querySelector("#mtr-sharing-social-reward-sms")
                    if(mtid("mtr-qr-code-container").classList.contains("mtr-hide")){
                        mtid("mtr-qr-code-container").classList.remove("mtr-hide")
                        cont.style.background = "#403754";
                        cont.style.padding = "20px";
                        cont.style.borderRadius = "20px";
                        cont.style.minWidth = "428px";
                        cont.style.zIndex = "10";
                        targetElement.style.background = "#403754"
                        targetIcon.style.borderColor = "#403754"
                        targetParaTag.style.color = "#ffffff"
                        if (l.children[0].children.length < 2 ){
                            setTimeout(function(){
                                g.generate.qr_code('android', config, RH)
                                g.generate.qr_code('ios', config, RH)
                            }, 300);
                        }
                    }else{
                        mtid("mtr-qr-code-container").classList.add("mtr-hide")
                        targetElement.style.background = "none"
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.qr_code_images 5374");
                    console.error("[ReferralHero] An unexpected error occurred in method generate qr_code_images:", err);
                }
            }, qr_code: function(device, config, RH){
                try{
                    var m = mtid("mtr-qr-code-image-"+device)
                    var qr_container = mtg('div')
                    qr_container.style.width = "179px"
                    qr_container.style.height = "179px"
                    qr_container.style.borderRadius = "20px";
                    qr_container.style.backgroundColor = "#ffffff";
                    qr_container.style.paddingTop = "3px";
                    qr_container.style.overflow = "hidden";
                    var padding = "0px";
                    const qrCode = new QRCodeStyling({
                        width: 1400,
                        height: 1400,
                        type: "canvas",
                        margin: 40,
                        data: g.generate.socialSharingLink('sms_qr_'+device, config, RH),
                        dotsOptions: {
                            color: "#403754",
                            type: "rounded"
                        },
                        backgroundOptions: {
                            color: "#ffffff",
                        },
                        imageOptions: {
                            crossOrigin: "anonymous",
                            margin: 20
                        },
                        cornersSquareOptions: {
                            type: 'extra-rounded'
                        },
                        cornersDotOptions: {
                            type: 'dot'
                        },
                        qrOptions: {
                            errorCorrectionLevel: 'Q'
                        }
                    });

                    qrCode.append(qr_container)
                    m.appendChild(qr_container)

                    const canvasElement = qrCode._container.querySelector("canvas");
                    canvasElement.style.width = "175px";
                    canvasElement.style.height = "175px";

                    var t = mtg("div")
                    t.classList.add("mtr-p-tag")
                    t.innerHTML = (device == 'android' ? '<svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3258 2.62708L12.5574 2.28037L12.7847 1.93831L13.2965 1.17081C13.3592 1.07641 13.3338 0.949409 13.2402 0.886332C13.145 0.823256 13.018 0.848656 12.9549 0.943482L12.4067 1.76644L12.1759 2.1123L11.9418 2.46282C11.2002 2.17538 10.3734 2.01409 9.50006 2.01409C8.62757 2.01409 7.8008 2.17538 7.05912 2.46282L6.82629 2.1123L6.59557 1.76644L6.04651 0.943059C5.98386 0.848656 5.85644 0.823256 5.76161 0.885909C5.66763 0.948562 5.64223 1.07599 5.70488 1.17039L6.21627 1.93789L6.44445 2.27994L6.67601 2.62665C4.93399 3.43776 3.75586 4.97446 3.75586 6.7334H15.246C15.246 4.97488 14.0678 3.43818 12.3258 2.62708ZM7.0388 5.09214C6.69802 5.09214 6.42285 4.81655 6.42285 4.47662C6.42285 4.13668 6.69802 3.86151 7.0388 3.86151C7.37874 3.86151 7.65391 4.13668 7.65391 4.47662C7.65391 4.81655 7.37874 5.09214 7.0388 5.09214ZM11.9626 5.09214C11.6226 5.09214 11.3475 4.81655 11.3475 4.47662C11.3475 4.13668 11.6226 3.86151 11.9626 3.86151C12.3034 3.86151 12.5785 4.13668 12.5785 4.47662C12.5785 4.81655 12.3034 5.09214 11.9626 5.09214Z" fill="white"/><path d="M3.84434 7.55469H3.75586V8.57831V9.41354V16.5831C3.75586 17.2998 4.33837 17.8827 5.05507 17.8827H5.99317C5.96185 17.9911 5.94407 18.1058 5.94407 18.2244V18.2929V18.7032V20.824C5.94407 21.5035 6.49567 22.0551 7.17554 22.0551C7.85541 22.0551 8.40659 21.5035 8.40659 20.824V18.7032V18.2929V18.2244C8.40659 18.1063 8.38839 17.9911 8.35791 17.8827H10.6439C10.6126 17.9911 10.5952 18.1058 10.5952 18.2244V18.2929V18.7032V20.824C10.5952 21.5035 11.1468 22.0551 11.8263 22.0551C12.5057 22.0551 13.0573 21.5035 13.0573 20.824V18.7032V18.2929V18.2244C13.0573 18.1063 13.04 17.9911 13.0086 17.8827H13.9463C14.663 17.8827 15.246 17.2998 15.246 16.5831V9.41354V8.57831V7.55469H15.1575H3.84434Z" fill="white"/><path d="M1.70371 7.55469C1.02384 7.55469 0.472656 8.10544 0.472656 8.78616V14.052C0.472656 14.7314 1.02384 15.283 1.70371 15.283C2.38316 15.283 2.93476 14.7314 2.93476 14.052V8.78574C2.93476 8.10544 2.38358 7.55469 1.70371 7.55469Z" fill="white"/><path d="M17.2994 7.55469C16.6191 7.55469 16.0684 8.10544 16.0684 8.78616V14.052C16.0684 14.7314 16.6191 15.283 17.2994 15.283C17.9789 15.283 18.5296 14.7314 18.5296 14.052V8.78574C18.5296 8.10544 17.9789 7.55469 17.2994 7.55469Z" fill="white"/></svg> for Android' : '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3426 7.90434C10.0463 7.86202 9.7077 7.81969 9.41141 7.90434C8.69183 8.11599 8.18391 8.75091 7.97227 9.68213C7.84529 10.3594 7.88762 11.1213 8.05693 11.7139C8.35323 12.6451 9.03047 13.1954 9.87703 13.153C10.6813 13.153 11.3585 12.6451 11.6971 11.7139C11.9088 11.1213 11.9511 10.3594 11.7818 9.68213C11.5702 8.75091 11.0199 8.07366 10.3426 7.90434Z" fill="white"/><path d="M10.9791 0.199219C5.22248 0.199219 0.566406 4.85532 0.566406 10.6119C0.566406 16.3685 5.22248 21.0246 10.9791 21.0246C16.7357 21.0246 21.3918 16.3685 21.3918 10.6119C21.4341 4.85532 16.7357 0.199219 10.9791 0.199219ZM5.77275 14.2098H4.41825V8.96113H5.77275V14.2098ZM5.09551 8.24155C4.71456 8.24155 4.37593 7.90292 4.37593 7.52197C4.37593 7.14101 4.71456 6.80241 5.09551 6.80241C5.47646 6.80241 5.81507 7.14101 5.81507 7.52197C5.81507 7.90292 5.47646 8.24155 5.09551 8.24155ZM11.3601 13.9135C11.0214 14.0828 10.7251 14.1675 10.2172 14.2098C9.96323 14.2521 9.75158 14.2098 9.49761 14.2098C8.98968 14.1675 8.69337 14.0828 8.35475 13.9135C7.16957 13.3632 6.49233 12.1357 6.49233 10.5696C6.49233 9.00345 7.16957 7.73362 8.35475 7.14103C8.82036 6.92939 9.28597 6.80241 9.83623 6.80241C10.3865 6.80241 10.8521 6.92939 11.3177 7.14103C12.5029 7.73362 13.1802 9.00345 13.1802 10.5696C13.2225 12.1357 12.5452 13.3632 11.3601 13.9135ZM18.0479 12.94C17.7093 13.6596 16.9897 14.1252 15.9738 14.2098C15.7622 14.2521 15.2966 14.2521 15.1696 14.2098C14.577 14.1252 14.0267 14.0405 13.5611 13.7865L13.8574 12.7283C14.6193 12.9823 15.6775 13.3209 16.3971 13.0246C16.778 12.813 16.9897 12.4744 16.905 12.0511C16.8204 11.5855 16.5241 11.3315 15.6352 10.9929C14.6616 10.6119 14.069 10.1886 13.8151 9.59605C13.6881 9.29975 13.6458 8.91881 13.7304 8.62251C13.8574 7.73362 14.577 7.09868 15.6352 6.88704C15.9315 6.84472 16.6087 6.84472 16.9474 6.88704C17.413 6.9717 17.9632 7.14103 17.9632 7.22569C17.9632 7.26802 17.6669 8.24155 17.6669 8.24155C17.2013 8.07223 16.6934 7.94526 16.2278 7.90293C15.5929 7.90293 14.9156 8.28389 15.0426 8.91881C15.1273 9.34209 15.3812 9.51139 16.3548 9.93467C17.0743 10.231 17.413 10.4426 17.7093 10.7389C18.1325 11.1622 18.2595 11.6278 18.2595 12.0934C18.2595 12.432 18.2172 12.6014 18.0479 12.94Z" fill="white"/></svg> for IOS')
                    t.id = "device-header"
                    t.style.color = "#ffffff"
                    t.style.display = "flex";
                    t.style.gap = "10px";
                    t.style.alignItems = "center";
                    t.style.justifyContent = "center";
                    m.appendChild(t);
                    m.title = '';
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.qr_code 5435");
                    console.error("[ReferralHero] An unexpected error occurred in method generate qr_code:", err);
                }
            }, qr_code_field: function(field, color, size, config, RH, bgcolor, border_size, border_radius, padding, left_border, right_border, top_border, bottom_border, border_color, qr_text, qr_family, qr_color){
                try{
                    var m = mtid(field)
                    if (m) {
                        m.innerHTML = '';
                        //var qrcode = new QRCode(m, {
                        //    text: g.generate.referralLink('QR', config, RH),
                        //    width: size || 200,
                        //    height: size || 200,
                        //    colorDark : color || "#6f8ea8",
                        //    colorLight : bgcolor || "#ffffff",
                        //    correctLevel : QRCode.CorrectLevel.H
                        //});

                        if(g.tools.mobileCheck() && parseInt(size) > 250){
                        size = 250; 
                        }
                        let paddingValue = padding.replace("px", "");
                        let multipliedPadding = parseInt(paddingValue, 10) * 10; 
                        var qr_container = mtg('div')
                        var container = mtg('div')
                        const qrCode = new QRCodeStyling({
                            width: 1400,
                            height: 1400,
                            type: "canvas",
                            margin: multipliedPadding.toString(),
                            data: g.generate.referralLink('QR', config, RH),
                            dotsOptions: {
                                color: color || "#6f8ea8",
                                type: "rounded"
                            },
                            backgroundOptions: {
                                color: bgcolor || "#ffffff",
                            },
                            imageOptions: {
                                crossOrigin: "anonymous",
                                margin: 20
                            },
                            cornersSquareOptions: {
                                type: 'extra-rounded'
                            },
                            cornersDotOptions: {
                                type: 'dot'
                            },
                            qrOptions: {
                                errorCorrectionLevel: 'Q'
                            }
                        });

                        qrCode.append(qr_container)

                        container.appendChild(qr_container)
                        container.style.display = "flex"
                        container.style.alignItems = "center"
                        container.style.justifyContent = "center"
                        container.style.flexDirection = "column"
                        m.appendChild(container)

                        var isWebView = false
                        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

                        const isIOSWebView = /iPhone|iPad|iPod/.test(userAgent) && window.navigator.standalone !== undefined && !/Safari/i.test(userAgent);
                        const isAndroidWebView = /Android/.test(userAgent) &&(/Version\/[0-9.]+/.test(userAgent) || window.navigator.userAgent.includes("wv")) && !/Chrome|CriOS/.test(userAgent);
                        if (isIOSWebView || isAndroidWebView){
                            isWebView = true    
                        }

                        if (!isWebView) {
                            const downloadButton = document.createElement('button');
                            downloadButton.innerHTML = `<svg width="25" height="25" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6.43977C14.4 6.64644 14.839 7.87327 14.839 10.5733V10.6599C14.839 13.6399 13.6457 14.8333 10.6657 14.8333H6.32568C3.34568 14.8333 2.15234 13.6399 2.15234 10.6599V10.5733C2.15234 7.89328 2.64 6.65977 5 6.43977" stroke="${qr_color}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.5 2.91333L8.5 10.5" stroke="${qr_color}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.2638 9.16657L8.49714 11.3999L10.7305 9.16657" stroke="${qr_color}" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>`
                            downloadButton.style.marginTop = "10px";
                            downloadButton.style.alignItems = "center";
                            downloadButton.style.gap = "10px";
                            downloadButton.style.border = "none";
                            downloadButton.style.background = "transparent";
                            downloadButton.style.cursor = "pointer";
                            downloadButton.style.display = "flex";
                    
                            const text = document.createElement('span');
                            text.innerHTML = qr_text;
                            text.style.fontSize = "18px";
                            text.style.lineHeight = "23px";
                            text.style.color = qr_color;
                            text.style.fontFamily = g.tools.findFont(qr_family || "inherit");
                            downloadButton.appendChild(text);
                            downloadButton.onclick = function() {
                                qrCode.download({
                                    name: `${config.settings.name.replace(/\s+/g, '_')}_QR_Code`,
                                    extension: "png" 
                                });
                            };
                            container.appendChild(downloadButton);
                        }  

                        const canvasElement = qrCode._container.querySelector("canvas");
                        canvasElement.style.width = size.toString() + "px";
                        canvasElement.style.height = size.toString() + "px";

                        var cont_size = Number(size)+12

                        qr_container.style.width = cont_size.toString()+"px"
                        qr_container.style.height = cont_size.toString()+"px"
                        qr_container.style.overflow = "hidden"
                        qr_container.style.borderWidth = "7px";
                        qr_container.style.borderRadius = border_radius || "0px";
                        qr_container.style.borderStyle = "solid";
                        qr_container.style.borderColor = bgcolor || "#000000";
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate qr_code_field 5551");
                    console.error("[ReferralHero] An unexpected error occurred in method generate qr_code_field:", err);
                }
            }, qrCode: function(el, config, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);
            
                    var qr_code_container = mtg("div");
                    qr_code_container.id = "mtr-qr-code-container-"+id_num;
                    qr_code_container.classList.add("mtr-qr-code-container");

                    var color = el.getAttribute('data-color') || '#6f8ea8';
                    var bgcolor = el.getAttribute('data-bg-color') || '#ffffff';
                    var size = el.getAttribute('data-size') || 200;
                    var alignment = el.getAttribute('data-align') || 'center';
                    var border_size = el.getAttribute('data-border-width')+'px' || '0px';
                    var border_radius = el.getAttribute('data-border-radius')+'px' || '0px';
                    var padding = el.getAttribute("data-qr-code-padding") || "7";
                    var left_border = el.getAttribute("data-border-left") || "none";
                    var right_border = el.getAttribute("data-border-right") || "none";
                    var top_border = el.getAttribute("data-border-top") || "none";
                    var bottom_border = el.getAttribute("data-border-bottom") || "none";
                    var border_color = el.getAttribute("data-border-color") || "#000000";
                    var qr_text = el.getAttribute("data-qr-text");
                    var qr_family = el.getAttribute("data-qr-font-family") || "inherit";
                    var qr_color = el.getAttribute("data-qr-text-color") || "#171423";
                
                    var qr_code = mtg("div");
                    qr_code.id = "mtr-qr-code-field-"+id_num;
                    qr_code.classList.add("mtr-qr-code-field-div");
                    qr_code.style.display = "flex";
                    qr_code.style.alignItems = "center";
                    qr_code.style.justifyContent = alignment || 'center';
                    qr_code_container.appendChild(qr_code);

                    setTimeout(function() {
                        g.generate.qr_code_field("mtr-qr-code-field-" + id_num, color, size, config, RH, bgcolor, border_size, border_radius, padding, left_border, right_border, top_border, bottom_border, border_color, qr_text, qr_family, qr_color);
                    }, 500);
                    
                    return qr_code_container;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate qrCode 5592");
                    console.error("[ReferralHero] An unexpected error occurred in method generate qrCode:", err);
                }
            }, signup_inline_button: function (config, RH) {
                try{
                    var a = mtg("div");
                    a.id = "maitre-inline-button";
                    a.innerText = config.settings.signup_widget_form.inline_button.text;
                    a.style.backgroundColor = config.settings.signup_widget_form.inline_button.color;
                    a.style.color = config.settings.signup_widget_form.inline_button.text_color;
                    a.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.inline_button.font_family);
                    a.style.fontSize = config.settings.signup_widget_form.inline_button.text_size+'px';
                    a.style.borderRadius = '25px';
                    a.addEventListener("click", function (c) {
                        c.preventDefault();
                        config.settings.sharing.open_if_signed_up && g.tools.readCookie("__maitre-session-" + config.uuid) ? ((g.tools.getSessionCookie(!0, config, RH), g.generate.popup(g.generate.thankyou_screen(config, RH), config)) && g.generate.popup(g.generate.thankyou_screen(config, RH), config)) : g.generate.popup(g.generate.signup_widget_form(config, RH), config)
                    });
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate signup_inline_button 5611");
                    console.error("[ReferralHero] An unexpected error occurred in method generate signup_inline_button:", err);
                }
            }, inline_button: function(config, RH){
                try{
                    var a = mtg("div");
                    a.id = "maitre-inline-button";
                    var inner_text_val = config.settings.inline_button.text;
                    if(g.tools.readCookie("__maitre-session-" + config.uuid)){
                        inner_text_val = config.settings.inline_button.identified_label;
                    }
                    a.innerText = inner_text_val;
                    a.style.backgroundColor = config.settings.inline_button.color;
                    a.style.color = config.settings.inline_button.text_color;
                    a.style.fontFamily = g.tools.findFont(config.settings.inline_button.font_family);
                    a.style.fontSize = config.settings.inline_button.text_size+'px';
                    // a.classList.add(config.settings.floating_button.position);
                    a.style.borderRadius = '25px';
                    a.addEventListener("click", function (c) {
                        c.preventDefault();
                        config.settings.sharing.open_if_signed_up && g.tools.readCookie("__maitre-session-" + config.uuid) ? ((g.tools.getSessionCookie(!0, config, RH), g.generate.popup(g.generate.sharing_screen(config, RH), config)) && g.generate.popup(g.generate.sharing_screen(config, RH), config)) : g.generate.popup(g.generate.form(config, RH), config)
                    });
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate inline_button 5635");
                    console.error("[ReferralHero] An unexpected error occurred in method generate inline_button:", err);
                }
            }, rewardsList: function (config) {
                try{
                    var a = mtg("div");
                    a.id = "mtr-rewards";
                    var c = config.settings.sharing.rewards.list, d = mtg("ul");
                    d.id = "mtr-rewards-list";
                    0 < c.length && (c.forEach(function (f) {
                        var e = mtg("li");
                        config.settings.sharing.rewards.show_images || e.classList.add("mtr-no-image");
                        if ("" != f.description.trim()) {
                            var k =
                                mtg("div");
                            k.classList.add("reward-description");
                            k.innerText = f.description;
                            e.appendChild(k)
                        }
                        k = mtg("div");
                        k.classList.add("reward-info");
                        var h = mtg("div");
                        h.className = "reward-image";
                        h.style.backgroundImage = "url(" + f.image + ")";
                        var n = mtg("h4");
                        n.innerText = f.title;
                        var l = mtg("div");
                        l.className = "reward-referrals";
                        l.style.color = config.settings.design.colors.primary;
                        l.innerText = f.header;
                        config.settings.sharing.rewards.show_images && k.appendChild(h);
                        k.appendChild(l);
                        k.appendChild(n);
                        e.appendChild(k);
                        d.appendChild(e)
                    }),
                        a.appendChild(d));
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate rewardsList 5674");
                    console.error("[ReferralHero] An unexpected error occurred in method generate rewardsList:", err);
                }
            }, bonusList: function (el, config, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);

                    var a = mtg("div");
                    a.id = "mtr-rewards-"+id_num;
                    a.classList.add("mtr-rewards");
                    a.style.backgroundColor = el.getAttribute('data-element-bg-color') || '#f1f0f5';
                    var c = config.settings.sharing.rewards.list; 

                    var label_present = false;

                    var rewards_counter = mtg("div");
                    rewards_counter.id = "counter";
                    rewards_counter.classList.add("counter", "counter-"+id_num);
                    
                    d = mtg("div");
                    d.id = "mtr-rewards-list-"+id_num;
                    d.classList.add("mtr-rewards-list");
                    if(el.getAttribute("data-rewards-orientation")=="column"){
                        d.classList.add("mtr-rewards-list-column");
                    }else{
                        d.classList.add("mtr-rewards-list-row");
                    }
                    d.style.alignItems = "center";
                    d.style.flexWrap = "nowrap"
                    d.style.flexDirection = el.getAttribute('data-rewards-orientation') || 'column';
                    var f = RH.optin_data ? RH.optin_data.people_referred : "3";
                    var po = RH.optin_data ? RH.optin_data.points : "5";

                    

                    var swiper_pagination = mtg("div")
                    //swiper_pagination.classList.add("swiper-pagination")

                    rsa = [];

                    try{
                        var pr = el.getAttribute('data-rewards-order').split(' ')

                        var ar = c.map(a => a.id.toString());
                        var rr = g.tools.differenceArray(ar, pr);
                        pr = pr.concat(rr);

                        pr.forEach(function(a){
                            if(RH.optin_data.eligible_rewards.includes(parseInt(a, 10))){
                                if(a.label != ""){
                                label_present = true;
                                }
                                if(el.getAttribute("data-rewards-orientation")=="row"){
                                if(el.getAttribute('data-rewards-toggle-'+a) == 'true'){
                                    a && rsa.push(c.find(obj => { return obj.id == a }))
                                }
                                }else{
                                    a && rsa.push(c.find(obj => { return obj.id == a }))
                                }
                            }
                        })
                        rsa = rsa.filter(reward => reward);
                    }
                    catch(h){
                        rsa = c;
                    }

                    var new_sorted_array = [];
                    try{
                        if(el.getAttribute('data-order-rearranged') == undefined || el.getAttribute('data-order-rearranged') == "false"){
                            rsa.forEach(function(rwd, i) {
                                if (rwd.category == "signing_up" && ( ( rwd.signup_type == "referral" && !RH.optin_data.referred) || (rwd.signup_type == "organic_subscriber" && RH.optin_data.referred ))){return;}
                                if (RH.optin_data.unlocked_rewards.includes(rwd.id)) {
                                    new_sorted_array.push(rwd);
                                }
                            })
                            rsa.forEach(function(rwd, i) {
                                if (rwd.category == "signing_up" && ( ( rwd.signup_type == "referral" && !RH.optin_data.referred) || (rwd.signup_type == "organic_subscriber" && RH.optin_data.referred ))){return;}
                                if (!RH.optin_data.unlocked_rewards.includes(rwd.id)) {
                                    new_sorted_array.push(rwd);
                                }
                            })
                        }else{
                            rsa.forEach(function(rwd, i) {
                                if (rwd.category == "signing_up" && ( ( rwd.signup_type == "referral" && !RH.optin_data.referred) || (rwd.signup_type == "organic_subscriber" && RH.optin_data.referred ))){return;}
                                new_sorted_array.push(rwd);
                            })
                        }
                    }catch{
                        new_sorted_array = rsa;
                    }
                    var swiper_next = mtg("div");
                    var swiper_prev = mtg("div");
                    if(el.getAttribute("data-rewards-orientation")=="row" && ((new_sorted_array.length > 2 && !g.tools.mobileCheck()) || (new_sorted_array.length >= 2 && g.tools.mobileCheck()))){
                        d.classList.add("swiper-wrapper");
                        d.style.display = "none";
                        swiper_prev.innerText = "<";
                        swiper_next.innerText = ">";

                        if(!g.tools.mobileCheck()){
                            swiper_prev.classList.add("swiper-button-prev", "swiper-prev", "swiper-arrow")
                            swiper_next.classList.add("swiper-button-next", "swiper-next", "swiper-arrow")
                            rewards_counter.classList.add("swiper-counter");
                            rewards_counter.classList.add("swiper-pagination")
                        }else{
                            swiper_prev.classList.add("swiper-button-prev", "swiper-prev-mobile", "swiper-arrow")
                            swiper_next.classList.add("swiper-button-next", "swiper-next-mobile", "swiper-arrow")
                            rewards_counter.classList.add("swiper-counter-mobile");
                            rewards_counter.classList.add("swiper-pagination-mobile")
                        }

                        //rewards_counter.classList.add("swiper-pagination")
                    }

                    if(new_sorted_array.length <= 2){
                        //rewards_counter.style.display = "none";
                    }

                    if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length > 2 && !g.tools.mobileCheck()){
                        a.classList.add("swiper-container");
                    }else if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length >= 2 && g.tools.mobileCheck()){
                        a.classList.add("swiper-container");
                    }
                    if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length <= 2 && !g.tools.mobileCheck()){
                        d.style.justifyContent = "center";
                    }else if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length < 2 && g.tools.mobileCheck()){
                        d.style.justifyContent = "center";
                    }else{
                        d.style.justifyContent = "flex-start";
                    }

                    var loop_counter= 0;

                    if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length == 3 && !g.tools.mobileCheck()){
                        new_sorted_array = new_sorted_array.concat(new_sorted_array);
                    }else if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length == 2 && g.tools.mobileCheck()){
                        new_sorted_array = new_sorted_array.concat(new_sorted_array);
                    }

                    0 < new_sorted_array.length && (new_sorted_array.forEach(function (e, i) {
                        if (e.category == "signing_up" && ( ( e.signup_type == "referral" && !RH.optin_data.referred) || (e.signup_type == "organic_subscriber" && RH.optin_data.referred ))){return;}
                        var k = mtg("div");
                        i++;

                        k.id = 'reward-li-item-'+id_num+'-'+e.id;
                        k.classList.add('reward-li-item-'+id_num, 'reward-li-item-'+id_num+'-'+e.id);
                        k.classList.add('reward-li-item', 'mtr-relative', 'mtr-list-item-class');
                        if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length > 2 && !g.tools.mobileCheck()){
                            k.classList.add("swiper-slide");
                        }else if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length >= 2 && g.tools.mobileCheck()){
                            k.classList.add("swiper-slide");
                        }

                        // k.style.height = el.getAttribute('data-rewards-height')+'px' || "230px";
                        //k.style.width = el.getAttribute('data-rewards-width')+'%' || "36%" ;
                        //k.style.borderWidth = el.getAttribute('data-rewards-border-width')+'px' || "1px";
                        k.style.borderRadius = el.getAttribute('data-rewards-border-radius')+'px' || "18px";
                        //k.style.borderColor = el.getAttribute('data-rewards-border-color') || "#cccccc";
                        

                        var outer_reward_div = mtg("div");
                        outer_reward_div.id = "mtr-outer-reward-div-"+id_num;
                        outer_reward_div.classList.add("mtr-outer-reward-div", "mtr-outer-reward-div-"+id_num);
                        if(el.getAttribute("data-rewards-orientation")=="column"){
                            outer_reward_div.classList.add("outer-reward-div-column")
                        }
                        if(el.getAttribute("data-rewards-orientation")=="row" && new_sorted_array.length <= 2 && !g.tools.mobileCheck()){
                            outer_reward_div.style.width = "245px";
                            if (el.getAttribute('data-rewards-image-toggle') == 'true') {
                                outer_reward_div.style.height = "320px";
                            }else{
                                outer_reward_div.style.height = "auto";
                            }
                        }else if(el.getAttribute("data-rewards-orientation")=="row" && g.tools.mobileCheck()){
                            outer_reward_div.style.width = "215px";
                            if (el.getAttribute('data-rewards-image-toggle') == 'true') {
                                outer_reward_div.style.height = "302px";
                            }else{
                                outer_reward_div.style.height = "auto";
                            }
                        }else{
                            outer_reward_div.style.width = "100%";
                        }
                        outer_reward_div.style.backgroundColor = el.getAttribute('data-card-background-color-rewards') || "#FFFFFF";
                        outer_reward_div.style.padding = "10px";
                        outer_reward_div.style.borderRadius = el.getAttribute("data-rewards-border-radius")+'px' || "18px";
                        outer_reward_div.style.borderWidth = el.getAttribute("data-rewards-border-width")+'px' || "0px";
                        outer_reward_div.style.borderLeftStyle = el.getAttribute("data-border-left-style")
                        outer_reward_div.style.borderRightStyle = el.getAttribute("data-border-right-style")
                        outer_reward_div.style.borderBottomStyle = el.getAttribute("data-border-bottom-style")
                        outer_reward_div.style.borderTopStyle = el.getAttribute("data-border-top-style")
                        outer_reward_div.style.borderColor = el.getAttribute("data-rewards-border-color")

                        //if ( RH.optin_data.unlocked_rewards.includes(e.id)) {
                        //    k.classList.add("unlocked", "unlocked-"+id_num);
                        //    
                        //    var h = mtg("div");
                        //    h.classList.add("reward-ribbon", "reward-ribbon-"+id_num);
                        //    
                        //    var n = mtg("span");
                        //    n.classList.add("ribbon-span-"+id_num);
                        //    n.innerText = el.getAttribute('data-rewards-ribbon-text') || "UNLOCKED!";
                        //    n.style.color = el.getAttribute('data-rewards-ribbon-text-color') || "white";
                        //    n.style.backgroundColor = el.getAttribute('data-rewards-ribbon-color') || "#3d85c6";
                        //    n.style.fontFamily = g.tools.findFont(el.getAttribute('data-rewards-font-family') || 'inherit');
                        //    h.appendChild(n);
                        //    k.appendChild(h)
                        //}
                        "" != e.description.trim() && (h = mtg("div"), h.classList.add("reward-description", "reward-description-"+id_num), h.innerText = e.description,h.style.fontFamily = g.tools.findFont(el.getAttribute('data-rewards-font-family') || 'inherit'),  h.style.borderRadius = (el.getAttribute('data-rewards-border-radius'))+'px' || "0px", h.style.zIndex = "100", h.style.marginLeft = "18px", k.appendChild(h));
                        h = mtg("div");
                        h.classList.add("reward-info", "reward-info-"+id_num);
                        h.style.borderRadius = (el.getAttribute('data-rewards-border-radius'))+'px' || "0px";
                        //el.getAttribute('data-rewards-orientation') == 'column' && h.classList.add("mtr-flex");
                        n = mtg("div");
                        n.classList.add("reward-image","reward-image-"+id_num);
                        if(e.image == "/missing.png"){
                            n.style.backgroundImage = "url('https://app.referralhero.com/missing.png')";
                        }else{
                            n.style.backgroundImage = "url(" + e.image + ")";
                        }
                        n.style.borderRadius = el.getAttribute('data-rewards-border-radius')+'px' || "18px";

                        var reward_info_section = mtg("div");
                        reward_info_section.classList.add("reward-info-section");
                        reward_info_section.style.display = "flex";
                        reward_info_section.style.flexDirection = "column";
                        reward_info_section.style.alignItems = "start";

                        var rewards_title_div = mtg("div");
                        rewards_title_div.classList.add("reward-heading-div-"+id_num);
                        rewards_title_div.style.width = '100%';
                        if(el.getAttribute("data-rewards-orientation")=="row"){
                        rewards_title_div.style.height = "80px";
                        }

                        var l = mtg("div");
                        l.classList.add("reward-heading-"+id_num, "mtr-p-tag");
                        l.style.fontFamily = g.tools.findFont(el.getAttribute('data-rewards-font-family') || 'inherit');
                        l.style.fontSize = el.getAttribute('data-rewards-font-size')+'px' || '14px';
                        l.style.lineHeight = el.getAttribute('data-rewards-line-height')+'px' || '15px';
                        l.style.color = el.getAttribute('data-rewards-name-color') || "#000000";
                        l.innerText = e.title;
                        l.style.fontWeight = "bold";
                        l.style.marginTop = "15px";
                        l.style.marginBottom = "15px";
                        l.style.fontWeight = el.getAttribute('data-rewards-font-weight') || "bold";
                        l.style.fontStyle = el.getAttribute('data-rewards-label-font-stylek') || "normal";
                        l.style.textDecoration = el.getAttribute('data-rewards-label-text-decorationk') || "normal";
                        l.style.textAlign = el.getAttribute('data-align-rewards') || "left";

                        var reward_referrals_div = mtg("div");
                        reward_referrals_div.classList.add("reward-referrals-div-"+id_num);
                        reward_referrals_div.style.width = "100%";
                        reward_referrals_div.style.display = "flex";
                        reward_referrals_div.style.justifyContent = el.getAttribute('data-align-points') || "flex-start";

                        var reward_referrals_inner_div = mtg("div");
                        reward_referrals_inner_div.classList.add("reward-referrals-inner-div");

                        var t = mtg("div");
                        t.classList.add("reward-referrals", "reward-referrals-"+id_num);
                        reward_referrals_inner_div.style.color = el.getAttribute('data-reward-icons-color') || '#000000';
                        if (RH.optin_data.unlocked_rewards.includes(e.id)) {
                        reward_referrals_inner_div.style.backgroundColor = el.getAttribute("data-unlocked-reward-color") || "#B1E2E8";
                        reward_referrals_inner_div.classList.add("reward-referrals-"+id_num+"-unlocked");
                        }else{
                        reward_referrals_inner_div.style.backgroundColor = el.getAttribute("data-locked-reward-color") || "#EABB99";
                        reward_referrals_inner_div.classList.add("reward-referrals-"+id_num+"-locked");
                        }
                        t.style.fontFamily = g.tools.findFont(el.getAttribute('data-rewards-font-family') || 'inherit');
                        t.innerText = e.label;
                        // t.style.margin = "7px";
                        // reward_referrals_inner_div.style.borderRadius = "20px";
                        t.style.fontWeight = el.getAttribute('data-reward-points-font-weight') || "bold";
                        t.style.fontStyle = el.getAttribute('data-reward-points-label-font-stylek') || "normal";
                        t.style.textDecoration = el.getAttribute('data-reward-points-label-text-decorationk') || "normal";
                        t.style.fontSize = el.getAttribute('data-points-font-size')+'px' || "12px";
                        t.style.lineHeight = "17px";

                        h.appendChild(n);
                        if (el.getAttribute('data-rewards-image-toggle') != 'true') {
                            n.style.display = 'none';
                        }

                        rewards_title_div.appendChild(l);
                        reward_referrals_div.appendChild(reward_referrals_inner_div);
                        reward_referrals_inner_div.appendChild(t);

                        reward_info_section.appendChild(rewards_title_div);
                        reward_info_section.appendChild(reward_referrals_div);
                        if (RH.optin_data.unlocked_rewards.includes(e.id)) {
                            var progressBarContainerUnlocked = document.createElement('div');
                            progressBarContainerUnlocked.classList.add('progress-bar-container-horizontal-'+id_num ,'mtr-flex', 'mtr-items-center', 'mtr-justify-between', 'mtr-mt-3', 'mtr-relative');
                            progressBarContainerUnlocked.style.width = "90%";
                            progressBarContainerUnlocked.style.marginBottom = "20px";
                            progressBarContainerUnlocked.style.marginLeft = "10px";
                
                            var progressBarFillUnlocked = document.createElement('div');
                            progressBarFillUnlocked.classList.add('mtr-w-[100%]', 'mtr-h-[3px]', 'mtr-bg-c-green', 'mtr-absolute', 'z-1');
            
                            var progressBarTop = document.createElement('div');
                            progressBarTop.classList.add('mtr-w-2',  'mtr-h-2', 'mtr-rounded-full', 'mtr-bg-c-green');
            
                            var progressBarBackground = document.createElement('div');
                            progressBarBackground.classList.add('mtr-w-full', 'mtr-h-[3px]', 'mtr-bg-c-gray-100');
            
                            var progressBarStart = document.createElement('div');
                            progressBarStart.classList.add('mtr-w-2', 'mtr-h-2', 'mtr-rounded-full', 'mtr-bg-c-green');
            
                            progressBarContainerUnlocked.appendChild(progressBarStart);
                            progressBarContainerUnlocked.appendChild(progressBarBackground);
                            progressBarContainerUnlocked.appendChild(progressBarFillUnlocked);
                            progressBarContainerUnlocked.appendChild(progressBarTop);
            
                            if(el.getAttribute("data-rewards-orientation")=="column"){
                            progressBarContainerUnlocked.style.display = "none"
                            }else{
                            }
            
                            if(el.getAttribute("data-progress-bar-rewards-toggle")=="false"){
                            progressBarContainerUnlocked.style.display = "none";
                            }
            
                            reward_info_section.appendChild(progressBarContainerUnlocked);
                        }else{
            
                            var progressBarContainer = document.createElement('div');
                            progressBarContainer.classList.add('progress-bar-container-horizontal-'+id_num ,'mtr-flex', 'mtr-items-center', 'mtr-justify-between', 'mtr-mt-3', 'mtr-relative');
                            progressBarContainer.style.width = "90%";
                            progressBarContainer.style.marginBottom = "20px";
                            progressBarContainer.style.marginLeft = "10px";
            
                            var progressBarTop = document.createElement('div');
                            progressBarTop.classList.add('mtr-w-2',  'mtr-h-2', 'mtr-rounded-full', 'mtr-bg-c-green');
            
                            var progressBarBackground = document.createElement('div');
                            progressBarBackground.classList.add('mtr-w-full', 'mtr-h-[3px]', 'mtr-bg-c-gray-100');
            
                            var progressBarFill = document.createElement('div');
                            progressBarFill.classList.add('mtr-w-[50%]', 'mtr-h-[3px]', 'mtr-bg-c-green', 'mtr-absolute', 'z-1');
            
                            var progressBarStart = document.createElement('div');
                            progressBarStart.classList.add('mtr-w-2', 'mtr-h-2', 'mtr-rounded-full', 'mtr-bg-c-green');
            
                            var progressBarEnd = document.createElement('div');
                            progressBarEnd.classList.add('mtr-w-2', 'mtr-h-2', 'mtr-rounded-full', 'mtr-bg-c-gray-200');
            
                            progressBarContainer.appendChild(progressBarTop);
                            progressBarContainer.appendChild(progressBarBackground);
                            progressBarContainer.appendChild(progressBarFill);
                            progressBarContainer.appendChild(progressBarEnd);
            
                            if(el.getAttribute("data-rewards-orientation")=="column"){
                            progressBarContainer.style.display = "none"
                            }else{
                            }

                            if(el.getAttribute("data-progress-bar-rewards-toggle")=="false"){
                            progressBarContainer.style.display = "none";
                            }
            
                            reward_info_section.appendChild(progressBarContainer);
                        }

                        h.appendChild(reward_info_section); // h = reward_info

                        var below_reward_div = mtg('div');
                        below_reward_div.id = 'mtr-below-reward-div-'+id_num;
                        below_reward_div.classList.add('mtr-below-reward-div-'+id_num, 'mtr-uppercase');
                        below_reward_div.style.backgroundColor = el.getAttribute('data-card-background-color-rewards') || "#FFFFFF";
                        below_reward_div.style.borderRadius = el.getAttribute("data-rewards-border-radius")+'px' || "18px";
                        below_reward_div.style.borderWidth = el.getAttribute("data-rewards-border-width")+'px' || "0px";
                        below_reward_div.style.borderLeftStyle = el.getAttribute("data-border-left-style")
                        below_reward_div.style.borderRightStyle = el.getAttribute("data-border-right-style")
                        below_reward_div.style.borderBottomStyle = el.getAttribute("data-border-bottom-style")
                        below_reward_div.style.borderTopStyle = el.getAttribute("data-border-top-style")
                        below_reward_div.style.borderColor = el.getAttribute("data-rewards-border-color")
                        if(el.getAttribute("data-rewards-orientation")=="row" && g.tools.mobileCheck()){
                            below_reward_div.style.width = "215px";
                            below_reward_div.style.height = "86px";
                        }

                        var reward_status_text = mtg("div");
                        reward_status_text.id = "mtr-reward-status-text-"+id_num;
                        reward_status_text.classList.add("mtr-reward-status-text", "mtr-reward-status-text-"+id_num);
                        reward_status_text.style.height = 'fit-content';
                        reward_status_text.style.width = '70%';
                        reward_status_text.style.padding = '8px';
                        reward_status_text.style.borderRadius = '20px';
                        reward_status_text.style.fontSize = '12px';
                        reward_status_text.style.fontWeight = 'bold';
                        reward_status_text.style.color = el.getAttribute('data-reward-icons-color') || "#000000";

                        var reward_status_logo = mtg("div");
                        reward_status_logo.id = "mtr-reward-status-logo-"+id_num;
                        reward_status_logo.classList.add("mtr-reward-status-logo", "mtr-w-8", "mtr-h-8", "mtr-flex", "mtr-items-center", "mtr-justify-center", "mtr-rounded-full", "mtr-reward-status-logo-"+id_num);

                        var reward_referrals_below_div_container = mtg("div");
                        reward_referrals_below_div_container.classList.add("reward-referrals-below-div-container"+id_num);
                        reward_referrals_below_div_container.style.width = "100%";
                        reward_referrals_below_div_container.style.display = "flex";
                        reward_referrals_below_div_container.style.justifyContent = el.getAttribute('data-align-points') || "flex-start";
                        var reward_referrals_below_div = mtg("div");
                        reward_referrals_below_div.classList.add("reward-referrals-below-div", "reward-referrals-below-div-"+id_num);
                        reward_referrals_below_div.style.display = "none";
                        reward_referrals_below_div.style.color = el.getAttribute('data-reward-icons-color') || "#000000";
                        if (RH.optin_data.unlocked_rewards.includes(e.id)) {
                            reward_referrals_below_div.style.backgroundColor = el.getAttribute("data-unlocked-reward-color") || "#B1E2E8";
                            reward_referrals_below_div.classList.add("reward-referrals-below-div-"+id_num+"-unlocked");
                        }else{
                            reward_referrals_below_div.style.backgroundColor = el.getAttribute("data-locked-reward-color") || "#EABB99";
                            reward_referrals_below_div.classList.add("reward-referrals-below-div-"+id_num+"-locked");
                        }
                        reward_referrals_below_div.style.margin = "7px";
                        reward_referrals_below_div.style.borderRadius = "20px";
                        reward_referrals_below_div.style.fontSize = "12px";
                        reward_referrals_below_div.innerText = e.label;
                        reward_referrals_below_div.style.marginTop = "10px";
                        reward_referrals_below_div.style.padding = "10px";
                        reward_referrals_below_div.style.fontWeight = "bold";

                        if (RH.optin_data.unlocked_rewards.includes(e.id)) {
                            reward_status_text.innerHTML = el.getAttribute('data-unlocked-rewards-ribbon-text-change') || "REWARD UNLOCKED!";
                            reward_status_text.style.backgroundColor = el.getAttribute("data-unlocked-reward-color") || '#B1E2E8';
                            reward_status_text.classList.add("mtr-reward-status-text-"+id_num+"-unlocked");
                            reward_status_logo.style.backgroundColor = el.getAttribute("data-unlocked-reward-color") || '#B1E2E8';
                            reward_status_logo.classList.add("mtr-reward-status-logo-"+id_num+"-unlocked");
                            var icon_color = el.getAttribute("data-reward-icons-color") || "#000000"
                            reward_status_logo.innerHTML = `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" color="${icon_color}" xmlns="http://www.w3.org/2000/svg"><path d="M4.39423 19.2311H11.6058C12.6378 19.2284 13.6267 18.8173 14.3565 18.0875C15.0862 17.3578 15.4973 16.3688 15.5 15.3368V11.1931C15.4989 10.7241 15.312 10.2746 14.9804 9.94298C14.6488 9.61134 14.1993 9.42452 13.7303 9.42338H13.1923V5.67338C13.1923 2.96184 10.8413 0.769531 8 0.769531C5.15865 0.769531 2.80769 2.96184 2.80769 5.67338V7.11568H4.53846V5.96184C4.53846 5.04378 4.90316 4.16333 5.55232 3.51416C6.20149 2.865 7.08194 2.5003 8 2.5003C8.91806 2.5003 9.79851 2.865 10.4477 3.51416C11.0968 4.16333 11.4615 5.04378 11.4615 5.96184V9.42338H2.26971C1.80071 9.42452 1.35124 9.61134 1.0196 9.94298C0.687961 10.2746 0.501143 10.7241 0.5 11.1931L0.5 15.3368C0.502665 16.3688 0.913805 17.3578 1.64354 18.0875C2.37327 18.8173 3.36224 19.2284 4.39423 19.2311Z" fill="currentColor"></path></svg>`;
                        }else{
                            reward_status_text.innerHTML = el.getAttribute('data-locked-rewards-ribbon-text-change') || "REWARD LOCKED!";
                            reward_status_text.classList.add("mtr-reward-status-text-"+id_num+"-locked");
                            reward_status_logo.classList.add("mtr-reward-status-logo-"+id_num+"-locked");
                            reward_status_text.style.backgroundColor = el.getAttribute("data-locked-reward-color") || '#EABB99';
                            reward_status_logo.style.backgroundColor = el.getAttribute("data-locked-reward-color") || '#EABB99';
                            var icon_color = el.getAttribute("data-reward-icons-color") || "#000000"
                            reward_status_logo.innerHTML = `<svg width="16" height="20" viewBox="0 0 16 20" fill="none" color="${icon_color}" xmlns="http://www.w3.org/2000/svg"><path d="M4.39423 19.2311H11.6058C12.6378 19.2284 13.6267 18.8173 14.3565 18.0875C15.0862 17.3578 15.4973 16.3688 15.5 15.3368V11.1931C15.4989 10.7241 15.312 10.2746 14.9804 9.94298C14.6488 9.61134 14.1993 9.42452 13.7303 9.42338H13.1923V5.67338C13.1923 2.96184 10.8413 0.769531 8 0.769531C5.15865 0.769531 2.80769 2.96184 2.80769 5.67338L2.80769 10.1157H4.53846V5.96184C4.53846 5.04378 4.90316 4.16333 5.55232 3.51416C6.20149 2.865 7.08194 2.5003 8 2.5003C8.91806 2.5003 9.79851 2.865 10.4477 3.51416C11.0968 4.16333 11.4615 5.04378 11.4615 5.96184V9.42338H2.26971C1.80071 9.42452 1.35124 9.61134 1.0196 9.94298C0.687961 10.2746 0.501143 10.7241 0.5 11.1931L0.5 15.3368C0.502665 16.3688 0.913805 17.3578 1.64354 18.0875C2.37327 18.8173 3.36224 19.2284 4.39423 19.2311Z" fill="currentColor"/></svg>`;
                        }

                        var rewards_status_div = mtg("div");
                        rewards_status_div.id = "mtr-rewards-status-div-"+id_num;
                        rewards_status_div.classList.add("mtr-rewards-status-div-"+id_num, "mtr-rewards-status-div");
                        rewards_status_div.style.display = "flex";
                        rewards_status_div.style.flexDirection = "row";
                        rewards_status_div.style.alignItems = "center";
                        rewards_status_div.style.justifyContent = "center";
                        rewards_status_div.style.width = "100%";
                        rewards_status_div.style.paddingTop = "10px";
                        rewards_status_div.style.paddingBottom = "10px";

                        rewards_status_div.appendChild(reward_status_logo);
                        rewards_status_div.appendChild(reward_status_text);

                        reward_referrals_below_div_container.appendChild(reward_referrals_below_div)

                        below_reward_div.appendChild(rewards_status_div);
                        below_reward_div.appendChild(reward_referrals_below_div_container);

                        outer_reward_div.appendChild(h);

                        var progress_bar = mtg("div");
                        progress_bar.classList.add("mtr-reward-li-progress-bar-"+id_num, "mtr-reward-li-progress-bar");
                        progress_bar.style.position = "relative";
                        progress_bar.style.top = "-10px"
                        var mb_progress_bar = g.tools.mobileCheck() ? -15 : el.getAttribute('data-rewards-image-toggle') == 'true' ? -15 : loop_counter == 0 ? 4 : -15;
                        if(loop_counter == 0 && el.getAttribute("data-rewards-orientation")=="column" && el.getAttribute('data-rewards-toggle-'+e.id) == 'true'){
                            progress_bar.style.top = "11px";
                            if (el.getAttribute('data-rewards-image-toggle') == 'true') {
                            progress_bar.style.height = "200px";
                            }
                            loop_counter++;
                        }else if(el.getAttribute("data-rewards-orientation")=="row"){
                            progress_bar.style.top = "11px";
                            progress_bar.style.height = "200px";
                            loop_counter++;
                        }
                        if (RH.optin_data.unlocked_rewards.includes(e.id)){
                        progress_bar.innerHTML = `<span class="mtr-flex mtr-h-9 mtr-items-center auto-style-262"><span class="mtr-relative mtr-flex mtr-h-[9px] mtr-z-20 mtr-w-[9px] mtr-left-[3px] -top-3-mtr mtr-items-center mtr-justify-center mtr-rounded-full mtr-bg-c-green group-hover:mtr-bg-c-green"></span></span><div class="mtr-absolute mtr-z-20 mtr-left-4 mtr-top-0 mtr-left-[6px] mtr-h-full mtr-w-[3px] mtr-bg-c-green" aria-hidden="true"></div><div class="mtr-absolute mtr-z-10 mtr-left-4 mtr-top-0 mtr-left-[6px] mtr-h-full mtr-w-[3px] mtr-bg-white" aria-hidden="true"></div><span class="mtr-absolute mtr-bottom-0 -left-[0.5px]-mtr mtr-z-30 mtr-flex mtr-h-[17px] mtr-w-[17px] mtr-items-center mtr-justify-center mtr-rounded-full mtr-bg-c-green group-hover:mtr-bg-c-green mtr-shrink-0" style="margin-bottom:${mb_progress_bar}px;"><svg class="h-3 w-3 mtr-text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg></span>`
                        }else{
                        progress_bar.innerHTML = `<span class="mtr-flex mtr-h-9 mtr-items-center auto-style-262"><span class="mtr-relative mtr-flex mtr-h-[9px] mtr-z-20 mtr-w-[9px] mtr-left-[3px] -top-3-mtr mtr-items-center mtr-justify-center mtr-rounded-full mtr-bg-c-green group-hover:mtr-bg-c-green"></span></span><div class="mtr-absolute mtr-z-10 mtr-left-4 mtr-top-0 mtr-left-[6px] mtr-h-full mtr-w-[3px] mtr-bg-white" aria-hidden="true"></div><span class="mtr-absolute mtr-bottom-0 -left-[0.5px]-mtr mtr-z-30 mtr-flex mtr-h-[17px] mtr-w-[17px] mtr-items-center mtr-justify-center mtr-rounded-full mtr-bg-white mtr-border-2 mtr-border-c-gray-200 mtr-shrink-0" style="margin-bottom:${mb_progress_bar}px;"></span>`
                        }

                        k.appendChild(progress_bar)
                        k.appendChild(outer_reward_div);
                        k.appendChild(below_reward_div);

                        d.appendChild(k);

                        if(el.getAttribute("data-rewards-orientation")=="column"){
                            rewards_counter.style.display = "none";
                            progress_bar.style.display = "block";
                            outer_reward_div.style.marginLeft = "10px";
                            k.style.display = el.getAttribute('data-rewards-toggle-'+e.id) == 'true' ? 'flex' : 'none';
                            outer_reward_div.style.marginLeft = "10px";
                            reward_referrals_inner_div.style.display = "none";
                            below_reward_div.classList.add("mtr-below-reward-div-list");
                            reward_referrals_below_div.style.display = "block";
                            k.style.width = "90%";
                        }else{
                            progress_bar.style.display = "none";
                            k.style.display = el.getAttribute('data-rewards-toggle-'+e.id) == 'true' ? 'list-item' : 'none';
                            outer_reward_div.style.marginLeft = "";
                            // t.style.display = "block";
                            below_reward_div.classList.add("mtr-below-reward-div");
                            reward_referrals_below_div.style.display = "none";
                            if(new_sorted_array.length > 2){
                                k.style.width = "100%";
                            }else{
                                if((g.tools.mobileCheck() && new_sorted_array.length) || (!g.tools.mobileCheck())){
                                }else{
                                    k.style.width = "50%";
                                }
                            }
                        }

                        if(label_present){
                            // t.style.minWidth = "100%";
                            // t.style.minHeight = "30px";
                            if(e.label){
                            }else{
                                reward_referrals_inner_div.style.backgroundColor = "transparent";
                            }
                        }else{
                            reward_referrals_inner_div.style.display = "none";
                        }

                        if(label_present){
                            reward_referrals_below_div.style.minWidth = "95%";
                            // reward_referrals_below_div.style.minHeight = "30px";
                            if(e.label){
                            }else{
                                reward_referrals_below_div.style.backgroundColor = "transparent";
                            }
                        }else{
                            reward_referrals_below_div.style.display = "none";
                        }

                        if(el.getAttribute("data-progress-bar-rewards-toggle")=="false"){
                            progress_bar.style.display = "none";
                        }



                        //k.appendChild(h); // k = reward
                        //d.appendChild(k); // d = ul
                    }), a.appendChild(rewards_counter) , a.appendChild(d), a.appendChild(swiper_next), a.appendChild(swiper_prev), a.appendChild(swiper_pagination)); // a = mtr-rewards
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.bonus_list 6218");
                    console.error("[ReferralHero] An unexpected error occurred in method generate bonusList:", err);
                }
            }, sharingVerificationBox: function(el, verification, config, RH){
                try{
                    var id_num = g.tools.get_id_number(el.id);
                    f = mtg("div");
                    if ("subscriber_retrieved" != RH.response && ( config.settings.sharing.verification.enabled ) && RH.optin_data && !RH.optin_data.verified) {
                        f = mtg("div");
                        f.id = "mtr-sharing-verification-container-"+id_num;
                        f.classList.add("mtr-sharing-verification-container");
                        f.style.backgroundColor = el.getAttribute('data-verification-bg-color');
                        f.style.minHeight = el.getAttribute('data-verification-height')+'px';
                        
                        if ("subscriber_not_verified" == RH.response || "subscriber_not_verified_sms" == RH.response) f.classList.add("maitre-reminder");
                        
                            if ("subscriber_not_verified" == RH.response || "subscriber_not_verified_sms" == RH.response ){
                            
                                if (false) {
                                    var verification_text =  el.getAttribute('data-verification-text') || 'Do not forget to confirm your email' ;
                                    
                                    var ic = mtg("i");
                                    ic.id = "mtr-sharing-verification-icon-"+id_num;
                                    ic.innerHTML = 'mail';
                                    ic.style.marginRight = '20px';
                                    ic.classList.add("material-icons");
                                    ic.style.fontSize = '40px';
                                    ic.style.fontFamily = 'Material Icons';
                                    ic.style.color = el.getAttribute('data-verification-text-color');
                                    
                                    e = mtg("div");
                                    e.id = "mtr-sharing-verification-"+id_num;
                                    e.classList.add("mtr-sharing-verification", "mtr-sharing-verification-text", "mtr-p-tag");
                                    e.innerHTML =  g.tools.addLinkForCommonEmailsWithText(verification_text, RH);
                                    e.style.color = el.getAttribute('data-verification-text-color');
                                    e.style.fontSize = el.getAttribute('data-verification-text-font-size')+'px';
                                    e.style.fontFamily = g.tools.findFont(el.getAttribute('data-verification-text-font-family'));
                                    e.style.fontWeight = el.getAttribute('data-verification-font-weight');
                                    e.style.fontStyle = el.getAttribute('data-verification-font-style');
                                    e.style.textDecoration = el.getAttribute('data-verification-text-decoration');
                                    e.style.textAlign = "center";
                                    e.style.maxWidth = '100%';
                                    e.style.margin = '0';
                                    f.appendChild(ic);
                                    f.appendChild(e);
                                    f.style.display = "flex";
                                    f.style.flexDirection = "column";
                                    f.style.alignItems = "center";
                                    e.innerHTML = verification.resend_email;
                                    var k = mtg("a");
                                    k.id = "mtr-sharing-verification-resend-email";
                                    k.href = "javascript: void(0);";
                                    k.innerHTML = verification.resend_email;
                                    k.style.color = el.getAttribute('data-verification-text-color');
                                    k.style.fontSize = el.getAttribute('data-verification-text-font-size')+'px';
                                    k.style.fontFamily = g.tools.findFont(el.getAttribute('data-verification-text-font-family'));
                                    k.style.fontWeight = el.getAttribute('data-verification-font-weight');
                                    k.style.fontStyle = el.getAttribute('data-verification-font-style');
                                    k.style.textDecoration = el.getAttribute('data-verification-text-decoration');
                                    k.addEventListener("click", function (p) {
                                        p.preventDefault();
                                        D && (k.innerHTML = verification.resending_email, g.tools.sendEMail(RH.optin_data.email, RH.optin_data.name, RH.confirmation_links.email, function (v) {
                                            k.innerHTML = verification.email_resent;
                                            D = !1
                                        }, function (v) {
                                            k.innerHTML = verification.email_resent;
                                            D = !1;
                                            console.error(config.settings.alerts.server_problem)
                                        }, config))
                                    });
                                    f.appendChild(k)
                                    e.innerHTML = verification.reminder_email;
                                }
        
                                if (false) {
                                    var verification_text =  el.getAttribute('data-verification-text') || 'Do not forget to confirm your sms' ;
                                    
                                    var sic = mtg("i");
                                    sic.id = "mtr-sharing-verification-icon-"+id_num;
                                    sic.innerHTML = 'sms';
                                    sic.style.marginRight = '20px';
                                    sic.style.marginTop = '15px';
                                    sic.classList.add("material-icons");
                                    sic.style.fontSize = '40px';
                                    sic.style.fontFamily = 'Material Icons';
                                    sic.style.color = el.getAttribute('data-verification-text-color');
                                    
                                    se = mtg("div");
                                    se.id = "mtr-sharing-verification-"+id_num;
                                    se.classList.add("mtr-sharing-verification", "mtr-sharing-verification-text", "mtr-p-tag");
                                    se.innerHTML =  g.tools.addLinkForCommonEmailsWithText(verification_text, RH);
                                    se.style.color = el.getAttribute('data-verification-text-color');
                                    se.style.fontSize = el.getAttribute('data-verification-text-font-size')+'px';
                                    se.style.fontFamily = g.tools.findFont(el.getAttribute('data-verification-text-font-family'));
                                    se.style.fontWeight = el.getAttribute('data-verification-font-weight');
                                    se.style.fontStyle = el.getAttribute('data-verification-font-style');
                                    se.style.textDecoration = el.getAttribute('data-verification-text-decoration');
                                    se.style.textAlign = "center";
                                    se.style.maxWidth = '100%';
                                    se.style.margin = '0';
                                    se.style.justifyContent = 'start';
                                    f.appendChild(sic);
                                    f.appendChild(se);
                                    f.style.display = "flex";
                                    f.style.flexDirection = "column";
                                    f.style.alignItems = "center";
                                    
                                    se.innerHTML = verification.resend_sms;
                                    var sh = mtg("a");
                                    sh.id = "mtr-sharing-verification-resend-sms";
                                    sh.href = "javascript: void(0);";
                                    sh.innerHTML = verification.resend_sms;
                                    sh.style.color = el.getAttribute('data-verification-text-color');
                                    sh.style.fontSize = el.getAttribute('data-verification-text-font-size')+'px';
                                    sh.style.fontFamily = g.tools.findFont(el.getAttribute('data-verification-text-font-family'));
                                    sh.style.fontWeight = el.getAttribute('data-verification-font-weight');
                                    sh.style.fontStyle = el.getAttribute('data-verification-font-style');
                                    sh.style.textDecoration = el.getAttribute('data-verification-text-decoration');
                                    sh.addEventListener("click", function (p) {
                                        p.preventDefault();
                                        I && (sh.innerHTML = verification.resending_sms, g.tools.sendSMS(RH.optin_data.phone_number, RH.confirmation_links.sms, function (v) {
                                            sh.innerHTML = verification.sms_resent;
                                            I = !1
                                        }, function (v) {
                                            sh.innerHTML = verification.sms_resent;
                                            I = !1;
                                            console.error(config.settings.alerts.server_problem)
                                        }, config))
                                    });
                                    f.appendChild(sh)
                                    se.innerHTML = verification.reminder_sms;
                                }
                            }
                            else{
                                var verification_text =  el.getAttribute('data-verification-text') || 'Do not forget to confirm your email';
                            
                                if(config.settings.sharing.verification.enabled){
                                    var ic = mtg("i");
                                    ic.id = "mtr-sharing-verification-icon-"+id_num;
                                    ic.innerHTML = 'mail';
                                    ic.style.marginRight = '20px';
                                    ic.classList.add("material-icons");
                                    ic.style.fontSize = '40px';
                                    ic.style.fontFamily = 'Material Icons';
                                    ic.style.color = el.getAttribute('data-verification-text-color');
                                    f.appendChild(ic);
                                } 
                                if(config.settings.sharing.verification.sms_confirmation){
                                    var sic = mtg("i");
                                    sic.id = "mtr-sharing-verification-icon-"+id_num;
                                    sic.innerHTML = 'sms';
                                    sic.style.marginRight = '20px';
                                    sic.classList.add("material-icons");
                                    sic.style.fontSize = '40px';
                                    sic.style.fontFamily = 'Material Icons';
                                    sic.style.color = el.getAttribute('data-verification-text-color');
                                    f.appendChild(sic);
                                }
                                e = mtg("div");
                                e.id = "mtr-sharing-verification-"+id_num;
                                e.classList.add("mtr-sharing-verification", "mtr-sharing-verification-text", "mtr-p-tag");
                                e.innerHTML =  g.tools.addLinkForCommonEmailsWithText(verification_text, RH);
                                e.style.color = el.getAttribute('data-verification-text-color');
                                e.style.fontSize = el.getAttribute('data-verification-text-font-size')+'px';
                                e.style.fontFamily = g.tools.findFont(el.getAttribute('data-verification-text-font-family'));
                                e.style.fontWeight = el.getAttribute('data-verification-font-weight');
                                e.style.fontStyle = el.getAttribute('data-verification-font-style');
                                e.style.textDecoration = el.getAttribute('data-verification-text-decoration');
                                e.style.maxWidth = '100%';
                                e.style.margin = '0';
                                f.appendChild(e);
                            } 
                        
                    }
                    return f;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.sharingVerificationBox 6394");
                    console.error("[ReferralHero] An unexpected error occurred in method generate sharingVerificationBox:", err);
                }
            }, couponBox: function(el, RH){
                try{
                    if(!RH.optin_data){
                        return null;
                    }
                    var id_num = g.tools.get_id_number(el.id);
                    var box = mtg("div");
                    var rewardIdsToCheck = el.getAttribute('data-reward-ids').split(',');
                    var code = null;
                    RH.optin_data.coupon_details.forEach(function(reward) {
                        if (rewardIdsToCheck.includes(reward.reward_id?.toString())) {
                            code = reward.coupon_code;
                            return true;
                        }
                    });
                    if(!code){
                        return null;
                    }

                    box.id = "mtr-coupon-"+id_num;
                    box.style.borderRadius = "5px 0px 0px 5px";
                    box.style.padding = "6.5px";
                    box.style.width = "93%";
                    box.style.textAlign = "left";
                    box.style.color = el.getAttribute('data-coupon-text-color') || "black";
                    box.style.backgroundColor = el.getAttribute('data-coupon-background-color') || '#FFFFFF'
                    box.style.fontFamily = g.tools.findFont(el.getAttribute('data-coupons-text-font-family'));
                    box.style.fontSize = el.getAttribute('data-coupon-font-size')+'px' || "24px";
                    box.style.height = el.getAttribute('data-coupon-line-height')+'px' || "15px";
                    box.style.textAlign = el.getAttribute('data-align') || "left";
                    box.style.fontWeight = el.getAttribute('data-coupon-label-font-weight') || "normal";
                    box.style.fontStyle = el.getAttribute('data-coupon-label-font-style') || "normal";
                    box.style.textDecoration = el.getAttribute('data-coupon-label-text-decoration') || "none";
                    box.style.display = "flex";
                    box.style.alignItems = "center";
                    box.innerText = code;
                
                    var copyButton = document.createElement("div");
                    copyButton.id = "mtr-coupon-button-"+id_num;
                    //copyButton.style.width = "7%";
                    //copyButton.style.height = "fit-content";
                    copyButton.style.borderRadius = "0px 5px 5px 0px";
                    copyButton.style.padding = "6.5px";
                    copyButton.style.backgroundColor = el.getAttribute('data-background-color-for-copy-icon') || '#FFFFFF';
                    copyButton.style.color = el.getAttribute('data-color-for-copy-icon') || '#000000';
                    copyButton.style.height = el.getAttribute('data-coupon-line-height')+'px' || "15px";
                    copyButton.style.display = "flex";
                    copyButton.style.alignItems = "center";

                    var icon = document.createElement("i");
                    icon.classList.add("material-icons");
                    icon.textContent = "content_copy";
                    icon.style.fontFamily = "Material Icons";
                    icon.style.fontSize = "20px";

                    copyButton.appendChild(icon);

                    copyButton.style.cursor = "pointer";
                    copyButton.addEventListener("click", function() {
                    var textarea = document.createElement("textarea");
                    textarea.value = code;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textarea);
                    console.log("Coupon code copied to clipboard: " + code);
                    });
                
                    var container = document.createElement("div");
                    container.style.display = "flex";
                    container.style.alignItems = "center";
                    container.style.flexDirection = "row";
                    container.style.justifyContent = "space-between";
                    container.style.padding = "1px";
                    container.style.backgroundColor = "#FFFFFF"
                    //container.style.padding = "7px 20px"
                    container.style.borderRadius = "6px"
                    container.style.borderStyle = "solid"
                    container.style.borderWidth = "1px"
                    container.style.borderColor = "#afaeb2"
                    container.style.width = "95%"
                    container.appendChild(box);
                    container.appendChild(copyButton);
                
                    return container;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.couponBox 6483");
                    console.error("[ReferralHero] An unexpected error occurred in method generate couponBox:", err);
                }
            }, subscriberPositionStats: function(el, config, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);
            
                    // Sharing screen subscribers position container
                    var sharing_subs_container = mtg("div");
                    sharing_subs_container.id = "mtr-sharing-subscriber-position-container-"+id_num;
                    sharing_subs_container.classList.add("mtr-sharing-subscriber-position-container");
                    sharing_subs_container.style.fontFamily = g.tools.findFont(el.getAttribute('data-stats-text-font-family'));
                    // sharing_subs_container.style.backgroundColor = el.getAttribute('data-stats-bg-color');
                    sharing_subs_container.style.display = "flex";
                    sharing_subs_container.style.justifyContent = 'space-evenly';
                    sharing_subs_container.style.width = "100%";
                    sharing_subs_container.style.alignItems = "center";
            

                    var sharing_subs_people_referred_outer_div = mtg("div");
                    sharing_subs_people_referred_outer_div.id = "mtr-sharing-people-referred-outer-div-"+id_num;
                    sharing_subs_people_referred_outer_div.classList.add("mtr-sharing-people-referred-outer-div");
                    sharing_subs_people_referred_outer_div.classList.add("stats-outer-div");

                    // Sharing screen people referred
                    var sharing_subs_people_referred_container = mtg("div");
                    sharing_subs_people_referred_container.id = "mtr-sharing-people-referred-container-"+id_num;
                    sharing_subs_people_referred_container.classList.add("mtr-sharing-people-referred-container");
                    sharing_subs_people_referred_container.classList.add("mtr-sharing-people-item");
                    sharing_subs_people_referred_container.classList.add("stats-outer-div");
                    //sharing_subs_people_referred_container.style.marginLeft = (el.getAttribute('data-stats-position')+ '%' );
                    sharing_subs_people_referred_container.style.borderColor = el.getAttribute("data-stats-border-color");
                    if(el.getAttribute("data-stats-width-box") != ""){
                    sharing_subs_people_referred_container.style.maxWidth = el.getAttribute("data-stats-width-box")+'px';
                    }
                    if(el.getAttribute("data-stats-height-box") != ""){
                    sharing_subs_people_referred_container.style.height = el.getAttribute("data-stats-height-box")+'px';
                    }
                    if(el.getAttribute("data-stats-padding-box") != ""){
                    sharing_subs_people_referred_container.style.padding = el.getAttribute("data-stats-padding-box")+'px';
                    }
                    sharing_subs_people_referred_container.style.backgroundColor = el.getAttribute("data-stats-container-color");
                    sharing_subs_people_referred_container.style.borderLeftStyle = el.getAttribute("data-border-left-style")
                    sharing_subs_people_referred_container.style.borderRightStyle = el.getAttribute("data-border-right-style")
                    sharing_subs_people_referred_container.style.borderBottomStyle = el.getAttribute("data-border-bottom-style")
                    sharing_subs_people_referred_container.style.borderTopStyle = el.getAttribute("data-border-top-style")
                    sharing_subs_people_referred_container.style.borderWidth = el.getAttribute("data-border-size-stats")+'px'
                    sharing_subs_people_referred_container.style.borderRadius = el.getAttribute("data-border-radius-stats")+'px'

                    var sharing_subs_people_referred_div = mtg("div");
                    sharing_subs_people_referred_div.id = "mtr-sharing-people-referred-div-"+id_num;
                    sharing_subs_people_referred_div.classList.add("rounded-stats-bg");
                    sharing_subs_people_referred_div.style.backgroundColor = el.getAttribute("data-stats-bg-color");
                    sharing_subs_people_referred_div.style.whiteSpace = "nowrap";


                    var sharing_subs_people_referred = mtg("div");
                    sharing_subs_people_referred.id = "mtr-sharing-people-referred-"+id_num;
                    sharing_subs_people_referred_count_text = el.getAttribute('data-stats-referral-count-text') || "";
                    sharing_subs_people_referred.classList.add("mtr-sharing-people-referred", "stats-heading-"+id_num, "stats-"+id_num, "mtr-math-auto", "mtr-header-4");
                    sharing_subs_people_referred.innerHTML = g.tools.numberWithCommas((RH.optin_data ? config.settings.is_conversion_events_goal ? (RH.optin_data.total_referrals+" "+ sharing_subs_people_referred_count_text) : (RH.optin_data.points+" "+sharing_subs_people_referred_count_text) : 1));
                    sharing_subs_people_referred.style.color = el.getAttribute('data-stats-text-color');
                    sharing_subs_people_referred.style.fontSize = el.getAttribute('data-stats-text-font-size')+'px';
                    sharing_subs_people_referred.style.fontWeight = el.getAttribute('data-stats-label-font-weight');
                    sharing_subs_people_referred.style.fontStyle = el.getAttribute('data-stats-label-font-style');
                    sharing_subs_people_referred.style.textDecoration = el.getAttribute('data-stats-label-text-decoration');
                    sharing_subs_people_referred.style.paddingBottom = el.getAttribute('data-stats-margin')+ 'px';
                    sharing_subs_people_referred.style.fontFamily = g.tools.findFont(el.getAttribute('data-stats-text-font-family'));
                    //sharing_subs_people_referred.style.backgroundColor = el.getAttribute('data-stats-bg-color');
                    sharing_subs_people_referred_div.appendChild(sharing_subs_people_referred)
                    sharing_subs_people_referred.style.minWidth = "14px";
                    sharing_subs_people_referred.style.minHeight = "14px";

                    //---------------------------------

                    var sharing_subs_people_referred_text = mtg("div");
                    sharing_subs_people_referred_text.id = "mtr-sharing-people-referred-text-"+id_num;
                    sharing_subs_people_referred_text.classList.add("mtr-sharing-people-referred-text", "stats-label-"+id_num, "stats-"+id_num, "mtr-p-tag");
                    sharing_subs_people_referred_text.innerHTML = el.getAttribute('data-stats-referral-text');
                    //sharing_subs_people_referred_text.style.backgroundColor = el.getAttribute('data-stats-label-bg-color');
                    sharing_subs_people_referred_text.style.color = el.getAttribute('data-stats-text-color');
                    sharing_subs_people_referred_text.style.fontSize = el.getAttribute('data-stats-label-font-size')+'px';
                    sharing_subs_people_referred_text.style.fontWeight = el.getAttribute('data-stats-label-font-weight');
                    sharing_subs_people_referred_text.style.fontStyle = el.getAttribute('data-stats-label-font-style');
                    sharing_subs_people_referred_text.style.textDecoration = el.getAttribute('data-stats-label-text-decoration');
                    sharing_subs_people_referred_text.style.fontFamily = g.tools.findFont(el.getAttribute('data-stats-text-font-family'));
                    sharing_subs_people_referred_text.style.paddingTop = el.getAttribute('data-stats-margin')+ 'px';

                    var icon_svg_color = el.getAttribute('data-stats-icon-color') || '#000000';

                    var people_referred_image = mtg('div');
                    people_referred_image.id = "mtr-icon-people-referred-"+id_num;
                    people_referred_image.classList.add("mtr-icon-stats-"+id_num);
                    //people_referred_image.src ="https://app.referralhero.com/assets/icon_points-e123da4208f3aa5716cdf3441adb8346606cc895fb85bbcbe4f4a2ea28e96ff9.svg";
                    //people_referred_image.alt = "Points";
                    people_referred_image.innerHTML = `<svg class="auto-style-263" viewBox="0 0 40 40" color="${icon_svg_color}" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2426_48500)"><rect width="40" height="40" rx="20" fill="${el.getAttribute("data-stats-bg-color")}"/><path d="M20.5813 10.4309L22.4156 13.7481C22.667 14.2034 23.2978 14.636 23.8165 14.6944L26.9042 15.0826C28.8812 15.3268 29.391 16.7299 28.0456 18.1995L25.7533 20.6892C25.3707 21.1064 25.172 21.9023 25.3258 22.4487L26.129 25.3798C26.7607 27.694 25.5593 28.6531 23.4481 27.5164L20.4989 25.9283C19.9618 25.6379 19.1086 25.6802 18.604 26.0062L15.7965 27.8234C13.7867 29.1223 12.5078 28.2672 12.9488 25.911L13.5135 22.9292C13.6189 22.3718 13.3662 21.594 12.9489 21.2113L10.4456 18.9154C8.98465 17.5649 9.37763 16.1256 11.3244 15.7176L14.3642 15.0826C14.8772 14.9712 15.4717 14.5009 15.6805 14.0224L17.2378 10.5599C18.0891 8.69428 19.5909 8.6355 20.5813 10.4309Z" fill="currentColor"/></g><defs><clipPath id="clip0_2426_48500"><rect width="40" height="40" fill="white"/></clipPath></defs></svg>`
            
                    sharing_subs_people_referred_container.appendChild(people_referred_image);
                    sharing_subs_people_referred_container.appendChild(sharing_subs_people_referred_text);
                    sharing_subs_people_referred_container.appendChild(sharing_subs_people_referred_div);
            
                    sharing_subs_container.appendChild(sharing_subs_people_referred_container);
            
                    // Sharing screen positions
                    var sharing_subs_people_position_container = mtg("div");
                    sharing_subs_people_position_container.id = "mtr-sharing-people-position-container-"+id_num;
                    sharing_subs_people_position_container.classList.add("mtr-sharing-people-position-container");
                    sharing_subs_people_position_container.classList.add("mtr-sharing-people-item");
                    sharing_subs_people_position_container.classList.add("stats-outer-div");
                    //sharing_subs_people_position_container.style.marginRight = ( el.getAttribute('data-stats-position')+ '%' );
            
                    sharing_subs_people_position_container.style.borderColor = el.getAttribute("data-stats-border-color")
                    if(el.getAttribute("data-stats-width-box") != ""){
                    sharing_subs_people_position_container.style.maxWidth = el.getAttribute("data-stats-width-box")+'px';
                    }
                    if(el.getAttribute("data-stats-height-box") != ""){
                    sharing_subs_people_position_container.style.height = el.getAttribute("data-stats-height-box")+'px';
                    }
                    if(el.getAttribute("data-stats-padding-box") != ""){
                    sharing_subs_people_position_container.style.padding = el.getAttribute("data-stats-padding-box")+'px';
                    }
                    sharing_subs_people_position_container.style.backgroundColor = el.getAttribute("data-stats-container-color");
                    sharing_subs_people_position_container.style.borderLeftStyle = el.getAttribute("data-border-left-style")
                    sharing_subs_people_position_container.style.borderRightStyle = el.getAttribute("data-border-right-style")
                    sharing_subs_people_position_container.style.borderBottomStyle = el.getAttribute("data-border-bottom-style")
                    sharing_subs_people_position_container.style.borderTopStyle = el.getAttribute("data-border-top-style")
                    sharing_subs_people_position_container.style.borderWidth = el.getAttribute("data-border-size-stats")+'px'
                    sharing_subs_people_position_container.style.borderRadius = el.getAttribute("data-border-radius-stats")+'px'

                    var sharing_subs_people_position_div = mtg("div");
                    sharing_subs_people_position_div.id = "mtr-sharing-people-position-div-"+id_num;
                    sharing_subs_people_position_div.classList.add("rounded-stats-bg");
                    sharing_subs_people_position_div.style.backgroundColor = el.getAttribute("data-stats-position-color");


                    var sharing_subs_people_position = mtg("div");
                    sharing_subs_people_position.id = "mtr-sharing-people-position-"+id_num;
                    sharing_subs_people_position.classList.add("mtr-sharing-people-position", "stats-heading-"+id_num, "stats-"+id_num, "mtr-header-4");
            

                    sharing_subs_people_position.style.fontSize = el.getAttribute('data-stats-text-font-size')+'px';
                    sharing_subs_people_position.style.fontWeight = el.getAttribute('data-stats-label-font-weight');
                    sharing_subs_people_position.style.fontStyle = el.getAttribute('data-stats-label-font-style');
                    sharing_subs_people_position.style.textDecoration = el.getAttribute('data-stats-label-text-decoration');
                    sharing_subs_people_position.style.paddingBottom = el.getAttribute('data-stats-margin')+ 'px'
                    sharing_subs_people_position.style.whiteSpace = "nowrap"
            
                    var position_widget = "";
                    position_widget = "random_winner" == config.settings.tool ? w ? 10 : RH.optin_data.points : w ? config.settings.sharing.position.ordinal ? "35th" : 35 : config.settings.sharing.position.ordinal ? RH.optin_data.position_ordinal : RH.optin_data.position;
                    sharing_subs_people_position.innerHTML = position_widget;
                    sharing_subs_people_position.style.color = el.getAttribute('data-stats-text-color');

                    var sharing_subs_people_position_text = mtg("div");
                    sharing_subs_people_position_text.id = "mtr-sharing-people-position-text-"+id_num;
                    sharing_subs_people_position_text.classList.add("mtr-sharing-people-position-text", "stats-label-"+id_num, "stats-"+id_num, "mtr-p-tag");
                    sharing_subs_people_position_text.innerHTML = el.getAttribute('data-stats-position-text');
                    //sharing_subs_people_position_text.style.color = el.getAttribute('data-stats-label-color');
                    //sharing_subs_people_position_text.style.backgroundColor = el.getAttribute('data-stats-label-bg-color');
                    sharing_subs_people_position_text.style.color = el.getAttribute('data-stats-text-color');
                    sharing_subs_people_position_text.style.fontSize = el.getAttribute('data-stats-label-font-size')+'px';
                    sharing_subs_people_position_text.style.fontWeight = el.getAttribute('data-stats-label-font-weight');
                    sharing_subs_people_position_text.style.fontStyle = el.getAttribute('data-stats-label-font-style');
                    sharing_subs_people_position_text.style.textDecoration = el.getAttribute('data-stats-label-text-decoration');
                    sharing_subs_people_position_text.style.paddingTop = el.getAttribute('data-stats-margin')+ 'px';
                    sharing_subs_people_position_text.style.fontFamily = g.tools.findFont(el.getAttribute('data-stats-text-font-family'));


                    sharing_subs_people_position_div.appendChild(sharing_subs_people_position)


                    var people_position_image = mtg('div');
                    people_position_image.id = "mtr-icon-people-position-"+id_num;
                    people_position_image.classList.add("mtr-icon-stats-"+id_num);
                    //people_position_image.src = "https://app.referralhero.com/assets/icon_position-0f336984b0e6ac20003fcdb803f4f6a59ee20b356230e47ae1ed2691d0475042.svg";
                    //people_position_image.alt = "Position";
                    people_position_image.innerHTML = `<svg class="auto-style-263" viewBox="0 0 40 40" color="${icon_svg_color}" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1973_55674)"><rect width="40" height="40" rx="20" fill="${el.getAttribute("data-stats-position-color")}"/><rect width="40" height="40" fill="${el.getAttribute("data-stats-position-color")}"/><path d="M14.67 21H12C10.9 21 10 21.9 10 23V28C10 28.55 10.45 29 11 29H14.67C15.22 29 15.67 28.55 15.67 28V22C15.67 21.45 15.22 21 14.67 21Z" fill="currentColor"/><path d="M21.3302 17H18.6602C17.5602 17 16.6602 17.9 16.6602 19V28C16.6602 28.55 17.1102 29 17.6602 29H22.3302C22.8802 29 23.3302 28.55 23.3302 28V19C23.3302 17.9 22.4402 17 21.3302 17Z" fill="currentColor"/><path d="M28.0001 24H25.3301C24.7801 24 24.3301 24.45 24.3301 25V28C24.3301 28.55 24.7801 29 25.3301 29H29.0001C29.5501 29 30.0001 28.55 30.0001 28V26C30.0001 24.9 29.1001 24 28.0001 24Z" fill="currentColor"/><path d="M23.0095 11.8505C23.3195 11.5405 23.4395 11.1705 23.3395 10.8505C23.2395 10.5305 22.9295 10.3005 22.4895 10.2305L21.5295 10.0705C21.4895 10.0705 21.3995 10.0005 21.3795 9.96047L20.8495 8.90047C20.4495 8.09047 19.5395 8.09047 19.1395 8.90047L18.6095 9.96047C18.5995 10.0005 18.5095 10.0705 18.4695 10.0705L17.5095 10.2305C17.0695 10.3005 16.7695 10.5305 16.6595 10.8505C16.5595 11.1705 16.6795 11.5405 16.9895 11.8505L17.7295 12.6005C17.7695 12.6305 17.7995 12.7505 17.7895 12.7905L17.5795 13.7105C17.4195 14.4005 17.6795 14.7105 17.8495 14.8305C18.0195 14.9505 18.3895 15.1105 18.9995 14.7505L19.8995 14.2205C19.9395 14.1905 20.0695 14.1905 20.1095 14.2205L20.9995 14.7505C21.2795 14.9205 21.5095 14.9705 21.6895 14.9705C21.8995 14.9705 22.0495 14.8905 22.1395 14.8305C22.3095 14.7105 22.5695 14.4005 22.4095 13.7105L22.1995 12.7905C22.1895 12.7405 22.2195 12.6305 22.2595 12.6005L23.0095 11.8505Z" fill="currentColor"/></g><defs><clipPath id="clip0_1973_55674"><rect width="40" height="40" rx="20" fill="white"/></clipPath></defs></svg>`


                    sharing_subs_people_position_container.appendChild(people_position_image);
                    sharing_subs_people_position_container.appendChild(sharing_subs_people_position_text);
                    sharing_subs_people_position_container.appendChild(sharing_subs_people_position_div);

                    var sharing_subs_commission_paid_container = mtg("div");
                    sharing_subs_commission_paid_container.id = "mtr-sharing-commission-paid-container-"+id_num;
                    sharing_subs_commission_paid_container.classList.add("mtr-sharing-commission-paid-container");
                    sharing_subs_commission_paid_container.classList.add("mtr-sharing-people-item");
                    sharing_subs_commission_paid_container.classList.add("stats-outer-div");
                    sharing_subs_commission_paid_container.style.borderColor = el.getAttribute("data-stats-border-color")
                    if(el.getAttribute("data-stats-width-box") != ""){
                    sharing_subs_commission_paid_container.style.maxWidth = el.getAttribute("data-stats-width-box")+'px';
                    }
                    if(el.getAttribute("data-stats-height-box") != ""){
                    sharing_subs_commission_paid_container.style.height = el.getAttribute("data-stats-height-box")+'px';
                    }
                    if(el.getAttribute("data-stats-padding-box") != ""){
                    sharing_subs_commission_paid_container.style.padding = el.getAttribute("data-stats-padding-box")+'px';
                    }
                    sharing_subs_commission_paid_container.style.backgroundColor = el.getAttribute("data-stats-container-color");
                    sharing_subs_commission_paid_container.style.borderLeftStyle = el.getAttribute("data-border-left-style")
                    sharing_subs_commission_paid_container.style.borderRightStyle = el.getAttribute("data-border-right-style")
                    sharing_subs_commission_paid_container.style.borderBottomStyle = el.getAttribute("data-border-bottom-style")
                    sharing_subs_commission_paid_container.style.borderTopStyle = el.getAttribute("data-border-top-style")
                    sharing_subs_commission_paid_container.style.borderWidth = el.getAttribute("data-border-size-stats")+'px'
                    sharing_subs_commission_paid_container.style.borderRadius = el.getAttribute("data-border-radius-stats")+'px'

                    var sharing_subs_commission_paid_div = mtg("div");
                    sharing_subs_commission_paid_div.id = "mtr-sharing-commission-paid-div-"+id_num;
                    sharing_subs_commission_paid_div.classList.add("rounded-stats-bg");
                    sharing_subs_commission_paid_div.style.backgroundColor = el.getAttribute("data-stats-commission-color") != undefined ? el.getAttribute("data-stats-commission-color") : "#90ee90";
                    sharing_subs_commission_paid_div.style.whiteSpace = "nowrap";

                    var sharing_subs_commission_paid = mtg("div");
                    sharing_subs_commission_paid.id = "mtr-sharing-commission-paid-"+id_num;
                    sharing_subs_commission_paid.classList.add("mtr-sharing-commission-paid", "stats-heading-"+id_num, "stats-"+id_num, "mtr-header-4");
                    sharing_subs_commission_paid.style.fontSize = el.getAttribute('data-stats-text-font-size')+'px';
                    sharing_subs_commission_paid.style.fontWeight = el.getAttribute('data-stats-label-font-weight');
                    sharing_subs_commission_paid.style.fontStyle = el.getAttribute('data-stats-label-font-style');
                    sharing_subs_commission_paid.style.textDecoration = el.getAttribute('data-stats-label-text-decoration');
                    sharing_subs_commission_paid.style.paddingBottom = el.getAttribute('data-stats-margin')+ 'px'

                    var cur_symbol = el.getAttribute("data-stats-currency-symbol") != undefined ? el.getAttribute("data-stats-currency-symbol") : "$";
                    var com_paid = `${cur_symbol}`+RH.optin_data.commission_paid;
                    sharing_subs_commission_paid.innerHTML = `${com_paid}`;
                    sharing_subs_commission_paid.style.color = el.getAttribute('data-stats-text-color');
                    //sharing_subs_commission_paid.style.backgroundColor = el.getAttribute('data-stats-bg-color');

                    var sharing_subs_commission_paid_text = mtg("div");
                    sharing_subs_commission_paid_text.id = "mtr-sharing-commission-paid-text-"+id_num;
                    sharing_subs_commission_paid_text.classList.add("mtr-sharing-commission-paid-text", "stats-label-"+id_num, "stats-"+id_num, "mtr-p-tag");
                    sharing_subs_commission_paid_text.innerHTML = el.getAttribute('data-stats-commission-paid-text') != undefined ? el.getAttribute('data-stats-commission-paid-text') : 'Your Commission' ;
                    //sharing_subs_commission_paid_text.style.backgroundColor = el.getAttribute('data-stats-label-bg-color');
                    sharing_subs_commission_paid_text.style.color = el.getAttribute('data-stats-text-color');
                    sharing_subs_commission_paid_text.style.fontSize = el.getAttribute('data-stats-label-font-size')+'px';
                    sharing_subs_commission_paid_text.style.fontWeight = el.getAttribute('data-stats-label-font-weight');
                    sharing_subs_commission_paid_text.style.fontStyle = el.getAttribute('data-stats-label-font-style');
                    sharing_subs_commission_paid_text.style.textDecoration = el.getAttribute('data-stats-label-text-decoration');
                    sharing_subs_commission_paid_text.style.paddingTop = el.getAttribute('data-stats-margin')+ 'px';
                    sharing_subs_commission_paid_text.style.fontFamily = g.tools.findFont(el.getAttribute('data-stats-text-font-family'));

                    sharing_subs_commission_paid_div.appendChild(sharing_subs_commission_paid)
                    
                    var stats_commission_icon = mtg('div');
                    stats_commission_icon.id = "mtr-icon-commission-paid-"+id_num;
                    stats_commission_icon.classList.add("mtr-icon-stats-"+id_num, "mtr-icon-stats");
                    //stats_commission_icon.src = "https://app.referralhero.com/assets/icon_position-0f336984b0e6ac20003fcdb803f4f6a59ee20b356230e47ae1ed2691d0475042.svg";
                    //stats_commission_icon.alt = "Position";
                    var com_color = el.getAttribute("data-stats-commission-color") != undefined ? el.getAttribute("data-stats-commission-color") : "#90ee90";
                    stats_commission_icon.innerHTML =  `<svg width="40" height="40" viewBox="0 0 40 40" fill="${icon_svg_color}" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="${com_color}"/>
                        <path d="M18.08 15.9339C18.3637 15.7089 18.7012 15.5452 19.0625 15.4414V18.9352C18.7059 18.8375 18.372 18.6706 18.08 18.4439C17.5875 18.0527 17.3975 17.5927 17.3975 17.1889C17.3975 16.7852 17.5875 16.3252 18.08 15.9339ZM20.9375 24.5789V21.0489C21.3712 21.1552 21.7675 21.3339 22.0887 21.5752C22.6225 21.9752 22.8125 22.4327 22.8125 22.8139C22.8125 23.1952 22.6225 23.6527 22.0887 24.0527C21.7442 24.3033 21.3526 24.4831 20.9375 24.5789Z" fill="${com_color}"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20 7.8125C13.2687 7.8125 7.8125 13.2687 7.8125 20C7.8125 26.7313 13.2687 32.1875 20 32.1875C26.7313 32.1875 32.1875 26.7313 32.1875 20C32.1875 13.2687 26.7313 7.8125 20 7.8125ZM20.9375 12.5C20.9375 12.2514 20.8387 12.0129 20.6629 11.8371C20.4871 11.6613 20.2486 11.5625 20 11.5625C19.7514 11.5625 19.5129 11.6613 19.3371 11.8371C19.1613 12.0129 19.0625 12.2514 19.0625 12.5V13.52C18.2786 13.6519 17.5398 13.9767 16.9125 14.465C16.0225 15.1725 15.5225 16.1525 15.5225 17.1875C15.5225 18.2237 16.0225 19.2025 16.9138 19.91C17.5413 20.41 18.2913 20.7188 19.0625 20.855V24.5775C18.6473 24.4813 18.2557 24.3023 17.9113 24.0513L16.8125 23.2263C16.714 23.1524 16.6019 23.0986 16.4827 23.0681C16.3634 23.0375 16.2393 23.0308 16.1174 23.0482C15.8713 23.0833 15.6492 23.2148 15.5 23.4137C15.3508 23.6127 15.2868 23.8627 15.3219 24.1088C15.3571 24.355 15.4886 24.5771 15.6875 24.7263L16.7862 25.5512C17.4525 26.0512 18.2475 26.3575 19.0625 26.4887V27.5C19.0625 27.7486 19.1613 27.9871 19.3371 28.1629C19.5129 28.3387 19.7514 28.4375 20 28.4375C20.2486 28.4375 20.4871 28.3387 20.6629 28.1629C20.8387 27.9871 20.9375 27.7486 20.9375 27.5V26.4875C21.7607 26.3638 22.5417 26.0425 23.2138 25.5512C24.145 24.8525 24.6875 23.8713 24.6875 22.8125C24.6875 21.7537 24.145 20.7725 23.2138 20.0738C22.5419 19.5819 21.7609 19.2602 20.9375 19.1363V15.4425C21.3 15.545 21.6363 15.7087 21.92 15.9337L22.4388 16.3462C22.6335 16.5009 22.8817 16.5719 23.1288 16.5435C23.3759 16.5151 23.6016 16.3898 23.7563 16.195C23.9109 16.0002 23.9819 15.752 23.9535 15.5049C23.9251 15.2578 23.7998 15.0322 23.605 14.8775L23.0862 14.465C22.4592 13.9773 21.7209 13.653 20.9375 13.5212V12.5Z" fill="${icon_svg_color}"/>
                    </svg>`;
                    sharing_subs_commission_paid_container.appendChild(stats_commission_icon);
                    sharing_subs_commission_paid_container.appendChild(sharing_subs_commission_paid_text);
                    sharing_subs_commission_paid_container.appendChild(sharing_subs_commission_paid_div);
            
                    if(el.getAttribute('data-stats-display-type') == "row"){
                    sharing_subs_container.style.flexDirection = 'column';
                    sharing_subs_people_referred_container.classList.add('mtr-sharing-people-item-row')
                    sharing_subs_people_position_container.classList.add('mtr-sharing-people-item-row')
                    sharing_subs_commission_paid_container.classList.add('mtr-sharing-people-item-row')
                    sharing_subs_people_referred_text.classList.add('mtr-sharing-people-text-horizontal')
                    sharing_subs_people_position_text.classList.add('mtr-sharing-people-text-horizontal')
                    sharing_subs_commission_paid_text.classList.add('mtr-sharing-people-text-horizontal')
                    people_referred_image.classList.remove("mtr-icon-size-vertical")
                    people_position_image.classList.remove("mtr-icon-size-vertical")
                    stats_commission_icon.classList.remove("mtr-icon-size-vertical")
                    }else{
                    sharing_subs_container.style.flexDirection = 'row';
                    sharing_subs_people_referred_container.classList.add('mtr-sharing-people-item-col')
                    sharing_subs_people_position_container.classList.add('mtr-sharing-people-item-col')
                    sharing_subs_commission_paid_container.classList.add('mtr-sharing-people-item-col')
                    sharing_subs_people_referred_text.classList.add('mtr-sharing-people-text-vertical')
                    sharing_subs_people_position_text.classList.add('mtr-sharing-people-text-vertical')
                    sharing_subs_commission_paid_text.classList.add('mtr-sharing-people-text-vertical')
                    people_referred_image.classList.add("mtr-icon-size-vertical")
                    people_position_image.classList.add("mtr-icon-size-vertical")
                    stats_commission_icon.classList.add("mtr-icon-size-vertical")
                    }


                    sharing_subs_container.appendChild(sharing_subs_people_position_container);
                    sharing_subs_container.appendChild(sharing_subs_commission_paid_container);

                    if(el.getAttribute("data-stats-show-referrals") != undefined && el.getAttribute("data-stats-show-referrals") == "false"){
                    sharing_subs_people_referred_container.style.display = "none"
                    }
                    if(el.getAttribute("data-stats-show-position") != undefined && el.getAttribute("data-stats-show-position") == "false"){
                    sharing_subs_people_position_container.style.display = "none"
                    }
                    if(el.getAttribute("data-stats-show-commission") != undefined && el.getAttribute("data-stats-show-commission") == "false"){
                    sharing_subs_commission_paid_container.style.display = "none"
                    }
            
                    return sharing_subs_container;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.subscriberPositionStats 6778");
                    console.error("[ReferralHero] An unexpected error occurred in method generate subscriberPositionStats:", err);
                }
            }, howItWorks: function (el, config, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);

                    const container = mtg("div");
                    container.id = "mtr-how-it-works-container-" + id_num;
                    container.classList.add("mtr-how-it-works-container");
                    container.style.backgroundColor = el.getAttribute("data-element-bg-color") || "#f1f0f5";

                    const title = mtg("div");
                    title.id = "hiw-title-" + id_num;
                    title.classList.add("mtr-hiw-title");
                    title.innerText = el.getAttribute("data-hiw-title");
                    container.appendChild(title);

                    const steps = [
                    { icon: "share", titleKey: "data-hiw-title1", descKey: "data-hiw-description1", index: 1 },
                    { icon: "person_add_alt", titleKey: "data-hiw-title2", descKey: "data-hiw-description2", index: 2},
                    { icon: "local_atm", titleKey: "data-hiw-title3", descKey: "data-hiw-description3", index: 3, last: true }
                    ];

                    const createStep = ({ icon, titleKey, descKey, index, last }) => {
                    const main = mtg("div");
                    main.className = last ? "mtr-hiw-step-container mtr-hiw-last-step" : "mtr-hiw-step-container";
                    if (!last) {
                        const divider = mtg("div");
                        divider.classList.add("mtr-hiw-step-divider");
                        main.appendChild(divider);
                    }

                    const step = mtg("div");
                    step.classList.add("mtr-hiw-step");

                    const iconDiv = mtg("div");
                    iconDiv.className = last ? "mtr-hiw-icon mtr-current-step" : "mtr-hiw-icon";
                    const iconClass = last ? "auto-style-64 hiw-icon-color material-icons" : "auto-style-64 material-icons";
                    iconDiv.innerHTML = `<i class="${iconClass}">${icon}</i>`;

                    const content = mtg("div");
                    content.classList.add("mtr-hiw-content");

                    const stepTitle = mtg("div");
                    stepTitle.id = `hiw-title${index}-${id_num}`;
                    stepTitle.classList.add("mtr-hiw-subtitle");
                    stepTitle.innerText = el.getAttribute(titleKey);

                    const stepDesc = mtg("div");
                    stepDesc.id = `hiw-description${index}-${id_num}`;
                    stepDesc.classList.add("hiw-description");
                    stepDesc.innerText = el.getAttribute(descKey);

                    content.append(stepTitle, stepDesc);
                    step.append(iconDiv, content);
                    main.appendChild(step);

                    return main;
                    };

                    steps.forEach(step => container.appendChild(createStep(step)));

                    return container;
                }catch (err) {
                    console.error("[ReferralHero] An unexpected error occurred in method generate howItWorks:", err);
                }
            }, faqBox: function (el, config, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);
                    const faqs = JSON.parse(el.getAttribute('data-faq') || '[]');

                    const accordian = mtg("div");
                    accordian.id = "mtr-faq-accordian-" + id_num;
                    accordian.classList.add("mtr-faq-accordion");

                    const container = mtg("div");
                    container.id = "mtr-faq-container-" + id_num;
                    container.classList.add("mtr-faq-container");
                    container.style.backgroundColor = el.getAttribute("data-element-bg-color") || "#f1f0f5";

                    const mainTitle = mtg("div");
                    mainTitle.classList.add("mtr-faq-main-title");
                    mainTitle.innerText = el.getAttribute("data-faq-title") || "";
                    container.appendChild(mainTitle);

                    faqs.forEach(faq => {
                        const panel = mtg("div");
                        panel.classList.add("mtr-faq-panel");

                        const title = mtg("div");
                        title.classList.add("mtr-faq-title");
                        title.innerText = faq.title;

                        const icon = document.createElement("i");
                        icon.className = "material-icons mtr-faq-icon";
                        icon.textContent = "add";
                        title.appendChild(icon);

                        const desc = mtg("div");
                        desc.classList.add("mtr-faq-description");

                        const desc_inner = mtg("div");
                        desc_inner.classList.add("mtr-faq-description-inner");
                        desc_inner.innerText = faq.description;
                        desc.appendChild(desc_inner);

                        title.onclick = () => {
                            const open = desc.classList.toggle("open");
                            icon.textContent = open ? "remove" : "add";
                        };

                        panel.append(title, desc);
                        container.appendChild(panel);
                    });

                    accordian.appendChild(container);
                    return accordian;
                }catch (err) {
                    console.error("[ReferralHero] An unexpected error occurred in method generate faqBox:", err);
                }
            }, socialActionsBox: function(el, config, RH){
                try{
                    var id_num = g.tools.get_id_number(el.id);
            
                    var sharing_socials_container = mtg("div");
                    sharing_socials_container.id = "mtr-sharing-socials-container-"+id_num;
                    sharing_socials_container.classList.add("mtr-sharing-socials-actions-container");
                    sharing_socials_container.style.width = '100%';
                    sharing_socials_container.style.display = 'flex';
                    sharing_socials_container.style.alignItems = 'center';
                    sharing_socials_container.style.flexDirection = 'column';
                    sharing_socials_container.style.borderRadius = '20px';
                    sharing_socials_container.style.backgroundColor = el.getAttribute('data-element-bg-color') || '#f1f0f5';

                    var socials = el.getAttribute('data-social-actions-icon-order').split(" ");
                    socials = socials.filter(function(str) {
                        return /\S/.test(str);
                    });
                    socials.forEach(function(social) {
                        var social_div = mtg("div");
                        social_div.target = '_blank';
                        social_div.classList.add("mtr-sharing-social-action-container")
                        social_div.classList.add("mtr-border-b")
                        social_div.classList.add("mtr-border-c-gray-200")
                        social_div.style.width = '95%';
                        social_div.style.padding = '10px';
                        social_div.style.marginBottom = '4px';
                        social_div.style.alignItems = 'center';
                        var mini_social = social.replace("_", "-").toLowerCase();
                        var the_social_container = mtg("div");
                        the_social_container.classList.add("mtr-sharing-social-container");
                        the_social_bg_color = ( el.getAttribute(`data-social-actions-${social}-icon-type`) == 'customize' && el.getAttribute(`data-social-actions-${social}-bg-color`)) || el.getAttribute(`data-social-actions-${social}-default-bg-color`)
                        
                        var the_social_background = mtg("div");
                        the_social_background.classList.add("mtr-sharing-social-action-background");
                        the_social_background.style.backgroundColor = the_social_bg_color;
                        the_social_background.style.height = '100%';
                        the_social_background.style.borderRadius = el.getAttribute("data-social-action-icon-border-radius")+'%' || "50%";
                        the_social_background.style.borderWidth = el.getAttribute("data-social-action-icon-border-width")+'px' || "0px";
                        the_social_background.style.borderTopStyle = el.getAttribute("data-border-top-style") || "solid";
                        the_social_background.style.borderBottomStyle = el.getAttribute("data-border-bottom-style") || "solid";
                        the_social_background.style.borderRightStyle = el.getAttribute("data-border-right-style") || "solid";
                        the_social_background.style.borderLeftStyle = el.getAttribute("data-border-left-style") || "solid";
                        the_social_background.style.borderColor = el.getAttribute("data-social-actions-border-bg-color") || "#000000";


                        var the_social = mtg("div");
                        the_social.id = "mtr-sharing-social-"+ mini_social;
                        the_social.classList.add("mtr-sharing-social", "mtr-sharing-social-"+ mini_social);
                        the_social.setAttribute("title", "Share on "+ social);
                        the_social.setAttribute("data-url", el.getAttribute(`data-social-actions-${social}-link`));
                        the_social.style.minWidth = the_social.style.minHeight = el.getAttribute(`data-social-actions-${social}-icon-size`)+'px' || '60px';
                        the_social.style.backgroundColor = the_social_bg_color;
                        the_social.style.margin = 0;
                        the_social.style.borderRadius = "50%";
                        el.getAttribute(`data-social-actions-${social}-icon-type`) == 'customize' && the_social.classList.add("customize");
                        
                        var the_social_message = mtg("div");
                        let lineHeight = parseInt(el.getAttribute("data-social-line-height-name"), 10);
                        the_social_message.classList.add("mtr-social-actions-title", "mtr-social-actions-title-"+id_num, "mtr-p-tag");
                        the_social_message.innerHTML = el.getAttribute(`data-social-actions-${social}-title`);
                        the_social_message.style.fontSize = el.getAttribute("data-social-name-font-size")+'px' || '15px';
                        the_social_message.style.lineHeight = (lineHeight && lineHeight >= 20 ? lineHeight : 20) + 'px';
                        the_social_message.style.fontWeight = el.getAttribute("data-social-actions-font-weight") || 'bold';
                        the_social_message.style.fontStyle = el.getAttribute("data-social-actions-font-style") || 'normal';
                        the_social_message.style.textDecoration = el.getAttribute("data-social-actions-font-decoration") || 'normal';
                        the_social_message.style.marginLeft = '10px';
                        the_social_message.style.textAlign = el.getAttribute('data-social-action-alignment') || 'left';

                        var the_checked_background = mtg("div");
                        the_checked_background.classList.add("mtr-sharing-social-action-background");
                        the_checked_background.style.backgroundColor = 'transparent';
                        the_checked_background.style.height = 'auto';
                        !RH.optin_data[social].action_completed && the_checked_background.classList.add('mtr-hide');

                        var the_checked = mtg("div");
                        RH.optin_data[social].action_completed ? the_checked.classList.add("mtr-sharing-social", "mtr-checked", "telegram-checked-icon") : the_checked.classList.add("mtr-sharing-social", "mtr-loading");
                        the_checked.style.minHeight = '20px';
                        the_checked.style.minWidth = '25px'
                        the_checked.style.margin = 0;
                        the_checked.style.width = 'auto';
                        the_checked.style.height = 'auto';
                        the_checked.style.borderRadius = "50%";
                        the_checked.style.backgroundColor = 'transparent';    
                        the_checked.innerHTML = el.getAttribute('data-social-action-button-text').replace("%p%", config.settings.social_actions_points[`${social}_action`] != null ? config.settings.social_actions_points[`${social}_action`] : '0') || "Join";
                        the_checked.style.color = "transparent";

                        var social_button = mtg("div");
                        social_button.classList.add("mtr-sharing-social-join-button", "mtr-sharing-social-join-button-"+id_num);
                        social_button.innerHTML = el.getAttribute('data-social-action-button-text').replace("%p%", config.settings.social_actions_points[`${social}_action`] != null ? config.settings.social_actions_points[`${social}_action`] : '0') || "Join";
                        social_button.style.borderRadius = el.getAttribute("data-social-action-icon-border-radius")+'px' || '50px';
                        social_button.style.borderWidth = el.getAttribute("data-social-action-icon-border-width")+'px' || '0px';
                        social_button.style.backgroundColor = el.getAttribute("data-social-action-button-background-color") || '#c6c3d5';
                        social_button.style.color = el.getAttribute("data-social-action-button-text-color") || '#000000';
                        social_button.style.height = 'fit-content';
                        social_button.style.width = 'fit-content';
                        social_button.style.padding = '10px 25px';
                        social_button.style.display = 'flex';
                        social_button.style.alignItems = 'center';
                        social_button.style.cursor = 'pointer';
                        social_button.style.justifyContent = 'center';
                        social_button.style.whiteSpace = 'nowrap';
                        social_button.style.fontSize = el.getAttribute('data-social-button-font-size')+'px' || "15px";
                        social_button.style.lineHeight = el.getAttribute('data-social-line-height-button')+'px' || "20px";
                        social_button.style.fontWeight = el.getAttribute("data-social-actions-font-weight") || 'bold';
                        social_button.style.fontStyle = el.getAttribute("data-social-actions-font-style") || 'normal';
                        social_button.style.textDecoration = el.getAttribute("data-social-actions-font-decoration") || 'normal';
                        social_button.style.borderTopStyle = el.getAttribute("data-border-top-style") || "solid";
                        social_button.style.borderBottomStyle = el.getAttribute("data-border-bottom-style") || "solid";
                        social_button.style.borderRightStyle = el.getAttribute("data-border-right-style") || "solid";
                        social_button.style.borderLeftStyle = el.getAttribute("data-border-left-style") || "solid";
                        social_button.style.borderColor = el.getAttribute("data-social-actions-border-bg-color") || "#000000";

                        
                        social_button.addEventListener("click", function() {
                            var width = 500;
                            var height = 600;

                            var left = (window.screen.width - width) / 2;
                            var top = (window.screen.height - height) / 2;

                            var features = `width=${width},height=${height},left=${left},top=${top}`;

                            social_button.innerHTML = "";
                            social_button.appendChild(the_checked_background);
                            the_checked_background.classList.remove("mtr-hide");


                            if(social == "discord"){
                                var discord_link = el.getAttribute('data-social-actions-discord-link') || 'https://discord.com/';
                                var url = g.generate.discordLink(discord_link, the_checked_background, the_checked, the_social_bg_color, RH);
                                window.open(url, "_blank",features);
                                setTimeout(function(){
                                    the_checked_background.classList.add("mtr-hide");
                                    social_button.innerHTML = el.getAttribute('data-social-action-button-text').replace("%p%", config.settings.social_actions_points[`${social}_action`] != null ? config.settings.social_actions_points[`${social}_action`] : '0') || "Join";
                                }, 2000)
                            }else if(social == "telegram"){
                                var telegram_link = el.getAttribute('data-social-actions-telegram-link') || 'https://telegram.org';
                                var url = g.generate.telegramLink(telegram_link, the_checked_background, the_checked, the_social_bg_color, RH);
                                window.location.href = url;
                                setTimeout(function(){
                                    the_checked_background.classList.add("mtr-hide");
                                    social_button.innerHTML = el.getAttribute('data-social-action-button-text').replace("%p%", config.settings.social_actions_points[`${social}_action`] != null ? config.settings.social_actions_points[`${social}_action`] : '0') || "Join";
                                }, 2000)
                            }
                        });


                        the_social_background.appendChild(the_social);
                        the_social_container.appendChild(the_social_background);
                        the_social_container.appendChild(the_social_message);
                        social_div.appendChild(the_social_container);
                        the_checked_background.appendChild(the_checked);
                        social_div.appendChild(social_button);
                        if( RH.optin_data[social].action_completed){
                            social_button.innerHTML = "";
                            social_button.appendChild(the_checked_background);
                            the_checked_background.classList.remove("mtr-hide");
                        }
                        sharing_socials_container.appendChild(social_div);
                    });
                        
                    return sharing_socials_container;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.sharing.generate socialActionsBox 6945");
                    console.error("[ReferralHero] An unexpected error occurred in method generate socialActionsBox:", err);
                }
            }, discordLink: function(a, lcb, lc, the_social_bg_color, RH){
                try{
                    c = a.match(/discord\.(?:com|gg)\/(?:invite\/)?([\w\d-]+)/);
                    if (c && c[1] && !RH.optin_data.discord.action_completed) {
                        setTimeout(function() {
                        discord_interval = setInterval(function() { g.tools.check_discord_join(c[1], RH.optin_data.id, discord_interval, lcb, lc, the_social_bg_color, RH); }, 3000);
                        }, 5000);
                    }
                    if (RH.optin_data.discord.authorized) {
                        return a;
                    }
                    if (c && c[1]) {
                        return RH.optin_data.discord.oauth_url + '+' + c[1];
                    } else {
                        return a;
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.sharing.generate discordLink 6965");
                    console.error("[ReferralHero] An unexpected error occurred in method generate discordLink:", err);
                }
            },telegramLink: function(a, lcb, lc, the_social_bg_color, RH){
                try{
                    c = a.match(/^https:\/\/t\.me\/([\w\d-+]+)$/);
                    if (c && c[1] && !RH.optin_data.telegram.action_completed) {
                        setTimeout(function() {
                        telegram_interval = setInterval(function() { g.tools.check_telegram_join(c[0], RH.optin_data.id, telegram_interval, lcb, lc, the_social_bg_color); }, 5000);
                        }, 5000);
                    }
                    if (RH.optin_data.telegram.authorized) {
                        return a;
                    }
                    if (c && c[0]) {
                        link = `&invite_link=${c[0]}`;
                        return RH.optin_data.telegram.oauth_url + link;
                    } else {
                        return a;
                    }
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.sharing.generate telegramLink 6986");
                    console.error("[ReferralHero] An unexpected error occurred in method generate telegramLink:", err);
                }
            }, horizontal_banner: function (config, RH) {
                try{
                    var d = g.tools.getParams("mwr") || g.tools.readCookie("__maitre-referrer-" + config.uuid);
                    var referrer_campaign = null;
                    if(d){
                        g.tools.ajax.request(g.tools.getWidgetUrl(config) + "/check_referral_campaign", "POST", {
                                uuid: config.uuid,
                                ref_code: d
                            }, function (f) {
                            if(f.response == "ok"){
                                referrer_campaign = f.referrer_campaign;
                            }
                            }, function (f) {
                                console.error(f)
                            })
                    }               
                    if((config.settings.horizontal_banner.show_for === "all" && !g.tools.referrer_cookie_present() && referrer_campaign == null) || (config.settings.horizontal_banner.show_for === "referred" && g.tools.referrer_cookie_present() && referrer_campaign != null && referrer_campaign == config.uuid)){
                        var hb = document.getElementById('maitre-horizontal-banner');

                        if (!hb) {
                            var hb = mtg("div");
                            hb.style.display = "none";
                            hb.id = "maitre-horizontal-banner";
                        }

                        var position = 'top'
                        var designer = RH.optin_data && config.settings.horizontal_banner.hb_form_present ? config.settings.horizontal_banner.confirmation : config.settings.horizontal_banner.signup
                        if (!isEmpty(designer)){
                            var designer_data = designer;
                            for( var i in designer_data){
                                var el = g.tools.designElement(designer_data[i], config, RH, "horizontal_banner");
                                if(el.classList.contains('mtr-coupon-field')){
                                    ap_el = g.generate.couponBox(el, RH)
                                    if(ap_el){
                                        el.appendChild(ap_el);
                                    }
                                }
                                var referrer_name_val = g.tools.get_referrer_name(RH, config)
                                if(el.classList.contains('mtr-text-field') && referrer_name_val){
                                    try{
                                        var substituted_data = el.firstChild.innerHTML.replace(/%referrer_name%/gi, referrer_name_val).replace(/%advocate_first_name%/gi, (RH.advocate_first_name || g.tools.fetch_complete_name(referrer_name_val)[0])).replace(/%advocate_last_name%/gi, (RH.advocate_last_name || g.tools.fetch_complete_name(referrer_name_val)[1]));
                                        el.firstChild.innerHTML = g.tools.substitute_phone_number(substituted_data);
                                    }
                                    catch(h){
                                    }
                                }
                                if(el.classList.contains('mtr-form-fields-banner')){
                                    form_el = g.generate.bannerForm(el, config)
                                    if(form_el){
                                        el.appendChild(form_el);
                                    }
                                }
                                if(el.id == 'banner-close'){
                                    el.style.display = "flex";
                                    el.style.right = "15px";
                                    el.style.zIndex = "10";
                                }
                                if (el.id == "template-form"){
                                    var t_el = el;
                                    t_el.style.background = t_el.getAttribute("data-bg") == "color" ? t_el.getAttribute("data-bg-color") : "url('" + designer_data[i].image + "')";
                                    t_el.style.backgroundSize = t_el.getAttribute("data-bg-size");
                                    t_el.style.width = "95%";
                                    t_el.style.position = "relative";
                                    t_el.style.display = "flex";
                                    position = t_el.getAttribute("data-display-position");
                                    // if ( RH.optin_data || g.tools.readCookie("__maitre-session-" + config.uuid) ) {
                                    //  show = "none";
                                    // }
                                
                                    config.settings.horizontal_banner.show && !(g.tools.readCookie("__maitre-close-banner-" + config.uuid)) ? (config.settings.horizontal_banner.show_for === "referred" && !RH.referrer ? hb.style.display = "none" : hb.style.display = "block") : null;

                                    if(window.RHLandingPage){
                                        hb.style.display = "none";
                                    }
                                }else{
                                    if(el.classList.contains('mtr-coupon-field')){
                                    if(ap_el){
                                        t_el.appendChild(ap_el);
                                    }
                                    }
                                else {
                                    t_el.appendChild(el);
                                }

                                }
                            }

                            var cl = mtg("div");
                            cl.style.top = "0";
                            cl.style.position = "absolute";
                            cl.style.right = "0";
                            cl.style.width = "30px";
                            cl.style.zIndex = "99";
                            cl.style.height = "30px";
                            cl.style.display = "flex";
                            cl.style.cursor = "pointer";
                            cl.style.alignItems = "center";
                            cl.style.justifyContent = "center";
                        // cl.innerHTML = '<i class="auto-style-64 material-icons">close</i>';

                            cl.addEventListener("click", function () {
                                hb.style.display = "none";
                                var f = "__maitre-close-banner-" + config.uuid;
                                g.tools.createCookie(f, 'true', 3650, config, RH);
                            });

                            t_el.appendChild(cl);
                            hb.innerHTML = "";
                            hb.style.maxWidth = "100%";
                            hb.style.width = "100%";
                            hb.style.position = "fixed";
                            hb.style.zIndex = "2147483647";
                            hb.style.left = "0";
                            hb.style.borderRadius = t_el.style.borderRadius;
                            hb.appendChild(t_el);
                        }
                        var body = document.getElementsByTagName("body")[0];
                        body.insertBefore(hb, body.firstChild);
                        position == "bottom" ? hb.style.bottom = "20px" : hb.style.top = "20px";
                        c = document.getElementById('horizontal-form');
                        try {
                        cl.style.color = mtid('template-form').querySelectorAll('[data-text-color-value]')[0].style.color;
                        } catch (e) {}
                        
                        
                        if (c){
                            var pc = c.getAttribute("data-form-text-color");
                            if (pc){g.generate.stylesheet(".mtr-form-fields-banner input::-webkit-input-placeholder {color: "+pc+";}");}
                            c.addEventListener("submit", function (J) {
                                J.preventDefault();
                                data = g.tools.getFormValues(c, RH)
                                g.form.submit(data, config, RH, 0, config.settings.form, "horizontal_banner");
                            });
                        }
                    }
                    return 1;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.horizontal_banner 7126");
                    console.error("[ReferralHero] An unexpected error occurred in method generate horizontal_banner:", err);
                }
            }, bannerForm: function(el, config){
                try{
                    var id_num = g.tools.get_id_number(el.id);
            
                    formEl = mtg('form');
                    formEl.id = "horizontal-form";
                    formEl.style.display = "flex";
                    formEl.style.flexDirection = "row";
                    formEl.style.gap = "10px";
                    el.style.fontFamily = g.tools.findFont(el.getAttribute('data-form-font-family')) || 'inherit';
                    
                    divEl = mtg("div");
                    divEl.classList.add("mtr-form-select-field");
                    divEl.classList.add("mtr-form-fields-contaner");
            
                    name_id = "form-name-div-"+id_num;
                    name_placeholder = el.getAttribute('data-form-name-placeholder');
            
                    email_id = "form-email-div-"+id_num;
                    email_placeholder = el.getAttribute('data-form-email-placeholder');

                    phone_id = "form-phone-number-div-"+id_num;
                    phone_placeholder = el.getAttribute('data-form-phone-number-placeholder');
                    country_code = el.getAttribute('data-form-country-code') || "+1";

                    crypto_wallet_id = "form-crypto-wallet-div-"+id_num;
                    crypto_wallet_placeholder = el.getAttribute('data-form-crypto-wallet-placeholder');
            
                    button_id = "form-submit-div-"+id_num;
                    button_text = el.getAttribute('data-form-submit-placeholder');
                    
                    input_color = el.getAttribute('data-form-text-color');
                    input_background = el.getAttribute('data-form-background-color');
                    input_height = el.getAttribute('data-form-height') + 'px';
                    input_border_color = el.getAttribute('data-form-border-color');
                    input_border_width = el.getAttribute('data-form-border-width') + 'px';
                    input_border_radius = el.getAttribute('data-form-border-radius') + 'px';
                    input_font_size = el.getAttribute('data-form-font-size') + 'px';
                    input_font_family = g.tools.findFont(el.getAttribute('data-form-font-family')) || "Quicksand, sans-serif";
                    
                    button_color = el.getAttribute('data-submit-text-color');
                    button_background = el.getAttribute('data-submit-background-color');
                    button_height =  el.getAttribute('data-submit-height') + 'px';
                    button_border_color = el.getAttribute('data-submit-border-color');
                    button_border_width = el.getAttribute('data-submit-border-width') + 'px';
                    button_border_radius = el.getAttribute('data-submit-border-radius') + 'px';
                    button_font_size = el.getAttribute('data-submit-font-size') + 'px';
                    button_font_family = g.tools.findFont(el.getAttribute('data-submit-font-family')) || "Quicksand, sans-serif";
            
                    var field_width = el.getAttribute('data-form-name') == 'true' ? '50%' : '100%';
            
                    var nameField = g.generate.inputField(name_id, name_placeholder, 'text', 'name', input_color, input_background, input_height, input_border_color, input_border_width, input_border_radius, input_font_size, input_font_family, field_width);
                    var emailField = g.generate.inputField(email_id, email_placeholder, 'email', 'email', input_color, input_background, input_height, input_border_color, input_border_width, input_border_radius, input_font_size, input_font_family, field_width);
                    var phoneField = g.generate.inputField(phone_id, phone_placeholder, 'text', 'phone_number', input_color, input_background, input_height, input_border_color, input_border_width, input_border_radius, input_font_size, input_font_family, field_width);
                    var submitField = g.generate.submitButton(button_id, button_text, button_background, button_color, button_height, button_border_color, button_border_width, button_border_radius, button_font_size, button_font_family, "banner-submit-button", field_width);
                    var cryptoWalletField = g.generate.inputField(crypto_wallet_id, crypto_wallet_placeholder, 'crypto_wallet_address', 'name', input_color, input_background, input_height, input_border_color, input_border_width, input_border_radius, input_font_size, input_font_family, field_width);
                    var phoneField = g.generate.inputphoneField(phone_id, phone_placeholder, 'text', 'phone_number', input_color, input_background, input_height, input_border_color, input_border_width, input_border_radius, input_font_size, input_font_family, field_width, country_code, config);

                    if ( config.settings.sharing.verification.email || config.settings.unique_identifier == "email" ){
                        divEl.appendChild(emailField);
                    }
                    if (el.getAttribute('data-form-name') == 'true'){
                        divEl.appendChild(nameField);
                    }
                    if ( config.settings.sharing.verification.sms_confirmation || config.settings.unique_identifier == "phone_number" ){
                        divEl.appendChild(phoneField);
                    }
                    if ( config.settings.sharing.verification.crypto_wallet_confirmation || config.settings.unique_identifier == "crypto_wallet_address" ){
                        divEl.appendChild(cryptoWalletField);
                    }
                    
                    formEl.appendChild(divEl);
                    formEl.appendChild(submitField);
            
                    return formEl;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "bannerForm 7205");
                    console.error("[ReferralHero] An unexpected error occurred in method generate bannerForm:", err);
                }
            }, inputField(id, placeholder, type, name, color, background, height, border_color, border_width, border_radius, font_size, font_family, width){
                try{
                    var field = mtg("input");
                    field.id = id;
                    field.placeholder = placeholder;
                    field.type = type;
                    field.name = name;
                    field.style.color = color;
                    field.style.backgroundColor = background;
                    field.style.height = height;
                    field.style.borderRadius = border_radius;
                    field.style.borderWidth = border_width;
                    field.style.borderColor = border_color;
                    field.style.fontSize = font_size;
                    field.style.fontFamily = font_family;
                    field.style.borderStyle = "solid";
                    field.style.width = width;
            
                    return field;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.inputField 7228");
                    console.error("[ReferralHero] An unexpected error occurred in method generate inputField:", err);
                }
            }, inputphoneField(id, placeholder, type, name, color, background, height, border_color, border_width, border_radius, font_size, font_family, width, country_code, config){
                try{
                    var fpn = mtg("div");
                    fpn.className = "mtr-flex phone-num-row";
                    fpn.style.display = "flex";
                    var o = mtg("div");
                    o.id = "mtr-form-field-phone";
                    o.className = "mtr-form-field";
                    var ca = mtg("input");
                    ca.id = "mtr-form-input-phone";
                    ca.setAttribute("type", "tel");
                    ca.setAttribute("name", "phone_number");
                    ca.addEventListener('invalid', () => { (ca.value === '') ?  ca.setCustomValidity('Enter phone number!') : ca.setCustomValidity(config.settings.alerts.invalid_phone_number || 'Invalid phone number') });
                    ca.addEventListener('input', () =>{
                        ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                        ca.setCustomValidity('');
                    });
                    ca.setAttribute("placeholder", placeholder);
                    ca.style.color = color;
                    ca.style.backgroundColor = background;
                    ca.style.height = height;
                    ca.style.borderColor = border_color;
                    ca.style.borderWidth = border_width;
                    ca.style.borderRadius = border_radius;
                    ca.style.fontFamily = g.tools.findFont(font_family);
                    ca.style.fontSize = font_size;

                    o.style.display = "flex";
                    ca.addEventListener("blur", function () {
                        ca.style.borderColor = "#cccccc"
                    });

                    o.appendChild(ca);

                    var fc = mtg("div");
                    fc.id = "mtr-form-field-country";
                    fc.className = "mtr-form-field";
                    fc.style.width = "30%";

                        var fci = mtg("select");
                        fci.setAttribute("name", "country_code");
                        fci.style.height = '43px';
                        fci.style.width = '100%';
                        fci.id = "mtr-quick-add-form-input-country";

                        fci.style.color = color;
                        fci.style.backgroundColor = background;
                        fci.style.height = height;
                        fci.style.borderColor = border_color;
                        fci.style.borderWidth = border_width;
                        fci.style.borderRadius = border_radius;
                        fci.style.fontFamily = g.tools.findFont(font_family);
                        fci.style.fontSize = font_size;

                        fc.style.width = '30%';
                        fc.style.display = "flex";

                        var countries = g.tools.countriesData();
                        countries.forEach(function (p) {
                            var option = mtg("option");
                            option.innerHTML = p.country;
                            option.setAttribute("data-select",p.country);
                            option.setAttribute("format",p.format);
                            option.setAttribute("code",p.code);
                            option.setAttribute("iso",p.iso);
                            option.value = "+" + p.code;
                            if (p.code == country_code.substring(1)){
                            option.selected = 'selected'
                            }
                            fci.appendChild(option);
                        });
                        fci.options[fci.selectedIndex].innerHTML = fci.options[fci.selectedIndex].value 
                        fci.addEventListener('focus mouseleave', function () {
                        for (var focus_option of this.options){
                            focus_option.innerHTML = focus_option.getAttribute("data-select");
                        }
                        });
                        fci.addEventListener('blur', function () {
                        fci.style.borderColor = "#cccccc";
                        });
                        fc.appendChild(fci);
                        fpn.appendChild(fc);
                        fpn.appendChild(o);
                        fci.onchange = function() {
                        for (var selected_option of this.options){
                            selected_option.innerHTML = selected_option.getAttribute("data-select");
                            ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                            ca.setCustomValidity('');
                        }
                        this.options[this.selectedIndex].innerHTML = this.options[this.selectedIndex].value 
                        this.blur();
                    }


                    return fpn;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.inputphoneField 7327");
                    console.error("[ReferralHero] An unexpected error occurred in method generate inputphoneField:", err);
                }
            }, submitButton(id, text, background, color, height, border_color, border_width, border_radius, font_size, font_family, classes, width){
                try{
                    var button = mtg("button");
                    button.id = id;
                    button.type = "submit";
                    button.textContent = text;
                    button.style.backgroundColor = background;
                    button.style.color = color;
                    button.style.height = height;
                    button.style.borderRadius = border_radius;
                    button.style.borderColor = border_color;
                    button.style.borderWidth = border_width;
                    button.style.fontSize = font_size;
                    button.style.fontFamily = font_family;
                    button.style.width = width;
                    button.style.display = "flex";
                    button.style.alignItems = "center";
                    button.style.justifyContent = "center";
                    button.classList.add(classes);
                    button.classList.add('mtr-form-select-field');
            
                    return button;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.submitButton 7353");
                    console.error("[ReferralHero] An unexpected error occurred in method generate submitButton:", err);
                }
            }, nps_primary: function (config, RH) {
                try{

                    var hb = document.getElementById('nps-widget-'+config.uuid);
                    if (!hb) {
                        return false
                    }

                    if( config.settings.nps_widget.request_nps_multiple){
                        if(g.tools.readCookie("__nps-popup-pending-" + config.uuid) && !g.tools.readCookie("__nps-popup-closed-" + config.uuid)){
                            var closedTime = g.tools.readCookie("__nps-popup-pending-" + config.uuid)
                            if (closedTime) {
                                var currentTime = new Date().getTime();
                                var interval =  config.settings.nps_widget.request_interval
                                var intervalInMillis = g.tools.parseInterval(interval);
                            console.log(currentTime - closedTime ,intervalInMillis)
                                if (currentTime - closedTime < intervalInMillis) {
                                return false;
                                }
                            }
                        }
                    }
                    if( config.settings.nps_widget.display_nps_multiple){
                        if(g.tools.readCookie("__nps-popup-closed-" + config.uuid)){
                            var closedTime = g.tools.readCookie("__nps-popup-closed-" + config.uuid)
                            if (closedTime) {
                                var currentTime = new Date().getTime();
                                var interval =  config.settings.nps_widget.show_banner
                                var intervalInMillis = g.tools.parseInterval(interval);
                            console.log(currentTime - closedTime ,intervalInMillis)
                                if (currentTime - closedTime < intervalInMillis) {
                                return false;
                                }
                            }
                        }
                    }
                    if(!config.settings.nps_widget.display_nps_multiple && g.tools.readCookie("__nps-popup-closed-" + config.uuid) ){
                        return false
                    }
                    if(!config.settings.nps_widget.request_nps_multiple && !g.tools.readCookie("__nps-popup-closed-" + config.uuid)  && g.tools.readCookie("__nps-popup-pending-" + config.uuid)){
                        return false
                    }


                    if (g.tools.isDisplaySecond()) {
                        g.generate.nps_secondary(0, config, RH);
                        return;
                    }
                    g.tools.getVisits(config, RH);
                    var position = 'top'
                    var designer = config.settings.nps_widget.primary
                    if (!isEmpty(designer)){
                        var designer_data = designer;
                        for( var i in designer_data){
                                var el = g.tools.designElement(designer_data[i], config, RH);
                                if(el.classList.contains('mtr-coupon-field')){
                                    ap_el = g.generate.couponBox(el)
                                    if(ap_el){
                                            el.appendChild(ap_el);
                                    }
                                }
                                var referrer_name_val = g.tools.get_referrer_name(RH, config)
                                if(el.classList.contains('mtr-text-field') && referrer_name_val){
                                    try{
                                        var substituted_data = el.firstChild.innerHTML.replace(/%referrer_name%/gi, referrer_name_val).replace(/%advocate_first_name%/gi, (RH.advocate_first_name || g.tools.fetch_complete_name(referrer_name_val)[0])).replace(/%advocate_last_name%/gi, (RH.advocate_last_name || g.tools.fetch_complete_name(referrer_name_val)[1]));
                                        el.firstChild.innerHTML = g.tools.substitute_phone_number(substituted_data);
                                    }
                                    catch(h){
                                    }
                                }
                                if(el.classList.contains('mtr-nps-form-fields')){
                                    form_el = g.generate.npsForm(el, config, RH)
                                    if(form_el){
                                            el.appendChild(form_el);
                                    }
                                }
                                if(el.classList.contains('nps-banner-close')){
                                    el.addEventListener("click", function () {
                                        hb.style.display = "none";
                                        var f = "__nps-popup-pending-" + config.uuid;
                                        overlay && (overlay.style.display = "none");


                                        g.tools.createCookie(f,  new Date().getTime(), 3650, config, RH);
                                    });

                                }
                                if (el.id == "nps-body"){
                                    var t_el = el;
                                    t_el.style.zIndex = "9999";
                                    t_el.style.background = t_el.getAttribute("data-bg") == "color" ? t_el.getAttribute("data-bg-color") : "url('" + designer_data[i].image + "')";
                                    t_el.style.backgroundSize = t_el.getAttribute("data-bg-size");

                                    t_el.style.position = "relative";
                                    position = t_el.getAttribute("data-display-position");
                                    type = t_el.getAttribute("data-display-type");

                                    t_el.style.width = "60%";
                                    t_el.style.position = "fixed";
                                    position == "top" ? t_el.style.top = "20%" : position == "bottom" ? t_el.style.top = "80%" : t_el.style.top = "50%";
                                    t_el.style.left = "50%";
                                    t_el.style.transform = "translate(-50%, -50%)";

                                    var overlay = document.createElement("div");
                                    overlay.id = "nps-popup-overlay";
                                    overlay.style.position = "fixed";
                                    overlay.style.top = "0";
                                    overlay.style.left = "0";
                                    overlay.style.width = "100%";
                                    overlay.style.height = "100%";
                                    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";  // Adjust the opacity as needed
                                    overlay.style.zIndex = "999";  // Adjust the z-index based on your requirements
                                    document.body.appendChild(overlay);


                                    // if ( RH.optin_data || g.tools.readCookie("__maitre-session-" + config.uuid) ) {
                                    //  show = "none";
                                    // }

                                    //config.settings.horizontal_banner.show && !(g.tools.readCookie("__maitre-close-banner-" + config.uuid)) ? (config.settings.horizontal_banner.show_for === "referred" && !RH.anonymous ? hb.style.display = "none" : hb.style.display = "block") : null;
                                }else{
                                    if(el.classList.contains('mtr-coupon-field')){
                                    if(ap_el){
                                            t_el.appendChild(ap_el);
                                    }
                                    }
                                else {
                                        t_el.appendChild(el);
                                }

                                }
                        }


                        hb.innerHTML = "";
                        hb.style.maxWidth = "100%";
                        hb.style.marginLeft = "2.5%";
                        hb.style.borderRadius = t_el.style.borderRadius;
                        hb.appendChild(t_el);
                    }
                    var body = document.getElementsByTagName("body")[0];
                    position == "bottom" ?  body.appendChild(hb) : body.insertBefore(hb, body.firstChild);
                    c = document.getElementById('horizontal-form');
                    try {
                    cl.style.color = mtid('template-form').querySelectorAll('[data-text-color-value]')[0].style.color;
                    } catch (e) {}


                    if (c){
                        var pc = c.getAttribute("data-form-text-color");
                        if (pc){g.generate.stylesheet(".mtr-form-fields-banner input::-webkit-input-placeholder {color: "+pc+";}");}
                        c.addEventListener("submit", function (J) {
                            J.preventDefault();
                            // c.innerHTML = g.tools.spinner(config.settings.form.submit_button.font_size, config.settings.form.submit_button.color);
                            // c.disabled = !0;
                            data = g.tools.getFormValues(c, RH)
                            g.form.submit(data, config, RH);
                        });
                    }
                    return 1;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate nps_primary 7517");
                    console.error("[ReferralHero] An unexpected error occurred in method generate nps_primary:", err);
                }

            }, nps_secondary: function (point_val, config, RH) {
                try{

                    var hb = document.getElementById('nps-widget-' + config.uuid);
                    overlay = document.getElementById('nps-popup-overlay')
                    if (!hb) {
                        return false
                    }
                    var position = 'top'
                    var designer = config.settings.nps_widget.secondary
                    if (!isEmpty(designer)){
                        var designer_data = designer;
                        for( var i in designer_data){
                            var el = g.tools.designElement(designer_data[i], config, RH);
                            if(el.classList.contains('mtr-coupon-field')){
                                ap_el = g.generate.couponBox(el)
                                if(ap_el){
                                    el.appendChild(ap_el);
                                }
                            }
                            var referrer_name_val = g.tools.get_referrer_name(RH, config)
                            if(el.classList.contains('mtr-text-field') && referrer_name_val){
                                try{
                                    var substituted_data = el.firstChild.innerHTML.replace(/%referrer_name%/gi, referrer_name_val).replace(/%advocate_first_name%/gi, (RH.advocate_first_name || g.tools.fetch_complete_name(referrer_name_val)[0])).replace(/%advocate_last_name%/gi, (RH.advocate_last_name || g.tools.fetch_complete_name(referrer_name_val)[1]));
                                    el.firstChild.innerHTML = g.tools.substitute_phone_number(substituted_data);
                                }
                                catch(h){
                                }
                            }
                            if(el.classList.contains('mtr-nps-review-form')){
                                form_el = g.generate.npsReviewForm(el)
                                if(form_el){
                                        el.appendChild(form_el);
                                }
                            }
                            if(el.classList.contains('nps-banner-close')){
                                el.addEventListener("click", function () {
                                    hb.style.display = "none";
                                    var f = "__nps-popup-pending-" + config.uuid;
                                    overlay && (overlay.style.display = "none");
                                    g.tools.createCookie(f,  new Date().getTime(), 3650, config, RH);
                                });

                            }
                            if (el.id == "nps-body"){
                                var t_el = el;
                                t_el.style.zIndex = "9999";
                                t_el.style.background = t_el.getAttribute("data-bg") == "color" ? t_el.getAttribute("data-bg-color") : "url('" + designer_data[i].image + "')";
                                t_el.style.backgroundSize = t_el.getAttribute("data-bg-size");

                                t_el.style.position = "relative";
                                position = t_el.getAttribute("data-display-position");
                                type = t_el.getAttribute("data-display-type");
                                if (type == "banner"){
                                        t_el.style.width = "95%"
                                }else{
                                    t_el.style.width = "60%";
                                    t_el.style.position = "fixed";
                                    t_el.style.top = "50%";
                                    t_el.style.left = "50%";
                                    t_el.style.transform = "translate(-50%, -50%)";
                                }
                                // if ( RH.optin_data || g.tools.readCookie("__maitre-session-" + config.uuid) ) {
                                //  show = "none";
                                // }

                            // config.settings.horizontal_banner.show && !(g.tools.readCookie("__maitre-close-banner-" + config.uuid)) ? (config.settings.horizontal_banner.show_for === "referred" && !RH.anonymous ? hb.style.display = "none" : hb.style.display = "block") : null;
                            }else{
                                if(el.classList.contains('mtr-coupon-field')){
                                if(ap_el){
                                        t_el.appendChild(ap_el);
                                }
                                }
                            else {
                                t_el.appendChild(el);
                            }

                            }
                        }


                        hb.innerHTML = "";
                        hb.style.maxWidth = "100%";
                        hb.style.marginLeft = "2.5%";
                        hb.style.borderRadius = t_el.style.borderRadius;
                        hb.appendChild(t_el);
                    }
                    var body = document.getElementsByTagName("body")[0];
                    position == "bottom" ?  body.appendChild(hb) : body.insertBefore(hb, body.firstChild);
                    c_f = document.getElementById('feedback-form');
                    try {
                    cl.style.color = mtid('template-form').querySelectorAll('[data-text-color-value]')[0].style.color;
                    } catch (e) {}


                    if (c_f){
                        var pc = c_f.getAttribute("data-form-text-color");
                        if (pc){g.generate.stylesheet(".mtr-form-fields-banner input::-webkit-input-placeholder {color: "+pc+";}");}
                        c_f.addEventListener("submit", function (J) {
                            J.preventDefault();
                            // c.innerHTML = g.tools.spinner(config.settings.form.submit_button.font_size, config.settings.form.submit_button.color);
                            // c.disabled = !0;
                            data = {
                                desc: c_f.querySelector("[name='description']")?.value,
                                points: point_val,
                                screen: "second"
                            }
                            g.form.npsSubmit(data, config, RH);

                        });
                    }
                    return 1;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate nps_secondary 7634");
                    console.error("[ReferralHero] An unexpected error occurred in method generate nps_secondary:", err);
                }

            }, 
            verificationScreen: function(config, RH, verification_type) {
                try{
                    var a = mtg("div");
                    a.id = "mtr-optin-form";
                    a.classList.add(`mtr-custom-css-${config.uuid}`);
                    a.style.borderRadius = config.settings.form.form_border.radius;
                    if(config.settings.form.form_border.shadow == true){
                        a.style.boxShadow = `0 0px 12px ${config.settings.form.form_border.color}`
                    }
                    if(config.settings.form.widget_width) {
                        a.style.maxWidth = '95%';
                        a.style.width = !g.tools.mobileCheck() ? config.settings.form.widget_width : '98%';
                    }
                    var c = mtg("form");
                    c.id = "mtr-form";
                    c.setAttribute("method", "POST");
                    c.setAttribute("autocomplete", "off");
                    c.setAttribute("action", "#");
                    c.style.borderTopColor = config.settings.form.border;
                    c.style.borderStyle = config.settings.form.form_border.style;
                    c.style.borderWidth = config.settings.form.form_border.width;
                    c.style.borderRadius = config.settings.form.form_border.radius;
                    c.style.borderColor = config.settings.form.form_border.color;
                    c.style.padding = config.settings.form.widget_padding;

                    var designer = config.settings.verification_widget.verification_widget_form

                    if (!isEmpty(designer)){
                        if (config.settings.form.background.enable_color){
                            c.style.backgroundColor = config.settings.form.background.color;
                        }
                        else if (null != config.settings.form.background.image && "" != config.settings.signup_widget_form.background.image) {
                            c.style.backgroundImage = "url('" + config.settings.form.background.image + "')";
                            c.style.backgroundSize = config.settings.form.background.image_size;
                        }
                    }
                    else if (null != config.settings.form.cover && "" != config.settings.signup_widget_form.cover) {
                        var d = mtg("div");
                        d.id = "mtr-form-cover";
                        d.style.backgroundImage = "url('" + config.settings.form.cover + "')";
                        c.appendChild(d)
                    }
                    var verify_text = ""
                    

                    if (!isEmpty(designer)){
                        var designer_data = designer;
                        for( var i in designer_data){
                            var el = g.tools.designElement(designer_data[i], config, RH);
                        
                            if(el.classList.contains('mtr-nps-sms-fields')){
                                verify_text = el.getAttribute("data-verify-text")
                                email_verify_text = el.getAttribute("data-email-verify-text") || "Verify email"
                                form_el = g.generate.verificationForm(el, config, RH, verification_type, false)
                                if(form_el){
                                    el.appendChild(form_el);
                                }        
                            }

                            c.appendChild(el);
                        }
                    }
                    if (c){
                        c.addEventListener("submit", function (J) {
                            J.preventDefault();
                            if(mtid("mtr-form-submit-button")){
                                mtid("mtr-form-submit-button").innerHTML = g.tools.tailwindSpinner();
                            }

                            setTimeout(function(){
                            
                            var otpInputs = document.querySelectorAll('input[name="otp"]');
                            var otpCode = "";
                    
                            otpInputs.forEach(function(input) {
                                otpCode += input.value;
                            });
                            if (otpCode.length === 6) {
                                data = {
                                    code: otpCode,
                                    widget: "dashboard",
                                    submit_text: verification_type == "email" ? email_verify_text : verify_text,
                                    verification_type: verification_type
                                }
                                g.form.codeVerification(data, config, RH, "dashboard");
                            }
                            },100)

                        });
                    }

                    a.appendChild(c)

                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate verificationScreen 7734");
                    console.error("[ReferralHero] An unexpected error occurred in method generate verificationScreen:", err);
                }
            }, signupVerificationScreen: function(config, RH, verification_type){
                try{
                    var c = mtg("form");
                    c.id = "mtr-form";
                    c.classList.add(`mtr-custom-css-${config.uuid}`);
                    c.setAttribute("method", "POST");
                    c.setAttribute("autocomplete", "off");
                    c.setAttribute("action", "#");
                    c.style.borderTopColor = config.settings.signup_widget_form.border;
                    c.style.borderStyle = config.settings.signup_widget_form.form_border.style;
                    c.style.borderWidth = config.settings.signup_widget_form.form_border.width;
                    c.style.borderRadius = config.settings.signup_widget_form.form_border.radius;
                    c.style.borderColor = config.settings.signup_widget_form.form_border.color;
                    c.style.padding = config.settings.signup_widget_form.widget_padding;

                    var designer = config.settings.verification_widget.signup_verification_widget_form
                    var verify_text = ""

                    if (!isEmpty(designer)){
                        if (config.settings.signup_widget_form.background.enable_color){
                            c.style.backgroundColor = config.settings.signup_widget_form.background.color;
                        }
                        else if (null != config.settings.signup_widget_form.background.image && "" != config.settings.signup_widget_form.background.image) {
                            c.style.backgroundImage = "url('" + config.settings.signup_widget_form.background.image + "')";
                            c.style.backgroundSize = config.settings.signup_widget_form.background.image_size;
                        }
                    }
                    else if (null != config.settings.signup_widget_form.cover && "" != config.settings.signup_widget_form.cover) {
                        var d = mtg("div");
                        d.id = "mtr-form-cover";
                        d.style.backgroundImage = "url('" + config.settings.signup_widget_form.cover + "')";
                        c.appendChild(d)
                    }
                

                    if (!isEmpty(designer)){
                        var designer_data = designer;
                        for( var i in designer_data){
                            var el = g.tools.designElement(designer_data[i], config, RH);
                        
                        
                            if(el.classList.contains('mtr-nps-sms-fields')){
                            verify_text = el.getAttribute("data-verify-text")
                            email_verify_text = el.getAttribute("data-email-verify-text") || "Verify email"
                            form_el = g.generate.verificationForm(el, config, RH, verification_type, true)
                            if(form_el){
                                el.appendChild(form_el);
                            }        
                            }

                            c.appendChild(el);
                        }
                    }
                    if (c){
                        c.addEventListener("submit", function (J) {
                            J.preventDefault();
                            if(mtid("mtr-form-submit-button")){
                                mtid("mtr-form-submit-button").innerHTML = g.tools.tailwindSpinner();
                            }

                            setTimeout(function(){
                                var otpInputs = document.querySelectorAll('input[name="otp"]');
                                var otpCode = "";
                        
                                otpInputs.forEach(function(input) {
                                    otpCode += input.value;
                                });
                                if (otpCode.length === 6) {
                                    data = {
                                        code: otpCode,
                                        widget: "signup",
                                        submit_text: verification_type == "email" ? email_verify_text : verify_text,
                                        verification_type: verification_type
                                    }
                                    g.form.codeVerification(data, config, RH, "signup");
                                }
                            },100)

                        });
                    }

                    return c;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate signupVerificationScreen 7820");
                    console.error("[ReferralHero] An unexpected error occurred in method generate signupVerificationScreen:", err);
                }
            },
            
            npsForm: function(el, config, RH){
                try{
                    var id_num = g.tools.get_id_number(el.id);
                    var mainEle = document.createElement('DIV');
                    mainEle.style.padding = '20px';
                    mainEle.style.fontFamily = el.getAttribute('data-feedback-font-family');
                    mainEle.style.fontSize = el.getAttribute('data-feedback-font-size');
                    mainEle.style.fontStyle = el.getAttribute('data-feedback-font-style');
                    mainEle.style.fontWeight = el.getAttribute('data-feedback-font-weight');
                    mainEle.style.textDecoration = el.getAttribute('data-feedback-font-underline');
                    mainEle.id = "nps-form-"+id_num;
                    mainEle.classList.add("nps-feedback-primary-form")
                    var display_second = config.settings.nps_widget.display_second_screen


                    var ulElement = document.createElement('UL');
                    ulElement.textContent = el.getAttribute('data-rating-text');
                    ulElement.style.display = 'flex';
                    ulElement.style.flexWrap = 'wrap';
                    ulElement.style.alignItems = 'center';
                    ulElement.style.gap = '8px';
                    ulElement.style.paddingLeft = '0px';
                    ulElement.style.justifyContent = 'center';

                    var total_points = parseInt(el.getAttribute('data-points-count') || 10)
                    middle_number = total_points / 2

                    for (var i = 0; i < parseInt(el.getAttribute('data-points-count') || 0); i++) {
                        (function(index) { 
                        var liElement = document.createElement('LI');
                        var container = document.createElement('DIV');
                        container.textContent = index + 1;
                        container.style.backgroundColor = el.getAttribute('data-points-bg-color')
                        container.style.color = el.getAttribute('data-points-text-color')
                        container.style.width = '56px';
                        container.style.height = '36px';
                        container.style.borderRadius = '8px';
                        container.style.display = 'flex';
                        container.style.alignItems = 'center';
                        container.style.justifyContent = 'center';
                        container.style.cursor = 'pointer';
                        container.style.textDecoration = 'none';
                        container.classList.add('rating-point-'+id_num);
                        liElement.addEventListener('click', function(event){

                            var clickedDiv = event.currentTarget.querySelector('div');
                            if (index+1 < middle_number){
                                console.log("Negative")
                                clickedDiv.style.color = el.getAttribute('data-negative-text-color');
                                clickedDiv.style.backgroundColor = el.getAttribute('data-negative-bg-color');
                            }else{
                                console.log("Positive")
                                clickedDiv.style.color = el.getAttribute('data-positive-text-color')
                                clickedDiv.style.backgroundColor = el.getAttribute('data-positive-bg-color')
                            }
                            clickedDiv.offsetWidth; 

                            var rating = this.textContent
                            if(!display_second){
                                data = {
                                    points: rating,
                                    second: false,
                                    screen: "first"
                                }

                                setTimeout(function(){
                                    g.form.npsSubmit(data, config, RH);
                                }, 200)
                            
                            }
                            else{
                                data = {
                                    points: rating,
                                    second: true,
                                    screen: "first"
                                }
                                setTimeout(function(){
                                    g.form.npsSubmit(data, config, RH);
                                }, 200)

                            }
                        });
                        liElement.style.listStyle = 'none';
                        liElement.appendChild(container);
                        ulElement.appendChild(liElement);
                        })(i);
                    }

                    var submitContainer = document.createElement('DIV');
                    submitContainer.id = "nps-form-submit-container";
                    submitContainer.style.display = 'flex';
                    submitContainer.style.alignItems = 'center';
                    submitContainer.style.justifyContent = 'space-between';
                    submitContainer.style.marginTop = '10px';
                    submitContainer.style.minWidth = '300px';

                    var likelyDiv = document.createElement('DIV');
                    likelyDiv.textContent = el.getAttribute('data-like-text');
                    likelyDiv.id = "likely-text"+id_num;
                    likelyDiv.style.color = el.getAttribute('data-review-text-color') || 'black';

                    var unlikelyDiv = document.createElement('DIV');
                    unlikelyDiv.textContent = el.getAttribute('data-not-like-text');
                    unlikelyDiv.id = "unlikely-text"+id_num;
                    unlikelyDiv.style.color = el.getAttribute('data-review-text-color') || 'black';

                    submitContainer.appendChild(unlikelyDiv);
                    submitContainer.appendChild(likelyDiv);
                    mainEle.appendChild(ulElement);
                    mainEle.appendChild(submitContainer);
                    return mainEle;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate npsForm 7937");
                    console.error("[ReferralHero] An unexpected error occurred in method generate npsForm:", err);
                }

            }, npsReviewForm: function(el){
                try{
                    var id_num = g.tools.get_id_number(el.id);
                    formEl = mtg('form');
                    formEl.id = "feedback-form";
                    formEl.style.display = "flex";
                    formEl.style.width = "100%";
                    formEl.style.flexDirection = "row";
                    formEl.style.gap = "10px";
                    var mainEle = document.createElement('DIV');
                    mainEle.style.width = "100%"
                    //mainEle.style.padding = "0 20px";

                    var textArea = document.createElement('TEXTAREA');
                    textArea.id = "nps-form-text-area-"+id_num;
                    textArea.name = "description"
                    textArea.style.width = '100%';
                    textArea.style.resize = 'none';
                    textArea.style.border = 'none';
                    textArea.style.height = '90px';
                    textArea.style.padding = '8px';
                    textArea.style.marginTop = '8px';
                    textArea.style.outline = 'none';
                    textArea.placeholder = el.getAttribute('data-text-area-placeholder');

                    textArea.style.color = el.getAttribute('data-review-form-text-color');
                    textArea.style.backgroundColor = el.getAttribute('data-review-form-background-color');
                    textArea.style.borderRadius = '12px';
                    textArea.required = el.getAttribute('data-text-area-required') == 'true'
            
                    var buttonContainer = document.createElement('DIV');
                    buttonContainer.classList.add("drag");   
                    buttonContainer.classList.add("mtr-nps-submit-button");
                    buttonContainer.style.display = 'flex';
                    buttonContainer.style.marginTop = '10px';
                    buttonContainer.id = "submit-container-"+id_num;
                    buttonContainer.style.justifyContent = el.getAttribute('data-submit-button-alignment');


                    var button = document.createElement('BUTTON');
                    button.id = "submit-"+id_num;
                    button.textContent = el.getAttribute('data-submit-text');
                    button.style.backgroundColor = el.getAttribute('data-submit-bg-color');
                    button.style.color = el.getAttribute('data-submit-text-color');


                    button.style.width = el.getAttribute('data-submit-button-width') + "%";
                    button.style.minWidth = "fit-content";
                    button.style.height = el.getAttribute('data-submit-button-height') + "px";
                    button.style.border = 'none';
                    button.style.borderRadius = el.getAttribute('data-submit-button-border-radius') + "px";
                    button.style.fontSize = el.getAttribute('data-submit-button-font-size') + "px";
                    button.style.cursor = 'pointer';
                    button.style.fontFamily = el.getAttribute('data-submit-button-font-family');
                    button.style.fontStyle = el.getAttribute('data-submit-button-font-style');
                    button.style.fontWeight = el.getAttribute('data-submit-button-font-weight');
                    button.style.textDecoration = el.getAttribute('data-submit-button-font-underline');
            
                    
                    button.style.display = 'flex';
                    button.style.alignItems = 'center';
                    button.style.justifyContent = 'center';
                    button.style.minHeight = '10px';
                    buttonContainer.appendChild(button);



                    var container = document.createElement('DIV');
                    container.id = "nps-form-submit-container";
                    container.style.maxWidth = '100%';
                    container.style.margin = '3px auto 0 auto';

                    container.appendChild(textArea);
                    container.appendChild(buttonContainer);

                    mainEle.appendChild(container);
                    formEl.appendChild(mainEle);
                    return formEl;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate npsReviewForm 8020");
                    console.error("[ReferralHero] An unexpected error occurred in method generate npsReviewForm:", err);
                }

            }, 
            verificationForm: function(el, config, RH, verification_type, is_signup){
                try{
                    var form_settings = config.settings.form;
                    var signup_form_settings = config.settings.signup_widget_form;

                    var id_num =  g.tools.get_id_number(el.id);
                    var mainEle = document.createElement('DIV');
                    mainEle.style.padding = '20px 0';
                    mainEle.style.fontSize = el.getAttribute('"data-form-font-size') + 'px';
                
                    mainEle.id = "sms-form-"+id_num;
                    mainEle.style.width = "100%"
                    mainEle.classList.add("sms-form-"+id_num)
            
                    var form_number_field = document.createElement('DIV');
                    form_number_field.id = "mtr-form-field-number";
                    form_number_field.className = "mtr-form-field";
                
                    var form_number_input = mtg("input");
                    form_number_input.id = "mtr-form-input-number";
                    form_number_input.setAttribute("type", "text");
                    form_number_input.setAttribute("name", "name");
                    form_number_input.setAttribute("disabled", true);
                    form_number_input.style.paddingLeft = "20px"
            
                    if(verification_type === "sms"){
                        form_number_input.value = RH.optin_data.phone_number
                    }else{
                        form_number_input.value = RH.optin_data.email  
                    }
            
                    form_number_field.style.display = "flex";
                    form_number_field.style.justifyContent = "center"
                    
                    form_number_field.appendChild(form_number_input);
            
                    var otpContainer = document.createElement('DIV');
                    otpContainer.id = "mtr-otp-container";
                    otpContainer.className = "mtr-otp-container";
                
                    otpContainer.style.display = "flex";
                    otpContainer.style.flexWrap = "wrap";
                    otpContainer.style.justifyContent = "center";
                    otpContainer.style.gap = "8px"; 
                
                    var otpInput = document.createElement('input');
                    otpInput.id = `mtr-otp-input`;
                    otpInput.setAttribute("type", "number");
                    otpInput.setAttribute("name", "otp");
                    otpInput.setAttribute("required", true);
                    otpInput.setAttribute("maxlength", "6"); 

                    otpInput.setAttribute("autocomplete", "one-time-code"); // Use the one-time-code autocomplete value
                    otpInput.setAttribute("inputmode", "numeric");
                    
                    otpInput.style.fontWeight = "bold"
                    otpInput.placeholder = "Enter 6-digit code here"
                
                    otpInput.addEventListener('input', function() {
                        if (this.value.length > 6) {
                            this.value = this.value.slice(0, 6);
                        }
                    
                        var otpCode = document.getElementById("mtr-otp-input").value;
                        if (otpCode.length === 6) {
                            mtid("mtr-form-submit-button").click();
                        }
                    });

                    document.addEventListener('paste', function(event) {
                        const otp = event.clipboardData.getData('text');
                        if (otp.length === 6) { 
                            const input = document.getElementById(`mtr-otp-input`);
                            if (input) {
                                input.value = otp;
                                input.dispatchEvent(new Event('input')); 
                            }
                        }
                    });
                            
                    otpContainer.appendChild(otpInput);

                    var invalid_code = document.createElement('DIV');
                    invalid_code.id = "invalid-code"+config.uuid;
                    invalid_code.innerHTML = "Invalid Code"
                    invalid_code.style.display = "none"
                    invalid_code.style.color = "red"
                    invalid_code.style.fontSize = "16px"
                    invalid_code.style.fontWeight = "bold"
                    invalid_code.style.textAlign = "center"
                    invalid_code.style.marginTop = "12px"
                    invalid_code.style.width = "100%"

                    var button_container = mtg('div');
                    button_container.style.display = "flex";
                    button_container.style.alignItems = (is_signup ? signup_form_settings.submit_button.alignment : form_settings.submit_button.alignment) || "center";
                    button_container.style.flexDirection = "column";

                    try{
                        //var button_margin_left = form_settings.submit_button.alignment == 'flex-start' ? '0%' : form_settings.submit_button.alignment == 'flex-end' ? ('100' - form_settings.submit_button.width.replace('%',''))+'%' : ('100' - form_settings.submit_button.width.replace('%',''))/2+'%'
                        //button_container.style.marginLeft = button_margin_left;
                    }catch(h){}

                    var form_submit_field = document.createElement('DIV');
                    form_submit_field.id = "mtr-form-field-submit";
                    form_submit_field.className = "mtr-form-field";
                    form_submit_field.style.display = "flex";
                    form_submit_field.style.minWidth = "fit-content";
                    form_submit_field.style.width = "100%"
                    form_submit_field.style.justifyContent = is_signup ? signup_form_settings.submit_button.alignment : form_settings.submit_button.alignment;
            
                    var form_submit_button = mtg("button");
                    form_submit_button.id = "mtr-form-submit-button";
                    form_submit_button.setAttribute("type", "submit");
                    form_submit_button.innerHTML = verification_type == "email" ? (el.getAttribute("data-email-verify-text") || "Verify email") : el.getAttribute("data-verify-text");
                    if(is_signup){
                        form_submit_button.style.backgroundColor = signup_form_settings.submit_button.color;
                        form_submit_button.style.color = signup_form_settings.submit_button.label_color;
                        form_submit_button.style.minWidth = "fit-content"
                        form_submit_button.style.width = signup_form_settings.submit_button.width;
                        form_submit_button.style.margin = '20px auto';
                        form_submit_button.style.borderWidth = "0px"
                        form_submit_button.style.cursor ='pointer';
                        form_submit_button.style.borderRadius = signup_form_settings.submit_button.corner_roundness;
                        form_submit_button.style.fontSize = signup_form_settings.submit_button.font_size;
                        form_submit_button.style.height = signup_form_settings.submit_button.height;
                        form_submit_button.style.fontWeight = signup_form_settings.submit_button.bold ? 'bolder' : 'normal';
                        form_submit_button.style.textDecoration = signup_form_settings.submit_button.underline ? 'underline' : 'none';
                        form_submit_button.style.fontStyle = signup_form_settings.submit_button.italic ? 'italic' : 'none';
                        form_submit_button.style.fontFamily = g.tools.findFont(signup_form_settings.submit_button.font_family);

                        form_number_input.style.fontFamily = g.tools.findFont(signup_form_settings.input_field.font_family) || "inherit";
                        form_number_input.style.color = signup_form_settings.input_field.color;
                        form_number_input.style.backgroundColor = signup_form_settings.input_field.background_color;
                        form_number_input.style.height = signup_form_settings.input_field.height;
                        form_number_input.style.borderColor = signup_form_settings.input_field.border_color;
                        form_number_input.style.borderWidth = signup_form_settings.input_field.border_width;
                        form_number_input.style.borderRadius = signup_form_settings.input_field.border_radius;
                        form_number_input.style.fontSize = signup_form_settings.input_field.font_size;
                        form_number_input.style.width = signup_form_settings.input_field.width;
                        form_number_input.style.marginBottom = signup_form_settings.input_field.distance;
                        form_number_input.style.textAlign = signup_form_settings.input_field.alignment;

                        otpInput.style.fontFamily = g.tools.findFont(signup_form_settings.input_field.font_family) || "inherit";
                        otpInput.style.color = signup_form_settings.input_field.color;
                        otpInput.style.backgroundColor = signup_form_settings.input_field.background_color;
                        otpInput.style.height = signup_form_settings.input_field.height;
                        otpInput.style.width = signup_form_settings.input_field.width;
                        otpInput.style.borderColor = signup_form_settings.input_field.border_color;
                        otpInput.style.borderWidth = signup_form_settings.input_field.border_width;
                        otpInput.style.borderRadius = signup_form_settings.input_field.border_radius;
                        otpInput.style.fontSize = signup_form_settings.input_field.font_size;
                        otpInput.style.textAlign = signup_form_settings.input_field.alignment;
                    }else{
                        form_submit_button.style.backgroundColor = form_settings.submit_button.color;
                        form_submit_button.style.color = form_settings.submit_button.label_color;
                        form_submit_button.style.minWidth = "fit-content"
                        form_submit_button.style.width = form_settings.submit_button.width;
                        form_submit_button.style.margin = '20px auto';
                        form_submit_button.style.borderWidth = "0px"
                        form_submit_button.style.cursor ='pointer';
                        form_submit_button.style.borderRadius = form_settings.submit_button.corner_roundness;
                        form_submit_button.style.fontSize = form_settings.submit_button.font_size;
                        form_submit_button.style.height = form_settings.submit_button.height;
                        form_submit_button.style.fontWeight = form_settings.submit_button.bold ? 'bolder' : 'normal';
                        form_submit_button.style.textDecoration = form_settings.submit_button.underline ? 'underline' : 'none';
                        form_submit_button.style.fontStyle = form_settings.submit_button.italic ? 'italic' : 'none';
                        form_submit_button.style.fontFamily = g.tools.findFont(form_settings.submit_button.font_family);

                        form_number_input.style.fontFamily = g.tools.findFont(form_settings.input_field.font_family) || "inherit";
                        form_number_input.style.color = form_settings.input_field.color;
                        form_number_input.style.backgroundColor = form_settings.input_field.background_color;
                        form_number_input.style.height = form_settings.input_field.height;
                        form_number_input.style.borderColor = form_settings.input_field.border_color;
                        form_number_input.style.borderWidth = form_settings.input_field.border_width;
                        form_number_input.style.borderRadius = form_settings.input_field.border_radius;
                        form_number_input.style.fontSize = form_settings.input_field.font_size;
                        form_number_input.style.width = form_settings.input_field.width;
                        form_number_input.style.marginBottom = form_settings.input_field.distance;
                        form_number_input.style.textAlign = form_settings.input_field.alignment;

                        otpInput.style.fontFamily = g.tools.findFont(form_settings.input_field.font_family) || "inherit";
                        otpInput.style.color = form_settings.input_field.color;
                        otpInput.style.backgroundColor = form_settings.input_field.background_color;
                        otpInput.style.height = form_settings.input_field.height;
                        otpInput.style.width = form_settings.input_field.width;
                        otpInput.style.borderColor = form_settings.input_field.border_color;
                        otpInput.style.borderWidth = form_settings.input_field.border_width;
                        otpInput.style.borderRadius = form_settings.input_field.border_radius;
                        otpInput.style.fontSize = form_settings.input_field.font_size;
                        otpInput.style.textAlign = form_settings.input_field.alignment;
                    }
                    form_number_input.style.borderStyle = "solid";
                    otpInput.style.borderStyle = "solid";

                    form_submit_button.style.minHeight = "fit-content";
                    form_submit_button.style.whiteSpace = "normal";
                    form_submit_button.style.wordBreak = "break-word";
                    form_submit_button.style.padding = "5px";

                    form_submit_field.appendChild(form_submit_button);
        

                    var form_resend_button = mtg("button");
                    form_resend_button.id = "mtr-form-resend-button";
                    form_resend_button.setAttribute("type", "button");
                    form_resend_button.innerHTML = el.getAttribute("data-resend-text");
                    form_resend_button.style.borderWidth = "0px"

                    form_resend_button.style.fontFamily = g.tools.findFont(form_settings.submit_button.font_family);
                    form_resend_button.style.fontSize = form_settings.submit_button.login_font_size;
                    form_resend_button.style.color = form_settings.submit_button.login_text_colour || '#000000';
                    form_resend_button.style.width = "fit-content";

                    form_resend_button.style.background = "transparent"
                    form_resend_button.style.cursor ='pointer';

                    if(RH.response == "subscriber_created"){
                        form_resend_button.disabled = true;
                        form_resend_button.style.opacity = 0.5;
                        form_resend_button.style.cursor = 'not-allowed';
                        var resend_text = el.getAttribute("data-resend-text");


                        let countdown = 30;
                        form_resend_button.innerHTML = `${resend_text} in ${countdown}`;
                    
                        var interval = setInterval(function () {
                            countdown--;
                            form_resend_button.innerHTML = `${resend_text} in ${countdown}`;
                    
                            if (countdown <= 0) {
                                clearInterval(interval);
                                form_resend_button.innerHTML = resend_text;
                                form_resend_button.disabled = false; 
                                form_resend_button.style.opacity = 1;
                                form_resend_button.style.cursor = 'pointer';
                            }
                        }, 1000); 
                    }


                    form_resend_button.addEventListener('click', function(event){
                        g.form.resendVerification(config, RH, verification_type);

                        form_resend_button.disabled = true;
                        form_resend_button.style.opacity = 0.5;
                        form_resend_button.style.cursor = 'not-allowed';
                        var resend_text = el.getAttribute("data-resend-text");


                        let countdown = 30;
                        form_resend_button.innerHTML = `${resend_text} in ${countdown}`;
                    
                        var interval = setInterval(function () {
                            countdown--;
                            form_resend_button.innerHTML = `${resend_text} in ${countdown}`;
                    
                            if (countdown <= 0) {
                                clearInterval(interval);
                                form_resend_button.innerHTML = resend_text;
                                form_resend_button.disabled = false; 
                                form_resend_button.style.opacity = 1;
                                form_resend_button.style.cursor = 'pointer';
                            }
                        }, 1000);
                    })

                    var resend_status = document.createElement('DIV');
                    resend_status.id = "resend-status"+config.uuid;
                    resend_status.innerHTML = "Code Resent"
                    resend_status.style.display = "none"
                    resend_status.style.color = "green"
                    resend_status.style.fontSize = "16px"
                    resend_status.style.fontWeight = "bold"
                    resend_status.style.textAlign = "center"
                    resend_status.style.width = "100%"

                    button_container.appendChild(form_submit_field)
                    button_container.appendChild(resend_status);
                    button_container.appendChild(form_resend_button)
                    
                    mainEle.appendChild(form_number_field);
                    mainEle.appendChild(otpContainer);
                    mainEle.appendChild(invalid_code);

                    mainEle.appendChild(button_container);
                    
                    return mainEle;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.verificationForm 8315");
                    console.error("[ReferralHero] An unexpected error occurred in method generate verificationForm:", err);
                }
            },
            quickadd: function (config, RH) {
                try{
                    var qpc  = config.settings.quick_add_form.input_field.color;
                    if (qpc){
                    g.generate.stylesheet("#mtr-quickadd-form input::-webkit-input-placeholder {color: "+qpc+";}");
                    }
                    var a = mtg("div");
                    a.id = "mtr-quickadd-optin-form";
                    var c = mtg("form");
                    c.id = "mtr-quickadd-form";
                    c.setAttribute("method", "POST");
                    c.setAttribute("autocomplete", "off");
                    c.setAttribute("action", "#");
                    c.style.borderTopColor = config.settings.quick_add_form.border;
                    if (null != config.settings.quick_add_form.cover && "" != config.settings.quick_add_form.cover) {
                        var d = mtg("div");
                        d.id = "mtr-form-cover";
                        d.style.backgroundImage = "url('" + config.settings.quick_add_form.cover + "')";
                        c.appendChild(d)
                    }
                    config.settings.recaptcha.enable && (d = mtg("div"), d.id = "RHCaptcha", c.appendChild(d));
                    if (config.settings.quick_add_form.subheader.text && config.settings.quick_add_form.subheader.text.trim() != "") {
                                var sh = mtg("h4");
                                sh.id = "mtr-quickadd-form-subheader";
                                sh.innerHTML = config.settings.quick_add_form.subheader.text;
                                sh.style.color = config.settings.quick_add_form.subheader.color;
                                c.appendChild(sh);
                    }   
                    d = mtg("div");
                    d.id = "mtr-form-fields";
                    if (config.settings.quick_add_form.name.require) {
                        var f = mtg("div");
                        f.id = "mtr-form-field-name";
                        f.className = "mtr-form-field";
                        var e = mtg("input");
                        e.id = "mtr-form-input-name";
                        e.setAttribute("type", "text");
                        e.setAttribute("name", "name");
                        config.settings.quick_add_form.name.required && e.setAttribute("required", "true");
                        e.setAttribute("placeholder",
                            config.settings.quick_add_form.name.placeholder);

                        e.style.color = config.settings.quick_add_form.input_field.color;
                        e.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                        e.style.height = config.settings.quick_add_form.input_field.height;
                        e.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        e.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                        e.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                        e.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        e.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                        e.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                        e.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                        e.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                        e.style.width = config.settings.quick_add_form.input_field.width;
                        e.style.marginBottom = config.settings.quick_add_form.input_field.distance;
                        f.style.display = "flex";
                        f.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                        e.addEventListener("focus", function () {
                            e.style.borderColor = config.settings.design.colors.primary
                        });
                        e.addEventListener("blur", function () {
                            e.style.borderColor = "#cccccc"
                        });
                        config.defaults.hasOwnProperty("name") && e.setAttribute("value", config.defaults.name);
                        f.appendChild(e)
                    }
                    if (!0) {
                        var x = mtg("div");
                        var z = mtg("input");
                        z.style.display = "none";
                        z.setAttribute("name", "is_sharing_optin_form");
                        z.setAttribute("value", true);
                        x.appendChild(z)
                    }
                    if (config.settings.quick_add_form.extra_field.require) {
                        var k = mtg("div");
                        k.id = "mtr-form-field-extra";
                        k.className = "mtr-form-field";
                        var h = mtg("input");
                        h.id = "mtr-form-input-extra-field";
                        h.setAttribute("type", "text");
                        h.setAttribute("name", "extra_field");
                        config.settings.quick_add_form.extra_field.required && h.setAttribute("required", "true");
                        h.setAttribute("placeholder", config.settings.quick_add_form.extra_field.placeholder);

                        h.style.color = config.settings.quick_add_form.input_field.color;
                        h.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                        h.style.height = config.settings.quick_add_form.input_field.height;
                        h.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        h.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                        h.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                        h.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        h.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                        h.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                        h.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                        h.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                        h.style.width = config.settings.quick_add_form.input_field.width;
                        h.style.marginBottom = config.settings.quick_add_form.input_field.distance;
                        k.style.display = "flex";
                        k.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                        h.addEventListener("focus", function () {
                            h.style.borderColor = config.settings.design.colors.primary
                        });
                        h.addEventListener("blur", function () {
                            h.style.borderColor = "#cccccc"
                        });
                        config.defaults.hasOwnProperty("extra_field") &&
                        h.setAttribute("value", config.defaults.extra_field);
                        k.appendChild(h)
                    }
                    if (config.settings.quick_add_form.extra_field_2.require) {
                        var n = mtg("div");
                        n.id = "mtr-form-field-extra-2";
                        n.className = "mtr-form-field";
                        var l = mtg("input");
                        l.id = "mtr-form-input-extra-field-2";
                        l.setAttribute("type", "text");
                        l.setAttribute("name", "extra_field_2");
                        config.settings.quick_add_form.extra_field_2.required && l.setAttribute("required", "true");
                        l.setAttribute("placeholder", config.settings.quick_add_form.extra_field_2.placeholder);

                        l.style.color = config.settings.quick_add_form.input_field.color;
                        l.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                        l.style.height = config.settings.quick_add_form.input_field.height;
                        l.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        l.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                        l.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                        l.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        l.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                        l.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                        l.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                        l.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                        l.style.width = config.settings.quick_add_form.input_field.width;
                        l.style.marginBottom = config.settings.quick_add_form.input_field.distance;
                        n.style.display = "flex";
                        n.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                        l.addEventListener("focus", function () {
                            l.style.borderColor = config.settings.design.colors.primary
                        });
                        l.addEventListener("blur", function () {
                            l.style.borderColor = "#cccccc"
                        });
                        config.defaults.hasOwnProperty("extra_field_2") && l.setAttribute("value", config.defaults.extra_field_2);
                        n.appendChild(l)
                    }
                    if (config.settings.quick_add_form.extra_field_3.require) {
                        var n3 = mtg("div");
                        n3.id = "mtr-form-field-extra-3";
                        n3.className = "mtr-form-field";
                        var l3 = mtg("input");
                        l3.id = "mtr-form-input-extra-field-3";
                        l3.setAttribute("type", "text");
                        l3.setAttribute("name", "extra_field_3");
                        config.settings.quick_add_form.extra_field_3.required && l3.setAttribute("required", "true");
                        l3.setAttribute("placeholder", config.settings.quick_add_form.extra_field_3.placeholder);

                        l3.style.color = config.settings.quick_add_form.input_field.color;
                        l3.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                        l3.style.height = config.settings.quick_add_form.input_field.height;
                        l3.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        l3.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                        l3.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                        l3.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        l3.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                        l3.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                        l3.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                        l3.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                        l3.style.width = config.settings.quick_add_form.input_field.width;
                        l3.style.marginBottom = config.settings.quick_add_form.input_field.distance;
                        n3.style.display = "flex";
                        n3.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                        l3.addEventListener("focus", function () {
                            l3.style.borderColor = config.settings.design.colors.primary
                        });
                        l3.addEventListener("blur", function () {
                            l3.style.borderColor = "#cccccc"
                        });
                        config.defaults.hasOwnProperty("extra_field_3") && l3.setAttribute("value", config.defaults.extra_field_3);
                        n3.appendChild(l3)
                    }
                    if (config.settings.quick_add_form.extra_field_4.require) {
                        var n4 = mtg("div");
                        n4.id = "mtr-form-field-extra-4";
                        n4.className = "mtr-form-field";
                        var l4 = mtg("input");
                        l4.id = "mtr-form-input-extra-field-4";
                        l4.setAttribute("type", "text");
                        l4.setAttribute("name", "extra_field_4");
                        config.settings.quick_add_form.extra_field_4.required && l4.setAttribute("required", "true");
                        l4.setAttribute("placeholder", config.settings.quick_add_form.extra_field_4.placeholder);

                        l4.style.color = config.settings.quick_add_form.input_field.color;
                        l4.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                        l4.style.height = config.settings.quick_add_form.input_field.height;
                        l4.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        l4.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                        l4.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                        l4.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        l4.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                        l4.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                        l4.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                        l4.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                        l4.style.width = config.settings.quick_add_form.input_field.width;
                        l4.style.marginBottom = config.settings.quick_add_form.input_field.distance;
                        n4.style.display = "flex";
                        n4.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                        l4.addEventListener("focus", function () {
                            l4.style.borderColor = config.settings.design.colors.primary
                        });
                        l4.addEventListener("blur", function () {
                            l4.style.borderColor = "#cccccc"
                        });
                        config.defaults.hasOwnProperty("extra_field_4") && l4.setAttribute("value", config.defaults.extra_field_4);
                        n.appendChild(l4)
                    }

                    if (!0) {
                        var hs = mtg("label");
                        hs.setAttribute("for", "amex");
                        hs.style.display = "none";
                        hs.innerHTML = "AMEX";

                        var hsi = mtg("input");
                        hsi.type = "hidden";
                        hsi.name = "amex";
                        hsi.setAttribute("required", "");
                        hsi.value = "";
                        hsi.id = "amex";
                    }

                    if (config.settings.quick_add_form.option_field.require) {
                    
                        var of = mtg("div");
                        of.id = "mtr-form-option-field";
                        of.className = "mtr-form-field";

                        var oft = mtg("select");
                        oft.id = "mtr-form-select-option-field";
                        oft.setAttribute("name", "option_field");
                        oft.setAttribute("type", "text");
                        oft.setAttribute("name", "option_field");
                        config.settings.quick_add_form.option_field.required && oft.setAttribute("required", "true");

                        oft.style.color = config.settings.quick_add_form.input_field.color;
                        oft.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                        oft.style.height = config.settings.quick_add_form.input_field.height;
                        oft.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        oft.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                        oft.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                        oft.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        oft.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                        oft.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                        oft.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                        oft.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                        oft.style.width = config.settings.quick_add_form.input_field.width;
                        oft.style.marginBottom = config.settings.quick_add_form.input_field.distance;
                        of.style.display = "flex";
                        of.style.justifyContent = config.settings.quick_add_form.input_field.alignment;
                        
                        //oft.addEventListener('focus', function () {
                        //    oft.style.borderColor = config.settings.design.colors.primary;
                        //});
                        
                        oft.addEventListener('blur', function () {
                            oft.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        });
                        
                        //option field placeholder
                        if (config.settings.form.option_field.placeholder){
                            var option = mtg("option");                        
                            option.value = ""
                            option.text = config.settings.quick_add_form.option_field.placeholder
                            oft.appendChild(option);
                            option.disabled = config.settings.quick_add_form.option_field.required;
                        };
                        
                        //option field options
                        var oft_values = config.settings.quick_add_form.option_field.options
                        for (var i = 0; i < oft_values.length; i++){
                            var val = oft_values[i];
                            if (val) {
                                var option = mtg("option");                        
                                option.value = val;
                                option.text = val;
                                oft.appendChild(option);
                                option.id = "option_"+val+1;
                            }
                        };

                        config.defaults.hasOwnProperty("option_field") && oft.setAttribute("value", config.defaults.option_field);
                        of.appendChild(oft);
                    };

                    if (config.settings.quick_add_form.phone_number.require) {
                        var fpn = mtg("div");
                        fpn.className = "mtr-flex phone-num-row";
                        fpn.style.display = "flex";
                        fpn.style.justifyContent = config.settings.quick_add_form.input_field.alignment;
                        var o = mtg("div");
                        o.id = "mtr-form-field-phone";
                        o.className = "mtr-form-field";
                        var ca = mtg("input");
                        ca.id = "mtr-form-input-phone";
                        ca.setAttribute("type", "tel");
                        ca.setAttribute("name", "phone_number");
                        config.settings.quick_add_form.phone_number.required && ca.setAttribute("required", "true");
                        ca.addEventListener('invalid', () => { (ca.value === '') ?  ca.setCustomValidity('Enter phone number!') : ca.setCustomValidity(config.settings.alerts.invalid_phone_number || 'Invalid phone number') });
                        ca.addEventListener('input', () =>{
                            ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                            ca.setCustomValidity('');
                        });
                        ca.setAttribute("placeholder", config.settings.quick_add_form.phone_number.placeholder);
                        ca.style.color = config.settings.quick_add_form.input_field.color;
                        ca.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                        ca.style.height = config.settings.quick_add_form.input_field.height;
                        ca.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        ca.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                        ca.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                        ca.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        ca.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                        ca.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                        ca.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                        ca.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                        ca.style.marginBottom = config.settings.quick_add_form.input_field.distance;

                        o.style.width = config.settings.quick_add_form.input_field.width.slice(0, -1)*0.7 + '%';
                        o.style.display = "flex";
                        o.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                        ca.addEventListener("focus", function () {
                            ca.style.borderColor = config.settings.design.colors.primary
                        });
                        ca.addEventListener("blur", function () {
                            ca.style.borderColor = "#cccccc"
                        });
                        config.defaults.hasOwnProperty("phone_number") && ca.setAttribute("value", config.defaults.name);
                        o.appendChild(ca);

                        var fc = mtg("div");
                        fc.id = "mtr-form-field-country";
                        fc.className = "mtr-form-field";
                        fc.style.width = "30%";

                            var fci = mtg("select");
                            fci.setAttribute("name", "country_code");
                            fci.style.height = '43px';
                            fci.style.width = '100%';
                            fci.id = "mtr-quick-add-form-input-country";

                            fci.style.color = config.settings.quick_add_form.input_field.color;
                            fci.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                            fci.style.height = config.settings.quick_add_form.input_field.height;
                            fci.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                            fci.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                            fci.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                            fci.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                            fci.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                            fci.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                            fci.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                            fci.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                            fci.style.marginBottom = config.settings.quick_add_form.input_field.distance;

                            fc.style.width = config.settings.quick_add_form.input_field.width.slice(0, -1)*0.3 + '%';
                            fc.style.display = "flex";
                            fc.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                            var countries = g.tools.countriesData();
                            countries.forEach(function (p) {
                                var option = mtg("option");
                                option.innerHTML = p.country;
                                option.setAttribute("data-select",p.country);
                                option.setAttribute("format",p.format);
                                option.setAttribute("code",p.code);
                                option.setAttribute("iso",p.iso);
                                option.value = "+" + p.code;
                                if (p.code == config.settings.quick_add_form.phone_number.country_code.substring(1)){
                                option.selected = 'selected'
                                }
                                fci.appendChild(option);
                            });
                            fci.options[fci.selectedIndex].innerHTML = fci.options[fci.selectedIndex].value 
                            fci.addEventListener('focus mouseleave', function () {
                            for (var focus_option of this.options){
                                focus_option.innerHTML = focus_option.getAttribute("data-select");
                            }
                            fci.style.borderColor = config.settings.design.colors.primary;
                            });
                            fci.addEventListener('blur', function () {
                            fci.style.borderColor = "#cccccc";
                            });
                            fc.appendChild(fci);
                            fpn.appendChild(fc);
                            fpn.appendChild(o);
                            fci.onchange = function() {
                            for (var selected_option of this.options){
                                selected_option.innerHTML = selected_option.getAttribute("data-select");
                                ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                                ca.setCustomValidity('');
                            }
                            this.options[this.selectedIndex].innerHTML = this.options[this.selectedIndex].value 
                            this.blur();
                        }
                    }

                    if (config.settings.form.crypto_wallet_address.require) {
                        var cw = mtg("div");
                        cw.id = "mtr-form-field-crypto-wallet";
                        cw.className = "mtr-form-field";
                        var ci = mtg("input");
                        ci.id = "mtr-form-input-crypto-wallet";
                        ci.setAttribute("type", "text");
                        ci.setAttribute("name", "crypto_wallet_address");
                        !config.settings.sharing.verification.crypto_wallet_confirmation && config.settings.quick_add_form.crypto_wallet_address.required && ci.setAttribute("required", "true");
                        ci.setAttribute("placeholder", config.settings.form.crypto_wallet_address.placeholder);

                        ci.style.color = config.settings.quick_add_form.input_field.color;
                        ci.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                        ci.style.height = config.settings.quick_add_form.input_field.height;
                        ci.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                        ci.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                        ci.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                        ci.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        ci.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                        ci.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                        ci.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                        ci.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                        ci.style.width = config.settings.quick_add_form.input_field.width;
                        ci.style.marginBottom = config.settings.quick_add_form.input_field.distance;
                        cw.style.display = "flex";
                        cw.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                        ci.addEventListener("focus", function () {
                            ci.style.borderColor = config.settings.design.colors.primary
                        });
                        ci.addEventListener("blur", function () {
                            ci.style.borderColor = "#cccccc"
                        });
                        config.defaults.hasOwnProperty("crypto_wallet_address") && ci.setAttribute("value", config.defaults.name);
                        cw.appendChild(ci)
                    }

                    var t = mtg("div");
                    t.id = "mtr-form-field-email";
                    t.className = "mtr-form-field";
                    var u = mtg("input");
                    u.id = "mtr-form-input-email";
                    u.setAttribute("type", "email");
                    u.setAttribute("name", "email");
                    u.setAttribute("required", "true");
                    u.setAttribute("placeholder", config.settings.quick_add_form.email.placeholder);

                    u.style.color = config.settings.quick_add_form.input_field.color;
                    u.style.backgroundColor = config.settings.quick_add_form.input_field.background_color;
                    u.style.height = config.settings.quick_add_form.input_field.height;
                    u.style.borderColor = config.settings.quick_add_form.input_field.border_color;
                    u.style.borderWidth = config.settings.quick_add_form.input_field.border_width;
                    u.style.borderRadius = config.settings.quick_add_form.input_field.border_radius;
                    u.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                    u.style.fontSize = config.settings.quick_add_form.input_field.font_size;
                    u.style.fontWeight = config.settings.quick_add_form.input_field.font_weight ? "bold" : 300;
                    u.style.fontStyle = config.settings.quick_add_form.input_field.font_style ? "italic" : "normal";
                    u.style.textDecoration = config.settings.quick_add_form.input_field.font_decoration ? "underline" : "none";
                    u.style.width = config.settings.quick_add_form.input_field.width;
                    u.style.marginBottom = config.settings.quick_add_form.input_field.distance;
                    t.style.display = "flex";
                    t.style.justifyContent = config.settings.quick_add_form.input_field.alignment;

                    u.addEventListener("focus",
                        function () {
                            u.style.borderColor = config.settings.design.colors.primary
                        });
                    u.addEventListener("blur", function () {
                        u.style.borderColor = "#cccccc"
                    });
                    config.defaults.hasOwnProperty("email") && u.setAttribute("value", config.defaults.email);
                    t.appendChild(u);
                    var y = mtg("div");
                    y.id = "mtr-form-field-submit";
                    y.className = "mtr-form-field";
                    var p = mtg("button");
                    p.id = "mtr-quick-add-form-submit-button";
                    p.setAttribute("type", "button");
                    p.innerHTML = config.settings.quick_add_form.submit_button.text;
                    p.style.backgroundColor = config.settings.quick_add_form.submit_button.color;
                    p.style.color = config.settings.quick_add_form.submit_button.label_color;
                    p.style.width = config.settings.quick_add_form.submit_button.width;
                    p.style.borderRadius = config.settings.quick_add_form.submit_button.corner_roundness;
                    p.style.fontSize = config.settings.quick_add_form.submit_button.font_size;
                    p.style.height = config.settings.quick_add_form.submit_button.height;
                    p.style.fontWeight = config.settings.quick_add_form.submit_button.bold ? 'bolder' : 'normal';
                    p.style.textDecoration = config.settings.quick_add_form.submit_button.underline ? 'underline' : 'none';
                    p.style.fontStyle = config.settings.quick_add_form.submit_button.italic ? 'italic' : 'none';
                    p.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.submit_button.font_family);
                    y.style.display = "flex";
                    y.style.justifyContent = config.settings.quick_add_form.submit_button.alignment;

                    y.appendChild(p);
                    if (config.settings.quick_add_form.terms_conditions.require) {
                        var v = mtg("div");
                        v.id = "mtr-form-field-tc";
                        v.className = "mtr-form-field";
                        var x = mtg("input");
                        x.id = "mtr-form-tc-checkbox";
                        x.setAttribute("type", "checkbox");
                        x.setAttribute("name", "terms");
                        var A = mtg("label");
                        A.id = "mtr-form-tc-text";
                        A.setAttribute("for", "mtr-form-tc-checkbox");
                        A.innerHTML = config.settings.quick_add_form.terms_conditions.text;
                        A.style.fontFamily = g.tools.findFont(config.settings.quick_add_form.input_field.font_family);
                        var z = mtg("a");
                        z.id = "mtr-form-tc-link";
                        z.setAttribute("href", config.settings.quick_add_form.terms_conditions.url);
                        z.setAttribute("target", "_blank");
                        z.style.position = "relative";
                        z.style.zIndex = "10"
                        z.innerText = "\ud83d\udd17";
                        A.appendChild(z);
                        v.appendChild(x);
                        v.appendChild(A)
                    }
                    if (config.settings.quick_add_form.field_positions){
                        var field_positions = config.settings.quick_add_form.field_positions.split(" ");
                        field_positions = field_positions.filter(function(str) {
                            return /\S/.test(str);
                        });
                        for (var field_name of field_positions){
                            switch(field_name){
                                case "name":
                                    config.settings.quick_add_form.name.require && d.appendChild(f);
                                    break;
                                case "email":
                                    config.settings.quick_add_form.email.require && d.appendChild(t);
                                    break;
                                case "phone":
                                    config.settings.quick_add_form.phone_number.require && d.appendChild(fpn);
                                    break;
                                case "crypto":
                                    config.settings.quick_add_form.crypto_wallet_address.require && d.appendChild(cw);
                                    break;
                                case "extra1":
                                    config.settings.quick_add_form.extra_field.require && d.appendChild(k);
                                    break;
                                case "extra2":
                                    config.settings.quick_add_form.extra_field_2.require && d.appendChild(n);
                                    break;
                                case "extra3":
                                    config.settings.quick_add_form.extra_field_3.require && d.appendChild(n3);
                                    break;
                                case "extra4":
                                    config.settings.quick_add_form.extra_field_4.require && d.appendChild(n4);
                                    break;
                                case "options":
                                    config.settings.quick_add_form.option_field.require && d.appendChild(of);
                                    break;
                            }
                        }
                    }else{
                        config.settings.quick_add_form.name.require && d.appendChild(f);
                        d.appendChild(t);
                        config.settings.quick_add_form.phone_number.require && d.appendChild(fpn);
                        config.settings.quick_add_form.crypto_wallet_address.require && d.appendChild(cw);
                        config.settings.quick_add_form.extra_field.require && d.appendChild(k);
                        config.settings.quick_add_form.extra_field_2.require && d.appendChild(n);
                        config.settings.quick_add_form.extra_field_3.require && d.appendChild(n3);
                        config.settings.quick_add_form.extra_field_4.require && d.appendChild(n4);
                        config.settings.quick_add_form.option_field.require && d.appendChild(of);
                    }
                    
                    config.settings.quick_add_form.terms_conditions.require && d.appendChild(v);
                    d.appendChild(y);
                    c.appendChild(hs);
                    c.appendChild(hsi);
                    c.appendChild(d);
                    t = mtg("div");
                    t.id = "mtr-form-status-container";
                    t.style = "display:none";
                    ((mtid(config.defaults.form_container_id) || mtid(config.defaults.form_container_id_two) || mtid(config.defaults.sharing_form_container_id) || mtid('maitre-floating-button') || mtid(config.defaults.inline_button_container_id)) ? c.appendChild(t) : "")
                    p.addEventListener("click", function (J) {
                        //g.tools.preventHubspotFormSubmit();
                        J.preventDefault();
                        p.innerHTML = g.tools.tailwindSpinner();
                        p.disabled = !0;
                        form_validity = g.form.incomplete(c, config, RH, 1, config.settings.quick_add_form);
                        "valid" == form_validity ? config.settings.recaptcha.enable && C ? grecaptcha.execute(F) : (data = g.tools.getFormValues(c, RH), g.form.submit(data, config, RH, 1, config.settings.quick_add_form, "quick_add_form")) : ("form_incomplete" == form_validity ? alert_or_console(config.settings.alerts.form_incomplete) : "terms_not_accepted" == form_validity ? alert_or_console(config.settings.alerts.terms_conditions) : "invalid_phone_number" == form_validity &&
                            alert_or_console(config.settings.alerts.invalid_phone_number), p.disabled = !1, p.innerText = config.settings.quick_add_form.submit_button.text)
                    });
                    (config.settings.design.powered_by || config.settings.design.powered_by) && c.appendChild(g.generate.poweredBy("form", config));
                    config.settings.recaptcha.enable && "" != config.settings.recaptcha.public_key.trim() && g.libraries.recaptcha(config, RH);
                    a.appendChild(c);
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate quickadd 8916");
                    console.error("[ReferralHero] An unexpected error occurred in method generate quickadd:", err);
                }
            }, email_preview: function(config){
                try{
                    var a = mtg("div");
                    a.id = "email_preview";
                    a.className = "mtr-hide";
                    var esh = mtg("p");
                    esh.id = "email_header";
                    esh.innerText = "Email Subject";
                    a.appendChild(esh);
                    var es = mtg("p");
                    es.id = "email_subject";
                    es.innerText = config.settings.quick_add_form.invitation_email.subject;
                    a.appendChild(es);
                    var ebh = mtg("p");
                    ebh.id = "email_body_header";
                    ebh.innerText = "Email Body";
                    a.appendChild(ebh);
                    var eb = mtg("p");
                    eb.id = "email_body";
                    var button =  "<p style='background:"+ config.settings.quick_add_form.confirmation_link_background + "; padding: 15px; border-radius: 3px; color: "+ config.settings.quick_add_form.confirmation_link_color + "; font-size: 17px; font-weight: bold; margin: 15px 0; display: inline-block;text-decoration: none;'>"+ config.settings.quick_add_form.confirmation_link_label + "</p>"
                    eb.innerHTML = config.settings.quick_add_form.invitation_email.body.replace(/\n/g,"<br>").replace("%confirmation_link%", button);
                    eb.innerHTML= eb.innerHTML.replace("%facebook_icon%","<p id=mtr-sharing-social-facebook class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%email_icon%","<p id=mtr-sharing-social-email class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%whatsapp_icon%","<p id=mtr-sharing-social-whatsapp class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%line_icon%","<p id=mtr-sharing-social-line class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%reddit_icon%","<p id=mtr-sharing-social-reddit class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%telegram_icon%","<p id=mtr-sharing-social-telegram class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%linkedin_icon%","<p id=mtr-sharing-social-linkedin class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%twitter_icon%","<p id=mtr-sharing-social-twitter class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%facebook_messenger_icon%","<p id=mtr-sharing-social-facebook-messenger class=mtr-sharing-social></p>");
                    eb.innerHTML= eb.innerHTML.replace("%kakao_talk_icon%","<p id=mtr-sharing-social-kakao-talk class=mtr-sharing-social></p>");
                    a.appendChild(eb);

                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate email_preview 8954");
                    console.error("[ReferralHero] An unexpected error occurred in method generate email_preview:", err);
                }
            }, signup_widget_form: function (config, RH) {
                try{
                    var a =
                        mtg("div");
                    a.id = "mtr-optin-form";
                    a.classList.add(`mtr-custom-css-${config.uuid}`);
                    a.style.borderRadius = config.settings.signup_widget_form.form_border.radius;
                    if(config.settings.signup_widget_form.widget_width){
                        a.style.maxWidth = '95%';
                        a.style.width = !g.tools.mobileCheck() ? config.settings.signup_widget_form.widget_width : '98%';
                    }
                    var c = mtg("form");
                    c.id = "mtr-form";
                    c.setAttribute("method", "POST");
                    c.setAttribute("autocomplete", "off");
                    c.setAttribute("action", "#");
                    c.style.borderTopColor = config.settings.signup_widget_form.border;
                    c.style.borderStyle = config.settings.signup_widget_form.form_border.style;
                    c.style.borderWidth = config.settings.signup_widget_form.form_border.width;
                    c.style.borderRadius = config.settings.signup_widget_form.form_border.radius;
                    c.style.borderColor = config.settings.signup_widget_form.form_border.color;
                    c.style.padding = config.settings.signup_widget_form.widget_padding;

                    if (!isEmpty(config.settings.signup_widget_form.designer_signup_settings)){
                        if (config.settings.signup_widget_form.background.enable_color){
                            c.style.backgroundColor = config.settings.signup_widget_form.background.color;
                        }
                        else if (null != config.settings.signup_widget_form.background.image && "" != config.settings.signup_widget_form.background.image) {
                            c.style.backgroundImage = "url('" + config.settings.signup_widget_form.background.image + "')";
                            c.style.backgroundSize = config.settings.signup_widget_form.background.image_size;
                        }
                    }
                    else if (null != config.settings.signup_widget_form.cover && "" != config.settings.signup_widget_form.cover) {
                        var d = mtg("div");
                        d.id = "mtr-form-cover";
                        d.style.backgroundImage = "url('" + config.settings.signup_widget_form.cover + "')";
                        c.appendChild(d)
                    }
                    config.settings.recaptcha.enable && (d = mtg("div"), d.id = "RHCaptcha", c.appendChild(d));
                    var vr = mtg("div");
                    vr.id="mtr-optin-verification-container"
                    c.appendChild(vr);
                    d = mtg("div");
                    d.id = "mtr-form-fields";
                    if (config.settings.signup_widget_form.name.require) {
                        var f = mtg("div");
                        f.id = "mtr-form-field-name";
                        f.className = "mtr-form-field";

                        var e = g.fields.name_field(config.settings.signup_widget_form, config);

                        f.style.display = "flex";
                        f.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;
                        
                        config.defaults.hasOwnProperty("name") && e.setAttribute("value", config.defaults.name);
                        f.appendChild(e)
                    }
                    if (config.settings.signup_widget_form.email.require) {
                        var te = mtg("div");
                        te.id = "mtr-form-field-email";
                        te.className = "mtr-form-field";

                        var u = g.fields.email(config.settings.signup_widget_form, config);

                        te.style.display = "flex";
                        te.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        config.defaults.hasOwnProperty("email") && u.setAttribute("value", config.defaults.email);
                        te.appendChild(u);
                    }
                    if (config.settings.signup_widget_form.phone_number.require) {
                        var fpn = mtg("div");
                        fpn.className = "mtr-flex phone-num-row";
                        var o = mtg("div");
                        o.id = "mtr-form-field-phone";
                        o.className = "mtr-form-field";
                        
                        var ca = g.fields.phone_number(config.settings.signup_widget_form, config);

                        ca.addEventListener('input', () =>{
                            ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                            ca.setCustomValidity('');
                        });

                        o.style.width = config.settings.signup_widget_form.input_field.width.slice(0, -1)*0.7 + '%';
                        o.style.marginBottom = config.settings.signup_widget_form.input_field.distance;
                        fpn.style.justifyContent = config.settings.form.input_field.alignment;

                        config.defaults.hasOwnProperty("phone_number") && ca.setAttribute("value", config.defaults.name);
                        o.appendChild(ca);

                        // Country code field

                        var fc = mtg("div");
                        fc.id = "mtr-form-field-country";
                        fc.className = "mtr-form-field";
                        fc.style.maxWidth = config.settings.signup_widget_form.input_field.width.slice(0, -1)*0.3 + '%';

                        var fci = g.fields.country_field(config.settings.signup_widget_form, config);

                        fc.appendChild(fci);
                        fpn.appendChild(fc);
                        fpn.appendChild(o);
                        fci.onchange = function() {
                            for (var selected_option of this.options){
                                selected_option.innerHTML = selected_option.getAttribute("data-select");
                                ca.value = phoneFormat(ca.value, fci.options[fci.selectedIndex].getAttribute("format"), fci.options[fci.selectedIndex].getAttribute("code"), fci.options[fci.selectedIndex].getAttribute("iso"));
                                ca.setCustomValidity('');
                            }
                            this.options[this.selectedIndex].innerHTML = this.options[this.selectedIndex].value 
                            this.blur();
                        }
                    }
                    if (config.settings.signup_widget_form.crypto_wallet_address.require) {
                        var cw = mtg("div");
                        cw.id = "mtr-form-field-crypto-wallet";
                        cw.className = "mtr-form-field";
                        var ci = mtg("input");
                        ci.id = "mtr-form-input-crypto-wallet";
                        ci.setAttribute("type", "text");
                        ci.setAttribute("name", "crypto_wallet_address");
                        !config.settings.sharing.verification.crypto_wallet_confirmation && config.settings.signup_widget_form.crypto_wallet_address.required && ci.setAttribute("required", "true");
                        ci.setAttribute("placeholder", config.settings.signup_widget_form.crypto_wallet_address.placeholder);

                        ci.style.color = config.settings.signup_widget_form.input_field.color;
                        ci.style.backgroundColor = config.settings.signup_widget_form.input_field.background_color;
                        ci.style.height = config.settings.signup_widget_form.input_field.height;
                        ci.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        ci.style.borderWidth = config.settings.signup_widget_form.input_field.border_width;
                        ci.style.borderRadius = config.settings.signup_widget_form.input_field.border_radius;
                        ci.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        ci.style.fontSize = config.settings.signup_widget_form.input_field.font_size;
                        ci.style.width = config.settings.signup_widget_form.input_field.width;
                        ci.style.marginBottom = config.settings.signup_widget_form.input_field.distance;
                        cw.style.display = "flex";
                        cw.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        ci.addEventListener("focus", function () {
                            ci.style.borderColor = config.settings.design.colors.primary
                        });
                        ci.addEventListener("blur", function () {
                            ci.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("crypto_wallet_address") && ci.setAttribute("value", config.defaults.name);
                        cw.appendChild(ci)

                        var cp = mtg("div");
                        cp.id = "mtr-form-field-crypto-wallet-provider";
                        var cpi = mtg("button");
                        cpi.className = "mtr-form-field";
                        cpi.id = "mtr-form-provider-connect";
                        cpi.setAttribute("type", "button");
                        cpi.innerHTML = config.settings.signup_widget_form.crypto_wallet_provider.placeholder;
                        cpi.setAttribute("name","crypto_wallet_provider");
                        cpi.value = "";

                        cpi.style.color = config.settings.signup_widget_form.input_field.color;
                        cpi.style.backgroundColor = config.settings.signup_widget_form.input_field.background_color;
                        cpi.style.height = config.settings.signup_widget_form.input_field.height;
                        cpi.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        cpi.style.borderWidth = config.settings.signup_widget_form.input_field.border_width;
                        cpi.style.borderRadius = config.settings.signup_widget_form.input_field.border_radius;
                        cpi.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        cpi.style.fontSize = config.settings.signup_widget_form.input_field.font_size;
                        cpi.style.width = config.settings.signup_widget_form.input_field.width;
                        cpi.style.marginBottom = config.settings.signup_widget_form.input_field.distance;
                        cp.style.display = "flex";
                        cp.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        var sel = mtg("div");
                        sel.id = "provider-list"
                        sel.className = "provider-list-content"
                        config.settings.signup_widget_form.providers.forEach(function (p) {
                            var a = mtg("a");
                            a.className = p;
                            a.setAttribute("value", p);
                            a.innerHTML = toTitleCase(p.replace("_", " "));
                            a.onclick = async function(){    
                            cpi.value = p ;
                            cpi.innerText = toTitleCase(p.replace("_", " "));
                                var pr = cpi.value
                                if (pr){
                                    var key = await g.verification.connectWallet(pr);
                                    if ( key ){
                                        ci.value = key;
                                        cpi.style.borderColor = "#5cb85c"
                                        vr.innerHTML = "";
                                        vr.style.padding = "";
                                        cpi.innerText = toTitleCase(p.replace("_", " ")) + " Successfully Connected!";
                                        cpi.classList.add(pr);
                                        cpi.style.backgroundPosition = "25px 7px";
                                        cpi.style.textAlign = "center";
                                    } 
                                    else {
                                        ci.value = "";
                                        cpi.style.borderColor = "#d9534f";
                                        cpi.classList.remove('metamask', 'phantom', 'wallet_connect', 'coinbase');
                                        cpi.style.textAlign = "left";
                                        vr.style.padding = "0.55em"
                                        vr.innerHTML = "<p id='mtr-sharing-verification'>Connect Wallet Failed. Please make sure you have the " + toTitleCase(pr.replace("_", " ")) + " wallet extension installed. <a href='" + g.generate.cryptoWalletExtensionLink(pr) + "' target='_blank'> Install here.</a></p>"
                                    }
                                }
                                else{ 
                                    alert_or_console("Please select valid crypto provider")
                                }
                            };
                            sel.appendChild(a);
                            
                        });
                        config.defaults.hasOwnProperty("crypto_wallet_provider") && ci.setAttribute("value", config.defaults.name);
                        cp.appendChild(cpi);
                        cp.appendChild(sel);
                        
                        if (config.settings.sharing.verification.crypto_wallet_confirmation){
                            cpi.onclick = function() {
                                sel.classList.toggle("show");
                            }

                            window.onclick = function(event) {
                                if (!event.target.matches('#mtr-form-provider-connect')) {
                                    var dropdowns = document.getElementsByClassName("provider-list-content");
                                    var i;
                                    for (i = 0; i < dropdowns.length; i++) {
                                    var openDropdown = dropdowns[i];
                                    if (openDropdown.classList.contains('show')) {
                                        openDropdown.classList.remove('show');
                                    }
                                    }
                                }
                            }
                            ci.style.display = "none";
                            cw.style.margin = "0px";
                            
                        }
                    }
                    if (config.settings.signup_widget_form.other_identifier.require) {
                        var oi = mtg("div");
                        oi.id = "mtr-form-field-other-identifier";
                        oi.className = "mtr-form-field";
                        oi.style.display = "flex";
                        oi.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        var io = g.fields.other_identifier(config.settings.signup_widget_form, config);

                        config.defaults.hasOwnProperty("other_identifier") && u.setAttribute("value", config.defaults.other_identifier);
                        oi.appendChild(io);
                    }
                    if (config.settings.signup_widget_form.address.require) {
                        var field = g.fields.address_field(config.settings.signup_widget_form, config);
                        var adr = field.input;
                        var ad = field.wrapper;               
                    }
                    if (config.settings.signup_widget_form.extra_field.require) {
                        var k = mtg("div");
                        k.id = "mtr-form-field-extra";
                        k.className = "mtr-form-field";
                        var h = mtg("input");
                        h.id = "mtr-form-input-extra-field";
                        h.setAttribute("type", "text");
                        h.setAttribute("name", "extra_field");
                        config.settings.signup_widget_form.extra_field.required && h.setAttribute("required", "true");
                        h.setAttribute("placeholder", config.settings.signup_widget_form.extra_field.placeholder);

                        h.style.color = config.settings.signup_widget_form.input_field.color;
                        h.style.backgroundColor = config.settings.signup_widget_form.input_field.background_color;
                        h.style.height = config.settings.signup_widget_form.input_field.height;
                        h.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        h.style.borderWidth = config.settings.signup_widget_form.input_field.border_width;
                        h.style.borderRadius = config.settings.signup_widget_form.input_field.border_radius;
                        h.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        h.style.fontSize = config.settings.signup_widget_form.input_field.font_size;
                        h.style.width = config.settings.signup_widget_form.input_field.width;
                        h.style.marginBottom = config.settings.signup_widget_form.input_field.distance;
                        k.style.display = "flex";
                        k.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        h.addEventListener("focus", function () {
                            h.style.borderColor = config.settings.design.colors.primary
                        });
                        h.addEventListener("blur", function () {
                            h.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("extra_field") &&
                        h.setAttribute("value", config.defaults.extra_field);
                        k.appendChild(h)
                    }
                    if (config.settings.signup_widget_form.extra_field_2.require) {
                        var n = mtg("div");
                        n.id = "mtr-form-field-extra-2";
                        n.className = "mtr-form-field";
                        var l = mtg("input");
                        l.id = "mtr-form-input-extra-field-2";
                        l.setAttribute("type", "text");
                        l.setAttribute("name", "extra_field_2");
                        config.settings.signup_widget_form.extra_field_2.required && l.setAttribute("required", "true");
                        l.setAttribute("placeholder", config.settings.signup_widget_form.extra_field_2.placeholder);

                        l.style.color = config.settings.signup_widget_form.input_field.color;
                        l.style.backgroundColor = config.settings.signup_widget_form.input_field.background_color;
                        l.style.height = config.settings.signup_widget_form.input_field.height;
                        l.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        l.style.borderWidth = config.settings.signup_widget_form.input_field.border_width;
                        l.style.borderRadius = config.settings.signup_widget_form.input_field.border_radius;
                        l.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        l.style.fontSize = config.settings.signup_widget_form.input_field.font_size;
                        l.style.width = config.settings.signup_widget_form.input_field.width;
                        l.style.marginBottom = config.settings.signup_widget_form.input_field.distance;
                        n.style.display = "flex";
                        n.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        l.addEventListener("focus", function () {
                            l.style.borderColor = config.settings.design.colors.primary
                        });
                        l.addEventListener("blur", function () {
                            l.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("extra_field_2") && l.setAttribute("value", config.defaults.extra_field_2);
                        n.appendChild(l)
                    }
                    if (config.settings.signup_widget_form.extra_field_3.require) {
                        var n3 = mtg("div");
                        n3.id = "mtr-form-field-extra-3";
                        n3.className = "mtr-form-field";
                        var l3 = mtg("input");
                        l3.id = "mtr-form-input-extra-field-3";
                        l3.setAttribute("type", "text");
                        l3.setAttribute("name", "extra_field_3");
                        config.settings.signup_widget_form.extra_field_3.required && l3.setAttribute("required", "true");
                        l3.setAttribute("placeholder", config.settings.signup_widget_form.extra_field_3.placeholder);

                        l3.style.color = config.settings.signup_widget_form.input_field.color;
                        l3.style.backgroundColor = config.settings.signup_widget_form.input_field.background_color;
                        l3.style.height = config.settings.signup_widget_form.input_field.height;
                        l3.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        l3.style.borderWidth = config.settings.signup_widget_form.input_field.border_width;
                        l3.style.borderRadius = config.settings.signup_widget_form.input_field.border_radius;
                        l3.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        l3.style.fontSize = config.settings.signup_widget_form.input_field.font_size;
                        l3.style.width = config.settings.signup_widget_form.input_field.width;
                        l3.style.marginBottom = config.settings.signup_widget_form.input_field.distance;
                        n3.style.display = "flex";
                        n3.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        l3.addEventListener("focus", function () {
                            l3.style.borderColor = config.settings.design.colors.primary
                        });
                        l3.addEventListener("blur", function () {
                            l3.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("extra_field_3") && l3.setAttribute("value", config.defaults.extra_field_3);
                        n3.appendChild(l3)
                    }
                    if (config.settings.signup_widget_form.extra_field_4.require) {
                        var n4 = mtg("div");
                        n4.id = "mtr-form-field-extra-4";
                        n4.className = "mtr-form-field";
                        var l4 = mtg("input");
                        l4.id = "mtr-form-input-extra-field-4";
                        l4.setAttribute("type", "text");
                        l4.setAttribute("name", "extra_field_4");
                        config.settings.signup_widget_form.extra_field_4.required && l4.setAttribute("required", "true");
                        l4.setAttribute("placeholder", config.settings.signup_widget_form.extra_field_4.placeholder);

                        l4.style.color = config.settings.signup_widget_form.input_field.color;
                        l4.style.backgroundColor = config.settings.signup_widget_form.input_field.background_color;
                        l4.style.height = config.settings.signup_widget_form.input_field.height;
                        l4.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        l4.style.borderWidth = config.settings.signup_widget_form.input_field.border_width;
                        l4.style.borderRadius = config.settings.signup_widget_form.input_field.border_radius;
                        l4.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        l4.style.fontSize = config.settings.signup_widget_form.input_field.font_size;
                        l4.style.width = config.settings.signup_widget_form.input_field.width;
                        l4.style.marginBottom = config.settings.signup_widget_form.input_field.distance;
                        n4.style.display = "flex";
                        n4.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        l4.addEventListener("focus", function () {
                            l4.style.borderColor = config.settings.design.colors.primary
                        });
                        l4.addEventListener("blur", function () {
                            l4.style.borderColor = config.settings.signup_widget_form.input_field.border_color;
                        });
                        config.defaults.hasOwnProperty("extra_field_4") && l4.setAttribute("value", config.defaults.extra_field_4);
                        n4.appendChild(l4)
                    }
                    if (config.settings.signup_widget_form.option_field.require) {         
                        var of = mtg("div");
                        of.id = "mtr-form-option-field";
                        of.className = "mtr-form-field";
                        of.style.display = "flex";
                        of.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        var oft = g.fields.option_field(config.settings.signup_widget_form, config);

                        config.defaults.hasOwnProperty("option_field") && oft.setAttribute("value", config.defaults.option_field);
                        of.appendChild(oft);
                    };

                    var st = mtg("div");
                    st.className = "mtr-form-field";

                    var y = mtg("div");
                    y.id = "mtr-form-field-submit";
                    y.className = "mtr-form-field";
                    var p = mtg("button");
                    p.id = "mtr-form-submit-button";
                    p.setAttribute("type", "submit");
                    p.innerHTML = config.settings.signup_widget_form.submit_button.text;
                    p.style.backgroundColor = config.settings.signup_widget_form.submit_button.color;
                    p.style.color = config.settings.signup_widget_form.submit_button.label_color;
                    p.style.minWidth = "fit-content";
                    p.style.width = config.settings.signup_widget_form.submit_button.width;
                    p.style.borderRadius = config.settings.signup_widget_form.submit_button.corner_roundness;
                    p.style.fontSize = config.settings.signup_widget_form.submit_button.font_size;
                    p.style.height = config.settings.signup_widget_form.submit_button.height;
                    p.style.fontWeight = config.settings.signup_widget_form.submit_button.bold ? 'bolder' : 'normal';
                    p.style.textDecoration = config.settings.signup_widget_form.submit_button.underline ? 'underline' : 'none';
                    p.style.fontStyle = config.settings.signup_widget_form.submit_button.italic ? 'italic' : 'none';
                    p.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.submit_button.font_family);
                    p.style.minHeight = "fit-content";
                    p.style.whiteSpace = "normal";
                    p.style.wordBreak = "break-word";

                    y.style.display = "flex";
                    y.style.justifyContent = config.settings.signup_widget_form.submit_button.alignment;
                    y.appendChild(p);
                    if (config.settings.signup_widget_form.terms_conditions.require) {
                        var form_tc1 = mtg("div");
                        form_tc1.style.width = config.settings.signup_widget_form.input_field.width;
                        var v = mtg("div");
                        v.id = "mtr-form-field-tc";
                        v.className = "mtr-form-field";
                        //v.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;
                        if (config.settings.signup_widget_form.input_field.alignment === "center") {
                        form_tc1.style.margin = "0 auto";
                        } else if (config.settings.signup_widget_form.input_field.alignment === "flex-end") {
                        form_tc1.style.marginLeft = "auto";
                        }

                        var x = mtg("input");
                        x.id = "mtr-form-tc-checkbox";
                        x.setAttribute("type", "checkbox");
                        x.setAttribute("name", "terms");

                        var A = mtg("label");
                        A.id = "mtr-form-tc-text";
                        A.setAttribute("for", "mtr-form-tc-checkbox");
                        A.innerHTML = config.settings.signup_widget_form.terms_conditions.text;
                        A.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        A.style.color = config.settings.signup_widget_form.input_field.color; 
                        const borderColor = config.settings.signup_widget_form.input_field.border_color;
                        const oldStyle = document.getElementById('dynamic-tc-before-style');
                        if (oldStyle) oldStyle.remove();
                        
                        const style = document.createElement('style');
                        style.id = 'dynamic-tc-before-style';
                        style.textContent = `
                            #mtr-form-tc-text::before {
                            border-color: ${borderColor} !important;
                            }
                        `;
                        document.head.appendChild(style);

                        var tcUrl = config.settings.signup_widget_form.terms_conditions.url;
                        if (tcUrl && tcUrl.trim() !== "") {
                        var z = mtg("a");
                        z.id = "mtr-form-tc-link";
                        z.setAttribute("href", tcUrl);
                        z.setAttribute("target", "_blank");
                        z.innerText = "\ud83d\udd17";
                        z.style.position = "relative";
                        z.style.zIndex = "10"
                        A.appendChild(z);
                        }
                        A.appendChild(document.createTextNode("\u00A0\u00A0"));

                        var A2 = mtg("label");
                        A2.innerHTML = config.settings.signup_widget_form.terms_conditions.text2;
                        A2.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        A2.style.color = config.settings.signup_widget_form.input_field.color; 
                        A.appendChild(A2);

                        var tcUrl2 = config.settings.signup_widget_form.terms_conditions.url2;
                        if (tcUrl2 && tcUrl2.trim() !== "") {
                        var z2 = mtg("a");
                        z2.id = "mtr-form-tc-link";
                        z2.setAttribute("href", tcUrl2);
                        z2.setAttribute("target", "_blank");
                        z2.innerText = "\ud83d\udd17";
                        z2.style.position = "relative";
                        z2.style.zIndex = "10"
                        A.appendChild(z2);
                        }
                        
                        v.appendChild(x);
                        v.appendChild(A);
                        form_tc1.appendChild(v);
                    }

                    if (config.settings.signup_widget_form.terms_conditions_2.require) {
                        var form_tc2 = mtg("div");
                        form_tc2.style.width = config.settings.signup_widget_form.input_field.width;
                        if (config.settings.signup_widget_form.input_field.alignment === "center") {
                        form_tc2.style.margin = "0 auto";
                        } else if (config.settings.signup_widget_form.input_field.alignment === "flex-end") {
                        form_tc2.style.marginLeft = "auto";
                        }
                        form_tc2.style.marginBottom = "10px";
                        var vc = mtg("div");
                        vc.id = "mtr-form-field-tc-2";
                        vc.className = "mtr-form-field";
                        // vc.style.justifyContent = config.settings.signup_widget_form.input_field.alignment;

                        var xc = mtg("input");
                        xc.id = "mtr-form-tc-checkbox-2";
                        xc.setAttribute("type", "checkbox");
                        xc.setAttribute("name", "terms2");
                        
                        var Ac = mtg("label");
                        Ac.id = "mtr-form-tc-text-2";
                        Ac.setAttribute("for", "mtr-form-tc-checkbox-2");
                        Ac.innerHTML = config.settings.signup_widget_form.terms_conditions_2.text;
                        Ac.style.fontFamily = g.tools.findFont(config.settings.signup_widget_form.input_field.font_family);
                        Ac.style.color = config.settings.signup_widget_form.input_field.color;
                        const borderColor = config.settings.signup_widget_form.input_field.border_color;
                        const oldStyle = document.getElementById('dynamic-tc-before-style-2');
                        if (oldStyle) oldStyle.remove();
                        
                        const style = document.createElement('style');
                        style.id = 'dynamic-tc-before-style-2';
                        style.textContent = `
                        #mtr-form-tc-text-2::before {
                            border-color: ${borderColor} !important;
                        }
                        `;
                        document.head.appendChild(style);

                        vc.appendChild(xc);
                        vc.appendChild(Ac);
                        form_tc2.appendChild(vc);
                    }

                    
                    //appending fields according to form field positions
                    if (config.settings.signup_widget_form.field_positions){
                        var field_positions = config.settings.signup_widget_form.field_positions.split(" ");
                        field_positions = field_positions.filter(function(str) {
                            return /\S/.test(str);
                        });
                        for (var field_name of field_positions){
                            switch(field_name){
                                case "name":
                                    config.settings.signup_widget_form.name.require && d.appendChild(f);
                                    break;
                                case "email":
                                    config.settings.signup_widget_form.email.require && d.appendChild(te);
                                    break;
                                case "phone":
                                    config.settings.signup_widget_form.phone_number.require && d.appendChild(fpn);
                                    break;
                                case "crypto":
                                    config.settings.signup_widget_form.crypto_wallet_address.require && d.appendChild(cw);
                                    config.settings.signup_widget_form.crypto_wallet_address.require && config.settings.sharing.verification.crypto_wallet_confirmation && d.appendChild(cp);
                                    break;
                                case "other":
                                    config.settings.signup_widget_form.other_identifier.require && d.appendChild(oi);
                                    break;
                                case "address":
                                    config.settings.signup_widget_form.address.require && d.appendChild(ad);
                                    break;
                                case "extra1":
                                    config.settings.signup_widget_form.extra_field.require && d.appendChild(k);
                                    break;
                                case "extra2":
                                    config.settings.signup_widget_form.extra_field_2.require && d.appendChild(n);
                                    break;
                                case "extra3":
                                    config.settings.signup_widget_form.extra_field_3.require && d.appendChild(n3);
                                    break;
                                case "extra4":
                                    config.settings.signup_widget_form.extra_field_4.require && d.appendChild(n4);
                                    break;
                                case "options":
                                    config.settings.signup_widget_form.option_field.require && d.appendChild(of);
                                    break;
                            }
                        }
                    }else{
                        config.settings.signup_widget_form.name.require && d.appendChild(f);
                        config.settings.signup_widget_form.email.require && d.appendChild(te);
                        config.settings.signup_widget_form.phone_number.require && d.appendChild(fpn);
                        config.settings.signup_widget_form.crypto_wallet_address.require && d.appendChild(cw);
                        config.settings.signup_widget_form.crypto_wallet_address.require && config.settings.sharing.verification.crypto_wallet_confirmation && d.appendChild(cp);
                        config.settings.signup_widget_form.other_identifier.require && d.appendChild(oi);
                        config.settings.signup_widget_form.address.require && d.appendChild(ad);
                        config.settings.signup_widget_form.extra_field.require && d.appendChild(k);
                        config.settings.signup_widget_form.extra_field_2.require && d.appendChild(n);
                        config.settings.signup_widget_form.extra_field_3.require && d.appendChild(n3);
                        config.settings.signup_widget_form.extra_field_4.require && d.appendChild(n4);
                        config.settings.signup_widget_form.option_field.require && d.appendChild(of);
                    }
                    config.settings.signup_widget_form.terms_conditions.require && d.appendChild(form_tc1);
                    config.settings.signup_widget_form.terms_conditions_2.require && d.appendChild(form_tc2);
                    d.appendChild(y);
                    d.appendChild(st);
                    t = mtg("div");
                    
                    //appending form elements
                    if (!isEmpty(config.settings.signup_widget_form.designer_signup_settings)){
                        var designer_data = config.settings.signup_widget_form.designer_signup_settings
                        var grid_arr = [];
                        for( var i in designer_data){
                            var el = g.tools.designElement(designer_data[i], config, RH);
                            if (el){
                            if (el.getAttribute('id') == 'maitre-signup-widget-form-fields'){
                                el.appendChild(d);
                                c.appendChild(el);
                            }
                            else{
                                c.appendChild(el);
                                if(el.classList.contains('mtr-grid-field')){grid_arr.push(el);}
                            }
                            }
                        }
                        c.querySelectorAll('.sub-grid-field').forEach((el)=>{
                            var gId = el.getAttribute('data-grid-id');
                            el.style.maxWidth = "100%"
                            c.querySelector('#'+gId).appendChild(el);
                        });
                        c.querySelectorAll('.sub-column-field').forEach((el)=>{
                            var gId = el.getAttribute('data-column-id');
                            c.querySelector('#'+gId).appendChild(el);
                        });
                    }else{
                        c.appendChild(d);
                    }    

                    ((mtid(config.defaults.form_container_id) || mtid(config.defaults.form_container_id_two) || mtid(config.defaults.sharing_form_container_id) || mtid('maitre-floating-button') || mtid(config.defaults.inline_button_container_id)) ? c.appendChild(t) : "")
                    c.addEventListener("submit", function (J) {
                        J.preventDefault();
                        p.innerHTML = g.tools.tailwindSpinner();
                        p.disabled = !0;
                        form_validity = g.form.incomplete(c, config, RH, 0, config.settings.signup_widget_form);
                        "valid" == form_validity ? config.settings.recaptcha.enable && C ? grecaptcha.execute(F) : (data = g.tools.getFormValues(c, RH), g.form.submit(data, config, RH, 0, config.settings.signup_widget_form, "signup_widget")) : ("form_incomplete" == form_validity ? alert_or_console(config.settings.alerts.form_incomplete) : "terms_not_accepted" == form_validity ? alert_or_console(config.settings.alerts.terms_conditions) : "invalid_phone_number" == form_validity && alert_or_console(config.settings.alerts.invalid_phone_number), (config.settings.signup_widget_form.redirection.enable || config.settings.signup_widget_form.option_redirection.enable) ? p.disabled = !0 : (p.disabled = !1, p.innerText = q ? config.settings.signup_widget_form.submit_button.check_position : config.settings.signup_widget_form.submit_button.text))
                    });
                    (config.settings.design.powered_by || config.settings.design.powered_by) && c.appendChild(g.generate.poweredBy("form", config));
                    config.settings.recaptcha.enable && "" != config.settings.recaptcha.public_key.trim() && g.libraries.recaptcha(config, RH);
                    a.appendChild(c);
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.signup_widget_form 9608");
                    console.error("[ReferralHero] An unexpected error occurred in method generate signup_widget_form:", err);
                }

            }, thankyou_screen: function (config, RH) {
                try{
                    var th = mtg("div");
                    if (!isEmpty(config.settings.signup_widget_form.thankyou_screen_settings)){
                            var designer_data = config.settings.signup_widget_form.thankyou_screen_settings;
                            for( var i in designer_data){
                                var el = g.tools.designElement(designer_data[i], config, RH);
                                if (el.id == "thankyou-form"){
                                    var t_el = el;
                                    t_el.style.background = t_el.getAttribute("data-bg") == "color" ? t_el.getAttribute("data-bg-color") : "url('" + designer_data[i].image + "')";
                                    t_el.style.backgroundSize = t_el.getAttribute("data-bg-size");
                                    try {
                                    t_el.style.width = t_el.getAttribute("data-widget-width") || "550px";
                                    }
                                    catch(h){
                                    t_el.style.width = "550px";
                                    } 
                                }else{
                                    if(el.classList.contains('mtr-text-field')){
                                        try{
                                            var substituted_data = el.firstChild.innerHTML.replace(/%total_positions%/gi, config.settings.total_sub_positions).replace(/%advocate_first_name%/gi, RH.advocate_first_name || '<span class="mtr-hide">%advocate_first_name%</span>').replace(/%advocate_last_name%/gi, RH.advocate_last_name || '<span class="mtr-hide">%advocate_last_name%</span>').replace(/%extra_field%/gi, RH.optin_data.extra_field || '');
                                            el.firstChild.innerHTML = g.tools.substitute_phone_number(substituted_data);
                                        }
                                        catch(h){
                                        }
                                    }
                                    if(el.classList.contains('mtr-coupon-field')){
                                        if(ap_el){
                                            t_el.appendChild(ap_el);
                                        }
                                    }else{
                                        t_el.appendChild(el);
                                    }
                                }
                            }

                            t_el.querySelectorAll('.sub-grid-field').forEach((el)=>{
                                try{
                                    var gId = el.getAttribute('data-grid-id');
                                    el.style.maxWidth = "100%"
                                    t_el.querySelector('#'+gId).appendChild(el);
                                    console.log("here")
                                    console.log(t_el);
                                } 
                                catch(h){
                                    console.log(h)
                                }
                            });
                            t_el.querySelectorAll('.sub-box-field').forEach((el)=>{
                                try{
                                    var gId = el.getAttribute('data-box-id');
                                    t_el.querySelector('#'+gId).appendChild(el);
                                }
                                catch(h){
                                }
                            });
                            t_el.querySelectorAll('.sub-column-field').forEach((el)=>{
                                try{
                                    var gId = el.getAttribute('data-column-id');
                                    t_el.querySelector('#'+gId).appendChild(el);
                                }
                                catch(h){
                                    console.log(h)
                                }
                            });

                            t_el.style.maxWidth = "100%";

                            th.innerHTML = "";
                            th.style.maxWidth = "100%";
                            th.style.borderRadius = t_el.style.borderRadius;
                            th.appendChild(t_el);
                        }else{
                            th.innerHTML =`<div id="thankyou-widget" class="auto-style-259">
                                <div id="thankyou-form" class="mt-30 auto-style-68" data-bg="color" data-bg-size="auto" data-bg-color="#ffffff">
                                    <div class="mtr-text-field drag design-field-column first-el auto-style-260" id="text-div-0001">
                                        <p id="text-input-0001" class="auto-style-261">Thank you for signing up </p>
                                    </div>
                                </div>
                            </div>`;
                        }
                    return th;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.thankyou_screen 9695");
                    console.error("[ReferralHero] An unexpected error occurred in method generate thankyou_screen:", err);
                }
            }, leaderboard: function (el, config, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);

                    var main_div = document.createElement('div');
                    main_div.classList.add("mtr-overflow-auto", "mtr-border", "mtr-ring-opacity-5", "sm:mtr-rounded-lg", "mtr-lb-div")
            
                    var tableEl = document.createElement('table');
                    tableEl.id = "mtr-lb-table-"+id_num;
                    tableEl.classList.add("mtr-lb-table", "mtr-lb-table-"+id_num, "mtr-table-tag");
                    tableEl.style.cellPadding = '0';
                    tableEl.style.cellspacing = '0';
            
                    var tHeadEl = document.createElement('thead');
                    var tHeadRowEl = document.createElement('tr');
            
                    if(el.getAttribute('data-lb-show-avatar') == 'true'){
                        var tAvatarEl = document.createElement('th');
                        tAvatarEl.id = "mtr-lb-header-avatar-"+id_num;
                        tAvatarEl.classList.add("mtr-lb-avatar", "lb-header-"+id_num);
                        tAvatarEl.innerHTML = "";
                        //tHeadRowEl.appendChild(tAvatarEl);
                    }
            
                    var tPositionEl = document.createElement('th');
                    tPositionEl.id = "mtr-lb-header-position-"+id_num;
                    tPositionEl.classList.add("mtr-lb-position", "lb-header-"+id_num);
                    tPositionEl.innerHTML = el.getAttribute("data-lb-header-text-position");
                    tHeadRowEl.appendChild(tPositionEl);
            
                    var tSubscriberEl = document.createElement('th');
                    tSubscriberEl.id = "mtr-lb-header-subscriber-"+id_num;
                    tSubscriberEl.classList.add("mtr-lb-subscriber", "lb-header-"+id_num);
                    tSubscriberEl.innerHTML = el.getAttribute("data-lb-header-text-subscriber");
                    tHeadRowEl.appendChild(tSubscriberEl);
            
                    var tPointsEl = document.createElement('th');
                    tPointsEl.id = "mtr-lb-header-points-"+id_num;
                    tPointsEl.classList.add("mtr-lb-points", "lb-header-"+id_num);
                    tPointsEl.innerHTML = el.getAttribute("data-lb-header-text-points");
                    tHeadRowEl.appendChild(tPointsEl);
            
                    tHeadRowEl.childNodes.forEach((th)=>{
                    th.style.color = el.getAttribute("data-lb-header-color");
                    th.style.backgroundColor = el.getAttribute("data-lb-header-bg-color");
                    th.style.fontSize = el.getAttribute("data-lb-header-font-size")+'px';
                    th.style.fontFamily = g.tools.findFont(el.getAttribute("data-lb-header-font-family"));
                    th.style.fontWeight = el.getAttribute("data-lb-header-font-weight");
                    th.style.fontStyle = el.getAttribute("data-lb-header-font-style");
                    th.style.textDecoration = el.getAttribute("data-lb-header-text-decoration");
                    });
                    
                    tHeadEl.appendChild(tHeadRowEl);
                    var show21People = el.getAttribute('data-lb-show-21-people');
                    console.log('Value of data-lb-show-21-people:', show21People); 
                    
                    c = "", d = "",
                    f = !w && RH.optin_data ?(show21People === 'true' ? RH.optin_data.leaderboard.ranking_21 : RH.optin_data.leaderboard.ranking)  : g.generate.testLeaderboard(), // ranking
                    e = RH.optin_data ? RH.optin_data[config.settings.unique_identifier] : "john.smith@email.com"; // highlight_unique_identifier
                    var show_ui = (el.getAttribute('data-lb-show-ui') != undefined) ? el.getAttribute('data-lb-show-ui') : 'true';
                    var abc = el.getAttribute('data-lb-avatar-bg-color');
                    f.forEach(function (k, h) {
                        if(k.unique_identifier == e){
                            d =  " class='mtr-lb-highlight' id='mtr-lb-highlight-"+id_num+"'";
                        }else{d = "";}
                        var sub_name = k.name;
                        var path = k.memoji_path;



                        var class_image = "image-avatar-lb-"+id_num;
                        var class_memoji = "memoji-avatar-lb-"+id_num;

                        c += "<tr"+ d +"><td><span class='bg-round-position mtr-bg-c-purple-100 mtr-text-white' style='color:white;'>"+ g.tools.numberWithCommas(k.position) +"</span></td><td><div class='name-leaderboad-header' style='display:flex; align-items:center; justify-content:flex-start;'><span class='lb-avatar avatar-subscriber' style = 'background-color:"+abc+"; margin-right:10px; display:none;'><span style='display:none; border-radius:69px;' class="+class_image+">"+k.unique_identifier.substring(0, 2).toUpperCase()+"</span><img class="+class_memoji+" style='height:35px; width:35px; display:none;' src='"+path+"'></span><div style='text-align:left;'><div style='font-weight:bold;'>"+ sub_name +"</div><div class='lb-ui-data-field'>"+ k.unique_identifier +"</div></div></div></td><td><span class='bg-round-position mtr-bg-c-purple-300' style='color:#7057C7;'>"+ g.tools.numberWithCommas(config.settings.is_conversion_events_goal ? k.people_referred : k.points) +"</span></td></tr>";

                    });

                    var tBodyEl = document.createElement('tbody');
                    tBodyEl.id = "mtr-lb-body-"+id_num;
                    tBodyEl.classList.add("mtr-lb-body", "mtr-lb-body-"+id_num);
                    tBodyEl.innerHTML = c;

                    tBodyEl.style.fontSize = el.getAttribute("data-lb-table-font-size")+'px';
                    tBodyEl.style.fontFamily = g.tools.findFont(el.getAttribute("data-lb-table-font-family"));
                    tBodyEl.style.fontWeight = el.getAttribute("data-lb-table-font-weight");
                    tBodyEl.style.fontStyle = el.getAttribute("data-lb-table-font-style");
                    tBodyEl.style.textDecoration = el.getAttribute("data-lb-table-text-decoration");
                    tBodyEl.childNodes.forEach((tr)=>{
                        tr.style.backgroundColor = tr.classList.contains('mtr-lb-highlight') ? el.getAttribute("data-lb-table-highlight-row-bg-color") : el.getAttribute("data-lb-table-bg-color");
                        tr.style.color = tr.classList.contains('mtr-lb-highlight') ? el.getAttribute("data-lb-table-highlight-row-color") : el.getAttribute("data-lb-table-color");
                        tr.style.borderColor = "#f1f0f5";
                        tr.style.borderWidth = "2px";
                        tr.style.borderStyle = "solid";
                    });

                    tableEl.appendChild(tHeadEl);
                    tableEl.appendChild(tBodyEl);

                    var show_avatar = el.getAttribute('data-lb-show-avatar');
                    var show_memoji = el.getAttribute('data-lb-show-memoji');

                    if (show_avatar == 'true' || show_memoji == 'true'){
                    tableEl.querySelectorAll('tbody tr td .lb-avatar').forEach((td)=>{
                        td.style.display = 'block';
                    });
                    }
                    if (show_avatar == 'true'){
                    tableEl.querySelectorAll('tbody tr td .lb-avatar span').forEach((td)=>{
                        td.style.display = 'block';
                    });
                    }
                    if(show_memoji == 'true'){
                    tableEl.querySelectorAll('tbody tr td .lb-avatar').forEach((td)=>{
                        td.style.backgroundColor = 'transparent';
                    });
                    tableEl.querySelectorAll('tbody tr td .lb-avatar img').forEach((td)=>{
                        td.style.display = 'block';
                    });
                    }
                    if(show_ui == 'true'){
                    tableEl.querySelectorAll('tbody tr td .lb-ui-data-field').forEach((td)=>{
                        td.style.display = 'block';
                    });
                    }else{
                    tableEl.querySelectorAll('tbody tr td .lb-ui-data-field').forEach((td)=>{
                        td.style.display = 'none';
                    });
                    }

                    main_div.appendChild(tableEl);

                    return main_div;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate leaderboard 9831");
                    console.error("[ReferralHero] An unexpected error occurred in method generate leaderboard:", err);
                }
            }, ranking: function (config) {
                try{
                    var a = "<thead><tr><th class='mtr-lb-subscriber sweepstake'>" +
                        config.settings.sharing.leaderboard.subscriber + "</th><th class='mtr-lb-points'>" + config.settings.sharing.leaderboard.points + "</th></tr></thead>",
                        c = "", d = "", f = w ? g.generate.testLeaderboard() : RH.optin_data.leaderboard.ranking,
                        e = RH.optin_data ? RH.optin_data[config.settings.unique_identifier] : "john.smith@email.com";
                    f.forEach(function (k, h) {
                        d = k.unique_identifier == e ? " class='mtr-lb-highlight'" : "";
                        c += "<tr" + d + "><td>" + k.unique_identifier + "</td><td>" + g.tools.numberWithCommas(k.points) + "</td></tr>"
                    });
                    return "<table id='mtr-lb-table' cellpadding='0' cellspacing='0'>" +
                        a + "<tbody>" + c + "</tbody></table><div id='mtr-lb-footnote'>" + config.settings.sharing.leaderboard.footnote + "</div>";
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate ranking 9847");
                    console.error("[ReferralHero] An unexpected error occurred in method generate ranking:", err);
                }
            }, testLeaderboard: function () {
                try{
                    var phone_number = ["+198******47", "+176******58", "+189******34", "+173******34", "+145******43", "+143******54"];
                    var crypto_wallet_address = ["0xRETY**********RERE35", "0x0RET**********64A546", "0xREYT**********64RE5", "0x01C8**********64ER54", "0x01CE**********64RE45", "0xTRRE**********64RE5Y"];
                    var email = ["te**t1@*******.com", "te**t2@*******.com", "te**t3@*******.com", "te**t4@*******.com", "te**t5@*******.com", "te**t6@*******.com"];
                    var other_identifier_value = ["C**001", "C**002", "C**003", "C*004", "C**005", "C**006"];
                    var a = [{
                        avatar:"T1",memoji:"memoji_1.svg",
                        position: 32,
                        name: "",
                        unique_identifier: eval(config.settings.unique_identifier)[0],
                        points: 3,
                        people_referred: 21
                    }, {avatar:"T2", memoji:"memoji_2.svg", position: 33, name: "", unique_identifier: eval(config.settings.unique_identifier)[1], points: 4, people_referred: 18}, {
                        avatar:"T3", memoji:"memoji_3.svg",
                        position: 34,
                        name: "",
                        unique_identifier: eval(config.settings.unique_identifier)[2],
                        points: 4,
                        people_referred: 5
                    }];
                    a.push({
                        avatar:"JS", memoji:"memoji_4.svg",
                        position: 35,
                        name: RH.optin_data ? RH.optin_data.name : "John Smith",
                        unique_identifier: RH.optin_data ? RH.optin_data[config.settings.unique_identifier] : "john.smith@email.com",
                        points: 10,
                        people_referred: 1
                    });
                    a.push({ avatar:"T4", memoji:"memoji_5.svg", position: 36, name: "", unique_identifier: eval(config.settings.unique_identifier)[3], points: 4, people_referred: 2});
                    a.push({ avatar:"T5", memoji:"memoji_6.svg", position: 37, name: "", unique_identifier: eval(config.settings.unique_identifier)[4], points: 4, people_referred: 0});
                    a.push({ avatar:"T6", memoji:"memoji_7.svg", position: 38, name: "", unique_identifier: eval(config.settings.unique_identifier)[5], points: 5, people_referred: 0});
                    return a;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate testLeaderboard 9884");
                    console.error("[ReferralHero] An unexpected error occurred in method generate testLeaderboard:", err);
                }
            }, myReferrals: function(el, config, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);
                    var dt = mtg("div");
                    dt.classList.add("myreferrals-table");

                    var rewards_tab = el.getAttribute("data-my-rewards-table-display");
                    var referrals_tab = el.getAttribute("data-my-referrals-table-display");

                    var deSelectedBg = el.getAttribute("data-deselected-tab-bg-color")
                    var selectedBg = el.getAttribute("data-selected-tab-bg-color")
                    var selectedText = el.getAttribute("data-selected-tab-text-color")
                    var deSelectedText = el.getAttribute("data-deselected-tab-text-color")
                    var referralsText =  el.getAttribute("data-referrals-text")
                    var rewardsText = el.getAttribute("data-rewards-text") 
                    var tabsContainer = document.createElement("div");
                    tabsContainer.style.display = 'inline-flex';
                    tabsContainer.style.justifyContent = 'center';
                    tabsContainer.style.borderRadius = '10px';
                    tabsContainer.style.backgroundColor = deSelectedBg;
                    tabsContainer.id = "rewards-referrals-container-"+id_num;
                    tabsContainer.classList.add("rewards-referrals-container-"+id_num);
            
                    tabsContainer.style.fontSize = el.getAttribute("data-referrals-header-font-size")+'px';
                    tabsContainer.style.fontFamily = g.tools.findFont(el.getAttribute("data-referrals-header-font-family"));
                    tabsContainer.style.fontWeight = el.getAttribute("data-referrals-header-font-weight");
                    tabsContainer.style.fontStyle = el.getAttribute("data-referrals-header-font-style");
                    tabsContainer.style.textDecoration = el.getAttribute("data-referrals-header-text-decoration");
                    tabsContainer.style.height = 'fit-content';
                    tabsContainer.style.width = '100%';
                    tabsContainer.style.marginBottom = '5px';
                    tabsContainer.style.lineHeight = el.getAttribute("data-referrals-header-line-height")+'px';
                    if (!(rewards_tab == "true" && referrals_tab == "true")) {
                    tabsContainer.style.display = "none";
                    }
            
                    var myReferralsTab = document.createElement('div');
                    myReferralsTab.id = "my-referrals-tab-"+id_num;
                    myReferralsTab.classList.add('referrals-rewards-tab');
                    myReferralsTab.classList.add('referrals-rewards-tab-'+id_num);
                    myReferralsTab.style.padding = '10px 18px'; 
                    myReferralsTab.style.borderRadius = '8px';
                    myReferralsTab.textContent = referralsText;
                    myReferralsTab.style.height = 'fit-content';
                    myReferralsTab.style.width = '100%';
                    myReferralsTab.style.margin = '4px';
                    myReferralsTab.style.fontSize = el.getAttribute("data-referrals-header-font-size")+'px';
                    myReferralsTab.style.textAlign =  el.getAttribute("data-align");
                    myReferralsTab.style.whiteSpace = "nowrap"
                    myReferralsTab.style.cursor = "pointer"
            
                    myReferralsTab.style.color = (referrals_tab === "true" || (rewards_tab !== "true" && referrals_tab !== "true")) ? selectedText : deSelectedText;
                    myReferralsTab.style.backgroundColor = (referrals_tab === "true" || (rewards_tab !== "true" && referrals_tab !== "true")) ? selectedBg : deSelectedBg;
                    if((referrals_tab === "true" || (rewards_tab !== "true" && referrals_tab !== "true"))) {
                    myReferralsTab.classList.add("active");
                    }

                    var myRewardsTab = document.createElement('div');
                    myRewardsTab.id = "my-rewards-tab-"+id_num;
                    myRewardsTab.classList.add('referrals-rewards-tab');
                    myRewardsTab.classList.add('referrals-rewards-tab-'+id_num);
                    myRewardsTab.style.padding = '10px 18px';
                    myRewardsTab.style.borderRadius = '8px';
                    myRewardsTab.textContent = rewardsText;
                    myRewardsTab.style.height = 'fit-content';
                    myRewardsTab.style.width = '100%';
                    myRewardsTab.style.margin = '4px';
                    myRewardsTab.style.fontSize = el.getAttribute("data-referrals-header-font-size")+'px';
                    myRewardsTab.style.textAlign =  el.getAttribute("data-align");
                    myRewardsTab.style.whiteSpace = "nowrap"
                    myRewardsTab.style.cursor = "pointer"

                    myRewardsTab.style.color = referrals_tab !== "true" && rewards_tab === "true" ? selectedText : deSelectedText;
                    myRewardsTab.style.backgroundColor = referrals_tab !== "true" && rewards_tab === "true" ? selectedBg : deSelectedBg;
                    if(referrals_tab !== "true" && rewards_tab === "true") {
                    myRewardsTab.classList.add("active");
                    }

                    tabsContainer.appendChild(myReferralsTab);
                    tabsContainer.appendChild(myRewardsTab);
                    dt.appendChild(tabsContainer);

                    myReferralsTab.addEventListener('click', function() {
                        myRewardsTab.style.backgroundColor =  el.getAttribute("data-deselected-tab-bg-color");
                        myRewardsTab.style.color =  el.getAttribute("data-deselected-tab-text-color");
                        this.style.color = el.getAttribute("data-selected-tab-text-color");
                        this.style.backgroundColor = el.getAttribute("data-selected-tab-bg-color");

                        document.getElementById("mtr-mr-table-"+id_num).classList.remove("mtr-hide");
                        document.getElementById("mtr-mre-table-"+id_num).classList.add("mtr-hide");
                    });

                    myRewardsTab.addEventListener('click', function() {
                        myReferralsTab.style.backgroundColor =  el.getAttribute("data-deselected-tab-bg-color");
                        myReferralsTab.style.color =  el.getAttribute("data-deselected-tab-text-color");
                        this.style.color = el.getAttribute("data-selected-tab-text-color");
                        this.style.backgroundColor = el.getAttribute("data-selected-tab-bg-color");

                        document.getElementById("mtr-mre-table-"+id_num).classList.remove("mtr-hide");
                        document.getElementById("mtr-mr-table-"+id_num).classList.add("mtr-hide");
                    });


                    var tableEl = document.createElement('table');
                    tableEl.id = "mtr-mr-table-"+id_num;
                    tableEl.classList.add("mtr-mr-table", "mtr-table-tag");
                    tableEl.style.marginTop = 'auto';
            
                    var tHeadEl = document.createElement('thead');
                    var tHeadRowEl = document.createElement('tr');
            
                    tHeadEl.appendChild(tHeadRowEl);

                    var position_string = el.hasAttribute("data-referrals-header-sorted-position") ? el.getAttribute("data-referrals-header-sorted-position") : (el.setAttribute("data-referrals-header-sorted-position", "name unique signup status verified confirmed"), "name unique signup status verified confirmed");
                    const sortedPositions = position_string?.split(' ');
                
                    sortedPositions?.forEach((columnName) => {
                        if(columnName != "name"){
                            const columnHeaderRequired = el.getAttribute(`data-referrals-header-${columnName}-required`) || 'true';
                            if (columnHeaderRequired === 'true') {
                                const thEl = document.createElement('th');
                                thEl.id = `mtr-mr-header-${columnName}-${id_num}`;
                                thEl.classList.add(`mtr-mr-header-${columnName}`, `referrals-header-${id_num}`);
                                thEl.innerHTML = el.getAttribute(`data-referrals-header-text-${columnName}`);
                                thEl.style.color = el.getAttribute('data-referrals-header-color');
                                thEl.style.backgroundColor = el.getAttribute('data-referrals-header-bg-color');
                                thEl.style.fontSize = el.getAttribute('data-referrals-header-font-size') + 'px';
                                thEl.style.fontFamily = g.tools.findFont(el.getAttribute('data-referrals-header-font-family'));
                                thEl.style.fontWeight = el.getAttribute('data-referrals-header-font-weight');
                                thEl.style.fontStyle = el.getAttribute('data-referrals-header-font-style');
                                thEl.style.textDecoration = el.getAttribute('data-referrals-header-text-decoration');
                                thEl.style.textAlign = el.getAttribute('data-align')
                                thEl.style.lineHeight = el.getAttribute('data-referrals-header-line-height')+'px'
                                tHeadRowEl.appendChild(thEl);
                            }
                        }
                    });

                    var tBodyEl = document.createElement('tbody');
                    tBodyEl.id = "mtr-mr-body-"+id_num;
                    tBodyEl.classList.add("mtr-mr-body", "mtr-mr-body-"+id_num);
                    
                    //tBodyEl.style.color = el.getAttribute("data-referrals-table-color");
                    //tBodyEl.style.fontSize = el.getAttribute("data-referrals-table-font-size")+'px';
                    tBodyEl.style.fontFamily = g.tools.findFont(el.getAttribute("data-referrals-table-font-family"));
                    tBodyEl.style.fontWeight = el.getAttribute("data-referrals-table-font-weight");
                    tBodyEl.style.fontStyle = el.getAttribute("data-referrals-table-font-style");
                    tBodyEl.style.textDecoration = el.getAttribute("data-referrals-table-text-decoration");

                    var verifiedRequired = el.getAttribute(`data-referrals-header-verified-required`) || 'False';
                    if ((verifiedRequired == "false" && RH.optin_data.referrals.length == 0) || (verifiedRequired == "true" && RH.optin_data.totalReferrals.length == 0)){
                        const newRow = document.createElement("tr");
                        const newCell = document.createElement("td");
                        newCell.colSpan = "100";
                        newCell.textContent = el.getAttribute("data-referrals-no-referral-message") || config.settings.sharing.my_referrals.empty_referrals_message;
                        newCell.style.padding = "20px";
                        newRow.style.backgroundColor = el.getAttribute("data-referrals-table-bg-color");
                        newRow.style.color = el.getAttribute("data-referrals-table-color");
                        newRow.appendChild(newCell);
                        tBodyEl.appendChild(newRow);
                    }else{
                        tBodyEl.innerHTML = g.generate.referralData(1, el, config, RH, id_num);
                        tBodyEl.childNodes.forEach((tr)=>{
                            tr.style.backgroundColor = el.getAttribute("data-referrals-table-bg-color");
                        }); 
                    }
            
                    tableEl.appendChild(tHeadEl);
                    tableEl.appendChild(tBodyEl);

                    var table_container = mtg("div");
                    table_container.classList.add("table_container");
                    table_container.style.borderRadius = '10px';
                    table_container.style.overflowX = "auto";

                    table_container.appendChild(tableEl);

                    //dt.appendChild(tableEl);
                    
                    rTableEl =  g.generate.myRewards(el, RH);

                    table_container.appendChild(rTableEl);

                    dt.appendChild(table_container);

                    if((referrals_tab === "true" || (rewards_tab !== "true" && referrals_tab !== "true"))){
                        rTableEl.classList.add("mtr-hide");
                    } else{
                        tableEl.classList.add("mtr-hide");
                    }
                
                    return dt;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "g.generate.myReferrals 10080");
                    console.error("[ReferralHero] An unexpected error occurred in method generate myReferrals:", err);
                }
            }, referralData: function(page, el, config, RH, id_num) {
                try{
                    var c = "", d = "", pageSize = 10, verifiedRequired = el.getAttribute(`data-referrals-header-verified-required`) || 'False';
                    f = !w && RH.optin_data ? (verifiedRequired == "false" ? RH.optin_data.referrals : RH.optin_data.totalReferrals) : g.generate.testMyReferrals(config);
                    var startIndex = (page - 1) * pageSize;
                    var endIndex = startIndex + pageSize;
                    var paginatedData = f.slice(startIndex, endIndex);
                    paginatedData.forEach(function(k, h) {
                        var d = k.status == "Pending" ? 'mtr-referral-status-pending' : k.status == "Confirmed" ? 'mtr-referral-status-confirmed' : 'mtr-referral-status-unconfirmed';
                        var cl = k.status == "Pending" ? el.getAttribute("data-referrals-pending-bg-color") : k.status == "Confirmed" ? el.getAttribute("data-referrals-confirmed-bg-color") : el.getAttribute("data-referrals-unconfirmed-bg-color");
                        var tcl = k.status == "Pending" ? el.getAttribute("data-referrals-pending-text-color") : k.status == "Confirmed" ? el.getAttribute("data-referrals-confirmed-text-color") : el.getAttribute("data-referrals-unconfirmed-text-color");
                        var rowContent = "<tr>";
                        var id_in = g.tools.get_id_number(el.id);

                        const sortedPositions = el.getAttribute('data-referrals-header-sorted-position')?.split(' ');
                        sortedPositions?.forEach((columnName) => {
                            if(columnName != "name"){
                                const columnHeaderRequired = el.getAttribute(`data-referrals-header-${columnName}-required`) || 'true';
                                if (columnHeaderRequired === 'true') {
                                    var dataValue = "";
                        
                                    switch (columnName) {
                                    case "name":
                                        dataValue = k.name;
                                        break;
                                    case "unique":
                                        dataValue = k.email;
                                        break;
                                    case "signup":
                                        dataValue = k.created_at;
                                        break;
                                    case "verified":
                                        dataValue = `<div>${k.verified.toString().charAt(0).toUpperCase() + k.verified.toString().slice(1)}</div>`;
                                        break;
                                    case "status":
                                        if(k.verified == true){
                                            dataValue = `<div class="${d}" style="background-color: ${cl}; color: ${tcl}; height: 30px; width: 100px; padding: 7px; border-radius: 20px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;">${k.status_header}</div>`;
                                        }else{
                                            dataValue = ""
                                        }
                                        break;
                                    case "confirmed":
                                        dataValue = k.confirmed_at;
                                        break;
                                    }
                                    var text_align = el.getAttribute('data-align-table');
                                    var font_size = el.getAttribute('data-referrals-table-font-size')+'px';
                                    var line_height = el.getAttribute('data-referrals-table-line-height')+'px';
                                    var color_table = el.getAttribute('data-referrals-table-color');
                        
                                    if(dataValue == k.email){

                                        var memojiValue = k.memoji; 
                                        var path = k.profile_url;

                                        var class_memoji = "memoji-avatar-myreferrals-"+id_in;
                                        var display_type = "block";
                                        if(el.getAttribute("data-myreferrals-show-memoji")=="false"){
                                        display_type = "none";
                                        }
                                        var memoji_bg_color = el.getAttribute("data-myreferrals-avatar-bg-color");

                                        rowContent += `<td class="referrals-table-content-${id_in}" style="line-height:${line_height}; display:flex; align-items:center; justify-content: flex-end;"><span class="${class_memoji} memoji-avatar" style = 'border-radius:50%; padding:5px; display:${display_type}'><img style='height:35px; width:35px;' src="${path}"></span><div class="mtr-referrals-table-email-content" style='display:flex; flex-direction: column; align-items:start; text-align:${text_align}; font-size:${font_size};'><span class="referrals-table-content-${id_in}" style='width:100%; text-align:${text_align}; font-size:${font_size}; color:${color_table};'>${k.name}</span><span class="referrals-table-content-${id_in}" style='width:100%; text-align:${text_align}; font-size:${font_size}; color:${color_table};'>${dataValue}</span></div></td>`;
                                    }else{
                                        rowContent += `<td class="referrals-table-content-${id_in}" style="text-align:${text_align}; font-size:${font_size}; line-height:${line_height}; color:${color_table};">${dataValue}</td>`;
                                    }
                                }
                            }
                        });
                
                        rowContent += "</tr>";
                        c += rowContent;
                    });

                    var totalPages = Math.ceil(f.length / pageSize);
                    var currentPage = page; 
                    c += `<tr><td colspan="100%" class="auto-style-264"><div class="auto-style-265">`;
                    c += `<div class="mtr-pagination-button" data-page="prev" style="width: 75px; margin: 0 5px; padding: 5px 10px; font-family: inherit; font-size: 12px !important; cursor: ${currentPage === 1 ? 'not-allowed' : 'pointer'}; text-align: center; opacity: ${currentPage === 1 ? '0.5' : '1'}; background-color: ${currentPage === 1 ? '#f0f0f0' : '#f0f0f0'}; color: ${currentPage === 1 ? '#888888' : '#000000'}; border: 1px solid ${currentPage === 1 ? '#cccccc' : '#000000'}; border-radius: 2px;" tabindex="${currentPage === 1 ? '-1' : '0'}" role="button" ${currentPage === 1 ? 'disabled' : ''}>Previous</div>`;
                    c += `<div class="mtr-pagination-button" data-page="next" style="width: 75px; margin: 0 5px; padding: 5px 10px; font-family: inherit; font-size: 12px !important; cursor: ${currentPage === totalPages ? 'not-allowed' : 'pointer'}; text-align: center; opacity: ${currentPage === totalPages ? '0.5' : '1'}; background-color: ${currentPage === totalPages ? '#f0f0f0' : '#f0f0f0'}; color: ${currentPage === totalPages ? '#888888' : '#000000'}; border: 1px solid ${currentPage === totalPages ? '#cccccc' : '#000000'}; border-radius: 2px;" tabindex="${currentPage === totalPages ? '-1' : '0'}" role="button" ${currentPage === totalPages ? 'disabled' : ''}>Next</div>`;
                    c += `</div></td></tr>`;

                    let intervalId = setInterval(function(){
                        var tBodyEl = document.getElementById("mtr-mr-body-"+id_num);
                        if(tBodyEl != null){
                            document.addEventListener('click', function(e) {
                                if (e.target.classList.contains('mtr-pagination-button')) {
                                    const refComputedStyle = window.getComputedStyle(e.target);
                                    if (refComputedStyle.cursor === 'not-allowed') return;

                                    var page = e.target.getAttribute('data-page');
                                    
                                    if (page === 'prev' && currentPage > 1) {
                                        currentPage--;
                                    } else if (page === 'next' && currentPage < totalPages) {
                                        currentPage++;
                                    }
                                    document.querySelector('[data-page="prev"]').disabled = currentPage === 1;
                                    document.querySelector('[data-page="next"]').disabled = currentPage === totalPages;
                                    tBodyEl.innerHTML = g.generate.referralData(currentPage, el, config, RH, id_num);
                                    tBodyEl.childNodes.forEach((tr)=>{
                                        tr.style.backgroundColor = el.getAttribute("data-referrals-table-bg-color");
                                    }); 
                                }
                            });
                            clearInterval(intervalId);
                        }
                    }, 500);

                    setTimeout(() => {
                        clearInterval(intervalId);
                    }, 15000);

                    return c;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate referralsdata 10197");
                    console.error("[ReferralHero] An unexpected error occurred in method generate referralData:", err);
                }
            }, testMyReferrals: function(config) {
                try{
                    var ar = [
                    {"email":"lamar@hi.com", "name":"Lamar Duffy", "created_at":"June 13, 2022", "status":"Unconfirmed", "confirmed_at":"", "status_header": config.settings.sharing.my_referrals.unconfirmed_status_header },
                    {"email":"john@gmail.com", "name":"John Kem", "created_at":"June 12, 2022", "status":"Pending", "confirmed_at":"", "status_header": config.settings.sharing.my_referrals.pending_status_header },
                    {"email":"jess@gmail.com", "name":"Jess Colins", "created_at":"June 08, 2022", "status":"Confirmed", "confirmed_at":"June 10, 2022", "status_header": config.settings.sharing.my_referrals.confirmed_status_header }];
                    return ar;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate testMyReferrals 10208");
                    console.error("[ReferralHero] An unexpected error occurred in method generate testMyReferrals:", err);
                }
            }, prevReferrals: function(config, RH) {
                page = document.querySelector('.mtr-mr-page-active') ? document.querySelector('.mtr-mr-page-active').id.split('_')[1] : 0
                page = page == 0 ? 0 : page - 10
                g.generate.myReferrals(page, config, RH)
            }, nextReferrals: function(config, RH) {
                page = document.querySelector('.mtr-mr-page-active') ? document.querySelector('.mtr-mr-page-active').id.split('_')[1] : Math.floor(RH.optin_data.referrals.length/10) * 10
                    page = page == Math.floor(RH.optin_data.referrals.length/10) * 10 ? Math.floor(RH.optin_data.referrals.length/10) * 10 : parseInt(page) + 10
                    g.generate.myReferrals(page, config, RH)
            }, myRewards: function(el, RH) {
                try{
                    var id_num = g.tools.get_id_number(el.id);

                    var tableEl = document.createElement('table');
                    tableEl.id = "mtr-mre-table-"+id_num;
                    tableEl.classList.add("mtr-mr-table", "mtr-table-tag");
                    tableEl.style.marginTop = 'auto';
            
                    var tHeadEl = document.createElement('thead');
                    var tHeadRowEl = document.createElement('tr');
            
                    tHeadEl.appendChild(tHeadRowEl);

                    var position_string = el.hasAttribute("data-my-rewards-header-sorted-position") ? el.getAttribute("data-my-rewards-header-sorted-position") : (el.setAttribute("data-my-rewards-header-sorted-position", "name referrals emailsent status date value"), "name referrals emailsent status date value");

                    const sortedPositions = position_string?.split(' ');
                
                    sortedPositions?.forEach((columnName) => {
                        const columnHeaderRequired = el.getAttribute(`data-my-rewards-header-${columnName}-required`) || 'true';
                        if (columnHeaderRequired === 'true') {
                            const thEl = document.createElement('th');
                            thEl.id = `mtr-mre-header-${columnName}-${id_num}`;
                            thEl.classList.add(`mtr-mre-header-${columnName}`, `referrals-header-${id_num}`);
                            thEl.innerHTML = el.getAttribute(`data-my-rewards-header-text-${columnName}`);
                            thEl.style.color = el.getAttribute('data-referrals-header-color');
                            thEl.style.backgroundColor = el.getAttribute('data-referrals-header-bg-color');
                            thEl.style.fontSize = el.getAttribute('data-referrals-header-font-size') + 'px';
                            thEl.style.fontFamily = g.tools.findFont(el.getAttribute('data-referrals-header-font-family'));
                            thEl.style.fontWeight = el.getAttribute('data-referrals-header-font-weight');
                            thEl.style.fontStyle = el.getAttribute('data-referrals-header-font-style');
                            thEl.style.textDecoration = el.getAttribute('data-referrals-header-text-decoration');
                            thEl.style.textAlign = el.getAttribute('data-align')
                            thEl.style.lineHeight = el.getAttribute('data-referrals-header-line-height')+'px'
                            tHeadRowEl.appendChild(thEl);
                        }
                    });
            
                    var tBodyEl = document.createElement('tbody');
                    tBodyEl.id = "mtr-mre-body-"+id_num;
                    tBodyEl.classList.add("mtr-mre-body", "mtr-mre-body-"+id_num);

                    //tBodyEl.style.color = el.getAttribute("data-referrals-table-color");
                    //tBodyEl.style.fontSize = el.getAttribute("data-referrals-table-font-size")+'px';
                    tBodyEl.style.fontFamily = g.tools.findFont(el.getAttribute("data-referrals-table-font-family"));
                    tBodyEl.style.fontWeight = el.getAttribute("data-referrals-table-font-weight");
                    tBodyEl.style.fontStyle = el.getAttribute("data-referrals-table-font-style");
                    tBodyEl.style.textDecoration = el.getAttribute("data-referrals-table-text-decoration");

                    if (RH.optin_data.myRewards.length == 0){
                        const rnewRow = document.createElement("tr");
                        const rnewCell = document.createElement("td");
                        rnewCell.colSpan = "100";
                        rnewCell.textContent = el.getAttribute("data-my-rewards-no-reward-message") || "Your rewards will appear here!";
                        rnewCell.style.padding = "20px";
                        rnewRow.style.backgroundColor = el.getAttribute("data-referrals-table-bg-color");
                        rnewRow.style.color = el.getAttribute("data-referrals-table-color");
                        rnewRow.appendChild(rnewCell);
                        tBodyEl.appendChild(rnewRow);

                    } else{
                        tBodyEl.innerHTML = g.generate.myRewardsData(1, el, RH, id_num);
                        tBodyEl.childNodes.forEach((tr)=>{
                            tr.style.backgroundColor = el.getAttribute("data-referrals-table-bg-color");
                        });
                    }
                    
                    tableEl.appendChild(tHeadEl);
                    tableEl.appendChild(tBodyEl);
            
                    return tableEl;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate myRewards 10291");
                    console.error("[ReferralHero] An unexpected error occurred in method generate myRewards:", err);
                }
            }, myRewardsData: function(page, el, RH, id_num) {
                try{
                    var c = "", d = "", pageSize = 10,
                    f = !w && RH.optin_data ? RH.optin_data.myRewards : g.generate.testMyRewards();
                    var startIndex = (page - 1) * pageSize;
                    var endIndex = startIndex + pageSize;
                    var paginatedData = f.slice(startIndex, endIndex);
                    paginatedData.forEach(function(k, h) {
                        var es = 'mtre-my-rewards-status-label';
                        var ecl = el.getAttribute("data-my-rewards-status-bg-color");
                        var etl = el.getAttribute("data-reward-status-text-color");
                        var rowContent = "<tr>";

                        var id_in = g.tools.get_id_number(el.id);
                        var es_id = 'mtre-my-rewards-status-label-'+id_in;
                    
                        const sortedPositions = el.getAttribute('data-my-rewards-header-sorted-position')?.split(' ');
                        sortedPositions?.forEach((columnName) => {
                            const columnHeaderRequired = el.getAttribute(`data-my-rewards-header-${columnName}-required`) || 'true';
                            if (columnHeaderRequired === 'true') {
                            var dataValue = "";
                            switch (columnName) {
                                case "name":
                                dataValue = k.name;
                                break;
                                case "referrals":
                                dataValue = k.referrals;
                                break;
                                case "emailsent":
                                dataValue = `<div class="${es} ${es_id}" style="background-color: ${ecl}; color: ${etl}; height: 30px; width: 50px; padding: 7px; border-radius: 20px;">${k.email_sent}</div>`;
                                break;
                                case "status":
                                dataValue = `<div class="${es} ${es_id}" style="background-color: ${ecl}; color: ${etl}; height: 30px; width: 75px; padding: 7px; border-radius: 20px;">${k.status}</div>`;
                                break;
                                case "date":
                                dataValue = k.date_triggered;
                                break;
                                case "value":
                                dataValue = k.value ? parseFloat(k.value).toFixed(2) : "-";
                                break;
                            }
                            var text_align = el.getAttribute('data-align-table');
                            var font_size = el.getAttribute('data-referrals-table-font-size')+'px';
                            var line_height = el.getAttribute('data-referrals-table-line-height')+'px';
                            var color_table = el.getAttribute('data-referrals-table-color');
                        
                            rowContent += `<td class="referrals-table-content-${id_in}" style="text-align:${text_align}; font-size:${font_size};  line-height:${line_height}; color:${color_table};">${dataValue}</td>`;
                            }
                        });
                    
                        rowContent += "</tr>";
                        c += rowContent;
                    });

                    var totalPages = Math.ceil(f.length / pageSize);
                    var currentPage = page; 
                    c += `<tr><td colspan="100%" class="auto-style-264"><div class="auto-style-265">`;
                    c += `<div class="mtr-mre-pagination-button" data-page="prev" style="width: 75px; margin: 0 5px; padding: 5px 10px; font-family: inherit; font-size: 12px !important; cursor: ${currentPage === 1 ? 'not-allowed' : 'pointer'}; text-align: center; opacity: ${currentPage === 1 ? '0.5' : '1'}; background-color: ${currentPage === 1 ? '#f0f0f0' : '#f0f0f0'}; color: ${currentPage === 1 ? '#888888' : '#000000'}; border: 1px solid ${currentPage === 1 ? '#cccccc' : '#000000'}; border-radius: 2px;" tabindex="${currentPage === 1 ? '-1' : '0'}" role="button" ${currentPage === 1 ? 'disabled' : ''}>Previous</div>`;
                    c += `<div class="mtr-mre-pagination-button" data-page="next" style="width: 75px; margin: 0 5px; padding: 5px 10px; font-family: inherit; font-size: 12px !important; cursor: ${currentPage === totalPages ? 'not-allowed' : 'pointer'}; text-align: center; opacity: ${currentPage === totalPages ? '0.5' : '1'}; background-color: ${currentPage === totalPages ? '#f0f0f0' : '#f0f0f0'}; color: ${currentPage === totalPages ? '#888888' : '#000000'}; border: 1px solid ${currentPage === totalPages ? '#cccccc' : '#000000'}; border-radius: 2px;" tabindex="${currentPage === totalPages ? '-1' : '0'}" role="button" ${currentPage === totalPages ? 'disabled' : ''}>Next</div>`;
                    c += `</div></td></tr>`;

                    let intervalId = setInterval(function(){
                        var tBodyEl = document.getElementById("mtr-mre-body-"+id_num);
                        if(tBodyEl != null){
                            document.addEventListener('click', function(e) {
                                if (e.target.classList.contains('mtr-mre-pagination-button')) {
                                    const computedStyle = window.getComputedStyle(e.target);
                                    if (computedStyle.cursor === 'not-allowed') return;
                                    var page = e.target.getAttribute('data-page');
                                    
                                    if (page === 'prev' && currentPage > 1) {
                                        currentPage--;
                                    } else if (page === 'next' && currentPage < totalPages) {
                                        currentPage++;
                                    }
                                    document.querySelector('[data-page="prev"]').disabled = currentPage === 1;
                                    document.querySelector('[data-page="next"]').disabled = currentPage === totalPages;
                                    tBodyEl.innerHTML = g.generate.myRewardsData(currentPage, el, RH, id_num);
                                    tBodyEl.childNodes.forEach((tr)=>{
                                        tr.style.backgroundColor = el.getAttribute("data-referrals-table-bg-color");
                                    });
                                }
                            });
                            clearInterval(intervalId);
                        }
                    }, 500);

                    setTimeout(() => {
                        clearInterval(intervalId);
                    }, 15000);


                    return c;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate myRewardsData 10388");
                    console.error("[ReferralHero] An unexpected error occurred in method generate myRewardsData:", err);
                }
            }, testMyRewards: function() {
                try{
                    var em = [
                        {"name":"Lamar Duffy", "referrals": "5", "email_sent": "no", "status": "sent", "date_triggered":"June 13, 2022", "value": "10" },
                        {"name":"John Kem", "referrals": "2", "email_sent": "yes", "status": "resent", "date_triggered":"June 12, 2022",  "value": "0"  },
                        {"name":"Jess Colins", "referrals": "4", "email_sent": "yes", "status": "pending", "date_triggered":"June 08, 2022",  "value": "78" },
                        {"name":"Denny Colins", "referrals": "2", "email_sent": "no", "status": "canceled", "date_triggered":"June 09, 2022",  "value": "33" }];
                    return em;
                }catch (err) {
                    g.tools.sendErrorNotification(err, "generate testMyRewards 10400");
                    console.error("[ReferralHero] An unexpected error occurred in method generate testMyRewards:", err);
                }
            },
        };


        var campaign_uuids = ["MFaa41f84dfb","MF1079b3da0e","MF680bd8851f"];
        var campaign_settings = {"MFaa41f84dfb":{"env":"production","tool":"ambassador_program","review_referrals":false,"track_events":false,"enable_visit_url":false,"track_visit_url":null,"name":"Referral Partners 3.0 (New Site)","unique_identifier":"email","test_mode":false,"list_canceled":false,"default_url":"https://www.founderos.com/apply","use_referral_name":false,"enable_mobile_sdk":false,"total_sub_positions":703,"allow_subdomain_cookie":true,"cookie_window":90,"show_signup_widget":"show","allow_organic_traffic_tracking":false,"allow_global_subscribers_tracking":true,"admin_has_organic_traffic_tracking_campaign":true,"apply_mwr_enabled":false,"organic_traffic_tracking_campaign_uuid":"MF680bd8851f","is_conversion_events_goal":true,"is_conversion_events_and_social_actions_goal":false,"facebook_app_id":"403392874685523","kakao_app_key":"","enable_form_submission":true,"form_action":"pending","form_ids":[],"campaign_stopped":false,"enable_features":{"rewards":true,"verification":true,"coupons":false,"position_stats":false,"social_actions":false,"horizontal_banner":false,"quick_add_form":false,"signup_widget":true,"leaderboard":false,"my_referrals":true,"nps_widget":false},"social_actions_points":{"facebook":0,"twitter":0,"whatsapp":0,"line":0,"kakao_talk":0,"telegram":0,"sms":0,"linkedin":0,"facebook_messenger":0,"pinterest":0,"reddit":0,"email":0,"copy_link":0,"telegram_action":0,"discord_action":0},"floating_button":{"enable":false,"text":"Join our referral program","color":"#d9fc67","position":"right","text_color":"#131313","font_family":"inherit","text_size":"16","identified_label":"Share Your Referral Link"},"inline_button":{"text":"Join our referral program","color":"#3d85c6","text_color":"#FFFFFF","font_family":"inherit","text_size":"50","identified_label":null},"one_click_signup":{"enable":true,"name":"rh_name","email":"rh_email","extra_field":"rh_extra_field","extra_field_2":"rh_extra_field_2","extra_field_3":"rh_extra_field_3","extra_field_4":"rh_extra_field_4","option_field":"rh_option_field"},"quick_add_form":{"confirmation_link_background":"#009dd8","confirmation_link_label":"CONFIRM EMAIL","confirmation_link_color":"#ffffff","border":"#d9fc67","cover":null,"enable":false,"header":{"text":"Or Add a Friend","color":"#2b2f3e"},"subheader":{"text":"","color":"#666"},"name":{"require":true,"placeholder":"Name*","required":true},"email":{"require":true,"placeholder":"Email*","required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":false},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":false},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":true},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":true},"option_field":{"require":false,"placeholder":"Choose Option Below","options":["","","","","","","","","","","","","","","","","","","",""],"required":false},"phone_number":{"require":false,"placeholder":"Phone Number","country_code":"+1","required":false},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":false},"other_identifier":{"require":false,"placeholder":"Customer Id"},"submit_button":{"text":"Add Referral","submitting":"Submitting...","color":"#CDCCD9","label_color":"#171423","corner_roundness":"100px","width":"100%","font_size":"16px","alignment":"center","font_family":"inherit","height":"45px","underline":false,"bold":true,"italic":false,"login_font_size":"15px"},"status":{"text":"Log In","back":"Back"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":null},"input_field":{"color":"#5c5c5c","border_color":"#fff","background_color":"#f4f4f9","border_width":"0px","height":"48px","border_radius":"12px","font_family":"inherit","font_size":"14px","width":"100%","alignment":"center","distance":"16px","font_bold":false,"font_style":false,"font_decoration":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options","invitation_email":{"enable":null,"subject":"Your friend %referrer% thinks you'll love us! ✨Confirm and Get Rewarded","body":"\u003cp\u003eHi %name%,\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003eGuess what? Your friend %referrer% thinks you’d love [Your Program/Service] and sent a special invite your way. The best part? If you’re in, both of you get a reward!\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003e\u003cstrong\u003eReady to Unlock Your Reward? Let’s Make It Official:\u003c/strong\u003e\u003c/p\u003e\r\n\u003cp\u003e%confirmation_link%\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003e\u003cstrong\u003eQuick Perks:\u003c/strong\u003e\u003c/p\u003e\r\n\u003cul\u003e\r\n\u003cbr\u003e\u003cli\u003eGet [describe reward] just to check out our site.\u003c/li\u003e\r\n\u003cli\u003e%referrer_name% scores a bonus, too!\u003c/li\u003e\r\n\u003c/ul\u003e\r\n\u003cbr\u003e\u003cp\u003eTap to claim your rewards and see what you’ve been missing!\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003eAll the best,\u003cbr\u003e\u003cbr\u003e[Your Name]\u003cbr\u003e[Your Title]\u003cbr\u003e[Your Company]\u003cbr\u003e[Contact Info]\u003c/p\u003e"}},"design":{"enable":true,"custom_css":"","powered_by":false,"colors":{"primary":"#3d85c6"}},"recaptcha":{"enable":false,"public_key":"6Lf9hmorAAAAAHvkC4d5wEIxxzzh1S20y9VfHoJD"},"facebook_pixel":{"enable":null,"id":null},"lambda":{"email_endpoint":"https://wm6c1kxpcl.execute-api.us-west-1.amazonaws.com/prod/pm_confirmation_email","sms_endpoint":"https://wm6c1kxpcl.execute-api.us-west-1.amazonaws.com/prod/sms","email_from":"9PoxWmSe9+ZXMB7rSwfHFI4R5zvtBGoMZp1ZCm1GJIUugia99kDYJatQw/cifopR--sfEO8aNG2P2hR10wbvyhjw==","email_replyto":"kySKORFFFwCtXyf7f5tow8X7GHR1ZaiAqm7s/h2tR0k=--czBi8bc0bKbPxh/B2dd4aQ==","email_authorization":"Qd8WZD7+PpTZuxOQoz+sHbwz5FY2+9HbinTmewOkXM0PREmuk6ksEBNxnVD7qyfiTnQS5T+S+X5dz0Iw/m8aB9AyCIm1myzg58Icv1Q1Pfdq1mSjXZnSFpyov8Z2HlLoujcB2/MabhtXVCdmzAQwJg==--flOjfw/NUq5/9VBS6/rMUw==","sms_authorization":"CdwD6WbGaAAAinQYgnJUry7y4VDfyORT+Xh2M002zsypu3nOrs8knTcjUvy1MVGT--rM+j5vPiaGkTrsx2u8GiXA==","template_id":null,"pm_template_id":40127038,"sms_from":"85+6F2XPUUooin/DArHwWg==--bDBZf9wG/KE/jomS3do6Bw==","sms_body":"We are so excited to have you join our [Your Program Name] referral \u0026 rewards program! Please confirm your phone number by clicking here: %confirmation_link%"},"form":{"border":"#d9fc67","form_border":{"color":"#d9fc67","width":"0px","style":"solid solid solid solid ","radius":"10px","shadow":false},"cover":null,"background":{"enable_color":true,"color":"#161616","image":null,"image_size":"auto"},"header":{"text":"Refer your friends!","color":"#2b2f3e"},"name":{"require":true,"placeholder":"Name*","required":true},"phone_number":{"require":false,"placeholder":"Phone Number","required":false,"country_code":"+1"},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":false},"crypto_wallet_provider":{"placeholder":"Select Wallet Provider"},"providers":["phantom","trust_wallet","wallet_connect","metamask","coinbase"],"other_identifier":{"require":false,"placeholder":"Customer Id"},"email":{"require":true,"placeholder":"Email*","required":true},"address":{"require":false,"placeholder":null,"required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":false},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":false},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":false},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":false},"option_field":{"require":false,"placeholder":"Choose Option Below","options":[],"required":false},"tags_field":{"require":false,"placeholder":"Choose Option Below","options":["Other/None"],"required":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options tags","widget_width":"700px","widget_padding":"40px","submit_button":{"text":"Sign up","submitting":"Submitting...","color":"#d9fc67","label_color":"#000000","corner_roundness":"6px","width":"100%","font_size":"16px","alignment":"","font_family":"inherit","height":"45px","underline":false,"bold":false,"italic":false,"login_font_size":"15px","check_position":"Login","login_text_colour":"#d9fc67"},"status":{"text":"Log In","back":"Back"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":"","text2":"","url2":""},"terms_conditions_2":{"require":false,"text":""},"designer_settings":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Founder OS Referral Partners Dashboard\",\"children\":[],\"id\":\"text-input-186676\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 24px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; line-height: 26px;\"}],\"class\":\"text-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"id\":\"text-div-186676\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 10px 10px 0px 0px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"show-hide-class spacer-field drag flex items-center justify-center flex-col design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 15px;\",\"id\":\"spacer-div-16755\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"maitre-optin-form-fields\",\"class\":\"drag saved-field last-el\",\"draggable\":\"false\",\"style\":\"border-radius: 0px 0px 10px 10px;\"}","image":null,"image_type":null,"valid_image":null}},"input_field":{"color":"#161616","border_color":"#878787","background_color":"#ffffff","border_width":"1px","height":"48px","border_radius":"5px","font_family":"inherit","font_size":"16px","width":"100%","alignment":"center","distance":"16px"},"sharing_screen_designer":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"mtr-sharing-body\",\"class\":\"mt-30 saved-field\",\"data-widget-width\":\"700px\",\"data-bg\":\"color\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#131313\",\"style\":\"border-width: 1px; padding: 15px; border-style: solid; border-radius: 10px; border-color: rgb(255, 255, 255);\",\"data-widget-padding\":\"15px\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field verification-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"style\":\"height: auto; display: block; overflow: hidden; border-radius: 9px 9px 0px 0px;\",\"id\":\"verification-div-73035\",\"data-verification-text\":\"Do not forget to confirm your email\",\"data-verification-text-color\":\"#4d566c\",\"data-verification-bg-color\":\"#eaeaea\",\"data-verification-text-font-size\":\"14\",\"data-verification-height\":\"45\",\"data-verification-text-font-family\":\"quicksand\",\"data-verification-font-weight\":\"bold\",\"data-verification-font-style\":\"\",\"data-verification-text-decoration\":\"\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 10px;\",\"id\":\"spacer-div-1686067297515\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px;\",\"id\":\"spacer-div-1686067346769\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Welcome! Now, share to earn!\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-weight: bold; font-size: 33px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; line-height: 38px;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 30px;\",\"id\":\"spacer-div-1686304047296\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field social-box-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"min-height: 100px; height: auto; padding: 1%; background-color: rgb(241, 240, 245); width: 100%; margin: 0px auto; text-align: center; border-radius: 18px; border-style: solid; border-width: 0px; border-color: rgb(217, 252, 103);\",\"id\":\"social-box-div-277475\",\"data-border-left-style\":\"solid\",\"data-border-right-style\":\"solid\",\"data-border-bottom-style\":\"solid\",\"data-border-top-style\":\"solid\",\"data-border-style\":\"none\",\"data-focus-box-border-size-range\":\"0\",\"data-focus-box-border-radius-range\":\"18\",\"data-social-box-border-color\":\"#d9fc67\",\"data-social-box-height\":\"100\",\"data-social-box-width\":\"100\",\"data-social-box-padding\":\"1\",\"data-bg-color-value\":\"#f1f0f5\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 20px;\",\"id\":\"spacer-div-381440\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"8":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field rewards-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: auto;\",\"id\":\"rewards-div-140754\",\"data-rewards-ribbon-text\":\"UNLOCKED!\",\"data-rewards-ribbon-text-color\":\"#ffffff\",\"data-unlocked-rewards-ribbon-text-change\":\"REWARD UNLOCKED!\",\"data-locked-rewards-ribbon-text-change\":\"REWARD LOCKED!\",\"data-rewards-point-text-change\":\"5 OF 5 POINTS\",\"data-rewards-ribbon-color\":\"#87a5bf\",\"data-rewards-label-color\":\"#87a5bf\",\"data-rewards-image-toggle\":\"true\",\"data-rewards-font-family\":\"quicksand\",\"data-rewards-font-size\":\"14\",\"data-rewards-border-width\":\"0\",\"data-rewards-border-radius\":\"18\",\"data-rewards-border-color\":\"#cccccc\",\"data-rewards-orientation\":\"column\",\"data-rewards-order\":\" 18231 18241 18242\",\"data-rewards-toggle-12536\":\"true\",\"data-unlocked-reward-color\":\"#B1E2E8\",\"data-locked-reward-color\":\"#EABB99\",\"data-reward-icons-color\":\"#000000\",\"data-card-background-color-rewards\":\"#FFFFFF\",\"data-progress-bar-rewards-toggle\":\"true\",\"data-reward-points-font-family\":\"inherit\",\"data-rewards-font-weight\":\"bold\",\"data-rewards-label-font-stylek\":\"normal\",\"data-rewards-label-text-decorationk\":\"none\",\"data-reward-points-font-weight\":\"bold\",\"data-reward-points-label-font-stylek\":\"normal\",\"data-reward-points-label-text-decorationk\":\"none\",\"data-points-font-size\":\"12\",\"data-points-line-height\":\"15\",\"data-rewards-line-height\":\"15\",\"data-align-rewards\":\"left\",\"data-align-points\":\"flex-start\",\"data-rewards-width\":\"40\",\"data-rewards-name-color\":\"#000000\",\"data-border-left-style\":\"solid\",\"data-border-right-style\":\"solid\",\"data-border-bottom-style\":\"solid\",\"data-border-top-style\":\"solid\",\"data-border-style\":\"solid\",\"mobile-view\":\"false\",\"data-rewards-toggle-18231\":\"true\",\"data-rewards-toggle-18241\":\"true\",\"data-rewards-toggle-18242\":\"true\"}","image":null,"image_type":null,"valid_image":null},"9":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Your Referrals: %total_referrals%\",\"children\":[],\"id\":\"text-input-409325\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 25px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"share-screen-sub-field text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 0px;\",\"id\":\"text-div-409325\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"10":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field referrals-field drag design-field-column saved-field mtr-rewards-referrals last-el\",\"draggable\":\"false\",\"id\":\"referrals-div-402910\",\"data-referrals-header-text-name\":\"Name\",\"data-referrals-header-text-unique\":\"Email\",\"data-referrals-header-text-signup\":\"Signup Date\",\"data-referrals-header-text-status\":\"Status\",\"data-referrals-header-text-confirmed\":\"Confirmed date\",\"data-referrals-header-text-verified\":\"Verified\",\"data-referrals-header-color\":\"#5c5c5c\",\"data-referrals-header-bg-color\":\"#f1f0f5\",\"data-referrals-header-font-size\":\"14\",\"data-referrals-header-font-family\":\"inherit\",\"data-referrals-header-font-weight\":\"normal\",\"data-referrals-header-font-style\":\"\",\"data-referrals-header-text-decoration\":\"\",\"data-align\":\"center\",\"data-referrals-table-color\":\"#323c4b\",\"data-referrals-table-bg-color\":\"#ffffff\",\"data-referrals-table-font-size\":\"12\",\"data-referrals-table-font-family\":\"inherit\",\"data-referrals-table-font-weight\":\"normal\",\"data-referrals-table-font-style\":\"\",\"data-referrals-table-text-decoration\":\"\",\"data-referrals-no-referral-message\":\"Start sharing, your referrals will appear here!\",\"data-my-rewards-status-bg-color\":\"#DDF6E7\",\"data-my-referrals-table-display\":\"true\",\"data-my-rewards-table-display\":\"true\",\"style\":\"height: auto; overflow: auto; border-radius: 0px 0px 9px 9px;\",\"data-referrals-header-line-height\":\"15\",\"data-referrals-header-name-required\":\"true\",\"data-referrals-header-unique-required\":\"true\",\"data-referrals-header-signup-required\":\"true\",\"data-referrals-header-status-required\":\"true\",\"data-referrals-header-confirmed-required\":\"true\",\"data-referrals-header-verified-required\":\"false\",\"data-referrals-header-sorted-position\":\"name unique signup status verified confirmed\",\"data-selected-tab-bg-color\":\"#FFFFFF\",\"data-deselected-tab-bg-color\":\"#F1F0F5\",\"data-selected-tab-text-color\":\"#171423\",\"data-deselected-tab-text-color\":\"#5c5c5c\",\"data-referrals-text\":\"My Referrals\",\"data-rewards-text\":\"My Rewards\",\"data-align-table\":\"center\",\"data-referrals-table-line-height\":\"15\",\"data-myreferrals-show-memoji\":\"true\",\"data-myreferrals-avatar-bg-color\":\"#f46d6d\",\"data-referrals-unconfirmed-bg-color\":\"#c4c2c2\",\"data-referrals-pending-bg-color\":\"#f19b99\",\"data-referrals-confirmed-bg-color\":\"#DDF6E7\",\"data-reward-status-bg-color\":\"#DDF6E7\",\"data-reward-status-text-color\":\"#16793D\",\"data-referrals-unconfirmed-text-color\":\"#777\",\"data-referrals-pending-text-color\":\"#b70404\",\"data-referrals-confirmed-text-color\":\"#16793D\",\"data-my-rewards-header-text-name\":\"Name\",\"data-my-rewards-header-text-referrals\":\"Referrals\",\"data-my-rewards-header-text-emailsent\":\"Email Sent\",\"data-my-rewards-header-text-status\":\"Status\",\"data-my-rewards-header-text-date\":\"Unlocked Date\",\"data-my-rewards-header-text-value\":\"Amount\",\"data-my-rewards-header-name-required\":\"true\",\"data-my-rewards-header-unique-required\":\"true\",\"data-my-rewards-header-signup-required\":\"true\",\"data-my-rewards-header-status-required\":\"true\",\"data-my-rewards-header-confirmed-required\":\"true\",\"data-my-rewards-header-value-required\":\"true\",\"data-my-rewards-header-sorted-position\":\"name referrals emailsent status date value\",\"data-my-rewards-no-reward-message\":\"You have not created any rewards\"}","image":null,"image_type":null,"valid_image":null},"6000":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 10px;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"spacer-div-497179\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6001":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Here is your unique referral link 👇\",\"children\":[],\"id\":\"text-input-282266\",\"data-text-color-value\":\"#000000\",\"style\":\"margin: 0px; padding: 0px; font-weight: normal; font-size: 14px; color: rgb(0, 0, 0); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"share-screen-sub-field text-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 0px;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"text-div-282266\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6002":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field share-link-field drag design-field-column last-el sub-box-field saved-field\",\"draggable\":\"false\",\"style\":\"border-radius: 0px 0px 9px 9px;\",\"id\":\"share-link-div-79271\",\"data-share-link-width\":\"90\",\"data-share-link-text-color\":\"#222222\",\"data-share-link-bg-color\":\"#ffffff\",\"data-copy-button-text-change\":\"COPY\",\"data-copy-button-text-color\":\"#000000\",\"data-copy-button-bg-color\":\"#d9fc67\",\"data-copy-button-font-weight\":\"normal\",\"data-copy-button-font-style\":\"\",\"data-copy-button-text-decoration\":\"\",\"data-copy-button-font-family\":\"inherit\",\"data-copy-button-type\":\"text\",\"data-copy-button-share-message\":\"%referral_link%\",\"data-box-id\":\"social-box-div-277475\",\"data-share-link-uppercase-title\":\"HERE IS YOUR UNIQUE REFERRAL LINK\",\"data-share-link-uppercase-bubble\":\"Get %p% Points\",\"data-sharing_link_input_font_size\":\"14px\",\"data-sharing_link_height_box\":\"25\",\"data-sharing_link_line_height\":\"15\",\"data-share-link-input-border-width\":\"0\",\"data-share-link-input-border-radius\":\"12\",\"data-share-link-copy-border-width\":\"0\",\"data-share-link-copy-border-radius\":\"12\",\"data-sharing_link_title_font_size\":\"12px\",\"data-share-link-input-border-color\":\"#E1E1E1\",\"data-bg-color-points-share-link\":\"#403754\",\"data-bg-color-points-text-share-link\":\"#FFFFFF\",\"data-sharing_link_title_font_height\":\"20px\",\"data-border-style\":\"solid\",\"data-referral-link-tag-value\":\"https://www.founderos.com/apply?mwr=ABC123\",\"data-share-link-disable\":\"true\",\"data-share-link-second-field\":\"false\"}","image":null,"image_type":null,"valid_image":null},"6003":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field social-links-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: auto;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"social-link-div-359712\",\"data-social-links-icon-size\":\"35\",\"data-social-links-icon-roundness\":\"25\",\"data-social-links-icon-space\":\"5\",\"data-social-links-bg-color\":\"#131313\",\"data-social-links-icon-type\":\"default\",\"data-social-links-icon-order\":\"facebook twitter whatsapp facebook_messenger email\",\"data-social-link-padding\":\"0\",\"data-font-family-code\":\"inherit\",\"data-social-link-font-size\":\"12\",\"data-social-links-social-header-text\":\"GET %p% POINTS\",\"data-social_link_border_width\":\"0\",\"data-social-links-icon-color\":\"#d9fc67\",\"data-social-link-text-color\":\"#000000\",\"data-border-style\":\"solid\",\"data-social-link-font-weight\":\"normal\",\"data-social-link-font-style-decor\":\"normal\",\"data-social-link-text-decoration\":\"\",\"data-align\":\"center\"}","image":null,"image_type":null,"valid_image":null}},"selected_tags":[]},"signup_widget_form":{"border":"#d9fc67","form_border":{"color":"#d9fc67","width":"0px","style":"solid solid solid solid ","radius":"10px"},"cover":null,"background":{"enable_color":true,"color":"#161616","image":null,"image_size":"auto"},"header":{"text":"Refer your friends!","color":null},"name":{"require":true,"placeholder":"Name*","required":true},"phone_number":{"require":false,"placeholder":"Phone Number","required":false,"country_code":"+1"},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":false},"crypto_wallet_provider":{"placeholder":"Select Wallet Provider"},"providers":["phantom","trust_wallet","wallet_connect","metamask","coinbase"],"other_identifier":{"require":false,"placeholder":"Customer Id"},"email":{"require":true,"placeholder":"Email*","required":true},"address":{"require":false,"placeholder":null,"required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":false},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":false},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":false},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":false},"option_field":{"require":false,"placeholder":"Choose Option Below","options":[],"required":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options","widget_width":"700px","widget_padding":"40px","submit_button":{"text":"Sign up","submitting":"Submitting...","color":"#d9fc67","label_color":"#171423","corner_roundness":"5px","width":"100%","font_size":"16px","alignment":"center","font_family":"inherit","height":"45px","underline":false,"bold":false,"italic":false,"login_font_size":"15px"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":"","text2":"","url2":""},"terms_conditions_2":{"require":false,"text":""},"thanks_msg":"Thank you, here is your coupon code","redirection":{"enable":false,"url":""},"option_redirection":{"enable":false,"option_data":null},"confirmation_screen_popup":{"enable":false},"designer_signup_settings":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Join Now\",\"children\":[],\"id\":\"text-input-7050\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 24px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; line-height: 26px;\"}],\"class\":\"text-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"id\":\"text-div-7050\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 10px 10px 0px 0px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Become an Elite Referral Partner\",\"children\":[],\"id\":\"text-input-1685733290496\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 20px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-1685733290496\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 15px;\",\"id\":\"spacer-div-259552\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"maitre-signup-widget-form-fields\",\"class\":\"drag saved-field last-el\",\"style\":\"border-radius: 0px 0px 10px 10px;\",\"draggable\":\"false\"}","image":null,"image_type":null,"valid_image":null}},"thankyou_screen_settings":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"thankyou-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#131313\",\"data-widget-width\":\"560px\",\"style\":\"border-width: 1px; border-radius: 10px; border-color: rgb(255, 255, 255); border-style: solid;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field verification-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: auto; display: block; overflow: hidden; border-top-left-radius: 59px; border-top-right-radius: 59px;\",\"id\":\"verification-div-73035\",\"data-verification-text\":\"Do not forget to confirm your email\",\"data-verification-text-color\":\"#4d566c\",\"data-verification-bg-color\":\"#eaeaea\",\"data-verification-text-font-size\":\"14\",\"data-verification-height\":\"45\",\"data-verification-text-font-family\":\"quicksand\",\"data-verification-font-weight\":\"bold\",\"data-verification-font-style\":\"\",\"data-verification-text-decoration\":\"\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 10px; border-radius: 0px;\",\"id\":\"spacer-div-144912\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px; border-radius: 0px;\",\"id\":\"spacer-div-1685765868396\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-65193\",\"src\":\"https://s3.amazonaws.com/maitre-rh/thankyou_screen_settings/images/000/027/827/large/data?1747803912\",\"alt\":\"\",\"style\":\"width: 25%; height: auto; border-radius: 0px;\",\"draggable\":\"false\",\"data-imagename\":\"674fda7cc6bb27ee998edcf7_logo_founderos_white150-1-1.png\"}],\"class\":\"image-link\",\"id\":\"image-link-65193\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"image-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"width: 100%; height: auto; border-radius: 58px 58px 0px 0px;\",\"id\":\"image-div-65193\"}","image":"https://s3.amazonaws.com/maitre-rh/thankyou_screen_settings/images/000/027/827/large/data?1747803912","image_type":"image/png","valid_image":true},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"You're now a Referral Partner.\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 30px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; justify-content: center; display: flex;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px; border-radius: 0px;\",\"id\":\"spacer-div-1685765877995\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"P\",\"text\":\"Visit Dashboard\",\"children\":[],\"id\":\"button-text-134168\",\"class\":\"button-text\",\"data-text-color-value\":\"#000000\",\"style\":\"overflow-wrap: break-word; width: 100%; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; word-break: break-word; color: rgb(0, 0, 0); margin: 0px;\"}],\"id\":\"button-link-134168\",\"class\":\"button-link\",\"href\":\"/referral-partners-dashboard\",\"target\":\"_blank\",\"rel\":\"noopener noreferrer\",\"data-bg-color-value\":\"#d9fc67\",\"style\":\"font-family: inherit; text-decoration: none; width: 70%; max-width: 100%; min-height: 10px; height: 40px; max-height: none; border-radius: 5px; font-size: 16px; text-align: center; font-weight: 400; border: none; letter-spacing: 0.5px; background-color: rgb(217, 252, 103); min-width: fit-content; align-items: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"button-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"button-div-134168\",\"data-font-family-code\":\"inherit\",\"style\":\"height: auto; max-width: inherit; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"8":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px; border-radius: 0px;\",\"id\":\"spacer-div-1747805570761\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"9":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column last-el saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px; border-radius: 0px 0px 9px 9px;\",\"id\":\"spacer-div-1747805574177\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null}},"input_field":{"color":"#131313","border_color":"#878787","background_color":"#ffffff","border_width":"2px","height":"44px","border_radius":"5px","font_family":"inherit","font_size":"14px","width":"100%","alignment":"center","distance":"16px"},"verification":{"reminder_email":"Your email hasn't been verified yet.\u003cbr\u003eCheck your inbox - including the junk folder - and if you don't find it click the link below to resend it.","resend_email":"Resend confirmation email","resending_email":"Sending email...","email_resent":"Email has been sent. Check your inbox.","reminder_sms":"Your phone number hasn't been verified yet.\u003cbr\u003eCheck your phone and if you don't find it click the link below to resend the verification SMS.","resend_sms":"Resend verification SMS","resending_sms":"Sending sms...","sms_resent":"SMS has been sent. Check your phone."},"inline_button":{"text":"Join our referral program","color":"#3d85c6","text_color":"#FFFFFF","font_family":"inherit","text_size":"50","identified_label":null}},"horizontal_banner":{"signup":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"template-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-form-type\":\"signup\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"550px\",\"data-widget-height\":\"80px\",\"data-display-position\":\"bottom\",\"data-banner-widget-show\":\"none\",\"style\":\"border-width: 0px; display: flex; height: 70px; border-radius: 8px; width: 100%; position: relative; padding: 4px; border-style: none; min-height: 80px !important;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"I\",\"text\":\"close\",\"children\":[],\"style\":\"font-family: \\\"Material Icons\\\"; font-size: 25px; color: rgb(23, 20, 35);\",\"class\":\"material-icons\",\"id\":\"maitre-banner-close\"}],\"id\":\"banner-close\",\"style\":\"top: 12px; position: absolute; right: 15px; width: 9px; height: 9px; color: rgb(0, 0, 0); display: flex; cursor: pointer; align-items: center; justify-content: center; font-size: 18px; z-index: 10;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"%referrer_name% has invited you to experience Founder OS — please fill this out first to get started.\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 700; font-size: 14px; line-height: 30px; color: #171423; overflow-wrap: break-word; width: 90%;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px; background-color: rgba(253, 253, 253, 0);\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#fdfdfd00\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"form-input-field drag design-field-column mtr-form-fields mtr-form-fields-banner saved-field\",\"draggable\":\"false\",\"id\":\"form-div-14534\",\"data-form-font-family\":\"inherit\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f1f0f5\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"4\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"inherit\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#161616\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#d9fc67\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: inherit; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"horizontal-spacer-field drag design-field-column saved-field last-el\",\"draggable\":\"false\",\"id\":\"spacer-div-20631\",\"data-bg-color-value\":\"#00000000\",\"style\":\"width: 50px; height: -webkit-fill-available; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null}},"confirmation":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"template-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-form-type\":\"signup\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"550px\",\"data-widget-height\":\"80px\",\"data-display-position\":\"bottom\",\"data-banner-widget-show\":\"none\",\"style\":\"border-width: 0px; display: flex; height: 70px; border-radius: 8px; width: 100%; position: relative; padding: 4px; border-style: none; min-height: 80px !important;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Thank you! You've been referred by %referrer_name% to fully experience Founder OS. Apply now!\",\"children\":[],\"id\":\"text-input-7662\",\"data-text-color-value\":\"#161616\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 18px; line-height: 30px; color: rgb(22, 22, 22); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"text-field drag design-field-column saved-field last-el\",\"draggable\":\"false\",\"id\":\"text-div-7662\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#fdfdfd00\",\"style\":\"height: fit-content; padding: 0px; border-radius: 0px; background-color: rgba(253, 253, 253, 0);\"}","image":null,"image_type":null,"valid_image":null}},"show":false,"show_for":"referred","hb_form_present":true},"nps_widget":{"primary":{},"secondary":{},"show_banner":"30 days","display_nps_multiple":false,"request_interval":"24 hours","request_nps_multiple":true,"display_second_screen":true,"thanks_message":"Thank you for your feedback!","enabled":false},"verification_widget":{"verification_widget_form":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Enter Verification Code\",\"children\":[],\"id\":\"text-input-186676\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 22px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"id\":\"text-div-186676\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 10px 10px 0px 0px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"We sent you a 6 digit code\",\"children\":[],\"id\":\"text-input-186677\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 20px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-186677\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"drag mtr-nps-sms-fields design-field-column saved-field last-el\",\"draggable\":\"false\",\"id\":\"mtr-nps-sms-fields-14535\",\"data-form-heading\":\"We sent you a 6 digit code\",\"data-verify-text\":\"Verify Phone Number\",\"data-email-verify-text\":\"Verify email\",\"data-resend-text\":\"Resend Code\",\"data-form-font-family\":\"quicksand\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f4f4f9\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"8\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"open_sans\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#171423\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#cdccd9\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: Quicksand, sans-serif; border-radius: 0px 0px 10px 10px; height: auto; display: inline-flex;\"}","image":null,"image_type":null,"valid_image":null}},"signup_verification_widget_form":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Enter Verification Code\",\"children\":[],\"id\":\"text-input-18667623\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 22px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-18667623\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"We sent you a 6 digit code\",\"children\":[],\"id\":\"text-input-18667723\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 20px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-18667723\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"drag mtr-nps-sms-fields design-field-column saved-field last-el\",\"draggable\":\"false\",\"id\":\"mtr-nps-sms-fields-1453523\",\"data-form-heading\":\"We sent you a 6 digit code\",\"data-verify-text\":\"Verify Phone Number\",\"data-email-verify-text\":\"Verify email\",\"data-resend-text\":\"Resend Code\",\"data-form-font-family\":\"quicksand\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f4f4f9\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"8\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"open_sans\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#171423\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#cdccd9\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: Quicksand, sans-serif; border-radius: 0px 0px 10px 10px; height: auto; display: inline-flex;\"}","image":null,"image_type":null,"valid_image":null}}},"sharing":{"redirection":{"enable":false,"url":""},"option_redirection":{"enable":false,"option_data":null},"popup":false,"popup_on_everypage":false,"thanks_msg":"Thank you for signing up","open_if_signed_up":true,"header":{"text":"Congratulations, you are in!","color":"#2b2f3e"},"subheader":{"text":null,"color":"#666"},"people_referred":{"show":true,"text":"Your referrals"},"position":{"show":true,"text":"Your position","ordinal":true},"motivation_prompt":{"show":false,"text":null,"motivation_value":2},"instructions":"Invite your friends with your unique referral link 👇","referral_link":{"copy_button":"Copy","copied_button":"Copied"},"rotating_referral_link":"0","referral_link_field_present":true,"my_referrals":{"enable":false,"header":"My Referrals","empty_referrals_message":"Start sharing. Your referrals will appear here.","name_header":"Name","unique_identifier_header":"Email","signup_date_header":"Signup Date","status_header":"Status","confirmed_date_header":"Confirmed Date","pending_status_header":"Booked a Call","confirmed_status_header":"Enrolled in a Program","unconfirmed_status_header":"Unconfirmed"},"verification":{"enabled":true,"text_email":"Don't forget to confirm your email","reminder_email":"Your email hasn't been verified yet.\u003cbr\u003eCheck your inbox - including the junk folder - and if you don't find it click the link below to resend it.","resend_email":"Resend confirmation email","resending_email":"Sending email...","email_replace":"confirm your email","email_resent":"Email has been sent. Check your inbox.","sms_confirmation":false,"text_sms":"Don't forget to confirm your email","reminder_sms":"Your phone number hasn't been verified yet.\u003cbr\u003eCheck your phone and if you don't find it click the link below to resend the verification SMS.","resend_sms":"Resend verification SMS","resending_sms":"Sending sms...","sms_resent":"SMS has been sent. Check your phone.","crypto_wallet_confirmation":false,"kakao_talk_enabled":false,"qr_code_enabled":true},"socials":{"twitter":{"show":true,"message":"I just signed up on this awesome website! %referral_link%"},"facebook":{"show":true},"facebook_messenger":{"show":true},"email":{"show":true,"message":"%referral_link%","subject":"Check this out"},"whatsapp":{"show":true,"message":"You should really check this out %referral_link%"},"linkedin":{"show":true,"message":""},"reddit":{"show":true,"message":""},"telegram":{"show":true,"message":""},"line":{"show":true,"message":""},"sms":{"show":true,"message":"You should really check this out %referral_link%","qr_code_header":"Scan this QR code to share via SMS"},"pinterest":{"show":true,"message":"You should really check this out %referral_link%","image":""},"design":{"size":"48px","roundness":"5px","space":"5px","order":"facebook twitter whatsapp facebook_messenger email linkedin reddit telegram line sms pinterest"},"kakao_talk":{"show":true,"title":"","message":"You should really check this out %referral_link%","image":""}},"quick_add_form":{"show":false},"leaderboard":{"show":false,"position":"Position","subscriber":"Subscriber","points":"Points","footnote":"1 referral = 1 point"},"rewards":{"show":true,"header":"This is what you can win","show_images":true,"list":[{"id":18860,"title":"Referral Partner Payment","header":null,"description":"For every founder you refer:\r\nInstant $1k when they join any program\r\n+$1.8k after 90 days (Velocity)\r\nUp to +$4k after 90 days (Mastermind)","referrals":1,"image":"https://s3.amazonaws.com/maitre-rh/rewards/images/000/018/860/large/referral_partners_comm.jpg?1747803894","label":"A referral joins Founder OS","points":null,"category":"referrers","signup_type":"organic"}],"unlocked":"UNLOCKED!","unlocked_color":"#3d85c6","rewards_color":"#3d85c6","signup_bonus":"Sign-up bonus","test_names":["Referral Partner Payment"],"reward_data":[{"id":18860,"waiting_list_id":18583,"active":true,"title":"Referral Partner Payment","description":"For every founder you refer:\r\nInstant $1k when they join any program\r\n+$1.8k after 90 days (Velocity)\r\nUp to +$4k after 90 days (Mastermind)","position":null,"created_at":"2025-05-21T05:04:56.607Z","updated_at":"2025-08-26T13:41:13.923Z","image_file_name":"referral_partners_comm.jpg","image_content_type":"image/jpeg","image_file_size":637253,"image_updated_at":"2025-05-21T05:04:54.706Z","header":null,"referrals":1,"frequency":"always","notify_subscriber":true,"notify_user":true,"original_email_id":null,"category":"referrers","points":null,"referrals_type":"confirmed","signup_type":"organic","reward_label":"A referral joins Founder OS","set_subscriber_rank_to_last":true,"send_value":true,"value_type":"fixed","value":1000.0,"hold_days":null,"frequent":false,"max_count":null,"enable_immediate_delivery":true,"enable_manual_delivery":false,"enable_hold_delivery":false,"frequency_unit":"days","frequency_time_interval":null,"signup_type_status":"signs_up","enable_conversion_value":false,"conversion_value_rule":"greater_than","conversion_value":2000.0,"enable_stripe_product_purchase":false,"stripe_products":null,"enable_hold_stripe_delivery":false,"enable_group_reward":false,"group_trigger_type":null,"group_amount":null,"send_group_email":false,"enable_referrer_reward":false,"enable_referrer_reward_on_transaction":true,"enable_transaction_frequency":false,"transaction_referrals_type":"confirmed","transaction_frequency_time_interval":null,"transaction_frequency_unit":"transactions","product_ids":null,"enable_reward_on_product_purchase":false,"enable_max_amount":false,"max_amount":null,"enable_reward_tier":false,"tier_condition":"transaction_value","min_tier":0,"max_tier":0,"send_stripe_credit":false,"enable_tremendous_reward":false,"manually_apply_reward":false,"enable_reward_subscriber_tags":false,"reward_advocate_tag":"all","reward_referral_tag":"all","send_group_sms":false,"enable_sms_notifications":false,"min_conversion_value":0.0,"max_conversion_value":0.0,"enable_reset_time_frequency":false,"reset_time_frequency":"monthly","enable_date_range":false,"start_date":null,"end_date":null,"reward_subscriber_tag":"","tier_type":null,"min_ref_tier":null,"max_ref_tier":null}],"referrals_rewards_header":"Referrals"}},"alerts":{"subscriber_not_found":"No subscriber exists with the provided unique identifier.","subscriber_already_promoted":"You have already been promoted.","form_incomplete":"Please complete all required fields before continuing.","server_problem":"We're currently experiencing some technical difficulties with our server. Please report this issue to the administrator and try again later.","failed_recaptcha":"Failed ReCAPTCHA error","terms_conditions":"You must accept the Terms \u0026 Conditions","invalid_phone_number":null}},"MF1079b3da0e":{"env":"production","tool":"ambassador_program","review_referrals":false,"track_events":true,"enable_visit_url":false,"track_visit_url":null,"name":"Referral Partners 3.0","unique_identifier":"email","test_mode":false,"list_canceled":false,"default_url":"https://founderos.com/training","use_referral_name":false,"enable_mobile_sdk":false,"total_sub_positions":714,"allow_subdomain_cookie":true,"cookie_window":90,"show_signup_widget":"show","allow_organic_traffic_tracking":false,"allow_global_subscribers_tracking":true,"admin_has_organic_traffic_tracking_campaign":true,"apply_mwr_enabled":false,"organic_traffic_tracking_campaign_uuid":"MF680bd8851f","is_conversion_events_goal":true,"is_conversion_events_and_social_actions_goal":false,"facebook_app_id":"403392874685523","kakao_app_key":"","enable_form_submission":true,"form_action":"pending","form_ids":["{\"id\":\"wf-form-Get-the-Framework\"}","{\"id\":\"wf-form-Primary-Webflow-Application\"}"],"campaign_stopped":false,"enable_features":{"rewards":true,"verification":true,"coupons":false,"position_stats":false,"social_actions":false,"horizontal_banner":false,"quick_add_form":false,"signup_widget":true,"leaderboard":false,"my_referrals":true,"nps_widget":false},"social_actions_points":{"facebook":0,"twitter":0,"whatsapp":0,"line":0,"kakao_talk":0,"telegram":0,"sms":0,"linkedin":0,"facebook_messenger":0,"pinterest":0,"reddit":0,"email":0,"copy_link":0,"telegram_action":0,"discord_action":0},"floating_button":{"enable":false,"text":"Join our referral program","color":"#d9fc67","position":"right","text_color":"#131313","font_family":"inherit","text_size":"16","identified_label":null},"inline_button":{"text":"Join our referral program","color":"#3d85c6","text_color":"#FFFFFF","font_family":"inherit","text_size":"50","identified_label":null},"one_click_signup":{"enable":true,"name":"rh_name","email":"rh_email","extra_field":"rh_extra_field","extra_field_2":"rh_extra_field_2","extra_field_3":"rh_extra_field_3","extra_field_4":"rh_extra_field_4","option_field":"rh_option_field"},"quick_add_form":{"confirmation_link_background":"#009dd8","confirmation_link_label":"CONFIRM EMAIL","confirmation_link_color":"#ffffff","border":"#d9fc67","cover":null,"enable":false,"header":{"text":"Or Add a Friend","color":"#2b2f3e"},"subheader":{"text":"","color":"#666"},"name":{"require":true,"placeholder":"Name*","required":true},"email":{"require":true,"placeholder":"Email*","required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":false},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":false},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":true},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":true},"option_field":{"require":false,"placeholder":"Choose Option Below","options":["","","","","","","","","","","","","","","",""],"required":false},"phone_number":{"require":false,"placeholder":"Phone Number","country_code":"+1","required":false},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":false},"other_identifier":{"require":false,"placeholder":"Customer Id"},"submit_button":{"text":"Add Referral","submitting":"Submitting...","color":"#CDCCD9","label_color":"#171423","corner_roundness":"100px","width":"100%","font_size":"16px","alignment":"center","font_family":"inherit","height":"45px","underline":false,"bold":true,"italic":false,"login_font_size":"15px"},"status":{"text":"Log In","back":"Back"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":null},"input_field":{"color":"#5c5c5c","border_color":"#fff","background_color":"#f4f4f9","border_width":"0px","height":"48px","border_radius":"12px","font_family":"inherit","font_size":"14px","width":"100%","alignment":"center","distance":"16px","font_bold":false,"font_style":false,"font_decoration":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options","invitation_email":{"enable":null,"subject":"Your friend %referrer% thinks you'll love us! ✨Confirm and Get Rewarded","body":"\u003cp\u003eHi %name%,\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003eGuess what? Your friend %referrer% thinks you’d love [Your Program/Service] and sent a special invite your way. The best part? If you’re in, both of you get a reward!\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003e\u003cstrong\u003eReady to Unlock Your Reward? Let’s Make It Official:\u003c/strong\u003e\u003c/p\u003e\r\n\u003cp\u003e%confirmation_link%\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003e\u003cstrong\u003eQuick Perks:\u003c/strong\u003e\u003c/p\u003e\r\n\u003cul\u003e\r\n\u003cbr\u003e\u003cli\u003eGet [describe reward] just to check out our site.\u003c/li\u003e\r\n\u003cli\u003e%referrer_name% scores a bonus, too!\u003c/li\u003e\r\n\u003c/ul\u003e\r\n\u003cbr\u003e\u003cp\u003eTap to claim your rewards and see what you’ve been missing!\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003eAll the best,\u003cbr\u003e\u003cbr\u003e[Your Name]\u003cbr\u003e[Your Title]\u003cbr\u003e[Your Company]\u003cbr\u003e[Contact Info]\u003c/p\u003e"}},"design":{"enable":true,"custom_css":"","powered_by":false,"colors":{"primary":"#3d85c6"}},"recaptcha":{"enable":true,"public_key":"6LcD_LcqAAAAABV2gzdTpFZ5WRFcBjf7v_j_j8Xy"},"facebook_pixel":{"enable":null,"id":null},"lambda":{"email_endpoint":"https://wm6c1kxpcl.execute-api.us-west-1.amazonaws.com/prod/pm_confirmation_email","sms_endpoint":"https://wm6c1kxpcl.execute-api.us-west-1.amazonaws.com/prod/sms","email_from":"vxKgV8NEAi414P9CNfbfokdbQnKmKGinMH4Rqt9zOtbT1C1WiYXxvKHKbkEebbAb--schrK8W64TLXeJ9Z0NhNxQ==","email_replyto":"lokudyMggJXrUf9TOaBH6DZ3XMyNl/9HYpnAer2sTg0=--ldk/sV3pDjImaFOJBfmzEQ==","email_authorization":"666bgkQNC+wUkARefSMenmwPOZI8pk/vde+ULaR6ApL7qR5KHFVXLCUmB7r55xY034uPAPY0u/nfrhTFIY0uZaguY//EQFOuZKgfYu2p2OS1iVAtlHQFB9WMzz9zb8Q0ZZNpP9r0JnyHs3l1axWmFQ==--Qs2SOojM47z6DA1kDDtqDA==","sms_authorization":"C4Dd5wab5oD1mMHeiyloccI8KTdf+9SMbLBJijufnqLql2BfapGUS61YH9xv/SjV--m+F+MI9Fba/zojsZcbheUw==","template_id":null,"pm_template_id":38698493,"sms_from":"omBW6thCXEuC3zZRccgyig==--RaHFUdrXkm/+dowrS4Tcvw==","sms_body":"We are so excited to have you join our [Your Program Name] referral \u0026 rewards program! Please confirm your phone number by clicking here: %confirmation_link%"},"form":{"border":"#d9fc67","form_border":{"color":"#d9fc67","width":"0px","style":"solid solid solid solid ","radius":"20px","shadow":false},"cover":null,"background":{"enable_color":true,"color":"#131313","image":null,"image_size":"auto"},"header":{"text":"Refer your friends!","color":"#2b2f3e"},"name":{"require":true,"placeholder":"Name*","required":true},"phone_number":{"require":false,"placeholder":"Phone Number","required":false,"country_code":"+1"},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":false},"crypto_wallet_provider":{"placeholder":"Select Wallet Provider"},"providers":["phantom","trust_wallet","wallet_connect","metamask","coinbase"],"other_identifier":{"require":false,"placeholder":"Customer Id"},"email":{"require":true,"placeholder":"Email*","required":true},"address":{"require":false,"placeholder":null,"required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":false},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":false},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":false},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":false},"option_field":{"require":false,"placeholder":"Choose Option Below","options":[],"required":false},"tags_field":{"require":false,"placeholder":"Choose Option Below","options":["Other/None"],"required":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options tags","widget_width":"700px","widget_padding":"40px","submit_button":{"text":"Sign up","submitting":"Submitting...","color":"#d9fc67","label_color":"#000000","corner_roundness":"6px","width":"100%","font_size":"16px","alignment":"","font_family":"inherit","height":"45px","underline":false,"bold":false,"italic":false,"login_font_size":"15px","check_position":"Login","login_text_colour":"#d9fc67"},"status":{"text":"Log In","back":"Back"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":"","text2":null,"url2":null},"terms_conditions_2":{"require":false,"text":null},"designer_settings":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Founder OS Referral Partners Dashboard\",\"children\":[],\"id\":\"text-input-186676\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 24px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; line-height: 26px;\"}],\"class\":\"text-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"id\":\"text-div-186676\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 20px 20px 0px 0px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"show-hide-class spacer-field drag flex items-center justify-center flex-col design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 15px;\",\"id\":\"spacer-div-16755\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"maitre-optin-form-fields\",\"class\":\"drag saved-field last-el\",\"draggable\":\"false\",\"style\":\"border-radius: 0px 0px 20px 20px;\"}","image":null,"image_type":null,"valid_image":null}},"input_field":{"color":"#131313","border_color":"#878787","background_color":"#ffffff","border_width":"1px","height":"48px","border_radius":"5px","font_family":"inherit","font_size":"16px","width":"100%","alignment":"center","distance":"16px"},"sharing_screen_designer":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"mtr-sharing-body\",\"class\":\"mt-30 saved-field\",\"data-widget-width\":\"700px\",\"data-bg\":\"color\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#131313\",\"style\":\"border-width: 1px; padding: 15px; border-style: solid; border-radius: 20px; border-color: rgb(255, 255, 255);\",\"data-widget-padding\":\"15px\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field verification-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"style\":\"height: auto; display: block; overflow: hidden; border-top-left-radius: 19px; border-top-right-radius: 19px;\",\"id\":\"verification-div-73035\",\"data-verification-text\":\"Do not forget to confirm your email\",\"data-verification-text-color\":\"#4d566c\",\"data-verification-bg-color\":\"#eaeaea\",\"data-verification-text-font-size\":\"14\",\"data-verification-height\":\"45\",\"data-verification-text-font-family\":\"quicksand\",\"data-verification-font-weight\":\"bold\",\"data-verification-font-style\":\"\",\"data-verification-text-decoration\":\"\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 10px;\",\"id\":\"spacer-div-1686067297515\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px;\",\"id\":\"spacer-div-1686067346769\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Welcome! Now, share to earn!\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-weight: bold; font-size: 33px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; line-height: 38px;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 30px;\",\"id\":\"spacer-div-1686304047296\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field social-box-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"min-height: 100px; height: auto; padding: 1%; background-color: rgb(241, 240, 245); width: 100%; margin: 0px auto; text-align: center; border-radius: 18px; border-style: solid; border-width: 0px; border-color: rgb(217, 252, 103);\",\"id\":\"social-box-div-277475\",\"data-border-left-style\":\"solid\",\"data-border-right-style\":\"solid\",\"data-border-bottom-style\":\"solid\",\"data-border-top-style\":\"solid\",\"data-border-style\":\"none\",\"data-focus-box-border-size-range\":\"0\",\"data-focus-box-border-radius-range\":\"18\",\"data-social-box-border-color\":\"#d9fc67\",\"data-social-box-height\":\"100\",\"data-social-box-width\":\"100\",\"data-social-box-padding\":\"1\",\"data-bg-color-value\":\"#f1f0f5\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 20px;\",\"id\":\"spacer-div-381440\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"8":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field rewards-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: auto;\",\"id\":\"rewards-div-140754\",\"data-rewards-ribbon-text\":\"UNLOCKED!\",\"data-rewards-ribbon-text-color\":\"#ffffff\",\"data-unlocked-rewards-ribbon-text-change\":\"REWARD UNLOCKED!\",\"data-locked-rewards-ribbon-text-change\":\"REWARD LOCKED!\",\"data-rewards-point-text-change\":\"5 OF 5 POINTS\",\"data-rewards-ribbon-color\":\"#87a5bf\",\"data-rewards-label-color\":\"#87a5bf\",\"data-rewards-image-toggle\":\"true\",\"data-rewards-font-family\":\"quicksand\",\"data-rewards-font-size\":\"14\",\"data-rewards-border-width\":\"0\",\"data-rewards-border-radius\":\"18\",\"data-rewards-border-color\":\"#cccccc\",\"data-rewards-orientation\":\"column\",\"data-rewards-order\":\" 18231 18241 18242\",\"data-rewards-toggle-12536\":\"true\",\"data-unlocked-reward-color\":\"#B1E2E8\",\"data-locked-reward-color\":\"#EABB99\",\"data-reward-icons-color\":\"#000000\",\"data-card-background-color-rewards\":\"#FFFFFF\",\"data-progress-bar-rewards-toggle\":\"true\",\"data-reward-points-font-family\":\"inherit\",\"data-rewards-font-weight\":\"bold\",\"data-rewards-label-font-stylek\":\"normal\",\"data-rewards-label-text-decorationk\":\"none\",\"data-reward-points-font-weight\":\"bold\",\"data-reward-points-label-font-stylek\":\"normal\",\"data-reward-points-label-text-decorationk\":\"none\",\"data-points-font-size\":\"12\",\"data-points-line-height\":\"15\",\"data-rewards-line-height\":\"15\",\"data-align-rewards\":\"left\",\"data-align-points\":\"flex-start\",\"data-rewards-width\":\"40\",\"data-rewards-name-color\":\"#000000\",\"data-border-left-style\":\"solid\",\"data-border-right-style\":\"solid\",\"data-border-bottom-style\":\"solid\",\"data-border-top-style\":\"solid\",\"data-border-style\":\"solid\",\"mobile-view\":\"false\",\"data-rewards-toggle-18231\":\"true\",\"data-rewards-toggle-18241\":\"true\",\"data-rewards-toggle-18242\":\"true\"}","image":null,"image_type":null,"valid_image":null},"9":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Your Referrals: %total_referrals%\",\"children\":[],\"id\":\"text-input-409325\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 25px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"share-screen-sub-field text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 0px;\",\"id\":\"text-div-409325\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"10":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field referrals-field drag design-field-column saved-field mtr-rewards-referrals last-el\",\"draggable\":\"false\",\"id\":\"referrals-div-402910\",\"data-referrals-header-text-name\":\"Name\",\"data-referrals-header-text-unique\":\"Email\",\"data-referrals-header-text-signup\":\"Signup Date\",\"data-referrals-header-text-status\":\"Status\",\"data-referrals-header-text-confirmed\":\"Confirmed date\",\"data-referrals-header-text-verified\":\"Verified\",\"data-referrals-header-color\":\"#5c5c5c\",\"data-referrals-header-bg-color\":\"#f1f0f5\",\"data-referrals-header-font-size\":\"14\",\"data-referrals-header-font-family\":\"inherit\",\"data-referrals-header-font-weight\":\"normal\",\"data-referrals-header-font-style\":\"\",\"data-referrals-header-text-decoration\":\"\",\"data-align\":\"center\",\"data-referrals-table-color\":\"#323c4b\",\"data-referrals-table-bg-color\":\"#ffffff\",\"data-referrals-table-font-size\":\"12\",\"data-referrals-table-font-family\":\"inherit\",\"data-referrals-table-font-weight\":\"normal\",\"data-referrals-table-font-style\":\"\",\"data-referrals-table-text-decoration\":\"\",\"data-referrals-no-referral-message\":\"Start sharing, your referrals will appear here!\",\"data-my-rewards-status-bg-color\":\"#DDF6E7\",\"data-my-referrals-table-display\":\"true\",\"data-my-rewards-table-display\":\"true\",\"style\":\"height: auto; overflow: auto; border-radius: 0px 0px 19px 19px;\",\"data-referrals-header-line-height\":\"15\",\"data-referrals-header-name-required\":\"true\",\"data-referrals-header-unique-required\":\"true\",\"data-referrals-header-signup-required\":\"true\",\"data-referrals-header-status-required\":\"true\",\"data-referrals-header-confirmed-required\":\"true\",\"data-referrals-header-verified-required\":\"false\",\"data-referrals-header-sorted-position\":\"name unique signup status verified confirmed\",\"data-selected-tab-bg-color\":\"#FFFFFF\",\"data-deselected-tab-bg-color\":\"#F1F0F5\",\"data-selected-tab-text-color\":\"#171423\",\"data-deselected-tab-text-color\":\"#5c5c5c\",\"data-referrals-text\":\"My Referrals\",\"data-rewards-text\":\"My Rewards\",\"data-align-table\":\"center\",\"data-referrals-table-line-height\":\"15\",\"data-myreferrals-show-memoji\":\"true\",\"data-myreferrals-avatar-bg-color\":\"#f46d6d\",\"data-referrals-unconfirmed-bg-color\":\"#c4c2c2\",\"data-referrals-pending-bg-color\":\"#f19b99\",\"data-referrals-confirmed-bg-color\":\"#DDF6E7\",\"data-reward-status-bg-color\":\"#DDF6E7\",\"data-reward-status-text-color\":\"#16793D\",\"data-referrals-unconfirmed-text-color\":\"#777\",\"data-referrals-pending-text-color\":\"#b70404\",\"data-referrals-confirmed-text-color\":\"#16793D\",\"data-my-rewards-header-text-name\":\"Name\",\"data-my-rewards-header-text-referrals\":\"Referrals\",\"data-my-rewards-header-text-emailsent\":\"Email Sent\",\"data-my-rewards-header-text-status\":\"Status\",\"data-my-rewards-header-text-date\":\"Unlocked Date\",\"data-my-rewards-header-text-value\":\"Amount\",\"data-my-rewards-header-name-required\":\"true\",\"data-my-rewards-header-unique-required\":\"true\",\"data-my-rewards-header-signup-required\":\"true\",\"data-my-rewards-header-status-required\":\"true\",\"data-my-rewards-header-confirmed-required\":\"true\",\"data-my-rewards-header-value-required\":\"true\",\"data-my-rewards-header-sorted-position\":\"name referrals emailsent status date value\",\"data-my-rewards-no-reward-message\":\"You have not created any rewards\"}","image":null,"image_type":null,"valid_image":null},"6000":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 10px;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"spacer-div-497179\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6001":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Here is your unique referral link 👇\",\"children\":[],\"id\":\"text-input-282266\",\"data-text-color-value\":\"#000000\",\"style\":\"margin: 0px; padding: 0px; font-weight: normal; font-size: 14px; color: rgb(0, 0, 0); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"share-screen-sub-field text-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 0px;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"text-div-282266\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6002":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field share-link-field drag design-field-column last-el sub-box-field saved-field\",\"draggable\":\"false\",\"style\":\"border-radius: 0px 0px 19px 19px;\",\"id\":\"share-link-div-79271\",\"data-share-link-width\":\"90\",\"data-share-link-text-color\":\"#222222\",\"data-share-link-bg-color\":\"#ffffff\",\"data-copy-button-text-change\":\"COPY\",\"data-copy-button-text-color\":\"#000000\",\"data-copy-button-bg-color\":\"#d9fc67\",\"data-copy-button-font-weight\":\"normal\",\"data-copy-button-font-style\":\"\",\"data-copy-button-text-decoration\":\"\",\"data-copy-button-font-family\":\"inherit\",\"data-copy-button-type\":\"text\",\"data-copy-button-share-message\":\"%referral_link%\",\"data-box-id\":\"social-box-div-277475\",\"data-share-link-uppercase-title\":\"HERE IS YOUR UNIQUE REFERRAL LINK\",\"data-share-link-uppercase-bubble\":\"Get %p% Points\",\"data-sharing_link_input_font_size\":\"14px\",\"data-sharing_link_height_box\":\"25\",\"data-sharing_link_line_height\":\"15\",\"data-share-link-input-border-width\":\"0\",\"data-share-link-input-border-radius\":\"12\",\"data-share-link-copy-border-width\":\"0\",\"data-share-link-copy-border-radius\":\"12\",\"data-sharing_link_title_font_size\":\"12px\",\"data-share-link-input-border-color\":\"#E1E1E1\",\"data-bg-color-points-share-link\":\"#403754\",\"data-bg-color-points-text-share-link\":\"#FFFFFF\",\"data-sharing_link_title_font_height\":\"20px\",\"data-border-style\":\"solid\"}","image":null,"image_type":null,"valid_image":null},"6003":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field social-links-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: auto;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"social-link-div-359712\",\"data-social-links-icon-size\":\"35\",\"data-social-links-icon-roundness\":\"25\",\"data-social-links-icon-space\":\"5\",\"data-social-links-bg-color\":\"#131313\",\"data-social-links-icon-type\":\"default\",\"data-social-links-icon-order\":\"facebook twitter whatsapp facebook_messenger email\",\"data-social-link-padding\":\"0\",\"data-font-family-code\":\"inherit\",\"data-social-link-font-size\":\"12\",\"data-social-links-social-header-text\":\"GET %p% POINTS\",\"data-social_link_border_width\":\"0\",\"data-social-links-icon-color\":\"#d9fc67\",\"data-social-link-text-color\":\"#000000\",\"data-border-style\":\"solid\",\"data-social-link-font-weight\":\"normal\",\"data-social-link-font-style-decor\":\"normal\",\"data-social-link-text-decoration\":\"\",\"data-align\":\"center\"}","image":null,"image_type":null,"valid_image":null}},"selected_tags":[]},"signup_widget_form":{"border":"#d9fc67","form_border":{"color":"#d9fc67","width":"0px","style":"solid solid solid solid ","radius":"20px"},"cover":null,"background":{"enable_color":true,"color":"#131313","image":null,"image_size":"auto"},"header":{"text":"Refer your friends!","color":null},"name":{"require":true,"placeholder":"Name*","required":true},"phone_number":{"require":false,"placeholder":"Phone Number","required":false,"country_code":"+1"},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":false},"crypto_wallet_provider":{"placeholder":"Select Wallet Provider"},"providers":["phantom","trust_wallet","wallet_connect","metamask","coinbase"],"other_identifier":{"require":false,"placeholder":"Customer Id"},"email":{"require":true,"placeholder":"Email*","required":true},"address":{"require":false,"placeholder":null,"required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":false},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":false},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":false},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":false},"option_field":{"require":false,"placeholder":"Choose Option Below","options":[],"required":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options","widget_width":"700px","widget_padding":"40px","submit_button":{"text":"Sign up","submitting":"Submitting...","color":"#d9fc67","label_color":"#171423","corner_roundness":"5px","width":"100%","font_size":"16px","alignment":"center","font_family":"inherit","height":"45px","underline":false,"bold":false,"italic":false,"login_font_size":"15px"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":"","text2":null,"url2":null},"terms_conditions_2":{"require":false,"text":null},"thanks_msg":"Thank you, here is your coupon code","redirection":{"enable":false,"url":""},"option_redirection":{"enable":false,"option_data":null},"confirmation_screen_popup":{"enable":false},"designer_signup_settings":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Join Now\",\"children\":[],\"id\":\"text-input-7050\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 24px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; line-height: 26px;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-7050\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Become an Elite Referral Partner\",\"children\":[],\"id\":\"text-input-1685733290496\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 20px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-1685733290496\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 15px;\",\"id\":\"spacer-div-259552\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"maitre-signup-widget-form-fields\",\"class\":\"drag saved-field last-el\",\"style\":\"border-radius: 0px 0px 20px 20px;\",\"draggable\":\"false\"}","image":null,"image_type":null,"valid_image":null}},"thankyou_screen_settings":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"thankyou-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#131313\",\"data-widget-width\":\"560px\",\"style\":\"border-width: 1px; border-radius: 20px; border-color: rgb(255, 255, 255); border-style: solid;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field verification-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: auto; display: block; overflow: hidden; border-top-left-radius: 59px; border-top-right-radius: 59px;\",\"id\":\"verification-div-73035\",\"data-verification-text\":\"Do not forget to confirm your email\",\"data-verification-text-color\":\"#4d566c\",\"data-verification-bg-color\":\"#eaeaea\",\"data-verification-text-font-size\":\"14\",\"data-verification-height\":\"45\",\"data-verification-text-font-family\":\"quicksand\",\"data-verification-font-weight\":\"bold\",\"data-verification-font-style\":\"\",\"data-verification-text-decoration\":\"\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 10px; border-radius: 0px;\",\"id\":\"spacer-div-144912\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-65193\",\"src\":\"https://s3.amazonaws.com/maitre-rh/thankyou_screen_settings/images/000/022/621/large/data?1736908574\",\"alt\":\"\",\"style\":\"width: 35%; height: auto; border-radius: 0px;\",\"draggable\":\"false\",\"data-imagename\":\"674fda7cc6bb27ee998edcf7_logo_founderos_white150-1-1.png\"}],\"class\":\"image-link\",\"id\":\"image-link-65193\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"image-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"width: 100%; height: auto; border-radius: 58px 58px 0px 0px;\",\"id\":\"image-div-65193\"}","image":"https://s3.amazonaws.com/maitre-rh/thankyou_screen_settings/images/000/022/621/large/data?1736908574","image_type":"image/png","valid_image":true},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"You're now a Referral Partner.\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 30px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; justify-content: center; display: flex;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px; border-radius: 0px;\",\"id\":\"spacer-div-1685765877995\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"P\",\"text\":\"Visit Dashboard\",\"children\":[],\"id\":\"button-text-134168\",\"class\":\"button-text\",\"data-text-color-value\":\"#000000\",\"style\":\"overflow-wrap: break-word; width: 100%; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; word-break: break-word; color: rgb(0, 0, 0); margin: 0px;\"}],\"id\":\"button-link-134168\",\"class\":\"button-link\",\"href\":\"/referral-partners-dashboard\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"data-bg-color-value\":\"#d9fc67\",\"style\":\"font-family: inherit; text-decoration: none; width: 70%; max-width: 100%; min-height: 10px; height: 40px; max-height: none; border-radius: 5px; font-size: 15px; text-align: center; font-weight: 400; border: none; letter-spacing: 0.5px; background-color: rgb(217, 252, 103); min-width: fit-content; align-items: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"button-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"button-div-134168\",\"data-font-family-code\":\"inherit\",\"style\":\"height: auto; max-width: inherit; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field last-el\",\"draggable\":\"false\",\"style\":\"height: 25px; border-radius: 0px 0px 19px 19px;\",\"id\":\"spacer-div-1685765868396\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null}},"input_field":{"color":"#131313","border_color":"#878787","background_color":"#ffffff","border_width":"2px","height":"44px","border_radius":"5px","font_family":"inherit","font_size":"14px","width":"100%","alignment":"center","distance":"16px"},"verification":{"reminder_email":"Your email hasn't been verified yet.\u003cbr\u003eCheck your inbox - including the junk folder - and if you don't find it click the link below to resend it.","resend_email":"Resend confirmation email","resending_email":"Sending email...","email_resent":"Email has been sent. Check your inbox.","reminder_sms":"Your phone number hasn't been verified yet.\u003cbr\u003eCheck your phone and if you don't find it click the link below to resend the verification SMS.","resend_sms":"Resend verification SMS","resending_sms":"Sending sms...","sms_resent":"SMS has been sent. Check your phone."},"inline_button":{"text":"Join our referral program","color":"#3d85c6","text_color":"#FFFFFF","font_family":"inherit","text_size":"50","identified_label":null}},"horizontal_banner":{"signup":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"template-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-form-type\":\"signup\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"550px\",\"data-widget-height\":\"70px\",\"data-display-position\":\"top\",\"data-banner-widget-show\":\"none\",\"style\":\"border-width: 4px; display: flex; height: 70px; border-style: none; border-radius: 20px;width: 100%; position: relative;padding: 4px;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"%referrer_name% has invited you! Claim your free gift:\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 700; font-size: 14px; line-height: 30px; color: #171423; overflow-wrap: break-word; width: 90%;\"}],\"class\":\"text-field drag design-field-column first-el saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px; background-color: rgba(253, 253, 253, 0);\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"manrope\",\"data-bg-color-value\":\"#fdfdfd00\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"form-input-field drag design-field-column mtr-form-fields mtr-form-fields-banner saved-field\",\"draggable\":\"false\",\"id\":\"form-div-14534\",\"data-form-font-family\":\"quicksand\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f4f4f9\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"8\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"open_sans\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#171423\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#cdccd9\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: Quicksand, sans-serif; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"horizontal-spacer-field drag design-field-column last-el saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-20631\",\"data-bg-color-value\":\"#00000000\",\"style\":\"width: 50px; height: -webkit-fill-available; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"I\",\"text\":\"close\",\"children\":[],\"class\":\"auto-style-64 material-icons\",\"id\":\"maitre-banner-close\",\"style\":\"color: rgb(23, 20, 35);\"}],\"id\":\"banner-close\",\"class\":\"auto-style-75 saved-field\"}","image":null,"image_type":null,"valid_image":null}},"confirmation":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"template-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-form-type\":\"signup\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"550px\",\"data-widget-height\":\"70px\",\"data-display-position\":\"top\",\"data-banner-widget-show\":\"none\",\"style\":\"border-width: 4px; display: flex; height: 70px; border-style: none; border-radius: 20px;width: 100%; position: relative;padding: 4px;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Here is your coupon code: XXX\",\"children\":[],\"id\":\"text-input-7662\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 18px; line-height: 30px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"text-field drag design-field-column first-el last-el saved-field\",\"draggable\":\"false\",\"id\":\"text-div-7662\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#fdfdfd00\",\"style\":\"height: fit-content; padding: 0px; border-radius: 0px; background-color: rgba(253, 253, 253, 0);\"}","image":null,"image_type":null,"valid_image":null}},"show":false,"show_for":"referred","hb_form_present":true},"nps_widget":{"primary":{},"secondary":{},"show_banner":"30 days","display_nps_multiple":false,"request_interval":"24 hours","request_nps_multiple":true,"display_second_screen":true,"thanks_message":"Thank you for your feedback!","enabled":false},"verification_widget":{"verification_widget_form":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Enter Verification Code\",\"children\":[],\"id\":\"text-input-186676\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 22px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-186676\",\"data-font-family-code\":\"inherit\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-263501\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 25px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"We sent you a 6 digit code\",\"children\":[],\"id\":\"text-input-186677\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 20px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-186677\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"drag mtr-nps-sms-fields design-field-column saved-field last-el\",\"draggable\":\"false\",\"id\":\"mtr-nps-sms-fields-14535\",\"data-form-heading\":\"We sent you a 6 digit code\",\"data-verify-text\":\"Verify Phone Number\",\"data-email-verify-text\":\"Verify email\",\"data-resend-text\":\"Resend Code\",\"data-form-font-family\":\"quicksand\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f4f4f9\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"8\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"open_sans\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#171423\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#cdccd9\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: Quicksand, sans-serif; border-radius: 0px 0px 20px 20px; height: auto; display: inline-flex;\"}","image":null,"image_type":null,"valid_image":null}},"signup_verification_widget_form":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-1169523\",\"src\":\"https://s3.amazonaws.com/maitre-rh/design_elements/images/000/030/036/large/674fda7cc6bb27ee998edcf7_logo_founderos_white150-1-1.png?1736909849\",\"alt\":\"\",\"draggable\":\"false\",\"style\":\"width: 35%; height: auto; border-radius: 0px;\",\"data-imagename\":\"674fda7cc6bb27ee998edcf7_logo_founderos_white150-1-1.png\"}],\"class\":\"image-link\",\"id\":\"image-link-1169523\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"image-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"id\":\"image-div-1169523\",\"style\":\"width: 100%; height: auto; border-radius: 20px 20px 0px 0px;\"}","image":"https://s3.amazonaws.com/maitre-rh/design_elements/images/000/030/036/large/674fda7cc6bb27ee998edcf7_logo_founderos_white150-1-1.png?1736909849","image_type":"image/png","valid_image":true},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Enter Verification Code\",\"children\":[],\"id\":\"text-input-18667623\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-size: 22px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-18667623\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-26350123\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 10px;\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-26350023\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 10px;\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"We sent you a 6 digit code\",\"children\":[],\"id\":\"text-input-18667723\",\"data-text-color-value\":\"#ffffff\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 20px; color: rgb(255, 255, 255); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-18667723\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"drag mtr-nps-sms-fields design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"mtr-nps-sms-fields-1453523\",\"data-form-heading\":\"We sent you a 6 digit code\",\"data-verify-text\":\"Verify Phone Number\",\"data-email-verify-text\":\"Verify email\",\"data-resend-text\":\"Resend Code\",\"data-form-font-family\":\"quicksand\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f4f4f9\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"8\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"open_sans\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#171423\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#cdccd9\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: Quicksand, sans-serif; border-radius: 0px; height: auto; display: inline-flex;\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field last-el\",\"draggable\":\"false\",\"id\":\"spacer-div-26350223\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 10px; border-radius: 0px 0px 20px 20px;\"}","image":null,"image_type":null,"valid_image":null}}},"sharing":{"redirection":{"enable":false,"url":""},"option_redirection":{"enable":false,"option_data":null},"popup":false,"popup_on_everypage":false,"thanks_msg":"Thank you for signing up","open_if_signed_up":true,"header":{"text":"Congratulations, you are in!","color":"#2b2f3e"},"subheader":{"text":null,"color":"#666"},"people_referred":{"show":true,"text":"Your referrals"},"position":{"show":true,"text":"Your position","ordinal":true},"motivation_prompt":{"show":false,"text":null,"motivation_value":2},"instructions":"Invite your friends with your unique referral link 👇","referral_link":{"copy_button":"Copy","copied_button":"Copied"},"rotating_referral_link":"0","referral_link_field_present":true,"my_referrals":{"enable":false,"header":"My Referrals","empty_referrals_message":"Start sharing. Your referrals will appear here.","name_header":"Name","unique_identifier_header":"Email","signup_date_header":"Signup Date","status_header":"Status","confirmed_date_header":"Confirmed Date","pending_status_header":"Booked a Call","confirmed_status_header":"Enrolled in a Program","unconfirmed_status_header":"Unconfirmed"},"verification":{"enabled":true,"text_email":"Don't forget to confirm your email","reminder_email":"Your email hasn't been verified yet.\u003cbr\u003eCheck your inbox - including the junk folder - and if you don't find it click the link below to resend it.","resend_email":"Resend confirmation email","resending_email":"Sending email...","email_replace":"confirm your email","email_resent":"Email has been sent. Check your inbox.","sms_confirmation":false,"text_sms":"Don't forget to confirm your email","reminder_sms":"Your phone number hasn't been verified yet.\u003cbr\u003eCheck your phone and if you don't find it click the link below to resend the verification SMS.","resend_sms":"Resend verification SMS","resending_sms":"Sending sms...","sms_resent":"SMS has been sent. Check your phone.","crypto_wallet_confirmation":false,"kakao_talk_enabled":false,"qr_code_enabled":true},"socials":{"twitter":{"show":true,"message":"I just signed up on this awesome website! %referral_link%"},"facebook":{"show":true},"facebook_messenger":{"show":true},"email":{"show":true,"message":"%referral_link%","subject":"Check this out"},"whatsapp":{"show":true,"message":"You should really check this out %referral_link%"},"linkedin":{"show":true,"message":""},"reddit":{"show":true,"message":""},"telegram":{"show":true,"message":""},"line":{"show":true,"message":""},"sms":{"show":true,"message":"You should really check this out %referral_link%","qr_code_header":"Scan this QR code to share via SMS"},"pinterest":{"show":true,"message":"You should really check this out %referral_link%","image":""},"design":{"size":"48px","roundness":"5px","space":"5px","order":"facebook twitter whatsapp facebook_messenger email linkedin reddit telegram line sms pinterest"},"kakao_talk":{"show":true,"title":"","message":"You should really check this out %referral_link%","image":""}},"quick_add_form":{"show":false},"leaderboard":{"show":false,"position":"Position","subscriber":"Subscriber","points":"Points","footnote":"1 referral = 1 point"},"rewards":{"show":true,"header":"This is what you can win","show_images":true,"list":[{"id":18242,"title":"Referral Partner Payment","header":null,"description":"For every founder you refer:\r\nInstant $1k when they join any program\r\n+$1.8k after 90 days (OS+)\r\nUp to +$4k after 90 days (Mastermind)","referrals":1,"image":"https://s3.amazonaws.com/maitre-rh/rewards/images/000/018/242/large/referral_partners_comm.jpg?1736908575","label":"A referral joins Founder OS","points":null,"category":"referrers","signup_type":"organic"}],"unlocked":"UNLOCKED!","unlocked_color":"#3d85c6","rewards_color":"#3d85c6","signup_bonus":"Sign-up bonus","test_names":["Referral Partner Payment"],"reward_data":[{"id":18242,"waiting_list_id":17980,"active":true,"title":"Referral Partner Payment","description":"For every founder you refer:\r\nInstant $1k when they join any program\r\n+$1.8k after 90 days (OS+)\r\nUp to +$4k after 90 days (Mastermind)","position":null,"created_at":"2025-01-15T02:36:16.286Z","updated_at":"2025-08-22T19:37:06.317Z","image_file_name":"referral_partners_comm.jpg","image_content_type":"image/jpeg","image_file_size":637253,"image_updated_at":"2025-01-15T02:36:15.772Z","header":null,"referrals":1,"frequency":"always","notify_subscriber":false,"notify_user":true,"original_email_id":null,"category":"referrers","points":null,"referrals_type":"confirmed","signup_type":"organic","reward_label":"A referral joins Founder OS","set_subscriber_rank_to_last":true,"send_value":true,"value_type":"fixed","value":1000.0,"hold_days":null,"frequent":false,"max_count":null,"enable_immediate_delivery":false,"enable_manual_delivery":true,"enable_hold_delivery":false,"frequency_unit":"days","frequency_time_interval":null,"signup_type_status":"signs_up","enable_conversion_value":false,"conversion_value_rule":"greater_than","conversion_value":2000.0,"enable_stripe_product_purchase":false,"stripe_products":null,"enable_hold_stripe_delivery":false,"enable_group_reward":false,"group_trigger_type":null,"group_amount":null,"send_group_email":false,"enable_referrer_reward":false,"enable_referrer_reward_on_transaction":true,"enable_transaction_frequency":false,"transaction_referrals_type":"confirmed","transaction_frequency_time_interval":null,"transaction_frequency_unit":"transactions","product_ids":null,"enable_reward_on_product_purchase":false,"enable_max_amount":false,"max_amount":null,"enable_reward_tier":false,"tier_condition":"transaction_value","min_tier":0,"max_tier":0,"send_stripe_credit":false,"enable_tremendous_reward":false,"manually_apply_reward":false,"enable_reward_subscriber_tags":false,"reward_advocate_tag":"all","reward_referral_tag":"all","send_group_sms":false,"enable_sms_notifications":false,"min_conversion_value":0.0,"max_conversion_value":0.0,"enable_reset_time_frequency":false,"reset_time_frequency":"monthly","enable_date_range":false,"start_date":null,"end_date":null,"reward_subscriber_tag":"","tier_type":null,"min_ref_tier":null,"max_ref_tier":null}],"referrals_rewards_header":"Referrals"}},"alerts":{"subscriber_not_found":"No subscriber exists with the provided unique identifier.","subscriber_already_promoted":"You have already been promoted.","form_incomplete":"Please complete all required fields before continuing.","server_problem":"We're currently experiencing some technical difficulties with our server. Please report this issue to the administrator and try again later.","failed_recaptcha":"reCAPTCHA failed","terms_conditions":"You must accept the Terms \u0026 Conditions","invalid_phone_number":null}},"MF680bd8851f":{"env":"production","tool":"traffic_tracking","review_referrals":false,"track_events":false,"enable_visit_url":false,"track_visit_url":null,"name":"WEBSITE REFERRAL ANALYSIS","unique_identifier":"email","test_mode":false,"list_canceled":false,"default_url":null,"use_referral_name":null,"enable_mobile_sdk":false,"total_sub_positions":0,"allow_subdomain_cookie":true,"cookie_window":90,"show_signup_widget":"show","allow_organic_traffic_tracking":true,"allow_global_subscribers_tracking":true,"admin_has_organic_traffic_tracking_campaign":true,"apply_mwr_enabled":false,"organic_traffic_tracking_campaign_uuid":"MF680bd8851f","is_conversion_events_goal":true,"is_conversion_events_and_social_actions_goal":false,"facebook_app_id":"403392874685523","kakao_app_key":null,"enable_form_submission":false,"form_action":"submit","form_ids":[],"campaign_stopped":false,"enable_features":{"rewards":true,"verification":false,"coupons":false,"position_stats":false,"social_actions":false,"horizontal_banner":false,"quick_add_form":false,"signup_widget":false,"leaderboard":false,"my_referrals":true,"nps_widget":false},"social_actions_points":{"facebook":0,"twitter":0,"whatsapp":0,"line":0,"kakao_talk":null,"telegram":0,"sms":0,"linkedin":0,"facebook_messenger":null,"pinterest":0,"reddit":0,"email":0,"copy_link":null,"telegram_action":null,"discord_action":null},"floating_button":{"enable":false,"text":"Join our referral program","color":"#3d85c6","position":"right","text_color":"#FFFFFF","font_family":"inherit","text_size":null,"identified_label":null},"inline_button":{"text":"Join our referral program","color":"#3d85c6","text_color":"#FFFFFF","font_family":"inherit","text_size":null,"identified_label":null},"one_click_signup":{"enable":false,"name":"rh_name","email":"rh_email","extra_field":"rh_extra_field","extra_field_2":"rh_extra_field_2","extra_field_3":"rh_extra_field_3","extra_field_4":"rh_extra_field_4","option_field":"rh_option_field"},"quick_add_form":{"confirmation_link_background":"#009dd8","confirmation_link_label":"CONFIRM EMAIL","confirmation_link_color":"#ffffff","border":"#87a5bf","cover":null,"enable":false,"header":{"text":"Or Add a Friend","color":"#2b2f3e"},"subheader":{"text":"","color":"#666"},"name":{"require":true,"placeholder":"Name","required":true},"email":{"require":false,"placeholder":"Email","required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":true},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":true},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":true},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":true},"option_field":{"require":false,"placeholder":"Choose Option Below","options":[],"required":false},"phone_number":{"require":false,"placeholder":"Phone Number","country_code":"+1","required":true},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":true},"other_identifier":{"require":false,"placeholder":"Customer Id"},"submit_button":{"text":"Add Referral","submitting":"Submitting...","color":"#CDCCD9","label_color":"#171423","corner_roundness":"100px","width":"100%","font_size":"16px","alignment":"center","font_family":"inherit","height":"45px","underline":false,"bold":true,"italic":false,"login_font_size":"15px"},"status":{"text":"Log In","back":"Back"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":null},"input_field":{"color":"#5c5c5c","border_color":"#fff","background_color":"#f4f4f9","border_width":"0px","height":"48px","border_radius":"12px","font_family":"inherit","font_size":"14px","width":"100%","alignment":"center","distance":"16px","font_bold":false,"font_style":false,"font_decoration":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options","invitation_email":{"enable":null,"subject":"Your friend %referrer% thinks you'll love us! ✨Confirm and Get Rewarded","body":"\u003cp\u003eHi %name%,\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003eGuess what? Your friend %referrer% thinks you’d love [Your Program/Service] and sent a special invite your way. The best part? If you’re in, both of you get a reward!\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003e\u003cstrong\u003eReady to Unlock Your Reward? Let’s Make It Official:\u003c/strong\u003e\u003c/p\u003e\r\n\u003cp\u003e%confirmation_link%\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003e\u003cstrong\u003eQuick Perks:\u003c/strong\u003e\u003c/p\u003e\r\n\u003cul\u003e\r\n\u003cbr\u003e\u003cli\u003eGet [describe reward] just to check out our site.\u003c/li\u003e\r\n\u003cli\u003e%referrer_name% scores a bonus, too!\u003c/li\u003e\r\n\u003c/ul\u003e\r\n\u003cbr\u003e\u003cp\u003eTap to claim your rewards and see what you’ve been missing!\u003c/p\u003e\r\n\u003cbr\u003e\u003cp\u003eAll the best,\u003cbr\u003e\u003cbr\u003e[Your Name]\u003cbr\u003e[Your Title]\u003cbr\u003e[Your Company]\u003cbr\u003e[Contact Info]\u003c/p\u003e"}},"design":{"enable":true,"custom_css":"","powered_by":false,"colors":{"primary":"#3d85c6"}},"recaptcha":{"enable":false,"public_key":null},"facebook_pixel":{"enable":null,"id":null},"lambda":{"email_endpoint":"https://wm6c1kxpcl.execute-api.us-west-1.amazonaws.com/prod/pm_confirmation_email","sms_endpoint":"https://wm6c1kxpcl.execute-api.us-west-1.amazonaws.com/prod/sms","email_from":"ZgezsOQE6BVeU5XfIjsthWsFK4taYywITC20FEZ0A6ZevJiq14q4ybCZnEos2Gb5--sR4CftLt3kLSwk8PPKcsIg==","email_replyto":"fumOj2f3sxMBACT7iJ1Rt2NV2GDNAbPbNo1iHE64bLk=--DGEwVe6SclotpAMF8gKpLw==","email_authorization":"rTjqB86xYOBDCF87kkwjmjL3JVBMgOJN+Fttg+Yjt2uSDSW2x/1ZYuBt9YzUHqnKX44HPf9TSFCL121aISUZ7WKg08uesiNXqPgYmtzIgJnXZsK30FDQ1oLUNSwXwZeNbTwnAE7KiotLelCxT4tiwQ==--3CpD4Yh+i7MckQ9CAfaUbQ==","sms_authorization":"0kUmrJEHSOtTDOpflcCEda6U1/V/FDo0CrRnfbmSQ5rMBdCkNskjJINfv2dXsvK/--axYgJxw5nRjZCVXX65fsuA==","template_id":null,"pm_template_id":39105168,"sms_from":"fJRzVgANy+iqeokYenGTrw==--IbwDJZSemn3Z4AzQ/9uFqQ==","sms_body":"We are so excited to have you join our [Your Program Name] referral \u0026 rewards program! Please confirm your phone number by clicking here: %confirmation_link%"},"form":{"border":"#87a5bf","form_border":{"color":"#87a5bf","width":"0px","style":"solid solid solid solid ","radius":"20px","shadow":false},"cover":null,"background":{"enable_color":true,"color":"#ffffff","image":null,"image_size":"auto"},"header":{"text":"Refer your friends!","color":"#2b2f3e"},"name":{"require":true,"placeholder":"Name","required":true},"phone_number":{"require":false,"placeholder":"Phone Number","required":true,"country_code":"+1"},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":true},"crypto_wallet_provider":{"placeholder":"Select Wallet Provider"},"providers":["phantom","coinbase","metamask","trust_wallet","wallet_connect"],"other_identifier":{"require":false,"placeholder":"Customer Id"},"email":{"require":true,"placeholder":"Email","required":true},"address":{"require":false,"placeholder":null,"required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":true},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":true},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":true},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":true},"option_field":{"require":false,"placeholder":"Choose Option Below","options":[],"required":false},"tags_field":{"require":false,"placeholder":"Choose Option Below","options":["Other/None"],"required":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options tags","widget_width":"560px","widget_padding":"40px","submit_button":{"text":"Sign up","submitting":"Submitting...","color":"#CDCCD9","label_color":"#171423","corner_roundness":"100px","width":"100%","font_size":"16px","alignment":"","font_family":"inherit","height":"45px","underline":false,"bold":false,"italic":false,"login_font_size":"15px","check_position":"Login","login_text_colour":null},"status":{"text":"Log In","back":"Back"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":null,"text2":null,"url2":null},"terms_conditions_2":{"require":false,"text":null},"designer_settings":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-11695\",\"src\":\"https://s3.amazonaws.com/maitre-rh/designer_settings/images/000/000/698/large/logo_%282%29.png?1685732969\",\"alt\":\"\",\"draggable\":\"false\",\"style\":\"width: 35%; height: auto; border-radius: 0px;\",\"data-imagename\":\"logo.png\"}],\"class\":\"image-link\",\"id\":\"image-link-11695\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"image-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"id\":\"image-div-11695\",\"style\":\"width: 100%; height: auto; border-radius: 58px 58px 0px 0px;\"}","image":"https://s3.amazonaws.com/maitre-rh/designer_settings/images/000/013/815/large/data?1739980516","image_type":"image/png","valid_image":true},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-263500\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 25px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Join our referral program!\",\"children\":[],\"id\":\"text-input-186676\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-size: 18px; color: #171423; overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-186676\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"maitre-optin-form-fields\",\"class\":\"drag saved-field last-el\",\"draggable\":\"false\",\"style\":\"border-radius: 0px 0px 58px 58px;\"}","image":null,"image_type":null,"valid_image":null}},"input_field":{"color":"#5c5c5c","border_color":"#fff","background_color":"#f4f4f9","border_width":"0px","height":"48px","border_radius":"12px","font_family":"inherit","font_size":"14px","width":"100%","alignment":"center","distance":"16px"},"sharing_screen_designer":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"mtr-sharing-body\",\"class\":\"mt-30 saved-field\",\"data-widget-width\":\"700px\",\"data-bg\":\"color\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"style\":\"border-width: 1px; padding: 15px; border-style: solid; border-radius: 20px; border-color: #fff\",\"data-widget-padding\":\"15px\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 10px;\",\"id\":\"spacer-div-1686067297515\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-8034\",\"src\":\"https://s3.amazonaws.com/maitre-rh/designer_settings/images/000/000/698/large/logo_%282%29.png?1685732969\",\"alt\":\"\",\"draggable\":\"false\",\"style\":\"width: 35%; height: auto; border-radius: 0px;\",\"data-imagename\":\"logo.png\"}],\"class\":\"image-link\",\"id\":\"image-link-8034\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"share-screen-sub-field image-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"style\":\"width: 100%; height: auto; border-radius: 59px 59px 0px 0px;\",\"id\":\"image-div-8034\"}","image":"https://s3.amazonaws.com/maitre-rh/sharing_screen_designers/images/000/044/234/large/data?1739980534","image_type":"image/png","valid_image":true},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px;\",\"id\":\"spacer-div-1686067346769\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Welcome! Now, share to earn!\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: bold; font-size: 30px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column\",\"draggable\":\"false\",\"style\":\"height: 30px;\",\"id\":\"spacer-div-1686304047296\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field social-box-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"min-height: 100px; height: auto; padding: 1%; background-color: #f1f0f5; width: 100%; margin: 0px auto; text-align: center; border-radius: 18px;\",\"id\":\"social-box-div-277475\",\"data-border-left-style\":\"solid\",\"data-border-right-style\":\"solid\",\"data-border-bottom-style\":\"solid\",\"data-border-top-style\":\"solid\",\"data-border-style\":\"none\",\"data-focus-box-border-size-range\":\"0\",\"data-focus-box-border-radius-range\":\"18\",\"data-social-box-border-color\":\"#000000\",\"data-social-box-height\":\"100\",\"data-social-box-width\":\"100\",\"data-social-box-padding\":\"1\",\"data-bg-color-value\":\"#f1f0f5\"}","image":null,"image_type":null,"valid_image":null},"8":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 20px;\",\"id\":\"spacer-div-381440\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"9":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field rewards-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: auto;\",\"id\":\"rewards-div-140754\",\"data-rewards-ribbon-text\":\"UNLOCKED!\",\"data-rewards-ribbon-text-color\":\"#ffffff\",\"data-unlocked-rewards-ribbon-text-change\":\"REWARD UNLOCKED!\",\"data-locked-rewards-ribbon-text-change\":\"REWARD LOCKED!\",\"data-rewards-point-text-change\":\"5 OF 5 POINTS\",\"data-rewards-ribbon-color\":\"#87a5bf\",\"data-rewards-label-color\":\"#87a5bf\",\"data-rewards-image-toggle\":\"true\",\"data-rewards-font-family\":\"quicksand\",\"data-rewards-font-size\":\"14\",\"data-rewards-border-width\":\"0\",\"data-rewards-border-radius\":\"18\",\"data-rewards-border-color\":\"#cccccc\",\"data-rewards-orientation\":\"column\",\"data-rewards-order\":\"\",\"data-rewards-toggle-12536\":\"true\",\"data-unlocked-reward-color\":\"#B1E2E8\",\"data-locked-reward-color\":\"#EABB99\",\"data-reward-icons-color\":\"#000000\",\"data-card-background-color-rewards\":\"#FFFFFF\",\"data-progress-bar-rewards-toggle\":\"true\",\"data-reward-points-font-family\":\"inherit\",\"data-rewards-font-weight\":\"bold\",\"data-rewards-label-font-stylek\":\"normal\",\"data-rewards-label-text-decorationk\":\"none\",\"data-reward-points-font-weight\":\"bold\",\"data-reward-points-label-font-stylek\":\"normal\",\"data-reward-points-label-text-decorationk\":\"none\",\"data-points-font-size\":\"12\",\"data-points-line-height\":\"15\",\"data-rewards-line-height\":\"15\",\"data-align-rewards\":\"left\",\"data-align-points\":\"flex-start\",\"data-rewards-width\":\"40\",\"data-rewards-name-color\":\"#000000\",\"data-border-left-style\":\"solid\",\"data-border-right-style\":\"solid\",\"data-border-bottom-style\":\"solid\",\"data-border-top-style\":\"solid\",\"data-border-style\":\"solid\"}","image":null,"image_type":null,"valid_image":null},"10":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Your Referrals: %total_referrals%\",\"children\":[],\"id\":\"text-input-409325\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 25px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"share-screen-sub-field text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 0px;\",\"id\":\"text-div-409325\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"11":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field referrals-field drag design-field-column saved-field last-el mtr-rewards-referrals\",\"draggable\":\"false\",\"id\":\"referrals-div-402910\",\"data-referrals-header-text-name\":\"Name\",\"data-referrals-header-text-unique\":\"Email\",\"data-referrals-header-text-signup\":\"Signup Date\",\"data-referrals-header-text-status\":\"Status\",\"data-referrals-header-text-confirmed\":\"Confirmed date\",\"data-referrals-header-text-verified\":\"Verified\",\"data-referrals-header-color\":\"#5c5c5c\",\"data-referrals-header-bg-color\":\"#f1f0f5\",\"data-referrals-header-font-size\":\"14\",\"data-referrals-header-font-family\":\"inherit\",\"data-referrals-header-font-weight\":\"normal\",\"data-referrals-header-font-style\":\"\",\"data-referrals-header-text-decoration\":\"\",\"data-align\":\"center\",\"data-referrals-table-color\":\"#323c4b\",\"data-referrals-table-bg-color\":\"#ffffff\",\"data-referrals-table-font-size\":\"12\",\"data-referrals-table-font-family\":\"inherit\",\"data-referrals-table-font-weight\":\"normal\",\"data-referrals-table-font-style\":\"\",\"data-referrals-table-text-decoration\":\"\",\"data-referrals-no-referral-message\":\"Start sharing, your referrals will appear here!\",\"data-my-rewards-status-bg-color\":\"#DDF6E7\",\"data-my-referrals-table-display\":\"true\",\"data-my-rewards-table-display\":\"true\",\"style\":\"height: auto; overflow: auto; border-radius: 0px 0px 59px 59px;\",\"data-referrals-header-line-height\":\"15\",\"data-referrals-header-name-required\":\"true\",\"data-referrals-header-unique-required\":\"true\",\"data-referrals-header-signup-required\":\"true\",\"data-referrals-header-status-required\":\"true\",\"data-referrals-header-confirmed-required\":\"true\",\"data-referrals-header-verified-required\":\"false\",\"data-referrals-header-sorted-position\":\"name unique signup status verified confirmed\",\"data-selected-tab-bg-color\":\"#FFFFFF\",\"data-deselected-tab-bg-color\":\"#F1F0F5\",\"data-selected-tab-text-color\":\"#171423\",\"data-deselected-tab-text-color\":\"#5c5c5c\",\"data-referrals-text\":\"My Referrals\",\"data-rewards-text\":\"My Rewards\",\"data-align-table\":\"center\",\"data-referrals-table-line-height\":\"15\",\"data-myreferrals-show-memoji\":\"true\",\"data-myreferrals-avatar-bg-color\":\"#f46d6d\",\"data-referrals-unconfirmed-bg-color\":\"#c4c2c2\",\"data-referrals-pending-bg-color\":\"#f19b99\",\"data-referrals-confirmed-bg-color\":\"#DDF6E7\",\"data-reward-status-bg-color\":\"#DDF6E7\",\"data-reward-status-text-color\":\"#16793D\",\"data-referrals-unconfirmed-text-color\":\"#777\",\"data-referrals-pending-text-color\":\"#b70404\",\"data-referrals-confirmed-text-color\":\"#16793D\",\"data-my-rewards-header-text-name\":\"Name\",\"data-my-rewards-header-text-referrals\":\"Referrals\",\"data-my-rewards-header-text-emailsent\":\"Email Sent\",\"data-my-rewards-header-text-status\":\"Status\",\"data-my-rewards-header-text-date\":\"Unlocked Date\",\"data-my-rewards-header-text-value\":\"Amount\",\"data-my-rewards-header-name-required\":\"true\",\"data-my-rewards-header-unique-required\":\"true\",\"data-my-rewards-header-signup-required\":\"true\",\"data-my-rewards-header-status-required\":\"true\",\"data-my-rewards-header-confirmed-required\":\"true\",\"data-my-rewards-header-value-required\":\"false\",\"data-my-rewards-header-sorted-position\":\"name referrals emailsent status date value\",\"data-my-rewards-no-reward-message\":\"You have not created any rewards\"}","image":null,"image_type":null,"valid_image":null},"6000":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field spacer-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 10px;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"spacer-div-497179\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6001":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Here is your unique referral link 👇\",\"children\":[],\"id\":\"text-input-282266\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: normal; font-size: 14px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"share-screen-sub-field text-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 0px;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"text-div-282266\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6002":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field share-link-field drag design-field-column last-el sub-box-field saved-field\",\"draggable\":\"false\",\"style\":\"border-radius: 0px 0px 59px 59px;\",\"id\":\"share-link-div-79271\",\"data-share-link-width\":\"90\",\"data-share-link-text-color\":\"#222222\",\"data-share-link-bg-color\":\"#ffffff\",\"data-copy-button-text-change\":\"COPY\",\"data-copy-button-text-color\":\"#000000\",\"data-copy-button-bg-color\":\"#6f8ea8\",\"data-copy-button-font-weight\":\"normal\",\"data-copy-button-font-style\":\"\",\"data-copy-button-text-decoration\":\"\",\"data-copy-button-font-family\":\"inherit\",\"data-copy-button-type\":\"text\",\"data-copy-button-share-message\":\"%referral_link%\",\"data-box-id\":\"social-box-div-277475\",\"data-share-link-uppercase-title\":\"HERE IS YOUR UNIQUE REFERRAL LINK\",\"data-share-link-uppercase-bubble\":\"Get %p% Points\",\"data-sharing_link_input_font_size\":\"14px\",\"data-sharing_link_height_box\":\"25\",\"data-sharing_link_line_height\":\"15\",\"data-share-link-input-border-width\":\"0\",\"data-share-link-input-border-radius\":\"12\",\"data-share-link-copy-border-width\":\"0\",\"data-share-link-copy-border-radius\":\"12\",\"data-sharing_link_title_font_size\":\"12px\",\"data-share-link-input-border-color\":\"#E1E1E1\",\"data-bg-color-points-share-link\":\"#403754\",\"data-bg-color-points-text-share-link\":\"#FFFFFF\",\"data-sharing_link_title_font_height\":\"20px\",\"data-border-style\":\"solid\"}","image":null,"image_type":null,"valid_image":null},"6003":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"share-screen-sub-field social-links-field drag sub-box-field design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: auto;\",\"data-box-id\":\"social-box-div-277475\",\"id\":\"social-link-div-359712\",\"data-social-links-icon-size\":\"35\",\"data-social-links-icon-roundness\":\"25\",\"data-social-links-icon-space\":\"5\",\"data-social-links-bg-color\":\"#6f8ea8\",\"data-social-links-icon-type\":\"customize\",\"data-social-links-icon-order\":\"facebook twitter whatsapp facebook_messenger email\",\"data-social-link-padding\":\"0\",\"data-font-family-code\":\"inherit\",\"data-social-link-font-size\":\"12\",\"data-social-links-social-header-text\":\"GET %p% POINTS\",\"data-social_link_border_width\":\"0\",\"data-social-links-icon-color\":\"#000000\",\"data-social-link-text-color\":\"#000000\",\"data-border-style\":\"solid\",\"data-social-link-font-weight\":\"normal\",\"data-social-link-font-style-decor\":\"normal\",\"data-social-link-text-decoration\":\"\",\"data-align\":\"center\"}","image":null,"image_type":null,"valid_image":null}},"selected_tags":[]},"signup_widget_form":{"border":"#87a5bf","form_border":{"color":"#87a5bf","width":"0px","style":"solid solid solid solid ","radius":"20px"},"cover":null,"background":{"enable_color":true,"color":"#ffffff","image":null,"image_size":"auto"},"header":{"text":"Refer your friends!","color":null},"name":{"require":true,"placeholder":"Name","required":true},"phone_number":{"require":false,"placeholder":"Phone Number","required":true,"country_code":"+1"},"crypto_wallet_address":{"require":false,"placeholder":"Crypto Wallet Address","required":true},"crypto_wallet_provider":{"placeholder":"Select Wallet Provider"},"providers":["phantom","coinbase","metamask","trust_wallet","wallet_connect"],"other_identifier":{"require":false,"placeholder":"Customer Id"},"email":{"require":true,"placeholder":"Email","required":true},"address":{"require":false,"placeholder":null,"required":true},"extra_field":{"require":false,"placeholder":"Extra field 1 (Eg: Phone)","required":true},"extra_field_2":{"require":false,"placeholder":"Extra field 2 (Eg: Country)","required":true},"extra_field_3":{"require":false,"placeholder":"Extra field 3 (Eg: State)","required":true},"extra_field_4":{"require":false,"placeholder":"Extra field 4 (Eg: Zip code)","required":true},"option_field":{"require":false,"placeholder":"Choose Option Below","options":[],"required":false},"field_positions":"name email phone crypto other extra1 extra2 extra3 extra4 options","widget_width":"560px","widget_padding":"40px","submit_button":{"text":"Sign up","submitting":"Submitting...","color":"#CDCCD9","label_color":"#171423","corner_roundness":"100px","width":"100%","font_size":"16px","alignment":"center","font_family":"inherit","height":"45px","underline":false,"bold":false,"italic":false,"login_font_size":"15px"},"terms_conditions":{"require":false,"text":"I accept the Terms \u0026 Conditions","url":null,"text2":null,"url2":null},"terms_conditions_2":{"require":false,"text":null},"thanks_msg":"Thank you, here is your coupon code","redirection":{"enable":false,"url":""},"option_redirection":{"enable":null,"option_data":null},"confirmation_screen_popup":{"enable":null},"designer_signup_settings":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-9806\",\"src\":\"https://s3.amazonaws.com/maitre-rh/designer_settings/images/000/000/698/large/logo_%282%29.png?1685732969\",\"alt\":\"\",\"style\":\"width: 35%; height: auto; border-radius: 0px;\",\"draggable\":\"false\",\"data-imagename\":\"logo.png\"}],\"class\":\"image-link\",\"id\":\"image-link-9806\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"image-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"style\":\"width: 100%; height: auto; border-radius: 59px 59px 0px 0px;\",\"id\":\"image-div-9806\"}","image":"https://s3.amazonaws.com/maitre-rh/designer_signup_settings/images/000/013/970/large/data?1739980549","image_type":"image/png","valid_image":true},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px;\",\"id\":\"spacer-div-259552\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Welcome, you’ve been referred by %referrer_name%!\",\"children\":[],\"id\":\"text-input-7050\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: bold; font-size: 30px; color: #171423; overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-7050\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Sign up and get a free gift!\",\"children\":[],\"id\":\"text-input-1685733290496\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 20px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-1685733290496\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"maitre-signup-widget-form-fields\",\"class\":\"drag saved-field last-el\",\"style\":\"border-radius: 0px 0px 59px 59px;\",\"draggable\":\"false\"}","image":null,"image_type":null,"valid_image":null}},"thankyou_screen_settings":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"thankyou-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"560px\",\"style\":\"border-width: 1px; border-radius: 20px; border-color: #fff; border-style: solid;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"style\":\"height: 10px; border-radius: 59px 59px 0px 0px;\",\"id\":\"spacer-div-144912\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-65193\",\"src\":\"https://s3.amazonaws.com/maitre-rh/designer_settings/images/000/000/698/large/logo_%282%29.png?1685732969\",\"alt\":\"\",\"style\":\"width: 35%; height: auto; border-radius: 0px;\",\"draggable\":\"false\",\"data-imagename\":\"logo.png\"}],\"class\":\"image-link\",\"id\":\"image-link-65193\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"image-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"width: 100%; height: auto; border-radius: 58px 58px 0px 0px;\",\"id\":\"image-div-65193\"}","image":"https://s3.amazonaws.com/maitre-rh/thankyou_screen_settings/images/000/024/564/large/data?1739980560","image_type":"image/png","valid_image":true},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px;\",\"id\":\"spacer-div-36054\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Thanks for Registering!\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: bold; font-size: 30px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; justify-content: center; display: flex;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Here is your discount code: XXX\",\"children\":[],\"id\":\"text-input-1685733471178\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-size: 25px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\",\"id\":\"text-div-1685733471178\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"style\":\"height: 25px; border-radius: 0px;\",\"id\":\"spacer-div-1685765877995\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null},"8":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"P\",\"text\":\"Visit Site\",\"children\":[],\"id\":\"button-text-134168\",\"class\":\"button-text\",\"data-text-color-value\":\"#ffffff\",\"style\":\"overflow-wrap: break-word; width: 100%; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; word-break: break-word; color: #3F3D3D; margin: 0px;\"}],\"id\":\"button-link-134168\",\"class\":\"button-link\",\"href\":\"https://app.referralhero.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"data-bg-color-value\":\"#6f8ea8\",\"style\":\"font-family: inherit; text-decoration: none; width: 70%; max-width: 100%; min-height: 10px; height: 40px; max-height: fit-content; border-radius: 25px; font-size: 18px; text-align: center; font-weight: 400; border: none; letter-spacing: 0.5px; background-color: #CDCCD9; min-width: fit-content; align-items: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"button-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"button-div-134168\",\"data-font-family-code\":\"quicksand\",\"style\":\"height: auto; max-width: inherit; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"9":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field last-el\",\"draggable\":\"false\",\"style\":\"height: 25px; border-radius: 0px 0px 59px 59px;\",\"id\":\"spacer-div-1685765868396\",\"data-bg-color-value\":\"#00000000\"}","image":null,"image_type":null,"valid_image":null}},"input_field":{"color":"#5c5c5c","border_color":"#fff","background_color":"#f4f4f9","border_width":"2px","height":"44px","border_radius":"12px","font_family":"inherit","font_size":"14px","width":"100%","alignment":"center","distance":"16px"},"verification":{"reminder_email":"Your email hasn't been verified yet.\u003cbr\u003eCheck your inbox - including the junk folder - and if you don't find it click the link below to resend it.","resend_email":"Resend confirmation email","resending_email":"Sending email...","email_resent":"Email has been sent. Check your inbox.","reminder_sms":"Your phone number hasn't been verified yet.\u003cbr\u003eCheck your phone and if you don't find it click the link below to resend the verification SMS.","resend_sms":"Resend verification SMS","resending_sms":"Sending sms...","sms_resent":"SMS has been sent. Check your phone."},"inline_button":{"text":"Join our referral program","color":"#3d85c6","text_color":"#FFFFFF","font_family":"inherit","text_size":null,"identified_label":null}},"horizontal_banner":{"signup":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"template-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-form-type\":\"signup\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"550px\",\"data-widget-height\":\"70px\",\"data-display-position\":\"top\",\"data-banner-widget-show\":\"none\",\"style\":\"border-width: 4px; display: flex; height: 70px; border-style: none; border-radius: 20px;width: 100%; position: relative;padding: 4px;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"%referrer_name% has invited you! Claim your free gift:\",\"children\":[],\"id\":\"text-input-0001\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 700; font-size: 14px; line-height: 30px; color: #171423; overflow-wrap: break-word; width: 90%;\"}],\"class\":\"text-field drag design-field-column first-el saved-field\",\"draggable\":\"false\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px; background-color: rgba(253, 253, 253, 0);\",\"id\":\"text-div-0001\",\"data-font-family-code\":\"manrope\",\"data-bg-color-value\":\"#fdfdfd00\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"form-input-field drag design-field-column mtr-form-fields mtr-form-fields-banner saved-field\",\"draggable\":\"false\",\"id\":\"form-div-14534\",\"data-form-font-family\":\"quicksand\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f4f4f9\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"8\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"open_sans\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#171423\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#cdccd9\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: Quicksand, sans-serif; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"horizontal-spacer-field drag design-field-column last-el saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-20631\",\"data-bg-color-value\":\"#00000000\",\"style\":\"width: 50px; height: -webkit-fill-available; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"I\",\"text\":\"close\",\"children\":[],\"class\":\"auto-style-64 material-icons\",\"id\":\"maitre-banner-close\",\"style\":\"color: rgb(23, 20, 35);\"}],\"id\":\"banner-close\",\"class\":\"auto-style-75 saved-field\"}","image":null,"image_type":null,"valid_image":null}},"confirmation":{"0":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"template-form\",\"class\":\"mt-30 saved-field\",\"data-bg\":\"color\",\"data-form-type\":\"signup\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"550px\",\"data-widget-height\":\"70px\",\"data-display-position\":\"top\",\"data-banner-widget-show\":\"none\",\"style\":\"border-width: 4px; display: flex; height: 70px; border-style: none; border-radius: 20px;width: 100%; position: relative;padding: 4px;\",\"data-bg-image\":\"\"}","image":null,"image_type":null,"valid_image":null},"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Here is your coupon code: XXX\",\"children\":[],\"id\":\"text-input-7662\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 18px; line-height: 30px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center;\"}],\"class\":\"text-field drag design-field-column first-el last-el saved-field\",\"draggable\":\"false\",\"id\":\"text-div-7662\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#fdfdfd00\",\"style\":\"height: fit-content; padding: 0px; border-radius: 0px; background-color: rgba(253, 253, 253, 0);\"}","image":null,"image_type":null,"valid_image":null}},"show":false,"show_for":"referred","hb_form_present":true},"nps_widget":{"primary":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[],\"id\":\"nps-body\",\"class\":\"mt-30 nps-body saved-field\",\"data-bg\":\"color\",\"data-form-type\":\"primary\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"550px\",\"data-widget-height\":\"100px\",\"data-display-position\":\"center\",\"data-display-type\":\"modal\",\"style\":\"border-style: solid none none none; border-width: 0px; padding: 40px 30px; margin: 0 auto; align-items: center; max-width: 100%; position: relative; border-radius: 20px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"How likely are you to recommend us to a friend or colleague?\",\"children\":[],\"id\":\"text-input-186676\",\"data-text-color-value\":\"#5fc7bd\",\"style\":\"width: 100%; margin: 0px; padding: 0 15px; font-size: 18px; line-height: 30px; color: #171423; overflow-wrap: break-word; text-align: center; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-186676\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"class\":\"nps-banner-close design-field-column saved-field\",\"children\":[{\"tagName\":\"I\",\"text\":\"close\",\"children\":[],\"class\":\"material-icons\",\"data-text-color-value\":\"#4d566c\",\"style\":\"font-family:Material Icons; font-size:25px;\"}],\"id\":\"nps-banner-close-2635010\",\"data-text-color-value\":\"#4d566c\",\"style\":\"position: absolute;right: 14px;width: 30px;height: 30px;color: rgb(0, 0, 0);display: flex;cursor: pointer;align-items: center;justify-content: center;top: 14px;\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"mtr-nps-form-fields-2635003\",\"class\":\"drag mtr-nps-form-fields design-field-column saved-field\",\"style\":\"margin: 0 auto; height: auto;\",\"data-form-type\":\"primary\",\"data-rating-question-text\":\"How likely are you to recommend us to a friend or colleague?\",\"data-not-like-text\":\"Not likely at all\",\"data-like-text\":\"Extremely likely\",\"data-points-count\":\"10\",\"data-points-bg-color\":\"#f1f0f5\",\"data-points-text-color\":\"#171423\",\"data-review-text-color\":\"black\",\"data-positive-text-color\":\"#171423\",\"data-negative-text-color\":\"#171423\",\"data-positive-bg-color\":\"#62C188\",\"data-negative-bg-color\":\"#B86261\",\"data-feedback-question-text-color\":\"black\",\"data-feedback-font-size\":\"14\",\"data-feedback-line-height\":\"19\",\"data-feedback-font-family\":\"inherit\",\"data-feedback-font-weight\":\"normal\",\"data-feedback-font-style\":\"normal\",\"data-feedback-font-underline\":\"none\"}","image":null,"image_type":null,"valid_image":null}},"secondary":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[],\"id\":\"nps-body\",\"class\":\"mt-30 nps-body saved-field\",\"data-bg\":\"color\",\"data-form-type\":\"primary\",\"data-bg-size\":\"auto\",\"data-bg-color\":\"#ffffff\",\"data-widget-width\":\"550px\",\"data-widget-height\":\"100px\",\"data-display-position\":\"center\",\"data-display-type\":\"modal\",\"style\":\"border-style: solid none none none; border-width: 0px; padding: 40px 30px; margin: 0 auto; align-items: center; max-width: 100%; position: relative; border-radius: 20px;\"}","image":null,"image_type":null,"valid_image":null},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Why did you choose that score?\",\"children\":[],\"id\":\"text-input-186677\",\"data-text-color-value\":\"#5fc7bd\",\"style\":\"width: 100%; margin: 0px; padding: 0; font-size: 18px; line-height: 30px; color: #171423; overflow-wrap: break-word; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-186677\",\"data-font-family-code\":\"manrope\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"class\":\"nps-banner-close design-field-column saved-field\",\"children\":[{\"tagName\":\"I\",\"text\":\"close\",\"children\":[],\"class\":\"material-icons\",\"data-text-color-value\":\"#4d566c\",\"style\":\"font-family:Material Icons; font-size:25px;\"}],\"id\":\"nps-banner-close-2635011\",\"data-text-color-value\":\"#4d566c\",\"style\":\"position: absolute;right: 14px;width: 30px;height: 30px;color: rgb(0, 0, 0);display: flex;cursor: pointer;align-items: center;justify-content: center;top: 14px;\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"id\":\"mtr-nps-review-form-2635005\",\"class\":\"drag mtr-nps-review-form design-field-column saved-field\",\"style\":\"margin: 0 auto; height: auto; width: 100%;\",\"data-form-type\":\"secondary\",\"data-submit-text\":\"Submit\",\"data-submit-text-color\":\"#171423\",\"data-submit-bg-color\":\"#cdccd9\",\"data-text-area-placeholder\":\"Enter your answer...\",\"data-text-area-required\":\"false\",\"data-review-form-background-color\":\"#f4f4f9\",\"data-review-form-text-color\":\"#171423\",\"data-submit-button-width\":\"20\",\"data-submit-button-height\":\"48\",\"data-submit-button-border-radius\":\"100\",\"data-submit-button-font-size\":\"16\",\"data-submit-button-font-family\":\"manrope\",\"data-submit-button-alignment\":\"start\",\"data-submit-button-font-weight\":\"normal\",\"data-submit-button-font-style\":\"normal\",\"data-submit-button-font-underline\":\"none\"}","image":null,"image_type":null,"valid_image":null}},"show_banner":"30 days","display_nps_multiple":false,"request_interval":"24 hours","request_nps_multiple":true,"display_second_screen":true,"thanks_message":"Thank you for your feedback!","enabled":false},"verification_widget":{"verification_widget_form":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-11695\",\"src\":\"https://s3.amazonaws.com/maitre-rh/designer_settings/images/000/000/698/large/logo_%282%29.png?1685732969\",\"alt\":\"\",\"draggable\":\"false\",\"style\":\"width: 35%; height: auto; border-radius: 0px;\",\"data-imagename\":\"logo.png\"}],\"class\":\"image-link\",\"id\":\"image-link-11695\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"image-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"id\":\"image-div-11695\",\"style\":\"width: 100%; height: auto; border-radius: 58px 58px 0px 0px;\"}","image":"https://s3.amazonaws.com/maitre-rh/design_elements/images/000/035/132/large/data?1739980373","image_type":"image/png","valid_image":true},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-263500\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 25px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Enter Verification Code\",\"children\":[],\"id\":\"text-input-186676\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-size: 22px; color: #171423; overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-186676\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-263501\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 25px;\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"We sent you a 6 digit code\",\"children\":[],\"id\":\"text-input-186677\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 20px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-186677\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-263502\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 25px;\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"drag mtr-nps-sms-fields design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"mtr-nps-sms-fields-14535\",\"data-form-heading\":\"We sent you a 6 digit code\",\"data-verify-text\":\"Verify Phone Number\",\"data-email-verify-text\":\"Verify email\",\"data-resend-text\":\"Resend Code\",\"data-form-font-family\":\"quicksand\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f4f4f9\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"8\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"open_sans\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#171423\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#cdccd9\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: Quicksand, sans-serif; border-radius: 0px;height: auto; display: inline-flex;\"}","image":null,"image_type":null,"valid_image":null}},"signup_verification_widget_form":{"1":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"A\",\"children\":[{\"tagName\":\"IMG\",\"text\":\"\",\"children\":[],\"class\":\"image-tag\",\"id\":\"image-tag-1169523\",\"src\":\"https://s3.amazonaws.com/maitre-rh/designer_settings/images/000/000/698/large/logo_%282%29.png?1685732969\",\"alt\":\"\",\"draggable\":\"false\",\"style\":\"width: 35%; height: auto; border-radius: 0px;\",\"data-imagename\":\"logo.png\"}],\"class\":\"image-link\",\"id\":\"image-link-1169523\",\"data-href\":\"https://google.com\",\"target\":\"\",\"rel\":\"noopener noreferrer\",\"style\":\"width: 100%; height: 100%; justify-content: center; display: flex;\",\"draggable\":\"false\"}],\"class\":\"image-field drag design-field-column saved-field first-el\",\"draggable\":\"false\",\"id\":\"image-div-1169523\",\"style\":\"width: 100%; height: auto; border-radius: 58px 58px 0px 0px;\"}","image":"https://s3.amazonaws.com/maitre-rh/design_elements/images/000/035/238/large/data?1739980381","image_type":"image/png","valid_image":true},"2":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-26350023\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 25px;\"}","image":null,"image_type":null,"valid_image":null},"3":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"Enter Verification Code\",\"children\":[],\"id\":\"text-input-18667623\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-size: 22px; color: #171423; overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content; font-weight: bold;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-18667623\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#fff\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"4":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-26350123\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 25px;\"}","image":null,"image_type":null,"valid_image":null},"5":{"element_attributes":"{\"tagName\":\"DIV\",\"children\":[{\"tagName\":\"P\",\"text\":\"We sent you a 6 digit code\",\"children\":[],\"id\":\"text-input-18667723\",\"data-text-color-value\":\"#4d566c\",\"style\":\"margin: 0px; padding: 0px; font-weight: 500; font-size: 20px; color: rgb(77, 86, 108); overflow-wrap: break-word; width: 90%; text-align: center; min-width: fit-content;\"}],\"class\":\"text-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"text-div-18667723\",\"data-font-family-code\":\"quicksand\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: fit-content; padding: 4px; border-radius: 0px;\"}","image":null,"image_type":null,"valid_image":null},"6":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"spacer-field drag design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"spacer-div-26350223\",\"data-bg-color-value\":\"#00000000\",\"style\":\"height: 25px;\"}","image":null,"image_type":null,"valid_image":null},"7":{"element_attributes":"{\"tagName\":\"DIV\",\"text\":\"\",\"children\":[],\"class\":\"drag mtr-nps-sms-fields design-field-column saved-field\",\"draggable\":\"false\",\"id\":\"mtr-nps-sms-fields-1453523\",\"data-form-heading\":\"We sent you a 6 digit code\",\"data-verify-text\":\"Verify Phone Number\",\"data-email-verify-text\":\"Verify email\",\"data-resend-text\":\"Resend Code\",\"data-form-font-family\":\"quicksand\",\"data-form-font-size\":\"14\",\"data-form-text-color\":\"#171423\",\"data-form-height\":\"32\",\"data-form-background-color\":\"#f4f4f9\",\"data-form-border-color\":\"#cccccc\",\"data-form-border-radius\":\"8\",\"data-form-border-width\":\"0\",\"data-form-name-placeholder\":\"Name\",\"data-form-email-placeholder\":\"Email\",\"data-form-phone-number-placeholder\":\"Phone Number\",\"data-form-crypto-wallet-placeholder\":\"Crypto Wallet\",\"data-form-country-code\":\"+1\",\"data-form-name\":\"true\",\"data-submit-font-family\":\"open_sans\",\"data-submit-font-size\":\"14\",\"data-submit-text-color\":\"#171423\",\"data-submit-height\":\"32\",\"data-submit-background-color\":\"#cdccd9\",\"data-submit-border-color\":\"#cccccc\",\"data-submit-border-radius\":\"25\",\"data-submit-border-width\":\"0\",\"data-form-submit-placeholder\":\"Join Now\",\"data-submit-redirect-url\":\"https://referralhero.com/\",\"data-submit-enable-redirect\":\"false\",\"style\":\"font-family: Quicksand, sans-serif; border-radius: 0px;height: auto; display: inline-flex;\"}","image":null,"image_type":null,"valid_image":null}}},"sharing":{"redirection":{"enable":null,"url":null},"option_redirection":{"enable":null,"option_data":null},"popup":false,"popup_on_everypage":false,"thanks_msg":"Thank you for signing up","open_if_signed_up":true,"header":{"text":"Congratulations, you are in!","color":"#2b2f3e"},"subheader":{"text":null,"color":"#666"},"people_referred":{"show":true,"text":"Your referrals"},"position":{"show":true,"text":"Your position","ordinal":true},"motivation_prompt":{"show":false,"text":null,"motivation_value":2},"instructions":"Invite your friends with your unique referral link 👇","referral_link":{"copy_button":"Copy","copied_button":"Copied"},"rotating_referral_link":null,"referral_link_field_present":true,"my_referrals":{"enable":false,"header":"My Referrals","empty_referrals_message":"Start sharing. Your referrals will appear here.","name_header":"Name","unique_identifier_header":"Email","signup_date_header":"Signup Date","status_header":"Status","confirmed_date_header":"Confirmed Date","pending_status_header":"Pending","confirmed_status_header":"Confirmed","unconfirmed_status_header":"Unconfirmed"},"verification":{"enabled":false,"text_email":"Don't forget to confirm your email","reminder_email":"Your email hasn't been verified yet.\u003cbr\u003eCheck your inbox - including the junk folder - and if you don't find it click the link below to resend it.","resend_email":"Resend confirmation email","resending_email":"Sending email...","email_replace":"confirm your email","email_resent":"Email has been sent. Check your inbox.","sms_confirmation":false,"text_sms":"Don't forget to confirm your email","reminder_sms":"Your phone number hasn't been verified yet.\u003cbr\u003eCheck your phone and if you don't find it click the link below to resend the verification SMS.","resend_sms":"Resend verification SMS","resending_sms":"Sending sms...","sms_resent":"SMS has been sent. Check your phone.","crypto_wallet_confirmation":false,"kakao_talk_enabled":false,"qr_code_enabled":true},"socials":{"twitter":{"show":true,"message":"I just signed up on this awesome website! %referral_link%"},"facebook":{"show":true},"facebook_messenger":{"show":true},"email":{"show":true,"message":"%referral_link%","subject":"Check this out"},"whatsapp":{"show":true,"message":"You should really check this out %referral_link%"},"linkedin":{"show":true,"message":""},"reddit":{"show":true,"message":""},"telegram":{"show":true,"message":""},"line":{"show":true,"message":""},"sms":{"show":true,"message":"You should really check this out %referral_link%","qr_code_header":"Scan this QR code to share via SMS"},"pinterest":{"show":true,"message":"You should really check this out %referral_link%","image":""},"design":{"size":"48px","roundness":"5px","space":"5px","order":"facebook twitter whatsapp facebook_messenger email linkedin reddit telegram line sms pinterest"},"kakao_talk":{"show":true,"title":null,"message":"You should really check this out %referral_link%","image":""}},"quick_add_form":{"show":false},"leaderboard":{"show":false,"position":"Position","subscriber":"Subscriber","points":"Points","footnote":"1 referral = 1 point"},"rewards":{"show":true,"header":"This is what you can win","show_images":true,"list":[],"unlocked":"UNLOCKED!","unlocked_color":"#3d85c6","rewards_color":"#3d85c6","signup_bonus":"Sign-up bonus","test_names":[],"reward_data":[],"referrals_rewards_header":"Referrals"}},"alerts":{"subscriber_not_found":"No subscriber exists with the provided unique identifier.","subscriber_already_promoted":"You have already been promoted.","form_incomplete":"Please complete all required fields before continuing.","server_problem":"We're currently experiencing some technical difficulties with our server. Please report this issue to the administrator and try again later.","failed_recaptcha":null,"terms_conditions":"You must accept the Terms \u0026 Conditions","invalid_phone_number":null}}};
        
        var config = {};  
        var global_config = config;  
        g.generate.stylesheet("@import url('https://fonts.googleapis.com/css2?family=Caveat&family=Codystar&family=Comic+Neue&family=Covered+By+Your+Grace&family=Dancing+Script&family=Edu+SA+Beginner&family=Finger+Paint&family=Great+Vibes&family=Gurajada&family=Hi+Melody&family=IM+Fell+DW+Pica&family=Josefin+Sans&family=Kalam&family=Lato&family=Meddon&family=Metamorphous&family=Montez&family=Nova+Mono&family=Nunito&family=Open+Sans&family=Orbitron&family=Oregano&family=Oswald&family=Over+the+Rainbow&family=Pacifico&family=Permanent+Marker&family=Quicksand&family=Roboto&family=Rubik+Gemstones&family=Rubik+Vinyl&family=Sedgwick+Ave&family=Shadows+Into+Light&family=Silkscreen&family=Slackey&family=Sniglet&family=Source+Code+Pro&family=Space+Mono&family=Spectral&family=Sunflower&family=Supermercado+One&family=Montserrat:wght@400;500;700&family=Unbounded&family=Zeyada&display=swap');");
        g.generate.linkStylesheet("https://fonts.googleapis.com/icon?family=Material+Icons");  
        g.generate.stylesheet("  #mtr-optin-form *, #thankyou-widget *, #horizontal-banner *, #horizontal-banner-signup *, #horizontal-banner-confirmation *, #mtr-sharing-screen *,\n  #mtr-optin-form *, #thankyou-widget *, #horizontal-banner *, #horizontal-banner-signup *, #horizontal-banner-confirmation *, #mtr-sharing-screen *:before,\n  #mtr-optin-form *, #thankyou-widget *, #horizontal-banner *, #horizontal-banner-signup *, #horizontal-banner-confirmation *, #mtr-sharing-screen *:after {\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box\n  }\n  \n  #template-form{\n    align-items: center;\n    margin: 0 auto;\n  }\n  \n  body.noscroll {\n    overflow: hidden !important;\n    overflow-y: hidden !important;\n  }\n  \n  #mtr-optin-form, #thankyou-widget, #horizontal-banner, #horizontal-banner-signup, #horizontal-banner-confirmation, #mtr-sharing-screen {\n    font-size: 18px;\n  }\n  \n  #mtr-optin-form ,#thankyou-widget, #horizontal-banner, #horizontal-banner-signup, #horizontal-banner-confirmation, #mtr-sharing-screen {\n    position: relative;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font-family: inherit;\n    vertical-align: baseline;\n    text-transform: initial;\n    color: inherit;\n    color: #000;\n    outline: 0;\n    line-height: 1.2;\n    list-style: none;\n    text-rendering: optimizeLegibility;\n    \n    -webkit-font-smoothing: antialiased !important;\n    transition: All 0.25s ease;\n    -webkit-transition:All 0.25s ease;\n    -moz-transition:All 0.25s ease;\n    -o-transition:All 0.25s ease;\n    letter-spacing: normal;\n  }\n  \n  #mtr-optin-form *,#thankyou-widget *, #horizontal-banner *, #horizontal-banner-signup *, #horizontal-banner-confirmation *, #mtr-sharing-screen *{\n    float: none;\n  }\n  \n  #mtr-quickadd-optin-form {\n    width: 100%\n  }\n  \n  /*Floating button*/\n  #maitre-floating-button {\n    z-index: 99999;\n    border-radius: 5px;\n    font-size: 1rem;\n    padding: 0.75rem 1.2rem;\n    text-align: center;\n    font-weight: 700;\n    border: none;\n    letter-spacing: 0.5px;\n    color: #fff;\n    position: fixed;\n    box-shadow: 0px 0px 12px rgba(0, 0, 0, .18);\n    bottom: 0.7em;\n    -webkit-animation-name: mtr-slideInUp;\n    animation-name: mtr-slideInUp;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: initial;\n    animation-fill-mode: initial;\n    -webkit-transition-delay: 0s, 500ms;\n      -moz-transition-delay: 0s, 500ms;\n      -o-transition-delay: 0s, 500ms;\n      transition-delay: 0s, 500ms;\n  }\n  \n  #maitre-floating-button.left {\n    left: 0.7em;\n  }\n  \n  #maitre-floating-button.right {\n    right: 0.7em;\n  }\n  \n  #maitre-floating-button.center {\n    left: 50%;\n    transform: translateX(-50%);\n    -webkit-animation-name: mtr-slideInUpCenter;\n    animation-name: mtr-slideInUpCenter;\n  }\n  \n  #maitre-floating-button:hover {\n    opacity: 0.8;\n    cursor: pointer;\n  }\n  \n  /*Inline Button*/\n  \n  #maitre-inline-button {\n    z-index: 99999;\n    border-radius: 5px;\n    font-size: 1rem;\n    padding: 0.75rem 1.2rem;\n    text-align: center;\n    font-weight: 700;\n    border: none;\n    letter-spacing: 0.5px;\n    color: #fff;\n    box-shadow: 0px 0px 12px rgba(0, 0, 0, .18);\n  }\n  \n  #maitre-inline-button:hover {\n    opacity: 0.8;\n    cursor: pointer;\n  }\n  \n  \n  /*Form*/\n  #thankyou-widget, #horizontal-banner, #horizontal-banner-signup, #horizontal-banner-confirmation {\n    /*width: 539px;\n    max-width: 970px;*/\n    width: 95%;\n    max-width: 550px;\n    margin: 0 auto;\n    text-shadow: 0 0 0;\n    box-shadow: 0 0px 12px rgba(0, 0, 0, .18);\n    border-radius: 5px;\n  }\n\n  #mtr-optin-form{\n    /*width: 539px;\n    max-width: 970px;*/\n    width: 95%;\n    max-width: 550px;\n    margin: 0 auto;\n    text-shadow: 0 0 0;\n    border-radius: 5px;\n  }\n\n  \n  #thankyou-form{\n    margin: 0 auto;\n  }\n  \n  #mtr-form, #thankyou-form {\n    border-top-style: solid;\n    border-top-width: 4px;\n    border-radius: 5px;\n    width: 100%;\n    text-align: center;\n  }\n  \n  .design-field-column {\n    position: relative;\n    width:100%; \n    height:80px;\n    display:flex;\n    flex-direction: column; \n    align-items:center; \n    justify-content:center;\n    background:transparent;  \n  }\n\n\n  .mtr-share-link-field{\n    height:auto !important;\n  }\n  \n  .design-field-row {\n    position: relative;\n    width:100%; \n    height:80px;\n    display:flex;\n    flex-direction: row; \n    align-items:center; \n    justify-content:center;\n    margin-bottom:10px;\n    background:transparent;  \n  }\n  \n  \n  .image-link{\n    line-height:0 !important;\n  }\n  \n  .d-inline-flex{\n    display:inline-flex;\n  }\n  \n  #mtr-form-cover {\n    width: 100%;\n    padding-bottom: 60%;\n    height: 0;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center center;\n  }\n  \n  #mtr-form-header {\n    padding: 0.7em 0.8em 0;\n    font-weight: 700;\n    font-size: 1.7em;\n    color: #2b2f3e;\n    overflow-wrap: break-word;\n    text-align: center;\n  }\n  \n  .mtr-form-fields-banner{\n    padding: 0% !important;\n    height: 100% !important;\n  }\n  \n  .banner-submit-button{\n    border-style: solid !important;\n  }\n  \n  .mtr-form-fields-contaner{\n    display: flex;\n    flex-direction: row;\n    gap: 10px;\n  }\n  \n  #mtr-form-fields, .mtr-form-fields {\n    padding: 12px 12px;\n    /*margin-bottom: 10px;*/\n    width: 100%;\n  }\n  \n  #mtr-form-fields .mtr-form-field {\n    /* margin-bottom: 15px; */\n    width: 100%;\n    display: flex;\n  }\n  \n  #mtr-form-fields input, .mtr-form-fields input {\n    border: solid #ccc 2px;\n    border-radius: 5px;\n    padding: 0.5em 0.8em;\n    width: 100%;\n    font-size: 1em;\n    box-shadow: none;\n    background: #f1f1f1;\n    color: #2b2f3e;\n    text-align: left;\n    outline: 0;\n    height: auto;\n    box-sizing: border-box;\n  }\n  \n  #mtr-form-fields select {\n    border: solid #ccc 2px;\n    border-radius: 5px;\n    padding: 0em 0.6em;\n    width: 100%;\n    font-size: 1em;\n    box-shadow: none;\n    background: #f1f1f1;\n    color: #2b2f3e;\n    text-align: left;\n    outline: 0;\n    height: auto;\n  }\n  .mtr-rewards-list .owl-item{\n    float:left !important;\n  }\n  \n  #mtr-form-fields select option {\n   \n  }\n  \n  .mtr-flex {\n    display: flex;\n  }\n  \n  .phone-num-row {\n    gap: 4px;\n  }\n  \n  #mtr-form-field-crypto-wallet-provider {\n    position: relative;\n  }\n  \n  #mtr-form-field-crypto-wallet-provider a:hover {\n    background-color: #ddd;\n  }\n  \n  #mtr-form-provider-connect {\n    width: 100%;\n    border-radius: 5px;\n    font-size: 1em;\n    padding: 0.5em 0.8em;\n    text-align: left;\n    border: solid #ccc 2px;\n    letter-spacing: 0.5px;\n    color: black;\n  }\n  \n  #provider-list {\n    display: none;\n    position: absolute;\n    background-color: #f1f1f1;\n    width: 100%;\n    overflow: auto;\n    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n    z-index: 1;\n    margin-top: -15px;\n  }\n  \n  #provider-list a {\n    color: black;\n    padding: 12px 16px;\n    text-decoration: none;\n    display: block;\n    cursor: pointer;\n    text-align:center;\n    border-bottom:solid 1px #ccc;\n  }\n  \n  #provider-list.show {\n    display: block;\n  }\n  \n  #mtr-form-fields input::placeholder, #mtr-form-fields input:-ms-input-placeholder, #mtr-form-fields input::-ms-input-placeholder {\n    color: #555;\n  }\n  \n  #mtr-form-submit-button, #mtr-quick-add-form-submit-button {\n    line-height: 1.2;\n    width: 100%;\n    border-radius: 5px;\n    font-size: 1em;\n    padding: 0.75em 0;\n    text-align: center;\n    font-weight: 700;\n    border: none;\n    letter-spacing: 0.5px;\n    color: #fff;\n    justify-content: center;\n    align-items: center;\n    display: flex;\n    padding: 0;\n  }\n\n  #mtr-otp-input::placeholder {\n    font-size: 14px !important;\n    font-weight: normal !important;\n  }\n  \n  #mtr-crypto-provider-connect{\n    width: 90%;\n    border-radius: 5px;\n    font-size: 1em;\n    padding: 0.75em 0;\n    text-align: center;\n    font-weight: 700;\n    border: none;\n    letter-spacing: 0.5px;\n    color: #fff;\n  }\n  \n  #mtr-form-submit-button:hover, #mtr-quick-add-form-submit-button:hover {\n    opacity: 0.9;\n    cursor: pointer;\n  }\n\n  .mtr-address-suggestions{\n    position: absolute;\n    background-color: #fff;\n    max-height: 200px;\n    overflow-y: auto;\n    margin-top: 40px;\n    z-index: 999;\n    border-radius: 6px;\n    border: 1px solid #ccc;\n  }\n\n  .mtr-address-suggestion{\n    padding: 8px;\n    cursor: pointer;\n    transition: background 0.2s ease-in-out;\n    border-radius: 4px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  \n  #mtr-form-field-tc, #mtr-form-field-tc-2 {\n    padding: 0.4em 0;\n  }\n  \n  #mtr-form-tc-checkbox, #mtr-form-tc-checkbox-2 {\n    position: absolute;\n    opacity: 0;\n    z-index: 2;\n    width: 1.5em !important;\n    height: 1.5em !important;\n  }\n  \n  #mtr-form-tc-text, #mtr-form-tc-text-2 {\n    position: relative;\n    display: inline-block;\n    padding: 0 0 0 2.5em;\n    min-height: 1.5em;\n    line-height: 1.5;\n    cursor: pointer;\n    pointer-events: auto !important;\n    font-size: 12px;\n    text-transform: none;\n    text-align: left;\n  }\n  \n  #mtr-form-tc-link {\n    text-decoration: none;\n    display: inline-block;\n    margin-left: 0.5em;\n  }\n  \n  #mtr-form-tc-text::before, #mtr-form-tc-text::after, #mtr-form-tc-text-2::before, #mtr-form-tc-text-2::after {\n    transition: .25s all ease;\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: block;\n    width: 1.5em;\n    height: 1.5em;\n  }\n  \n  #mtr-form-tc-text::before, #mtr-form-tc-text-2::before {\n    content: \" \";\n    border: 2px solid #bdc3c7;\n    border-radius: 20%;\n  }\n  \n  #mtr-form-tc-text::after, #mtr-form-tc-text-2::after {\n    line-height: 1.5;\n    text-align: center;\n  }\n  \n  #mtr-form-tc-checkbox:checked + label::before, #mtr-form-tc-checkbox-2:checked + label::before {\n    /* background: #fff; */\n    border-color: #fff;\n  }\n  \n  #mtr-form-tc-checkbox:checked + label::after, #mtr-form-tc-checkbox-2:checked + label::after {\n    color: #2c3e50;\n    content: \"\\2714\";\n    -webkit-transform: scale(1);\n    transform: scale(1);\n  }\n  \n  #mtr-form-status-container {\n    padding-bottom: 0em;\n    text-align: center;\n    margin-top: 15px;\n  }\n  \n  #mtr-form-status {\n    font-size: 0.8em;\n    color: #666666;\n    margin-top: 15px;\n  }\n  \n  \n  /*Branding*/\n  #mtr-form-branding-container, #mtr-sharing-branding-container {\n    padding: 0.5em 0;\n    background-color: #f5f5f5;\n    border-radius: 0 0 5px 5px;\n    text-align: center;\n  }\n  \n  #mtr-form-branding-container .mtr-form-powered-by, #mtr-sharing-branding-container .mtr-form-powered-by {\n    font-size: 0.65em;\n    color: #666;\n    font-weight: 400;\n    text-decoration: none;\n    line-height: 1;\n  }\n  \n  #mtr-form-branding-container .mtr-form-powered-by strong, #mtr-sharing-branding-container .mtr-form-powered-by strong {\n    color: #666;\n  }\n  \n  \n  /*Sharing screen*/\n  #mtr-sharing-screen {\n    width: 95%;\n    max-width: 680px;\n    margin: 0 auto;\n    border-radius: 5px;\n    border-top-style: solid;\n    border-top-width: 4px;\n  }\n  \n  #mtr-sharing-body {\n    padding: 5% 0 0;\n    text-align: center;\n  }\n  \n  .mtr-sharing-verification-container {\n    padding: 0.55em;\n    background: rgba(77, 86, 108, 0.05);\n    background-repeat: no-repeat;\n    background-size: 40px;\n    background-position: left 0.75em center;\n    text-align: center;\n    display: flex;\n    justify-content: center;\n    align-content: center;\n    flex-wrap: wrap;\n    min-height: 20px;\n  }\n  \n  .mtr-sharing-verification-container.maitre-reminder {\n    text-align: left;\n    flex-direction: column;\n  }\n  \n  .mtr-sharing-verification-text {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n  \n  .mtr-sharing-verification {\n    color: #4d566c;\n    font-weight: 700;\n    font-size: 0.9em;\n  }\n  \n  .mtr-sharing-verification a {\n    color: #222;\n    text-decoration: underline;\n  }\n  \n  .mtr-sharing-verification-resend-email, .mtr-sharing-verification-resend-sms {\n    font-size: 0.9em;\n    line-height: 1.5;\n    color: #4d566c;\n  }\n  \n  #mtr-optin-verification-container {\n    background: rgba(77, 86, 108, 0.05);\n    background-repeat: no-repeat;\n    background-size: auto 80%;\n    background-position: left 0.75em center;\n    text-align: center;\n  }\n  \n  #mtr-sharing-screen .mtr-sharing-body-container {\n    display: none;\n  }\n  \n  #mtr-sharing-screen .mtr-sharing-body-container.active {\n    display: block;\n  }\n  \n  #mtr-sharing-header {\n    margin: 0.5em 0 0;\n    font-weight: 700;\n    font-size: 2em;\n    color: #2b2f3e;\n  }\n  \n  #mtr-sharing-subheader {\n    margin: 0.2em 0 1em;\n    font-weight: 400;\n    font-size: 1.3em;\n    color: #71747b;\n  }\n  \n  /* My Referrals */\n  \n  .myreferrals-table{\n    width: 100%;\n  }\n  \n  .myrewards-table{\n    width: 100%;\n    overflow-x: auto;\n  }\n  \n  #mtr-sharing-myreferrals-header {\n    font-size: 1.3em;\n    font-weight: 700;\n    color: #2b2f3e;\n  }\n  \n  #mtr-myreferrals {\n    padding: 0 0.90em 1.5em;\n    margin-top: 1.5em;\n  }\n\n  #mobile-screen .mtr-sharing-social{\n    height: 28px;\n    width: 28px;\n  }\n\n  #mobile-screen .mtr-sharing-socials-container{\n    display:grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  \n  #mobile-screen .mtr-sharing-social-reward{\n    margin: 0px 2px !important;\n    text-wrap: nowrap;\n  }\n\n  #mobile-screen .mtr-sharing-social-outer-div{\n    min-width: 140px !important;\n  }\n\n  #mobile-screen .memoji-avatar{\n    width: 60px;\n  }\n  \n  \n  .mtr-mr-table {\n    width: 100%;\n    max-width: 100%;\n    table-layout: auto;\n    color: #323c4b;\n    border-spacing: 0px;\n    margin-top: 25px;\n    padding: 0.4em;\n  }\n  \n  .mtr-mr-table thead th {\n    background-color: #ececec;\n  }\n  \n  .mtr-mr-table thead th, .mtr-mr-table tbody td {\n    padding: 0.90em 0.3em;\n    text-align: center;\n    border-bottom: solid #eff3f7 1px !important;\n    font-size: 0.75em;\n    border-top: none !important;\n    border-left: none !important;\n    border-right: none !important;\n    vertical-align: middle;\n  }\n  .mtr-mr-table tbody td {\n    background: none !important;\n  }\n  \n  .mtr-mr-table tbody td div{\n    line-height:16px;\n    margin: 0;\n  }\n  \n  .mtr-mr-table tbody {\n    background-color: #FFFFFF !important;\n  }\n  \n  .mtr-mr-table-body tr td{\n    font-size: 0.85em;\n  }\n  \n  .mtr-mr-table-body tr td::after{\n    border: transparent !important;\n  }\n  \n  .mtr-mr-table-header tr th{\n    font-size: 0.85em;\n  }\n  \n  .mtr-mr-table-header tr th::after{\n    border: transparent !important;\n  }\n  \n  .mtr-referral-status-unconfirmed{\n    background-color: #777;\n    padding: 3px 5px;\n    border-radius: 4px;\n    color: white;\n    display: inline-block;\n    white-space: nowrap;\n  }\n  .mtr-referral-status-confirmed{\n    background-color: #5cb85c;\n    padding: 3px 5px;\n    border-radius: 4px;\n    color: white;\n    display: inline-block;\n  }\n  .mtr-referral-status-pending{\n    background-color: #d9534f;\n    padding: 3px 5px;\n    border-radius: 4px;\n    color: white;\n    display: inline-block;\n  }\n  .mtre-my-rewards-status-label{\n    padding: 3px 5px;\n    border-radius: 4px;\n    color: white;\n    display: inline-block;\n    background-color: #5cb85c;\n  }\n  .my-referrals-pagination{\n    display: flex;\n    justify-content: center;\n    margin-top: 1em;\n  }\n  #my-referrals-pagination button{\n    margin-left: 0.5em;\n    padding: 0.2em;\n    background-color: white;\n    color: black;\n  }\n  #my-referrals-pagination .mtr-mr-page-active{\n    font-weight: 1000;\n  }\n  \n  #p1{\n    margin-left: 0.5em;\n    padding: 0.2em;\n    background-color: white;\n    color: black;\n  }\n  \n  .empty-referral-message{\n    margin-top: 20px;\n    font-size: 1.2em;\n  \n  }\n  \n  #mtr-sharing-leaderboard,\n  .mtr-sharing-leaderboard {\n    padding: 3% 4%;\n  }\n  \n  #mtr-lb-table,\n  .mtr-lb-table {\n    width: 100%;\n    max-width: 100%;\n    table-layout: auto;\n    color: #323c4b;\n    background-color: #fff;\n  }\n  \n  #mtr-lb-table-div{\n    width: 100%;\n    overflow: auto;\n    -ms-overflow-style: none;  /* IE and Edge */\n    scrollbar-width: none;  /* Firefox */\n  }\n  \n  #mtr-lb-table-div::-webkit-scrollbar {\n      display: none;\n  }\n  \n  #mtr-lb-table thead th, #mtr-lb-table tbody td,\n  .mtr-lb-table thead th, .mtr-lb-table tbody td  {\n    padding: 0.90em 0.2em;\n    text-align: center;\n    font-size: 0.9em;\n    /* font-weight: 400; */\n    /* max-width: 0; */\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n  }\n\n  .mtr-table-tag {\n    border-collapse: collapse !important;\n  }\n\n  .button-link:hover {\n    opacity: 0.9;\n    cursor: pointer;\n  }\n  \n  .mtr-lb-table thead th {\n    /*background-color: rgba(77, 86, 108, 0.9);*/\n    font-weight: 400;\n    border-bottom: 2px solid #eff3f7 !important;\n  }\n  \n  #mtr-lb-table thead th {\n    /*background-color: rgba(77, 86, 108, 0.9);*/\n    font-weight: 700;\n    border-bottom: 2px solid #eff3f7;\n  }\n  \n  #mtr-lb-table thead th:first-child,\n  .mtr-lb-table thead th:first-child {\n    border-radius: 5px 0 0 0;\n  }\n  \n  #mtr-lb-table thead th:last-child,\n  .mtr-lb-table thead th:last-child {\n    border-radius: 0 5px 0 0;\n  }\n  \n  #mtr-lb-table tbody td,\n  .mtr-lb-table tbody td {\n    border-bottom: solid #eff3f7 1px !important;\n    /* background-color: #fff; */\n  }\n  \n  #mtr-lb-table .mtr-lb-subscriber,\n  .mtr-lb-table .mtr-lb-subscriber {\n    width: 50%;\n  }\n  \n  #mtr-lb-table .mtr-lb-subscriber.sweepstake,\n  .mtr-lb-table .mtr-lb-subscriber.sweepstake {\n    width: 70%;\n  }\n  \n  .lb-avatar{\n    border: 3px solid #0000;\n    border-radius: 69px;\n    /* font-size: 17px; */\n    font-weight: 800;\n    display: inline-block;\n    min-width: 35px;\n    min-height: 35px;\n    line-height: 30px;\n  }\n  .avatar-subscriber{\n    background-color: #69e9f4;\n  }\n  .avatar-first{\n    background-color: #64a9a9;\n  }\n  .avatar-second{\n    background-color: #a4b0bd;\n  }\n  .avatar-third{\n    background-color: #6694c7;\n  }\n\n  .bg-round-position{\n    border: 3px solid #0000;\n    border-radius: 69px;\n    /* font-size: 17px; */\n    font-weight: 800;\n    display: inline-block;\n    min-width: 35px;\n    min-height: 35px;\n    line-height: 30px;\n  }\n\n  .stats-outer-div{\n    padding: 0.75rem;\n    border-radius: 0.5rem;\n    background: #d8d7dd;\n  }\n  \n  #mtr-lb-table .mtr-lb-position,\n  .mtr-lb-table .mtr-lb-position {\n    width: 20%;\n  }\n  \n  #mtr-lb-table .mtr-lb-points,\n  .mtr-lb-table .mtr-lb-points {\n    width: 20%;\n  }\n  \n  #mtr-lb-table tr.mtr-lb-highlight > td,\n  .mtr-lb-table tr.mtr-lb-highlight > td {\n    background-color: rgba(77, 86, 108, 0.05) !important;\n    /*font-weight: 700;*/\n  }\n  \n  #mtr-lb-footnote,\n  .mtr-lb-footnote {\n    text-align: center;\n    font-size: 0.6em;\n    margin: 0.45em 0 1.2rem;\n    color: #444;\n    text-transform: uppercase;\n  }\n  \n  #mtr-sharing-progress {\n    font-size: 1.15em;\n    color: #2b2f3e;\n  }\n  \n  #mtr-sharing-instructions {\n    font-size: 0.8em;\n    color: #555;\n    font-weight: 400;\n    line-height: 1.5;\n  }\n  \n  .mtr-sharing-subscriber-position-container {\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    /* -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column; */\n    -webkit-flex-wrap: nowrap;\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: stretch;\n    -ms-flex-line-pack: stretch;\n    align-content: stretch;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n    margin: 35px 0 0;\n  }\n  .mtr-sharing-people-position-container{\n    \n  }\n\n  .mtr-sharing-people-item-col{\n    height: 200px;\n    width: 200px;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    display: flex;\n\n  }\n\n  .mtr-sharing-people-item-row{\n    height: auto;\n    width: 100%;\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n    display: flex;\n    margin-bottom: 10px;\n  }\n\n  .rounded-stats-bg{ \n    display: flex;\n    align-items:center;\n    padding: 10px;\n    border-radius: 40px;\n  }\n  \n  .mtr-sharing-people-referred-container, .mtr-sharing-people-position-container {\n    -webkit-flex: 1 1 auto;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    -webkit-align-self: auto;\n    -ms-flex-item-align: auto;\n    align-self: auto;\n    flex: none;\n    text-transform: lowercase;\n  }\n  \n  .mtr-sharing-people-referred, .mtr-sharing-people-position {\n    font-size: 3em;\n    \n    line-height: 1;\n  }\n  \n  .mtr-sharing-people-referred-text, .mtr-sharing-people-position-text {\n    font-size: 1.1em;\n    line-height: 1;\n    text-transform: none;\n  }\n\n  .mtr-sharing-people-text-horizontal {\n    width: 100%;\n    text-align: left;\n    margin-left: 10px !important;\n  }\n\n  .mtr-sharing-people-text-vertical {\n    margin-top: 30px !important;\n    margin-bottom: 10px !important;\n  }\n  \n  .mtr-icon-size-vertical {\n    height: 40px !important;\n    width: 40px !important;\n  }\n  #mtr-sharing-socials-container\n  .mtr-sharing-socials-container, {\n    padding: 6% 4%;\n    background-color: #f5f5f5;\n    width: 106%;\n    left: -3%;\n    margin: 0 auto;\n    text-align: center;\n    border-radius: 5px;\n    /*background: #fff;*/\n    box-shadow: 0 4px 15px 7px rgba(0, 0, 0, 0.2) !important;\n    z-index: 2;\n  }\n  \n  #mtr-sharing-socials-container .mtr-sharing-social,\n  .mtr-sharing-socials-container .mtr-sharing-social {\n    width: 48px;\n    height: 48px;\n    border-radius: 5px;\n    display: inline-block;\n    margin: 5px;\n    cursor: pointer;\n    position: relative;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: 100% 100% !important;\n    background-color: #fff;\n  }\n\n  .mtr-sharing-social-new {\n    width: 36px;\n    height: 36px;\n    border-radius: 5px;\n    display: inline-block;\n    margin: 5px;\n    cursor: pointer;\n    position: relative;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: 100% 100% !important;\n    background-color: #fff;\n  }\n  \n  #mtr-sharing-socials-container .mtr-sharing-social:hover,\n  .mtr-sharing-socials-container .mtr-sharing-social:hover {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n  }\n  \n  #mtr-sharing-socials-actions-container,\n  .mtr-sharing-socials-actions-container {\n    padding: 1% 1%;\n    width: 60%;\n    left: -3%;\n    margin: 0 auto;\n    text-align: center;\n    flex-directions: column;\n  }\n  \n  #mtr-sharing-socials-actions-container .mtr-sharing-social,\n  .mtr-sharing-socials-actions-container .mtr-sharing-social {\n    width: 48px;\n    height: 48px;\n    margin: 5px;\n    cursor: pointer;\n    position: relative;\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: 100% 100% !important;\n    background-color: #fff;\n  }\n\n  .mtr-sharing-socials-actions-container .telegram-checked-icon {\n    background-size: 35px !important;\n  }\n  /*\n  #mtr-sharing-socials-actions-container .mtr-sharing-social:hover,\n  .mtr-sharing-socials-actions-container .mtr-sharing-social:hover {\n    transform: scale(1.1);\n    -webkit-transform: scale(1.1);\n  }\n  */\n  .mtr-sharing-social-action-container{\n    display: flex;\n    widget: 500px;\n    gap: 20px;\n    margin-top: 3px;\n    justify-content: space-between;\n  }\n  \n  .mtr-sharing-social-container {\n    display: flex;\n    align-items: center;\n    width: 100%;\n  }\n  \n  .mtr-sharing-social-action-background {\n    height: auto;\n    border-radius: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: #fff; \n  }\n  /*\n  .mtr-sharing-socials-actions-container .mtr-sharing-social-action-container:hover {\n    transform: scale(1.03);\n    -webkit-transform: scale(1.03);\n  }\n  */\n  \n  .mtr-social-actions-title{\n    font-size: 20px;\n    line-height: 1;\n    display: block;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    width: 100%;\n  }\n  .mtr-join-button-container{\n    margin-top: 20px;\n  }\n  \n  .mtr-join-button{\n    width: 50px;\n    color: white;\n    background: black;\n    padding: 10px;\n    border-radius: 10px;\n    font-weight: 600;\n  }\n  \n  #mtr-sharing-plain-container,\n  .mtr-sharing-plain-container {\n    min-width: fit-content;\n    border: 2px solid #ccc;\n    margin: 0;\n    width: 100%;\n    max-width: 550px;\n    padding: 0.25em;\n    border-radius: 12px;\n    background-color: #fff;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-flex-wrap: nowrap;\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n    -webkit-justify-content: flex-start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n    -webkit-align-content: flex-start;\n    -ms-flex-line-pack: start;\n    align-content: flex-start;\n    -webkit-align-items: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n  }\n\n  .mtr-sharing-outer-container{\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n    width: 95%;\n  }\n\n  .mtr-sharing-socials-container-hroizontal {\n    display: flex !important;\n    flex-direction: row;\n    justify-content: center;\n    flex-wrap: wrap;\n  }\n  \n  #mobile-screen .mtr-sharing-socials-container-hroizontal{\n    flex-direction: row;\n    align-items: center;\n  }\n\n  .mtr-sharing-upper-text-area{\n    max-width: 550px;\n  }\n  \n  #mtr-sharing-plain-link,\n  .mtr-sharing-plain-link {\n    font-size: 18px;\n    padding: 5px 5px 5px 5px;\n    color: #222;\n    background-color: transparent;\n    border: none ;\n    height: auto;\n    flex: 1;\n    -webkit-align-self: auto;\n    -ms-flex-item-align: auto;\n    align-self: auto;\n    outline: none;\n    display: flex;\n    align-items: center;\n    text-align: center;\n  }\n  \n  #mtr-sharing-link-button,\n  .mtr-sharing-link-button {\n    font-size: 12px !important;\n    text-transform: uppercase;\n    padding: 0 30px !important;\n    text-align: center;\n    font-weight: 700;\n    letter-spacing: 0.5px !important;\n    color: #000000;\n    -webkit-align-self: auto;\n    -ms-flex-item-align: auto;\n    align-self: auto;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1px;\n    margin-bottom: 0px !important;\n  }\n\n  .mtr-lb-div{\n    width: 100%;\n    border-radius: 20px;\n    border-width: 2px;\n  }\n  \n  #mtr-sharing-link-button:hover,\n  .mtr-sharing-link-button:hover {\n    cursor: pointer;\n  }\n  \n  \n  /*Tabs*/\n  #mtr-sharing-head {\n    border-radius: 7px 7px 0 0;\n    padding: 0 0.7rem;\n  }\n  \n  #mtr-sharing-head-ul {\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flex;\n    display: flex;\n    margin: 0 auto;\n    padding: 0;\n    width: 100%;\n    list-style: none;\n    -ms-box-orient: horizontal;\n    -ms-box-pack: center;\n    -webkit-flex-flow: row wrap;\n    -moz-flex-flow: row wrap;\n    -ms-flex-flow: row wrap;\n    flex-flow: row wrap;\n    -webkit-justify-content: center;\n    -moz-justify-content: center;\n    -ms-justify-content: center;\n    justify-content: center;\n  }\n  \n  #mtr-sharing-head-ul li {\n    flex: 1;\n    text-align: center;\n  }\n  \n  #mtr-sharing-head-ul li a {\n    display: block;\n    padding: 0.5em 0;\n    font-size: 0.9em;\n    text-transform: uppercase;\n    border-top: 4px solid transparent;\n    text-decoration: none;\n    background-color: #f5f5f5;\n    color: #888;\n  }\n  \n  #mtr-sharing-head-ul li a:hover {\n    color: #222;\n  }\n  \n  #mtr-sharing-head-ul li a.active {\n    background-color: #fff;\n    font-weight: 700;\n    margin-top: -8px;\n    padding-top: calc(0.5em + 8px);\n    border-radius: 4px 4px 0 0 !important;\n  }\n  \n  #mtr-sharing-head-ul li:first-child a {\n    border-radius: 5px 0 0 0;\n  }\n  \n  #mtr-sharing-head-ul li:last-child a {\n    border-radius: 0 5px 0 0;\n  }\n  \n  /*Email Preview*/\n  \n  #email_preview{\n    width: 80%;\n    margin: auto;\n    margin-top: 1em;\n    text-align: left;\n  }\n  #email_header{\n    margin-left: 0px;\n    font-weight: 2em;\n  }\n  #email_subject{\n    margin-top: 1em;\n    border: 2px solid #DCDCDC;\n    padding: 0.7em;\n    background-color: white;\n  }\n  #email_body_header{\n    margin-top: 1em;\n    margin-left: 0px;\n    font-weight: 2em;\n  }\n  #email_body{\n    margin-top: 1em;\n    border: 2px solid #DCDCDC;\n    padding: 1em;\n    background-color: white;\n  }\n  \n  /*Quick Add Referral*/\n  \n  #mtr-quickadd-form-subheader {\n    margin: 0.2em 0 em;\n    font-weight: 400;\n    font-size: 1em;\n    color: #71747b;\n  }\n  \n  /*QR Code*/\n  \n  #mtr-qr-code-container {\n    align-items: center;\n    justify-content: center;\n    font-family: Arial;\n  }\n  \n  #mtr-qr-code-image {\n    align-items: center;\n    justify-content: center;\n    margin-top: 1em;\n    display: flex;\n  }\n  \n  #mtr-qr-code-image-android{  \n  }\n  \n  #device-header{\n    margin-top: 1em;\n    font-size: 1.2em;\n  }\n  \n  #mtr-qr-code-image-ios{\n    margin-left :2em;\n  }\n  \n  #mtr-qr-code-header {\n    margin-top: 0.6em;\n    font-size: 1.2em;\n  }\n  \n  .mtr-qr-code-container{\n    width: 100%;\n  }\n  \n  .mtr-qr-code-field{\n    width: 100%;\n    display: flex;\n  }\n  \n  .mtr-qr-code-field img{\n    display: inline-block !important;\n  }\n  \n  /*Rewards*/\n  \n  #mtr-sharing-rewards-header {\n    font-size: 1.3em;\n    padding: 1.2em 0 0;\n    font-weight: 700;\n    color: #2b2f3e;\n  }\n  \n  .mtr-rewards {\n    padding-top: 15px;\n    width: 100%;\n    background-color: #f1f0f5;\n    border-radius: 18px;\n  }\n  \n  .mtr-rewards-list {\n    padding: 10px;\n    margin: 0;\n    list-style-type: none;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    border-radius: 20px;\n    margin-bottom: 15px;\n  }\n\n  .mtr-rewards-list.owl-carousel {\n    padding: 10px 0px 0px 10px !important;\n    margin-bottom: 12px !important;\n    margin-top: 35px;\n  }\n\n  .mtr-rewards.swiper-container {\n    overflow: hidden;\n  }\n\n  .swiper-prev{\n          background: #403754 !important;\n          width:28px !important;\n          height:28px !important;\n          border-radius: 8px;\n          top: 40px !important;\n          left: auto !important;\n          right: 200px !important;\n        }\n  .swiper-prev::after, .swiper-next::after{\n    font-size:12px !important;\n    color:#fff !important;\n    font-weight:bold !important;\n  }\n\n  .swiper-arrow {\n    font-weight: bold;\n    color: white !important;\n    font-size: 20px;\n  }\n\n  .swiper-prev-mobile{\n          background: #403754 !important;\n          width:28px !important;\n          height:28px !important;\n          border-radius: 8px;\n          top: 19px !important;\n          left: 0 !important;\n          right: 0 !important;\n          margin: 0 auto !important;\n          margin-left: 70px !important;\n        }\n  .swiper-prev-mobile::after{\n    font-size:12px !important;\n    color:#fff !important;\n    font-weight:bold !important;\n  }\n\n  .swiper-next{\n    background: #403754 !important;\n    width:28px !important;\n    height:28px !important;\n    border-radius: 8px;\n    top: 40px !important;\n    right: 38px !important;\n  }\n\n  .swiper-next-mobile{\n    background: #403754 !important;\n    width:28px !important;\n    height:28px !important;\n    border-radius: 8px;\n    top: 19px !important;\n    left: 0 !important;\n    right: 0 !important;\n    margin: 0 auto !important;\n    margin-right: 70px !important;\n  }\n\n  .swiper-next-mobile::after{\n    font-size:12px !important;\n    color:#fff !important;\n    font-weight:bold !important;\n  }\n\n.swiper-pagination{\n  width:auto;\n  text-align:right !important;\n  font-size: 18px;\n}\n\n.swiper-pagination-mobile{\n  width:auto;\n  text-align:center !important;\n  font-size: 18px;\n}\n\n  .mtr-rewards-list.swiper-wrapper{\n    margin-top: 36px;\n  }\n\n  #mobile-screen .mtr-reward-list-custom{\n    margin-right: 0px !important;\n  }\n\n  #mobile-screen .mtr-reward-li-progress-bar{\n    position: unset !important;\n    height: 0px !important;\n  }\n\n  #mobile-screen .reward-referrals-below-div{\n    display: none;\n  }\n\n  .mtr-below-reward-div {\n    padding: 6px 0px;\n    width: 100%;\n    margin-top: 5px;\n    border-radius: 10px;\n    background-color: #FFFFFF;\n    display: flex;\n    align-items: center;\n    flex-direction: column;\n    justify-content: center;\n  }\n\n  .mtr-below-reward-div-list {\n    padding: 6px 0px;\n    width: 100%;\n    margin-left: 5px;\n    border-radius: 10px;\n    background-color: #FFFFFF;\n    display: flex;\n    align-items: start;\n    flex-direction: column;\n    justify-content: space-between;\n  }\n  \n  .mtr-rewards-list .mtr-list-item-class {\n    /*flex: 1 0 50%;*/\n    margin: 5px;\n    border-radius: 5px;\n    height: auto;\n    /* min-height: 235px; */\n    background-color: transparent;\n    text-align: center;\n    vertical-align: top;\n    position: relative;\n  }\n  \n  .mtr-rewards-list li.mtr-no-image {\n    min-height: 80px;\n  }\n  \n  .mtr-rewards-list li.unlocked {\n    opacity: 0.4;\n    filter: alpha(opacity=40);\n  }\n  \n  .mtr-rewards-list li.unlocked .reward-ribbon {\n    position: absolute;\n    left: -5px; top: -5px;\n    z-index: 1;\n    overflow: hidden;\n    width: 75px; height: 75px;\n    text-align: right;\n  }\n  \n  .mtr-rewards-list li.unlocked .reward-ribbon span {\n    font-size: 10px;\n    font-weight: bold;\n    color: #FFF;\n    text-transform: uppercase;\n    text-align: center;\n    line-height: 20px;\n    transform: rotate(-45deg);\n    -webkit-transform: rotate(-45deg);\n    width: 100px;\n    display: block;\n    box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);\n    position: absolute;\n    top: 19px; left: -21px;\n  }\n  \n  .mtr-rewards-list li.unlocked .reward-ribbon span::before {\n    content: \"\";\n    position: absolute; left: 0px; top: 100%;\n    z-index: -1;\n    border-left: 3px solid #777;\n    border-right: 3px solid transparent;\n    border-bottom: 3px solid transparent;\n    border-top: 3px solid #777;\n  }\n  .mtr-rewards-list li.unlocked .reward-ribbon span::after {\n    content: \"\";\n    position: absolute; right: 0px; top: 100%;\n    z-index: -1;\n    border-left: 3px solid transparent;\n    border-right: 3px solid #777;\n    border-bottom: 3px solid transparent;\n    border-top: 3px solid #777;\n  }\n  \n  .mtr-rewards-list .mtr-list-item-class .reward-description {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-color: rgba(59,56,57,.8);\n    line-height: 1.3;\n    z-index: 2;\n    padding: 0.8em 0.5em;\n    color: #fff;\n    font-size: 0.85em;\n    overflow: hidden;\n    border-radius: 5px;\n    opacity: 0;\n  }\n\n  .mtr-text-field p{\n    display: block !important;\n  }\n\n  #mobile-device .reward-description {\n    width: 100%;\n    left: 19px;\n  }\n  #mobile-device .owl-item .reward-description {\n    left: 0;\n    top: 0;\n  }\n\n  #desktop-device .reward-description {\n    width: 97%;\n    left: 19px;\n  }\n\n  #desktop-device .owl-item .reward-description {\n    left: 0;\n    width: 100%;\n  }\n\n  .mtr-rewards-list-row .reward-description {\n    left: 0 !important;\n    width: 100% !important;\n  }\n   \n  #mobile-device .mtr-rewards{\n    padding-left: 4px !important;\n  }\n\n  #mobile-device .owl-item.active {\n    width: 235px !important;\n  }\n\n  .owl-item .reward-description {\n      margin-left: 0px !important;\n    }\n  \n  .mtr-rewards-list .mtr-list-item-class .reward-info {\n    vertical-align: middle;\n    border-radius: 10px;\n    color: #2b2f3e;\n    overflow: hidden;\n  }\n  \n  .mtr-rewards-list .mtr-list-item-class .reward-info h4 {\n    color: #2b2f3e;\n    font-size: 0.9em;\n    margin: 0.25em 0;\n    font-weight: 700;\n    padding: 0.5em 1em;\n  }\n  \n  .mtr-rewards-list .mtr-list-item-class .reward-info .mtr-p-tag {\n    color: #2b2f3e;\n    font-size: 0.75em;\n    line-height: 1.3;\n    font-weight: 400;\n    padding: 0 1em;\n    text-align: justify;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n  }\n  \n  .mtr-rewards-list .mtr-list-item-class .reward-info .reward-image {\n    background-color: #fff;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center center;\n    width: 100%;\n    padding-bottom: 60%;\n    height: auto;\n    border-radius: 5px 5px 0 0;\n    border-bottom: 1px solid rgba(77, 86, 108, 0.05);\n  }\n  \n  .reward-info-section{\n    width: 100%;\n  }\n  \n  .mtr-rewards-list .mtr-list-item-class .reward-referrals {\n    padding: 10px;\n    text-transform: uppercase;\n    color: #2b2f3e;\n    font-size: 15px;\n    font-weight: 600;\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n  }\n\n   .mtr-rewards-list .mtr-list-item-class .reward-referrals-inner-div {\n      width: 100%;\n      border-radius: 20px;\n      height: 42px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      overflow: hidden;\n  }\n  \n  .mtr-rewards-list li.mtr-no-image .reward-referrals {\n    border-radius: 5px 5px 0 0;\n  }\n  \n  .mtr-rewards-list .mtr-list-item-class:hover > .reward-description {\n    opacity: 1;\n  }\n\n  .mtr-rewards-list-row .reward-description{\n    margin-left: 0px !important;\n  }\n\n  /*custom classes*/\n\n  .mtr-header-4 {\n    margin: 0;\n  }\n\n  .mtr-p-tag {\n    display: block;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n  }\n\n\n  /*tailwind classes*/\n\n  .mtr-bg-c-gray-100{\n    background: #f1f0f5\n  }\n  .mtr-p-5{\n    padding: 1.25rem;\n  }\n  .mtr-radius20 {\n    border-radius: 20px;\n  }\n  .mtr-flex {\n    display: flex;\n  } \n  .mtr-items-center {\n    align-items: center;\n  }\n  .mtr-justify-between {\n    justify-content: space-between;\n  }\n  .mtr-justify-center {\n    justify-content: center;\n  }\n  .mtr-justify-start {\n    justify-content: flex-start;\n  }\n  .mtr-mt-3 {\n    margin-top: 0.75rem;\n  }\n  .mtr-mb-3 {\n    margin-bottom: 0.75rem;\n  }\n  .mtr-text-xs {\n    font-size: .75rem;\n    line-height: 1rem;\n  }\n  .mtr-text-c-gray-500 {\n    color: #5c5c5c;\n  }\n  .mtr-font-medium {\n    font-weight: 500;\n  }\n  .mtr-uppercase {\n    text-transform: uppercase;\n  }\n  .mtr-math-auto {\n    text-transform: math-auto;\n  }\n  .mtr-text-white {\n    --tw-text-opacity: 1;\n    color: rgb(255 255 255/var(--tw-text-opacity));\n  }\n  .mtr-py-1 {\n    padding-bottom: 0.25rem;\n    padding-top: 0.25rem;\n  }\n  .mtr-px-2\\.5 {\n    padding-left: 0.625rem;\n    padding-right: 0.625rem;\n  }\n  .mtr-rounded-full {\n    border-radius: 9999px;\n  }\n  .mtr-overflow-hidden {\n    overflow: hidden;\n  }\n  .mtr-overflow-auto {\n    overflow: auto;\n  }\n  .mtr-border {\n    border-width: 1px;\n  }\n  .mtr-ring-opacity-5 {\n    --tw-ring-opacity: 0.05;\n  }\n  @media (min-width: 640px){\n    .sm\\:mtr-rounded-lg {\n        border-radius: 0.5rem;\n    }\n    .sm\\:mtr-grid-cols-3 {\n        grid-template-columns: repeat(3,minmax(0,1fr));\n    }\n  }\n  .mtr-bg-c-purple-100 {\n    background: #403754 !important;\n  }\n  .mtr-bg-c-purple-300 {\n    background: #E7DDFC !important;\n  }\n  .mtr-border-b {\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n  }\n  .mtr-border-c-gray-200 {\n    border-color: #cdccd9 !important;\n  }\n  .mtr-grid {\n    display: grid;\n  }\n  .mtr-grid-cols-1 {\n    grid-template-columns: repeat(1,minmax(0,1fr));\n  }\n  .mtr-gap-x-4 {\n    -moz-column-gap: 0.1rem;\n    column-gap: 0.1rem;\n  }\n  .mtr-gap-y-4 {\n    row-gap: 0.1rem;\n  }\n  .mtr-referrals-table-email-content {\n    width: 170px;\n  }\n  @media (min-width: 640px){\n    .mtr-gap-x-4 {\n      -moz-column-gap: 1rem;\n      column-gap: 1rem;\n    }\n    .mtr-gap-y-4 {\n      row-gap: 1rem;\n    }\n    .mtr-referrals-table-email-content {\n      width: 82%;\n    }\n  }\n  \n  .mtr-col-span-1 {\n    grid-column: span 1/span 1;\n  }\n  .mtr-bg-white {\n    --tw-bg-opacity: 1;\n    background-color: rgb(255 255 255/var(--tw-bg-opacity));\n  }\n  .mtr-mb-4 {\n    margin-bottom: 1rem;\n  }\n  .mtr-relative {\n    position: relative;\n  }\n  .mtr-w-\\[100\\%\\] {\n    width: 100%;\n  }\n  .mtr-h-\\[3px\\] {\n    height: 3px;\n  }\n  .mtr-bg-c-green {\n    background: #62C188 !important;\n  }\n  .mtr-absolute {\n    position: absolute;\n  }\n  .mtr-w-2 {\n    width: 0.5rem;\n  }\n  .mtr-h-2 {\n    height: 0.5rem;\n  }\n  .mtr-w-full {\n    width: 100%;\n  }\n  .mtr-w-\\[50\\%\\] {\n    width: 50%;\n  }\n  .mtr-bg-c-gray-200 {\n    background: #cdccd9;\n  }\n  .mtr-w-8 {\n    width: 2rem;\n  }\n  .mtr-h-8 {\n    height: 2rem;\n  }\n  .mtr-z-20 {\n    z-index: 20;\n  }\n  .mtr-h-9 {\n    height: 2.25rem;\n  }\n  .mtr-h-\\[9px\\] {\n    height: 9px;\n  }\n  .mtr-w-\\[9px\\] {\n    width: 9px;\n  }\n  .mtr-left-\\[3px\\] {\n    left: 3px;\n  }\n  .-top-3-mtr {\n    top: -0.75rem;\n  }\n  .mtr-left-4 {\n    left: 1rem;\n  }\n  .mtr-left-\\[6px\\] {\n    left: 6px;\n  }\n  .mtr-top-0 {\n    top: 0;\n  }\n  .mtr-h-full {\n    height: 100%;\n  }\n  .mtr-w-\\[3px\\] {\n    width: 3px;\n  }\n  .mtr-z-10 {\n    z-index: 10;\n  }\n  .mtr-bottom-0 {\n    bottom: 0;\n  }\n  .-left-\\[0\\.5px\\]-mtr {\n    left: -0.5px;\n  }\n  .mtr-z-30 {\n    z-index: 30;\n  }\n  .mtr-h-\\[17px\\] {\n    height: 17px;\n  }\n  .mtr-w-\\[17px\\] {\n    width: 17px;\n  }\n  .mtr-shrink-0 {\n    flex-shrink: 0;\n  }\n  .mtr-border-2 {\n    border-width: 2px;\n  }\n\n  .name-leaderboad-header{\n    padding-left: 32% !important;\n  }\n\n  .sub-grid-field iframe {\n    height: auto;\n  }\n\n  .sub-grid-field video {\n    height: auto;\n  }\n\n  .mtr-video-field iframe{\n    max-width: 100% !important;\n  }\n  .sub-grid-field .mtr-image-field{\n    min-width: 0px !important;\n  }\n\n  .mtr-rewards{\n    position:relative;\n  }\n  .mtr-rewards .counter{\n    position:absolute;\n    right:59px;\n    top:30px;\n  }\n  .mtr-rewards .swiper-counter{\n    font-family: none !important;\n    position: absolute;\n    left: 70% !important;\n    top: 23px !important;\n    width: 134px !important;\n    height: 20px;\n    text-align: center !important;\n  }\n  .mtr-rewards .swiper-counter-mobile{\n    position:absolute;\n    top:23px !important;\n    width: 100% !important;\n  }\n  .mtr-rewards .owl-prev{\n    margin-right:123px;\n  }\n  \n  \n  /*Popup*/\n  #mtr-popup-container {\n    max-width: 100%;\n    z-index: 999999999;\n    position: fixed;\n    opacity: 0;\n    top: 0;\n    overflow-y: auto;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    padding: 80px 5px;\n    -webkit-animation: mtr-fadeIn 0.7s;\n    -moz-animation: mtr-fadeIn 0.7s;\n    -ms-animation: mtr-fadeIn 0.7s;\n    -o-animation: mtr-fadeIn 0.7s;\n    animation: mtr-fadeIn 0.7s;\n    background: rgba(77, 86, 108, 0.5);\n  }\n  \n  #mtr-popup-container.show {\n    opacity: 1;\n    display: block;\n  }\n  \n  #mtr-popup-body {\n    position: static;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n    -webkit-animation-name: mtr-fadeIn;\n    animation-name: mtr-fadeIn;\n  }\n  \n  #mtr-popup-close {\n    display: block;\n    position: absolute;\n    right: 0;\n    top: 0;\n    color: #f1f1f1;\n    font-size: 37px;\n    font-weight: 700;\n    padding: 10px 20px;\n    cursor: pointer;\n    z-index: 999;\n  }\n  \n  #mtr-popup-close:hover {\n    color: #fff;\n  }\n  \n  #mtr-popup-close:before {\n    content: \'CLOSE\';\n    font-size: 0.25em;\n    position: relative;\n    top: -8px;\n    margin-right: 5px;\n  }\n  \n  /*Test mode badge*/\n  #mtr-popup-test-mode-container {\n    position: absolute;\n    top: 20px;\n    left: 20px;\n    background-color: #f5ec05;\n    padding: 10px;\n    color: #363636;\n    font-size: 11px;\n    font-weight: 700;\n    text-transform: uppercase;\n    border: solid 1px #65610a;\n    border-radius: 5px;\n    box-shadow: 2px 2px 5px rgba(0,0,0,.4);\n    cursor: pointer;\n    text-decoration: none;\n  }\n  \n  /*Verify installation*/\n  #mtr-popup-verify-container {\n    background: #34495e;\n    border-radius: 2px;\n    position: fixed;\n    z-index: 9999999999999;\n    top: 20px;\n    left: 20px;\n    width: 400px;\n    padding: 25px;\n    box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);\n    -webkit-animation-name: mtr-fadeInDown;\n    animation-name: mtr-fadeInDown;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: initial;\n    animation-fill-mode: initial;\n    -webkit-transition-delay: 0s, 500ms;\n      -moz-transition-delay: 0s, 500ms;\n      -o-transition-delay: 0s, 500ms;\n      transition-delay: 0s, 500ms;\n  }\n  \n  #mtr-popup-verify-container .mtr-popup-verify-close {\n    position: absolute;\n    top: 15px;\n    right: 15px;\n    font-size: 22px;\n    color: white;\n    cursor: pointer;\n  }\n  \n  #mtr-popup-verify-container .mtr-popup-verify-text-container {\n    float: left;\n    color: #dedede;\n    font-size: 14px;\n    width: 78%;\n    min-height: 50px;\n    vertical-align: middle;\n  }\n  \n  #mtr-popup-verify-container .mtr-popup-verify-text-container .mtr-header-3 {\n    color: white;\n    font-size: 18px;\n    font-weight: bold;\n    margin: 0 0 4px 0;\n    display: block;\n  }\n  \n  #mtr-popup-verify-container .mtr-popup-verify-text-container .mtr-p-tag {\n    color: #dedede;\n    font-size: 14px;\n    margin: 0;\n  }\n\n  .reward-li-item-mobile{\n    flex-direction: column;\n  }\n\n  .mtr-outer-reward-div-mobile{\n    width: 100% !important;\n    height: auto !important;\n  }\n\n  #mobile-screen .reward-li-item{\n    flex-direction: column;\n  }\n\n  #mobile-screen mtr-outer-reward{\n    width: 100% !important;\n    height: auto !important;\n  }\n\n  #mobile-screen  .mtr-below-reward-div-list{\n    margin-left: 20px;\n    margin-top: 5px;\n  }\n\n\n  #mobile-screen .outer-reward-div-column{\n    margin-left: 20px !important;\n  }\n\n  #mobile-screen .owl-item .mtr-outer-reward-div{\n    margin-left: 0 !important;\n  }\n\n  .mtr-below-reward-div-list-mobile{\n    margin-left: 20px;\n    margin-top: 5px;\n  }\n\n  /*Owl carousel css*/\n\n .owl-carousel {\n    display: none;\n    width: 100%;\n    -webkit-tap-highlight-color: transparent;\n    /* position relative and z-index fix webkit rendering fonts issue */\n    position: relative;\n    z-index: 1; }\n    .owl-carousel .owl-stage {\n      display: flex;\n      position: relative;\n      -ms-touch-action: pan-Y;\n      touch-action: manipulation;\n      -moz-backface-visibility: hidden;\n      /* fix firefox animation glitch */ }\n    .owl-carousel .owl-stage:after {\n      content: \".\";\n      display: block;\n      clear: both;\n      visibility: hidden;\n      line-height: 0;\n      height: 0; }\n    .owl-carousel .owl-stage-outer {\n      position: relative;\n      overflow: hidden;\n      /* fix for flashing background */\n      -webkit-transform: translate3d(0px, 0px, 0px); }\n    .owl-carousel .owl-wrapper,\n    .owl-carousel .owl-item {\n      -webkit-backface-visibility: hidden;\n      -moz-backface-visibility: hidden;\n      -ms-backface-visibility: hidden;\n      -webkit-transform: translate3d(0, 0, 0);\n      -moz-transform: translate3d(0, 0, 0);\n      -ms-transform: translate3d(0, 0, 0); }\n    .owl-carousel .owl-item {\n      height: fit-content !important;\n      position: relative;\n      min-height: 1px;\n      float: left;\n      -webkit-backface-visibility: hidden;\n      -webkit-tap-highlight-color: transparent;\n      -webkit-touch-callout: none; }\n    .owl-carousel .owl-item img {\n      display: block;\n      width: 100%; }\n    .owl-carousel .owl-nav.disabled,\n    .owl-carousel .owl-dots.disabled {\n      display: none; }\n    .owl-carousel .owl-nav .owl-prev,\n    .owl-carousel .owl-nav .owl-next,\n    .owl-carousel .owl-dot {\n      cursor: pointer;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none; }\n    .owl-carousel .owl-nav button.owl-prev,\n    .owl-carousel .owl-nav button.owl-next,\n    .owl-carousel button.owl-dot {\n      background: none;\n      color: inherit;\n      border: none;\n      padding: 0 !important;\n      font: inherit; }\n    .owl-carousel.owl-loaded {\n      display: block; }\n    .owl-carousel.owl-loading {\n      opacity: 0;\n      display: block; }\n    .owl-carousel.owl-hidden {\n      opacity: 0; }\n    .owl-carousel.owl-refresh .owl-item {\n      visibility: hidden; }\n    .owl-carousel.owl-drag .owl-item {\n      -ms-touch-action: pan-y;\n          touch-action: pan-y;\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none; }\n    .owl-carousel.owl-grab {\n      cursor: move;\n      cursor: grab; }\n    .owl-carousel.owl-rtl {\n      direction: rtl; }\n    .owl-carousel.owl-rtl .owl-item {\n      float: right; }\n  \n  /* No Js */\n  .no-js .owl-carousel {\n    display: block; }\n  \n  /*\n   *  Owl Carousel - Animate Plugin\n   */\n  .owl-carousel .animated {\n    animation-duration: 1000ms;\n    animation-fill-mode: both; }\n  \n  .owl-carousel .owl-animated-in {\n    z-index: 0; }\n  \n  .owl-carousel .owl-animated-out {\n    z-index: 1; }\n  \n  .owl-carousel .fadeOut {\n    animation-name: mtr-fadeOut; }\n  \n  @keyframes mtr-fadeOut {\n    0% {\n      opacity: 1; }\n    100% {\n      opacity: 0; } }\n  \n  /*\n   * 	Owl Carousel - Auto Height Plugin\n   */\n  .owl-height {\n    transition: height 500ms ease-in-out; }\n  \n  /*\n   * 	Owl Carousel - Lazy Load Plugin\n   */\n  .owl-carousel .owl-item {\n    /**\n              This is introduced due to a bug in IE11 where lazy loading combined with autoheight plugin causes a wrong\n              calculation of the height of the owl-item that breaks page layouts\n           */ }\n    .owl-carousel .owl-item .owl-lazy {\n      opacity: 0;\n      transition: opacity 400ms ease; }\n    .owl-carousel .owl-item .owl-lazy[src^=\"\"], .owl-carousel .owl-item .owl-lazy:not([src]) {\n      max-height: 0; }\n    .owl-carousel .owl-item img.owl-lazy {\n      transform-style: preserve-3d; }\n  \n  /*\n   * 	Owl Carousel - Video Plugin\n   */\n  .owl-carousel .owl-video-wrapper {\n    position: relative;\n    height: 100%;\n    background: #000; }\n  \n  .owl-carousel .owl-video-play-icon {\n    position: absolute;\n    height: 80px;\n    width: 80px;\n    left: 50%;\n    top: 50%;\n    margin-left: -40px;\n    margin-top: -40px;\n    background: url(\"owl.video.play.png\") no-repeat;\n    cursor: pointer;\n    z-index: 1;\n    -webkit-backface-visibility: hidden;\n    transition: transform 100ms ease; }\n  \n  .owl-carousel .owl-video-play-icon:hover {\n    -ms-transform: scale(1.3, 1.3);\n        transform: scale(1.3, 1.3); }\n  \n  .owl-carousel .owl-video-playing .owl-video-tn,\n  .owl-carousel .owl-video-playing .owl-video-play-icon {\n    display: none; }\n  \n  .owl-carousel .owl-video-tn {\n    opacity: 0;\n    height: 100%;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: contain;\n    transition: opacity 400ms ease; }\n  \n  .owl-carousel .owl-video-frame {\n    position: relative;\n    z-index: 1;\n    height: 100%;\n    width: 100%; }\n\n  .owl-nav{\n    padding: 0 20px;\n    top:-26px !important;\n  }\n\n\n  .owl-theme .owl-nav {\n    margin-top: 10px;\n    text-align: center;\n    -webkit-tap-highlight-color: transparent; }\n    .owl-theme .owl-nav [class*=\'owl-\'] {\n      color: #FFF;\n      font-size: 14px;\n      margin: 5px;\n      padding: 4px 7px;\n      background: #D6D6D6;\n      display: inline-block;\n      cursor: pointer;\n      border-radius: 3px; }\n      .owl-theme .owl-nav [class*=\'owl-\']:hover {\n        background: #869791;\n        color: #FFF;\n        text-decoration: none; }\n    .owl-theme .owl-nav .disabled {\n      opacity: 0.5;\n      cursor: default; }\n\n  .owl-theme .owl-nav.disabled + .owl-dots {\n    margin-top: 10px; }\n\n  .owl-theme .owl-dots {\n    text-align: center;\n    -webkit-tap-highlight-color: transparent; }\n    .owl-theme .owl-dots .owl-dot {\n      display: inline-block;\n      zoom: 1;\n      *display: inline; }\n      .owl-theme .owl-dots .owl-dot span {\n        width: 10px;\n        height: 10px;\n        margin: 5px 7px;\n        background: #D6D6D6;\n        display: block;\n        -webkit-backface-visibility: visible;\n        transition: opacity 200ms ease;\n        border-radius: 30px; }\n      .owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span {\n        background: #869791; }\n\n        .rewards-carousel .owl-item{\n          height:300px;\n        }\n        .rewards-carousel .owl-nav{\n          position: absolute;\n          top:-47px;\n          right:0;\n        }\n        .rewards-carousel .owl-prev{\n          background: #403754 !important;\n          width:28px !important;\n          height:28px !important;\n          border-radius: 8px;\n        } \n        .rewards-carousel .owl-prev span{\n          color:#fff;\n          font-weight: bold;\n          font-size: 16px;\n        }    \n        .rewards-carousel .owl-next{\n          background: #403754 !important;\n          width:28px !important;\n          height:28px !important;\n          border-radius: 8px;\n        } \n        .rewards-carousel .owl-next span{\n          color:#fff;\n          font-weight: bold;\n          font-size: 16px;\n        }\n\n  .owl-dots{\n    display: none;\n  }\n\n  .mtr-no-url-container{\n    display: flex;\n  }\n\n  .sub-grid-field iframe {\n    height: auto;\n  }\n  \n  \n  /*Floating button*/\n  #mtr-floating_button {\n    z-index: 99;\n    padding: 20px;\n    border-radius: 15px;\n    position: fixed;\n    bottom: 20px;\n    right: 20px;\n    background-color: #47a1e2;\n    font-size: 14px;\n    font-weight: 700;\n    text-transform: uppercase;\n    cursor: pointer;\n  }\n  \n  .mtr-hide{\n    display: none;\n  }\n  \n  @-webkit-keyframes mtr-fadeInDown {\n    from {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n  \n    100% {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  \n  @keyframes mtr-fadeInDown {\n    from {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -100%, 0);\n      transform: translate3d(0, -100%, 0);\n    }\n  \n    100% {\n      opacity: 1;\n      -webkit-transform: none;\n      transform: none;\n    }\n  }\n  \n  @-webkit-keyframes mtr-zoomIn {\n    from {\n      opacity: 0;\n      -webkit-transform: scale3d(.3, .3, .3);\n      transform: scale3d(.3, .3, .3);\n    }\n  \n    50% {\n      opacity: 1;\n    }\n  }\n  \n  @keyframes mtr-zoomIn {\n    from {\n      opacity: 0;\n      -webkit-transform: scale3d(.3, .3, .3);\n      transform: scale3d(.3, .3, .3);\n    }\n  \n    50% {\n      opacity: 1;\n    }\n  }\n  \n  @-webkit-keyframes mtr-fadeIn {\n    from {\n      opacity: 0;\n    }\n  \n    to {\n      opacity: 1;\n    }\n  }\n  \n  @keyframes mtr-fadeIn {\n    from {\n      opacity: 0;\n    }\n  \n    to {\n      opacity: 1;\n    }\n  }\n  \n  @-webkit-keyframes mtr-slideInUp {\n    from {\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n      visibility: visible;\n    }\n  \n    to {\n      -webkit-transform: translate3d(0, 0, 0);\n      transform: translate3d(0, 0, 0);\n    }\n  }\n  \n  @keyframes mtr-slideInUp {\n    from {\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(0, 100%, 0);\n      visibility: visible;\n    }\n  \n    to {\n      -webkit-transform: translate3d(0, 0, 0);\n      transform: translate3d(0, 0, 0);\n    }\n  }\n  \n  @-webkit-keyframes mtr-slideInUpCenter {\n    from {\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(-50%, 100%, 0);\n      visibility: visible;\n    }\n  \n    to {\n      -webkit-transform: translate3d(0, 0, 0);\n      transform: translate3d(-50%, 0, 0);\n    }\n  }\n  \n  @keyframes mtr-slideInUpCenter {\n    from {\n      -webkit-transform: translate3d(0, 100%, 0);\n      transform: translate3d(-50%, 100%, 0);\n      visibility: visible;\n    }\n  \n    to {\n      -webkit-transform: translate3d(0, 0, 0);\n      transform: translate3d(-50%, 0, 0);\n    }\n  }\n  \n  \n  /*Media queries*/\n  @media only screen and (min-width: 768px) {\n  \n    #mtr-sharing-body {\n      padding: 5% 0 0;\n    }\n  \n    .mtr-rewards-list .mtr-list-item-class {\n      /* flex: 1 0 25%;\n      max-width: 33.33%;\n      min-width: 190px; */\n    }\n  \n    #mtr-sharing-leaderboard,\n    .mtr-sharing-leaderboard {\n      padding: 3% 8% !important;\n    }\n  \n    #mtr-popup-test-mode-container, \n    #mtr-popup-close {\n      position: fixed;\n    }\n  \n    .mtr-sharing-subscriber-position-container {\n      -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n      flex-direction: row;\n      -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n      align-items: center;\n      width: 100%;\n      margin: auto;\n    }\n  \n    #mtr-sharing-plain-container,\n    .mtr-sharing-plain-container {\n      -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n      flex-direction: row;\n    }\n  \n    #mtr-sharing-link-button,\n    .mtr-sharing-link-button {\n      position:relative;\n    }\n  \n  }\n  \n  \n  @media only screen and (max-width: 550px) {\n    .mtr-rewards-list-row .reward-description {\n      left: 0 !important;\n      width: 215px !important;\n    }\n\n    .mtr-lb-table{\n      overflow-x:auto;\n    }\n    .myreferrals-table{\n      overflow-x:auto;\n    }\n    .myreferrals-table table{\n      white-space:nowrap;\n    }\n    .myrewards-table{\n      overflow-x:auto;\n    }\n    .mtr-sharing-subscriber-position-container {\n      flex-direction: column !important;\n    }\n    .mtr-sharing-people-item-col {\n      margin: 10px 0px !important;\n    }\n    .design-field-row {\n      display: flex !important;\n      flex-direction: column !important;\n    }\n    .sub-grid-field {\n      margin: 10px !important;\n    }\n  \n    .myrewards-table table{\n      white-space:nowrap;\n    }\n  \n    #mtr-optin-form, #thankyou-widget {\n      width: 95% !important;\n    }\n  \n    #template-form{\n      flex-direction: column;\n      height: auto !important;\n      margin: 0 auto;\n    }\n\n    #template-form .horizontal-mtr-spacer-field{\n      height: 30px !important;\n    }\n\n    #banner-close{\n      display: flex !important;\n    }\n\n    .reward-li-item{\n      flex-direction: column;\n    }\n\n    .owl-item .mtr-outer-reward-div{\n      margin-left: 0 !important;\n    }\n\n    .outer-reward-div-column{\n      margin-left: 20px !important;\n    }\n\n    .mtr-below-reward-div-list{\n      margin-left: 20px;\n      margin-top: 5px;\n    }\n\n    .reward-description{\n      width: 100%;\n    }\n\n    .mtr-rewards {\n      padding-left: 4px !important;\n    }\n\n    .owl-item .reward-description {\n      left: 0;\n      top: 0;\n      margin-left: 0px !important;\n    }\n\n    .reward-description {\n      width: 100%;\n      left: 19px;\n      top: 26px;\n    }\n\n    .mtr-rewards-list-column{\n      margin-right: 30px !important;\n    }\n\n    .mtr-sharing-socials-container-hroizontal{\n      flex-direction: row;\n      align-items: center;\n    }\n\n    .mtr-lb-table thead th, .mtr-lb-table tbody td  {\n      padding-left: 5px !important;\n      text-align: center;\n      font-size: 0.9em;\n      /* font-weight: 400; */\n      /* max-width: 0; */\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;\n    }\n\n    .mtr-sharing-social{\n      height: 28px;\n      width: 28px;\n    }\n  \n    .mtr-sharing-socials-container{\n      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n      display:grid;\n    }\n    \n    .mtr-sharing-social-reward{\n      margin: 0px 2px !important;\n      text-wrap: nowrap;\n    }\n  \n    .mtr-sharing-social-outer-div{\n      min-width: 140px !important;\n    }\n\n    .mtr-reward-li-progress-bar{\n      position: static !important;\n    }\n\n    .mtr-reward-li-progress-bar{\n      position: unset !important;\n      height: 0px !important;\n    }\n\n    .mtr-reward-list-custom{\n      margin-right: 0px !important;\n    }\n\n    .reward-referrals-below-div{\n      display: none !important;\n    }\n\n    .reward-referrals-inner-div{\n      display: flex !important;\n    }\n\n    .mtr-rewards-list.swiper-wrapper{\n      margin-top: 36px;\n      max-width: 340px !important;\n    }\n  \n    .mtr-text-field p{\n      min-width: 100% !important;\n    }\n\n  }\n  \n\n  .mtr-otp-container input::-webkit-outer-spin-button,\n  .mtr-otp-container input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n  }\n\n  @media only screen and (max-width: 550px) {\n    .mtr-otp-container{\n      gap: 3px !important;\n    }\n    .mtr-sharing-people-item-row{\n      margin-top:10px !important;\n    }  \n  }\n\n  .mtr-loader {\n    border: 4px solid #F3F3F3;\n    border-radius: 50%;\n    border-top: 4px solid #3498DB;\n    width: 30px;\n    height: 30px;\n    -webkit-animation: mtr-spin 1s linear infinite; /* Safari */\n    animation: mtr-spin 1s linear infinite;\n  }\n\n  .mtr-checkmark {\n    display: inline-block;\n    width: 24px;\n    height: 12px;\n    border-left: 4px solid white;\n    border-bottom: 4px solid white;\n    transform: rotate(-45deg);\n  }\n\n  .mtr-checkmark-thin {\n    display: inline-block;\n    width: 16px;\n    height: 8px;\n    border-left: 3px solid white;\n    border-bottom: 3px solid white;\n    transform: rotate(-45deg);\n  }\n\n  /* how it works */\n\n  .mtr-how-it-works-container{\n    padding: 20px;\n    border-radius: 12px;\n    max-width: 350px;\n  }\n\n  .mtr-hiw-step-container{\n    position: relative;\n    padding-bottom: 50px;\n  }\n\n  .mtr-hiw-last-step{\n    padding-bottom: 0px !important;\n  }\n\n  .mtr-hiw-step-divider{\n    position: absolute;\n    top: 52px;\n    left: 20px;\n    height: calc(100% - 59px);\n    background: #bdbdbd;\n    width: 2px;\n    z-index: 1;\n  }\n\n  .mtr-hiw-step{\n    position: relative;\n    display: flex;\n  }\n\n  .hiw-description{\n    font-size: 14px;\n    text-align: left;\n    color: rgb(77, 86, 108);  \n  }\n\n  .mtr-hiw-content{\n    margin-left: 15px;\n  }\n\n  .mtr-hiw-icon{\n    border: solid 2px #bdbdbd;\n    border-radius: 10px;\n    width: 45px;\n    height: 45px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: white;\n    position: relative;\n    z-index: 2;\n    flex-shrink: 0;\n  }\n\n  .mtr-current-step{\n    border: solid 2px #62C188 !important;\n    background-color: #dff1e4 !important;\n  }\n  \n  .hiw-icon-color{\n    color: #62C188 !important;\n  }\n\n  .mtr-hiw-title{\n    text-align: left;\n    font-weight: 900;\n    font-size: 22px;\n    margin-bottom: 24px;\n  }\n\n  .mtr-hiw-subtitle{\n    text-align: left;\n    font-weight: 600;\n    font-size: 18px;\n    margin-bottom: 3px;\n  }\n\n  .hiw-height{\n    height: auto !important;\n  }\n\n  \n  /* faq */\n\n  .mtr-faq-accordion{\n    width: 100%;\n  }\n\n  .mtr-faq-icon{\n    color: #626262 !important;\n    font-size: 18px !important;\n  }\n\n  .mtr-faq-container{\n    background-color: rgb(241, 240, 245);\n    margin: 10px 4px;\n    padding: 20px;\n    border-radius: 20px;\n    border: solid 1px #c5c5c5;\n  }\n  \n  .mtr-faq-panel{\n    text-align: left;\n    padding: 10px 20px;\n    border-radius: 12px;\n    border: solid 1px #c5c5c5;\n    margin-bottom: 10px;\n    background-color: white;\n  }\n\n  .mtr-faq-main-title{\n    text-align: left;\n    font-weight: 900;\n    font-size: 22px;\n    margin-bottom: 18px;\n  }\n\n  .mtr-faq-title{\n    font-weight: 700;\n    font-size: 16px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n  }\n\n  .mtr-faq-description {\n    font-weight: 500;\n    font-size: 14px;\n    max-height: 0;\n    overflow: hidden;\n    margin-top: 0;\n    transition: max-height 0.3s ease;\n  }\n\n  .mtr-faq-description-inner{\n    margin: 12px 0px 6px 0;\n    padding-right: 20px;\n  }\n\n  .mtr-faq-description.open {\n    max-height: 500px;\n  }\n\n  /* Safari */\n  @-webkit-keyframes mtr-spin {\n    0% { -webkit-transform: rotate(0deg); }\n    100% { -webkit-transform: rotate(360deg); }\n  }\n  @keyframes mtr-spin {\n    0% { transform: rotate(0deg); }\n    100% { transform: rotate(360deg); }\n  }\n  .auto-style-258 { color: inherit; }\n  .auto-style-259 { width:550px; max-width: 95%; margin-top: 150px; }\n  .auto-style-260 { border-top-left-radius: 23px; border-top-right-radius: 23px; }\n  .auto-style-261 { padding: 0px; font-weight: 500; font-size: 30px; color: rgb(43, 47, 62); overflow-wrap: break-word; width: 90%; text-align: center; }\n  .auto-style-262 { margin-top: -10px; }\n  .auto-style-263 { width: 40px !important; height: 40px !important; }\n  .auto-style-264 { text-align: center; }\n  .auto-style-265 { width: 100%; display: flex; align-items: center; justify-content: center; }\n  .auto-style-78 { font-family:Material Icons; font-size:20px; }\n  .auto-style-64 { font-family:Material Icons; font-size:25px; }\n  .auto-style-68 { border-style: solid none none none; border-width: 4px; }\n  .auto-style-75 { top: 12px; position: absolute; right: 15px; width: 9px; height: 9px; color: rgb(0, 0, 0); display: flex; cursor: pointer; align-items: center; justify-content: center; font-size: 18px; z-index: 10; }\n  ");
        g.generate.linkStylesheet("https://app.referralhero.com/widget/templates/images.css");
        g.generate.linkStylesheet("https://unpkg.com/swiper/swiper-bundle.min.css");
        g.libraries.carousel();
        setTimeout(function(){
            for (var i = 0; i < campaign_uuids.length; i++) {
                let uuid = campaign_uuids[i];
                let rh_variable = "RH_" + uuid;
                let rh_config_variable = "RH_" + uuid + "_Config";
                let settings = campaign_settings[uuid];
                if (void 0 === window[rh_variable]) { 
                    window[rh_variable] = {}; 
                }
                
                config[uuid] = {};
                config[uuid].uuid = uuid;
                config[uuid].settings = settings;
                config[uuid].callbacks = {};
                global_config["alert_uuid"] = uuid;
                config[uuid].defaults = {
                    form_container_id: "referralhero-dashboard-"+config[uuid].uuid,
                    form_container_id_two: "referralHero-dashboard-"+config[uuid].uuid,
                    signup_form_container_id: "referralhero-signup-widget-"+config[uuid].uuid,
                    sharing_form_container_id: "referralhero-sharing-widget-"+config[uuid].uuid,
                    default_url: g.tools.getDefaultUrl(config[uuid].settings),
                    inline_button_container_id: "referralhero-inline-button-" + config[uuid].uuid,
                    signup_inline_button_container_id: "referralhero-signup-widget-inline-button-" + config[uuid].uuid,
                    nps_widget_container_id: "nps-widget-" + config[uuid].uuid
                };

                var pc = document.getElementById("referralhero-dashboard-"+config[uuid].uuid) ? config[uuid].settings.form.input_field.color : config[uuid].settings.signup_widget_form.input_field.color;
                g.generate.stylesheet(`.mtr-custom-css-${config[uuid].uuid} #mtr-form-fields input::-webkit-input-placeholder { color: ${pc}; }`);
                if (config[uuid].settings.design.custom_css.trim() !== "") {
                    g.generate.stylesheet(`.mtr-custom-css-${config[uuid].uuid} { ${config[uuid].settings.design.custom_css} }`);
                }
                
                if(config[uuid].settings.allow_global_subscribers_tracking){
                    RH.allow_global_subscribers_tracking = true
                    g.tools.getReferrerGlobal(config[uuid], window[rh_variable]);
                }else{
                    g.tools.getReferrer(config[uuid], window[rh_variable]);
                }
                if(!window.location.pathname.includes(`${uuid}/copy_link`)){
                    if ((g.tools.getParams("mwr") == null || g.tools.npsCookie("__nps-anonymous-").length > 0) && config[uuid].settings.allow_organic_traffic_tracking){
                        g.tools.getAnonymous(config[uuid], window[rh_variable]);
                    }else if (g.tools.getParams("mwr") != null && !config[uuid].settings.allow_organic_traffic_tracking) {
                        g.tools.getAnonymous(config[uuid], window[rh_variable])
                    }
                }
                g.tools.getSource(config[uuid], window[rh_variable]);
                g.tools.getIdentity(config[uuid], window[rh_variable]);
                g.libraries.fp(window[rh_variable]);
                if( config[uuid].settings.sharing.verification.qr_code_enabled && (typeof QRCodeStyling === "undefined") ){
                    g.libraries.qr();
                }
                if ( config[uuid].settings.sharing.verification.crypto_wallet_confirmation && !global_config["enableWC"] ) {
					global_config["enableWC"] = true
                    g.libraries.wc();
                    g.libraries.web3();
                }
                if( config[uuid].settings.sharing.verification.kakao_talk_enabled ){
                    g.libraries.kakao_talk(config[uuid]);
                }
                g.libraries.auto_form_submission(config[uuid], window[rh_variable]);
                g.tools.generate_new_session(config[uuid], window[rh_variable]);
                
                
                
                window[rh_variable].identify = function(a, c, d) {
                    g.methods.identify(a, c, d, config[uuid], window[rh_variable]);
                };
                
                window[rh_variable].trackReferral = function (a, c, d) {
                    g.methods.trackReferral(a, c, d, config[uuid], window[rh_variable]);
                };

                window[rh_variable].organicTrackReferral = function (a, c) {
                    if(!config[uuid].settings.allow_global_subscribers_tracking){
					    g.tools.trackOrganic(a, c);
                    }
                    g.methods.organicTrackReferral(a, c, config[uuid], window[rh_variable]);
                };

                window[rh_variable].stripe_checkout = function (a) {
                    g.methods.stripe_checkout(a, config[uuid], window[rh_variable]);
                };

                window[rh_variable].pendingReferral = function (a, c) {
                    g.methods.pendingReferral(a, c, config[uuid], window[rh_variable]);
                };

                window[rh_variable].trackTransaction = function (a) {
                    g.methods.trackTransaction(a,config[uuid], window[rh_variable]);
                };

                window[rh_variable].form = {
                    submit: function (a) {
                        RH.form.submit(a, true);
                        g.form.submit(a, config[uuid], window[rh_variable], !1, config[uuid].settings.form, null, null, true);
                    }
                };

                window[rh_variable].generate = {
                    form: function () {
                        return g.generate.form(config[uuid], window[rh_variable]);
                    },
                    sharing_screen: function () {
                        return g.generate.sharing_screen(config[uuid], window[rh_variable]);
                    },
                    popup: function(a) {
                        return g.generate.popup(a, config[uuid]);
                    }
                };

                var N = function () {
                        if (Object.keys(r).every(function (c) {
                            return r[c]
                        })){
                            config[uuid].settings.track_events && g.callbacks.trackEvents();
                            var element = mtid(config[uuid].defaults.sharing_form_container_id) || mtid(config[uuid].defaults.form_container_id) || mtid(config[uuid].defaults.form_container_id_two) || mtid(config[uuid].defaults.signup_form_container_id);
                            if(config[uuid].settings.list_canceled && element != undefined){
                                var a = g.tools.error_widget();
                                element.appendChild(a);
                            }else if (mtid(config[uuid].defaults.sharing_form_container_id)) {
                                var a = g.generate.form(config[uuid], window[rh_variable], true);
                                mtid(config[uuid].defaults.sharing_form_container_id) ? mtid(config[uuid].defaults.sharing_form_container_id).appendChild(a) : ""
                            } else if (mtid(config[uuid].defaults.inline_button_container_id)) {
                                var a = g.generate.inline_button(config[uuid], window[rh_variable]);
                                mtid(config[uuid].defaults.inline_button_container_id) ? mtid(config[uuid].defaults.inline_button_container_id).appendChild(a) : ""
                            } else if (mtid(config[uuid].defaults.signup_inline_button_container_id)){
                                var a = g.generate.signup_inline_button(config[uuid], window[rh_variable]);
                                mtid(config[uuid].defaults.signup_inline_button_container_id) ? mtid(config[uuid].defaults.signup_inline_button_container_id).appendChild(a) : ""
                            } else if (mtid(config[uuid].defaults.form_container_id)) {
                                if(config[uuid].settings.show_signup_widget == "show"){
                                    var a = g.generate.form(config[uuid], window[rh_variable]);
                                    if(mtid("mtr-load-spinner")){
                                        mtid(config[uuid].defaults.form_container_id).removeChild(document.getElementById("mtr-load-spinner"));
                                    }
                                    mtid(config[uuid].defaults.form_container_id) ? mtid(config[uuid].defaults.form_container_id).appendChild(a) : ""
                                    console.log("[ReferralHero] Signup Form loaded successfully.")
                                }else if(config[uuid].settings.show_signup_widget == "hide"){
                                    console.error("[ReferralHero] Signup Form is hidden.")
                                }
                            } else if (mtid(config[uuid].defaults.form_container_id_two)) {
                                if(config[uuid].settings.show_signup_widget == "show"){
                                    var a = g.generate.form(config[uuid], window[rh_variable]);
                                    if(mtid("mtr-load-spinner")){
                                        mtid(config[uuid].defaults.form_container_id_two).removeChild(document.getElementById("mtr-load-spinner"));
                                    }
                                    mtid(config[uuid].defaults.form_container_id_two) ? mtid(config[uuid].defaults.form_container_id_two).appendChild(a) : ""
                                    console.log("[ReferralHero] Signup Form loaded successfully.")
                                }else if(config[uuid].settings.show_signup_widget == "hide"){
                                    console.error("[ReferralHero] Signup Form is hidden.")
                                }
                            } else if (mtid(config[uuid].defaults.signup_form_container_id) && config[uuid].settings.enable_features.signup_widget) {
                                var a = g.generate.signup_widget_form(config[uuid], window[rh_variable]);
                                if(mtid("mtr-load-spinner")){
                                    mtid(config[uuid].defaults.signup_form_container_id).removeChild(document.getElementById("mtr-load-spinner"));
                                }
                                mtid(config[uuid].defaults.signup_form_container_id) ? mtid(config[uuid].defaults.signup_form_container_id).appendChild(a) : ""
                            } else if (config[uuid].settings.floating_button.enable) {
                                var a = g.generate.floating_button(config[uuid], window[rh_variable]);
                                document.getElementsByTagName("body")[0].appendChild(a);
                            }

                            config[uuid].settings.sharing.open_if_signed_up && (console.log("[ReferralHero] Sharing screen triggered."), g.tools.readCookie("__maitre-session-" + config[uuid].uuid) && g.tools.getSessionCookie(!0, config[uuid], window[rh_variable]));
                            config[uuid].settings.enable_features.nps_widget && (mtid(config[uuid].defaults.nps_widget_container_id) && !g.tools.readCookie("__nps-popup-closed-" + config[uuid].uuid) && (console.log("[ReferralHero] Nps widget triggered.")), g.generate.nps_primary(config[uuid], window[rh_variable]));

                            config[uuid].settings.horizontal_banner.show && g.generate.horizontal_banner(config[uuid], window[rh_variable]);
                            config[uuid].settings.one_click_signup.enable && (config[uuid].settings.recaptcha.enable ? console.warn("[ReferralHero] One-click sign up disabled because Recaptcha is enabled.") : config[uuid].settings.form.terms_conditions.require ? console.warn("[ReferralHero] One-click sign up disabled because Terms and conditions is enabled.") :
                                g.tools.checkOneClickSignup(config[uuid], window[rh_variable]));
                            config[uuid].settings.facebook_pixel.enable && "" != config[uuid].settings.facebook_pixel.id.trim() && g.libraries.facebook_pixel(config[uuid]);
                            if(g.tools.getParams("mtrVerifyInstall") == config[uuid].uuid){
                                if(config[uuid].settings.nps_widget.enabled){
                                    if(mtid(config[uuid].defaults.nps_widget_container_id)){
                                        g.tools.verify_tracking_code(config[uuid]);
                                    }
                                }else{
                                    g.tools.verify_tracking_code(config[uuid]);
                                }
                                g.tools.asyncRequest.request(g.tools.getWidgetUrl(config) + "/update_next_steps", "POST", { id: "installation_link" }, function(response) {
                                }, function() {
                                    console.error("[ReferralHero] There seems to be an error");
                                });
                            }
                        }else{
                            console.log(r);
                        }
                    };
                    N();
                    setTimeout(function() {
                        widget_interval = setInterval(function() { g.tools.reloadWidgets(widget_interval, config[uuid], window[rh_variable]); }, 20);
                    }, 50);
                    setTimeout(function() {
                    clearInterval(widget_interval);
                    }, 100000);
            }
			console.info("\ud83d\ude4c ReferralHero is loaded, time to rock'n'roll!\nLooking for a simple widget to run your referral program? Check out https://app.referralhero.com/developers")
        }, 10)
        setTimeout(function(){
            let Z = window.RHConfig
            for (var i = 0; i < campaign_uuids.length; i++) {
                let uuid = campaign_uuids[i];
                let rh_variable = "RH_" + uuid;
                let rh_config_variable = "RH_" + uuid + "_Config";
                var M = window[rh_config_variable];
                if (Z || M) {
                    let P = config[uuid].settings.test_mode;
                    config[uuid] = g.tools.extend(config[uuid], M);
                    g.tools.extend(config[uuid], Z);
                    w = P || config[uuid].settings.test_mode;
                    console.log("[ReferralHero] Test mode: " + (w ? "ON" : "OFF"))
                }
                if (config[uuid].callbacks.hasOwnProperty("onLoad")) config[uuid].callbacks.onLoad();
                config[uuid].callbacks.hasOwnProperty("ready") && config[uuid].callbacks.ready();
            }
            if(Z){
                RHConfig.callbacks.hasOwnProperty("onLoad") && RHConfig.callbacks.onLoad();
                RHConfig.callbacks.hasOwnProperty("ready") && RHConfig.callbacks.ready();
            }
        }, 8000)
    };
    (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? O() : document.addEventListener("DOMContentLoaded", O);
    window.addEventListener("popstate", function (q) {
        console.log("POPSTATE:", window.location.href)
    });
    window.addEventListener("unload", function (q) {
        console.log("UNLOAD:", window.location.href)
    })
})();