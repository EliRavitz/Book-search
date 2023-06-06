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
        $authors = Author::all();
        return response()->json($authors);
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
    
        $author = Author::create($request->all());
    
        return response()->json(['message' => 'Author created successfully', 'author' => $author], 201);
    }
    

    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $author = Author::find($id);
        return response()->json($author);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json(['message' => 'Author not found'], 404);
        }

        $oldAuthorName = $author->name;
        $newAuthorName = $request->input('name');
        $newAuthorEmail = $request->input('email');

        $author->update($request->only('name', 'email'));

        if ($newAuthorName && $newAuthorName !== $oldAuthorName) {
            Book::where('author_name', $oldAuthorName)
                ->update(['author_name' => $newAuthorName]);
        }

        return response()->json(['message' => 'Author updated successfully'], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $authorId)
    {
       $author = Author::find($authorId);
       if (!$author) {
          return response()->json(['message' => 'Author not found'], 404);
       }
    
       $authorName = $author->name;
    
       $author->delete();
    
       $books = Book::where('author_name', $authorName)->delete();
    
       return response()->json(['message' => 'Author and associated books deleted'], 200);
    }

}
