import crypto from 'crypto';
import qs from 'qs';
/**
 * @desc 判断给定的值是否为空
 * @param {any} val
 * @param {boolean} [deep=true] - 是否进行深度判断（对象和数组）
 */
export const isEmpty = (val, deep = true) => {
	let emptys = ['null', null, 'undefined', ''];
	if (emptys.includes(val)) return true;
	if (deep) {
		if (Object.prototype.toString.call(val) === '[object Array]') {
			return !val.length;
		} else if (Object.prototype.toString.call(val) === '[object Object]') {
			return JSON.stringify(val) === '{}';
		}
	}
	return false;
};
// 判断每一个参数是否为空
export const isEveryEmpty = (...params) => params.every(val => isEmpty(val));
// 判断给定的参数中是否有空值
export const isSomeEmpty = (...params) => params.some(val => isEmpty(val));
/**
 * @desc 过滤对象中的空值
 * @param {object} value - 需要进行过滤的对象
 * @param {boolean} [deep=true] - 是否进行深度过滤（对象和数组）
 */
export const filterObjEmpty = (value, deep = true) => {
	let tempValue = {};
	for (let key in value) {
		!isEmpty(value[key], deep) && (tempValue[key] = value[key]);
	}
	return tempValue;
};
/**
 * @desc 通过url获取URL的信息
 * @param {string} val - 完整地址
 */
export const getUrlInfo = val => {
	const tempTag = document.createElement('a');
	tempTag.href = val;
	let hash = tempTag.hash;
	let hasQuery = hash.indexOf('?');
	return {
		origin: tempTag.origin,
		hash: (hasQuery > -1 && hash.slice(1, hash.indexOf('?') + 1)) || hash.slice(1),
		host: tempTag.host,
		protocol: tempTag.protocol,
		port: tempTag.port,
		hostname: tempTag.hostname,
		pathname: tempTag.pathname,
		search: tempTag.search,
		fullHash: hash.slice(1),
		hashQuery: qs.parse(hash.slice(hash.indexOf('?') + 1))
	};
};
/**
 * @desc 数组扁平化
 * @param {array} value - 数组
 * @param {Function} [callback] - 回调函数
 * @returns
 */
export const flattenDeep = (value, callback) => {
	let tempRes = [];
	value.forEach((item, index) => {
		if (callback) {
			let tempData = callback(item, index);
			let dataType = Object.prototype.toString.call(tempData);
			if (dataType === '[object Array]') {
				tempRes.push(tempData[0]);
				tempRes.push(...flattenDeep(tempData[1], callback));
			} else {
				tempRes.push(tempData);
			}
		} else {
			tempRes.push(item);
		}
	});
	return [...new Set(tempRes)];
};
const require = require;
/**
 * @desc webpack 批量获取文件
 * @param {Object} options
 * @param {string} options.directory - 其文件目录的相对路径
 * @param {boolean} options.useSubdirectories - 是否查询其子目录
 * @param {RegExp} options.regExp - 匹配文件名的正则表达式
 * @param {string[]} options.filters - 排除不需要的文件
 * @returns {array[]}
 */
export const webpackRequireFiles = (
	{ directory = '.', useSubdirectories = false, regExp = /\.js$/, filters = ['index'] },
	require = require
) => {
	let tempMap = [];
	const requireComponent = require.context(directory, useSubdirectories, regExp);
	requireComponent.keys().forEach(fileName => {
		const name = fileName
			.split('/')
			.pop()
			.replace(/\.\w+$/, '');
		if (filters.includes(name)) {
			return false;
		}
		// 获取文件
		const module = requireComponent(fileName);
		// 如果这个文件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		const fun = module.default || module;
		tempMap.push([name, fun]);
	});
	return tempMap;
};
/**
 * @desc crypto MD5,SHA|Hmac|AES 简单加密封装
 * @param {string} value - 待加密字符串
 * @param {string} [command] - 待加密算法，支持 createDecipheriv，createHash，createHmac（需要秘钥 key）
 * @param {string} [hash=md5] - 算法哈希值 支持 md5, sha1, sha256, sha512 (createHash，createHmac 需要哈希值)，createDecipheriv（参考）
 * @param {string} [key] - 密钥
 * @returns {string}  加密后的值
 */
export const encodeString = (value, command = 'createHash', hash = 'md5', key) => {
	let encodeObj = null;
	if (command === 'createCipher') {
		encodeObj = crypto.createCipheriv('aes192', value, key);
		let crypted = encodeObj.update(value, 'utf8', 'hex');
		crypted += encodeObj.final('hex');
		return crypted;
	} else {
		switch (command) {
			case 'createHmac':
				encodeObj = crypto.createHmac(hash, key);
				break;
			default:
				encodeObj = crypto.createHash(hash);
				break;
		}
		encodeObj.update(value);
		return encodeObj.digest('hex');
	}
};
/**
 * @desc AES 简单解密封装
 * @param {string} value - 待解密字符串
 * @param {string} key - 密钥
 * @returns {string} 解密后的值
 */
