/*
23rd Jan 2020 - fixed KM pace calculation
*/
function cc(){
	var form = document.getElementById("calories-burned-running-calculator-form");
	var w = form.weight.value;
	var h = form.hours.value;
	var m = form.minutes.value;
	var s = form.seconds.value;
	if (h>0)
		m = parseInt(m) + (h * 60);
	
	if (s>0)
		m = parseInt(m) + (s / 60);
	var c=0;
	var met=0;
	var islb=isSwitchChecked('lbs');

	met = getMetByUnknownSpeed(form, m);
	
	if (islb){
		c=cclb(w,met,m);
	}else{
		c=cckg(w,met,m);
	}
	if (! isNaN(c) ){
		document.getElementById('lbl-calories-burned-value').innerHTML=c;
	}

}

function getMetByUnknownSpeed(form, minutes){
	
	var met =-1;
	
	if (form.distance.value == ''){
		return null;
	}
	
	var dec_val = form.distance_decimal.value;
	var distance = 0;
	if (dec_val == 0){
		distance = parseInt(form.distance.value);
	}else{
		distance = parseInt(form.distance.value) + (parseInt( dec_val.charAt(0)) / 10);
	}
	
	if (isSwitchChecked('miles')){
		calcPace(minutes,distance,true);
		speed=closestSpeed((distance/minutes)*60);
	}else {
		calcPace(minutes,distance,false);
		speed=closestSpeed(((distance/minutes)*60)*0.621371192);
	}
	
	switch (speed){
		case 4: //speed_4
			met=6;
			break;
		case 5: //speed_5
			met=8.3;
			break;
		case 5.5: //speed_5_2
			met=9;
			break;
		case 6: //speed_6
			met=9.8;
			break;
		case 6.5: //speed_6_7
			met=10.5;
			break;
		case 7: //speed_7
			met=11;
			break;
		case 7.5: //speed_7_5
			met=11.4;
			break;
		case 8: //speed_8
			met=11.8;
			break;
		case 8.5: //speed_8_6
			met=12.3;
			break;
		case 9: //speed_9
			met=12.8;
			break;
		case 10: //speed_10
			met=14.5;
			break;
		case 11: //speed_11
			met=16;
			break;
		case 12: //speed_12
			met=19;
			break;
		case 13: //speed_13
			met=19.8;
			break;
		default : //speed_14
			met=23;
			break;
	}
	 return met;
}

function closestSpeed (num) {
	knownSpeeds = [4,5,5.5,6,6.5,7,7.5,8,8.5,9,10,11,12,13,14];
	var curr = knownSpeeds[0];
	var diff = Math.abs (num - curr);
	for (var val = 0; val < knownSpeeds.length; val++) {
		var newdiff = Math.abs (num - knownSpeeds[val]);
		if (newdiff < diff) {
			diff =newdiff;
			curr = knownSpeeds[val];
		}
	}
	return curr;
}

function calcPace(minutes,distance,isMiles){
	var pace=0;
	var paceType='';
	pace=(minutes / distance) ;
	if (isMiles){
		paceType='mile';
	}else{
		paceType = 'km';
	}
	var seconds = leftPad(parseInt(( pace % 1) * 60));
	
	document.getElementById('lbl-running-pace-value').innerHTML=(Math.floor(pace) + ':' + seconds + ' min per ' + paceType);
}

function cckg(kg,met,mins){
	return Math.round(met * 3.5 * (kg) / 200 * mins);
}

function cclb(lb,met,mins){
	return cckg(lb*0.45359237,met,mins);
}

function isSwitchChecked(id){
	var element = document.getElementById(id);
	//return (element.className=='active');
	return (element.classList.contains('active'));
}

function selectSwitch(id){
	var element = document.getElementById(id);
	var siblings = element.parentNode.getElementsByTagName("label");
	for (var index = 0; index < siblings.length; ++index) {
		siblings[index].classList.remove('active')
	}
	element.classList.add('active');
	cc();
}


function leftPad(number) {
	var formattedNumber = ("0" + number).slice(-2);
	return formattedNumber;
}
