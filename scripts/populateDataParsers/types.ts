export type Translations = Record<keyof typeof CountryCodeToName, string>;

export type Country = {
	name: string;
	'country-code': string; // number
	'alpha-2': string;
	'alpha-3': string;
	region: string; // continent
	'region-code': string; // number "013"
	'sub-region': string;
	'sub-region-code': string;
	'intermediate-region': string;
	'intermediate-region-code': string;
};

export type CountryTranslation = {
	LANG: string;
	LANG_NAME: string;
	COUNTRY_ALPHA2_CODE: string;
	COUNTRY_ALPHA3_CODE: string;
	COUNTRY_NUMERIC_CODE: string;
	COUNTRY_NAME: string;
};

export type CountryWithTranslations = Country & {
	translations: Translations;
};

export type City = {
	name: string;
	subcountry: string;
	country: string;
	geonameid: string;
	uuid: string;
	'country-alpha-2': string;
};

export type Office = {
	author: string;
	city: string;
	url: string;
	cityUUID: string;
};

export type OfficesByCountry = Record<string, Office[]>[];

export enum CountryCodeToName {
	AD = 'Andorra',
	AE = 'United Arab Emirates',
	AF = 'Afghanistan',
	AG = 'Antigua and Barbuda',
	AI = 'Anguilla',
	AL = 'Albania',
	AM = 'Armenia',
	AO = 'Angola',
	AR = 'Argentina',
	AS = 'American Samoa',
	AT = 'Austria',
	AU = 'Australia',
	AW = 'Aruba',
	AZ = 'Azerbaijan',
	BA = 'Bosnia and Herzegovina',
	BB = 'Barbados',
	BD = 'Bangladesh',
	BE = 'Belgium',
	BF = 'Burkina Faso',
	BG = 'Bulgaria',
	BH = 'Bahrain',
	BI = 'Burundi',
	BJ = 'Benin',
	BM = 'Bermuda',
	BR = 'Brazil',
	BS = 'Bahamas',
	BT = 'Bhutan',
	BW = 'Botswana',
	BY = 'Belarus',
	BZ = 'Belize',
	CA = 'Canada',
	CF = 'Central African Republic',
	CH = 'Switzerland',
	CK = 'Cook Islands',
	CL = 'Chile',
	CM = 'Cameroon',
	CN = 'China',
	CO = 'Colombia',
	CR = 'Costa Rica',
	CU = 'Cuba',
	CX = 'Christmas Island',
	CY = 'Cyprus',
	DE = 'Germany',
	DJ = 'Djibouti',
	DK = 'Denmark',
	DM = 'Dominica',
	DO = 'Dominican Republic',
	DZ = 'Algeria',
	EC = 'Ecuador',
	EE = 'Estonia',
	EG = 'Egypt',
	EH = 'Western Sahara',
	ER = 'Eritrea',
	ES = 'Spain',
	ET = 'Ethiopia',
	FI = 'Finland',
	FJ = 'Fiji',
	FO = 'Faroe Islands',
	FR = 'France',
	GA = 'Gabon',
	GD = 'Grenada',
	GE = 'Georgia',
	GF = 'French Guiana',
	GG = 'Guernsey',
	GH = 'Ghana',
	GI = 'Gibraltar',
	GL = 'Greenland',
	GM = 'Gambia',
	GN = 'Guinea',
	GP = 'Guadeloupe',
	GQ = 'Equatorial Guinea',
	GR = 'Greece',
	GS = 'South Georgia and the South Sandwich Islands',
	GT = 'Guatemala',
	GU = 'Guam',
	GW = 'Guinea-Bissau',
	GY = 'Guyana',
	HK = 'Hong Kong',
	HN = 'Honduras',
	HR = 'Croatia',
	HT = 'Haiti',
	HU = 'Hungary',
	ID = 'Indonesia',
	IE = 'Ireland',
	IL = 'Israel',
	IM = 'Isle of Man',
	IN = 'India',
	IQ = 'Iraq',
	IS = 'Iceland',
	IT = 'Italy',
	JE = 'Jersey',
	JM = 'Jamaica',
	JO = 'Jordan',
	JP = 'Japan',
	KE = 'Kenya',
	KG = 'Kyrgyzstan',
	KH = 'Cambodia',
	KI = 'Kiribati',
	KM = 'Comoros',
	KN = 'Saint Kitts and Nevis',
	KW = 'Kuwait',
	KY = 'Cayman Islands',
	KZ = 'Kazakhstan',
	LB = 'Lebanon',
	LC = 'Saint Lucia',
	LI = 'Liechtenstein',
	LK = 'Sri Lanka',
	LR = 'Liberia',
	LS = 'Lesotho',
	LT = 'Lithuania',
	LU = 'Luxembourg',
	LV = 'Latvia',
	LY = 'Libya',
	MA = 'Morocco',
	MC = 'Monaco',
	ME = 'Montenegro',
	MG = 'Madagascar',
	MH = 'Marshall Islands',
	ML = 'Mali',
	MM = 'Myanmar',
	MN = 'Mongolia',
	MO = 'Macao',
	MP = 'Northern Mariana Islands',
	MQ = 'Martinique',
	MR = 'Mauritania',
	MS = 'Montserrat',
	MT = 'Malta',
	MU = 'Mauritius',
	MV = 'Maldives',
	MW = 'Malawi',
	MX = 'Mexico',
	MY = 'Malaysia',
	MZ = 'Mozambique',
	NA = 'Namibia',
	NC = 'New Caledonia',
	NE = 'Niger',
	NF = 'Norfolk Island',
	NG = 'Nigeria',
	NI = 'Nicaragua',
	NL = 'Netherlands',
	NO = 'Norway',
	NP = 'Nepal',
	NR = 'Nauru',
	NU = 'Niue',
	NZ = 'New Zealand',
	OM = 'Oman',
	PA = 'Panama',
	PE = 'Peru',
	PF = 'French Polynesia',
	PG = 'Papua New Guinea',
	PH = 'Philippines',
	PK = 'Pakistan',
	PL = 'Poland',
	PM = 'Saint Pierre and Miquelon',
	PN = 'Pitcairn',
	PR = 'Puerto Rico',
	PT = 'Portugal',
	PW = 'Palau',
	PY = 'Paraguay',
	QA = 'Qatar',
	RO = 'Romania',
	RS = 'Serbia',
	RW = 'Rwanda',
	SA = 'Saudi Arabia',
	SB = 'Solomon Islands',
	SC = 'Seychelles',
	SD = 'Sudan',
	SE = 'Sweden',
	SG = 'Singapore',
	SI = 'Slovenia',
	SJ = 'Svalbard and Jan Mayen',
	SK = 'Slovakia',
	SL = 'Sierra Leone',
	SM = 'San Marino',
	SN = 'Senegal',
	SO = 'Somalia',
	SR = 'Suriname',
	SS = 'South Sudan',
	ST = 'Sao Tome and Principe',
	SV = 'El Salvador',
	TC = 'Turks and Caicos Islands',
	TD = 'Chad',
	TF = 'French Southern Territories',
	TG = 'Togo',
	TH = 'Thailand',
	TJ = 'Tajikistan',
	TM = 'Turkmenistan',
	TN = 'Tunisia',
	TO = 'Tonga',
	TR = 'Turkey',
	TT = 'Trinidad and Tobago',
	TV = 'Tuvalu',
	UA = 'Ukraine',
	UG = 'Uganda',
	UY = 'Uruguay',
	UZ = 'Uzbekistan',
	VC = 'Saint Vincent and the Grenadines',
	VU = 'Vanuatu',
	WF = 'Wallis and Futuna',
	WS = 'Samoa',
	YE = 'Yemen',
	YT = 'Mayotte',
	ZA = 'South Africa',
	ZM = 'Zambia',
	ZW = 'Zimbabwe',
	AX = 'Aland Islands',
	BL = 'Saint Barthelemy',
	BN = 'Brunei',
	BO = 'Bolivia',
	BQ = 'Bonaire, Saint Eustatius and Saba',
	CC = 'Cocos Islands',
	CD = 'Democratic Republic of the Congo',
	CG = 'Republic of the Congo',
	CI = 'Ivory Coast',
	CV = 'Cape Verde',
	CW = 'Curacao',
	CZ = 'Czech Republic',
	FK = 'Falkland Islands',
	FM = 'Micronesia',
	GB = 'United Kingdom',
	IR = 'Iran',
	KP = 'North Korea',
	KR = 'South Korea',
	LA = 'Laos',
	MD = 'Moldova',
	MF = 'Saint Martin',
	MK = 'Macedonia',
	PS = 'Palestinian Territory',
	RE = 'Reunion',
	RU = 'Russia',
	SH = 'Saint Helena',
	SX = 'Sint Maarten',
	SY = 'Syria',
	SZ = 'Swaziland',
	TL = 'East Timor',
	TW = 'Taiwan',
	TZ = 'Tanzania',
	US = 'United States',
	VA = 'Vatican',
	VE = 'Venezuela',
	IO = 'British Virgin Islands',
	VI = 'U.S. Virgin Islands',
	VN = 'Vietnam'
}

