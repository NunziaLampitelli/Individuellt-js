// I got a key from the google book api site.
const API_KEY = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";

// This is the function that gets the data from the API
async function searchBooks(query) {
    // I need to fix the url to use for the search
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (response.ok) { // if the answer is ok (code 200)
			const data = await response.json(); // convert to json

			// this a function that uses map to take only the data that I want to show
			return data.items.map((item) => ({
			title: item.volumeInfo.title || "Title: unavailable",
			authors: item.volumeInfo.authors || ["Author: unavailable"],
			description: item.volumeInfo.description || "Description: unavailable",
			thumbnail: item.volumeInfo.imageLinks?.thumbnail || "Thumbnail: unavailable",
			publishedDate: item.volumeInfo.publishedDate || "Publishing date: unavailable",
			pageCount: item.volumeInfo.pageCount || "Pages: unavailable",
			categories: item.volumeInfo.categories || ["Categories: unavailable",],
			}));
			} else {
            // this is what must happen if the response I get is not ok
            console.error("Error", response.status, response.statusText);
            return []; // Suggested to return an empy arrey when not ok
        }
     } catch (error) {
        // this is to catch an error while I try to fetch something (it doesn't matter if the response would be ok or not)
        console.error("Error", error);
        return []; 
    }
}

// a function for the research of the books when one writes in the input field
async function researchForm(event) {
    event.preventDefault(); // this is to avoid that the page restarts while the function is going 

    // this underneath is the function to get the value of the input that is written
    const query = document.getElementById('bookInput').value.trim(); // trim has been suggested to avoid useless white spaces

    // so this is if there is something written then I call the first function that fetches the data from the API
    if (query) {
        const results = await searchBooks(query);
        console.log(results); 
        displayResults(results); 
        document.querySelector("article.library-content").style.display = "none"; // this one is to delete the content after the function looks for the results
    } else {
        // This is in case what has been written isn't valid for the search
        console.log("You need to write the title of the book or the author's name.");
    }
}

// this is the function needed to display the results 
function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // this line is needed to delete the previous results

// what to write in case nothing is found
    if (results.length === 0) {
        resultsContainer.innerHTML =  `<p>Sorry, the book or author couldn't be found.</p>`;
        return;
    }

 // create div in html for every result
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
      </div>
        `;
 // this line is needed to add the new elements in the results container
    resultsContainer.appendChild(bookElement);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchForm').addEventListener('submit', researchForm);
});
