<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Author::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
          $request->validate([
            'name' => 'required',
            'email' => 'required',
        ]);
        return Author::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Author::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         $author = Author::find($id);
        $author->update($request->all());
        return $author;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       return Author::destroy($id);
    }
    /**
    * search Author By Book.
    */
    public function searchAuthorByBook(Request $request, $book_name)
    {
        // Search for the author's name by book name
        $author = Book::where('title', $book_name)->first()->author;
    
        // Return the author's name
        return $author;
        // return response()->json(['author_name' => $author->name]);
    }
    

}
