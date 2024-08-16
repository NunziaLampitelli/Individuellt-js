document.addEventListener("DOMContentLoaded", function () {
	const bookDetailsContainer = document.getElementById("bookDetails");
	const book = JSON.parse(localStorage.getItem("selectedBook"));

	if (book) {
		bookDetailsContainer.innerHTML = `
            <img src="${book.thumbnail}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Author/s:</strong> ${book.authors.join(", ")}</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <p><strong>Publishing date:</strong> ${book.publishedDate}</p>
            <p><strong>Pages:</strong> ${book.pageCount}</p>
            <p><strong>Category:</strong> ${book.categories.join(", ")}</p>
            <button id="removeBtn">Remove from Read Books</button>
        `;

		document.getElementById("removeBtn").addEventListener("click", () => {
			removeFromReadBooks(book.title);
			window.location.href = "library.html"; // Redirect back to library if i remove the book
		});
	}
});

// function to remove books from the read ones
function removeFromReadBooks(title) {
	let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
	readBooks = readBooks.filter((book) => book.title !== title);
	localStorage.setItem("readBooks", JSON.stringify(readBooks));
}
