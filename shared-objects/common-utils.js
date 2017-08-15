"use strict";

function getDateString(date = new Date()) {
	const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
	return `${day}_${month}_${date.getFullYear()}`;
}

function getTimeString(date = new Date()) {
	return `${date.getHours()}_${date.getMinutes()}`;
}

function getDateTimeString(date = new Date()) {
	return `${getDateString(date)}_${getTimeString(date)}`;
}

module.exports = {
	getDateString: getDateString,
	getTimeString: getTimeString,
	getDateTimeString: getDateTimeString
};