export const decodeString = (value, key) => {
	const decipher = crypto.createDecipheriv('aes192', key);
	var decrypted = decipher.update(value, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
};
/**
 * 生成随机字符串
 * @param len 字符串长度
 * @returns {string}
 */
export function randomChar(len = 18) {
	const x = '0123456789QWERTYUIOOPASDFGHJKLZXCVBNM0123456789';
	let tmp = '';
	for (let i = 0; i < len; i++) {
		tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
	}
	return tmp;
}

/**
 * 生成随机整型
 * @param len 整形长度
 * @returns {number}
 */
export function randomNumber(len = 18) {
	const x = '0123456789';
	let tmp = '';
	for (let i = 0; i < len; i++) {
		tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
	}
	return Number(tmp);
}

/**
 * 通过value找label
 * @param data 数据源
 * @param id   要找的id
 * @param value 数据格式的value，默认value
 * @param label 数据格式的label，默认label
 * @param empty 如果没找到返回的数据，默认-
 * @returns {String}
 */
export function queryLabelByValue({ data, id, value = 'value', label = 'label', empty = '-' }) {
	return (data.find(item => item[value] === id) && data.find(item => item[value] === id)[label]) || empty;
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
	if (!(typeof obj === 'object')) {
		return;
	}

	for (const key in obj) {
		// eslint-disable-next-line no-prototype-builtins
		if (obj.hasOwnProperty(key) && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
			delete obj[key];
		}
	}
	return obj;
}
/**
 * @desc 对象深克隆(真 -> 包括函数)
 * @param {Any} value
 * @param {Boolean} bool - 是否为真克隆
 * @returns {Any}
 */
export function deepClone(value, bool = false) {
	if (bool) {
		const type = typeof value;
		if (type === 'array') {
			return value.map(item => deepClone(item));
		}
		if (type === 'object') {
			const res = {};
			for (const key in value) {
				// eslint-disable-next-line no-prototype-builtins
				if (value.hasOwnProperty(key)) {
					res[key] = deepClone(value[key]);
				}
			}
			return res;
		}
		return value;
	}
	return JSON.parse(JSON.stringify(value));
}
/**
 * 删除数组中某对象
 * @param arr
 * @param obj
 * @returns {*}
 */
export function remove(_arr, _obj) {
	const { length } = _arr;
	for (let i = 0; i < length; i++) {
		if (isObjectValueEqual(_arr[i], _obj)) {
			if (i == 0) {
				_arr.shift(); // 删除并返回数组的第一个元素
				return _arr;
			}
			if (i == length - 1) {
				_arr.pop(); // 删除并返回数组的最后一个元素
				return _arr;
			}
			_arr.splice(i, 1); // 删除下标为i的元素
			return _arr;
		}
	}
}

function isObjectValueEqual(a, b) {
	const aProps = Object.getOwnPropertyNames(a);
	const bProps = Object.getOwnPropertyNames(b);
	if (aProps.length != bProps.length) {
		return false;
	}

	for (let i = 0; i < aProps.length; i++) {
		const propName = aProps[i];
		if (a[propName] !== b[propName]) {
			return false;
		}
	}
	return true;
}
export const loadScript = (url, callback) => {
	const script = document.createElement('script');
	script.src = url;

	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
			callback && callback();
			script.onload = script.onreadystatechange = null;
		}
	};
	document.body.appendChild(script);
};

/**
 * @desc 将对象数组转换为对象
 * @param {object[]} data
 * @param {string} key - 用作Key的属性
 */
export const arrayToObject = (data, key, value) => {
	let res = {};
	data.forEach(item => {
		if (item[key]) {
			res[item[key]] = value ? item[value] : item;
		}
	});
	return res;
};
// 是否有权限访问页面
export const isAuth = (to, store) => {
	let url = to.meta?.toPath || to.path;
	const routerPaths = store.getters.routerPaths;
	const queryIndex = url.indexOf('?');
	let path = url.slice(0, queryIndex > -1 ? queryIndex : url.length);
	if (path.slice(-1) === '/') path = path.slice(0, -1);
	if (routerPaths.includes(path)) {
		return {
			path: path,
			query: qs.parse(url.slice(queryIndex + 1))
		};
	}
	return null;
};
/**
 * @desc 解决手动改变浏览器地址栏中的地址 以及 浏览器前进后退触发的页面更新问题
 */
