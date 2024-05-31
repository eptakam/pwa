<?php

  // Vérifier si le formulaire a été soumis
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

     // se connecter a la base de donnees
    $conn = mysqli_connect('localhost', 'root', '', 'testpwa');
    mysqli_set_charset($conn, 'utf8');

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    // se proteger contre les injections sql
    $stmt = $conn->prepare("INSERT INTO user (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    // executer la requete
    if ($stmt->execute()) {
      echo "Nouvel utilisateur créé avec succès";
    } else {
      echo "Erreur: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
  }