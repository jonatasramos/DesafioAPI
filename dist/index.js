/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "24b56183d6cbe57ea426";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\nmodule.exports.formatError = function(err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t} else {\n\t\treturn stack;\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/controller/LetterController.ts":
/*!********************************************!*\
  !*** ./src/controller/LetterController.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar LetterModel_1 = __importDefault(__webpack_require__(/*! ../models/LetterModel */ \"./src/models/LetterModel.ts\"));\r\n/**\r\n * Class Controller de cartas\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar LetterController = /** @class */ (function () {\r\n    function LetterController() {\r\n    }\r\n    /**\r\n     * Pegas todas as cartas do sistema\r\n     *\r\n     * @return {Object} Letter\r\n     */\r\n    LetterController.prototype.get = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                try {\r\n                    return [2 /*return*/, LetterModel_1.default.find()];\r\n                }\r\n                catch (error) {\r\n                    return [2 /*return*/, { 'error': true, 'message': 'Erro ao buscar items!' }];\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    ;\r\n    /**\r\n     * Retorna uma carta pelo id\r\n     *\r\n     * @param {Number} id\r\n     * @return {Object} letter\r\n     */\r\n    LetterController.prototype.getById = function (id) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                try {\r\n                    return [2 /*return*/, LetterModel_1.default.find({ id: id })];\r\n                }\r\n                catch (error) {\r\n                    return [2 /*return*/, { 'error': true, 'message': 'Erro ao buscar item!' }];\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    ;\r\n    /**\r\n     * Cria uma nova carta\r\n     *\r\n     * @param {Object} letter\r\n     * @return {Object} Letter\r\n     */\r\n    LetterController.prototype.create = function (data) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var sender_name, sender_adress, text, status_1, letter;\r\n            return __generator(this, function (_a) {\r\n                try {\r\n                    sender_name = data.sender_name, sender_adress = data.sender_adress, text = data.text, status_1 = data.status;\r\n                    letter = new LetterModel_1.default({\r\n                        sender_name: sender_name,\r\n                        sender_adress: sender_adress,\r\n                        text: text,\r\n                        status: status_1\r\n                    });\r\n                    return [2 /*return*/, letter.save()];\r\n                }\r\n                catch (error) {\r\n                    return [2 /*return*/, { 'error': true, 'message': 'Ocorreu um erro no cadastro!' }];\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Atualiza uma carta\r\n     *\r\n     * @param {Object} letter\r\n     * @return {Object} Letter\r\n     */\r\n    LetterController.prototype.update = function (letter) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                try {\r\n                    return [2 /*return*/, LetterModel_1.default.findOneAndUpdate({ id: letter.id }, {\r\n                            $set: letter\r\n                        })];\r\n                }\r\n                catch (error) {\r\n                    return [2 /*return*/, {}];\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Remove uma carta do banco de dados\r\n     *\r\n     * @param {Object} id\r\n     * @return {Object} Letter\r\n     */\r\n    LetterController.prototype.destroy = function (id) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                try {\r\n                    return [2 /*return*/, LetterModel_1.default.findOneAndRemove({ id: id })];\r\n                }\r\n                catch (error) {\r\n                    return [2 /*return*/, { 'error': true, message: 'Erro ao deletar item' }];\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    return LetterController;\r\n}());\r\nexports.default = new LetterController;\r\n\n\n//# sourceURL=webpack:///./src/controller/LetterController.ts?");

/***/ }),

