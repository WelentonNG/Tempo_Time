CREATE DATABASE IF NOT EXISTS tempo_time;

USE tempo_time;

CREATE TABLE IF NOT EXISTS usuarios (
    id       INT          AUTO_INCREMENT PRIMARY KEY,
    login    VARCHAR(50)  NOT NULL UNIQUE,
    senha    VARCHAR(255) NOT NULL,
    criado_em DATETIME    DEFAULT CURRENT_TIMESTAMP
);

-- Usuário padrão (senha: 1234)
INSERT INTO usuarios (login, senha) VALUES ('admin', '1234');