export enum LanguageCodeToName {
	'AF' = 'AFRIKAANS',
	'AM' = 'AMHARIC',
	'AR' = 'ARABIC',
	'AZ' = 'AZERBAIJANI',
	'BE' = 'BELARUSIAN',
	'BG' = 'BULGARIAN',
	'BN' = 'BENGALI',
	'BO' = 'TIBETAN STANDARD',
	'CA' = 'CATALAN',
	'CS' = 'CZECH',
	'CY' = 'WELSH',
	'DA' = 'DANISH',
	'DE' = 'GERMAN',
	'EE' = 'EWE',
	'EL' = 'GREEK',
	'EN' = 'ENGLISH',
	'EO' = 'ESPERANTO',
	'ES' = 'SPANISH',
	'ET' = 'ESTONIAN',
	'EU' = 'BASQUE',
	'FA' = 'PERSIAN',
	'FI' = 'FINNISH',
	'FO' = 'FAROESE',
	'FR' = 'FRENCH',
	'GA' = 'IRISH',
	'GL' = 'GALICIAN',
	'GU' = 'GUJARATI',
	'HE' = 'HEBREW',
	'HI' = 'HINDI',
	'HR' = 'CROATIAN',
	'HU' = 'HUNGARIAN',
	'HY' = 'ARMENIAN',
	'IA' = 'INTERLINGUA',
	'ID' = 'INDONESIAN',
	'IS' = 'ICELANDIC',
	'IT' = 'ITALIAN',
	'JA' = 'JAPANESE',
	'KA' = 'GEORGIAN',
	'KI' = 'KIKUYU',
	'KM' = 'KHMER',
	'KN' = 'KANNADA',
	'KO' = 'KOREAN',
	'LG' = 'GANDA',
	'LO' = 'LAO',
	'LT' = 'LITHUANIAN',
	'LV' = 'LATVIAN',
	'MK' = 'MACEDONIAN',
	'ML' = 'MALAYALAM',
	'MR' = 'MARATHI',
	'MS' = 'MALAY',
	'MT' = 'MALTESE',
	'MY' = 'BURMESE',
	'NB' = 'NORWEGIAN BOKMAL',
	'NE' = 'NEPALI',
	'NL' = 'DUTCH',
	'NN' = 'NORWEGIAN NYNORSK',
	'NO' = 'NORWEGIAN',
	'OR' = 'ORIYA',
	'PL' = 'POLISH',
	'PT' = 'PORTUGUESE',
	'RM' = 'ROMANSH',
	'RO' = 'ROMANIAN',
	'RU' = 'RUSSIAN',
	'SE' = 'NORTHERN SAMI',
	'SK' = 'SLOVAK',
	'SL' = 'SLOVENE',
	'SN' = 'SHONA',
	'SQ' = 'ALBANIAN',
	'SR' = 'SERBIAN',
	'SV' = 'SWEDISH',
	'TA' = 'TAMIL',
	'TE' = 'TELUGU',
	'TH' = 'THAI',
	'TI' = 'TIGRINYA',
	'TL' = 'TAGALOG',
	'TR' = 'TURKISH',
	'UK' = 'UKRAINIAN',
	'UR' = 'URDU',
	'VI' = 'VIETNAMESE',
	'ZH-CN' = 'CHINESE SIMPLIFIED',
	'ZH-TW' = 'CHINESE TRADITIONAL'
}
