gEditingTable = {};
gEditingPage = null;

gQuickMailCustomerId = 0;

var ContractorFinder = {
	radiusField: new CIFormField({
		label: 'Find within ',
		size: 3, noteAfterField: 'miles of location:',
		value: 15
	}),
	locationField: new CIFormField({
		labelStyles: { display: 'none' },
		size: 38
	}),
	submit: function() {
		// This is really hacky. CIP should do this; CIForm#submitAsHTML();
		$('contractorFinderForm_radius').set('value', ContractorFinder.radiusField.getValue());
		$('contractorFinderForm_location').set('value', ContractorFinder.locationField.getValue());
		$('contractorFinderForm').submit();
	}
};
ContractorFinder.radiusField.addEvent(CIEvent.EnterPressed, ContractorFinder.submit);
ContractorFinder.locationField.addEvent(CIEvent.EnterPressed, ContractorFinder.submit);

ContractorFinder.hud = new CIHud({
	title: 'Find contractor by location',
	offset: { from: $('contractorFinder'), dx: 20, dy: 20 },
	content: [
		ContractorFinder.radiusField,
		ContractorFinder.locationField,
		new CILink({
			Clicked: ContractorFinder.submit,
			label: 'Find Contractors',
			cssStyles: { display: 'block', CIFirmWidth: 274 }
		})
	],
	Shown: function() {
		ContractorFinder.locationField.giveFocus();
	}
});

CIApplication.CustomerListColumns = [
	new CIColumn({ header: 'Contract #', property: 'contract', width: 75 }),
	new CIColumn({ header: 'Date', property: 'date', width: 130 }),
	new CIColumn({ header: 'Name', property: 'name' }),
	new CIColumn({ header: 'Email', property: 'email',
		renderer: function(email, customer) {
			return '<a href="mailto:' + email + '">' + email + '</a>';
		}
	}),
	new CIColumn({
		property: 'email', width: 22,
		renderer: function(email, customer) {
			if (email && email != '') {
				var link = new CIImageLink({
					src: '/images/icons/mail_write.png',
					alt: 'Quickly Email',
					Clicked: CIApplication.quicklyEmail
				});
				link.customer = customer;
				return link;
			} else return '&nbsp;';
		}
	}),
	new CIColumn({
		property: 'standing', width: 30,
		renderer: function(standing, customer) {
			if (standing)
				return '<img src="/images/icons/credit_cards/' + standing + '.png" ' +
						'alt="' + standing.capitalize() + '"/>';
			else
				return '&nbsp;';
		}
	}),
	new CIColumn({
		header: 'Status', property: 'status', width: 100,
		renderer: function(status, customer, data, td, tr, table) {
			if (customer.isWebOrder) tr.addClass('webOrder');
			return status;
		}
	}),
	new CIColumn({
		property: 'id', width: 25,
		renderer: function(id, customer) {
			return '<a href="/admin/customers/edit/' + id + '">Edit</a>'
		}
	})
];

CIApplication.onDomReady = function() {
	/*$$('a.quickMail').each(function(a) {
		
		a.addEvent('click', onQuickMailClick);
	});
	
	$('quickMail_hud').fade('hide');
	$('quickMail_hud').style.display = 'block';*/

	$$('a.CCReplace').each(function(a) { a.addEvent('click', function(event) {
		var link = $(event.target);
		var input = new Element('input', {
			name: 	"customer[credit_card_number]",
			size: 	16,
			type: 	'text',
			value: 	link.rel
		});
		input.set('value', link.rel);
		input.replaces(link);
	}); });
};

CIApplication.quicklyEmail = function(event) {
	var img = $(event.target); var customer = this.customer;
	new Request.JSON({
		url: '/admin/email_templates/async_quickly_email',
		onSuccess: function(templates, json) {
			var link = new CILink({
				label: 'Send Email',
				cssStyles: { display: 'block', CIFirmWidth: 275 },
				Clicked: CIApplication.sendQuickEmail
			});
			var select = new CIFormField({
				label: 'Template:', type: 'select',
				options: $lambda(templates)
			});
			var hud = new CIHud({
				title: 'Quickly Email',
				offset: { from: img },
				content: [
					new CIFormField({
						label: 'To:', value: customer.name, type: 'label',
						cssStyles: { color: 'white', 'font-weight': 'bold' }
					}),
					select,
					new CIElement('br'),
					link
				]
			});
			hud.customerId = customer.id;
			hud.templateSelect = select;
			link.hud = hud;
			hud.show();
		}
	}).get({ id: this.customer.id });
};

