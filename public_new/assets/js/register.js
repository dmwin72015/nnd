;
(function(global) {
	var doc = global.document;
	var body = doc.querySelector('body');
	var regBtn = doc.querySelector('#btn_reg');
	regBtn.addEventListener('click',function(){
		var logBox = doc.querySelector('.login-box');

		// logBox.classList.add('hidden');

		var regBox = document.querySelector('.regi-box');
		regBox.classList.remove('hide');

	});
	


})(window);