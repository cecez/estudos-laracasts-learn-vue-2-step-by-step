<?php

namespace Database\Factories;

use App\Models\Aluno;
use App\Models\Curso;
use App\Models\Matricula;
use Illuminate\Database\Eloquent\Factories\Factory;

class MatriculaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Matricula::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'curso_id' => Curso::factory(),
            'aluno_id' => Aluno::factory(),
            'ativo' => 1,
            'data_admissao' => $this->faker->dateTime()->format('Y-m-d H:i:s')
        ];
    }
}