CIApplication.sendQuickEmail = function(event) {
	var button = this;
	this.setLabel('Sending...'); this.disable();
	new Request.JSON({
		url: '/admin/email_templates/async_quickly_email',
		onSuccess: function(response, json) {
			if (response.result == 'sent') {
				this.hud.hide();
			} else {
				this.setLabel('Could Not Send Email');
				this.enable();
			}
		}.bind(this)
	}).post({
		customer_id: this.hud.customerId,
		template_id: this.hud.templateSelect.getValue()
	});	
};
CIApplication.assignFax = function(faxesTable, faxId) {
	var doSearch = function() { 
		searchButton.disable();
		searchButton.setLabel('Searching...');
		table.getData();
	};
	
	var field = new CIFormField({
		size: 35,
		labelStyles: { display: 'none' },
		EnterPressed: doSearch
	});
	var searchButton = new CILink({
		label: 'Search',
		Clicked: doSearch
	});
	var table = new CITable({
		title: 'Assign Fax',
		selectable: true,
		cssStyles: { 'max-height': 400, overflow: 'auto' },
		get: {
			url: '/admin/faxes/async_assignment_search',
			paramsFn: function() {
				return { 'q': field.getValue() };
			}
		},
		post: {
			url: '/admin/faxes/async_assign',
			paramsFn: function(record) {
				return {
					'id': faxId,
					'assignable_id': record.id,
					'assignable_type': record.ruby_type
				};
			}
		},
		PostedData: function() {
			hud.hide();
			faxesTable.getData();
		},
		GotData: function() {
			searchButton.enable();
			searchButton.setLabel('Search');
		},
		columns: [
			new CIColumn({ header: 'ID or Fax', width: 130, property: 'id_fax' }),
			new CIColumn({ header: 'Name or Company', property: 'name_company' })
		],
		Selected: function(selected) { this.postRecord(selected); }
	});
	var hud = new CIHud({
		title: 'Assign Fax',
		cssStyles: { CIFirmWidth: 375 },
		offset: { from: faxesTable.element() },
		content: [
			$E('span', 'Search by Customer ID or Name, Contractor Fax or Company'),
			new CIHPanel({
				valign: 'middle',
				content: [field, searchButton]
			}),
			table
		],
		Shown: function() { field.field.focus(); }
	});
	hud.show();
	return hud;
};

CIApplication.generateFaxesTable = function(options) {
	getUrl = '/admin/faxes/async_list/' + options.key;
	if (options.forResource)
		getUrl = '/admin/faxes/async_list_for_' + options.forResource + '/' + options.resourceId;

	var toolbar = [];
	if (!options.cannotRetrieve) {
		toolbar.push(new CIButton({
			iconSrc: '/images/icons/action/download.png',
			label: 'Retrieve',
			get: '/admin/fax_sources/retrieve/' + options.key,
			Clicked: function() {
				this.disable();
				this.setLabel('Retrieving...');
			},
			GotData: function(response) {
				this.enable();
				this.setLabel('Retrieve')
				table.getData();
			}
		}));
	}
	var table = new CITable({
		title: new CITitle({ title: options.title || 'Faxes', content: toolbar }),
		get: getUrl,
		cssStyles: { CIFirmWidth: options.width || 400 },
		hideHeader: true,
		columns: [
			new CIColumn({
				header: 'Preview', property: 'id', width: 80,
				cssStyles: { 'text-align': 'center', 'vertical-align': 'top' },
				renderer: function(id) {
					return new CIVPanel({
						spacing: 5,
						content: [
							new CIElement('img', {
								src: '/admin/faxes/thumbnail/' + id,
								styles: { border: '1px solid #CCC' },
								events: {
									click: function() {
										var hud = new CIHud({
											title: 'Fax Preview',
											cssStyles: { CIFirmWidth: 800 },
											content: [
												new CIElement('img', {src:'/admin/faxes/preview/' + id}),$E('br'),
												new CILink({ label: 'Close Preview', Clicked: function() { hud.hide(); }}),
												$E('br')
											]	
										}); // new CIHud
										hud.show();
									} // click
								} // events
							}), // CIElement
							new CIImageButton({
								src: '/images/icons/action/delete.png',
								alt: 'Permanently delete this fax',
								cssClass: 'CIHudLink',
								Clicked: function() {
									CISheet.prompt(
										'Confirm Delete Fax',
										'You are about to permanently delete a fax. No Customers or Contractors will be assigned this fax, and it will no longer be available for download.<br/><br/><strong>This action cannot be undone!</strong>',
										{
											label: 'Delete',
											post: '/admin/faxes/destroy/' + id,
											PostedData: function() { table.getData(); }
										}
									); // CISheet.prompt
								} // Clicked()
							}) // CIImageButton
						] // content
					}); // CIVPanel
				} // renderer()
			}), // Preview Column
			new CIColumn({
				header: 'Fax', property: 'id',
				renderer: function(id, record) {
					var content = [
						$E('span',
							'<a href="/admin/faxes/download/' + record.id + '">Download PDF</a><br/>' +
							'From: ' + record.formatted_sender_fax_number + '<br/>' +
							'Received: ' + record.received_at
						)
					];
					record.assignables.each(function(assignable) {
						content.push(new CIHPanel([
							$E('strong', assignable.summary),
							new CIButton({
								label: 'Unassign',
								cssClass: 'CIHudLink',
								post: {
									url: '/admin/faxes/async_unassign/' + record.id,
									paramsFn: function() { return { assignable_id: assignable.id, assignable_type: assignable.type }; }
								},
								PostedData: function() { faxesTable.getData(); }
							})
						]));
					});
					content.push(new CIButton({
						label: 'Assign...',
						cssClass: 'CIHudLink',
						Clicked: function() { CIApplication.assignFax(table, record.id); }
					}));
					return new CIVPanel({
						spacing: 5,
						content: content
					});
				} // render()
			}) // Fax Column
		] // columns
	});
	return table;
};

