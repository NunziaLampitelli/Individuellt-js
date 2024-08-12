// I got a key from the google api site.

const API_KEY = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";

// create an async function to get and display in the console the book info

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
				averageRating: item.volumeInfo.averageRating || "Rating: unavailable",
			}));
		} else {
			console.error(
				"Error",
				response.status,
				response.statusText
			);
			return [];
		}
	} catch (error) {
		console.error("Error", error);
		return [];
	}
}


