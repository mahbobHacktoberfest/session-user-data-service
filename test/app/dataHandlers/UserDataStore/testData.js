"use strict";

const proxyquire =  require('proxyquire');
const MongodbMock = require('../../../../mocks/mongodb');
const RequestMock = require('../../../../mocks/request');
const _ = require('lodash');


const env = {
	crypto: {
		key: 'g2ggrtg45g5ggr'
	},
	erightsToUuidService: {
		urls: {
			byUuid: 'http://erights-to-uuid/get?userId={userId}',
			byErights: 'http://erights-to-uuid/get?eRightsId={userId}'
		}
	},
	emailService: {
		url: 'http://email-service/get?userId={userId}',
		auth: {
			user: 'testUser',
			pass: 'testPass'
		}
	},
	'@global': true
};
const crypto = proxyquire('../../../../app/utils/crypto', {
	'../../env': env
});


const users = {
	withERightsId: {
		uuid: 'a85d4fc2-648a-4c08-a3dc-d4c2325a7b82',
		eRightsId: 53242342
	},
	withERightsId2: {
		uuid: 'ba795881-de02-4e9d-8783-72739c0c4aa3',
		eRightsId: 45345234234
	},
	withoutERightsId: {
		uuid: '41d6d86a-d965-418f-987c-db264690e285'
	},
	withIdsCached: {
		uuid: '768a4b0e-d82d-4026-999d-2b0eaf40471b',
		eRightsId: 5234234,
		initialData: {
			_id: '768a4b0e-d82d-4026-999d-2b0eaf40471b',
			uuid: '768a4b0e-d82d-4026-999d-2b0eaf40471b',
			lfUserId: 5234234
		}
	},

	getPseudonymWithoutPseudonym: {
		uuid: '85bfa0ae-ebd9-4434-84f3-3d48b4fc4a46',
		eRightsId: 42534534
	},
	getPseudonymWithoutPseudonym2: {
		uuid: '8e64ee84-b22a-4309-a71e-8dde5f04bbbe',
		eRightsId: 3453434
	},

	getPseudonymWithPseudonym: {
		uuid: '211452fd-2765-4d37-9b95-f3d8658b1dba',
		eRightsId: 52423423,
		initialData: {
			_id: '211452fd-2765-4d37-9b95-f3d8658b1dba',
			uuid: '211452fd-2765-4d37-9b95-f3d8658b1dba',
			lfUserId: 52423423,
			pseudonym: 'testPseudonym52423423'
		}
	},
	getPseudonymWithPseudonym2: {
		uuid: 'bd0b9ad1-cf53-47f4-a70c-4d3b1b5c1588',
		eRightsId: 24324234,
		initialData: {
			_id: 'bd0b9ad1-cf53-47f4-a70c-4d3b1b5c1588',
			uuid: 'bd0b9ad1-cf53-47f4-a70c-4d3b1b5c1588',
			lfUserId: 24324234,
			pseudonym: 'testPseudonym24324234'
		}
	},


	setPseudonymWithoutPseudonym: {
		uuid: '10aa90ee-2aa9-42b8-be4e-e6b2dac925c8',
		eRightsId: 945645
	},
	setPseudonymWithoutPseudonym2: {
		uuid: '38beafac-f4ff-4c7b-92c1-37b147b813bc',
		eRightsId: 23423423
	},
	setPseudonymWithoutPseudonym3: {
		uuid: '89fc7169-0865-422d-916b-d3bf82d0974b',
		eRightsId: 365646
	},

	setPseudonymWithPseudonym: {
		uuid: '399326ab-b0c4-4f97-bf78-a8f0fd918c6b',
		eRightsId: 54353453,
		initialData: {
			_id: '399326ab-b0c4-4f97-bf78-a8f0fd918c6b',
			uuid: '399326ab-b0c4-4f97-bf78-a8f0fd918c6b',
			lfUserId: 54353453,
			pseudonym: 'testPseudonym54353453'
		}
	},
	setPseudonymWithPseudonym2: {
		uuid: '2b4df1a4-a9b4-4491-a4e2-fcd2589758d8',
		eRightsId: 1534534,
		initialData: {
			_id: '2b4df1a4-a9b4-4491-a4e2-fcd2589758d8',
			uuid: '2b4df1a4-a9b4-4491-a4e2-fcd2589758d8',
			lfUserId: 1534534,
			pseudonym: 'testPseudonym1534534'
		}
	},



	emptyPseudonymWithoutPseudonym: {
		uuid: '1ea8f0ae-14f5-4c2e-a7b0-41aeceb06bfb',
		eRightsId: 34534534
	},
	emptyPseudonymWithoutPseudonym2: {
		uuid: 'f22f5f73-0a0f-48ec-9453-2646b811c9ef',
		eRightsId: 547565
	},

	emptyPseudonymWithPseudonym: {
		uuid: 'fdac9990-0d67-496d-a753-ab7dd05271a0',
		eRightsId: 5675644,
		initialData: {
			_id: 'fdac9990-0d67-496d-a753-ab7dd05271a0',
			uuid: 'fdac9990-0d67-496d-a753-ab7dd05271a0',
			lfUserId: 5675644,
			pseudonym: 'testPseudonym5675644'
		}
	},
	emptyPseudonymWithPseudonym2: {
		uuid: '2d6265c5-6ccb-47b7-8050-74cd1fe1b5c5',
		eRightsId: 7234643,
		initialData: {
			_id: '2d6265c5-6ccb-47b7-8050-74cd1fe1b5c5',
			uuid: '2d6265c5-6ccb-47b7-8050-74cd1fe1b5c5',
			lfUserId: 7234643,
			pseudonym: 'testPseudonym7234643'
		}
	},



	getEmailPrefWithoutPref: {
		uuid: '124fca0a-2d0e-4768-ae17-d05d6da8784f',
		eRightsId: 2353654
	},
	getEmailPrefWithoutPref2: {
		uuid: '4003625c-70c8-4072-a209-511a17aa682a',
		eRightsId: 8356334
	},

	getEmailPrefWithPartialPref: {
		uuid: '88bbc0db-fa20-4907-9c6f-67b5d7e5897e',
		eRightsId: 43635345,
		initialData: {
			_id: '88bbc0db-fa20-4907-9c6f-67b5d7e5897e',
			uuid: '88bbc0db-fa20-4907-9c6f-67b5d7e5897e',
			lfUserId: 43635345,
			emailPreferences: {
				comments: 'never',
				replies: 'immediately'
			}
		}
	},
	getEmailPrefWithPartialPref2: {
		uuid: '3e6a6c00-ad51-48ed-9e8d-1bfbb7a2d5df',
		eRightsId: 234232354,
		initialData: {
			_id: '3e6a6c00-ad51-48ed-9e8d-1bfbb7a2d5df',
			uuid: '3e6a6c00-ad51-48ed-9e8d-1bfbb7a2d5df',
			lfUserId: 234232354,
			emailPreferences: {
				comments: 'never',
				replies: 'immediately'
			}
		}
	},

	getEmailPrefWithPref: {
		uuid: '9a6608c0-dd6e-4594-9967-3c3543669ac8',
		eRightsId: 6345345,
		initialData: {
			_id: '9a6608c0-dd6e-4594-9967-3c3543669ac8',
			uuid: '9a6608c0-dd6e-4594-9967-3c3543669ac8',
			lfUserId: 6345345,
			emailPreferences: {
				comments: 'never',
				replies: 'never',
				likes: 'hourly',
				autoFollow: true
			}
		}
	},
	getEmailPrefWithPref2: {
		uuid: '0ee62941-17cb-4e3a-80d9-435c4da68156',
		eRightsId: 5242345,
		initialData: {
			_id: '0ee62941-17cb-4e3a-80d9-435c4da68156',
			uuid: '0ee62941-17cb-4e3a-80d9-435c4da68156',
			lfUserId: 5242345,
			emailPreferences: {
				comments: 'never',
				replies: 'never',
				likes: 'hourly',
				autoFollow: true
			}
		}
	},


	setEmailPrefInv: {
		uuid: '04a89ce5-ea6c-41d3-80fb-cf444db762b6',
		eRightsId: 5234234
	},
	setEmailPrefNoPrefSaved: {
		uuid: '7937eae4-90ea-45ac-ae38-b2697243876f',
		eRightsId: 2453454
	},
	setEmailPrefNoPrefSaved2: {
		uuid: '13eab900-6b41-48c6-9ce1-239d049fbcaf',
		eRightsId: 4534546
	},



	setEmailPrefPartiallySaved: {
		uuid: '5fa02487-5bd0-4690-b2d2-fb2294dfe781',
		eRightsId: 6747546,
		initialData: {
			_id: '5fa02487-5bd0-4690-b2d2-fb2294dfe781',
			uuid: '5fa02487-5bd0-4690-b2d2-fb2294dfe781',
			lfUserId: 6747546,
			emailPreferences: {
				comments: 'never',
				replies: 'never'
			}
		}
	},
	setEmailPrefPartiallySaved2: {
		uuid: '0b005ae2-1a8f-4fce-833a-b31aa97f1f5d',
		eRightsId: 7356443,
		initialData: {
			_id: '0b005ae2-1a8f-4fce-833a-b31aa97f1f5d',
			uuid: '0b005ae2-1a8f-4fce-833a-b31aa97f1f5d',
			lfUserId: 7356443,
			emailPreferences: {
				comments: 'never',
				replies: 'never'
			}
		}
	},


	setEmailPrefFullySaved: {
		uuid: 'a66bdc01-803e-4c3e-8ad3-f15a7968f01c',
		eRightsId: 63453452,
		initialData: {
			_id: 'a66bdc01-803e-4c3e-8ad3-f15a7968f01c',
			uuid: 'a66bdc01-803e-4c3e-8ad3-f15a7968f01c',
			lfUserId: 63453452,
			emailPreferences: {
				comments: 'hourly',
				replies: 'never',
				likes: 'immediately',
				autoFollow: false
			}
		}
	},
	setEmailPrefFullySaved2: {
		uuid: 'c875a97f-594b-4f19-a69a-b4aa04056614',
		eRightsId: 7345343,
		initialData: {
			_id: 'c875a97f-594b-4f19-a69a-b4aa04056614',
			uuid: 'c875a97f-594b-4f19-a69a-b4aa04056614',
			lfUserId: 7345343,
			emailPreferences: {
				comments: 'never',
				replies: 'never',
				likes: 'immediately',
				autoFollow: false
			}
		}
	},


	getUserDataWithoutInternalData: {
		uuid: '0a443648-7747-4f74-a55d-09b813676382',
		eRightsId: 42363453,
		basicUserInfo: {
			email: 'testEmail42363453',
			firstName: 'testfirstName42363453',
			lastName: 'testlastName42363453'
		}
	},
	getUserDataWithoutInternalData2: {
		uuid: 'a3d694f7-0b20-4b6a-9610-b0e2a5a08b1a',
		eRightsId: 6357434,
		basicUserInfo: {
			email: 'testEmail6357434',
			firstName: 'testfirstName6357434',
			lastName: 'testlastName6357434'
		}
	},
	getUserDataWithInternalData: {
		uuid: 'c1679582-eb58-42cd-bd3b-bf44bf7cb894',
		eRightsId: 2345234,
		basicUserInfo: {
			email: 'testEmail2345234',
			firstName: 'testfirstName2345234',
			lastName: 'testlastName2345234'
		},
		initialData: {
			_id: 'c1679582-eb58-42cd-bd3b-bf44bf7cb894',
			uuid: 'c1679582-eb58-42cd-bd3b-bf44bf7cb894',
			lfUserId: 2345234,
			emailPreferences: {
				comments: 'never',
				replies: 'never',
				likes: 'immediately',
				autoFollow: false
			},
			pseudonym: 'testPs2345234'
		}
	},
	getUserDataWithInternalData2: {
		uuid: '989b8ec0-658b-4163-8de1-cd1d4a9fd183',
		eRightsId: 634534,
		basicUserInfo: {
			email: 'testEmail634534',
			firstName: 'testfirstName634534',
			lastName: 'testlastName634534'
		},
		initialData: {
			_id: '989b8ec0-658b-4163-8de1-cd1d4a9fd183',
			uuid: '989b8ec0-658b-4163-8de1-cd1d4a9fd183',
			lfUserId: 634534,
			emailPreferences: {
				comments: 'never',
				replies: 'never',
				likes: 'immediately',
				autoFollow: false
			},
			pseudonym: 'testPs634534'
		}
	},

	getUserDataWithoutERightsId: {
		uuid: '3e79cb30-cd34-417f-b539-0c055abe92e7',
		basicUserInfo: {
			email: 'testEmail3e79cb30',
			firstName: 'testfirstName3e79cb30',
			lastName: 'testlastName3e79cb30'
		}
	},
};

