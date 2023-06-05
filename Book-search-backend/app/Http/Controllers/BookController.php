<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'published_date' => 'required',
            'author_name' => 'required'
        ]);
        
        $author = Author::where('name', $data['author_name'])->first();

        if (!$author) {
            return response()->json(['error' => 'Author not found. Please establish the author first.'], 404);
        }

        $book = $author->books()->create([
            'title' => $data['title'],
            'description' => $data['description'],
            'published_date' => $data['published_date'],
            'author_name' => $data['author_name'],
        ]);

        $author->books()->save($book);

        $author->increment('numOfBooks');

      
        return response()->json($book, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::find($id);
        return response()->json($book);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $book = Book::find($id);
        $book->update($request->all());
        
        return response()->json($book);
    }

    /**
    * Remove the specified resource from storage.
    */
    public function destroy(string $id)
    {
    $book = Book::find($id);

    if (!$book) {
        return response()->json(['error' => 'Book not found.'], 404);
    }

    $author = $book->author;

    if ($author) {
        $author->decrement('numOfBooks');
    }

    $book->delete();

    return response()->json(['message' => 'Book deleted successfully.']);
}


    /**
     * search Book By Author.
     */
    public function searchBookByAuthor(Request $request, $author_name)
    {
        // Search for books by author name
        $books = Book::whereHas('author', function ($query) use ($author_name) {
            $query->where('name', $author_name);
        })->get();

        // Return the books
        return $books;
        return response()->json(['books' => $books]);
    }
}