export const watchHashChange = async (to, from, store, website, next) => {
	const activeAppId = store.getters.activeAppId; // 当前活动的项目ID
	const toPaths = to.path.split('/').slice(1);
	const fromPaths = from.path.split('/').slice(1);
	const toIsMicroApp = website.microApps[toPaths[0]]; // 将要进入的页面是否为子应用的页面
	const fromIsMicroApp = website.microApps[fromPaths[0]] || website.microApps[activeAppId]; // 将要退出的页面是否为子应用的页面
	const currentMicroApp = website.currentMicroApp || activeAppId; // 当前激活的子应用
	// 将要进入的页面为子应用的页面时该 子应用的Id。
	// qiankun 子应用的ID 可能不等于子项目的ID，如何处理？
	// 规避：1.子项目下的页面正常情况下都属于同一个qiankun子应用。弊端 同一项目下不能存在多个qiankun子应用
	//      2.主应用一次性将所有子应用的菜单(路由)数据请求缓存下来，在分项目按需动态加载路由。弊端：数据量可能较大，不同项目下能否有同一路由（无法区分到底属于那个项目）
	const toAppId = toIsMicroApp && toPaths[0];
	const fromAppId = fromIsMicroApp && (fromPaths[0] || activeAppId);
	const toMicroAppIsActive =
		(toIsMicroApp && website.activeMicroApps.includes(toPaths[0])) || toAppId === currentMicroApp; // 将要进入的页面为子应用的页面时 该子应用是否已激活
	const hasAuth = isAuth(to, store);
	const toNext = async toAppId => {
		try {
			let res = await store.dispatch('app/triggerApp', { appId: toAppId, toHome: false });
			website.activeMicroApps.push(toAppId);
			website.currentMicroApp = res.data.appId;
			if (isEmpty(store.getters.userInfo)) {
				store.commit('user/SET_USERINFO', res.data);
			}
			let hasAuth = isAuth(to, store);
			if (hasAuth) {
				next && next({ ...to });
			} else {
				next && next({ path: '/403' });
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
	if (to.path !== '/login') {
		if (
			toIsMicroApp &&
			(!toMicroAppIsActive ||
				toAppId !== currentMicroApp ||
				(!hasAuth && toAppId === currentMicroApp) ||
				(to.path === '/' && fromIsMicroApp))
		) {
			// 将要进入的页面是否为子应用的页面 并且 该子应用未挂载或当前子应用不是即将进入的子应用或该路由未授权访问
			await toNext(toAppId);
			return false;
		} else if (
			!toIsMicroApp &&
			((fromIsMicroApp && fromAppId === activeAppId) ||
				(!fromIsMicroApp && !website.microApps[activeAppId] && activeAppId !== website.currentMicroApp))
		) {
			await toNext('');
			return false;
		}
	}
	return { hasAuth };
};
// 时间格式化
export const formatDatetime = (value = new Date(), format) => {
	let date = new Date(value);
	date === 'Invalid Date' && (date = new Date());
	if (date !== 'Invalid Date') {
		const yy = date.getFullYear(); // year
		let MM = date.getMonth() + 1; // month
		let dd = date.getDate(); // day
		let hh = date.getHours(); // hour
		let mm = date.getMinutes(); // minute
		let ss = date.getSeconds(); // second
		const timestamp = date.getTime(); // 时间搓
		let day = date.getDay(); // 周几
		MM = MM > 9 ? MM : '0' + MM;
		dd = dd > 9 ? dd : '0' + dd;
		hh = hh > 9 ? hh : '0' + hh;
		mm = mm > 9 ? mm : '0' + mm;
		ss = ss > 9 ? ss : '0' + ss;
		day = +day === 0 ? 7 : day;
		const dayToUpperCase = ['一', '二', '三', '四', '五', '六', '日'];
		if (format) {
			format = format
				.replace('yy', yy)
				.replace('MM', MM)
				.replace('dd', dd)
				.replace('hh', hh)
				.replace('mm', mm)
				.replace('ss', ss);
		}
		return {
			date: format || date,
			yy,
			MM,
			dd,
			hh,
			mm,
			ss,
			timestamp,
			day,
			dayToUpperCase: dayToUpperCase[day - 1]
		};
	}
};
/**
 *
 * @param {object} [options]
 * @param {number} [options.d=7] - 间隔天数
 * @param {date} [options.currentTime=new Date()] - 从何时开始计算，默认当前
 * @param {string} [options.type='after'] - 计算逻辑 往前还是往后，默认往前计算。after|before
 * @param {string} [options.format='yy-MM-dd HH:mm:ss'] - 计算的时间精确度，日期|日期时间。date|datetime
 * @returns
 */
export const formatDatetimeGap = (options = {}) => {
	let { d = 7, type = 'after', currentTime = new Date(), format = 'yy-MM-dd HH:mm:ss' } = options;
	currentTime = formatDatetime(currentTime, format);
	let gapTime = d * 24 * 3600 * 1000;
	let endTime = currentTime.date;
	let startTime = null;
	if (type === 'after') {
		startTime = new Date(endTime).getTime() - gapTime;
		startTime = formatDatetime(startTime, format).date;
	} else if (type === 'before') {
		startTime = currentTime.date;
		endTime = new Date(currentTime).getTime() + gapTime;
		endTime = formatDatetime(endTime, format).date;
	}
	return [startTime, endTime];
};
