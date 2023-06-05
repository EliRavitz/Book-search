<?php

use App\http\Controllers\BookController;
use App\http\Controllers\AuthorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::resource('books', BookController::class);
Route::resource('authors', AuthorController::class);

Route::get('/search-author-by-book/{book_name}', [AuthorController::class, 'searchAuthorByBook']);
Route::get('/search-book-by-author/{author_name}', [BookController::class, 'searchBookByAuthor']);





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
