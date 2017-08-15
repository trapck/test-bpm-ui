"use strict";

const getDateString = (date = new Date()) => {
	const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
	return `${day}_${month}_${date.getFullYear()}`;
};

const getTimeString = (date = new Date()) => `${date.getHours()}_${date.getMinutes()}`;

const getDateTimeString = (date = new Date()) => `${getDateString(date)}_${getTimeString(date)}`;

module.exports = {
	getDateString,
	getTimeString,
	getDateTimeString
};