'use strict';

System.register(['./HttpService', '../factories/ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
	"use strict";

	var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_HttpService) {
			HttpService = _HttpService.HttpService;
		}, function (_factoriesConnectionFactory) {
			ConnectionFactory = _factoriesConnectionFactory.ConnectionFactory;
		}, function (_daoNegociacaoDao) {
			NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
		}, function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export('NegociacaoService', NegociacaoService = function () {
				function NegociacaoService() {
					_classCallCheck(this, NegociacaoService);

					this._baseUrl = 'negociacoes';
					this._http = new HttpService();
				}

				_createClass(NegociacaoService, [{
					key: 'getAllNegociacoes',
					value: function getAllNegociacoes() {
						return Promise.all([this.getWeekNegociacoes(), this.getLastWeekNegociacoes(), this.getLastWeekBeforeNegociacoes()]).then(function (negociacoes) {
							return negociacoes.reduce(function (flatArray, array) {
								return flatArray.concat(array);
							}, []);
						}).catch(function (error) {
							return new Error(error);
						});
					}
				}, {
					key: 'getWeekNegociacoes',
					value: function getWeekNegociacoes() {
						return this._http.get(this._baseUrl + '/semana').then(function (array) {
							return array.map(function (item) {
								return new Negociacao(new Date(item.data), item.quantidade, item.valor);
							});
						}).catch(function (error) {
							console.log(xhr.responseText);
							throw new Error('Não foi possível obter as negociações da semana.');
						});
					}
				}, {
					key: 'getLastWeekNegociacoes',
					value: function getLastWeekNegociacoes() {
						return this._http.get(this._baseUrl + '/anterior').then(function (array) {
							return array.map(function (item) {
								return new Negociacao(new Date(item.data), item.quantidade, item.valor);
							});
						}).catch(function (error) {
							console.log(xhr.responseText);
							throw new Error('Não foi possível obter as negociações da semana anterior.');
						});
					}
				}, {
					key: 'getLastWeekBeforeNegociacoes',
					value: function getLastWeekBeforeNegociacoes() {
						return this._http.get(this._baseUrl + '/retrasada').then(function (array) {
							return array.map(function (item) {
								return new Negociacao(new Date(item.data), item.quantidade, item.valor);
							});
						}).catch(function (error) {
							console.log(xhr.responseText);
							throw new Error('Não foi possível obter as negociações da semana.');
						});
					}
				}, {
					key: 'save',
					value: function save(negociacao) {
						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.save(negociacao);
						}).catch(function (error) {
							return new Error(error);
						});
					}
				}, {
					key: 'deleteAll',
					value: function deleteAll() {
						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.deleteAll();
						}).catch(function (error) {
							return new Error(error);
						});
					}
				}, {
					key: 'loadAll',
					value: function loadAll() {
						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.getAll();
						}).catch(function (error) {
							return new Error(error);
						});
					}
				}, {
					key: 'import',
					value: function _import(list) {
						return this.getAllNegociacoes().then(function (negociacoes) {
							return negociacoes.filter(function (newNegociacao) {
								return !list.exists(newNegociacao);
							});
						}).catch(function (error) {
							return new Error(error);
						});
					}
				}]);

				return NegociacaoService;
			}());

			_export('NegociacaoService', NegociacaoService);
		}
	};
});
//# sourceMappingURL=NegociacaoService.js.map