/***/ "./src/controller/UserController.ts":
/*!******************************************!*\
  !*** ./src/controller/UserController.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar UserModel_1 = __importDefault(__webpack_require__(/*! ../models/UserModel */ \"./src/models/UserModel.ts\"));\r\nvar md5_1 = __importDefault(__webpack_require__(/*! md5 */ \"md5\"));\r\n/**\r\n * Class Controller de atutenticações de usuários\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar UserController = /** @class */ (function () {\r\n    function UserController() {\r\n    }\r\n    /**\r\n     * Busca um usuário no banco de dados\r\n     *\r\n     * @return {User} user\r\n     */\r\n    UserController.prototype.getUser = function (user) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                try {\r\n                    return [2 /*return*/, UserModel_1.default.find({\r\n                            login: user.login,\r\n                            password: md5_1.default(user.password)\r\n                        })];\r\n                }\r\n                catch (error) {\r\n                    return [2 /*return*/, { 'error': true, 'message': 'Usuário não encontrado!' }];\r\n                }\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    ;\r\n    return UserController;\r\n}());\r\nexports.default = new UserController;\r\n\n\n//# sourceURL=webpack:///./src/controller/UserController.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n/**\r\n * Arquivo responsável por executar as configurações do servidor\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar http = __importStar(__webpack_require__(/*! http */ \"http\"));\r\nvar App_1 = __importDefault(__webpack_require__(/*! ./services/App */ \"./src/services/App.ts\"));\r\nvar Database_1 = __importDefault(__webpack_require__(/*! ./services/Database */ \"./src/services/Database.ts\"));\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\nvar PORT = process.env.PORT || 8080;\r\nApp_1.default.set('port', PORT);\r\nApp_1.default.use(function (err, req, res, next) {\r\n    // Retora o erro das validações\r\n    if (err instanceof express_validation_1.ValidationError) {\r\n        return res.status(err.statusCode).json(err);\r\n    }\r\n    return res.status(500).json(err);\r\n});\r\nvar server = http.createServer(App_1.default);\r\nserver.listen(PORT);\r\nserver.on('error', onError);\r\nserver.on('listening', onListening);\r\n// Executa a conexxão com o banco de dados\r\nDatabase_1.default.connect();\r\n/**\r\n * Tratamento de erros\r\n *\r\n * @param error\r\n */\r\nfunction onError(error) {\r\n    if (error.syscall !== 'listen')\r\n        throw error;\r\n    console.log(\"ERROR: \" + error.code);\r\n    process.exit(1);\r\n}\r\n/**\r\n * Configurações ao rodar o server\r\n */\r\nfunction onListening() {\r\n    var addr = server.address();\r\n    console.log(\"Server rodado na porta: \" + addr.port);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/models/LetterModel.ts":
/*!***********************************!*\
  !*** ./src/models/LetterModel.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nvar mongoose_auto_increment_1 = __importDefault(__webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\"));\r\nvar schemaOptions = {\r\n    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },\r\n};\r\n/**\r\n * Schema model Letter\r\n */\r\nvar LetterModel = new mongoose_1.Schema({\r\n    id: {\r\n        type: mongoose_1.Schema.Types.Number,\r\n        required: true,\r\n        unique: true,\r\n        min: 1\r\n    },\r\n    sender_name: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    },\r\n    sender_adress: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    },\r\n    text: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    },\r\n    status: {\r\n        type: mongoose_1.Schema.Types.Number, required: true\r\n    }\r\n}, schemaOptions);\r\nmongoose_auto_increment_1.default.initialize(mongoose_2.default.connection);\r\nLetterModel.plugin(mongoose_auto_increment_1.default.plugin, {\r\n    model: \"letter\",\r\n    field: \"id\",\r\n    startAt: 1,\r\n});\r\nvar letterModel = mongoose_2.default.model(\"letter\", LetterModel, \"letter\");\r\nexports.default = letterModel;\r\n\n\n//# sourceURL=webpack:///./src/models/LetterModel.ts?");

/***/ }),

/***/ "./src/models/UserModel.ts":
/*!*********************************!*\
  !*** ./src/models/UserModel.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nvar mongoose_2 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nvar mongoose_auto_increment_1 = __importDefault(__webpack_require__(/*! mongoose-auto-increment */ \"mongoose-auto-increment\"));\r\n/**\r\n * Schema model user\r\n */\r\nvar UserModel = new mongoose_1.Schema({\r\n    id: {\r\n        type: mongoose_1.Schema.Types.Number,\r\n        required: true,\r\n        unique: true,\r\n        min: 1\r\n    },\r\n    login: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    },\r\n    password: {\r\n        type: mongoose_1.Schema.Types.String, required: true\r\n    }\r\n});\r\nmongoose_auto_increment_1.default.initialize(mongoose_2.default.connection);\r\nUserModel.plugin(mongoose_auto_increment_1.default.plugin, {\r\n    model: \"letter\",\r\n    field: \"id\",\r\n    startAt: 1,\r\n});\r\nvar userModel = mongoose_2.default.model(\"user\", UserModel, \"user\");\r\nexports.default = userModel;\r\n\n\n//# sourceURL=webpack:///./src/models/UserModel.ts?");

