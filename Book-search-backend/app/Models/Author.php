<?php

namespace App\Models;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
    ];

    protected static function booted()
    {
        static::creating(function ($author) {
            $author->numOfBooks = 0;
        });
    }

    public function books()
{
    return $this->hasMany(Book::class);
}

}
