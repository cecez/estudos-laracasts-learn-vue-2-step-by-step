<?php
  $projetos = \App\Models\Project::all();
  echo '<ul>';
  foreach ($projetos as $projeto) {
      echo '<li>' . $projeto->name . '</li>';
  }
  echo '</ul>';
?>