/***/ }),

/***/ "./src/routes/AuthenticateRoute.ts":
/*!*****************************************!*\
  !*** ./src/routes/AuthenticateRoute.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar UserController_1 = __importDefault(__webpack_require__(/*! ../controller/UserController */ \"./src/controller/UserController.ts\"));\r\nvar Validations_1 = __webpack_require__(/*! ../services/Validations */ \"./src/services/Validations.ts\");\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\nvar Jwt_1 = __importDefault(__webpack_require__(/*! ../services/Jwt */ \"./src/services/Jwt.ts\"));\r\n/**\r\n * Classe responsável pelas rotas das autenticações\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar AuthenticateRoute = /** @class */ (function () {\r\n    function AuthenticateRoute() {\r\n        this.router = express_1.Router();\r\n        this.init();\r\n    }\r\n    /**\r\n    * Responsável por gerar o token\r\n    *\r\n    * @param {Request} req request\r\n    * @param {Response} res respose\r\n    */\r\n    AuthenticateRoute.prototype.getToken = function (req, res) {\r\n        try {\r\n            UserController_1.default.getUser(req.body).then(function (user) {\r\n                if (typeof user[0] != \"undefined\") {\r\n                    var id = +user[0]._id;\r\n                    var token = Jwt_1.default.generateToken(id) || null;\r\n                    if (token) {\r\n                        res.json({\r\n                            'token': token\r\n                        });\r\n                    }\r\n                    else {\r\n                        res.json({\r\n                            'error': true,\r\n                            'message': 'Erro ao gerar token.'\r\n                        });\r\n                    }\r\n                }\r\n                else {\r\n                    res.json({\r\n                        'error': true,\r\n                        'message': 'Usuário não encontrado.'\r\n                    });\r\n                }\r\n            });\r\n        }\r\n        catch (error) {\r\n            res.json({\r\n                'error': true,\r\n                'message': 'Erro ao autenticar usuário.'\r\n            });\r\n        }\r\n    };\r\n    /**\r\n   * Inicia as rotas\r\n   */\r\n    AuthenticateRoute.prototype.init = function () {\r\n        this.router.post('/token', express_validation_1.validate(Validations_1.validateUser, {}, { abortEarly: true }), this.getToken);\r\n    };\r\n    return AuthenticateRoute;\r\n}());\r\nvar userRouter = new AuthenticateRoute;\r\nuserRouter.init();\r\nexports.default = userRouter.router;\r\n\n\n//# sourceURL=webpack:///./src/routes/AuthenticateRoute.ts?");

/***/ }),

