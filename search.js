const API_KEY = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";

// function to find the book and the info 
async function searchBooks(query) {
	const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`;

	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return data.items.map((item) => ({
				title: item.volumeInfo.title || "Title: unavailable",
				authors: item.volumeInfo.authors || ["Author: unavailable"],
				description: item.volumeInfo.description || "Description: unavailable",
				thumbnail: item.volumeInfo.imageLinks?.thumbnail || "Thumbnail: unavailable",
				publishedDate: item.volumeInfo.publishedDate || "Publishing date: unavailable",
				pageCount: item.volumeInfo.pageCount || "Pages: unavailable",
				categories: item.volumeInfo.categories || ["Categories: unavailable"],
			}));
		} else { // error in case the response is not ok
			console.error("Error", response.status, response.statusText);
			return [];
		} // error if the problem is while the function tries to fetch the data
	} catch (error) {
		console.error("Error", error);
		return [];
	}
}

// function to display the results and the setting of how the info should look out with the innerhtml tags in bookElement
function displayResults(results) {
	const resultsContainer = document.getElementById("resultsContainer");
	resultsContainer.innerHTML = "";

	if (results.length === 0) { // if no result is found then it appears a message to the user
		resultsContainer.innerHTML = `<p>Sorry, the book or author couldn't be found.</p>`;
		return;
	}
// this is what the function must create for every result that gets found
	results.forEach((book) => {
		const bookElement = document.createElement("div");
		bookElement.classList.add("book-result");

		bookElement.innerHTML = `
			<img src="${book.thumbnail}" alt="${book.title}">
			<div class="book-info">
				<h3>${book.title}</h3>
				<p><strong>Author/s:</strong> ${book.authors.join(", ")}</p>
				<p><strong>Description:</strong> ${book.description}</p>
				<p><strong>Publishing date:</strong> ${book.publishedDate}</p>
				<p><strong>Pages:</strong> ${book.pageCount}</p>
				<p><strong>Category:</strong> ${book.categories.join(", ")}</p>
				<button class="add-to-read" data-title="${
					book.title
				}">Add to Read Books</button>
			</div>
		`;

		resultsContainer.appendChild(bookElement);
		bookElement.querySelector(".add-to-read").addEventListener("click", () => {
			addToReadBooks(book);
		});
	});
}

// function to add the read books to the read books list 
function addToReadBooks(book) {
	let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
	const bookExists = readBooks.some(
		(existingBook) => existingBook.title === book.title
	);
	if (!bookExists) {
		readBooks.push(book);
		localStorage.setItem("readBooks", JSON.stringify(readBooks));
	}
}

// this is the function to take the query from the search field and put it in the search function 
function loadResults() {
	const query = new URLSearchParams(window.location.search).get("query");
	if (query) {
		searchBooks(query).then(displayResults);
	}
}

// this loads the results once the page is loaded
document.addEventListener("DOMContentLoaded", loadResults);
