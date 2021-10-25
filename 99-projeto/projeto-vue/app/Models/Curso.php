<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Curso extends Model
{
    use HasFactory;

    protected $dates = ['data_inicio'];
    protected $fillable = ['nome', 'data_inicio'];

    public function matriculas(): HasMany
    {
        return $this->hasMany(Matricula::class);
    }

    public function scopePesquisa(Builder $query, ?string $search)
    {
        $query->where('nome', 'like', '%' . $search . '%');
    }
}