/***/ "./src/routes/LetterRoute.ts":
/*!***********************************!*\
  !*** ./src/routes/LetterRoute.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar LetterController_1 = __importDefault(__webpack_require__(/*! ../controller/LetterController */ \"./src/controller/LetterController.ts\"));\r\nvar Validations_1 = __webpack_require__(/*! ../services/Validations */ \"./src/services/Validations.ts\");\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\nvar Jwt_1 = __importDefault(__webpack_require__(/*! ../services/Jwt */ \"./src/services/Jwt.ts\"));\r\n/**\r\n * Classe responsável pelas rotas das cartas\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar LetterRoute = /** @class */ (function () {\r\n    function LetterRoute() {\r\n        this.router = express_1.Router();\r\n        this.init();\r\n    }\r\n    /**\r\n     * Pegas todas as cartas cadastradas\r\n     *\r\n     * @param {Request} req request\r\n     * @param {Response} res respose\r\n     */\r\n    LetterRoute.prototype.get = function (req, res) {\r\n        var id = req.params.id ? +req.params.id : 0;\r\n        if (id) {\r\n            LetterController_1.default.getById(id).then(function (letter) {\r\n                res.json(letter);\r\n            });\r\n        }\r\n        else {\r\n            LetterController_1.default.get().then(function (letter) {\r\n                res.json(letter);\r\n            });\r\n        }\r\n    };\r\n    /**\r\n     * Cria uma nova carta\r\n     *\r\n     * @param {Request} req request\r\n     * @param {Response} res respose\r\n     */\r\n    LetterRoute.prototype.create = function (req, res) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                LetterController_1.default.create(req.body).then(function (result) {\r\n                    res.json(result);\r\n                });\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Atualiza um ou mais itens da carta\r\n     *\r\n     * @param {Request} req request\r\n     * @param {Response} res respose\r\n     */\r\n    LetterRoute.prototype.update = function (req, res) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                LetterController_1.default.update(req.body).then(function (result) {\r\n                    var letter = result;\r\n                    if (letter) {\r\n                        res.json({\r\n                            'ok': true,\r\n                            'message': 'Item atualizado!'\r\n                        });\r\n                    }\r\n                    else {\r\n                        res.json({\r\n                            'error': true,\r\n                            'message': 'Item não encontrado!'\r\n                        });\r\n                    }\r\n                });\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Exclui uma carta\r\n     *\r\n     * @param {Request} req request\r\n     * @param {Response} res respose\r\n     */\r\n    LetterRoute.prototype.destroy = function (req, res) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                LetterController_1.default.destroy(req.body.id).then(function (result) {\r\n                    var letter = result;\r\n                    if (letter) {\r\n                        res.json({\r\n                            'ok': true,\r\n                            'message': 'Item deletado!'\r\n                        });\r\n                    }\r\n                    else {\r\n                        res.json({\r\n                            'error': true,\r\n                            'message': 'Erro ao deletar item!'\r\n                        });\r\n                    }\r\n                });\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Inicia as rotas\r\n     */\r\n    LetterRoute.prototype.init = function () {\r\n        this.router.get('/:id?', Jwt_1.default.auth, this.get);\r\n        this.router.post('/create', Jwt_1.default.auth, express_validation_1.validate(Validations_1.validateLetterCreate, {}, { abortEarly: true }), this.create);\r\n        this.router.post('/update', Jwt_1.default.auth, express_validation_1.validate(Validations_1.validateLetterUpdate, {}, { abortEarly: true }), this.update);\r\n        this.router.post('/destroy', Jwt_1.default.auth, express_validation_1.validate(Validations_1.validateLetterDelete, {}, { abortEarly: true }), this.destroy);\r\n    };\r\n    return LetterRoute;\r\n}());\r\nvar letterRouter = new LetterRoute;\r\nletterRouter.init();\r\nexports.default = letterRouter.router;\r\n\n\n//# sourceURL=webpack:///./src/routes/LetterRoute.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * Importa todas as rotas do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar LetterRoute_1 = __importDefault(__webpack_require__(/*! ./LetterRoute */ \"./src/routes/LetterRoute.ts\"));\r\nvar AuthenticateRoute_1 = __importDefault(__webpack_require__(/*! ./AuthenticateRoute */ \"./src/routes/AuthenticateRoute.ts\"));\r\nvar Jwt_1 = __importDefault(__webpack_require__(/*! ../services/Jwt */ \"./src/services/Jwt.ts\"));\r\nvar fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\r\nvar path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\r\nvar router = express_1.Router();\r\n/**\r\n * Rota para status da api\r\n *\r\n * @param {Request} req request\r\n * @param {Response} res response\r\n */\r\nrouter.get('/api_status', Jwt_1.default.auth, function (req, res) {\r\n    res.json({\r\n        status: \"ok\"\r\n    });\r\n});\r\n/**\r\n * Rota para documentção da api\r\n *\r\n * @param {Request} req request\r\n * @param {Response} res response\r\n */\r\nrouter.get('/docs', function (req, res) {\r\n    fs_1.default.readFile(path_1.default.resolve(\"docs/index.html\"), 'utf8', function (err, text) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0: return [4 /*yield*/, res.send(text)];\r\n                    case 1:\r\n                        _a.sent();\r\n                        return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    });\r\n});\r\n/**\r\n * Rota de Cartas\r\n */\r\nrouter.use('/letter', LetterRoute_1.default);\r\n/**\r\n * Rota Autenticação\r\n */\r\nrouter.use('/auth', AuthenticateRoute_1.default);\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack:///./src/routes/index.ts?");