let usersByErights = {};
let usersByUuid = {};
for (let key in users) {
	if (users.hasOwnProperty(key)) {
		let data = {};
		data.id = users[key].uuid;

		if (users[key].eRightsId) {
			data.deprecatedIds = {
				erightsId: users[key].eRightsId
			};

			usersByErights[users[key].eRightsId] = data;
		}

		usersByUuid[users[key].uuid] = data;
	}
}

let usersEmailServiceData = {};
for (let key in users) {
	if (users.hasOwnProperty(key)) {
		if (users[key].basicUserInfo) {
			usersEmailServiceData[users[key].uuid] = users[key].basicUserInfo;
		}
	}
}


let usersMongoContent = [];
for (let key in users) {
	if (users.hasOwnProperty(key)) {
		if (users[key].initialData) {
			let data = _.extend({}, users[key].initialData);
			if (data.pseudonym) {
				data.pseudonym = crypto.encrypt(data.pseudonym);
			}
			if (data.firstName) {
				data.firstName = crypto.encrypt(data.firstName);
			}
			if (data.lastName) {
				data.lastName = crypto.encrypt(data.lastName);
			}
			if (data.email) {
				data.email = crypto.encrypt(data.email);
			}
			usersMongoContent.push(data);
		}
	}
}



const mongodbMock = new MongodbMock({
	dbMock: {
		users: usersMongoContent
	},
	global: true
});


