// I got a key from the google book api site.

const API_KEY = "AIzaSyBgXLpVU0ypFCl4qpu_bLMMeGXjBLLDiqc";

// Questa funzione cerca libri usando l'API di Google Books
async function searchBooks(query) {
    // Costruisco l'URL per la richiesta
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`;

    try {
        // Provo a fare una richiesta all'API
        const response = await fetch(url);
        
        // Controllo se la risposta è ok (codice di stato 200)
        if (response.ok) {
            // Converto la risposta in JSON
            const data = await response.json();
            
            // Mappo i risultati per ottenere solo le informazioni necessarie
            return data.items.map((item) => ({
                title: item.volumeInfo.title || "Title: unavailable", // Imposto un valore predefinito se il titolo non è disponibile
                authors: item.volumeInfo.authors || ["Author: unavailable"], // Imposto un valore predefinito per gli autori
                description: item.volumeInfo.description || "Description: unavailable", // Imposto un valore predefinito per la descrizione
                thumbnail: item.volumeInfo.imageLinks?.thumbnail || "Thumbnail: unavailable", // Uso l'operatore ?. per evitare errori se imageLinks è undefined
                publishedDate: item.volumeInfo.publishedDate || "Publishing date: unavailable", // Imposto un valore predefinito per la data di pubblicazione
                pageCount: item.volumeInfo.pageCount || "Pages: unavailable", // Imposto un valore predefinito per il numero di pagine
                categories: item.volumeInfo.categories || ["Categories: unavailable"], // Imposto un valore predefinito per le categorie
                averageRating: item.volumeInfo.averageRating || "Rating: unavailable", // Imposto un valore predefinito per il rating
            }));
        } else {
            // Mostro un errore se la risposta non è ok
            console.error("Error", response.status, response.statusText);
            return []; // Restituisco un array vuoto in caso di errore
        }
    } catch (error) {
        // Mostro un errore se qualcosa va storto durante la richiesta
        console.error("Error", error);
        return []; // Restituisco un array vuoto in caso di errore
    }
}

