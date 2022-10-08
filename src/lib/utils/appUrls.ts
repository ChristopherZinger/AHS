import { compact } from 'lodash';

type UrlInfo<T = null, R = null> = {
	getBase: T extends null ? () => string : (p: T) => string;
	getChunk: R extends null ? () => string : (p: R) => string;
};

const getChunk = (p?: string, ...args: (string | number)[]) => {
	return compact([p, ...args]).join('/');
};

const composeUrl = (...args: (string | number)[]) => {
	const result = compact(args).join('/');
	return result.startsWith('/') ? result : '/' + result;
};

// URL Getters
export const getHomeUrl = () => '/';

// commented out code below for future to remember how to use the system for url with params
// const officeUrlInfo: UrlInfo<null, { officeName: string }> = {
// 	getBase: () => '',
// 	getChunk: ({ officeName }) => getChunk('office', officeName)
// };
// export const getOfficeUrl = (officeName: string) =>
// 	composeUrl(
// 		officeUrlInfo.getBase(),
// 		officeUrlInfo.getChunk({ officeName })
// 	);

const authUrlInfo: UrlInfo = {
	getBase: () => '',
	getChunk: () => getChunk('auth')
};
const getAuthUrl = () =>
	composeUrl(authUrlInfo.getBase(), authUrlInfo.getChunk());

const loginUrlInfo: UrlInfo = {
	getBase: getAuthUrl,
	getChunk: () => getChunk('login')
};
export const getLoginUrl = () =>
	composeUrl(loginUrlInfo.getBase(), loginUrlInfo.getChunk());

const signupUrlInfo: UrlInfo = {
	getBase: getAuthUrl,
	getChunk: () => getChunk('signup')
};
export const getSigninUrl = () =>
	composeUrl(signupUrlInfo.getBase(), signupUrlInfo.getChunk());