const requestMock = new RequestMock({
	items: [
		{
			url: env.emailService.url,
			handler: function (config) {
				if (!config.options || !config.options.auth || config.options.auth.username !== env.emailService.auth.user || config.options.auth.password !== env.emailService.auth.pass) {
					config.callback(null, {
						statusCode: 401
					});
					return;
				}

				if (usersEmailServiceData[config.matches.queryParams.userId] !== -1) {
					config.callback(null, {
						statusCode: 200,
						body: JSON.stringify(usersEmailServiceData[config.matches.queryParams.userId])
					});
				} else if (typeof config.matches.queryParams.userId === 'string' && config.matches.queryParams.userId.indexOf('down') !== -1) {
					config.callback(null, {
						statusCode: 503
					});
				} else {
					config.callback(null, {
						statusCode: 404
					});
				}
			}
		},
		{
			url: env.erightsToUuidService.urls.byUuid,
			handler: function (config) {
				if (usersByUuid[config.matches.queryParams.userId]) {
					config.callback(null, {
						statusCode: 200,
						body: JSON.stringify({
							user: usersByUuid[config.matches.queryParams.userId]
						})
					});
				} else if (typeof usersByUuid[config.matches.queryParams.userId] === 'string' && usersByUuid[config.matches.queryParams.userId].indexOf('down') !== -1) {
					config.callback(null, {
						statusCode: 503
					});
				} else {
					config.callback(null, {
						statusCode: 404
					});
				}
			}
		},
		{
			url: env.erightsToUuidService.urls.byErights,
			handler: function (config) {
				if (usersByErights[config.matches.queryParams.eRightsId]) {
					config.callback(null, {
						statusCode: 200,
						body: JSON.stringify({
							user: usersByErights[config.matches.queryParams.eRightsId]
						})
					});
				} else if (typeof usersByErights[config.matches.queryParams.eRightsId] === 'string' && usersByErights[config.matches.queryParams.eRightsId].indexOf('down') !== -1) {
					config.callback(null, {
						statusCode: 503
					});
				} else {
					config.callback(null, {
						statusCode: 404
					});
				}
			}
		}
	],
	global: true
});


exports.mockInstances = {
	mongodb: mongodbMock,
	request: requestMock
};


exports.mocks = {
	mongodb: mongodbMock.mock,
	request: requestMock.mock,
	env: env
};

exports.users = users;
