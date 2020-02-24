document.addEventListener('click', handleButtonClick);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
emailInput.addEventListener('keyup', removeRequirementClass);
passwordInput.addEventListener('keyup', removeRequirementClass);

function handleButtonClick() {
	const element = event.target;
	if (element.value === 'continue') {
		const stepContainer = element.parentElement;
		if (childInputsAreValid(stepContainer)) {
			// hide current step
			stepContainer.style.display = 'none';
			// find next step
			nextDiv = findNextElementByClass(stepContainer, 'collapse');
			// show next step
			nextDiv.style.display = 'block';
		}
	} else if (element.value === 'back') {
		const stepContainer = element.parentElement;
		// hide current step
		stepContainer.style.display = 'none';
		// find next step
		nextDiv = findPreviousElementByClass(stepContainer, 'collapse');
		// show next step
		nextDiv.style.display = 'block';
	}
}

function findNextElementByClass(element, className) {
	let nextElement = element.nextElementSibling;
	while (element) {
		if (nextElement.className === className) return nextElement;
		nextElement = nextElement.nextElementSibling;
	}
}

function findPreviousElementByClass(element, className) {
	let previousElement = element.previousElementSibling;
	while (element) {
		if (previousElement.className === className) return previousElement;
		previousElement = previousElement.previousElementSibling;
	}
}

function childInputsAreValid(element) {
	const children = element.children;
	let child = null;
	for (let i = 0; i < children.length; i++) {
		child = children[i];
		if (child.tagName === 'INPUT') {
			if (child.type !== 'button') {
				// remove any previous 'error' class
				child.classList.remove('requirements');
				if (!child.checkValidity()) {
					child.classList.add('requirements');
					child.previousElementSibling.classList.add('requirements');
					return false;
				}
			}
		}
	}
	return true;
}

function removeRequirementClass() {
	const element = event.target;
	element.classList.remove('requirements');
	element.previousElementSibling.classList.remove('requirements');
}
