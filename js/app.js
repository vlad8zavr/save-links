

(function() {

//get elements
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.getElementById('clear-list');
const feedback = document.querySelector('.feedback');


let itemData = JSON.parse(localStorage.getItem('list')) || [];
if (itemData.length > 0) {
	itemData.forEach(function(singleItem) {
		itemList.insertAdjacentHTML('beforeend', `
		  <div class="item my-3">
		  <h5 class="item-name">${singleItem}</h5>
	      <div class="item-icons">
	       <a href="${singleItem}" target="_blank" class="complete-item mx-2 item-icon"><i class="fas fa-link"></i></a>
	       <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
	       <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
	      </div>
	      </div>
		`);
		handleItem(singleItem);
	});
}

// form submition
itemForm.addEventListener('submit', function(event) {
	event.preventDefault();

	const textValue = itemInput.value;
	if (textValue === '') {
		showFeedback('please enter a valid value', 'danger');
	}
	else { 
		//add item
		addItem(textValue);

		// clear the input field
		itemInput.value = '';

		// add item in array
		itemData.push(textValue);

		// LOCAL STORAGE
		localStorage.setItem('list', JSON.stringify(itemData));

		// add event listeners to icons
		handleItem(textValue);
	}

});


function showFeedback(text, action) {
	feedback.classList.add('showItem', `alert-${action}`);
	feedback.innerHTML = `<p>${text}</p>`;
	setTimeout(function(){
		feedback.classList.remove('showItem', `alert-${action}`);
	}, 3000);
}


function addItem(value) {
	const div = document.createElement('div');
	div.classList.add('item', 'my-3');
	div.innerHTML = `<h5 class="item-name">${value}</h5>
      <div class="item-icons">
       <a href="${value}" target="_blank" class="complete-item mx-2 item-icon"><i class="fas fa-link"></i></a>
       <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
       <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
      </div>`;
      itemList.appendChild(div);
}


function handleItem(text) {
	const items = itemList.querySelectorAll('.item');
	items.forEach(function(item) {
		// find the right item of all items
		if (item.querySelector('.item-name').textContent === text) {
			
			// complete event listener
			item.querySelector('.complete-item').addEventListener('click', function() {
				// line-through style for text
				item.querySelector('.item-name').classList.toggle('completed');
				// icon opacity handle
				this.classList.toggle('visibility');
			});

			// edit event listener
			item.querySelector('.edit-item').addEventListener('click', function() {
				itemInput.value = text;
				// removing item element
				itemList.removeChild(item);
				// removing item from itemData array
				itemData = itemData.filter(function(item) {
					return item !== text;
				});

				// LOCAL STORAGE
				localStorage.setItem('list', JSON.stringify(itemData));
			});

			// delete event listener
			item.querySelector('.delete-item').addEventListener('click', function() {
				// removing item element
				itemList.removeChild(item);
				// removing item from itemData array
				itemData = itemData.filter(function(item) {
					return item !== text;
				});

				// LOCAL STORAGE
				localStorage.setItem('list', JSON.stringify(itemData));
				
				showFeedback(`item {${text}} deleted`, 'success');
			});
		}
	})
}


clearBtn.addEventListener('click', function() {
	// clearing itemData array
	itemData = [];

	// LOCAL STORAGE
	localStorage.removeItem('list');

	const items = itemList.querySelectorAll('.item');
	if (items.length > 0) {
		items.forEach(function(item) {
			// removing item element
			itemList.removeChild(item);
		});

		showFeedback(`all items deleted`, 'success');
	}
})

})();
