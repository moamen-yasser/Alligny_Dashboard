import i18next from 'i18next';

export const serviceMappings = {
    // Services / Categories
    "human_hospital": { en: "Human Hospital or Medical Center", ar: "مستشفى بشري أو مركز طبي" },
    "human_doctor": { en: "Human Doctor", ar: "طبيب بشري" },
    "human_pharmacy": { en: "Human Pharmacy or Medical Supplies", ar: "صيدلية بشري أو مستلزمات طبية" },
    "lab": { en: "Laboratory", ar: "معمل تحاليل" },
    "radiology_center": { en: "Radiology Center", ar: "مركز أشعة" },
    "optics": { en: "Optics", ar: "بصريات" },
    "gym": { en: "Gym or Sports Academy", ar: "جيم او اكاديمية رياضية" },
    "veterinary_hospital": { en: "Veterinary Hospital or Center", ar: "مستشفى أو مركز بيطري" },
    "veterinarian": { en: "Veterinarian", ar: "طبيب بيطري" },
    "veterinary_pharmacy": { en: "Veterinary Pharmacy or Animal Supplies", ar: "صيدلية بيطري أو مستلزمات حيوان" },

    // Animals
    "cat": { en: "Cat", ar: "قطة" },
    "dog": { en: "Dog", ar: "كلب" },
    "bird": { en: "Bird", ar: "طائر" },
    "fish": { en: "Fish", ar: "سمك" },
    "hamster": { en: "Hamster", ar: "هامستر" },
    "rabbit": { en: "Rabbit", ar: "أرنب" },
    "tayur": { en: "Birds", ar: "طيور" },
    "pigeon": { en: "Pigeon", ar: "حمام" },
    "donkey": { en: "Donkey", ar: "حمار" },
    "turtle": { en: "Turtle", ar: "سلحفاة" },
    "cowbuffalo": { en: "Cow / Buffalo", ar: "بقرة/جاموس" },
    "sheepgoat": { en: "Sheep / Goat", ar: "خروف/ماعز" },
    "boy": { en: "Boy", ar: "ولد" },
    "girl": { en: "Girl", ar: "بنت" },

    "specialization": { en: "Specialization", ar: "التخصص" },
    "category": { en: "Category", ar: "الفئة" },

    // Specializations
    "all_specializations": { en: "All Specializations", ar: "جميع التخصصات" },
    "dermatology": { en: "Dermatology", ar: "جلدية" },
    "laser": { en: "Laser", ar: "ليزر" },
    "dentistry": { en: "Dentistry", ar: "اسنان" },
    "hair_transplant": { en: "Hair Transplant", ar: "زراعة شعر" },
    "psychiatry": { en: "Psychiatry", ar: "نفسي" },
    "pediatrics_neonatology": { en: "Pediatrics & Neonatology", ar: "اطفال وحديثي الولادة" },
    "neurology": { en: "Neurology", ar: "مخ واعصاب" },
    "orthopedics": { en: "Orthopedics", ar: "عظام" },
    "obstetrics_gynecology": { en: "Obstetrics & Gynecology", ar: "نساء وتوليد" },
    "ent": { en: "ENT", ar: "انف واذن وحنجرة" },
    "cardiology": { en: "Cardiology & Vascular", ar: "قلب واوعية دموية" },
    "internal_medicine": { en: "Internal Medicine", ar: "باطنة" },
    "interventional_radiology": { en: "Interventional Radiology", ar: "الاشعة التداخلية" },
    "hematology": { en: "Hematology", ar: "امراض الدم" },
    "oncology": { en: "Oncology", ar: "اورام" },
    "nutrition_weight_loss": { en: "Nutrition & Weight Loss", ar: "تخسيس وتغذية" },
    "pediatric_surgery": { en: "Pediatric Surgery", ar: "جراحة اطفال" },
    "surgical_oncology": { en: "Surgical Oncology", ar: "جراحة اورام" },
    "vascular_surgery": { en: "Vascular Surgery", ar: "جراحة اوعية دموية" },
    "plastic_surgery": { en: "Plastic Surgery", ar: "جراحة تجميل" },
    "bariatric_surgery": { en: "Bariatric & Endoscopic Surgery", ar: "جراحة سمنة ومناظير" },
    "general_surgery": { en: "General Surgery", ar: "جراحة عامة" },
    "spine_surgery": { en: "Spine Surgery", ar: "جراحة عمود فقري" },
    "cardio_thoracic_surgery": { en: "Cardio-Thoracic Surgery", ar: "جراحة قلب وصدر" },
    "neurosurgery": { en: "Neurosurgery", ar: "جراحة مخ واعصاب" },
    "gastroenterology_endoscopy": { en: "Gastroenterology & Endoscopy", ar: "جهاز هضمي ومناظير" },
    "allergy_immunology": { en: "Allergy & Immunology", ar: "حساسية ومناعة" },
    "ivf": { en: "IVF & Infertility", ar: "حقن مجهري واطفال انابيب" },
    "andrology_infertility": { en: "Andrology & Infertility", ar: "ذكوره وعقم" },
    "rheumatology": { en: "Rheumatology", ar: "روماتيزم" },
    "endocrinology": { en: "Endocrinology & Diabetes", ar: "سكر وغدد صماء" },
    "audiology": { en: "Audiology", ar: "سمعيات" },
    "pulmonology": { en: "Pulmonology & Respiratory", ar: "صدر وجهاز تنفسي" },
    "family_medicine": { en: "Family Medicine", ar: "طب الاسرة" },
    "geriatrics": { en: "Geriatrics", ar: "طب المسنين" },
    "rehabilitative_medicine": { en: "Rehabilitative Medicine", ar: "طب تقويمي" },
    "pain_management": { en: "Pain Management", ar: "علاج الالام" },
    "physiotherapy_sports": { en: "Physiotherapy & Sports Injuries", ar: "علاج طبيعي واصابات ملاعب" },
    "ophthalmology": { en: "Ophthalmology", ar: "عيون" },
    "hepatology": { en: "Hepatology", ar: "كبد" },
    "nephrology": { en: "Nephrology", ar: "كلى" },
    "urology": { en: "Urology", ar: "مسالك بولية" },
    "general_practice": { en: "General Practice", ar: "ممارسة عامة" },
    "speech_therapy": { en: "Speech Therapy", ar: "نطق وتخاطب" },

    // Discounts & Common Fields
    "enter_discount_on_other_services": { en: "Enter discount on other services", ar: "أدخل خصم على الخدمات الأخرى" },
    "enter_price_before_discount": { en: "Enter price before discount", ar: "أدخل السعر قبل الخصم" },
    "enter_price_after_discount": { en: "Enter price after discount", ar: "أدخل السعر بعد الخصم" },
    "home_visit": { en: "Is there a home visit?", ar: "هل يوجد زيارة منزلية؟" },
    "is_home_visit": { en: "Is there a home visit?", ar: "هل يوجد زيارة منزلية؟" },
    "is_home_card": { en: "Can the discount card be used in case of a home visit?", ar: "هل يمكن استخدام كارت الخصومات في حالة الزيارة المنزلية؟" },
    "Can_the_discount_card_be_used_in_the_case_of_a_home_visit": { en: "Can the discount card be used in case of a home visit?", ar: "هل يمكن استخدام كارت الخصومات في حالة الزيارة المنزلية؟" },
    "home_discount": { en: "Can the discount card be used in case of a home visit?", ar: "هل يمكن استخدام كارت الخصومات في حالة الزيارة المنزلية؟" },
    "home_delivery": { en: "Is there home delivery?", ar: "هل يوجد توصيل للمنزل؟" },
    "is_home_delivery": { en: "Is there home delivery?", ar: "هل يوجد توصيل للمنزل؟" },
    "is_delivery": { en: "Is there home delivery?", ar: "هل يوجد توصيل للمنزل؟" },
    "Can_the_discount_card_be_used_in_the_case_of_a_home_delivery": { en: "Can the discount card be used in case of home delivery?", ar: "هل يمكن استخدام كارت الخصومات في حالة التوصيل للمنزل؟" },
    "pharmacy_is_home_card": { en: "Can the discount card be used in case of home delivery?", ar: "هل يمكن استخدام كارت الخصومات في حالة التوصيل للمنزل؟" },
    "is_home_service": { en: "Is there home service?", ar: "هل يوجد خدمة منزلية؟" },
    "eye_care_is_card": { en: "Can the discount card be used in case of home delivery?", ar: "هل يمكن استخدام كارت الخصومات في حالة التوصيل للمنزل؟" },
    "Home_service_available": { en: "Is there a home visit?", ar: "هل يوجد زيارة منزلية؟" },
    "home_service": { en: "Is there home service?", ar: "هل يوجد خدمة منزلية؟" },
    "canUseDiscountCard": { en: "The discount card can be used in case of a home visit", ar: "يمكن استخدام كارت الخصومات في حالة الزيارة المنزلية" },
    "accept_insurance": { en: "Accept Insurance", ar: "قبول التأمين" },
    "consultation_price_before_discount": { en: "Consultation Price Before Discount", ar: "سعر الكشف قبل الخصم" },
    "consultation_price_after_discount": { en: "Consultation Price After Discount", ar: "سعر الكشف بعد الخصم" },
    "examinations_discount": { en: "Examinations Discount", ar: "خصم الكشف" },
    "medical_tests_discount": { en: "Medical Tests Discount", ar: "خصم التحاليل" },
    "hospital_xray_discount": { en: "X-Ray Discount", ar: "خصم الأشعة" },
    "xray_discount": { en: "X-Ray Discount", ar: "خصم الأشعة" },
    "medicines_discount": { en: "Medicines Discount", ar: "خصم الأدوية" },
    "local_medicines_discount": { en: "Local Medicines Discount", ar: "خصم الأدوية المحلية" },
    "imported_medicines_discount": { en: "Imported Medicines Discount", ar: "خصم الأدوية المستوردة" },
    "medical_supplies_discount": { en: "Medical Supplies Discount", ar: "خصم المستلزمات الطبية" },
    "all_tests_discount": { en: "All Tests Discount", ar: "خصم جميع التحاليل" },
    "other_discount": { en: "Other Discount", ar: "خصم على الخدمات الأخرى" },
    "glasses_discount": { en: "Glasses Discount", ar: "خصم النظارات الطبية" },
    "sunglasses_discount": { en: "Sunglasses Discount", ar: "خصم النظارات الشمسية" },
    "contact_lenses_discount": { en: "Contact Lenses Discount", ar: "خصم العدسات اللاصقة" },
    "eye_exam_discount": { en: "Eye Exam Discount", ar: "خصم فحص العيون" },
    "surgeries_other_services_discount": { en: "Discount on Surgeries or Other Services", ar: "الخصم على العمليات او الخدمات الاخرى" },
    "enter_surgeries_other_services_discount": { en: "Enter discount on surgeries or other services", ar: "أدخل الخصم على العمليات او الخدمات الاخرى" },
    "consultation_price_before": { en: "Consultation Price Before Discount", ar: "سعر الكشف قبل الخصم" },
    "consultation_price_after": { en: "Consultation Price After Discount", ar: "سعر الكشف بعد الخصم" },

    // Specific Doctor Keys
    "humandoctorpricebefore": { en: "Consultation Price Before Discount", ar: "سعر الكشف قبل الخصم" },
    "humandoctorpriceafter": { en: "Consultation Price After Discount", ar: "سعر الكشف بعد الخصم" },
    "humandoctorishome": { en: "Is there a home visit?", ar: "هل يوجد زيارة منزلية؟" },
    "humandoctoriscard": { en: "Can the discount card be used in case of a home visit?", ar: "هل يمكن استخدام كارت الخصومات في حالة الزيارة المنزلية؟" },
    "xray": { en: "X-Ray Discount", ar: "خصم الأشعة" },
    "discountother": { en: "Other Discount", ar: "خصم على الخدمات الأخرى" },

    // Hospital Specific Keys
    "humanhospitaldiscountmedicaltest": { en: "Medical Tests Discount", ar: "خصم التحاليل" },
    "humanhospitaldiscountexaminations": { en: "Examinations Discount", ar: "خصم الكشف" },

    // Veterinary Specific Keys
    "veterinaryhospitaldiscountexaminations": { en: "Examinations Discount", ar: "خصم الكشف" },
    "veterinaryhospitaldiscountxray": { en: "X-Ray Discount", ar: "خصم الأشعة" },
    "veterinaryhospitaldiscountmedicaltest": { en: "Medical Tests Discount", ar: "خصم التحاليل" },
    "veterinaryhospitaldiscountmedicines": { en: "Medicines Discount", ar: "خصم الأدوية" },

    // Optics / Eye Care Specific Keys
    "eyecarediscountsunglasses": { en: "Sunglasses Discount", ar: "خصم النظارات الشمسية" },
    "eyecarediscountglasses": { en: "Glasses Discount", ar: "خصم النظارات الطبية" },
    "eyecareisdelivery": { en: "Is there home delivery?", ar: "هل يوجد توصيل للمنزل؟" },
    "eyecarediscounteyeexam": { en: "Eye Exam Discount", ar: "خصم فحص العيون" },

    // Pharmacy Specific Keys
    "humanpharmacydiscountimportedmedicine": { en: "Imported Medicines Discount", ar: "خصم الأدوية المستوردة" },
    "humanpharmacydiscountlocalmedicine": { en: "Local Medicines Discount", ar: "خصم الأدوية المحلية" },
    "humanpharmacyishome": { en: "Is there home delivery?", ar: "هل يوجد توصيل للمنزل؟" },
    "humanpharmacydiscountmedicalsupplies": { en: "Medical Supplies Discount", ar: "خصم المستلزمات الطبية" },
    "humanpharmacyiscard": { en: "Can the discount card be used in case of home delivery?", ar: "هل يمكن استخدام كارت الخصومات في حالة التوصيل للمنزل؟" },

    // Veterinary Pharmacy Specific Keys
    "veterinarypharmacydiscountimportedmedicine": { en: "Imported Medicines Discount", ar: "خصم الأدوية المستوردة" },
    "veterinarypharmacydiscountlocalmedicine": { en: "Local Medicines Discount", ar: "خصم الأدوية المحلية" },
    "veterinarypharmacyishome": { en: "Is there home delivery?", ar: "هل يوجد توصيل للمنزل؟" },
    "veterinarypharmacydiscountmedicalsupplies": { en: "Medical Supplies Discount", ar: "خصم المستلزمات الطبية" },
    "veterinarypharmacyiscard": { en: "Can the discount card be used in case of home delivery?", ar: "هل يمكن استخدام كارت الخصومات في حالة التوصيل للمنزل؟" },

    // Lab Specific Keys
    "labtestiscard": { en: "Can the discount card be used in case of home service?", ar: "هل يمكن استخدام كارت الخصومات في حالة الخدمة المنزلية؟" },
    "labtestdiscountalltypes": { en: "All Tests Discount", ar: "خصم جميع التحاليل" },
    "labtestisishome": { en: "Is there home service?", ar: "هل يوجد خدمة منزلية؟" },

    // Gym Subscriptions
    "1_month_subscription": { en: "1 Month Subscription", ar: "اشتراك شهر واحد" },
    "3_months_subscription": { en: "3 Months Subscription", ar: "اشتراك 3 أشهر" },
    "6_months_subscription": { en: "6 Months Subscription", ar: "اشتراك 6 أشهر" },
    "12_months_subscription": { en: "12 Months Subscription", ar: "اشتراك 12 شهر" },
    "price_before": { en: "Price Before", ar: "السعر قبل الخصم" },
    "price_after": { en: "Price After", ar: "السعر بعد الخصم" },
    "discount_on_other_services": { en: "Discount on Other Services", ar: "خصم على الخدمات الأخرى" },
    "gym_month_sub_price_b": { en: "1 Month Subscription Price Before Discount", ar: "سعر الاشتراك الشهري قبل الخصم" },
    "gym_month_sub_price_a": { en: "1 Month Subscription Price After Discount", ar: "سعر الاشتراك الشهري بعد الخصم" },
    "gym_month_3_sub_price_b": { en: "3 Months Subscription Price Before Discount", ar: "سعر اشتراك 3 أشهر قبل الخصم" },
    "gym_month_3_sub_price_a": { en: "3 Months Subscription Price After Discount", ar: "سعر اشتراك 3 أشهر بعد الخصم" },
    "gym_month_6_sub_price_b": { en: "6 Months Subscription Price Before Discount", ar: "سعر اشتراك 6 أشهر قبل الخصم" },
    "gym_month_6_sub_price_a": { en: "6 Months Subscription Price After Discount", ar: "سعر اشتراك 6 أشهر بعد الخصم" },
    "gym_month_12_sub_price_a": { en: "12 Months Subscription Price After Discount", ar: "سعر اشتراك 12 شهر بعد الخصم" },

    "gymmonthsubpriceb": { en: "1 Month Subscription Price Before Discount", ar: "سعر الاشتراك الشهري قبل الخصم" },
    "gymmonthsubpricea": { en: "1 Month Subscription Price After Discount", ar: "سعر الاشتراك الشهري بعد الخصم" },
    "gymmonth3subpriceb": { en: "3 Months Subscription Price Before Discount", ar: "سعر اشتراك 3 أشهر قبل الخصم" },
    "gymmonth3subpricea": { en: "3 Months Subscription Price After Discount", ar: "سعر اشتراك 3 أشهر بعد الخصم" },
    "gymmonth6subpriceb": { en: "6 Months Subscription Price Before Discount", ar: "سعر اشتراك 6 أشهر قبل الخصم" },
    "gymmonth6subpricea": { en: "6 Months Subscription Price After Discount", ar: "سعر اشتراك 6 أشهر بعد الخصم" },
    "gymmonth12subpriceb": { en: "12 Months Subscription Price Before Discount", ar: "سعر اشتراك 12 شهر قبل الخصم" },
    "gymmonth12subpricea": { en: "12 Months Subscription Price After Discount", ar: "سعر اشتراك 12 شهر بعد الخصم" },

    // Messages
    "Contact_us_on_these_numbers_daily_from_10_AM_to_10_PM": {
        en: "Contact us on these numbers daily from 10 AM to 10 PM.",
        ar: "تواصل معنا على هذه الأرقام يوميًا من الساعة 10 صباحًا حتى الساعة 10 مساءً."
    },
    "Please_select_a_location_on_the_map": {
        en: "Please select a location on the map",
        ar: "الرجاء تحديد موقع على الخريطة"
    }
};

export const getMappedValue = (key) => {
    const lang = i18next.language?.startsWith('ar') ? 'ar' : 'en';
    if (!key) return lang === 'ar' ? 'غير متوفر' : 'N/A';

    // Support both direct value and key from specificFields
    const lookupKey = typeof key === 'string' ? key.toLowerCase() : key;
    const entry = serviceMappings[lookupKey];

    if (!entry) return key;
    return typeof entry === 'string' ? entry : (entry[lang] || entry['en'] || key);
};
