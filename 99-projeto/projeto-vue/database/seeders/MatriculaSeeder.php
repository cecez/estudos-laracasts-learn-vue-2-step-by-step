<?php

namespace Database\Seeders;

use App\Models\Aluno;
use App\Models\Curso;
use App\Models\Matricula;
use Illuminate\Database\Seeder;

class MatriculaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Matricula::factory()->count(10)->create();
        Matricula::factory()->count(10)->create(['ativo' => 0]);
        Matricula::factory()->count(10)->create(['curso_id' => Curso::factory()->create()]);
        Matricula::factory()->count(3)->create(['aluno_id' => Aluno::factory()->create()]);
    }
}
