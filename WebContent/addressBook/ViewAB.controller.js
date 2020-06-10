sap.ui.controller("addressBook.ViewAB", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf addressBook.ViewAB
	 */
//	 onInit: function() {
//		 
//	 },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf addressBook.ViewAB
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf addressBook.ViewAB
	 */
//	onAfterRendering : function() {
//	},
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf addressBook.ViewAB
	 */
	// onExit: function() {
	//
	// }
	CreateTable: function() {
		var link = "/sap/opu/odata/sap/ZADDRESS_BOOK_SRV_01";
		var fired = false;
		var filter = '';
		
		var oModel = new sap.ui.model.odata.ODataModel(link,false);
		var emp_list = {};

			oModel.read("/Address_bookSet", null, null, false, function(oData, oResponse) {
				emp_list = oData.results;
			});

			// убираем у табельного номера числа
			emp_list.forEach(function(item, i, emp_list){
				var test = Number(emp_list[i].Pernr);;
				parseInt("test", 10);
				emp_list[i].Pernr= test;
			});
			
			var yoModel = new sap.ui.model.json.JSONModel(emp_list);
		
		var addButton = new sap.m.Button({
			icon : "sap-icon://citizen-connect",
			text : "Показать уволенных",
			press : function() {
				showFired();
			},
		});

		var hideButton = new sap.m.Button({
			icon : "sap-icon://sys-cancel-2",
			text : "Скрыть уволенных",
			press : function() {
				hideFired();
			},
		});

		var searchBox = new sap.m.SearchField({
			enabled : true,
			visible : true,
			maxLength : 0,
			placeholder : "Поиск...",
			//showMagnifier : true,
			showRefreshButton : false,
			width : "15rem",
			search : function(oEvent) {
				Search(oEvent);
			},
		});

		if (fired == false) {
			addButton.setVisible(true);
			hideButton.setVisible(false);
		} else {
			addButton.setVisible(false);
			hideButton.setVisible(true);
		}

///////// показать уволенных
		function showFired() {
			fired = true;
			oModel.read("/Address_bookSet?$filter=Ename eq  '' and Pernr eq '" + fired + "' ", null, null, false, function(oData, oResponse) {
				var dismissed = oData.results;

					// убираем у табельного номера числа
				dismissed.forEach(function(item, i, emp_list){
					var test = Number(dismissed[i].Pernr);;
					parseInt("test", 10);
					dismissed[i].Pernr= test;
			});


				var oModelDismissed = new sap.ui.model.json.JSONModel(dismissed);	
				oTable.setModel(oModelDismissed);
				oTable.bindItems("/", TableColumns);
			 });

			addButton.setVisible(false);
			hideButton.setVisible(true);
		};
		
///////// скрыть уволенных
		function hideFired() {
			fired = false;
			oModel.read("/Address_bookSet", null, null, false, function(oData, oResponse) {
				var dismissedOff = oData.results;

				// убираем у табельного номера числа
				dismissedOff.forEach(function(item, i, emp_list){
					var test = Number(dismissedOff[i].Pernr);;
					parseInt("test", 10);
					dismissedOff[i].Pernr= test;
				});

				

				var oModelDismissedOff = new sap.ui.model.json.JSONModel(dismissedOff);	
				oTable.setModel(oModelDismissedOff);
				oTable.bindItems("/", TableColumns);
			 });

			// oModel.read("/Address_bookSet", null, null, false, function(oData, oResponse) {
			// 	var allEmployees = oData.results;
			// 	var oModelAllEmployees = new sap.ui.model.json.JSONModel(allEmployees);	
			// 	oTable.setModel(oModelAllEmployees);
			// 	oTable.bindItems("/", TableColumns);

			//  });

			addButton.setVisible(true);
			hideButton.setVisible(false);
		};

////////Поиск
		function Search(oEvent) {
			var data = oEvent.getSource().getValue();
			filter = data;
			var emp_list_search = {};
			oModel.read("/Address_bookSet?$filter=Ename eq  '" + filter + "' and Pernr eq '" + fired + "' ", null, null, false, function(oData, oResponse) {
				emp_list_search = oData.results;
				}); 

			emp_list_search.forEach(function(item, i, emp_list_search){
				var test = Number(emp_list_search[i].Pernr);;
				parseInt("test", 10);
				emp_list_search[i].Pernr= test;
			});
				
			var yoModelSearch = new sap.ui.model.json.JSONModel(emp_list_search);
			oTable.setModel(yoModelSearch);
			oTable.bindItems("/", TableColumns);
		}

		var ToolBar = new sap.m.Toolbar({
			busy : false,
			busyIndicatorDelay : 1000,
			visible : true,
			enabled : true,
			design : sap.m.ToolbarDesign.Auto,
			content : [

			addButton, hideButton, new sap.m.ToolbarSpacer(), searchBox,

			],

		});

		var inputPernr = new sap.m.Input({
			type : "Text",
			placeholder : "ТН↕"
		});

		var inputEname = new sap.m.Input({
			type : "Text",
			placeholder : "ФИО↕"
		});

		var inputBusElement = new sap.m.Input({
			type : "Text",
			placeholder : "ФН↕"
		});

		var inputDivision = new sap.m.Input({
			type : "Text",
			placeholder : "Подразделение↕"
		});

		var inputEmail = new sap.m.Input({
			type : "Text",
			placeholder : "Электронная почта↕"
		});

		var inputEmailAdd = new sap.m.Input({
			type : "Text",
			placeholder : "Личная эл. почта↕"
		});

		var inputPhone = new sap.m.Input({
			type : "Text",
			placeholder : "Номер телефона↕"
		});
		
		var inputPhoneAdd = new sap.m.Input({
			type : "Text",
			placeholder : "Доп. ном. тел.↕"
		});

		var inputSkype = new sap.m.Input({
			type : "Text",
			placeholder : "Скайп↕"
		});

		var inputOrgUnit = new sap.m.Input({
			type : "Text",
			placeholder : "Орг. единица↕"
		});

		var inputRegApp = new sap.m.Input({
			type : "Text",
			placeholder : "Штатная должность↕"
		});
		
		var TableColumns = new sap.m.ColumnListItem({
			cells : [ new sap.m.Text({
				text : "{Pernr}"
			}), new sap.m.Text({
				text : "{Ename}"
			}), new sap.m.Text({
				text : "{BusElement}"
			}), new sap.m.Text({
				text : "{Division}"
			}), new sap.m.Text({
				text : "{Email}"
			}), new sap.m.Text({
				text : "{EmailAdd}"
			}), new sap.m.Text({
				text : "{Phone}"
			}), new sap.m.Text({
				text : "{PhoneAdd}"
			}), new sap.m.Text({
				text : "{Skype}"
			}), new sap.m.Text({
				text : "{OrgUnit}"
			}), new sap.m.Text({
				text : "{RegApp}"
			})

			]

		}).addStyleClass("TableContent")

		var oTable = new sap.m.Table({
			id : 'idTable',
			//height : "100%",
			//rowHeight : 15,
			fixedLayout : false,
			mode : sap.m.ListMode.Single,
			//enableColumnReordering : true,
			headerToolbar : [ ToolBar, ],
			columns : [ new sap.m.Column({
				demandPopin: true,
				header : [ new sap.m.Label({
					text : "ТН ↕",
					width: "30px"
				}) ]
			}), new sap.m.Column({
				demandPopin: true,
				header : [ new sap.m.Label({
					text : "ФИО ↕"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "ФН ↕",
					width: "45px"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "СП ↕"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "Электронная почта ↕"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "Личная эл. почта ↕"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "Номер телефона ↕"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "Доп. ном. тел. ↕"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "Скайп ↕"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "Орг. единица ↕"
				}) ]
			}), new sap.m.Column({
				header : [ new sap.m.Label({
					text : "Должность ↕"
				}) ]
			})

			],

		}).addStyleClass("table_sort");
		

		oTable.setModel(yoModel);
		oTable.bindItems("/", TableColumns);

		var loModel = new sap.ui.model.odata.v2.ODataModel(link, {
			useBatch : false,
			defaultUpdateMethod : "Put",
		});
		
		/*oModel.setSizeLimit(1000);
		var oBinding = oTable.getBinding("items");
		var aFilters = [];
		var oFilter = new sap.ui.model. ("Ename",
				sap.ui.model.FilterOperator.EQ, filter);
		aFilters.push(oFilter);
		var oFireFilter = new sap.ui.model.Filter("Pernr",
				sap.ui.model.FilterOperator.EQ, fired);
		aFilters.push(oFireFilter);
		oBinding.filter(aFilters);*/
		return oTable;
	},
	
});