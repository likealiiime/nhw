var map = {};
var bounds = new GLatLngBounds();
var geocoder = new GClientGeocoder();
var searchRadiusMiles = 30.0;
var contractorMarkers = [], customerMarker = {};
var markerIconBase = new GIcon();
markerIconBase.size = new GSize(64, 32);
markerIconBase.iconAnchor = new GPoint(14, 32);
markerIconBase.infoWindowAnchor = new GPoint(14, 0);
var homeMarkerIcon = new GIcon(markerIconBase, "/images/icons/map/home.png");
var knownMarkerIcon = new GIcon(markerIconBase, "/images/icons/map/known.png");
var unknownMarkerIcon = new GIcon(markerIconBase, "/images/icons/map/unknown.png");

// Adapted from http://esa.ilmari.googlepages.com/circle.htm
var drawCircleAtPoint = function(center) {
	// Esa 2006
	//calculating km/degree
	var radius = 15.0 * 1.609344; // Convert miles to km
	var nodes = 40; // Nodes are points along the circle
	var latConv = center.distanceFrom(new GLatLng(center.lat()+0.1, center.lng()))/100;
	var lngConv = center.distanceFrom(new GLatLng(center.lat(), center.lng()+0.1))/100;

	var points = [];
	var step = parseInt(360/nodes);
	for(var i = 0; i <= 360; i += step) {
		points.push(new GLatLng(center.lat() + (radius/latConv * Math.cos(i * Math.PI/180)), center.lng() + (radius/lngConv * Math.sin(i * Math.PI/180))));
	}
	points.push(points[0]); // Closes the circle, thanks Martin
	map.addOverlay(new GPolygon(points, "#0055ff", 2, 0.4, "#0055ff", 0.2));
}