function appendPlaceholder(placeholder) {
	var textarea = $('email_template_body');
	textarea.set('value', textarea.get('value') + '{' + placeholder + '}');
}

function inlineEditTextarea(id, object, controller, property) {
	var prefix = object + '_' + id + '_';
	var container = $(prefix + 'td');
	
	// If it's already being editing, cancel it
	if (container.hasClass('editing')) {
		container.empty();
		container.set('text', gEditingTable[container.id]);
		delete gEditingTable[container.id];
		container.toggleClass('editing');
		$(prefix + 'edit').set('text', 'Edit');
		return;
	}
	
	var old_text = container.get('text');
	gEditingTable[container.id] = old_text;
	var textarea = new Element('textarea', {
		'id': prefix + '_textarea',
		'text': old_text, 'value': old_text,
		'rows': 6, 'cols': 40
	});
	var button = new Element('input', {
		'type': 'button', 'value': 'Save ' + object.capitalize()
	});
	button.addEvent('click', function() {
		var params = { 'id': id };
		params[object+'['+(property || (object+'_text'))+']'] = textarea.get('value');
		
		new Request.JSON({
			secure: true,
			url: '/admin/' + (controller || (object+'s')) + '/async_update',
			onSuccess: function(o, json) {
				// Update the editing table with the new value
				gEditingTable[container.id] = textarea.get('value');
				// Cancel Editing with the new value
				inlineEditTextarea(id, object, controller, property);
			}
		}).POST(params);
	});
	
	container.empty();
	container.adopt(textarea, new Element('br'), button);
	container.toggleClass('editing');
	$(prefix + 'edit').set('text', 'Cancel Editing');
}

function setClaimStatus(id, status, customerId) {
	new Request.JSON({
		secure: true,
		url: '/admin/claims/async_update',
		onSuccess: function(claim, json) {
			url = 	window.location.protocol + '//' +
					window.location.host +
					window.location.pathname +
					'#claims';
			//console.log(url);
			window.location.reload();
		}
	}).POST({
		'id': id,
		'claim[claim_approve]': status
	});
}

function copyBillingAddressFromCoverage() {
	['address', 'city', 'state', 'zip_code'].each(function(field) {
		$('billing_' + field).set('value', $('property_' + field).get('value'));
	});
}

function editContent(page) {
	new Request.JSON({
		secure: true,
		url: '/admin/content/async_load',
		onSuccess: function(hash, json) {
			gEditingPage = page;
			$('textarea').set('value', hash.content);
		}
	}).POST({page: page});
}

function saveContent() {
	if (gEditingPage == null) return;
	
	new Request.JSON({
		secure: true,
		url: '/admin/content/async_save',
		onSuccess: function(hash, json) {
			if (hash.status == 'saved')
				alert("Saved content for http://www.nationwidehomewarranty.com/" + gEditingPage);
			else
				alert("Could not save content for http://www.nationwidehomewarranty.com/" + gEditingPage + ":\n\n" + hash.status + "\n\nIs it chmod 666?");
		}
	}).POST({page: gEditingPage, content: $('textarea').get('value')});
}

function validateRelatedForm() {
	var actions = $$('select.relatedform_select').map(function(select) {
		return select.get('value');
	});
	var primaryCount = actions.filter(function(action) { return action == 'primary'; }).length;
	if (primaryCount > 1) {
		alert('Only one Customer may be made the primary account.');
		return false;
	} else if (primaryCount == 0) {
		if (!window.confirm("You have not selected a primary account. " +
			"Any property additions will be made to the currently viewed Customer. " +
			"Please confirm that this is the intended action."))
		return false;
	}
	
	if(window.confirm("Please review the changes you are about to make, and confirm you wish to make them. " +
					  "These changes are irreversible!"
	)) {
		$('relatedform_button').disabled = true;
		$('relatedform').submit();
	}
}

window.addEvent('domready', function() {
	if ($('article_title') && $('article_slug')) {
		$('article_title').addEvent('keyup', function(e) {
			//console.log($('article_slug').get('value'));
			//console.log($('article_title').get('value'));
			$('article_slug').set('value', e.target.get('value').replace(/[\s._+=*&\^#@$!()]/gi, '-').toLowerCase());
		});
	}
});