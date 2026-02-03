export interface CompanyLocation {
    country: string;
    city: string;
    Office: string;
    company: string;
    address: string;
    phone?: string;
    fax?: string;
    lat: number;
    lng: number;
}

export const companyLocations: CompanyLocation[] = [
    // {
    //     country: "India",
    //     city: "Gurugram",
    //     Office: "Head Office",
    //     company: "Taikisha Engineering India Private Ltd.",
    //     address: "Plot No.26, Udyog Vihar, Phase-4, Gurugram, Haryana, Pin-122015, India",
    //     phone: "91-124-234-8246",
    //     fax: "91-124-234-8247",
    //     lat: 28.4941,
    //     lng: 77.0809
    // },
    // {
    //     country: "India",
    //     city: "Manesar (Gurugram)",
    //     Office: "TEI Technical Centre (Manesar)",
    //     company: "Taikisha Engineering India Private Ltd.",
    //     address: "Plot No.108, Sector-3, IMT Manesar, Gurugram-122052, India",
    //     lat: 28.3739,
    //     lng: 76.8441
    // },
     // ========================= INDIA =========================
  {
    country: "India",
    city: "Gurugram",
    Office: "Head Office",
    company: "TEI Taikisha Engineering India Private Ltd.",
    address: "Plot No.26, Udyog Vihar, Phase-4, Gurugram, Haryana, Pin-122015, India",
    phone: "91-124-234-8246",
    fax: "91-124-234-8247",
    lat: 28.4941,
    lng: 77.0809
  },
  {
    country: "India",
    city: "Manesar (Gurugram)",
    Office: "TEI Technical Centre (Manesar)",
    company: "Taikisha Engineering India Private Ltd.",
    address: "Plot No.108, Sector-3, IMT Manesar, Gurugram-122052, India",
    lat: 28.3739,
    lng: 76.8441
  },
  {
    country: "India",
    city: "Manesar (Gurugram)",
    Office: "TEI Electrical & Automation Control Panel Plant Manesar",
    company: "Taikisha Engineering India Private Ltd.",
    address: "Plot No.19, Sector-3, IMT Manesar, Gurugram-122050, India",
    lat: 28.47,
    lng: 77.06
  },
  {
    country: "India",
    city: "Thane (Mumbai)",
    Office: "TEI Mumbai Office",
    company: "Taikisha Engineering India Private Ltd.",
    address: "210, 2nd Floor, Opal Square, Wagle Industrial Area, Thane-400604, India",
    lat: 19.18,
    lng: 72.98
  },
  {
    country: "India",
    city: "Pune",
    Office: "TEI MFG Plant Pune",
    company: "Taikisha Engineering India Private Ltd.",
    address: "GAT No.321/323, Village Kondapuri, Taluka Shirur, Dist. Pune-412209, India",
    lat: 18.7264,
    lng: 74.2001
  },
  {
    country: "India",
    city: "Pune",
    Office: "TEI Conveyor Factory Pune",
    company: "Taikisha Engineering India Private Ltd.",
    address: "Industrial Plot No.BG-71/1/4, Indrayani Chowk, MIDC Bhosari, Pune-411026, India",
    lat: 18.651,
    lng: 73.847
  },
  {
    country: "India",
    city: "Hyderabad (Sangareddy District)",
    Office: "TEI Nicomac Taikisha Clean Rooms Private Limited",
    company: "Nicomac Taikisha Clean Rooms Private Limited",
    address:
      "Plot No.116, IDA Bollaram, Near Miyapur, Sangareddy District, Hyderabad Medak Telangana 50232, India",
    phone: "91-951-519-2020",
    lat: 17.5443,
    lng: 78.3486
  },

  // ========================= JAPAN (General) =========================
  {
    country: "Japan",
    city: "Tokyo (Shinjuku)",
    Office: "Sumitomo Fudosan Shinjuku Grand Tower",
    company: "Taikisha",
    address: "8-17-1, Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-6129, Japan",
    phone: "81-(0)3-3365-5320",
    fax: "81-(0)3-5338-5195",
    // Source had swapped labels; values below are (Latitude=N, Longitude=E)
    lat: 35.695972, // 35°41'45.701\"N
    lng: 139.690472 // 139°41'25.699\"E
  },
  {
    country: "Japan",
    city: "Tokyo (Shinjuku)",
    Office: "Information Systems Dept. (D-Tower Nishi Shinjuku)",
    company: "Taikisha",
    address: "D-Tower Nishi Shinjuku, 6-11-3, Nishi-Shinjuku, Shinjuku-Ku, Tokyo 160-0023, Japan",
    phone: "81-(0)3-4333-4499",
    lat: 35.695972, // 35°41'45.701\"N
    lng: 139.690472 // 139°41'25.699\"E
  },

  // ========================= GREEN TECHNOLOGY SYSTEM DIVISION =========================
  {
    country: "Japan",
    city: "Tokyo (Shinjuku)",
    Office: "Green Technology System Division - Head Office",
    company: "Taikisha",
    address: "Sumitomo Fudosan Shinjuku Grand Tower, 8-17-1, Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-6129, Japan",
    phone: "81-(0)3-5338-5126",
    fax: "81-(0)3-5338-5203",
    // Source provided 43.05N, 141.35E (does not match Tokyo); preserved as provided.
    lat: 43.05,
    lng: 141.35
  },
  {
    country: "Japan",
    // region: "Hokkaido",
    city: "Sapporo",
    Office: "Sapporo Office",
    company: "Taikisha",
    address: "3-1 Kita 2 Jo Nishi, Chuo-ku, Sapporo-shi, Hokkaido 060-0004, Japan",
    phone: "81-(0)11-222-3371",
    fax: "81-(0)11-222-3741",
    lat: 43.05,
    lng: 141.35
  },
  {
    country: "Japan",
    // region: "Tohoku",
    city: "Sendai",
    Office: "Tohoku Branch Office",
    company: "Taikisha",
    address: "Urbannet Sendai-chuo Building, 4-4-19, Chuo, Aoba-ku, Sendai city, Miyagi 980-0021, Japan",
    phone: "81-(0)22-221-7800",
    fax: "81-(0)22-265-4596",
    lat: 38.26,
    lng: 140.88
  },
  {
    country: "Japan",
    // region: "Kanto",
    city: "Saitama (Omiya)",
    Office: "Kanto-Shinetsu Office",
    company: "Taikisha",
    address: "Daiei Twin Bldg. S-kan, 4-123, Miyamachi, Omiya-ku, Saitama city, Saitama 330-0802, Japan",
    phone: "81-(0)48-644-5432",
    fax: "81-(0)48-644-5056",
    lat: 35.861,
    lng: 139.649
  },
  {
    country: "Japan",
    // region: "Kanto",
    city: "Tokyo (Nakano)",
    Office: "Tokyo Branch Office",
    company: "Taikisha",
    address: "Sumitomo Nakanosakaue Bldg., 1-38-1, Chuoh, Nakano-ku, Tokyo 164-0011, Japan",
    phone: "81-(0)3-5348-7123",
    fax: "81-(0)3-5348-7133",
    lat: 35.7,
    lng: 139.67
  },
  {
    country: "Japan",
    // region: "Kanto",
    city: "Yokohama",
    Office: "Yokohama Office",
    company: "Taikisha",
    address: "2-26-4, Tsuruyacho, Kanagawa-ku, Yokohama city, Kanagawa 221-0835, Japan",
    phone: "81-(0)45-323-3771",
    fax: "81-(0)45-4625",
    lat: 35.4689,
    lng: 139.6216
  },
  {
    country: "Japan",
    // region: "Kanto",
    city: "Tsukuba (Ibaraki)",
    Office: "Ibaraki Office",
    company: "Taikisha",
    address: "2-2-4, Takezono, Tsukuba city, Ibaraki 305-0032, Japan",
    phone: "81-(0)29-850-3001",
    fax: "81-(0)29-852-5530",
    lat: 36.0786,
    lng: 140.1202
  },
  {
    country: "Japan",
    // region: "Chubu",
    city: "Nagoya",
    Office: "Chubu Branch Office",
    company: "Taikisha",
    address: "Nagoya Marubeni Bldg., 2-2-2, Nishiki, Naka-ku, Nagoya 460-0003, Japan",
    phone: "81-(0)52-211-1536",
    fax: "81-(0)52-211-1261",
    lat: 35.17,
    lng: 136.91
  },
  {
    country: "Japan",
    // region: "Hokuriku",
    city: "Kanazawa",
    Office: "Hokuriku Office",
    company: "Taikisha",
    address: "1-331, Minamishijima, Kanazawa city, Ishikawa 921-8134, Japan",
    phone: "81-(0)76-298-4649",
    fax: "81-(0)76-298-4659",
    lat: 36.561,
    lng: 136.656
  },
  {
    country: "Japan",
    // region: "Chubu",
    city: "Nagano",
    Office: "Nagano Office",
    company: "Taikisha",
    address: "Choei Minamiishido Bldg., 1293, Minamiishidocho, Nagano city, Nagano 380-0824, Japan",
    phone: "81-(0)26-219-6083",
    fax: "81-(0)26-219-6084",
    lat: 36.64858594,
    lng: 138.19476132
  },
  {
    country: "Japan",
    // region: "Kinki",
    city: "Osaka",
    Office: "Osaka Branch Office",
    company: "Taikisha",
    address: "Shin-Daibiru Bldg., 1-2-1, Doujimahama, Kita-ku, Osaka 530-0004, Japan",
    phone: "81-(0)6-6440-7330",
    fax: "81-(0)6-6440-7333",
    lat: 34.6937,
    lng: 135.5022
  },
  {
    country: "Japan",
    // region: "Kinki",
    city: "Kyoto",
    Office: "Kyoto Office",
    company: "Taikisha",
    address: "520-1, Watayacho, Nakagyo-ku, Kyoto 604-8181, Japan",
    phone: "81-(0)75-212-6201",
    fax: "81-(0)75-212-6202",
    lat: 35.02125,
    lng: 135.7556
  },
  {
    country: "Japan",
    // region: "Kinki",
    city: "Kobe",
    Office: "Kobe Office",
    company: "Taikisha",
    address: "3-1-14, Gokodori, Chuo-ku, Kobe city, Hyogo 651-0087, Japan",
    phone: "81-(0)78-232-1841",
    fax: "81-(0)78-231-0561",
    // 34°41′26″N, 135°11′45″E
    lat: 34.690556,
    lng: 135.195833
  },
  {
    country: "Japan",
    // region: "Chugoku",
    city: "Hiroshima",
    Office: "Chugoku Office",
    company: "Taikisha",
    address: "Sumitomoseimei Hiroshima Heiwa Odori Dai 2 Bldg., Nakamachi, Naka-ku, Hiroshima 730-0037, Japan",
    phone: "81-(082)247-5541",
    fax: "81-(082)249-5952",
    lat: 34.394,
    lng: 132.454
  },
  {
    country: "Japan",
    // region: "Kyushu",
    city: "Fukuoka",
    Office: "Kyushu Branch Office",
    company: "Taikisha",
    address: "Hakata City Ark Bldg., 1-4-18, Hakata-eki Minami, Hakata-ku, Fukuoka 812-0016, Japan",
    phone: "81-(0)92-431-2147",
    fax: "81-(0)92-431-2193",
    lat: 33.5878,
    lng: 130.4208
  },

  // ========================= SINGAPORE =========================
  {
    country: "Singapore",
    city: "Singapore",
    Office: "ASEAN Management Dept.",
    company: "Taikisha",
    address: "2 International Business Park #12-01, The Strategy, Tower 1, Singapore 609930",
    phone: "+(65) 64202561",
    fax: "+(65) 64202560",
    lat: 1.33,
    lng: 103.75
  },

  // ========================= PAINT FINISHING SYSTEM DIVISION =========================
  {
    country: "Japan",
    city: "Tokyo (Shinjuku)",
    Office: "Paint Finishing System Division - Head Office",
    company: "Taikisha",
    address: "Sumitomo Fudosan Shinjuku Grand Tower, 8-17-1, Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-6129, Japan",
    phone: "81-(0)3-5338-5165",
    fax: "81-(0)3-5338-5213",
    lat: 35.69,
    lng: 139.69
  },
  {
    country: "Japan",
    city: "Tokyo (Shinjuku)",
    Office: "Paint Finishing System Division - East Japan Head Office",
    company: "Taikisha",
    address: "Sumitomo Fudosan Shinjuku Grand Tower, 8-17-1, Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-6129, Japan",
    phone: "81-(0)3-5338-5168",
    fax: "81-(0)3-5338-5217",
    lat: 35.69,
    lng: 139.69
  },
  {
    country: "Japan",
    city: "Nagoya",
    Office: "Paint Finishing System Division - West Japan Head Office",
    company: "Taikisha",
    address: "Nagoya Marubeni Bldg., 2-2-2, Nishiki, Naka-ku, Nagoya 460-0003, Japan",
    phone: "81-(0)52-211-1536",
    fax: "81-(0)52-211-1261",
    lat: 35.17037,
    lng: 136.89935
  },

  // ========================= AUTOMATION / R&D =========================
  {
    country: "Japan",
    city: "Zama (Kanagawa)",
    Office: "Automation System Head Office",
    company: "Taikisha",
    address: "2-14-10, Komatsubara, Zama-shi, Kanagawa 252-0002, Japan",
    phone: "81-(0)46-253-8837",
    fax: "81-(0)46-254-8169",
    lat: 35.5,
    lng: 139.43
  },
  {
    country: "Japan",
    city: "Aikawa (Kanagawa)",
    Office: "Research and Development Center - TAIKISHA INNOVATION SITE AIkawa",
    company: "Taikisha",
    address: "359-8, Mimasu, Aikawa-cho, Aiko-gun, Kanagawa 243-0308, Japan",
    phone: "81-(0)46-281-3661",
    fax: "81-(0)46-281-3609",
    lat: 35.528889,
    lng: 139.321667
  },
  {
    country: "Japan",
    city: "Zama (Kanagawa)",
    Office: "Zama Technical Center",
    company: "Taikisha",
    address: "2-14-10, Komatsubara, Zama-shi, Kanagawa 252-0002, Japan",
    phone: "81-(0)46-253-8837",
    fax: "81-(0)46-254-8169",
    lat: 35.5,
    lng: 139.43
  },

  // ========================= CHINA =========================
  {
    country: "China",
    city: "Beijing",
    Office: "WuZhou Taikisha Engineering Co., Ltd.",
    company: "WuZhou Taikisha Engineering Co., Ltd.",
    address: "Room403 LongBao Building, 36 Maizidian Street, Chaoyang District, Beijing 100125, China",
    phone: "86-10-6590-8251",
    fax: "86-10-6590-8257",
    lat: 39.93,
    lng: 116.28
  },
  {
    country: "China",
    city: "Shanghai",
    Office: "WuZhou Taikisha Engineering Co., Ltd. Shanghai Office",
    company: "WuZhou Taikisha Engineering Co., Ltd.",
    address: "#2503, Li tong Guang chang, #1350 Si Chuang Bei Lu, Hongkou, Shanghai 200080, China",
    phone: "86-21-5620-2025",
    fax: "86-21-5620-2056",
    lat: 31.2,
    lng: 121.4
  },
  {
    country: "China",
    city: "Shanghai",
    Office: "Tianjin Dongchun-Taiki Metal Finishing & Conveyor System Manufacturing Co., Ltd. (Shanghai)",
    company: "Tianjin Dongchun-Taiki Metal Finishing & Conveyor System Manufacturing Co., Ltd.",
    address: "Unit 906, 51 Wuzhong Road, Xuhui District, Shanghai 200035, China",
    phone: "86-21-6443-0780",
    lat: 31.2,
    lng: 121.4
  },
  {
    country: "China",
    city: "Tianjin (Jinghai)",
    Office: "Tianjin Dongchun-Taiki Metal Finishing & Conveyor System Manufacturing Co., Ltd. (Tianjin)",
    company: "Tianjin Dongchun-Taiki Metal Finishing & Conveyor System Manufacturing Co., Ltd.",
    address: "NO.9, NO.7 Road, North area of Economic Development Zone of Jinghai, Tianjin 301617, China",
    phone: "86-22-6864-5848",
    fax: "86-22-6864-5849",
    lat: 39.0,
    lng: 117.0
  },
  {
    country: "China",
    city: "Tianjin (Jinghai)",
    Office: "Tianjin Taikisha Paint Finishing System Ltd.",
    company: "Tianjin Taikisha Paint Finishing System Ltd.",
    address: "No7, Road 7, North Side, Economic Development Zone of Jinghai, Tianjin 301600, China",
    phone: "86-22-6829-9518",
    fax: "86-22-6829-9510",
    // 39°08′ N, 117°11′ E
    lat: 39.133333,
    lng: 117.183333
  },

  // ========================= TAIWAN =========================
  {
    country: "Taiwan",
    city: "Zhubei City (Hsinchu)",
    Office: "Taikisha (Taiwan) Ltd.",
    company: "Taikisha (Taiwan) Ltd.",
    address: "[Tai Yuen Hi-Tech Industrial Park] 3F, No.6, Taiyuen 1st Street, Zhubei City, Hsinchu, Taiwan, ROC",
    phone: "886-3-560-1661",
    fax: "886-3-560-1671",
    lat: 24.81,
    lng: 120.97
  },

  // ========================= KOREA =========================
  {
    country: "Korea",
    city: "Seoul",
    Office: "Taikisha Korea Ltd.",
    company: "Taikisha Korea Ltd.",
    address: "#1101, Mario Tower, 28, Digital-ro 30-gil, Guro-gu, Seoul 08389, Korea",
    phone: "82-27-830-270",
    fax: "82-27-830-274",
    lat: 37.4944,
    lng: 126.8563
  },

  // ========================= THAILAND =========================
  {
    country: "Thailand",
    city: "Bangkok",
    Office: "Taikisha (Thailand) Co., Ltd. (Head Office) - Paint Finishing Division",
    company: "Taikisha (Thailand) Co., Ltd.",
    address: "11th Floor, AIA Sathorn Tower, 11/1 South Sathon Road, Yannawa, Sathon, Bangkok 10120, Thailand",
    phone: "66-2-236-8055 / 66-2267-6400",
    fax: "66-2-236-3502 / 66-2267-6405",
    // Source coordinates appear inconsistent for Bangkok; preserved as provided.
    lat: 37.49,
    lng: 126.86
  },
  {
    country: "Thailand",
    city: "Bangkok",
    Office: "Taikisha Trading (Thailand) Co., Ltd.",
    company: "Taikisha Trading (Thailand) Co., Ltd.",
    address: "11th Floor, AIA Sathorn Tower, 11/1 South Sathon Road, Yannawa, Sathon, Bangkok 10120, Thailand",
    phone: "66-2-236-8055",
    fax: "66-2-236-3502",
    // Source coordinates appear inconsistent for Bangkok; preserved as provided.
    lat: 37.49,
    lng: 126.86
  },
  {
    country: "Thailand",
    city: "Bangkok",
    Office: "Token Interior & Design Co., Ltd.",
    company: "Token Interior & Design Co., Ltd.",
    address: "11th Floor, AIA Sathorn Tower, 11/1 South Sathon Road, Yannawa, Sathon, Bangkok 10120, Thailand",
    phone: "66-2-236-9103",
    fax: "66-2-236-0119",
    // Source coordinates appear inconsistent for Bangkok; preserved as provided.
    lat: 37.49,
    lng: 126.86
  },
  {
    country: "Thailand",
    city: "Bangplee (Samutprakan)",
    Office: "Taikisha (Thailand) Co., Ltd. - Bangplee Factory",
    company: "Taikisha (Thailand) Co., Ltd.",
    address: "445 Moo 17, Bangplee Industrial Estate Soi 6, Bangsaothong Sub-District, Samutprakan Province 10540, Thailand",
    phone: "66-2315-3144",
    fax: "66-2315-3152",
    // 13°35′42″N, 100°49′50″E
    lat: 13.595,
    lng: 100.830556
  },
  {
    country: "Thailand",
    city: "Bangsaothong (Samutprakan)",
    Office: "Thaiken Maintenance & Service Co., Ltd.",
    company: "Thaiken Maintenance & Service Co., Ltd.",
    address: "445 Moo 17, Thepharak Rd., T. Bangsaothong, Amphur Bangsaothong, Samutprakarn 10540, Thailand",
    phone: "66-2-705-8744",
    fax: "66-2-705-8748",
    lat: 13.595,
    lng: 100.830556
  },

  // ========================= VIETNAM =========================
  {
    country: "Vietnam",
    city: "Hanoi",
    Office: "Taikisha Vietnam Engineering Inc.",
    company: "Taikisha Vietnam Engineering Inc.",
    address: "12th Floor, Detech Tower, No.8 Ton That Thuyet, Cau Giay Ward, Hanoi, Vietnam",
    phone: "84-24-3562-2750",
    fax: "84-24-3562-2751",
    lat: 21.03,
    lng: 105.87
  },
  {
    country: "Vietnam",
    city: "Ho Chi Minh City",
    Office: "Taikisha Vietnam Engineering Inc. - Ho Chi Minh Office",
    company: "Taikisha Vietnam Engineering Inc.",
    address: "6th Floor, AP Tower, No.518B Dien Bien Phu, Thanh My Tay Ward, Ho Chi Minh City, Vietnam",
    phone: "84-28-3899-4703",
    fax: "84-28-3899-4737",
    lat: 10.82,
    lng: 106.67
  },

  // ========================= LAOS =========================
  {
    country: "Lao PDR",
    city: "Vientiane",
    Office: "Taikisha Lao Co., Ltd.",
    company: "Taikisha Lao Co., Ltd.",
    address:
      "1-2 Room, 1st Floor, 1st Plant office, Plant Area, Ruyi road, located 21 Km, Saysettha Development Zone, Nano Village, Saysettha, Vientiane Capital, Lao PDR",
    phone: "856-21-737-066",
    // 18°00' N, 102°37' E
    lat: 18.0,
    lng: 102.616667
  },

  // ========================= CAMBODIA =========================
  {
    country: "Cambodia",
    city: "Phnom Penh",
    Office: "Taikisha (Cambodia) Co.,Ltd.",
    company: "Taikisha (Cambodia) Co.,Ltd.",
    address:
      "Building#155 TK Royal One Unit#4-C, Confederation De La Russie Blvd(110) and Street 122, Phum8, Sangkat Terk Laak1, Khan Toul Kork, Phnom Penh, Cambodia",
    phone: "855-23-729-317",
    fax: "855-23-729-318",
    lat: 11.5595,
    lng: 104.8975
  },

  // ========================= PHILIPPINES =========================
  {
    country: "Philippines",
    city: "Makati City",
    Office: "Taikisha Philippines Inc.",
    company: "Taikisha Philippines Inc.",
    address: "5th Floor, Golden Rock Bldg., No.168 Salcedo St., Legaspi Village, Makati City 1229, Philippines",
    phone: "63-2-8818-1707",
    fax: "63-2-8816-1516",
    lat: 14.55,
    lng: 121.023
  },

  // ========================= SINGAPORE (Operating) =========================
  {
    country: "Singapore",
    city: "Singapore",
    Office: "Taikisha (Singapore) Pte. Ltd.",
    company: "Taikisha (Singapore) Pte. Ltd.",
    address: "2 International Business Park #11-01, The Strategy, Tower 1, Singapore 609930",
    phone: "65-6223-9928",
    fax: "65-6223-9328",
    lat: 1.3379,
    lng: 103.7959
  },

  // ========================= MALAYSIA =========================
  {
    country: "Malaysia",
    city: "Subang Jaya",
    Office: "Taikisha Engineering (M) Sdn. Bhd. (Head Office)",
    company: "Taikisha Engineering (M) Sdn. Bhd.",
    address: "Suite W306, 3rd Floor West Wing, Wisma Cons Plant 1, No.2, Jalan SS 16/4, Subang Jaya, Selangor 47500, Malaysia",
    phone: "60-3-5623-7200",
    fax: "60-3-5623-7201",
    lat: 3.081,
    lng: 101.584
  },
  {
    country: "Malaysia",
    city: "Simpang Ampat (Penang)",
    Office: "Taikisha Engineering (M) Sdn. Bhd. - Penang Office",
    company: "Taikisha Engineering (M) Sdn. Bhd.",
    address: "No.34 1st Floor, Jalan Tambun Indah 1, Taman Tambun Indah, 14000 Simpang Ampat, Pulau Pinang, Malaysia",
    phone: "60-4588-0515",
    fax: "60-4588-7091",
    lat: 5.33,
    lng: 100.43
  },
  {
    country: "Malaysia",
    city: "Petaling Jaya",
    Office: "Makiansia Engineering (M) Sdn. Bhd.",
    company: "Makiansia Engineering (M) Sdn. Bhd.",
    address: "No.141, Jalan SS 17/1A, Subang Jaya, 47500 Petaling Jaya, Selangor Darul Ehsan, Malaysia",
    phone: "60-3-5635-2394",
    fax: "60-3-5634-7004",
    lat: 3.0737,
    lng: 101.5862
  },

  // ========================= INDONESIA =========================
  {
    country: "Indonesia",
    city: "Jakarta",
    Office: "P.T. Taikisha Indonesia Engineering",
    company: "P.T. Taikisha Indonesia Engineering",
    address: "Menara Bidakara I, 13th Floor, Jl. Jend. Gatot Subroto Kav. 71-73, Jakarta 12870, Indonesia",
    phone: "62-21-8379-3325",
    fax: "62-21-8379-3310",
    lat: -6.17,
    lng: 106.87
  },
  {
    country: "Indonesia",
    city: "Karawang (West Java)",
    Office: "P.T. Taikisha Manufacturing Indonesia",
    company: "P.T. Taikisha Manufacturing Indonesia",
    address: "Jl. Permata V Lot EE-5, Kawasan Industri KIIC, Karawang 41361, West Java, Indonesia",
    phone: "62-21-8911-4831",
    fax: "62-21-8911-4833",
    // 6°18′0″S, 107°0′0″E
    lat: -6.3,
    lng: 107.0
  },

  // ========================= AMERICAS =========================
  {
    country: "USA",
    city: "Troy, Michigan",
    Office: "Taikisha USA, Inc. (Troy Head Office)",
    company: "Taikisha USA, Inc.",
    address: "901 Tower Drive, Suite 300, Troy, Michigan 48098-2817, U.S.A.",
    phone: "1-248-786-5000",
    fax: "1-248-786-5001",
    lat: 42.6064,
    lng: -83.1498
  },
  {
    country: "USA",
    city: "Auburn Hills, Michigan",
    Office: "Encore Automation LLC",
    company: "Encore Automation LLC",
    address: "50 Corporate Drive, Auburn Hills, Michigan 48326, U.S.A.",
    phone: "1-248-253-0200",
    fax: "1-248-418-2308",
    lat: 42.649,
    lng: -83.222
  },
  {
    country: "USA",
    city: "Columbus, Ohio",
    Office: "Taikisha USA, Inc. (Columbus Manufacturing Facility)",
    company: "Taikisha USA, Inc.",
    address: "1939 Refugee Rd., Columbus, Ohio 43207, U.S.A.",
    phone: "1-614-444-5602",
    fax: "1-614-444-5603",
    lat: 39.954,
    lng: -82.955
  },
  {
    country: "Canada",
    city: "Troy, Michigan (Listing for Canada entity)",
    Office: "Taikisha Canada Inc.",
    company: "Taikisha Canada Inc.",
    address: "901 Tower Drive, Suite 300, Troy, Michigan 48098-2817, U.S.A.",
    phone: "1-248-786-5000",
    fax: "1-248-786-5001",
    lat: 42.6064,
    lng: -83.1498
  },
  {
    country: "Mexico",
    city: "Querétaro",
    Office: "Taikisha de Mexico, S.A. de C.V.",
    company: "Taikisha de Mexico, S.A. de C.V.",
    address: "Blvd. Bernardo Quintana 300, Floor 9, Central South 76090, Querétaro, Querétaro, México",
    phone: "52-44-2641-5030",
    lat: 20.59,
    lng: -100.39
  },
  {
    country: "Brazil",
    city: "Jundiaí, São Paulo",
    Office: "Taikisha do Brasil Ltda.",
    company: "Taikisha do Brasil Ltda.",
    address: "Avenida Alexandre Ludke, 156 – piso superior, Vila Bandeirantes, Município de Jundiaí, São Paulo – CEP 13214-020, Brazil",
    phone: "55-11-4038-8880 / 55-11-4038-8904",
    lat: -23.21,
    lng: -46.84
  },

  // ========================= EUROPE =========================
  {
    country: "Germany",
    city: "Leinfelden-Echterdingen",
    Office: "Taikisha Deutschland GmbH",
    company: "Taikisha Deutschland GmbH",
    address: "Humboldtstraße 35, 70771 Leinfelden-Echterdingen, Germany",
    phone: "49-711-3406-5900",
    lat: 48.6937,
    lng: 9.139
  },
  {
    country: "Hungary",
    city: "Budapest",
    Office: "Taikisha Hungary Kft.",
    company: "Taikisha Hungary Kft.",
    address: "1112 Budapest, Gulyás utca 24/1, Hungary",
    lat: 47.486,
    lng: 19.072
  }

];