var contractorsTable = new CITable({
	title: new CITitle({ title: 'Known Contractors' }),
	hideHeader: true,
	selectable: true,
	get: {
		url: '/admin/contractors/async_find_in_radius',
		paramsFn: function() { return { radius: searchRadiusMiles, lat: customerMarker.getLatLng().lat(), lng: customerMarker.getLatLng().lng() }; }
	},
	cssStyles: { CIFirmWidth: 250, CIFirmHeight: 270 },
	columns: [
		{ property: 'id', renderer: function(id, contractor) {
			var img = new CIElement('img', { src: '/images/icons/' + (contractor.flagged ? 'red_flag_16' : 'none') + '.png', alt: 'Flagged' });
			return new CIVPanel({
				cssStyles: { CIFirmWidth: 16, CIFirmHeight: 32 },
				content: [
					new CIImageLink({
						src: '/images/icons/action/edit.png',
						alt: 'Edit this Contractor',
						Clicked: function() {
							var object = {
								company: contractor.company,
								email: contractor.email,
								phone: contractor.phone,
								fax: contractor.fax,
								address: contractor.address.address,
								city: contractor.address.city,
								state: contractor.address.state,
								zip: contractor.address.zip_code,
								rating: contractor.rating,
								flagged: contractor.flagged
							};
							var form = new CIForm({
								submitLabel: 'Update Contractor',
								post: '/admin/contractors/async_update/' + contractor.id,
								fields: [
									{ label: 'Company:', property: 'company', name: 'contractor[company]' },
									{ label: 'Email:', property: 'email', name: 'contractor[email]' },
									{ label: 'Phone:', size: 15, property: 'phone', name: 'contractor[phone]' },
									{ label: 'Fax:', size: 15, property: 'fax', name: 'contractor[fax]' },
									{ label: 'Address:', property: 'address', name: 'address[address]' },
									{ label: 'City:', size: 15, property: 'city', name: 'address[city]' },
									{ label: 'State:', size: 2, property: 'state', name: 'address[state]' },
									{ label: 'Zip Code:', size: 5, property: 'zip', name: 'address[zip_code]' },
									{ label: 'Rating:', type: 'select', property: 'rating', options: {
										'*****': 5, '****': 4, '***': 3, '**': 2, '*': 1, ' ': null
									}, name: 'contractor[rating]' },
									{ label: 'Flagged?', type: 'checkbox', property: 'flagged', name: 'contractor[flagged]' }
								],
								PostedData: function() { hud.hide(); contractorsTable.getData(); }
							});
							var hud = new CIHud({
								title: contractor.company,
								content: form,
								Shown: function() { form.use(object); },
								offset: { from: img.element(), dy: -20 }
							});
							hud.show();
						}
					}),
					img
				]
			});
		}, cssStyles: { CIFirmWidth: 16 } },
		
		{ property: 'id', cssStyles: { 'font-size': '8pt' }, renderer: function(id, record) {
			return '<strong>{company}</strong><br/>Tel: {phone}<br/>Fax: {fax}'.substitute({
				company: record.company,
				phone: record.phone,
				fax: record.fax
			});
		}}
	],
	GotData: function(collection, json) {
		contractorMarkers.each(function(marker) {
			map.removeOverlay(marker);
		});
		bounds = new GLatLngBounds();
		collection.each(function(contractor) {
			contractor.marker = new GMarker(new GLatLng(contractor.address.lat, contractor.address.lng), { icon: knownMarkerIcon });
			bounds.extend(contractor.marker.getLatLng());
			GEvent.addListener(contractor.marker, 'click', function() {
				var miles = contractor.marker.getLatLng().distanceFrom(customerMarker.getLatLng()) * 0.00062137119;
				var html = "<strong>{company}</strong><br/>About {distance} miles away<br/>{address}".substitute({
					company: contractor.company,
					address: contractor.address.string,
					distance: miles.round(0)
				});
				contractor.marker.openInfoWindowHtml(html, { maxWidth: 300 });
				contractorsTable.selectRow(contractor.__rowIndex, true);
				assignButton.enable();
			});
			map.addOverlay(contractor.marker);
			contractorMarkers.push(contractor.marker);
		});
		// Fit the points to view
		//map.panTo(bounds.getCenter()); 
		//map.setZoom(map.getBoundsZoomLevel(bounds));
	},
	Selected: function(contractor) {
		GEvent.trigger(contractor.marker, 'click');
		assignButton.enable();
	}
});

var searchContractors = function() { searchRadiusMiles = searchRadiusField.getValue(); contractorsTable.getData(); };
var searchRadiusField = new CIFormField({
	value: searchRadiusMiles,
	label: 'Radius:', size: 4,
	noteAfterField: 'miles',
	EnterPressed: searchContractors
})
var repairSheetContent = new CIHPanel({
	spacing: 5,
	content: [
		new CIVPanel([
			new CIElement('div', { id: 'map', styles: { width: 350, height: 270 }}),
			new CIHPanel({
				valign: 'middle',
				content: [
					{
						cssStyles: { CIFirmWidth: 200 },
						content: searchRadiusField
					},
					new CILink({ label: 'Search', cssClass: 'CIHudLink', Clicked: searchContractors })
				],
			})
		]),
		contractorsTable
	]
});
var unassignButton = new CILink({
	label: 'Unassign',
	disabled: true,
	post: {
		url: '/admin/repairs/async_unassign_contractor_for_claim',
		paramsFn: function() {
			return { id: addRepairSheet.claim.id };
		}
	},
	PostedData: function() {
		addRepairSheet.hide();
	}
});
var assignButton = new CILink({
	label: 'Assign Selected',
	disabled: true,
	post: {
		url: '/admin/claims/async_update_claim_or_repair',
		paramsFn: function() {
			return {
				id: addRepairSheet.claim.id,
				repair_id: addRepairSheet.claim.repair ? addRepairSheet.claim.repair.id : null,
				'repair[contractor_id]': contractorsTable.selected.id
			}
		}
	},
	Clicked: function() {
		unassignButton.disable();
		assignNewButton.disable();
		assignButton.disable();
		assignButton.setLabel('Working...');
	},
	PostedData: function() {
		addRepairSheet.hide();
	},
	RequestFailed: function() {
		unassignButton.enable();
		assignNewButton.enable();
		assignButton.enable();
		assignButton.setLabel('Assign Selected');
	}
});
var assignNewButton = new CILink({
	label: 'Assign New',
	Clicked: function() { addContractorSheet.show(); }
});

addRepairSheet = new CISheet({
	cssStyles: { CIFirmWidth: 650 },
	title: 'Assign a Contractor to a Repair',
	buttons: {
		destructive: unassignButton,
		'default': assignButton,
		other: [
			{ label: 'Cancel'},
			assignNewButton,
		]
	},
	content: repairSheetContent,
	Shown: function() {
		if (this.claim.repair) unassignButton.enable();
		map = new GMap2(document.getElementById('map'));
		// Center on the Customer's address and mark it
		geocoder.getLatLng(
			addRepairSheet.claim.property,
			function(point) {
				if (point == null) {
					if (!(addRepairSheet.claim.property_lat && addRepairSheet.claim.property_lng)) {
						var sheet = CISheet.prompt(
							'Could Not Locate Address',
							'The customer&rsquo;s address could not be located. Please edit the address in the Properties tab and try again.',
							{ label: 'Edit Properties', Clicked: function() {
								sheet.hide();
								addRepairSheet.hide();
								navPanel.selectTab(1);
							} },
							{ label: 'Cancel', Clicked: function() {
								sheet.hide();
								addRepairSheet.hide();
							} }
						);
						return;
					} else {
						CISheet.alert('Unverifiable Address', 'The customer&rsquo;s address could not be found by Google Maps, but it was geocoded by another service. The address shown on the map is less likely to be correct.');
						point = new GLatLng(addRepairSheet.claim.property_lat, addRepairSheet.claim.property_lng);
					}
				}
				map.setCenter(point, 10);
				map.addControl(new GSmallMapControl());
				customerMarker = new GMarker(point, { icon: homeMarkerIcon });
				map.addOverlay(customerMarker);
				drawCircleAtPoint(point);
				contractorsTable.getData();
			}
		);
	},
	Hidden: function() {
		claimsTable.getData();
	}
});

var addContractorMessage = 	"You are about to assign a new Contractor to this Claim. " +
							"The Contractor will be added to the Nationwide Database and be " +
							"assigned this Claim. If you know the Contractor&rsquo;s email " +
							"address, enter it and the Contractor will be granted " +
							"web access and emailed a welcome packet.";
var addAssignButton = new CILink({
	label: 'Add &amp; Assign',
	post: {
		url: '/admin/contractors/async_create',
		paramsFn: function() { return addContractorForm.toObject(); }
	},
	Clicked: function() {
		this.disable();
		this.setLabel('Working...');
	},
	PostedData: function(contractorId, json) {
		contractorsTable.selected = { id: contractorId };
		assignButton.requestData();
		addContractorSheet.hide();
	}
});
var addContractorForm = new CIForm({
	hideSubmitButton: true,
	fields: [
		{ label: 'Company:', name: 'contractor[company]' },
		{ label: 'Phone:', name: 'contractor[phone]' },
		{ label: 'Email:', name: 'contractor[email]' },
		{ label: 'Street:', name: 'address[address]' },
		{ label: 'City:', name: 'address[city]', size: 15 },
		{ label: 'State:', name: 'address[state]', size: 2 },
		{ label: 'Zip Code:', name: 'address[zip_code]', size: 5 }
	]
});
				
var addContractorSheet = new CISheet({
	title: 'Assigning New Contractor',
	buttons: {
		'default': addAssignButton,
		other: { label: "Cancel" }
	},
	content: new CIVPanel({
		padding: 10,
		content: [
			new CIText(addContractorMessage),
			addContractorForm
		]
	})
});