/***/ }),

/***/ "./src/services/App.ts":
/*!*****************************!*\
  !*** ./src/services/App.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar bodyParser = __importStar(__webpack_require__(/*! body-parser */ \"body-parser\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\r\nvar routes_1 = __importDefault(__webpack_require__(/*! ../routes/ */ \"./src/routes/index.ts\"));\r\ndotenv.config({\r\n    path:  false ? undefined : \".env\"\r\n});\r\n/**\r\n * Classe App para configurações do server\r\n *\r\n * @author Jonatas Ramos\r\n */\r\nvar App = /** @class */ (function () {\r\n    function App() {\r\n        this.express = express_1.default();\r\n        this.middleware();\r\n        this.routes();\r\n        this.headers();\r\n        dotenv.config();\r\n    }\r\n    /**\r\n     * Definições de middler\r\n     */\r\n    App.prototype.middleware = function () {\r\n        this.express.use(helmet_1.default());\r\n        this.express.use(cors_1.default());\r\n        this.express.use(bodyParser.json());\r\n        this.express.use(bodyParser.urlencoded({ extended: false }));\r\n    };\r\n    /**\r\n     * Definições de header\r\n     */\r\n    App.prototype.headers = function () {\r\n        this.express.use(function (req, res, next) {\r\n            res.setHeader('Access-Control-Allow-Origin', '*');\r\n            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\r\n            res.setHeader('Access-Control-Allow-Headers', 'content-type');\r\n            res.setHeader('Content-Type', 'application/json');\r\n            res.setHeader('Access-Control-Allow-Credentials', \"true\");\r\n        });\r\n    };\r\n    /**\r\n     * Definições de rotas\r\n     */\r\n    App.prototype.routes = function () {\r\n        // Rotas da api\r\n        this.express.use(\"/api\", routes_1.default);\r\n    };\r\n    return App;\r\n}());\r\nexports.default = new App().express;\r\n\n\n//# sourceURL=webpack:///./src/services/App.ts?");

/***/ }),

/***/ "./src/services/Database.ts":
/*!**********************************!*\
  !*** ./src/services/Database.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\nvar dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\r\n/**\r\n * Configurações de variaveis de ambiente\r\n */\r\ndotenv_1.default.config({\r\n    path:  false ? undefined : \".env\"\r\n});\r\n/**\r\n * Classe de conexão com o banco de dados\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar Database = /** @class */ (function () {\r\n    function Database() {\r\n        /**\r\n         * @var {String} uri - Url do banco de dados\r\n         */\r\n        this.uri = process.env.MONGODB_URI;\r\n    }\r\n    /**\r\n     * Conecta com o banco de dados\r\n     */\r\n    Database.prototype.connect = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            return __generator(this, function (_a) {\r\n                mongoose_1.default.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });\r\n                mongoose_1.default.set('useNewUrlParser', true);\r\n                mongoose_1.default.set('useFindAndModify', false);\r\n                mongoose_1.default.set('useCreateIndex', true);\r\n                mongoose_1.default.set('useUnifiedTopology', true);\r\n                this.db = mongoose_1.default.connection;\r\n                this.db.on('open', function () {\r\n                    if (true) {\r\n                        console.log('Conexão estabelecida com banco de dados !');\r\n                    }\r\n                });\r\n                this.db.on('error', function () {\r\n                    console.log('Erro ao conectar o banco de dados !');\r\n                });\r\n                return [2 /*return*/];\r\n            });\r\n        });\r\n    };\r\n    /**\r\n     * Fecha a conexão com o banco\r\n     */\r\n    Database.prototype.close = function () {\r\n        this.db.close();\r\n    };\r\n    return Database;\r\n}());\r\nexports.default = new Database;\r\n\n\n//# sourceURL=webpack:///./src/services/Database.ts?");

/***/ }),

