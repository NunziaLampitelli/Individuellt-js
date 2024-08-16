// API kei obtained through the google book api site
const API_KEY = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";

//function for the search and rediraction of the search to the search.html
async function researchForm(event) {
	event.preventDefault(); //to prevent that it refreshes once clicked on the button

	const query = document.getElementById("bookInput").value.trim(); // this is to remove the last search values 

	if (query) {
		// this redirects to search.html with the query (input in the field) used as a parameter of the url 
		window.location.href = `search.html?query=${encodeURIComponent(query)}`;
	} else {
		console.log(
			"You need to write the title of the book or the author's name."
		);
	}
}

// function to add the books in the read book list
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

// funcion to display all the read books
function displayReadBooks() {
	const readBooksContainer = document.getElementById("readBooksContainer");

	readBooksContainer.innerHTML = "";

	const readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

	if (readBooks.length > 0) {
		const title = document.createElement("p");
		title.textContent = "Your library";
		readBooksContainer.appendChild(title);

		const booksGrid = document.createElement("div");
		booksGrid.classList.add("read-books-grid");
		readBooksContainer.appendChild(booksGrid);

		readBooks.forEach((book) => {
			const bookElement = document.createElement("div");
			bookElement.classList.add("read-book");
			bookElement.innerHTML = `
                <img src="${book.thumbnail}" alt="${book.title}">
                <div class="read-book-info">
                    <h3>${book.title}</h3>
                </div>
            `;

			bookElement.addEventListener("click", () => {
				localStorage.setItem("selectedBook", JSON.stringify(book)); // this is to save the selected book in the read book list
				window.location.href = "read.html"; // rediractes to read.html after saving the book
			});

			booksGrid.appendChild(bookElement);
		});
	} else {
		readBooksContainer.innerHTML = "<p>No books added to the library yet.</p>";
	}
}

// this adds the event listener for the search form 
document.addEventListener("DOMContentLoaded", function () {
	document
		.getElementById("searchForm")
		.addEventListener("submit", researchForm);
	displayReadBooks(); // this is to display all the saved books after everything is loaded
});
