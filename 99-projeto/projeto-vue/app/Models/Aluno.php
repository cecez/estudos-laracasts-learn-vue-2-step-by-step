<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Aluno extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'email', 'senha', 'ativo'];

    public function matriculas(): HasMany
    {
        return $this->hasMany(Matricula::class);
    }

    public function scopePesquisa(Builder $query, ?string $search)
    {
        $query
            ->where('nome', 'like', '%' . $search . '%')
            ->orWhere('email', 'like', '%' . $search . '%');
    }
}