/***/ "./src/services/Jwt.ts":
/*!*****************************!*\
  !*** ./src/services/Jwt.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\r\n/**\r\n * Class para manipulação dos serviços do jsonwebtoken\r\n *\r\n * @author Jônatas Ramos\r\n */\r\nvar Jwt = /** @class */ (function () {\r\n    function Jwt() {\r\n    }\r\n    /**\r\n     * Gera um token através de um id\r\n     *\r\n     * @param {Number} id\r\n     * @retunr token\r\n     */\r\n    Jwt.prototype.generateToken = function (id) {\r\n        var secret = process.env.JWT_SECRET || \"secret\";\r\n        if (id != null) {\r\n            return jsonwebtoken_1.default.sign({ id: id }, secret, {\r\n                expiresIn: 1800 // 30min\r\n            });\r\n        }\r\n    };\r\n    /**\r\n     * Faz a validação do token\r\n     *\r\n     * @param {Object} req\r\n     * @param {Response} res\r\n     * @param {NextFunction} next\r\n     */\r\n    Jwt.prototype.auth = function (req, res, next) {\r\n        var token = req.headers['x-access-token'] || \"\";\r\n        var secret = process.env.JWT_SECRET || \"secret\";\r\n        if (!token) {\r\n            return res.status(401).json({ auth: false, message: 'No token provided.' });\r\n        }\r\n        jsonwebtoken_1.default.verify(token, secret, function (err, decoded) {\r\n            if (err) {\r\n                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });\r\n            }\r\n            // se tudo estiver ok, salva no request para uso posterior\r\n            req.userId = decoded.id;\r\n            next();\r\n        });\r\n    };\r\n    return Jwt;\r\n}());\r\nexports.default = new Jwt;\r\n\n\n//# sourceURL=webpack:///./src/services/Jwt.ts?");

/***/ }),

/***/ "./src/services/Validations.ts":
/*!*************************************!*\
  !*** ./src/services/Validations.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_validation_1 = __webpack_require__(/*! express-validation */ \"express-validation\");\r\n/**\r\n * Arquivo responsável pelas validações do sistema\r\n *\r\n * @author Jônatas Ramos\r\n */\r\n/**\r\n * Item com a validação criação de cartas\r\n */\r\nexports.validateLetterCreate = {\r\n    body: express_validation_1.Joi.object({\r\n        sender_name: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        sender_adress: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        text: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(10),\r\n        status: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty()\r\n            .min(0)\r\n            .max(1),\r\n    })\r\n};\r\n/**\r\n * Item com a validação atualização de cartas\r\n */\r\nexports.validateLetterUpdate = {\r\n    body: express_validation_1.Joi.object({\r\n        id: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty(),\r\n        sender_name: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        sender_adress: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        text: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(10),\r\n        status: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty()\r\n            .min(0)\r\n            .max(1),\r\n    })\r\n};\r\n/**\r\n * Item com a validação de remover cartas\r\n */\r\nexports.validateLetterDelete = {\r\n    body: express_validation_1.Joi.object({\r\n        id: express_validation_1.Joi.number()\r\n            .required()\r\n            .empty()\r\n    })\r\n};\r\n/**\r\n * Item com a validação de usuário\r\n */\r\nexports.validateUser = {\r\n    body: express_validation_1.Joi.object({\r\n        login: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .min(3),\r\n        password: express_validation_1.Joi.string()\r\n            .required()\r\n            .empty()\r\n            .regex(/[a-zA-Z0-9]{3,30}/)\r\n            .min(3),\r\n    })\r\n};\r\n\n\n//# sourceURL=webpack:///./src/services/Validations.ts?");

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/index.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-validation":
/*!*************************************!*\
  !*** external "express-validation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validation\");\n\n//# sourceURL=webpack:///external_%22express-validation%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"md5\");\n\n//# sourceURL=webpack:///external_%22md5%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "mongoose-auto-increment":
/*!******************************************!*\
  !*** external "mongoose-auto-increment" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose-auto-increment\");\n\n//# sourceURL=webpack:///external_%22mongoose-auto-increment%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });