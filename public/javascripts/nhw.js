gEmailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
gCurrentSlider = null;
gPriceYearly = { plan: 0.0, addons: 0.0 };
gPlanPrice = 0.0;
gCoverages = $H({});
gDiscountAmount = 0.0;
gDiscountCode = '';

function slideSheetIn(name, instantly) {
	gCurrentSlider = new Fx.Slide($('layout_' + name));
	if (instantly)
		gCurrentSlider.show();
	else
		gCurrentSlider.slideIn();
}

HTTPS = 'https://';
window.addEvent('domready', function() {
	if (window.location.hostname == 'localhost') HTTPS = 'http://';
	
	// Fake link because of stupid <a>
	$('layout_header').addEvent('click', function() { window.location = '/'; });
	
	$$('div.sheet').each(function(sheet) {
		query = window.location.toString().split('?')[1] || '';
		if (query.contains('getaquote') && sheet.id.contains('getaquote')) {
			sheet.style.display = 'block';
			return;
		}
		new Fx.Slide(sheet, {duration: 0.0}).slideOut().chain(function() {
			sheet.style.display = 'block';
		});
	});

	$$('a.showsheet').each(function(a) {
		a.addEvent('click', function() {
			if (gCurrentSlider)
				gCurrentSlider.slideOut().chain(function() { slideSheetIn(a.rel); });
			else
				slideSheetIn(a.rel);
		});
	});
	
	if ($('getaquote_button')) {
		$('discount_code').addEvent('keydown', interceptEnterForDiscounts);
		$('getaquote_button').disabled = false;
		updatePlanTotal();
	}
});

function copyBillingInfo() {
	$('customer_billing_first_name').set('value', $('customer_first_name').get('value'));
	$('customer_billing_last_name').set('value', $('customer_last_name').get('value'));
	$('billing_address_address').set('value', $('property_address').get('value'));
	$('billing_address_state').set('value', $('property_state').get('value'));
	$('billing_address_city').set('value', $('property_city').get('value'));
	$('billing_address_zip_code').set('value', $('property_zip_code').get('value'));
}

function applyDiscount() {
	if ($('payment_plan_select').get('value') == '12') return;
	
	var validation = validatePresenceOf([
		{id:'discount_code', message: "Please enter the Discount Code you wish to apply."}
	]);
	if (validation[0] != null) {
		validationAlert(validation); return;
	}
	var params = { discount_code: $('discount_code').get('value') };
	if ($('customer_id').get('value').toInt()) params['id'] = $('customer_id').get('value').toInt();
	
	new Request.JSON({
		url: HTTPS + window.location.host + '/admin/discounts/async_validate',
		onSuccess: function(response, json) {
			if (response.validated) {
				$('discount_id').set('value', response.discount_id);
				gDiscountCode = $('discount_code').get('value');
				gDiscountAmount = response.validated.toFloat();
				var amountString = gDiscountAmount <= 1.0 ? (gDiscountAmount * 100) + '%' : '$' + gDiscountAmount.round(2);
				$('discount_span').set('html', "<br/>A " + amountString + " discount has been applied.");
				$('applyDiscount_button').disabled = false;
				$('discount_code').disabled = true;
				updatePlanTotal();
			} else {
				validationAlert(['The Discount Code you have entered is invalid.']);
				return;
			}
		}
	}).post(params);
}

function toggleCoverage(id, value) {
	if (gCoverages.get(id) == 0.0)
		gCoverages.set(id, value.toFloat());
	else
		gCoverages.set(id, 0.0);
		
	updatePlanTotal();
}

function getSelectedPackagePrice() {
	var selected = null;
	$$('input.packageRadioButton').each(function(radioButton) {
		if (radioButton.checked) {
			selected = radioButton;
			return;
		}
	});
	if (selected)
		return selected.value.toFloat();
	else
		return null;
}

function interceptEnterForDiscounts(event) {
	if (event.key == 'enter') {
		applyDiscount();
		return false;
	}
	return true;
}

function updatePlanTotal() {
	// IE does not support the 'table-row' style
	var blockingStyle = Browser.Engine.trident ? 'block' : 'table-row';
	new Request.JSON({
		url: HTTPS + window.location.host + '/admin/content/async_get_package_prices',
		method: 'post',
		onFailure: function(xhr) {
			alert('failure');
		},
		onSuccess: function(packagePrices, json) {
			$H(packagePrices).each(function(price, id, hash) {
				price = price.toFloat()
				var priceMonthly = (price/12.00).round(0);
				$('customer_coverage_type_'+id+'_label').set('html',
					'$'+price+'<br/>or<br/>$'+priceMonthly+'/month');
			});
			
			var selectedPackage = null;
			$$('input.packageRadioButton').each(function(radioButton) {
				if (radioButton.checked) {
					selectedPackage = radioButton; return;
				}
			});
			if (!selectedPackage) return;
			
			var selectedContractLength = null;
			$$('input.contractLengthRadioButton').each(function(radioButton) {
				if (radioButton.checked) {
					selectedContractLength = radioButton; return;
				}
			});
			if (!selectedContractLength) return;
			var isOneYear = selectedContractLength.get('value') == '1';
			var contractLength = selectedContractLength.get('value').toInt();
			var totalPrice = packagePrices[selectedPackage.get('value').toInt()];
			
			$$('input.coverageCheckbox').each(function(checkbox) {
				if (checkbox.checked) totalPrice += checkbox.get('value').toFloat();
			});
			
			totalPrice *= contractLength;
			
			var dividend = 1.0;
			var numPayments = 1;
			var savings = 0.0;
			if (isOneYear) {
				$('paymentPlan_tr').setStyle('display', blockingStyle);
				$('eachPayment_tr').setStyle('display', blockingStyle);
				$('savings_tr').setStyle('display', 'none');
				$('yourPrice_tr').setStyle('display', 'none');
				$('price_tr').setStyle('display', 'none');
				$('discount_span').setStyle('display', 'inline');
				dividend = $('payment_plan_select').get('value').toFloat();
				numPayments = dividend.toInt();
				if (gDiscountAmount <= 0.0) { // No discount applied
					$('applyDiscount_button').disabled = false;
					$('discount_code').disabled = false;
					$('discount_code').set('value', '');
				} else {
					if (numPayments != 12) {
						if (gDiscountAmount <= 1.0)
							totalPrice *= 1.0 - gDiscountAmount;
						else
							totalPrice -= gDiscountAmount;
					}
					$('discount_code').set('value', gDiscountCode);
					$('applyDiscount_button').disabled = true;
					$('discount_code').disabled = true;
				}
			} else {
				$('paymentPlan_tr').setStyle('display', 'none');
				$('eachPayment_tr').setStyle('display', 'none');
				$('savings_tr').setStyle('display', blockingStyle);
				$('yourPrice_tr').setStyle('display', blockingStyle);
				$('price_tr').setStyle('display', blockingStyle);
				savings = totalPrice * 0.13;
				if (gDiscountAmount == 0.0) { // No discount applied
					$('discount_code').disabled = true;
					$('applyDiscount_button').disabled = true;
					$('discount_code').set('value', 'MULTIYR');
				} else {
					$('discount_code').set('value', 'MULTIYR');
					$('discount_span').setStyle('display', 'none');
				}
			}
			
			var payAmount = ((totalPrice - savings)/ dividend).round(2);
			
			$('savings').set('text', '$' + savings.round(2));
			$('price').set('text', '$' + totalPrice.round(2));
			$('priceYearly').set('text', '$' + (totalPrice - savings).round(2));
			$('eachPayment_td').set('text', '$' + payAmount);
			$('customer_num_payments').set('value', numPayments);
			$('customer_pay_amount').set('value', payAmount);
		}
	}).post({'home_type':$('customer_home_type').get('value')});
}

/// VALIDATION ///

function validatePresenceOf(fields) {
	return fields.map(function(field, index) {
		if ($(field.id).get('value').clean().length == 0)
			return field.message;
		else
			return null;
	});
}
function validateLengthEquals(fields) {
	return fields.map(function(field, index) {
		if ($(field.id).get('value').clean().length == field.requiredLength)
			return null;
		else
			return field.message;
	});
}
function validateLengthAtLeast(fields) {
	return fields.map(function(field, index) {
		if ($(field.id).get('value').clean().length >= field.requiredLength)
			return null;
		else
			return field.message;
	});
}

function validateChecked(fields) {
	return fields.map(function(field, index) {
		if (field.id && !field.group) field.group = [field.id];
		var isChecked = false;
		field.group.each(function(id, index) {
			if ($(id).checked != '' || $(id).checked != false) isChecked = true;
		});
		if (isChecked)
			return null;
		else
			return field.message;
	});
}

function validateMatches(fields) {
	return fields.map(function(field, index) {
		if ($(field.id).get('value').test(field.regexp, 'i'))
			return null;
		else
			return field.message;
	});
}

function validationAlert(messages) {
	var message = "Your request could not be submitted. Please correct the following problems and try again:\n\n";
	messages.each(function(m) { message += '- ' + m + '\n'; });
	alert(message);
}

function validateGetAQuoteIntroForm() {
	var messages = validatePresenceOf([
		{id:'intro_customer_first_name', message: "A First Name is required."},
		{id:'intro_customer_last_name', message: "A Last Name is required."},
		{id:'intro_property_address', message: "An Address is required."},
		{id:'intro_property_city', message: 'A City is required.'},
		{id:'intro_customer_customer_phone', message: 'A Phone Number is required.'}
	]);
	validateMatches([
		{id:'intro_customer_email', regexp: gEmailRegexp, message: 'A valid Email Address is required.'}
	]).each(function(m) { messages.push(m); });
	validateLengthEquals([
		{id:'intro_property_zip_code', requiredLength: 5, message: 'A 5-digit Zip Code is required.'}
	]).each(function(m) { messages.push(m); });
	
	messages.erase(null);
	
	if (messages.length == 0) {
		$('getaquoteintro_button').disabled = true;
		$('getaquoteintro_form').submit();
	} else {
		validationAlert(messages);
		return false;
	}
}

function validateGetAQuoteForm() {
	var messages = validatePresenceOf([
		{id:'customer_first_name', message: "A First Name is required."},
		{id:'customer_last_name', message: "A Last Name is required."},
		{id:'customer_customer_phone', message: 'A Phone Number is required.'},
		{id:'customer_billing_first_name', message: "A First Name for Billing is required."},
		{id:'customer_billing_last_name', message: "A Last Name for Billing is required."},
		{id:'property_address', message: "The Property\'s Address is required."},
		{id:'property_city', message: 'The Property\'s City is required.'},
		{id:'billing_address_address', message: "An Address for Billing is required."},
		{id:'billing_address_city', message: 'A City for Billing is required.'}
	]);
	validateMatches([
		{id:'customer_email', regexp: gEmailRegexp, message: 'A valid Email Address is required.'}
	]).each(function(m) { messages.push(m); });
	validateLengthEquals([
		{id:'property_zip_code', requiredLength: 5, message: 'The Property\'s 5-digit Zip Code is required.'},
		{id:'billing_address_zip_code', requiredLength: 5, message: 'A 5-digit Zip Code for Billing is required.'}
	]).each(function(m) { messages.push(m); });
	validateChecked([
		{
			group:['customer_coverage_type_1', 'customer_coverage_type_2', 'customer_coverage_type_3', 'customer_coverage_type_4'],
			message: 'You must select a Package.'
		},{
			id: 'tc_checkbox',
			message: 'You must agree to the Terms and Conditions.'
		}
	]).each(function(m) { messages.push(m); });
	
	messages.erase(null);
	
	if (messages.length == 0) {
		if (gDiscountAmount == 0.0) {
			$('discount_code').set('value', '').disabled = true;
			$('applyDiscount_button').disabled = true;
		}
		$('getaquote_button').disabled = true;
		$('getaquote_form').submit();
	} else {
		validationAlert(messages);
		return false;
	}
}