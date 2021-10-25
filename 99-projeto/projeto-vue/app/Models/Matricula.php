<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Matricula extends Model
{
    use HasFactory;

    protected $dates = ['data_admissao'];
    protected $fillable = ['curso_id', 'aluno_id', 'data_admissao', 'ativo'];

    public function aluno(): BelongsTo
    {
        return $this->belongsTo(Aluno::class);
    }

    public function curso(): BelongsTo
    {
        return $this->belongsTo(Curso::class);
    }

    public function scopePesquisa(Builder $query, ?string $search)
    {
        // busca matrículas pelo nome do aluno ou nome do curso
        $query->whereHas('aluno', function ($query) use ($search) {
            $query->where('nome', 'like', '%' . $search . '%');
        })->orWhere(function ($query) use ($search) {
            $query->whereHas('curso', function ($query) use ($search) {
                $query->where('nome', 'like', '%' . $search . '%');
            });
        });
    }
}
